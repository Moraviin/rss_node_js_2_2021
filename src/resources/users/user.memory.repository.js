const User = require('./user.model');

const allUsers = [new User({ name: 'admin', login: 'admin', password: 'admin' })];

const getAll = async () => allUsers;
const getById = async (id) => allUsers.find((user) => user.id === id);

const createUser = async ({ name, login, password }) => {
  const user = new User({ name, login, password });
  allUsers.push(user);
  return user;
};

const deleteById = async (id) => {
  const userPosition = allUsers.findIndex((user) => user.id === id);

  if (userPosition === -1) {
    throw new Error('User not found');
  } else {
    allUsers.splice(userPosition, 1);
  }
};

const updateById = async ({ id, name, login, password }) => {
  const userPosition = allUsers.findIndex((user) => user.id === id);

  if (userPosition === -1) {
    throw new Error('User not found');
  } else {
    const oldUser = allUsers[userPosition];
    const newUser = { ...oldUser, name, login, password };

    allUsers.splice(userPosition, 1, newUser);
    return newUser;
  }
};

module.exports = { allUsers, getAll, getById, createUser, deleteById, updateById };
