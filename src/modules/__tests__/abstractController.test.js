const AbstractController = require('../abstractController');
const AbstractControllerError = require('../error/abstractControllerError');

test("An abstract controller can't be instantiated", () => {
  try {
    // eslint-disable-next-line no-new
    new AbstractController();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractControllerError);
  }
});

test('A concrete controller that inherits from an abstract controller can be instantiated', () => {
  const ConcreteController = class extends AbstractController {};
  const controllerInstance = new ConcreteController();

  expect(controllerInstance).toBeInstanceOf(AbstractController);
  expect(controllerInstance).toBeInstanceOf(ConcreteController);
});
