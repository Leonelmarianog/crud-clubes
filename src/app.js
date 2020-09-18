// Load environment variables
require('dotenv').config();

// npm dependencies
const express = require('express');
const nunjucks = require('nunjucks');

// DIC and app modules
const configureDependencyInjection = require('./config/di');
const { init: initClubModule } = require('./modules/club/module');

// Create Express App and set PORT number
const app = express();
const port = process.env.PORT || 3000;

const container = configureDependencyInjection();

// Middleware (body parser, setting static files folder, session middleware)
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(container.get('Session'));

// Template Engine config
nunjucks.configure('src/modules', {
  autoescape: true,
  express: app,
});

// App modules initialization
initClubModule(app, container);

// Redirect
app.get('/', (req, res) => {
  res.redirect('/club');
});

app.listen(port, () => console.log(`Now listening to port ${port}`));
