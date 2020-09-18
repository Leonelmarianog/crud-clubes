/* eslint-disable eqeqeq */

const AbstractClubRepository = require('./abstractClubRepository');
const Club = require('../../entity/club');
const ClubNotDefinedError = require('../error/clubNotDefinedError');
const ClubNotFoundError = require('../error/clubNotFoundError');
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError');

class ClubRepository extends AbstractClubRepository {
  /**
   * clubRepository dependencies.
   * @param {import("uuid")} uuid
   * @param {import("fs")} fs
   * @param {string} dbFilePath
   */
  constructor(uuid, fs, dbFilePath) {
    super();
    this.uuid = uuid;
    this.fs = fs;
    this.dbFilePath = dbFilePath;
  }

  /**
   * Saves/Updates a club from the database.
   * @param {import("../../entity/club")} club - A club entity.
   * @returns {Promise<import("../../entity/club")>} - A promise that resolves to a club entity.
   */
  async save(club) {
    const clubsData = this.getData();

    let clubToSave;

    // if club.id is truthy, then we are updating a club
    if (club.id) {
      const clubIndex = clubsData.findIndex((clubData) => clubData.id == club.id);

      if (clubIndex === -1) {
        throw new ClubNotFoundError(
          `Can't update club with id ${club.id} because it doesn't exist`
        );
      }

      const oldClubData = clubsData[clubIndex]; // save a reference to the old club
      clubsData[clubIndex] = club; // update clubsData[clubIndex] reference to point to the updated club

      // Check if an image was uploaded. If it wasn't, use the old image the club had
      if (!club.crestUrl) {
        clubsData[clubIndex].crestUrl = oldClubData.crestUrl;
      }

      clubToSave = club;
    } else {
      clubToSave = { ...club, id: this.uuid() }; // use uuid to create a new id for the new club
      clubsData.push(clubToSave);
    }
    this.saveData(clubsData);
    return new Club(clubToSave);
  }

  /**
   * Deletes a club from the database.
   * @param {String} id - The id of a club.
   * @returns {Promise<Boolean>} - A promise that resolves to a boolean value, true if a club was successfully deleted, false if
   * otherwise.
   */
  async delete(id) {
    const clubsData = this.getData();
    const clubIndex = clubsData.findIndex((clubData) => clubData.id == id);
    if (clubIndex === -1) {
      throw new ClubNotFoundError(`Can't delete club with id ${id} because it doesn't exist`);
    }
    clubsData.splice(clubIndex, 1);
    this.saveData(clubsData);
    return true;
  }

  /**
   * Gets a single clube from the database.
   * @param {String} id - The id of a club.
   * @returns {Promise<import("../../entity/club")>} - A promise that resolves to a club entity.
   */
  async getById(id) {
    const clubsData = this.getData();
    const club = clubsData.find((clubData) => clubData.id == id);
    if (!club) throw new ClubNotFoundError(`Can't find club with id ${id}`);
    return new Club(club);
  }

  /**
   * Gets all clubes from the database.
   * @returns {Promise<Array<import("../../entity/club")>>} - A promise that resolves to an array of club entities.
   */
  async getAll() {
    const clubsData = this.getData();
    const clubs = clubsData.map((clubData) => new Club(clubData));
    return clubs;
  }

  /**
   * Parses database data.
   * @returns {Array<JSON>} - An array of JSON data if the file was successfully parsed, otherwise, an empty array.
   */
  getData() {
    const content = this.fs.readFileSync(this.dbFilePath, { encoding: 'utf-8' });
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      parsedContent = [];
    }
    return parsedContent;
  }

  /**
   * Writes to the database.
   * @param {Array<import('../../entity/club')>} content - An array of club entities.
   */
  saveData(content) {
    this.fs.writeFileSync(this.dbFilePath, JSON.stringify(content));
  }
}

module.exports = ClubRepository;
