const { errors, constants, HTTP } = require('../SSOT/exporter');
const { emailValidator, passwordValidator } = require('../utils/validators');

function loginHelpers() {
  const keysAndErrors = () => [
      { 
        keyName: constants.EMAIL_KEY,
        notExistError: errors.EMAIL_NOT_FOUND,
      },
      { 
        keyName: constants.PASSWORD_KEY,
        notExistError: errors.PASSWORD_NOT_FOUND,
      },
    ];

  return keysAndErrors;
}

function emailChecker(email) {
  if (!emailValidator(email)) {
    throw Error(errors.EMAIL_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

function passwordChecker(password) {
  if (!passwordValidator(password)) {
    throw Error(errors.PASSWORD_INVALID, { cause: HTTP.BAD_REQUEST });
  }
}

module.exports = { loginHelpers, passwordChecker, emailChecker };