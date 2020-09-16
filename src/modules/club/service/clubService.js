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
    if (!club) throw new ClubNotDefinedError('A club is required to save to the database');
    const savedClub = this.clubRepository.save(club);
    return savedClub;
  }

  /**
   * @param {Number} id
   * @returns {Object}
   */
  async getById(id) {
    console.log(id);
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
