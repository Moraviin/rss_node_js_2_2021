import { v4 as uuid } from 'uuid';

export interface IUserParams {
  name: string;
  login: string;
  password: string;
}

export interface IUserModel extends IUserParams {
  id: string;
}

export type ISafeUser = Omit<IUserModel, 'password'>;

class User {
  id: IUserModel['id'];

  name: IUserModel['name'];

  login: IUserModel['login'];

  password: IUserModel['password'];

  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUserParams) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUserModel): ISafeUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
