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
