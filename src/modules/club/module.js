const ClubController = require('./controller/clubController');
const ClubService = require('./service/clubService');
const ClubRepository = require('./repository/json/clubRepository');

/**
 * @param {import("express").Application} app
 * @param {import("rsdi").IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {import("./controller/clubController")} clubController
   */
  const clubController = container.get('ClubController');
  clubController.configureRoutes(app);
}

module.exports = {
  init,
  ClubController,
  ClubService,
  ClubRepository,
};
