const { init } = require('../module');

const appMock = {};
const areaControllerMock = {
  configureRoutes: jest.fn(),
};
const containerMock = {
  get: jest.fn(() => areaControllerMock),
};

describe('init', () => {
  it('Initializes area module', () => {
    init(appMock, containerMock);

    expect(containerMock.get).toBeCalledTimes(1);
    expect(containerMock.get).toHaveBeenCalledWith('AreaController');
    expect(areaControllerMock.configureRoutes).toBeCalledTimes(1);
    expect(areaControllerMock.configureRoutes).toHaveBeenCalledWith(appMock);
  });
});
