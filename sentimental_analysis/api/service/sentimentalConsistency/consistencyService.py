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
        return rating_score * sentiment_score < CONTRADICTION_THRESHOLD

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

        has_inconsistency = len(inconsistent_models) > 0
        all_inconsistent  = len(inconsistent_models) == len(models_result)

        confidence_score = compute_confidence_score(
            models_result=models_result,
            expected_sentiment=expected_sentiment,
            label_normalizer_fn=_safe_normalize
        )

        return {
            "details": details,
            "summary": {
                "expected_sentiment":  expected_sentiment,
                "has_inconsistency":   has_inconsistency,
                "all_inconsistent":    all_inconsistent,
                "inconsistent_models": inconsistent_models,
                "alert": _build_alert(has_inconsistency, all_inconsistent, inconsistent_models),
            },
            "review_patch": {
                "analyzed":        True,
                "contradictory":   has_inconsistency,
                "confidenceScore": confidence_score,
            }
        }


def _safe_normalize(model_name: str, raw_label: str) -> str | None:
    try:
        return normalize_label(model_name, raw_label)
    except ValueError:
        return None


def _build_alert(has_inconsistency: bool, all_inconsistent: bool, inconsistent_models: list) -> dict | None:
    if not has_inconsistency:
        return None
    if all_inconsistent:
        return {"level": "critical", "message": "Todos os modelos divergem do rating informado."}
    return {"level": "warning", "message": f"Os modelos {inconsistent_models} divergem do rating informado."}