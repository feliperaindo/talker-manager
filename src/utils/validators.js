const { constants } = require('../SSOT/exporter');

function emailValidator(email) {
  const regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/i;
  return regex.test(email);
}

function passwordValidator(password) {
  return password.length >= constants.PASSWORD_MIN;
}

function objectValidator(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function tokenValidator(token) {
 return (typeof token === 'string') && (token.length === constants.TOKEN_LENGTH);
}

module.exports = { emailValidator, objectValidator, passwordValidator, tokenValidator };