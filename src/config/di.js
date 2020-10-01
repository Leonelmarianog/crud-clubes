const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');
const session = require('express-session');
const nunjucks = require('nunjucks');
const { default: DIContainer, object, get, factory } = require('rsdi');
const { ClubController, ClubService, ClubRepository } = require('../modules/club/module');

/**
 * https://www.npmjs.com/package/uuid
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
 * https://www.npmjs.com/package/multer
 * @returns {import(multer)}
 */
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
 * https://www.npmjs.com/package/express-session
 * @returns {import("express-session")}
 */
function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000;
  const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}

/**
 * @returns {import("nunjucks").FileSystemLoader}
 */
function configureNunjucksFLS() {
  return new nunjucks.FileSystemLoader('src/modules');
}

/**
 * @returns {Object}
 */
function setNunjucksOptions() {
  return { autoescape: true };
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
    Session: factory(configureSession),
  });
}

/**
 * https://mozilla.github.io/nunjucks/api.html
 * @param {DIContainer} container
 */
function addNunjucksDefinitions(container) {
  container.addDefinitions({
    NunjucksFLS: factory(configureNunjucksFLS),
    NunjucksOptions: factory(setNunjucksOptions),
    NunjucksEnv: object(nunjucks.Environment).construct(get('NunjucksFLS'), get('NunjucksOptions')),
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
 * https://www.npmjs.com/package/rsdi
 * @returns {DIContainer}
 */
function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addNunjucksDefinitions(container);
  addClubModuleDefinitions(container);
  return container;
}

module.exports = configureDI;
