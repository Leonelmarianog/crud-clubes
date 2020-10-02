const fs = require('fs');
const Sqlite3Database = require('better-sqlite3');
const ClubRepository = require('../clubRepository');
const ClubNotFoundError = require('../../error/clubNotFoundError');
const Club = require('../../../entity/club');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3Database(':memory:');
  const migration = fs.readFileSync('./src/config/tests.sql', 'utf-8');
  mockDb.exec(migration);
});

test('Saving a new club stores it in the database', async () => {
  const clubRepository = new ClubRepository(mockDb);

  const club = await clubRepository.save(
    new Club({
      name: 'name',
      shortName: 'shortname',
      tla: 'tla',
      crestUrl: 'crest',
      address: 'address',
      phone: 'phone number',
      website: 'website',
      email: 'email',
      founded: 'founded year',
      clubColors: 'club colors',
      venue: 'venue',
    })
  );

  expect(club.id).toBe(1);
});

test('Updating an existing club updates its values', async () => {
  const clubRepository = new ClubRepository(mockDb);

  let club = await clubRepository.save(
    new Club({
      name: 'old name',
      shortName: 'old shortname',
      tla: 'old tla',
      crestUrl: 'old crest',
      address: 'old address',
      phone: 'old phone number',
      website: 'old website',
      email: 'old email',
      founded: 'old founded year',
      clubColors: 'old club colors',
      venue: 'old venue',
    })
  );

  expect(club.id).toBe(1);

  club = await clubRepository.save(
    new Club({
      id: 1,
      name: 'new name',
      shortName: 'new shortname',
      tla: 'new tla',
      crestUrl: 'new crest',
      address: 'new address',
      phone: 'new phone number',
      website: 'new website',
      email: 'new email',
      founded: 'newd founded year',
      clubColors: 'new club colors',
      venue: 'new venue',
    })
  );

  expect(club.id).toBe(1);
  expect(club.name).not.toBe('old name');
  expect(club.crestUrl).not.toBe('old crest');
});

test('Not updating the crest of a club keeps the old one', async () => {
  const clubRepository = new ClubRepository(mockDb);

  let club = await clubRepository.save(
    new Club({
      name: 'old name',
      shortName: 'old shortname',
      tla: 'old tla',
      crestUrl: 'old crest',
      address: 'old address',
      phone: 'old phone number',
      website: 'old website',
      email: 'old email',
      founded: 'old founded year',
      clubColors: 'old club colors',
      venue: 'old venue',
    })
  );

  club = await clubRepository.save(
    new Club({
      id: 1,
      name: 'new name',
      shortName: 'new shortname',
      tla: 'new tla',
      address: 'new address',
      phone: 'new phone number',
      website: 'new website',
      email: 'new email',
      founded: 'newd founded year',
      clubColors: 'new club colors',
      venue: 'new venue',
    })
  );

  expect(club.crestUrl).toBe('old crest');
});

test('Trying to update a non existent club throws an specific error', async () => {
  const clubRepository = new ClubRepository(mockDb);

  await expect(
    clubRepository.save(
      new Club({
        id: 1,
        name: 'name',
        shortName: 'shortname',
        tla: 'tla',
        crestUrl: 'crest',
        address: 'address',
        phone: 'phone number',
        website: 'website',
        email: 'email',
        founded: 'founded year',
        clubColors: 'club colors',
        venue: 'venue',
      })
    )
  ).rejects.toThrowError(ClubNotFoundError);
});

test('Deleting a specific club removes it from the database', async () => {
  const clubRepository = new ClubRepository(mockDb);

  const club = await clubRepository.save(
    new Club({
      name: 'name',
      shortName: 'shortname',
      tla: 'tla',
      crestUrl: 'crest',
      address: 'address',
      phone: 'phone number',
      website: 'website',
      email: 'email',
      founded: 'founded year',
      clubColors: 'club colors',
      venue: 'venue',
    })
  );

  expect(club.id).toBe(1);
  expect(await clubRepository.delete(club.id)).toBe(true);
  await expect(clubRepository.getById(1)).rejects.toThrowError(ClubNotFoundError);
});

test('Trying to delete a non existent club throws an specific error', async () => {
  const clubRepository = new ClubRepository(mockDb);

  await expect(clubRepository.delete(1)).rejects.toThrowError(ClubNotFoundError);
});

test('Requesting a single club returns a club entity', async () => {
  const clubRepository = new ClubRepository(mockDb);

  const storedClub = await clubRepository.save(
    new Club({
      name: 'name',
      shortName: 'shortname',
      tla: 'tla',
      crestUrl: 'crest',
      address: 'address',
      phone: 'phone number',
      website: 'website',
      email: 'email',
      founded: 'founded year',
      clubColors: 'club colors',
      venue: 'venue',
    })
  );

  const requestedClub = await clubRepository.getById(1);

  expect(requestedClub).toEqual(storedClub);
});

test('Requesting a non existent club throws an specific error', async () => {
  const clubRepository = new ClubRepository(mockDb);

  await expect(clubRepository.getById(1)).rejects.toThrowError(ClubNotFoundError);
});

test('Requesting all clubes returns an array of club entities', async () => {
  const clubRepository = new ClubRepository(mockDb);

  const storedClub1 = await clubRepository.save(
    new Club({
      name: 'name',
      shortName: 'shortname',
      tla: 'tla',
      crestUrl: 'crest',
      address: 'address',
      phone: 'phone number',
      website: 'website',
      email: 'email',
      founded: 'founded year',
      clubColors: 'club colors',
      venue: 'venue',
    })
  );

  const storedClub2 = await clubRepository.save(
    new Club({
      name: 'name',
      shortName: 'shortname',
      tla: 'tla',
      crestUrl: 'crest',
      address: 'address',
      phone: 'phone number',
      website: 'website',
      email: 'email',
      founded: 'founded year',
      clubColors: 'club colors',
      venue: 'venue',
    })
  );

  const clubes = await clubRepository.getAll();

  expect(clubes).toEqual([storedClub1, storedClub2]);
});

test('Requesting all clubes when there is none in the database returns an empty array', async () => {
  const clubRepository = new ClubRepository(mockDb);
  const clubes = await clubRepository.getAll();

  expect(clubes).toEqual([]);
});
