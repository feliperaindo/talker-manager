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

function nameValidator(name) {
  return name.length > constants.NAME_MIN;
}

function ageValidator(age) {
  return (typeof age === 'number')
    && (age >= 18)
    && Number.isInteger(age);
}

function dateFormatValidator(date) {
  const regex = /^([0-9]){2}\/([0-9]){2}\/([0-9]){4}$/;
  return regex.test(date);
}

function rateValidator(rate) {
  return (typeof rate === 'number')
    && (rate >= constants.RATE_MIN)
    && (rate <= constants.RATE_MAX)
    && Number.isInteger(rate);
}

module.exports = { 
  emailValidator, 
  objectValidator, 
  passwordValidator, 
  tokenValidator,
  nameValidator,
  ageValidator,
  dateFormatValidator,
  rateValidator,
};