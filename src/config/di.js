const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');
const { default: DIContainer, object, get, factory } = require('rsdi');
const { ClubController, ClubService, ClubRepository } = require('../modules/club/module');

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

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.CRESTS_UPLOAD_DIR);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  return multer({ storage });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    fs,
    uuid: factory(configureUuid),
    JSONDatabase: factory(configureMainJSONDatabase),
    Multer: factory(configureMulter),
  });
}

/**
 * @param {DIContainer} container
 */
function addClubModuleDefinitions(container) {
  container.addDefinitions({
    ClubController: object(ClubController).construct(get('Multer'), get('ClubService')),
    ClubService: object(ClubService).construct(get('ClubRepository')),
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
