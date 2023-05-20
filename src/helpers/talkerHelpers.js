const { errors, constants, HTTP } = require('../SSOT/exporter');
const { 
  nameValidator, 
  ageValidator, 
  dateFormatValidator, 
  rateValidator } = require('../utils/validators');

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

function nameChecker(name) {
  if (!nameValidator(name)) {
    throw Error(errors.NAME_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

function ageChecker(age) {
  if (!ageValidator(age)) {
    throw Error(errors.AGE_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

function dateChecker(date) {
  if (!dateFormatValidator(date)) {
    throw Error(errors.WATCHED_AT_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

function rateChecker(rate) {
  if (!rateValidator(rate)) {
    throw Error(errors.RATE_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

module.exports = { 
  talkerHelpers: talkerHelpers(),
  nameChecker,
  ageChecker,
  dateChecker,
  rateChecker,
};