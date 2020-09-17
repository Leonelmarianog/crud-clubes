require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDependencyInjection = require('./config/di');
const { init: initClubModule } = require('./modules/club/module');

const app = express();
const port = process.env.PORT || 3000;

const container = configureDependencyInjection();

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(container.get('Session'));

nunjucks.configure('src/modules', {
  autoescape: true,
  express: app,
});

initClubModule(app, container);

app.get('/', (req, res) => {
  res.redirect('/club');
});

app.listen(port, () => console.log(`Now listening to port ${port}`));
