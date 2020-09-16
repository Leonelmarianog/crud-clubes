require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDependencyInjection = require('./config/di');
const { init: initClubModule } = require('./modules/club/module');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

nunjucks.configure('src/modules', {
  autoescape: true,
  express: app,
});

const container = configureDependencyInjection();

initClubModule(app, container);

app.get('/', (req, res) => {
  res.redirect('/club');
});

app.listen(port, () => console.log(`Now listening to port ${port}`));
