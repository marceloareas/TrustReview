import type IApiClient from "../interfaces/IApiClient";
import type { IUser, UserDTO } from "../interfaces/IUser";

export default class UserService {
  private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  async createUser(data: UserDTO): Promise<IUser> {
    const response = await this.api.post("/user", data);
    return response.data as IUser;
  }

  async login(email: string, password: string): Promise<IUser> {
    const response = await this.api.post("/user/login", { email, password });
    return response.data as IUser;
  }
}
