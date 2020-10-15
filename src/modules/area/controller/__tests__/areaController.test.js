const AreaController = require('../areaController');

const areaServiceMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const areaController = new AreaController(areaServiceMock);

afterEach(() => {
  jest.clearAllMocks();
});

test('configureRoutes method sets routes', () => {
  const appMock = {
    get: jest.fn(),
    post: jest.fn(),
  };

  areaController.configureRoutes(appMock);
});

test('index method renders index.html with areas information', async () => {
  const reqMock = {
    session: {
      message: undefined,
      error: undefined,
    },
  };
  const resMock = {
    render: jest.fn(),
  };

  areaServiceMock.getAll.mockResolvedValueOnce([]);
  await areaController.index(reqMock, resMock);

  expect(areaServiceMock.getAll).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenLastCalledWith('area/views/index.html', {
    areas: [],
    message: undefined,
    error: undefined,
  });
});

test('create method renders form.html', async () => {
  const reqMock = {};
  const resMock = {
    render: jest.fn(),
  };

  await areaController.create(reqMock, resMock);

  expect(resMock.render).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenCalledWith('area/views/form.html');
});

test('save method, when creating a new club, sets session message and redirects to /area', async () => {
  const reqMock = {
    body: {
      name: 'Argentina',
    },
    session: {
      message: null,
      error: null,
    },
  };
  const resMock = {
    redirect: jest.fn(),
  };
  const areaMock = {
    id: NaN,
    name: 'Argentina',
    createdAt: undefined,
    updatedAt: undefined,
  };

  areaServiceMock.save.mockResolvedValueOnce({});

  await areaController.save(reqMock, resMock);

  expect(areaServiceMock.save).toHaveBeenCalledTimes(1);
  expect(areaServiceMock.save).toHaveBeenCalledWith(areaMock);
  expect(reqMock.session.message).not.toBe(null);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenCalledWith('/area');
});

test('save method, when updating a club, sets session message and redirects to /area', async () => {
  const reqMock = {
    body: {
      id: '1',
      name: 'Argentina',
      createdAt: undefined,
      lastUpdated: undefined,
    },
    session: {
      message: null,
      error: null,
    },
  };
  const resMock = {
    redirect: jest.fn(),
  };
  const areaMock = {
    id: 1,
    name: 'Argentina',
    createdAt: undefined,
    updatedAt: undefined,
  };

  areaServiceMock.save.mockResolvedValueOnce({});

  await areaController.save(reqMock, resMock);

  expect(areaServiceMock.save).toHaveBeenCalledTimes(1);
  expect(areaServiceMock.save).toHaveBeenCalledWith(areaMock);
  expect(reqMock.session.message).not.toBe(null);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenCalledWith('/area');
});

test('save method sets an error message into the session when an exception occurs', async () => {
  const reqMock = {
    body: {
      name: 'Argentina',
    },
    session: {
      message: null,
      error: null,
    },
  };
  const resMock = {
    redirect: jest.fn(),
  };

  areaServiceMock.save.mockImplementationOnce(() => {
    throw new Error();
  });

  await areaController.save(reqMock, resMock);

  expect(areaServiceMock.save).toHaveBeenCalledTimes(1);
  expect(reqMock.session.message).toBe(null);
  expect(reqMock.session.error).not.toBe(null);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenCalledWith('/area');
});

test('update method renders form.html with area information', async () => {
  const reqMock = {
    params: { areaId: '1' },
  };
  const resMock = {
    render: jest.fn(),
    redirect: jest.fn(),
  };

  areaServiceMock.getById.mockResolvedValueOnce({});

  await areaController.update(reqMock, resMock);

  expect(areaServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(areaServiceMock.getById).toHaveBeenCalledWith(reqMock.params.areaId);
  expect(resMock.render).toHaveBeenCalledTimes(1);
  expect(resMock.render).toHaveBeenCalledWith('area/views/form.html', { area: {} });
});

test('update method sets an error message and redirects to /area when an exception occurs', async () => {
  const reqMock = {
    params: { areaId: '1' },
    session: {
      error: null,
    },
  };
  const resMock = {
    render: jest.fn(),
    redirect: jest.fn(),
  };

  areaServiceMock.getById.mockImplementationOnce(() => {
    throw new Error();
  });

  await areaController.update(reqMock, resMock);

  expect(areaServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(reqMock.session.error).not.toBe(null);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenCalledWith('/area');
});

test('delete method removes a club from the database,sets session message and redirects to /area', async () => {
  const reqMock = {
    params: { areaId: '1' },
    session: {
      message: null,
      error: null,
    },
  };
  const resMock = {
    redirect: jest.fn(),
  };

  areaServiceMock.getById.mockResolvedValueOnce({});

  await areaController.delete(reqMock, resMock);

  expect(areaServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(areaServiceMock.getById).toHaveBeenCalledWith(reqMock.params.areaId);
  expect(areaServiceMock.delete).toHaveBeenCalledTimes(1);
  expect(areaServiceMock.delete).toHaveBeenCalledWith(reqMock.params.areaId);
  expect(reqMock.session.message).not.toBe(null);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenCalledWith('/area');
});

test('delete method sets an error message when an exception occurs and redirects to /area', async () => {
  const reqMock = {
    params: { areaId: '1' },
    session: {
      message: null,
      error: null,
    },
  };
  const resMock = {
    redirect: jest.fn(),
  };

  areaServiceMock.getById.mockImplementationOnce(() => {
    throw new Error();
  });

  await areaController.delete(reqMock, resMock);

  expect(areaServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(reqMock.session.message).toBe(null);
  expect(reqMock.session.error).not.toBe(null);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenCalledWith('/area');
});
