/* eslint-disable class-methods-use-this */

const AbstractControllerError = require('./error/abstractControllerError');

class AbstractController {
  constructor() {
    if (new.target === AbstractController) {
      throw new AbstractControllerError("Can't instantiate an abstract class");
    }
  }
}

module.exports = AbstractController;
