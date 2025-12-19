from pydantic import BaseModel, UUID4, PositiveFloat, Field
# Define o schema e as rotas

class ReviewModel(BaseModel):
    """
    Exemplo de review:{
            "userId":"669ba796-717a-4a70-845b-2d8c6aee5d86",
            "productId":"faf86d8d-c1b3-43b8-b770-894d3771a4b7",
            "title":"LINDO PRODUTO, RECOMENDO",
            "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "pros":[
                "bom",
                "bonito",
                "barato"
            ],
            "con":[
                "ruim",
                "feio",
                "caro"
            ],
            "rating": 5.0
        }
    """
    userId: UUID4
    productId: UUID4
    description: str
    rating: PositiveFloat
    pros: list[str] = Field(default_factory=list)
    con: list[str] = Field(default_factory=list)