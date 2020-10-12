/* eslint-disable eqeqeq */

const AbstractClubRepository = require('./abstractClubRepository');
/* const Club = require('../../entity/club'); */
const { fromModelToEntity } = require('../../mapper/clubMapper');
/* const ClubNotDefinedError = require('../error/clubNotDefinedError'); */
const ClubNotFoundError = require('../error/clubNotFoundError');
/* const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError'); */

class ClubRepository extends AbstractClubRepository {
  /**
   * @param {import('../../model/ClubModel')} ClubModel
   */
  constructor(ClubModel) {
    super();
    this.ClubModel = ClubModel;
  }

  /**
   * @param {import("../../entity/club")} club
   * @returns {Promise<import("../../entity/club")>}
   */
  async save(club) {
    const isUpdate = club.id;
    let clubId;

    if (isUpdate) {
      const valuesToUpdate = {
        name: club.name,
        shortName: club.shortName,
        tla: club.tla,
        address: club.address,
        phone: club.phone,
        website: club.website,
        email: club.email,
        founded: club.founded,
        clubColors: club.clubColors,
        venue: club.venue,
      };

      if (club.crestUrl) {
        valuesToUpdate.crestUrl = club.crestUrl;
      }

      const [affectedRows] = await this.ClubModel.update(valuesToUpdate, {
        where: {
          id: club.id,
        },
      });

      if (affectedRows === 0) {
        throw new ClubNotFoundError(
          `Can't update club with id ${club.id} because it doesn't exist`
        );
      }

      clubId = club.id;
    } else {
      const clubData = await this.ClubModel.create({
        name: club.name,
        shortName: club.shortName,
        tla: club.tla,
        crestUrl: club.crestUrl,
        address: club.address,
        phone: club.phone,
        website: club.website,
        email: club.email,
        founded: club.founded,
        clubColors: club.clubColors,
        venue: club.venue,
      });

      clubId = clubData.id;
    }

    return this.getById(clubId);
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async delete(id) {
    const deletedRows = await this.ClubModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new ClubNotFoundError(`Can't delete club with id ${id} because it doesn't exist`);
    }
    return true;
  }

  /**
   * @param {String} id
   * @returns {Promise<import("../../entity/club")>}
   */
  async getById(id) {
    const clubData = await this.ClubModel.findByPk(id);
    if (!clubData) {
      throw new ClubNotFoundError(`Can't find club with id ${id}`);
    }
    const club = fromModelToEntity(clubData);
    return club;
  }

  /**
   * @returns {Promise<Array<import("../../entity/club")>>}
   */
  async getAll() {
    const clubesData = await this.ClubModel.findAll();
    const clubes = clubesData.map((clubData) => fromModelToEntity(clubData));
    return clubes;
  }
}

module.exports = ClubRepository;
