const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = (id) => tasksRepo.getById(id);
const createTask = ({ id, title, order, description, userId, boardId, columnId }) => tasksRepo.createTask({ id, title, order, description, userId, boardId, columnId });
const deleteById = (id) => tasksRepo.deleteById(id);
const updateById = ({ id, title, order, description, userId, boardId, columnId }) => tasksRepo.updateById({ id, title, order, description, userId, boardId, columnId });

module.exports = { getAll, getById, createTask, deleteById, updateById };
