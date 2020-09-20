/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

const AbstractClubRepositoryError = require('../error/abstractClubRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

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
   * Saves/Updates a club from the database.
   * @param {import("../../entity/club")} club - A club entity.
   * @returns {Promise<import("../../entity/club")>} - A promise that resolves to a club entity.
   */
  async save(club) {
    throw new MethodNotImplementedError();
  }

  /**
   * Deletes a club from the database.
   * @param {String} id - The id of a club.
   * @returns {Promise<Boolean>} - A promise that resolves to a boolean value, true if a club was successfully deleted, false if
   * otherwise.
   */
  async delete(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * Gets a single club from the database.
   * @param {String} id - The id of a club.
   * @returns {Promise<import("../../entity/club")>} - A promise that resolves to a club entity.
   */
  async getById(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * Gets all clubes from the database.
   * @returns {Promise<Array<import("../../entity/club")>>} - A promise that resolves to an array of club entities.
   */
  async getAll() {
    throw new MethodNotImplementedError();
  }
}

module.exports = AbstractClubRepository;
