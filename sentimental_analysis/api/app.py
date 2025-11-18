# api/app.py
from fastapi import FastAPI
from pydantic import BaseModel, UUID4, PositiveFloat
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import threading
import time
import subprocess
from datetime import datetime, timedelta
from contextlib import asynccontextmanager
from api.Exception.LoadingModelException import LoadingModelException
import schedule


MODEL_PATH = "./model"

MODEL_PATHS = {
    "FINETUNED":"./model/model-fine-tuning-classic",
    "NPLTOWN_BERT":"nlptown/bert-base-multilingual-uncased-sentiment",
    "PYSENTIMIENTO_ROBERTA":"pysentimiento/robertuito-sentiment-analysis"
}
MODEL = {}

# Load modelos

def load_models():
    for key,model_path in MODEL_PATHS.items():
        try:
            tokenizer = AutoTokenizer.from_pretrained(model_path)
            model = AutoModelForSequenceClassification.from_pretrained(model_path)
            MODEL[key] = (tokenizer, model)

            #MODEL[key] = [AutoTokenizer.from_pretrained(model), AutoModelForSequenceClassification.from_pretrained(model)]
        except Exception as e:
            print(f"[ERRO] Modelo {key} falhou ao carregar: {e}")
            raise LoadingModelException(model_path)
        
        finally:
            print("Prosseguindo o carregamento dos outros modelos!")
            continue



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
    load_models()
    # Libera o app
    yield

    print("🛑 Encerrando rotina de agendamento...")

# 🔹 Cria a aplicação com o lifespan ativo
app = FastAPI(lifespan=lifespan)

# 🔹 Define o schema e as rotas
class Review(BaseModel):
    """{
    "userId":"669ba796-717a-4a70-845b-2d8c6aee5d86",
    "productId":"faf86d8d-c1b3-43b8-b770-894d3771a4b7",
    "title":"LINDO PRODUTO, RECOMENDO",
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "pros":[
        "bom",
        "bonito",
        "barato"
    ],
    "con":[
        "ruim",
        "feio",
        "caro"
    ],
    "rating": 5.0
}"""
    userId: UUID4
    productId: UUID4
    description: str
    rating: PositiveFloat

@app.post("/analyze")
def analyze(review: Review):
    result = {}
    for k,v in MODEL.items():
         # --- FINETUNED ---
        if k == "FINETUNED":
            tokens = v[0](review.description, return_tensors="pt", truncation=True, padding=True).to(v[1].device)
            with torch.no_grad():
                logits = v[1](**tokens).logits

            preds = torch.argmax(logits, dim=1).cpu().numpy() + 1
                    
            result[k] = {
                "rating_pred": int(preds[0]),
                "description": review.description
            }
            continue

        # --- OUTROS MODELOS ---
        inputs = v[0](review.description, return_tensors="pt", truncation=True)
        with torch.no_grad():
            logits = v[1](**inputs).logits

        probs = torch.nn.functional.softmax(logits, dim=1)
        sentiment_index = torch.argmax(probs).item()
        num_labels = v[1].config.num_labels

        # Seleciona labels conforme o modelo
        if k == "NPLTOWN_BERT":
            labels = ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"]
        elif k == "PYSENTIMIENTO_ROBERTA":
            labels = ["negative", "neutral", "positive"]
        else:
            # fallback genérico
            labels = [f"class_{i}" for i in range(num_labels)]

        result[k] = {
            "sentiment": labels[sentiment_index],
            "scores": {labels[i]: float(probs[0][i]) for i in range(num_labels)}
        }

    return result