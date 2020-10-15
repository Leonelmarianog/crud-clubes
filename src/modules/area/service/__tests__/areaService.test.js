const AreaService = require('../areaService');
const AreaNotDefinedError = require('../error/areaNotDefinedError');
const AreaIdNotDefinedError = require('../error/areaIdNotDefinedError');
const Area = require('../../entity/area');

const areaRepositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const areaService = new AreaService(areaRepositoryMock);

test('save method calls repository save method once', async () => {
  const areaMock = new Area({});

  await areaService.save(areaMock);

  expect(areaRepositoryMock.save).toHaveBeenCalledTimes(1);
  expect(areaRepositoryMock.save).toHaveBeenCalledWith(areaMock);
});

test('save method throws an specific error when an area is not passed as parameter', async () => {
  await expect(areaService.save()).rejects.toThrowError(AreaNotDefinedError);
});

test('delete method calls repository delete method once', async () => {
  const idMock = 1;

  await areaService.delete(idMock);

  expect(areaRepositoryMock.delete).toHaveBeenCalledTimes(1);
  expect(areaRepositoryMock.delete).toHaveBeenCalledWith(idMock);
});

test('delete method throws an specific error when an id is not passed as parameter', async () => {
  await expect(areaService.delete()).rejects.toThrowError(AreaIdNotDefinedError);
});

test('getById method calls repository getById method once', async () => {
  const mockId = 1;

  await areaService.getById(mockId);

  expect(areaRepositoryMock.getById).toHaveBeenCalledTimes(1);
  expect(areaRepositoryMock.getById).toHaveBeenCalledWith(mockId);
});

test('getById method throws an specific error when an id is not passed as parameter', async () => {
  await expect(areaService.getById()).rejects.toThrowError(AreaIdNotDefinedError);
});

test('getAll method calls repository getAll method once', async () => {
  await areaService.getAll();

  expect(areaRepositoryMock.getAll).toHaveBeenCalledTimes(1);
});
