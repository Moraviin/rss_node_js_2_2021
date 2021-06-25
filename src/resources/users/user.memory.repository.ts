import dbConnection from '../../db';
import { hashPassword } from '../../authtenticate-service';
import { UserEntity } from '../entities/users';
import { IUserModel, IUserParams } from './user.model';

const userRepository = dbConnection.then(connection => connection.getRepository(UserEntity));

const getAll = async (): Promise<IUserModel[]> => {
  const userRepo = await userRepository;
  const allUsers = await userRepo.find();
  console.log(allUsers);
  return allUsers;
};

const getById = async (id: string): Promise<IUserModel | void> => {
  const userRepo = await userRepository;
  return userRepo.findOne({ where: { id } });
};

const createUser = async ({ name, login, password }: IUserParams): Promise<IUserModel> => {
  const userRepo = await userRepository;
  const passwordHash = hashPassword(password);
  const insertResponse = await userRepo.insert({ name, login, password: passwordHash });
  const userId = insertResponse.identifiers[0];
  return userRepo.findOneOrFail({ where: userId });
};

const deleteById = async (id: string): Promise<void> => {
  const userRepo = await userRepository;
  await userRepo.delete({ id });
};

const updateById = async ({ id, name, login, password }: IUserModel): Promise<IUserModel> => {
  const userRepo = await userRepository;

  await userRepo.findOneOrFail({ id });
  const passwordHash = hashPassword(password);

  const userUpdate = await userRepo.save({ id, name, login, password: passwordHash });

  return userUpdate;
};

export default {
  getAll,
  getById,
  createUser,
  deleteById,
  updateById,
};
