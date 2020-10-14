const { Sequelize } = require('sequelize');
const ClubRepository = require('../clubRepository');
const ClubModel = require('../../../model/clubModel');
const AreaModel = require('../../../../area/model/areaModel');
const Club = require('../../../entity/club');
const ClubNotFoundError = require('../../error/clubNotFoundError');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});

let clubRepository;

beforeAll(() => {
  ClubModel.setup(sequelize);
  AreaModel.setup(sequelize);
  ClubModel.setAssociations(AreaModel);
  clubRepository = new ClubRepository(ClubModel, AreaModel);
});

beforeEach(async () => {
  await sequelize.sync({ force: true });

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
});

test('save method stores a new club in the database when a club entity has no id', async () => {
  const club = new Club({
    id: undefined,
    name: 'Arsenal FC',
    shortName: 'Arsenal',
    tla: 'ARS',
    area: undefined,
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    address: '75 Drayton Park London N5 1BU',
    phone: '+44 (020) 76195003',
    website: 'http://www.arsenal.com',
    email: 'info@arsenal.co.uk',
    founded: 1886,
    clubColors: 'Red / White',
    venue: 'Emirates Stadium',
    createdAt: undefined,
    lastUpdated: undefined,
    fk_area_id: 1,
  });

  const savedClub = await clubRepository.save(club);

  expect(savedClub).toBeInstanceOf(Club);
  expect(savedClub.id).toBe(3);
});

test('save method updates an existent club in the database when a club entity has an id', async () => {
  const club = new Club({
    id: 1,
    name: 'New Arsenal FC',
    shortName: 'Arsenal',
    tla: 'ARS',
    area: undefined,
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    address: '75 Drayton Park London N5 1BU',
    phone: '+44 (020) 76195003',
    website: 'http://www.arsenal.com',
    email: 'info@arsenal.co.uk',
    founded: 1886,
    clubColors: 'Red / White',
    venue: 'Emirates Stadium',
    createdAt: undefined,
    lastUpdated: undefined,
    fk_area_id: 1,
  });

  const updatedClub = await clubRepository.save(club);

  expect(updatedClub).toBeInstanceOf(Club);
  expect(updatedClub.id).toBe(1);
  expect(updatedClub.name).toBe('New Arsenal FC');
});

test("save method uses existent crest url if the club to update doesn't have one", async () => {
  const club = new Club({
    id: 1,
    name: 'New Arsenal FC',
    shortName: 'Arsenal',
    tla: 'ARS',
    area: undefined,
    crestUrl: undefined,
    address: '75 Drayton Park London N5 1BU',
    phone: '+44 (020) 76195003',
    website: 'http://www.arsenal.com',
    email: 'info@arsenal.co.uk',
    founded: 1886,
    clubColors: 'Red / White',
    venue: 'Emirates Stadium',
    createdAt: undefined,
    lastUpdated: undefined,
    fk_area_id: 1,
  });

  const updatedClub = await clubRepository.save(club);

  expect(updatedClub).toBeInstanceOf(Club);
  expect(updatedClub.id).toBe(1);
  expect(updatedClub.crestUrl).toBe(
    'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg'
  );
});

test("save method throws an specific error when trying to update a club that doesn't exist", async () => {
  const club = new Club({
    id: 10,
    name: 'Arsenal FC',
    shortName: 'Arsenal',
    tla: 'ARS',
    area: undefined,
    crestUrl: undefined,
    address: '75 Drayton Park London N5 1BU',
    phone: '+44 (020) 76195003',
    website: 'http://www.arsenal.com',
    email: 'info@arsenal.co.uk',
    founded: 1886,
    clubColors: 'Red / White',
    venue: 'Emirates Stadium',
    createdAt: undefined,
    lastUpdated: undefined,
    fk_area_id: 1,
  });

  await expect(clubRepository.save(club)).rejects.toThrowError(ClubNotFoundError);
});

test('delete method deletes a single club when an valid id is used', async () => {
  const mockId = 1;
  const isDeleted = await clubRepository.delete(mockId);

  expect(isDeleted).toBeTruthy();
});

test('delete method throws an specific error when an invalid id is used', async () => {
  const mockId = 10;

  await expect(clubRepository.delete(mockId)).rejects.toThrowError(ClubNotFoundError);
});

test('getById method returns a single club entity when a valid id is used', async () => {
  const mockId = 1;
  const club = await clubRepository.getById(mockId);

  expect(club).toBeInstanceOf(Club);
  expect(club.id).toBe(1);
});

test('getById method throws an specific error when an invalid id is used', async () => {
  const mockId = 10;

  await expect(clubRepository.getById(mockId)).rejects.toThrowError(ClubNotFoundError);
});

test('getAll method returns an array of club entities', async () => {
  const clubes = await clubRepository.getAll();

  expect(Array.isArray(clubes)).toBeTruthy();
  expect(clubes[0]).toBeInstanceOf(Club);
  expect(clubes[1]).toBeInstanceOf(Club);
});

test('getAll method returns an empty array when there are no clubes in the database', async () => {
  await sequelize.sync({ force: true });

  const clubes = await clubRepository.getAll();

  expect(clubes).toEqual([]);
});
