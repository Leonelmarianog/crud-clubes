require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const fromDataToEntity = require('./modules/club/mapper/clubMapper');

const configureDependencyInjection = require('./config/di');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

nunjucks.configure('src/modules', {
  autoescape: true,
  express: app,
});

const container = configureDependencyInjection();
const clubService = container.get('ClubService');

app.get('/', async (req, res) => {
  const clubes = await clubService.getAll();
  res.render('club/views/index.html', { clubes });
});

app.get('/create', (req, res) => {
  res.render('club/views/form.html');
});

app.post('/save', async (req, res) => {
  const clubData = { ...req.body };
  const club = fromDataToEntity(clubData);
  const savedClub = await clubService.save(club);
  res.redirect(`/${savedClub.id}`);
});

app.get('/:id', async (req, res) => {
  const clubId = req.params.id;
  const club = await clubService.getById(clubId);
  res.render('club/views/club.html', { club });
});

app.listen(port, () => console.log(`Now listening to port ${port}`));
