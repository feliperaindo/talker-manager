const { objectValidator, emailValidator,
  passwordValidator, tokenValidator } = require('../utils/validators');

const { HTTP, CONSTANTS } = require('../utils/sourceOfTruth');

const MESSAGES = require('../utils/errorMessages');

function midLoginValidation({ body }, response, next) {
  switch (false) {
    case objectValidator(body, CONSTANTS.EMAIL_KEY):
      return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.EMAIL_NOT_FOUND });
    case objectValidator(body, CONSTANTS.PASSWORD_KEY):
      return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.PASSWORD_NOT_FOUND });
    case emailValidator(body.email):
      return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.EMAIL_INVALID });
    case passwordValidator(body.password):
      return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.PASSWORD_INVALID }); 
    default: return next();
  }
}

function midTokenChecker({ headers }, response, next) {
 return objectValidator(headers, CONSTANTS.AUTHORIZATION_KEY) 
  ? next()
  : response.status(HTTP.TOKEN_NOT_FOUND).send({ message: MESSAGES.TOKEN_NOT_FOUND });
}

function midTokenValidation({ headers: { authorization } }, response, next) {
  return tokenValidator(authorization) 
    ? next()
    : response.status(HTTP.TOKEN_NOT_FOUND).send({ message: MESSAGES.TOKEN_INVALID });
}

function midTalkerValidation({ body }, response, next) {
  switch (false) {
    case objectValidator(body, CONSTANTS.NAME_KEY):
      return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.NAME_NOT_FOUND });
    case objectValidator(body, CONSTANTS.AGE_KEY):
      return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.AGE_NOT_FOUND });
    case objectValidator(body, CONSTANTS.TALK_KEY):
      return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.TALK_NOT_FOUND });
    default: return next(); 
  }
}

module.exports = {
  midLoginValidation,
  midTokenChecker,
  midTokenValidation,
  midTalkerValidation,
};