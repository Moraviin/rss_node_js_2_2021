const { v4: uuid } = require('uuid');

/**
 * @typedef {Object} ColumnsModel
 * @property {string} id column id
 * @property {string} title column title
 * @property {string} order column order
 */


/**
 * @typedef {Object} BoardParams
 * @property {string} title Board title
 * @property {Array.<ColumnsModel>} columns Board order
 */

/**
 * @typedef {BoardParams & {id: string}} BoardModel Board model compose properties defined in BoardParams and id
 */

/**
 * Class representing a board
 */
class Board {
  /**
   * Create a board.
   * @param {BoardParams} newTask parameters for new board
   * @returns {BoardModel} new board
   */
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Return safe data of board
   * @param {BoardModel} board board model
   * @returns {BoardModel} board parameters from UserModel
   */
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
