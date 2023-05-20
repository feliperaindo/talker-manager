const { objectValidator, tokenValidator } = require('../utils/validators');

const { loginHelpers, emailChecker, passwordChecker } = require('../helpers/loginHelpers');

const { talkerHelpers, nameChecker,
  dateChecker, rateChecker, ageChecker } = require('../helpers/talkerHelpers');

const { HTTP, constants, errors } = require('../SSOT/exporter');

function keysChecker(object, array) {
  array.forEach((key) => {
    if (!objectValidator(object, key.keyName)) {
      throw Error(key.notExistError, { cause: HTTP.BAD_REQUEST });
    }
  });
}

function midLoginValidation(request, _response, next) {
  try {
    keysChecker(request.body, loginHelpers()());
    emailChecker(request.body.email);
    passwordChecker(request.body.password);
    next();
  } catch (error) {
    next(error);
  }
}

function midTalkerValidation(request, _response, next) {
  try {
    keysChecker(request.body, talkerHelpers.keysAndErrors());
    keysChecker(request.body.talk, talkerHelpers.deepKeysAndErrors());
    ageChecker(request.body.age);
    nameChecker(request.body.name);
    dateChecker(request.body.talk.watchedAt);
    rateChecker(request.body.talk.rate);
    next();
  } catch (error) {
    next(error);
  }
}

function midTokenChecker({ headers }, response, next) {
 return objectValidator(headers, constants.AUTHORIZATION_KEY) 
  ? next()
  : response.status(HTTP.TOKEN_NOT_FOUND).send({ message: errors.TOKEN_NOT_FOUND });
}

function midTokenValidation({ headers: { authorization } }, response, next) {
  return tokenValidator(authorization) 
    ? next()
    : response.status(HTTP.TOKEN_NOT_FOUND).send({ message: errors.TOKEN_INVALID });
}

module.exports = {
  midLoginValidation,
  midTokenChecker,
  midTokenValidation,
  midTalkerValidation,
};