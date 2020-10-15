require('dotenv').config();
const configureDependencyInjection = require('../config/di');

/**
 * @type {import('rsdi').default} - DIC container
 */
const container = configureDependencyInjection();

/**
 * @type {import('sequelize').Sequelize} - mainDb
 */
const mainDb = container.get('Sequelize');

/**
 * @type {Class} - Club Model
 */
const ClubModel = container.get('ClubModel');

/**
 * @type {Class} - Area Model
 */
const AreaModel = container.get('AreaModel');

async function initDatabase() {
  await mainDb.sync({ force: true });

  await ClubModel.create(
    {
      name: 'Arsenal FC',
      shortName: 'Arsenal',
      tla: 'ARS',
      crestUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      address: '75 Drayton Park London N5 1BU',
      phone: '+44 (020) 76195003',
      website: 'http://www.arsenal.com',
      email: 'info@arsenal.co.uk',
      founded: 1886,
      clubColors: 'Red / White',
      venue: 'Emirates Stadium',
      area: [{ name: 'England' }],
    },
    {
      include: { model: AreaModel, as: 'area' },
    }
  );

  await ClubModel.create({
    name: 'Everton FC',
    shortName: 'Everton',
    tla: 'EVE',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg',
    address: 'Goodison Park Liverpool L4 4EL',
    phone: '+44 (0871) 6631878',
    website: 'http://www.evertonfc.com',
    email: 'everton@evertonfc.com',
    founded: 1878,
    clubColors: 'Blue / White',
    venue: 'Goodison Park',
    fk_area_id: 1,
  });
}

initDatabase();

module.exports = initDatabase;
