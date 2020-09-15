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
   * @param {Number} id
   * @returns {Object}
   */
  async getById(id) {
    if (!id) throw new ClubIdNotDefinedError('An id is required to get a club');
    const club = this.clubRepository.getById(id);
    return club;
  }

  async getAll() {
    const clubes = this.clubRepository.getAll();
    return clubes;
  }
}

module.exports = ClubService;
