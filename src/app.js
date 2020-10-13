require('dotenv').config();

const express = require('express');
const configureDependencyInjection = require('./config/di');
const { setBodyParser, setStaticFilesPath, setSession, setMainRoute } = require('./config/express');
const setViewEngine = require('./config/viewEngine');
const { init: initClubModule } = require('./modules/club/module');
const { init: initAreaModule } = require('./modules/area/module');

const app = express();
const port = process.env.PORT || 3000;
const container = configureDependencyInjection();

setBodyParser(app);
setStaticFilesPath(app);
setSession(app, container);
setViewEngine(app, container);
setMainRoute(app);
initAreaModule(app, container);
initClubModule(app, container);

app.listen(port, () => console.log(`Now listening to port ${port}`));
