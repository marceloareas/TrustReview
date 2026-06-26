# Mapeamento de labels específicos de cada modelo → sentimento canônico
LABEL_NORMALIZER: dict[str, dict[str, str]] = {
    "NPLTOWN_BERT": {
        "1 star":  "negative",
        "2 stars": "negative",
        "3 stars": "neutral",
        "4 stars": "positive",
        "5 stars": "positive",
    },
    "PYSENTIMIENTO_ROBERTA": {
        "negative": "negative",
        "neutral":  "neutral",
        "positive": "positive",
    },
}

def normalize_label(model_name: str, raw_label: str) -> str:
    """
    Converte o label bruto do modelo para o sentimento canônico.
    Lança ValueError se o modelo ou label não estiver mapeado.
    """
    model_map = LABEL_NORMALIZER.get(model_name)
    if model_map is None:
        raise ValueError(f"Modelo '{model_name}' não possui mapeamento de labels.")
    
    normalized = model_map.get(raw_label)
    if normalized is None:
        raise ValueError(f"Label '{raw_label}' não reconhecido para o modelo '{model_name}'.")
    
    return normalized