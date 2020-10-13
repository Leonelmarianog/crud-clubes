const Area = require('../entity/area');

/**
 * @param {Object} - Data that comes from a form
 * @returns {import('../entity/area')} - Area entity
 */
function fromDataToEntity({ id, name }) {
  return new Area({ id: Number(id), name });
}

/**
 * @param {Object} - Model instance
 * @returns {import('../entity/area')} - Area entity
 */
function fromModelToEntity(modelInstance) {
  return new Area(modelInstance.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromModelToEntity,
};
