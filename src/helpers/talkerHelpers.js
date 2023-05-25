const { errors, constants, HTTP } = require('../SSOT/exporter');
const validators = require('../utils/validators');

function talkerHelpers() {
  const keysAndErrors = () => [
      { keyName: constants.NAME_KEY, notExistError: errors.NAME_NOT_FOUND },
      { keyName: constants.AGE_KEY, notExistError: errors.AGE_NOT_FOUND },
      { keyName: constants.TALK_KEY, notExistError: errors.TALK_NOT_FOUND },
    ];

  const deepKeysAndErrors = () => [
      { keyName: constants.WATCHED_AT_KEY, notExistError: errors.WATCHED_NOT_FOUND },
      { keyName: constants.RATE_KEY, notExistError: errors.RATE_NOT_FOUND },
    ];

  return { keysAndErrors, deepKeysAndErrors };
}

function talkerCreator(talker, id) {
  return {
      id,
      name: talker.name,
      age: talker.age,
      talk:
        {
          watchedAt: talker.talk.watchedAt,
          rate: talker.talk.rate,
        },
    };
}

function talkerAdjusted(talker) {
  return {
    id: talker.id,
    name: talker.name,
    age: talker.age,
    talk: 
      {
        watchedAt: talker.talk_watched_at,
        rate: talker.talk_rate,
      },
  };
}

function tokenExistChecker(headers) {
  if (!validators.objectValidator(headers, constants.AUTHORIZATION_KEY)) {
    throw Error(errors.TOKEN_NOT_FOUND, { cause: HTTP.TOKEN_NOT_FOUND });
  }
 }

 function tokenChecker(token) {
  if (!validators.tokenValidator(token)) {
    throw Error(errors.TOKEN_INVALID, { cause: HTTP.TOKEN_NOT_FOUND });
  }
 }

function nameChecker(name) {
  if (!validators.nameValidator(name)) {
    throw Error(errors.NAME_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

function ageChecker(age) {
  if (!validators.ageValidator(age)) {
    throw Error(errors.AGE_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

function watchedAtChecker(date) {
  if (!validators.dateFormatValidator(date)) {
    throw Error(errors.WATCHED_AT_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

function dateChecker(date) {
  if (!validators.dateFormatValidator(date)) {
    throw Error(errors.DATE_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

function rateChecker(rate) {
  if (!validators.rateValidator(rate)) {
    throw Error(errors.RATE_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

module.exports = { 
  talkerHelpers: talkerHelpers(),
  nameChecker,
  ageChecker,
  watchedAtChecker,
  rateChecker,
  tokenExistChecker,
  tokenChecker,
  dateChecker,
  talkerCreator,
  talkerAdjusted,
};