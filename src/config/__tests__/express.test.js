const express = require('express');
const { setBodyParser, setStaticFilesPath, setSession, setMainRoute } = require('../express');

const appMock = {
  use: jest.fn(),
  get: jest.fn(),
};
const containerMock = {
  get: jest.fn(),
};
jest.mock('express'); // https://jestjs.io/docs/en/mock-functions#mocking-modules

afterEach(() => {
  jest.clearAllMocks(); // https://jestjs.io/docs/en/jest-object#jestclearallmocks
});

describe('setBodyParser', () => {
  it('Sets the body parser', () => {
    setBodyParser(appMock);

    expect(appMock.use).toHaveBeenCalledTimes(1);
    expect(express.urlencoded).toHaveBeenCalledTimes(1);
    expect(express.urlencoded).toHaveBeenLastCalledWith({ extended: true });
  });
});

describe('setStaticFilesPath', () => {
  it('Sets the static files directory', () => {
    express.static.mockImplementationOnce(() => true);

    setStaticFilesPath(appMock);

    expect(appMock.use).toHaveBeenCalledTimes(1);
    expect(appMock.use).toHaveBeenNthCalledWith(1, '/public', true);
    expect(express.static).toHaveBeenCalledTimes(1);
    expect(express.static).toHaveBeenCalledWith('public');
  });
});

describe('setSession', () => {
  it('Sets session', () => {
    setSession(appMock, containerMock);

    expect(appMock.use).toHaveBeenCalledTimes(1);
    expect(containerMock.get).toHaveBeenCalledTimes(1);
    expect(containerMock.get).toHaveBeenCalledWith('Session');
  });
});

describe('setMainRoute', () => {
  it('Redirects to homepage when a request is made to "/" route', () => {
    const resMock = {
      redirect: jest.fn(),
    };

    setMainRoute(appMock);

    // https://jestjs.io/docs/en/mock-functions#mock-property
    const routeCallback = appMock.get.mock.calls[0][1];
    routeCallback('/', resMock);

    expect(appMock.get).toHaveBeenCalledTimes(1);
    expect(appMock.get).toHaveBeenNthCalledWith(1, '/', expect.any(Function));
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/club');
  });
});
