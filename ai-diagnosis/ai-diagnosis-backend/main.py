import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.environ["OPENAI_API_KEY"]

class Symptoms(BaseModel):
    symptoms: str

@app.post("/api/diagnosis")
def get_diagnosis(symptoms: Symptoms):
    response = openai.Completion.create(
        engine="davinci",
        prompt=f"患者症状：{symptoms.symptoms}\n诊断结果：",
        max_tokens=50,
        n=1,
        stop=None,
        temperature=0.5,
    )

    diagnosis = response.choices[0].text.strip()
    return {"diagnosis": diagnosis}
