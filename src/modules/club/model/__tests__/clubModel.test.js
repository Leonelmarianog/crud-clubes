const { Sequelize } = require('sequelize');
const ClubModel = require('../clubModel');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});

test('setup method defines club table', async () => {
  ClubModel.setup(sequelize);
  await sequelize.sync({ force: true });

  const clubes = await ClubModel.findAll();

  expect(Array.isArray(clubes)).toBeTruthy();
});
