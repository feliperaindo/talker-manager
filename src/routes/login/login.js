const express = require('express');

const { ROOT, HTTP_OK_STATUS, TOKEN_LENGTH } = require('../../utils/sourceOfTruth');
const tokenGenerator = require('../../utils/tokenGenerator');

const loginRouter = express.Router();

loginRouter.post(ROOT, (_request, response) => {
  response.status(HTTP_OK_STATUS).send({ token: tokenGenerator(TOKEN_LENGTH) });
});

module.exports = loginRouter;