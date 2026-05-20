from api.service.sentimentalConsistency.config import CONTRADICTION_THRESHOLD, MODEL_WEIGHTS
from api.service.sentimentalConsistency.adapters.config import ADAPTERS
from api.service.sentimentalConsistency.rating_intervals import rating_to_sentiment
from api.service.label_normalizer import normalize_label
from api.service.sentimentalConsistency.confidence import compute_confidence_score


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
        return rating_score * sentiment_score < -CONTRADICTION_THRESHOLD

    @staticmethod
    def analyze(rating: float, models_result: dict) -> dict:
        expected_sentiment = rating_to_sentiment(rating)

        details = {}
        inconsistent_models = []

        for model_name, result in models_result.items():
            raw_label = result.get('sentiment')

            try:
                normalized_label = normalize_label(model_name, raw_label)
                is_consistent    = normalized_label == expected_sentiment
                error            = None
            except ValueError as e:
                normalized_label = None
                is_consistent    = None
                error            = str(e)

            if is_consistent is False:
                inconsistent_models.append(model_name)

            details[model_name] = {
                "expected":      expected_sentiment,
                "raw_label":     raw_label,
                "normalized":    normalized_label,
                "is_consistent": is_consistent,
                "error":         error,
            }

        rating_score    = SentimentConsistencyService.normalize_rating(rating)
        sentiment_score = SentimentConsistencyService.ensemble(models_result)
        contradictory   = SentimentConsistencyService.is_contradiction(rating_score, sentiment_score)

        confidence_score = compute_confidence_score(
            models_result=models_result,
            expected_sentiment=expected_sentiment,
            label_normalizer_fn=_safe_normalize
        )

        return {
            "details": details,
            "summary": {
                "expected_sentiment":  expected_sentiment,
                "rating_score":        round(rating_score, 4),
                "sentiment_score":     round(sentiment_score, 4),
                "contradictory":       contradictory,
                "inconsistent_models": inconsistent_models,
                "alert": _build_alert(contradictory, rating_score, sentiment_score),
            },
            "review_patch": {
                "analyzed":        True,
                "contradictory":   contradictory,
                "confidenceScore": confidence_score,
            }
        }


def _safe_normalize(model_name: str, raw_label: str) -> str | None:
    try:
        return normalize_label(model_name, raw_label)
    except ValueError:
        return None


def _build_alert(contradictory: bool, rating_score: float, sentiment_score: float) -> dict | None:
    if not contradictory:
        return None
    return {
        "level": "warning",
        "message": (
            f"O texto da avaliação diverge da nota informada "
            f"(nota={rating_score:+.2f}, texto={sentiment_score:+.2f})."
        ),
    }
