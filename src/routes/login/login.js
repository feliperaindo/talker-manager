const express = require('express');

const { midErrorHandler, midValidations } = require('../../middleware/exporter');

const tokenGenerator = require('../../utils/tokenGenerator');

const { HTTP, routes, constants } = require('../../SSOT/exporter');

const loginRouter = express.Router();

loginRouter.use(midValidations.midLoginValidation);

loginRouter.post(routes.ROOT, (_request, response) => (
  response.status(HTTP.OK_STATUS).send({ token: tokenGenerator(constants.TOKEN_LENGTH) })
));

loginRouter.use(midErrorHandler);

module.exports = loginRouter;