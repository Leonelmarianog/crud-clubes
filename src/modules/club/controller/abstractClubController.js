/* eslint-disable class-methods-use-this */

const AbstractClubControllerError = require('./error/abstractClubControllerError');

class AbstractClubController {
  contructor() {
    if (new.target === AbstractClubController) {
      throw new AbstractClubControllerError("Can't instantiate an abstract class");
    }
  }
}

module.exports = AbstractClubController;
