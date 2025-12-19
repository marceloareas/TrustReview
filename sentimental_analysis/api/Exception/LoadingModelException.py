# api/Exception/LoadingModelException.py

class LoadingModelException(Exception):
    """Custom exception for model loading errors."""

    def __init__(self, model_path: str, message: str = None):
        if message is None:
            message = f"Erro ao carregar o modelo: {model_path}"
        super().__init__(message)
        self.model_path = model_path