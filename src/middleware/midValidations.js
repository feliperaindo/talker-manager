const fileReader = require('../utils/fileReader');

const { objectValidator } = require('../utils/validators');
const { talkerFinder } = require('../utils/talkerUtils');

const { loginHelpers, emailChecker, passwordChecker } = require('../helpers/loginHelpers');

const {
  talkerHelpers,
  nameChecker,
  rateChecker,
  ageChecker,
  tokenExistChecker,
  tokenChecker, 
  watchedAtChecker } = require('../helpers/talkerHelpers');

const { HTTP, errors } = require('../SSOT/exporter');

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
    watchedAtChecker(request.body.talk.watchedAt);
    rateChecker(request.body.talk.rate);
    next();
  } catch (error) {
    next(error);
  }
}

function midTokenValidation(request, _response, next) {
  try {
    tokenExistChecker(request.headers);
    tokenChecker(request.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
}

async function midIdValidation(request, _response, next) {
  try {
    const talkers = await fileReader();
    const talker = talkerFinder(+request.params.id, talkers);

    if (!talker) {
      throw Error(errors.TALKER_NOT_FOUND, { cause: HTTP.NOT_FOUND_STATUS });
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  midLoginValidation,
  midTokenValidation,
  midTalkerValidation,
  midIdValidation,
};