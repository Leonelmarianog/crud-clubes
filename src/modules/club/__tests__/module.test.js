const { init } = require('../module');

const appMock = {};
const clubControllerMock = {
  configureRoutes: jest.fn(),
};
const containerMock = {
  get: jest.fn(() => clubControllerMock),
};

describe('Init', () => {
  it('Initializes the module', () => {
    init(appMock, containerMock);

    expect(containerMock.get).toHaveBeenCalledTimes(1);
    expect(containerMock.get).toHaveBeenCalledWith('ClubController');
    expect(clubControllerMock.configureRoutes).toHaveBeenCalledTimes(1);
    expect(clubControllerMock.configureRoutes).toHaveBeenCalledWith(appMock);
  });
});
