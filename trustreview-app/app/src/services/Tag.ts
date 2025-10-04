import type IApiClient from "../interfaces/IApiClient";

export default class TagService {
    private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  async getTagsByProductId(productId: string) {
    const response = await this.api.post('/tags', { productId });
    return response.data;
  }
}