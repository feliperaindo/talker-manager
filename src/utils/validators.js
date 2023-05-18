const { PASSWORD_MIN } = require('./sourceOfTruth');

function emailValidator(email) {
  const regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/i;
  return regex.test(email);
}

function passwordValidator(password) {
  return password.length >= PASSWORD_MIN;
}

function objectValidator(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

module.exports = { emailValidator, objectValidator, passwordValidator };