const fileReader = require('../utils/fileReader');

const { objectValidator } = require('../utils/validators');
const { talkerFinder } = require('../utils/talkerUtils');

const lh = require('../helpers/loginHelpers');
const th = require('../helpers/talkerHelpers');

const { HTTP, errors, constants } = require('../SSOT/exporter');

function keysChecker(object, array) {
  array.forEach((key) => {
    if (!objectValidator(object, key.keyName)) {
      throw Error(key.notExistError, { cause: HTTP.BAD_REQUEST });
    }
  });
}

function midLoginValidation(request, _response, next) {
  try {
    keysChecker(request.body, lh.loginHelpers()());
    lh.emailChecker(request.body.email);
    lh.passwordChecker(request.body.password);
    next();
  } catch (error) {
    next(error);
  }
}

function midTalkerValidation(request, _response, next) {
  try {
    keysChecker(request.body, th.talkerHelpers.keysAndErrors());
    keysChecker(request.body.talk, th.talkerHelpers.deepKeysAndErrors());
    th.ageChecker(request.body.age);
    th.nameChecker(request.body.name);
    th.watchedAtChecker(request.body.talk.watchedAt);
    th.rateChecker(request.body.talk.rate);
    next();
  } catch (error) {
    next(error);
  }
}

function midTokenValidation(request, _response, next) {
  try {
    th.tokenExistChecker(request.headers);
    th.tokenChecker(request.headers.authorization);
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

async function midRateValidation(request, _response, next) {
  try {
    if (!objectValidator(request.body, constants.RATE_KEY)) {
      throw Error(errors.RATE_NOT_FOUND, { cause: HTTP.BAD_REQUEST });
    }
    th.rateChecker(request.body.rate);
    next();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  midLoginValidation,
  midTokenValidation,
  midTalkerValidation,
  midIdValidation,
  midRateValidation,
};