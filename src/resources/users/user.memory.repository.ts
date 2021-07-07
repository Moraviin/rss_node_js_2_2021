import dbConnection from '../../db';
import { UserEntity } from '../entities/users';
import { IUserModel, IUserParams } from './user.model';

const userRepository = dbConnection.then(connection => connection.getRepository(UserEntity));

const getAll = async (): Promise<IUserModel[]> => {
  const userRepo = await userRepository;
  return userRepo.find();
};

const getById = async (id: string): Promise<IUserModel | void> => {
  const userRepo = await userRepository;
  return userRepo.findOne({ where: { id } });
};

const createUser = async ({ name, login, password }: IUserParams): Promise<IUserModel> => {
  const userRepo = await userRepository;
  const insertResponse = await userRepo.insert({ name, login, password });
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
  const userUpdate = await userRepo.save({ id, name, login, password });

  return userUpdate;
};

export default {
  getAll,
  getById,
  createUser,
  deleteById,
  updateById,
};
