const ClubNotDefinedError = require('./error/clubNotDefinedError');
const ClubNotFoundError = require('./error/clubNotFoundError');
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError');

class ClubService {
  /**
   * clubService dependencies.
   * @param {import("../repository/json/abstractClubRepository")} clubRepository
   */
  constructor(clubRepository) {
    this.clubRepository = clubRepository;
  }

  /**
   * Calls clubRepository to save/update a club.
   * @param {import("../entity/club")} club - A club entity.
   * @returns {import("../entity/club")} - A club entity.
   */
  async save(club) {
    if (!club) throw new ClubNotDefinedError('A club is required to save to the database');
    const savedClub = this.clubRepository.save(club);
    return savedClub;
  }

  /**
   * Calls clubRepository to delete a specific club.
   * @param {String} id - A club id.
   * @returns {Boolean} - A boolean value, true if a club was successfully deleted, false if otherwise.
   */
  async delete(id) {
    if (!id) throw new ClubIdNotDefinedError(`An id is required to delete a club`);
    const isDeleted = this.clubRepository.delete(id);
    return isDeleted;
  }

  /**
   * Calls clubRepository to return a specific club.
   * @param {String} id - A club id.
   * @returns {import("../entity/club")} - A club entity.
   */
  async getById(id) {
    if (!id) throw new ClubIdNotDefinedError('An id is required to get a club');
    const club = this.clubRepository.getById(id);
    return club;
  }

  /**
   * Calls clubRepository to return all clubes.
   * @returns {Array<import("../entity/club")>} - An array of club entities.
   */
  async getAll() {
    const clubes = this.clubRepository.getAll();
    return clubes;
  }
}

module.exports = ClubService;
