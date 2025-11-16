import pandas as pd
import matplotlib.pyplot as plt
import torch
import os
from datasets import (load_dataset,Dataset)
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    TrainingArguments, Trainer, DataCollatorWithPadding
)
import numpy as np
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score,classification_report,confusion_matrix, ConfusionMatrixDisplay
from sklearn.model_selection import train_test_split
import matplotlib

def compute_metrics(pred):
    labels = pred.label_ids
    preds = np.argmax(pred.predictions, axis=1)
    return {
        "accuracy": accuracy_score(labels, preds),
        "f1": f1_score(labels, preds, average="weighted"),
        "precision": precision_score(labels, preds, average="weighted"),
        "recall": recall_score(labels, preds, average="weighted")
    }
def dataset_treino():
    try:
        ds_lucasnil_repro = load_dataset("lucasnil/repro")
    except Exception as e:
        print(f"Erro: {e}")

    df_lucasnil_repro = ds_lucasnil_repro["train"].to_pandas()
    df_olist_order_reviews = pd.read_csv("training/data/archive/olist_order_reviews_dataset.csv")
    df_B2W_Reviews01 = pd.read_csv("training/data/B2W-Reviews01.csv", low_memory=False)
    df_Buscape = pd.read_csv("training/data/buscape.csv")

    df_lucasnil_repro = df_lucasnil_repro[["reviewer_id","review_text","overall_rating"]]
    df_lucasnil_repro = df_lucasnil_repro.rename(columns={
            "reviewer_id":"review_id",
            "overall_rating":"rating"
        })

    df_olist_order_reviews = df_olist_order_reviews[["review_id","review_comment_message","review_score"]]
    df_olist_order_reviews = df_olist_order_reviews.rename(columns={
        "review_comment_message":"review_text",
        "review_score":"rating"
    })

    df_B2W_Reviews01 = df_B2W_Reviews01[["reviewer_id","review_text","overall_rating"]]
    df_B2W_Reviews01 = df_B2W_Reviews01.rename(columns={
        "reviewer_id":"review_id",
        "overall_rating":"rating"
        })

    df_Buscape = df_Buscape[["original_index","review_text","rating"]]
    df_Buscape = df_Buscape.rename(columns={'original_index':'review_id'})

    df_all = pd.concat([df_lucasnil_repro, df_olist_order_reviews, df_B2W_Reviews01, df_Buscape], ignore_index=True)
    df_all = df_all.dropna(subset=["review_text", "rating"])
    #print(df_all.describe)

    # Normalizar as notas para 0..4 (compatível com 5 classes)
    df_all["label"] = df_all["rating"].astype(int) - 1
    return df_all

#Treinamento de gírias inicial
def treinamento_fine_tuning_classic():

    df_all = dataset_treino()

    MODEL_BASE = "nlptown/bert-base-multilingual-uncased-sentiment"
    MODEL_SUPPORT = "pysentimiento/robertuito-sentiment-analysis"
    OUTPUT_DIR = "model/model-fine-tuning-classic"

    # =========================
    # TOKENIZADOR
    # =========================
    tokenizer_base = AutoTokenizer.from_pretrained(MODEL_BASE)
    #tokenizer_support = AutoTokenizer.from_pretrained(MODEL_SUPPORT)

    model = AutoModelForSequenceClassification.from_pretrained(MODEL_BASE, num_labels=5)

    dataset = Dataset.from_pandas(df_all[["review_text", "label"]])
    dataset = dataset.train_test_split(test_size=0.1, seed=30)

    def tokenize_function(examples):
        return tokenizer_base(examples["review_text"], truncation=True, padding="max_length", max_length=128)
    
    tokenized = dataset.map(tokenize_function, batched=True)
    trainer = Trainer(
        model=model,
        args=TrainingArguments(
            output_dir=OUTPUT_DIR,
            evaluation_strategy="epoch",
            save_strategy="epoch",
            learning_rate=2e-5,
            per_device_train_batch_size=8,
            per_device_eval_batch_size=8,
            num_train_epochs=3,
            weight_decay=0.01,
            load_best_model_at_end=True
        ),
        train_dataset=tokenized["train"],
        eval_dataset=tokenized["test"],
        tokenizer=tokenizer_base,
        data_collator=DataCollatorWithPadding(tokenizer_base),
        compute_metrics=compute_metrics
    )
    print("Treinamento:")
    trainer.train()
    trainer.save_model(OUTPUT_DIR)
    print(f"Modelo salvo em {OUTPUT_DIR}")
    

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print("ACESSO A GPU:", DEVICE)

def avaliacao_modelo(MODEL_PATH,textos):
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

    df_all = dataset_treino()

    dataset = Dataset.from_pandas(df_all[["review_text", "label"]])
    dataset = dataset.train_test_split(test_size=0.1, seed=33)

    def tokenize_function(examples):
        return tokenizer(examples["review_text"], truncation=True, padding="max_length", max_length=128)

    dataset_test = dataset.map(tokenize_function, batched=True)
    trainer = Trainer(model=model)

    # Predições
    predictions = trainer.predict(dataset_test["test"])
    y_true = np.array(dataset_test["test"]["label"])
    y_pred = np.argmax(predictions.predictions, axis=1)

    # Relatório detalhado
    print(classification_report(y_true, y_pred, digits=3))

    matplotlib.use("Agg")
    cm = confusion_matrix(y_true, y_pred, labels=[0,1,2,3,4]) 
    disp = ConfusionMatrixDisplay(cm, display_labels=[1,2,3,4,5])
    disp.plot(cmap="Blues", xticks_rotation='vertical')

    # Cria pasta de saída se não existir
    os.makedirs("training/outputs", exist_ok=True)
    path_fig = "training/outputs/confusion_matrix.png"
    plt.savefig(path_fig, bbox_inches="tight")
    plt.close()

    print(f"Matriz de confusão salva em: {path_fig}")

    #Teste com textos

    tokens = tokenizer(textos, return_tensors="pt", truncation=True, padding=True).to(model.device)
    with torch.no_grad():
        logits = model(**tokens).logits
    preds = torch.argmax(logits, dim=1).cpu().numpy() + 1

    for t, p in zip(textos, preds):
        print(f"⭐ Predição: {p} → {t}")
    


if __name__ == "__main__":
    MODEL_PATH = "model/model-fine-tuning-classic"
    textos = [
        "O produto é excelente, mas chegou atrasado.",
        "Horrível, nem funciona direito.",
        "Esperava mais pelo preço.",
        "Amei demais, funciona perfeitamente!",
        "Veio quebrado, mas o suporte resolveu rápido.",
        "Top demais véi",
        "daora o produto",
        "tao bom que vou até dar pra minha sogra",
        "tao baum quanto uma bosta!"
    ]
    #treinamento_fine_tuning_classic()
    avaliacao_modelo(MODEL_PATH,textos)