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
    const data = response.data as { content: IProduct[] };
    return data.content;
  }

  async createProduct(product: Partial<IProduct>): Promise<IProduct> {
    //Por enquanto o back não tem imagem, colocar depois
    //A tela de criar produto também cria review, temos que ver como vai ficar
    console.log(product);
    const formData = new FormData();

    // Campos textuais
    formData.append("name", product.name || "");
    formData.append("description", product.description || "");

    /*if (product.tags && product.tags.length > 0) {
    product.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag.name ?? tag);
    });
  }*/
    console.log(formData);
    const response = await this.api.post("/products", product, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data as IProduct;
  }
}
