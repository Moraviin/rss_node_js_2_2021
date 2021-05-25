const { v4: uuid } = require('uuid');

/**
 * @typedef {Object} TaskParams
 * @property {string} title Task title
 * @property {string} order Task order
 * @property {string} description Task order
 * @property {string} boardId Task order
 * @property {string} userId Task order
 * @property {string} columnId Task order
 */

/**
 * @typedef {TaskParams & {id: string}} TaskModel Task model compose properties defined in BoardParams and id
 */

/**
 * Class representing a task
 */
class Task {
  /**
   * Create a task.
   * @param {TaskParams} newTask parameters for new task
   * @returns {TaskModel} new task
   */
  constructor({
    title = 'BOARD',
    order = 0,
    description = 'description',
    boardId = null,
    userId = null,
    columnId = null,
  } = {}) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

    /**
   * Return safe data of task
   * @param {TaskModel} task Task model
   * @returns {TaskModel} Task parameters from UserModel
   */
  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
