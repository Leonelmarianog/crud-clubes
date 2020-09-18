/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

const AbstractClubRepositoryError = require('../error/abstractClubRepositoryError');

/**
 * Defines common functionality for a clubRepository.
 */
class AbstractClubRepository {
  constructor() {
    if (new.target === AbstractClubRepository) {
      throw new AbstractClubRepositoryError("Can't instantiate an abstract class");
    }
  }

  /**
   * @param {Object<import("../../entity/club")} club
   * @returns {Object<import("../../entity/club")}
   */
  async save(club) {}

  /**
   * @param {Number} id
   */
  async delete(id) {}

  /**
   * @param {Number} id
   */
  async getById(id) {}

  /**
   * @returns {Array<import("../../entity/club")>}
   */
  async getAll() {}
}

module.exports = AbstractClubRepository;
