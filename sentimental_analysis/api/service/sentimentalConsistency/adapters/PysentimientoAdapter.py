from api.service.sentimentalConsistency.adapters.modelAdapters import SentimentAdapter

class PysentimientoAdapter(SentimentAdapter):
    MAPPING = {
        "negative": -1.0,
        "neutral": 0.0,
        "positive": 1.0
    }

    def to_score(self, scores: dict) -> float:
        return sum(
            self.MAPPING[label] * prob
            for label, prob in scores.items()
        )
