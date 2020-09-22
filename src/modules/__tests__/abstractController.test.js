const AbstractController = require('../abstractController');
const AbstractControllerError = require('../error/abstractControllerError');

describe('AbstractController', () => {
  it("Can't be instantiated directly", () => {
    try {
      // eslint-disable-next-line no-new
      new AbstractController();
    } catch (error) {
      expect(error).toBeInstanceOf(AbstractControllerError);
    }
  });

  it('Is used as a base for a new instance of a controller', () => {
    const ConcreteController = class extends AbstractController {};
    expect(new ConcreteController()).toBeInstanceOf(AbstractController);
  });
});
