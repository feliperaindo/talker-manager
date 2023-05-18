const { objectValidator, emailValidator, passwordValidator } = require('../utils/validators');

const { EMAIL_KEY, PASSWORD_KEY, HTTP_BAD_REQUEST } = require('../utils/sourceOfTruth');
const { EMAIL_NOT_FOUND, PASSWORD_NOT_FOUND,
  EMAIL_INVALID, PASSWORD_INVALID } = require('../utils/errorMessages');

function midValidation({ body }, response, next) {
  switch (false) {
    case objectValidator(body, EMAIL_KEY):
      return response.status(HTTP_BAD_REQUEST).send({ message: EMAIL_NOT_FOUND });
    case objectValidator(body, PASSWORD_KEY):
      return response.status(HTTP_BAD_REQUEST).send({ message: PASSWORD_NOT_FOUND });
    case emailValidator(body.email):
      return response.status(HTTP_BAD_REQUEST).send({ message: EMAIL_INVALID });
    case passwordValidator(body.password):
      return response(HTTP_BAD_REQUEST).send({ message: PASSWORD_INVALID }); 
    default: return next();
  }
}

module.exports = midValidation;