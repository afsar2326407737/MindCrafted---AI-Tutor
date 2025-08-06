# import google.generativeai as genai

# def generate_answer(question, context):
#     client = genai.Client()
#     prompt = f"Answer this question using the following context only.\nQuestion: {question}\nContext: {context}"
#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=prompt,
#     )
#     return response.text

# import google.generativeai as genai
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

def generate_answer(question, context):
    prompt = f"Elaborate on the following content in detail suitable for a student:\n{question}\nContext: {context}"
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return response.text

def generate_quiz(content, num_questions=5):
    prompt = (
        f"Generate a quiz with {num_questions} questions (multiple choice or short answer) "
        f"based on the following content:\n{content}\n"
        "For each question, provide 4 options and indicate the correct answer."
    )
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return response.text
