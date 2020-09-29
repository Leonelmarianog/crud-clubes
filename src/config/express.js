const express = require('express');

/**
 * @param {import(express).Application} app
 */
function setBodyParser(app) {
  app.use(express.urlencoded({ extended: true }));
}

/**
 * @param {import("express").Application} app
 */
function setStaticFilesPath(app) {
  app.use('/public', express.static('public'));
}

/**
 * @param {import("express").Application} app
 * @param {import("rsdi").default} container
 */
function setSession(app, container) {
  app.use(container.get('Session'));
}

/**
 * @param {import("express").Application} app
 */
function setMainRoute(app) {
  app.get('/', (req, res) => {
    res.redirect('/club');
  });
}

module.exports = {
  setBodyParser,
  setStaticFilesPath,
  setSession,
  setMainRoute,
};
