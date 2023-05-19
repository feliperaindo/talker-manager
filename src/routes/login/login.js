const express = require('express');

const tokenGenerator = require('../../utils/tokenGenerator');
const { midLoginValidation } = require('../../middleware/midValidations');

const { CONSTANTS, HTTP, RULES_ROUTES } = require('../../utils/sourceOfTruth');

const loginRouter = express.Router();

loginRouter.use(midLoginValidation);

loginRouter.post(RULES_ROUTES.ROOT, (_request, response) => {
  response.status(HTTP.OK_STATUS).send({ token: tokenGenerator(CONSTANTS.TOKEN_LENGTH) });
});

module.exports = loginRouter;