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
