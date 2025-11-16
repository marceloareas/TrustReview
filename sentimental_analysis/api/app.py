# api/app.py
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import threading
import time
import subprocess
from datetime import datetime, timedelta
from contextlib import asynccontextmanager
import schedule


MODEL_PATH = "./model"

# 🔹 Define o lifespan antes de criar a app
@asynccontextmanager
async def lifespan(app: FastAPI):
    def run_training_scheduler():
        schedule.every().day.at("02:00").do(
            lambda: subprocess.run(["python", "training/train.py"], check=True)
        )
        print("⏳ Rotina diária de treinamento agendada para 02:00.")
        while True:
            schedule.run_pending()
            time.sleep(60)

    thread = threading.Thread(target=run_training_scheduler, daemon=True)
    thread.start()

    # Libera o app
    yield

    print("🛑 Encerrando rotina de agendamento...")

# 🔹 Cria a aplicação com o lifespan ativo
app = FastAPI(lifespan=lifespan)

# 🔹 Carrega o modelo e o tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

# 🔹 Define o schema e as rotas
class Review(BaseModel):
    text: str

@app.post("/analyze")
def analyze(review: Review):
    inputs = tokenizer(review.text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        logits = model(**inputs).logits
    probs = torch.nn.functional.softmax(logits, dim=1)
    labels = ["negative", "neutral", "positive"]
    return {
        "sentiment": labels[torch.argmax(probs)],
        "scores": {labels[i]: float(probs[0][i]) for i in range(3)},
    }
