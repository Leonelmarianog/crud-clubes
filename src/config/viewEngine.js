/**
 * @param {import("express").Application} app
 * @param {import("rsdi").default} container
 */
function setViewEngine(app, container) {
  const nunjucksEnv = container.get('NunjucksEnv');
  nunjucksEnv.express(app); // Sets Nunjucks as the rendering engine for the express app
}

module.exports = setViewEngine;
