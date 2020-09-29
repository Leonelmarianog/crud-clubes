// Load environment variables
require('dotenv').config();

// npm dependencies
const express = require('express');

// App Dependencies and modules
const configureDependencyInjection = require('./config/di');
const { setBodyParser, setStaticFilesPath, setSession, setMainRoute } = require('./config/express');
const setViewEngine = require('./config/viewEngine');
const { init: initClubModule } = require('./modules/club/module');

// Create Express App and set PORT number
const app = express();
const port = process.env.PORT || 3000;

// DIC
const container = configureDependencyInjection();

// App initialization
setBodyParser(app);
setStaticFilesPath(app);
setSession(app, container);
setViewEngine(app, container);
setMainRoute(app);
initClubModule(app, container);

app.listen(port, () => console.log(`Now listening to port ${port}`));
