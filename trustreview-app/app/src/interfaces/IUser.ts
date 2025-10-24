/**
 * IUser / UserDTO
 *
 * Propósito:
 *  Definir os tipos relacionados a usuários utilizados pela aplicação.
 *
 * Uso:
 *  - `UserDTO`: payload para criação/registro de usuário (nome, email, senha).
 *  - `IUser`: representação do usuário no domínio (pode ser retornado pela API
 *    ou persistido localmente).
 *
 * Campos principais:
 *  - UserDTO: { name, email, password }
 *  - IUser: { id?, name, email, userType }
 */
export interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  userType: string;
}
