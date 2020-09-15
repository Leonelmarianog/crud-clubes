require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDependencyInjection = require('./config/di');

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure('src/modules', {
  autoescape: true,
  express: app,
});

app.get('/', async (req, res) => {
  const container = configureDependencyInjection();
  /**
   * @type {import("./modules/club/repository/json/clubRepository")} ClubRepository
   */
  const ClubRepository = container.get('ClubRepository');
  const clubes = await ClubRepository.getAll();
  res.render('club/views/index.html', { clubes });
});

app.listen(port, () => console.log(`Now listening to port ${port}`));
