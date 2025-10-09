import type IApiClient from "../interfaces/IApiClient";
import type { IProduct } from "../interfaces/Product";

export default class ProductService {
  private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  async getProducts(): Promise<IProduct[]> {
    const response = await this.api.get("/products");
    return response.data as IProduct[];
  }

  async getProductsByTerm(term: string): Promise<IProduct[]> {
    const response = await this.api.get("/products/search", {
      params: { term },
    });
    return response.data as IProduct[];
  }

  async getProductById(productId: string): Promise<IProduct> {
    const response = await this.api.get(`/products/${productId}`, {
      params: { include: "tags" },
    });
    return response.data as IProduct;
  }

  async getRelatedProducts(productId: string): Promise<IProduct[]> {
    const response = await this.api.get(`/products/${productId}/related`);
    return response.data as IProduct[];
  }
}
