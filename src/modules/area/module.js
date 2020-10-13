const AreaController = require('./controller/areaController');
const AreaService = require('./service/areaService');
const AreaRepository = require('./repository/sqlite/areaRepository');
const AreaModel = require('./model/areaModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').default} container
 */
function init(app, container) {
  /**
   * @type {import('./controller/areaController')} - areaController
   */
  const areaController = container.get('AreaController');
  areaController.configureRoutes(app);
}

module.exports = {
  init,
  AreaController,
  AreaService,
  AreaRepository,
  AreaModel,
};
