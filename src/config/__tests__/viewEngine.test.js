const setViewEngine = require('../viewEngine');

const appMock = {};
const nunjucksEnvMock = {
  express: jest.fn(),
};
const containerMock = {
  get: jest.fn(() => nunjucksEnvMock),
};

describe('setViewEngine', () => {
  it('Sets the view engine', () => {
    setViewEngine(appMock, containerMock);

    expect(containerMock.get).toHaveBeenCalledTimes(1);
    expect(containerMock.get).toHaveBeenCalledWith('NunjucksEnv');
    expect(nunjucksEnvMock.express).toHaveBeenCalledTimes(1);
    expect(nunjucksEnvMock.express).toHaveBeenCalledWith(appMock);
  });
});
