import type IApiClient from "../interfaces/IApiClient";

export default class ProductService {
  private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  async getProducts() {
    const response = await this.api.post("/products");
    return response.data;
  }


  async getProductsByTerm(term: string) {
    const response = await this.api.post("/products/search", { term });
    return response.data;
  }

  async getProductById(productId: string) {
    const response = await this.api.post("/products", { productId });
    return response.data;
  }
}
