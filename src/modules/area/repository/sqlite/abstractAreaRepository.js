/* eslint-disable class-methods-use-this */

const AbstractAreaRepositoryError = require('../error/abstractAreaRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

class AbstractAreaRepository {
  constructor() {
    if (new.target === AbstractAreaRepository) {
      throw new AbstractAreaRepositoryError("Can't instantiate an abstract class");
    }
  }

  async save() {
    throw new MethodNotImplementedError();
  }

  async delete() {
    throw new MethodNotImplementedError();
  }

  async getById() {
    throw new MethodNotImplementedError();
  }

  async getAll() {
    throw new MethodNotImplementedError();
  }
}

module.exports = AbstractAreaRepository;
