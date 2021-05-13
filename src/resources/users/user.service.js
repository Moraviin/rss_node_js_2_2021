const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository')

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const createUser = ({name, login, password}) => usersRepo.createUser({name, login, password});
const deleteById = (id) => {
  tasksRepo.removeUserById(id);
  usersRepo.deleteById(id);
};
const updateById = ({id, name, login, password}) => usersRepo.updateById({id, name, login, password});

module.exports = { getAll, getById, createUser, deleteById, updateById };
