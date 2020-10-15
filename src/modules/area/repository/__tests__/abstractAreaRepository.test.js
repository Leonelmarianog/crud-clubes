/* eslint-disable max-classes-per-file */
const AbstractAreaRepositoryError = require('../error/abstractAreaRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');
const AbstractAreaRepository = require('../sqlite/abstractAreaRepository');

test("Can't instantiate an Abstract class", () => {
  try {
    // eslint-disable-next-line no-new
    new AbstractAreaRepository();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractAreaRepositoryError);
  }
});

test('A concrete class that inherits from an abstract class can be instantiated', () => {
  const ConcreteAreaRepository = class extends AbstractAreaRepository {};
  const areaRepositoryInstance = new ConcreteAreaRepository();

  expect(areaRepositoryInstance).toBeInstanceOf(ConcreteAreaRepository);
  expect(areaRepositoryInstance).toBeInstanceOf(AbstractAreaRepository);
});

test('Calling base methods without concrete implementation throws an specific error', async () => {
  const ConcreteAreaRepository = class extends AbstractAreaRepository {};
  const areaRepositoryInstance = new ConcreteAreaRepository();

  await expect(areaRepositoryInstance.save()).rejects.toThrowError(MethodNotImplementedError);
  await expect(areaRepositoryInstance.delete()).rejects.toThrowError(MethodNotImplementedError);
  await expect(areaRepositoryInstance.getById()).rejects.toThrowError(MethodNotImplementedError);
  await expect(areaRepositoryInstance.getAll()).rejects.toThrowError(MethodNotImplementedError);
});
