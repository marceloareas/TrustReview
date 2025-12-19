from  model.BaseModel import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from api.Exception.TokensModelException import TokensModelException
import torch

class HeadedModel(BaseModel):
    def __init__(self, device, model_string,labels):
        super().__init__(
            AutoTokenizer.from_pretrained(model_string),
            AutoModelForSequenceClassification.from_pretrained(model_string).to(device),
            labels,
            device
            )
    def computeTokens(self):
        try:
            if self.tokens == None:
                raise TokensModelException(self)
            with torch.no_grad():
                logits = self.model(**self.tokens).logits
            probs = torch.nn.functional.softmax(logits, dim=1)
            sentimental_index = torch.argmax(probs).item()
            num_labels = self.model.config.num_labels
            if self.labels == None:
                labels = [f"class_{i}" for i in range(num_labels)]
            else:
                labels = self.labels
            result = {
            "sentiment": labels[sentimental_index],
            "scores": {labels[i]: float(probs[0][i]) for i in range(num_labels)}
            }
            return result
        except Exception as err:
            raise err