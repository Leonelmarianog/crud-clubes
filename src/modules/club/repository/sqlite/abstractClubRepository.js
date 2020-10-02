/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

const AbstractClubRepositoryError = require('../error/abstractClubRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

class AbstractClubRepository {
  constructor() {
    if (new.target === AbstractClubRepository) {
      throw new AbstractClubRepositoryError("Can't instantiate an abstract class");
    }
  }

  /**
   * @param {import("../../entity/club")} club
   * @returns {Promise<import("../../entity/club")>}
   */
  async save(club) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async delete(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {String} id
   * @returns {Promise<import("../../entity/club")>}
   */
  async getById(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @returns {Promise<Array<import("../../entity/club")>>}
   */
  async getAll() {
    throw new MethodNotImplementedError();
  }
}

module.exports = AbstractClubRepository;
