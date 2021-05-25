const {v4: uuid} = require('uuid');

/**
 * @typedef {Object} UserParams
 * @property {string} name User name
 * @property {string} login User login
 * @property {string} password User password
 */

/**
 * @typedef {Object} UserModel User model compose properties defined in UserParams and id
 * @property {string} id User id
 * @property {string} name User name
 * @property {string} login User login
 * @property {string} password User password
 */

/**
 * @typedef {Object} SafeUserModel User model to response
 * @property {string} id User id
 * @property {string} name User name
 * @property {string} login User login
 */

/**
 * Class representing a user
 */
class User {
    /**
     * Create a user.
     * @param {UserParams} newUser parameters for new user
     * @returns {UserModel} new user
     */
  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return safe data of user
   * @param {UserModel} user User model
   * @returns {SafeUserModel} User parameters from UserModel
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
