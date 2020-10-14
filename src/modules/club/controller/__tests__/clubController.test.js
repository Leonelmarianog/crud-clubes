const ClubController = require('../clubController');
const Club = require('../../entity/club');

const uploadMiddlewareMock = {
  single: jest.fn(),
};

const clubServiceMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const areaServiceMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const clubController = new ClubController(uploadMiddlewareMock, clubServiceMock, areaServiceMock);

afterEach(() => {
  jest.clearAllMocks();
});

test('Sets routes', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn(),
  };

  clubController.configureRoutes(app);
});

test('Index method renders index.html', async () => {
  const reqMock = {
    session: {},
  };
  const resMock = {
    render: jest.fn(),
  };
  clubServiceMock.getAll.mockResolvedValueOnce([]);

  await clubController.index(reqMock, resMock);

  expect(clubServiceMock.getAll).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenCalledWith('club/views/index.html', {
    clubes: [],
    error: undefined,
    message: undefined,
  });
});

test('View method renders the information of a specific club', async () => {
  const reqMock = {
    params: { clubId: '1' },
  };
  const resMock = {
    render: jest.fn(),
  };
  clubServiceMock.getById.mockResolvedValueOnce({});

  await clubController.view(reqMock, resMock);

  expect(clubServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(clubServiceMock.getById).toHaveBeenCalledWith(reqMock.params.clubId);
  expect(resMock.render).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenCalledWith('club/views/club.html', { club: {} });
});

test('View method sets an error message into the session and redirects to /club when an exception occurs', async () => {
  const reqMock = {
    params: { clubId: '1' },
    session: { error: null },
  };
  const resMock = {
    redirect: jest.fn(),
  };
  clubServiceMock.getById.mockImplementationOnce(() => {
    throw new Error();
  });

  await clubController.view(reqMock, resMock);

  expect(clubServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(clubServiceMock.getById).toHaveBeenCalledWith(reqMock.params.clubId);
  expect(reqMock.session.error).not.toBe(null);
  expect(resMock.redirect).toBeCalledTimes(1);
  expect(resMock.redirect).toHaveBeenCalledWith('/club');
});

test('Create method renders form.html', async () => {
  const reqMock = {};
  const resMock = {
    render: jest.fn(),
  };
  areaServiceMock.getAll.mockResolvedValueOnce([]);

  await clubController.create(reqMock, resMock);

  expect(resMock.render).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenCalledWith('club/views/form.html', { areas: [] });
});

test('Update method renders form.html with information of a specific club', async () => {
  const reqMock = {
    params: { clubId: '1' },
  };
  const resMock = {
    render: jest.fn(),
  };
  clubServiceMock.getById.mockResolvedValueOnce({});
  areaServiceMock.getAll.mockResolvedValueOnce([]);

  await clubController.update(reqMock, resMock);

  expect(clubServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(clubServiceMock.getById).toHaveBeenCalledWith(reqMock.params.clubId);
  expect(areaServiceMock.getAll).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenCalledWith('club/views/form.html', { club: {}, areas: [] });
});

test('Update method sets an error message into the session and redirects to /club when an exception occurs', async () => {
  const reqMock = {
    params: { clubId: '1' },
    session: { error: null },
  };
  const resMock = {
    redirect: jest.fn(),
  };
  clubServiceMock.getById.mockImplementationOnce(() => {
    throw new Error();
  });

  await clubController.update(reqMock, resMock);

  expect(clubServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(clubServiceMock.getById).toHaveBeenCalledWith(reqMock.params.clubId);
  expect(reqMock.session.error).not.toBe(null);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenCalledWith('/club');
});

test('Delete method deletes a club, sets a message into the session, and redirects to /club', async () => {
  const reqMock = {
    params: { clubId: '1' },
    session: { message: null },
  };
  const resMock = {
    redirect: jest.fn(),
  };
  clubServiceMock.getById.mockResolvedValueOnce({});

  await clubController.delete(reqMock, resMock);

  expect(clubServiceMock.getById).toBeCalledTimes(1);
  expect(clubServiceMock.getById).toBeCalledWith(reqMock.params.clubId);
  expect(clubServiceMock.delete).toBeCalledTimes(1);
  expect(clubServiceMock.delete).toBeCalledWith(reqMock.params.clubId);
  expect(reqMock.session.message).not.toBe(null);
  expect(resMock.redirect).toBeCalledTimes(1);
  expect(resMock.redirect).toBeCalledWith('/club');
});

test('Delete method sets an error message into the session and redirects to /club when an exception occurs', async () => {
  const reqMock = {
    params: { clubId: '1' },
    session: { error: null },
  };
  const resMock = {
    redirect: jest.fn(),
  };
  clubServiceMock.getById.mockImplementationOnce(() => {
    throw new Error();
  });

  await clubController.delete(reqMock, resMock);

  expect(clubServiceMock.getById).toBeCalledTimes(1);
  expect(clubServiceMock.getById).toBeCalledWith(reqMock.params.clubId);
  expect(reqMock.session.error).not.toBe(null);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenCalledWith('/club');
});

test('Save method creates a new club when there is no id available', async () => {
  const bodyMock = {
    name: undefined,
    'short-name': undefined,
    tla: undefined,
    'fk-area-id': '1',
    address: undefined,
    phone: undefined,
    website: undefined,
    email: undefined,
    founded: '1234',
    'club-colors': undefined,
    venue: undefined,
  };
  const reqMock = {
    body: bodyMock,
    file: { path: 'public/img/crests' },
    session: { message: null },
  };
  const resMock = {
    redirect: jest.fn(),
  };
  const club = new Club({
    id: NaN,
    name: undefined,
    shortName: undefined,
    tla: undefined,
    area: undefined,
    crestUrl: `\\${reqMock.file.path}`,
    address: undefined,
    phone: undefined,
    website: undefined,
    email: undefined,
    founded: 1234,
    clubColors: undefined,
    venue: undefined,
    createdAt: undefined,
    lastUpdated: undefined,
    fk_area_id: 1,
  });

  await clubController.save(reqMock, resMock);

  expect(clubServiceMock.save).toHaveBeenCalledTimes(1);
  expect(clubServiceMock.save).toHaveBeenCalledWith(club);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenLastCalledWith('/club');
});

test('Save method updates a club when there is an id available', async () => {
  const bodyMock = {
    id: '1',
    name: undefined,
    'short-name': undefined,
    tla: undefined,
    'fk-area-id': '1',
    address: undefined,
    phone: undefined,
    website: undefined,
    email: undefined,
    founded: '1234',
    'club-colors': undefined,
    venue: undefined,
  };
  const reqMock = {
    body: bodyMock,
    file: { path: 'public/img/crests' },
    session: { message: null },
  };
  const resMock = {
    redirect: jest.fn(),
  };
  const club = new Club({
    id: 1,
    name: undefined,
    shortName: undefined,
    tla: undefined,
    area: undefined,
    crestUrl: `\\${reqMock.file.path}`,
    address: undefined,
    phone: undefined,
    website: undefined,
    email: undefined,
    founded: 1234,
    clubColors: undefined,
    venue: undefined,
    createdAt: undefined,
    lastUpdated: undefined,
    fk_area_id: 1,
  });

  await clubController.save(reqMock, resMock);

  expect(clubServiceMock.save).toHaveBeenCalledTimes(1);
  expect(clubServiceMock.save).toHaveBeenCalledWith(club);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenLastCalledWith('/club');
});

test("Save method doesn't modify the request body when an image was not uploaded", async () => {
  const bodyMock = {
    id: '1',
    name: undefined,
    'short-name': undefined,
    tla: undefined,
    'fk-area-id': '1',
    address: undefined,
    phone: undefined,
    website: undefined,
    email: undefined,
    founded: '1234',
    'club-colors': undefined,
    venue: undefined,
  };
  const reqMock = {
    body: bodyMock,
    session: { message: null },
  };
  const resMock = {
    redirect: jest.fn(),
  };
  const club = new Club({
    id: 1,
    name: undefined,
    shortName: undefined,
    tla: undefined,
    area: undefined,
    crestUrl: undefined,
    address: undefined,
    phone: undefined,
    website: undefined,
    email: undefined,
    founded: 1234,
    clubColors: undefined,
    venue: undefined,
    createdAt: undefined,
    lastUpdated: undefined,
    fk_area_id: 1,
  });

  await clubController.save(reqMock, resMock);

  expect(clubServiceMock.save).toHaveBeenCalledTimes(1);
  expect(clubServiceMock.save).toHaveBeenCalledWith(club);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenLastCalledWith('/club');
});
