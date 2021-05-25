const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * @typedef {import('./user.model').UserModel} UserModel
 * @typedef {import('./user.model').UserParams} UserParams
 */

/**
 * Return all users from inmemory DB by controller
 * @returns {Promise<Array.<UserModel>>} Promise what should resolve with array of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Return user from inmemory DB by controller
 * @param {string} id id of requested user
 * @returns {Promise<UserModel>} Promise what should resolve with user
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Create users in inmemory DB by controller;
 * @param {UserParams} newUser newUser parameters
 * @returns {Promise<UserModel>} Promise what should resolve with user
 */
const createUser = ({ name, login, password }) => usersRepo.createUser({ name, login, password });

/**
 * Delete user from inmemory DB by controllers; Unassign user tasks
 * @param {string} id user id
 * @returns {void} only error can be thrown or nothing
 */
const deleteById = (id) => {
  tasksRepo.removeUserById(id);
  usersRepo.deleteById(id);
};

/**
 * Update user by id in inmemory DB by controller
 * @param {UserModel} UserParams params for user update
 * @returns {Promise<UserModel>} Promise what should resolve with user
 */
const updateById = ({ id, name, login, password }) => usersRepo.updateById({ id, name, login, password });

module.exports = { getAll, getById, createUser, deleteById, updateById };
