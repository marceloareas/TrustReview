from api.service.sentimentalConsistency.adapters.modelAdapters import SentimentAdapter

class NLPTownAdapter(SentimentAdapter):
    def to_score(self, scores: dict) -> float:
        # score médio esperado
        expected = sum(
            (i + 1) * prob
            for i, prob in enumerate(scores.values())
        )
        # normaliza para [-1, +1]
        return (expected - 3) / 2
