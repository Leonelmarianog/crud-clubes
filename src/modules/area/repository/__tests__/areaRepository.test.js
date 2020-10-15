const { Sequelize } = require('sequelize');
const AreaRepository = require('../sqlite/areaRepository');
const AreaNotFoundError = require('../error/areaNotFoundError');
const AreaModel = require('../../model/areaModel');
const Area = require('../../entity/area');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});

let areaRepository;

beforeAll(async () => {
  AreaModel.setup(sequelize);

  areaRepository = new AreaRepository(AreaModel);
});

beforeEach(async () => {
  await sequelize.sync({ force: true });

  await AreaModel.create({
    name: 'England',
  });
});

test('save method stores a new area in the database when the area passed has no id', async () => {
  const areaMock = {
    id: undefined,
    name: 'Argentina',
    createdAt: undefined,
    lastUpdated: undefined,
  };

  const savedArea = await areaRepository.save(areaMock);

  expect(savedArea.id).toBe(2);
});

test('save method updates an existent area when the area passed has an id', async () => {
  const areaMock = {
    id: 1,
    name: 'New England',
    createdAt: undefined,
    lastUpdated: undefined,
  };

  const updatedArea = await areaRepository.save(areaMock);

  expect(updatedArea.id).toBe(1);
  expect(updatedArea.name).toBe('New England');
});

test('save method throws an specific error when trying to update a non existent area', async () => {
  const areaMock = {
    id: 99,
    name: 'No Area',
    createdAt: undefined,
    lastUpdated: undefined,
  };

  await expect(areaRepository.save(areaMock)).rejects.toThrowError(AreaNotFoundError);
});

test('delete method removes an area from the database when a valid id is used', async () => {
  const idMock = 1;

  const isDeleted = await areaRepository.delete(idMock);

  expect(isDeleted).toBeTruthy();
});

test('delete method throws an specific error when an invalid id is used', async () => {
  const idMock = 99;

  await expect(areaRepository.delete(idMock)).rejects.toThrowError(AreaNotFoundError);
});

test('getById method returns an area when a valid id is used', async () => {
  const idMock = 1;

  const area = await areaRepository.getById(idMock);

  expect(area).toBeInstanceOf(Area);
  expect(area.id).toBe(1);
});

test('getById method throws an specific error when an invalid id is used', async () => {
  const idMock = 99;

  await expect(areaRepository.getById(idMock)).rejects.toThrowError(AreaNotFoundError);
});

test('getAll method returns an array of area entities when there are areas available in the database', async () => {
  const areas = await areaRepository.getAll();

  expect(Array.isArray(areas)).toBeTruthy();
  expect(areas[0]).toBeInstanceOf(Area);
});

test('getAll method returns an empty array when there are no areas in the database', async () => {
  await sequelize.sync({ force: true });

  const areas = await areaRepository.getAll();

  expect(Array.isArray(areas)).toBeTruthy();
  expect(areas.length).toBe(0);
});
