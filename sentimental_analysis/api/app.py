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

from api.service.sentimentalConsistency import consistencyService

from model.HeadedModel import HeadedModel
from model.BackBonedModel import BackBonedModel

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
MODEL_PATH = "./model"
HEADEDMODELS = ["NPLTOWN_BERT","PYSENTIMIENTO_ROBERTA"]
BACKBONEDMODELS = ["all-MiniLM-L6-v2"]

MODEL_PATHS = {
    "NPLTOWN_BERT":[
        "nlptown/bert-base-multilingual-uncased-sentiment",
        [
            "1 star", "2 stars", "3 stars", "4 stars", "5 stars"
        ]
    ],
    "PYSENTIMIENTO_ROBERTA":[
        "pysentimiento/robertuito-sentiment-analysis",
        [
            "negative", "neutral", "positive"
        ]
    ],
    "all-MiniLM-L6-v2":[
        "sentence-transformers/all-MiniLM-L6-v2",
        []
    ]
}
MODEL = {}

# Load modelos

def load_models():
    for key,model_path in MODEL_PATHS.items():
        try:
            if key in HEADEDMODELS:
               MODEL[key] = HeadedModel(
                    device=DEVICE,
                    model_string=model_path[0],
                    labels=model_path[1]
                )
            elif key in BACKBONEDMODELS:
                MODEL[key] = BackBonedModel(
                    device=DEVICE,
                    model_string=model_path[0],
                    labels=model_path[1]
                )
        except Exception as e:
            print(f"[ERRO] Modelo {key} falhou ao carregar: {e}")
            raise LoadingModelException(model_path)



# Define o lifespan antes de criar a app
@asynccontextmanager
async def lifespan(app: FastAPI):
    def run_training_scheduler():
        schedule.every().day.at("02:00").do(
            lambda: subprocess.run(["python", "training/train.py"], check=True)
        )
        print("Rotina diária de treinamento agendada para 02:00.")
        while True:
            schedule.run_pending()
            time.sleep(60)

    thread = threading.Thread(target=run_training_scheduler, daemon=True)
    thread.start()
    load_models()
    # Libera o app
    yield

    print("Encerrando rotina de agendamento...")

# Cria a aplicação com o lifespan ativo
app = FastAPI(lifespan=lifespan)

# Define o schema e as rotas
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
    model_results = {}
    for k,v in MODEL.items():
        if k in BACKBONEDMODELS:
            continue
        v.TokenizerInput(review.description)
        model_results[k] = v.computeTokens()
        consistency = consistencyService.SentimentConsistencyService.analyze(
            rating=review.rating,
            models_result=model_results
        )
    return {
        "model_results": model_results,
        "consistency": consistency
    }
