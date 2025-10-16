import type IApiClient from "../interfaces/IApiClient";
import type { IUser } from "../interfaces/Product";

export default class UserService {
  private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  async createUser(data: IUser): Promise<IUser> {
    const response = await this.api.post("/user", data);
    return response.data as IUser;
  }
}
