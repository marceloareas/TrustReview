# Intervalos de rating para mapeamento de sentimento
# Formato: (min_exclusivo, max_inclusivo) -> label
RATING_SENTIMENT_INTERVALS = [
    (0.0, 2.0, "negative"),   # Ruim:   0 < rating <= 2
    (2.0, 4.0, "neutral"),    # Neutro: 2 < rating <= 4
    (4.0, 5.0, "positive"),   # Bom:    4 < rating <= 5
]

def rating_to_sentiment(rating: float) -> str:
    for lower, upper, label in RATING_SENTIMENT_INTERVALS:
        if lower < rating <= upper:
            return label
    # Edge case: rating == 0.0 (PositiveFloat não permite, mas por segurança)
    return "negative"