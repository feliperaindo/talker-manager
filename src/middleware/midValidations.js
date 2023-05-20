const { 
  objectValidator,
  emailValidator,
  passwordValidator,
  tokenValidator } = require('../utils/validators');

const loginHelpers = require('../helpers/loginHelpers');

const { HTTP, constants, errors } = require('../SSOT/exporter');

function keysChecker(object, array) {
  array.forEach((key) => {
    if (!objectValidator(object, key.keyName)) {
      throw Error(key.notExistError, { cause: HTTP.BAD_REQUEST });
    }
  });
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

function midLoginValidation(request, response, next) {
  try {
    keysChecker(request.body, loginHelpers.keysAndErrors());
    emailChecker(request.body.email);
    passwordChecker(request.body.password);
    next();
  } catch (error) {
    next(error);
  }
}

// function midLoginValidation({ body }, response, next) {
//   if (!emailValidator(body.email)) {
//     return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.EMAIL_INVALID });
//   }
//   if (!passwordValidator(body.password)) {
//     return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.PASSWORD_INVALID });
//   }
//   next();
// }

// function midLoginValidation({ body }, response, next) {
//   switch (false) {
//     case objectValidator(body, CONSTANTS.EMAIL_KEY):
//       return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.EMAIL_NOT_FOUND });
//     case objectValidator(body, CONSTANTS.PASSWORD_KEY):
//       return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.PASSWORD_NOT_FOUND });
//     case emailValidator(body.email):
//       return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.EMAIL_INVALID });
//     case passwordValidator(body.password):
//       return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.PASSWORD_INVALID }); 
//     default: return next();
//   }
// }

// function midTalkerValidation({ body }, response, next) {
//   switch (false) {
//     case objectValidator(body, CONSTANTS.NAME_KEY):
//       return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.NAME_NOT_FOUND });
//     case objectValidator(body, CONSTANTS.AGE_KEY):
//       return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.AGE_NOT_FOUND });
//     case objectValidator(body, CONSTANTS.TALK_KEY):
//       return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.TALK_NOT_FOUND });
//     case objectValidator(body, CONSTANTS.WATCHED_AT_KEY):
//       return response.status(HTTP.BAD_REQUEST).send({ message: MESSAGES.WATCHED_NOT_FOUND });
//     case objectValidator(body, CONSTANTS.RATE_KEY):
//     default: return next(); 
//   }
// }

function midTokenChecker({ headers }, response, next) {
 return objectValidator(headers, constants.AUTHORIZATION_KEY) 
  ? next()
  : response.status(HTTP.TOKEN_NOT_FOUND).send({ message: errors.TOKEN_NOT_FOUND });
}

function midTokenValidation({ headers: { authorization } }, response, next) {
  return tokenValidator(authorization) 
    ? next()
    : response.status(HTTP.TOKEN_NOT_FOUND).send({ message: errors.TOKEN_INVALID });
}

module.exports = {
  midLoginValidation,
  midTokenChecker,
  midTokenValidation,
  // midTalkerValidation,
};