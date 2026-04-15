def compute_confidence_score(models_result: dict, expected_sentiment: str, label_normalizer_fn) -> float:
    """
    Média dos scores do label esperado entre todos os modelos.
    Retorna um float entre 0.0 e 1.0.
    """
    scores = []

    for model_name, result in models_result.items():
        raw_scores = result.get("scores", {})

        # Soma os scores dos labels que mapeiam para o sentimento esperado
        model_score = sum(
            score
            for raw_label, score in raw_scores.items()
            if label_normalizer_fn(model_name, raw_label) == expected_sentiment
        )
        scores.append(model_score)

    return round(sum(scores) / len(scores), 4) if scores else 0.0