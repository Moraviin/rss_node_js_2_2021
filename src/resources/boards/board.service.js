const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * @import {BoardModel} from './board.model'
 * @import {BoardParams} from './board.model'
 */

/**
 * Return all boards from inmemory DB by controller
 * @returns {Promise<Array.<BoardModel>>} Promise what should resolve with array of boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Return board in inmemory DB by controller
 * @param {string} id id of requested board
 * @returns {Promise<BoardModel>} Promise what should resolve with board
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * Create board from inmemory DB by controller;
 * @param {BoardParams} newBoard newBoard parameters
 * @returns {Promise<BoardModel>} Promise what should resolve with board
 */
const createBoard = ({ id, title, columns }) => boardsRepo.createBoard({ id, title, columns });

/**
 * Delete board from inmemory DB by controllers; Unassign taskboards
 * @param {string} id board id
 * @returns {void} only error can be thrown or nothing
 */
const deleteById = (id) => {
  tasksRepo.deleteTasksByBoardId(id);
  boardsRepo.deleteById(id);
};

/**
 * Update board by id in inmemory DB by controller
 * @param {BoardModel} UserParams params for board update
 * @returns {Promise<BoardModel>} Promise what should resolve with board
 */
const updateById = ({ id, title, columns }) => boardsRepo.updateById({ id, title, columns });

module.exports = { getAll, getById, createBoard, deleteById, updateById };
