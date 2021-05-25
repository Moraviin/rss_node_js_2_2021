const tasksRepo = require('./task.memory.repository');

/**
 * @typedef {import('./task.model').TaskModel} TaskModel
 * @typedef {import('./task.model').TaskParams} TaskParams
 */

/**
 * Return all tasks from inmemory DB by controller
 * @returns {Promise<Array.<TaskModel>>} Promise what should resolve with array of tasks
 */
const getAll = () => tasksRepo.getAll();

/**
 * Return task using id from inmemory DB by controller
 * @param {string} id id of requested task
 * @returns {Promise<TaskModel>} Promise what should resolve with task
 */
const getById = (id) => tasksRepo.getById(id);

/**
 * Create task in inmemory DB by controller;
 * @param {TaskParams} newUser newUser parameters
 * @returns {Promise<TaskModel>} Promise what should resolve with task
 */
const createTask = ({ title, order, description, userId, boardId, columnId }) =>
  tasksRepo.createTask({ title, order, description, userId, boardId, columnId });

/**
 * Delete task from inmemory DB by controllers;
 * @param {string} id task id
 * @returns {void} only error can be thrown or nothing
 */
const deleteById = (id) => tasksRepo.deleteById(id);

/**
 * Update task by id in inmemory DB by controller
 * @param {TaskModel} UserParams params for task update
 * @returns {Promise<TaskModel>} Promise what should resolve with task
 */
const updateById = ({ id, title, order, description, userId, boardId, columnId }) =>
  tasksRepo.updateById({ id, title, order, description, userId, boardId, columnId });

module.exports = { getAll, getById, createTask, deleteById, updateById };
