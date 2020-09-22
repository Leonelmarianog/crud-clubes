const ClubService = require('../clubService');
const Club = require('../../entity/club');
const ClubNotDefinedError = require('../error/clubNotDefinedError');
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError');

const clubRepositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const clubService = new ClubService(clubRepositoryMock);

test('Service "save" method calls Repository "save" method to save/update a club once', async () => {
  const club = new Club({});

  await clubService.save(club);

  expect(clubRepositoryMock.save).toHaveBeenCalledTimes(1);
  expect(clubRepositoryMock.save).toHaveBeenCalledWith(club);
});

test('Service "save" method throws an specific error when a club is not given', async () => {
  await expect(clubService.save).rejects.toThrowError(ClubNotDefinedError);
});

test('Service "delete" method calls Repository "delete" method to delete a specific club once', async () => {
  const idMock = '1';

  await clubService.delete(idMock);

  expect(clubRepositoryMock.delete).toHaveBeenCalledTimes(1);
  expect(clubRepositoryMock.delete).toHaveBeenCalledWith(idMock);
});

test('Service "delete" method throws an specific error when an id is not given', async () => {
  await expect(clubService.delete).rejects.toThrowError(ClubIdNotDefinedError);
});

test('Service "getById" method calls Repository "getById" method to get a specific club once', async () => {
  const idMock = '1';

  await clubService.getById(idMock);

  expect(clubRepositoryMock.getById).toHaveBeenCalledTimes(1);
  expect(clubRepositoryMock.getById).toHaveBeenCalledWith(idMock);
});

test('Service "getById" method throws an specific error when an id is not given', async () => {
  await expect(clubService.getById).rejects.toThrowError(ClubIdNotDefinedError);
});

test('Service "getAll" method calls Repository "getAll" method to get all clubes once', async () => {
  await clubService.getAll();

  expect(clubRepositoryMock.getAll).toHaveBeenCalledTimes(1);
});
