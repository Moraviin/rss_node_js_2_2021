import usersRepo from './user.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import { IUserModel, IUserParams } from './user.model';

const getAll = (): Promise<IUserModel[]> => usersRepo.getAll();

const getById = (id: string): Promise<IUserModel | void> => usersRepo.getById(id);

const createUser = (user: IUserParams): Promise<IUserModel> => usersRepo.createUser(user);

const deleteById = (id: string): void => {
  tasksRepo.removeUserById(id);
  usersRepo.deleteById(id);
};

const updateById = ({ id, name, login, password }: IUserModel): Promise<IUserModel> =>
  usersRepo.updateById({
    id,
    name,
    login,
    password,
  });

export default {
  getAll,
  getById,
  createUser,
  deleteById,
  updateById,
};
