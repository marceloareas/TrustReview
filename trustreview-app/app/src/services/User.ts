/**
 * UserService
 *
 * Propósito:
 *  Serviço para operações de usuário (criação e autenticação).
 *
 * Uso:
 *  - Instanciar com um cliente `IApiClient` e usar `createUser` ou `login`.
 *
 * Entradas:
 *  - Construtor: `api: IApiClient`.
 *  - `createUser(data: UserDTO)`, `login(email: string, password: string)`.
 *
 * Saídas:
 *  - Promises que resolvem em `IUser`.
 *
 * Comportamento:
 *  - `createUser`: POST /user com payload `UserDTO` -> retorna o usuário criado.
 *  - `login`: POST /user/login com email e password -> retorna usuário autenticado.
 */
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
