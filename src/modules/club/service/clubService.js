const ClubNotDefinedError = require('./error/clubNotDefinedError');
const ClubNotFoundError = require('./error/clubNotFoundError');
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError');

class ClubService {
  /**
   * @param {import("../repository/json/abstractClubRepository")} clubRepository
   */
  constructor(clubRepository) {
    this.clubRepository = clubRepository;
  }

  /**
   * @param {import("../entity/club")} club
   * @returns {import("../entity/club")}
   */
  async save(club) {
    if (!club) {
      throw new ClubNotDefinedError('A club is required to save to the database');
    }
    const savedClub = this.clubRepository.save(club);
    return savedClub;
  }

  /**
   * @param {String} id
   * @returns {Boolean}
   */
  async delete(id) {
    if (!id) {
      throw new ClubIdNotDefinedError(`An id is required to delete a club`);
    }
    const isDeleted = this.clubRepository.delete(id);
    return isDeleted;
  }

  /**
   * @param {String} id
   * @returns {import("../entity/club")}
   */
  async getById(id) {
    if (!id) {
      throw new ClubIdNotDefinedError('An id is required to get a club');
    }
    const club = this.clubRepository.getById(id);
    return club;
  }

  /**
   * @returns {Array<import("../entity/club")>}
   */
  async getAll() {
    const clubes = this.clubRepository.getAll();
    return clubes;
  }
}

module.exports = ClubService;
