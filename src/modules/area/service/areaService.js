const AreaNotDefinedError = require('./error/areaNotDefinedError');
const AreaIdNotDefinedError = require('./error/areaIdNotDefinedError');

class AreaService {
  /**
   * @param {import('../repository/sqlite/areaRepository')} areaRepository
   */
  constructor(areaRepository) {
    this.areaRepository = areaRepository;
  }

  /**
   * @param {import('../../entity/area')} area
   * @returns {Promise<import('../../entity/area')>}
   */
  async save(area) {
    if (!area) {
      throw new AreaNotDefinedError('An area is required to save to the database');
    }
    const savedArea = await this.areaRepository.save(area);
    return savedArea;
  }

  /**
   * @param {Number} id
   * @returns {Promise<Boolean>}
   */
  async delete(id) {
    if (!id) {
      throw new AreaIdNotDefinedError('An id is required to delete an area');
    }
    const isDeleted = await this.areaRepository.delete(id);
    return isDeleted;
  }

  /**
   * @param {Number} id
   * @returns {Promise<import('../../entity/area')>}
   */
  async getById(id) {
    if (!id) {
      throw new AreaIdNotDefinedError('An id is required to get an area');
    }
    const area = await this.areaRepository.getById(id);
    return area;
  }

  /**
   * @returns {Promise<Array<import('../entity/area')>>}
   */
  async getAll() {
    const areas = await this.areaRepository.getAll();
    return areas;
  }
}

module.exports = AreaService;
