/**
 * ReviewService
 *
 * Propósito:
 *  Serviço para operações de revisão (reviews) relacionadas a produtos.
 *
 * Uso:
 *  - Instanciar com um cliente `IApiClient` e usar os métodos para listar
 *    reviews de um produto ou postar uma nova review.
 *
 * Entradas:
 *  - Construtor: `api: IApiClient`.
 *  - `getReviews(productId: string)`, `postReview(review: ReviewDTO)`.
 *
 * Saídas:
 *  - Promises que resolvem em `IReview[]` ou `IReview`.
 *
 * Comportamento:
 *  - `getReviews`: GET /reviews/product/:productId -> retorna array de reviews (campo `content`).
 *  - `postReview`: POST /reviews com payload `ReviewDTO` -> cria e retorna a review.
 */
import type IApiClient from "../interfaces/IApiClient";
import type { IReview, ReviewDTO } from "../interfaces/Product";

export default class ReviewService {
  private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  async getReviews(productId: string): Promise<IReview[]> {
    const response = await this.api.get(`/reviews/product/${productId}`);
    return (response.data as { content: IReview[] }).content;
  }

    async getReviewByIds(userId: string,productId: string): Promise<IReview> {
    const response = await this.api.get(`/reviews/${userId}/${productId}`);
    return response.data as IReview;
  }

  async postReview(review: ReviewDTO): Promise<IReview> {
    console.log("Posted review response:", review);
    const response = await this.api.post("/reviews", review);
    return response.data as IReview;
  }


  async updateReview(userId: string, productId: string, newReview: Partial<ReviewDTO>): Promise<IReview> {
    const response = await this.api.patch(`/reviews/${userId}/${productId}`, newReview);
    return response.data as IReview;
  }
}
