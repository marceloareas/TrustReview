/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ProductService
 *
 * Propósito:
 *  Encapsular chamadas HTTP relacionadas a produtos (listar, buscar,
 *  obter por id, obter relacionados e criar).
 *
 * Uso:
 *  const svc = new ProductService(apiClient);
 *  const products = await svc.getProducts();
 *
 * Entradas:
 *  - Construtor: `api: IApiClient`.
 *  - Métodos: `term`, `productId`, `product` conforme assinado.
 *
 * Saídas:
 *  - Promises que resolvem em `IProduct` ou `IProduct[]`.
 *
 * Comportamento:
 *  - getProducts: GET /products -> IProduct[]
 *  - getProductsByTerm: GET /products/search?term=... -> IProduct[]
 *  - getProductById: GET /products/:id (params include=tags) -> IProduct
 *  - getRelatedProducts: GET /products/:id/related -> retorna `content: IProduct[]`
 *  - createProduct: POST /products -> IProduct
 */
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

  async getProductsByTags(tagIds: string[]): Promise<IProduct[]> {
    const response = await this.api.get("/products", {
      params: { tagIds },
    });
    return response.data as IProduct[];
  }

  async getRelatedProducts(productId: string): Promise<IProduct[]> {
    const response = await this.api.get(`/products/${productId}/related`);
    const data = response.data as { content: IProduct[] };
    return data.content;
  }

  async createProduct(product: Partial<IProduct>): Promise<IProduct> {
    console.log("Creating product:", product);

    const formData = new FormData();

    const jsonBlob = new Blob([
      JSON.stringify({
        name: product.name,
        description: product.description,
        reviewRating: (product as any).reviewRating,
        comment: (product as any).comment,
        pros: (product as any).pros,
        cons: (product as any).cons,
        tags: product.tags?.map((tag) => ({ id: tag.id, name: tag.name })),
      }),
    ]);

    formData.append("data", jsonBlob);

    if ((product as any).image instanceof File) {
      formData.append("image", (product as any).image);
    }

    const response = await this.api.post("/products", formData, {
      headers: { "Content-Type": undefined as any },
    });

    return response.data as IProduct;
  }
}
