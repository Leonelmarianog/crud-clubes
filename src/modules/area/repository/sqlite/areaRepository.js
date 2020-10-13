const AbstractAreaRepository = require('./abstractAreaRepository');
const AreaNotFoundError = require('../error/areaNotFoundError');
const { fromModelToEntity } = require('../../mapper/areaMapper');

class AreaRepository extends AbstractAreaRepository {
  /**
   *
   * @param {import('../../model/areaModel')} AreaModel
   */
  constructor(AreaModel) {
    super();
    this.AreaModel = AreaModel;
  }

  /**
   * @param {import('../../entity/area')} area
   * @returns {Promise<import('../../entity/area')>}
   */
  async save(area) {
    const isUpdate = area.id;
    let areaId;

    if (isUpdate) {
      areaId = area.id;

      const [affectedRows] = await this.AreaModel.update(
        {
          name: area.name,
        },
        {
          where: {
            id: areaId,
          },
        }
      );

      if (affectedRows === 0) {
        throw new AreaNotFoundError(`Can't update area with id ${areaId} because it doesn't exist`);
      }
    } else {
      const areaData = await this.AreaModel.create({
        name: area.name,
      });

      areaId = areaData.id;
    }

    return this.getById(areaId);
  }

  /**
   * @param {Number} id
   * @returns {Promise<Boolean>}
   */
  async delete(id) {
    const deletedRows = await this.AreaModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new AreaNotFoundError(`Can't delete area with id ${id} because it doesn't exist`);
    }
    return true;
  }

  /**
   * @param {Number} id
   * @returns {Promise<import('../../entity/area')>}
   */
  async getById(id) {
    const areaData = await this.AreaModel.findByPk(id);
    if (!areaData) {
      throw new AreaNotFoundError(`Can't find area with id ${id}`);
    }
    const area = fromModelToEntity(areaData);
    return area;
  }

  /**
   * @returns {Promise<Array<import('../../entity/area')>>}
   */
  async getAll() {
    const areasData = await this.AreaModel.findAll();
    const areas = areasData.map((areaData) => fromModelToEntity(areaData));
    return areas;
  }
}

module.exports = AreaRepository;
