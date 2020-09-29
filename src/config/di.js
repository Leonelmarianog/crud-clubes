const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');
const session = require('express-session');
const nunjucks = require('nunjucks');
const { default: DIContainer, object, get, factory } = require('rsdi');
const { ClubController, ClubService, ClubRepository } = require('../modules/club/module');

/**
 * For details of uuid, go to https://www.npmjs.com/package/uuid
 * @returns {Function} - A function which creates a random UUID when called.
 */
function configureUuid() {
  return uuid.v4;
}

/**
 * @returns {String} - The database file path.
 */
function configureMainJSONDatabase() {
  return process.env.JSON_DB_PATH;
}

/**
 * Sets multer options. For details, go to https://www.npmjs.com/package/multer
 * @returns {import(multer)} - Middleware for handling multiform/form-data.
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
 * Sets session options. For details, go to https://www.npmjs.com/package/express-session
 * @returns {import("express-session")} - A Session middleware with options already set.
 */
function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000;
  const sessionOptions = {
    secret: process.env.SESSION_SECRET, // Cookie encryption
    resave: false, //
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}

/**
 * @returns {import("nunjucks").FileSystemLoader} - An object. Used to load templates from the file system.
 */
function configureNunjucksFLS() {
  return new nunjucks.FileSystemLoader('src/modules');
}

/**
 * @returns {Object} - An object with options for Nunjucks.
 */
function setNunjucksOptions() {
  return { autoescape: true };
}

/**
 * @param {DIContainer} container - A dependency Injection container.
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
 * Definitions for the view engine - Based from https://mozilla.github.io/nunjucks/api.html
 * Basically, Nunjucks can be configured automatically and really easily, but for me to be able to use my DIC, I have to configure
 * it manually using the Nunjucks Environment Class, which is responsible for template loading.
 * @param {DIContainer} container - A dependency Injection container.
 */
function addNunjucksDefinitions(container) {
  container.addDefinitions({
    NunjucksFLS: factory(configureNunjucksFLS),
    NunjucksOptions: factory(setNunjucksOptions),
    NunjucksEnv: object(nunjucks.Environment).construct(get('NunjucksFLS'), get('NunjucksOptions')),
  });
}

/**
 * @param {DIContainer} container - A dependency Injection container.
 */
function addClubModuleDefinitions(container) {
  container.addDefinitions({
    ClubController: object(ClubController).construct(get('Multer'), get('ClubService')),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository).construct(get('uuid'), get('fs'), get('JSONDatabase')),
  });
}

/**
 * For details of RSDI, go to https://www.npmjs.com/package/rsdi
 * @returns {DIContainer} - A dependency Injection container with definitions set.
 */
function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addNunjucksDefinitions(container);
  addClubModuleDefinitions(container);
  return container;
}

module.exports = configureDI;
