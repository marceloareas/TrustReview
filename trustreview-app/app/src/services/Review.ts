import type IApiClient from "../interfaces/IApiClient";
import type { IReview } from "../interfaces/Product";

export default class ReviewService {
    private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  async getTags(): Promise<IReview[]> {
    const response = await this.api.get('/reviews');
    return response.data as IReview[];
  }
}