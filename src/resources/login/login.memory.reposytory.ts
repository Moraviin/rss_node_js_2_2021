import bcrypt from 'bcrypt';
import dbConnection from '../../db';
import { UserEntity } from '../entities/users';
import { IUserModel } from '../users/user.model';

const userRepository = dbConnection.then(connection => connection.getRepository(UserEntity));

const loginUser = async (login: string, password: string): Promise<IUserModel> => {
  const userRepo = await userRepository;

  const user = await userRepo.findOneOrFail({ login });

  const isPasswordIncorrect = !bcrypt.compareSync(password, user.password);

  if (isPasswordIncorrect) throw new Error();

  return user;
};

export default { loginUser };
