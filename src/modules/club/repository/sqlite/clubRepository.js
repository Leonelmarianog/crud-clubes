/* eslint-disable eqeqeq */

const AbstractClubRepository = require('./abstractClubRepository');
const Club = require('../../entity/club');
const { fromDbToEntity } = require('../../mapper/clubMapper');
const ClubNotDefinedError = require('../error/clubNotDefinedError');
const ClubNotFoundError = require('../error/clubNotFoundError');
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError');

class ClubRepository extends AbstractClubRepository {
  /**
   * @param {import("better-sqlite3").Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    super();
    this.databaseAdapter = databaseAdapter;
  }

  /**
   * @param {import("../../entity/club")} club
   * @returns {Promise<import("../../entity/club")>}
   */
  async save(club) {
    let clubId;
    const isUpdate = club.id;

    if (isUpdate) {
      clubId = club.id;

      const statement = this.databaseAdapter.prepare(
        `UPDATE clubes SET
          ${club.crestUrl ? 'crest_url = ?,' : ''} 
          name = ?,
          short_name = ?,
          tla = ?,
          address = ?,
          phone = ?,
          website = ?,
          email = ?,
          founded = ?,
          club_colors = ?,
          venue = ?
        WHERE id = ?`
      );

      const params = [
        club.name,
        club.shortName,
        club.tla,
        club.address,
        club.phone,
        club.website,
        club.email,
        club.founded,
        club.clubColors,
        club.venue,
        club.id,
      ];

      if (club.crestUrl) {
        params.unshift(club.crestUrl);
      }

      const result = statement.run(params);

      if (result.changes === 0) {
        throw new ClubNotFoundError(
          `Can't update club with id ${club.id} because it doesn't exist`
        );
      }
    } else {
      const statement = this.databaseAdapter.prepare(
        `INSERT INTO clubes 
          (name, short_name, tla, crest_url, address, phone, website, email, founded, club_colors, venue)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );

      const result = statement.run(
        club.name,
        club.shortName,
        club.tla,
        club.crestUrl,
        club.address,
        club.phone,
        club.website,
        club.email,
        club.founded,
        club.clubColors,
        club.venue
      );

      clubId = result.lastInsertRowid;
    }

    return this.getById(clubId);
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async delete(id) {
    const statement = this.databaseAdapter.prepare(`DELETE FROM clubes WHERE id = ?`);
    const result = statement.run(id);

    if (result.changes === 0) {
      throw new ClubNotFoundError(`Can't delete club with id ${id} because it doesn't exist`);
    }

    return true;
  }

  /**
   * @param {String} id
   * @returns {Promise<import("../../entity/club")>}
   */
  async getById(id) {
    const clubData = this.databaseAdapter
      .prepare(
        `SELECT
          id,
          name,
          short_name,
          tla,
          crest_url,
          address,
          phone,
          website,
          email,
          founded,
          club_colors,
          venue
        FROM clubes
        WHERE id = ?`
      )
      .get(id);

    if (!clubData) {
      throw new ClubNotFoundError(`Can't find club with id ${id}`);
    }

    return fromDbToEntity(clubData);
  }

  /**
   * @returns {Promise<Array<import("../../entity/club")>>}
   */
  async getAll() {
    const clubesData = this.databaseAdapter
      .prepare(
        `SELECT
          id,
          name,
          short_name,
          tla,
          crest_url,
          address,
          phone,
          website,
          email,
          founded,
          club_colors,
          venue
        FROM clubes`
      )
      .all();

    return clubesData.map((clubData) => fromDbToEntity(clubData));
  }
}

module.exports = ClubRepository;
