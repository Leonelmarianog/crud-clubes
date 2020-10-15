const { Sequelize } = require('sequelize');
const AreaModel = require('../areaModel');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});

test('setup method defines the area table', async () => {
  AreaModel.setup(sequelize);
  await sequelize.sync({ force: true });

  const areas = await AreaModel.findAll();

  expect(Array.isArray(areas)).toBeTruthy();
});
