const uuid = require('uuid');
const fs = require('fs');
const { default: DIContainer, object, get, factory } = require('rsdi');
const ClubRepository = require('../modules/club/repository/json/clubRepository');

/**
 * @returns {Function}
 */
function configureUuid() {
  return uuid.v4;
}

/**
 * @returns {String}
 */
function configureMainJSONDatabase() {
  return process.env.JSON_DB_PATH;
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    fs,
    uuid: factory(configureUuid),
    JSONDatabase: factory(configureMainJSONDatabase),
  });
}

/**
 * @param {DIContainer} container
 */
function addClubModuleDefinitions(container) {
  container.addDefinitions({
    ClubRepository: object(ClubRepository).construct(get('uuid'), get('fs'), get('JSONDatabase')),
  });
}

/**
 * @returns {Object}
 */
function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addClubModuleDefinitions(container);
  return container;
}

module.exports = configureDI;
