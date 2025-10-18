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

  async postReview(review: ReviewDTO): Promise<IReview> {
    const response = await this.api.post("/reviews", review);
    console.log("Posted review response:", response);
    return response.data as IReview;
  }
}
