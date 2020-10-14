const Club = require('../entity/club');

/**
 * @param {Object} - Data that comes from a form.
 * @returns {import("../entity/club")}
 */
function fromDataToEntity({
  id,
  name,
  'short-name': shortName,
  tla,
  'crest-url': crestUrl,
  address,
  phone,
  website,
  email,
  founded,
  'club-colors': clubColors,
  venue,
  // eslint-disable-next-line camelcase
  'fk-area-id': fk_area_id,
}) {
  return new Club({
    id: Number(id),
    name,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded: Number(founded),
    clubColors,
    venue,
    fk_area_id: Number(fk_area_id),
  });
}

/**
 * @param {Object} - Model instance data
 * @returns {import('../entity/club')}
 */
function fromModelToEntity(modelInstance) {
  return new Club(modelInstance.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromModelToEntity,
};
