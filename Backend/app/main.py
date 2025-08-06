from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from app import pdf_loader, embedder, vector_store, utils, gemini_engine
import os

app = FastAPI()
vs = vector_store.VectorStore()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile):
    path = f"syllabus/{file.filename}"
    with open(path, "wb") as f:
        f.write(await file.read())

    text = pdf_loader.extract_pdf_text(path)
    chunks = utils.chunk_text(text)
    embeddings = [embedder.get_embedding(chunk) for chunk in chunks]
    vs.add(chunks, embeddings)

    return {"message": "PDF uploaded and processed next up!"}

@app.post("/ask")
async def ask_question(question: str = Form(...)):
    query_embedding = embedder.get_embedding(question)
    relevant_chunks = vs.search(query_embedding, top_k=3)
    context = "\n".join(relevant_chunks)
    answer = gemini_engine.generate_answer(question, context)
    return {"answer": answer}

@app.post('/generate-quiz')
async def generate_quiz(content: str = Form(...), num_questions: int = Form(5)):
    quiz = gemini_engine.generate_quiz(content, num_questions)
    return {"quiz": quiz}