const errors = require('../utils/errorMessages');

function loginHelpers() {
  const keysAndErrors = () => [
      { 
        keyName: 'EMAIL_KEY',
        notExistError: { message: errors.EMAIL_NOT_FOUND },
        invalidError: { message: errors.EMAIL_INVALID },
      },
      { 
        keyName: 'PASSWORD_KEY',
        notExistError: { message: errors.PASSWORD_NOT_FOUND },
        invalidError: { message: errors.PASSWORD_INVALID },
      },
    ];

  return { keysAndErrors };
}

module.exports = loginHelpers;