import User, { IUserModel, IUserParams } from './user.model';

const allUsers: IUserModel[] = [];

const getAll = async (): Promise<IUserModel[]> => allUsers;
const getById = async (id: string): Promise<IUserModel | void> =>
  allUsers.find(user => user.id === id);

const createUser = async ({
  name,
  login,
  password,
}: IUserParams): Promise<IUserModel> => {
  const user = new User({ name, login, password });
  allUsers.push(user);
  return user;
};

const deleteById = async (id: string): Promise<void> => {
  const userPosition = allUsers.findIndex(user => user.id === id);

  if (userPosition === -1) {
    throw new Error('User not found');
  } else {
    allUsers.splice(userPosition, 1);
  }
};

const updateById = async ({
  id,
  name,
  login,
  password,
}: IUserModel): Promise<IUserModel> => {
  const userPosition = allUsers.findIndex(user => user.id === id);

  if (userPosition === -1) {
    throw new Error('User not found');
  } else {
    const oldUser = allUsers[userPosition];
    const newUser = {
      ...oldUser,
      name,
      login,
      password,
      id,
    };

    allUsers.splice(userPosition, 1, newUser);
    return newUser;
  }
};

export default {
  allUsers,
  getAll,
  getById,
  createUser,
  deleteById,
  updateById,
};
