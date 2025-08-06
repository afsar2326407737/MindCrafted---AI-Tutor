from fastapi import FastAPI, UploadFile, Form, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import pdf_loader, embedder, vector_store, utils, gemini_engine
from app.models import User, Document, QuizResponse
from app.schemas import UserCreate, UserOut, DocumentOut, QuizResponseCreate, QuizResponseOut
from app.database import SessionLocal, engine, Base
from app.auth import verify_password, get_password_hash, create_access_token
from jose import JWTError, jwt
from datetime import datetime
import os
import secrets
import secrets
print(secrets.token_urlsafe(32))

app = FastAPI()
vs = vector_store.VectorStore()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency to get DB session
async def get_db():
    async with SessionLocal() as session:
        yield session

# Create tables at startup
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Helper: Get current user
async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, "your-secret-key", algorithms=["HS256"])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    result = await db.execute(select(User).where(User.id == int(user_id)))
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    return user

# ---------------------- AUTH ROUTES ----------------------

@app.post("/signup", response_model=UserOut)
async def signup(user: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user.email))
    db_user = result.scalar_one_or_none()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = get_password_hash(user.password)
    new_user = User(username=user.username, email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    # Log activity
    log = ActivityLog(user_id=new_user.id, action="signup", details=f"email: {new_user.email}")
    db.add(log)
    await db.commit()
    return new_user

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalar_one_or_none()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": str(user.id)})
    # Log activity
    log = ActivityLog(user_id=user.id, action="login", details="User login")
    db.add(log)
    await db.commit()
    return {"access_token": access_token, "token_type": "bearer"}

# ---------------------- DOCUMENT UPLOAD ----------------------

@app.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    path = f"syllabus/{file.filename}"
    with open(path, "wb") as f:
        f.write(await file.read())

    # Save document record to DB
    doc = Document(filename=file.filename, user_id=current_user.id)
    db.add(doc)
    await db.commit()
    await db.refresh(doc)

    text = pdf_loader.extract_pdf_text(path)
    chunks = utils.chunk_text(text)
    embeddings = [embedder.get_embedding(chunk) for chunk in chunks]
    vs.add(chunks, embeddings)

    # Log activity
    log = ActivityLog(user_id=current_user.id, action="upload", details=f"filename: {file.filename}")
    db.add(log)
    await db.commit()

    return {"message": "PDF uploaded and processed!", "document_id": doc.id}

# ---------------------- QUESTION ANSWERING ----------------------

@app.post("/ask")
async def ask_question(
    question: str = Form(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query_embedding = embedder.get_embedding(question)
    relevant_chunks = vs.search(query_embedding, top_k=3)
    context = "\n".join(relevant_chunks)
    answer = gemini_engine.generate_answer(question, context)
    # Log activity
    log = ActivityLog(user_id=current_user.id, action="ask", details=f"question: {question}")
    db.add(log)
    await db.commit()
    return {"answer": answer}

# ---------------------- QUIZ GENERATION & RESPONSE ----------------------

@app.post('/generate-quiz')
async def generate_quiz(
    content: str = Form(...),
    num_questions: int = Form(5),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    quiz = gemini_engine.generate_quiz(content, num_questions)
    # Log activity
    log = ActivityLog(user_id=current_user.id, action="generate_quiz", details=f"num_questions: {num_questions}")
    db.add(log)
    await db.commit()
    return {"quiz": quiz}

@app.post('/submit-quiz', response_model=QuizResponseOut)
async def submit_quiz(
    quiz: QuizResponseCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    quiz_response = QuizResponse(
        user_id=current_user.id,
        document_id=quiz.document_id,
        answers=quiz.answers,
        score=quiz.score,
    )
    db.add(quiz_response)
    await db.commit()
    await db.refresh(quiz_response)
    # Log activity
    log = ActivityLog(user_id=current_user.id, action="submit_quiz", details=f"score: {quiz.score}")
    db.add(log)
    await db.commit()
    return quiz_response

# ---------------------- ACTIVITY LOG VIEW (DEV/ADMIN) ----------------------

@app.get('/activity-log')
async def get_activity_log(
    db: AsyncSession = Depends(get_db)
):
    # (For production, restrict this to admin user.)
    result = await db.execute(select(ActivityLog))
    return result.scalars().all()