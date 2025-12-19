from model.BaseModel import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from api.Exception.TokensModelException import TokensModelException
import torch
import torch.nn.functional as F

def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0] #First element of model_output contains all token embeddings
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

class BackBonedModel(BaseModel):
    def __init__(self, device, model_string, labels):
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
                model_output = self.model(**self.tokens)

            # Perform pooling
            sentence_embeddings = mean_pooling(model_output, self.tokens['attention_mask'])

            # Normalize embeddings
            sentence_embeddings = F.normalize(sentence_embeddings, p=2, dim=1)
            return sentence_embeddings
        except Exception as err:
            raise err