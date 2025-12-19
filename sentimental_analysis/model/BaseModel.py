from abc import ABC, abstractmethod

class BaseModel(ABC):
    def __init__(self,tokenizer,model,labels,device):
        self.tokenizer = tokenizer
        self.model = model
        self.device = device
        self.labels = labels
        self.tokens = None
    def TokenizerInput(self,sentences):
        self.tokens = self.tokenizer(
            sentences,
            padding=True,
            truncation=True,
            return_tensors='pt'
            ).to(self.model.device)
        return self.tokens