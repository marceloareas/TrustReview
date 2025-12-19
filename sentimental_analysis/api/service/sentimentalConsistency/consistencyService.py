from api.service.sentimentalConsistency.config import CONTRADICTION_THRESHOLD, MODEL_WEIGHTS
from api.service.sentimentalConsistency.adapters.config import ADAPTERS


class SentimentConsistencyService:

    @staticmethod
    def normalize_rating(rating: float) -> float:
        # 1–5 → [-1, +1]
        return (rating - 3) / 2

    @staticmethod
    def ensemble(models_result: dict) -> float:
        score = 0.0
        weight_sum = 0.0

        for model_name, result in models_result.items():
            adapter = ADAPTERS.get(model_name)
            weight = MODEL_WEIGHTS.get(model_name, 0)

            if not adapter or weight == 0:
                continue

            model_score = adapter.to_score(result["scores"])
            score += model_score * weight
            weight_sum += weight

        return score / weight_sum if weight_sum else 0.0

    @staticmethod
    def is_contradiction(rating_score: float, sentiment_score: float) -> bool:
        return rating_score * sentiment_score < CONTRADICTION_THRESHOLD

    @classmethod
    def analyze(cls, rating: float, models_result: dict) -> dict:
        rating_score = cls.normalize_rating(rating)
        sentiment_score = cls.ensemble(models_result)

        contradiction = cls.is_contradiction(
            rating_score,
            sentiment_score
        )

        confidence = abs(sentiment_score)

        return {
            "rating_score": rating_score,
            "sentiment_score": sentiment_score,
            "contradiction": contradiction,
            "confidence": round(confidence, 3)
        }
