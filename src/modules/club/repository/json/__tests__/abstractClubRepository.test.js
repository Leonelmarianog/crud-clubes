/* eslint-disable max-classes-per-file */
const AbstractClubRepository = require('../abstractClubRepository');
const AbstractClubRepositoryError = require('../../error/abstractClubRepositoryError');
const MethodNotImplementedError = require('../../error/methodNotImplementedError');

test("An abstract repository can't be instantiated", () => {
  try {
    // eslint-disable-next-line no-new
    new AbstractClubRepository();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractClubRepositoryError);
  }
});

test('A concrete repository that inherits from an abstract repository can be instantiated', () => {
  const ConcreteRepository = class extends AbstractClubRepository {};
  const repositoryInstance = new ConcreteRepository();

  expect(repositoryInstance).toBeInstanceOf(AbstractClubRepository);
  expect(repositoryInstance).toBeInstanceOf(ConcreteRepository);
});

test('Calling base methods without concrete implemetation causes an specific error', () => {
  const ConcreteRepository = class extends AbstractClubRepository {};
  const repositoryInstance = new ConcreteRepository();

  expect(repositoryInstance.save()).rejects.toThrowError(MethodNotImplementedError);
  expect(repositoryInstance.delete()).rejects.toThrowError(MethodNotImplementedError);
  expect(repositoryInstance.getAll()).rejects.toThrowError(MethodNotImplementedError);
  expect(repositoryInstance.getById()).rejects.toThrowError(MethodNotImplementedError);
});
