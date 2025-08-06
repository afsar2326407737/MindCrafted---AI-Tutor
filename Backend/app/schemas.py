from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    class Config:
        orm_mode = True

class DocumentOut(BaseModel):
    id: int
    filename: str
    upload_time: datetime
    class Config:
        orm_mode = True

class QuizResponseCreate(BaseModel):
    document_id: int
    answers: str
    score: Optional[int] = None

class QuizResponseOut(BaseModel):
    id: int
    document_id: int
    answers: str
    score: int
    submitted_at: datetime
    class Config:
        orm_mode = True