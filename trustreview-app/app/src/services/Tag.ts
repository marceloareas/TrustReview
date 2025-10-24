/**
 * TagService
 *
 * Propósito:
 *  Serviço responsável por operações relacionadas a tags.
 *
 * Uso:
 *  - Instanciar com um cliente `IApiClient` e chamar `getTags` para obter
 *    a lista de tags disponíveis.
 *
 * Entradas:
 *  - Construtor: `api: IApiClient`.
 *
 * Saídas:
 *  - Promise que resolve em `ITag[]`.
 *
 * Comportamento:
 *  - `getTags`: GET /tags -> retorna array de tags.
 */
import type IApiClient from "../interfaces/IApiClient";
import type { ITag } from "../interfaces/Product";

export default class TagService {
  private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  async getTags(): Promise<ITag[]> {
    const response = await this.api.get("/tags");
    return response.data as ITag[];
  }

  async createTag(name: string): Promise<ITag> {
    const response = await this.api.post("/tags", { name });
    return response.data as ITag;
  }
}
