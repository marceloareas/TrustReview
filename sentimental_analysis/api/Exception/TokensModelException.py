# api/Exception/TokensModelException.py

class TokensModelException(Exception):
    """Custom exception for tokens loading errors."""

    def __init__(self, message: str = None):
        if message is None:
            message = f"Erro ao carregar o tokens"
        super().__init__(message)
        self.tokens = None