const { errors, constants } = require('../SSOT/exporter');

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

  return { keysAndErrors };
}

module.exports = loginHelpers();