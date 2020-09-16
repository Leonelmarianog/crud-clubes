/* eslint-disable eqeqeq */

const AbstractClubRepository = require('./abstractClubRepository');
const Club = require('../../entity/club');
const ClubNotDefinedError = require('../error/clubNotDefinedError');
const ClubNotFoundError = require('../error/clubNotFoundError');

class ClubRepository extends AbstractClubRepository {
  /**
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
   * @param {import("../../entity/club")} club
   * @returns {Promise<import("../../entity/club")}
   */
  async save(club) {
    const clubsData = this.getData();
    const clubToSave = { ...club, id: this.uuid() };
    clubsData.push(clubToSave);
    this.saveData(clubsData);
    return new Club(clubToSave);
  }

  /**
   * @param {Number}
   * @returns {Object}
   */
  async getById(id) {
    const clubsData = this.getData();
    const club = clubsData.find((clubData) => clubData.id == id);
    if (!club) throw new ClubNotFoundError(`Can't find club with ${id}`);
    return new Club(club);
  }

  /**
   * @returns {Promise<Array<import("../../entity/club")>>}
   */
  async getAll() {
    const clubsData = this.getData();
    const clubs = clubsData.map((clubData) => new Club(clubData));
    return clubs;
  }

  /**
   * @returns {Array}
   */
  getData() {
    const content = this.fs.readFileSync(this.dbFilePath, { encoding: 'utf-8' });
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      parsedContent = [];
    }
    return parsedContent;
  }

  /**
   * @param {Array<import('../../entity/club')} content
   */
  saveData(content) {
    this.fs.writeFileSync(this.dbFilePath, JSON.stringify(content));
  }
}

module.exports = ClubRepository;
