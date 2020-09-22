const ClubController = require('../clubController');
/* const Club = require('../../entity/club'); */

const uploadMiddlewareMock = {
  single: jest.fn(),
};

const clubServiceMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const clubController = new ClubController(uploadMiddlewareMock, clubServiceMock);

afterEach(() => {
  jest.clearAllMocks();
});

describe('Index', () => {
  it('Renders index.html', async () => {
    const reqMock = {
      session: {},
    };
    const resMock = {
      render: jest.fn(),
    };
    clubServiceMock.getAll.mockResolvedValueOnce([]);

    await clubController.index(reqMock, resMock);

    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('club/views/index.html', {
      clubes: [],
      error: undefined,
      message: undefined,
    });
  });
});

describe('View', () => {
  it('Renders the information of a specific club', async () => {
    const reqMock = {
      params: { id: '1' },
    };
    const resMock = {
      render: jest.fn(),
    };
    clubServiceMock.getById.mockResolvedValueOnce({});

    await clubController.view(reqMock, resMock);

    expect(clubServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(clubServiceMock.getById).toHaveBeenCalledWith(reqMock.params.id);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('club/views/club.html', { club: {} });
  });

  it('Sets an error message into the session and redirects to /club when an exception occurs', async () => {
    const reqMock = {
      params: { id: '1' },
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
    expect(clubServiceMock.getById).toHaveBeenCalledWith(reqMock.params.id);
    expect(reqMock.session.error).not.toBe(null);
    expect(resMock.redirect).toBeCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/club');
  });
});

describe('Create', () => {
  it('Renders form.html', async () => {
    const reqMock = {};
    const resMock = {
      render: jest.fn(),
    };

    await clubController.create(reqMock, resMock);

    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('club/views/form.html');
  });
});

describe('Update', () => {
  it('Renders form.html with data of a specific club', async () => {
    const reqMock = {
      params: { id: '1' },
    };
    const resMock = {
      render: jest.fn(),
    };
    clubServiceMock.getById.mockResolvedValueOnce({});

    await clubController.update(reqMock, resMock);

    expect(clubServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(clubServiceMock.getById).toHaveBeenCalledWith(reqMock.params.id);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('club/views/form.html', { club: {} });
  });

  it('Sets an error message into the session and redirects to /club when an exception occurs', async () => {
    const reqMock = {
      params: { id: '1' },
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
    expect(clubServiceMock.getById).toHaveBeenCalledWith(reqMock.params.id);
    expect(reqMock.session.error).not.toBe(null);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/club');
  });
});

describe('Delete', () => {
  it('Deletes a club, sets a message into the session, and redirects to /club', async () => {
    const reqMock = {
      params: { id: '1' },
      session: { message: null },
    };
    const resMock = {
      redirect: jest.fn(),
    };
    clubServiceMock.getById.mockResolvedValueOnce({});

    await clubController.delete(reqMock, resMock);

    expect(clubServiceMock.getById).toBeCalledTimes(1);
    expect(clubServiceMock.getById).toBeCalledWith(reqMock.params.id);
    expect(clubServiceMock.delete).toBeCalledTimes(1);
    expect(clubServiceMock.delete).toBeCalledWith(reqMock.params.id);
    expect(reqMock.session.message).not.toBe(null);
    expect(resMock.redirect).toBeCalledTimes(1);
    expect(resMock.redirect).toBeCalledWith('/club');
  });

  it('Sets an error message into the session and redirects to /club when an exception occurs', async () => {
    const reqMock = {
      params: { id: '1' },
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
    expect(clubServiceMock.getById).toBeCalledWith(reqMock.params.id);
    expect(reqMock.session.error).not.toBe(null);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/club');
  });
});

/* it('Save method updates a club when there is an id available', async () => {
  const bodyMock = {
    id: '1',
    name: undefined,
    'short-name': undefined,
    tla: undefined,
    address: undefined,
    phone: undefined,
    website: undefined,
    email: undefined,
    founded: undefined,
    'club-colors': undefined,
    venue: undefined,
  };
  const club = new Club({
    id: '1',
    name: undefined,
    shortName: undefined,
    tla: undefined,
    address: undefined,
    phone: undefined,
    website: undefined,
    email: undefined,
    founded: undefined,
    clubColors: undefined,
    venue: undefined,
  });
  const reqMock = {
    body: bodyMock,
    session: { message: null },
  };
  const resMock = {
    redirect: jest.fn(),
  };

  await clubController.save(reqMock, resMock);

  expect(clubServiceMock.save).toHaveBeenCalledTimes(1);
  expect(clubServiceMock.save).toHaveBeenCalledWith(club);
  expect(reqMock.session.message).toMatch(/updated/);
  expect(resMock.redirect).toHaveBeenCalledTimes(1);
  expect(resMock.redirect).toHaveBeenLastCalledWith('/club');
});
 */
