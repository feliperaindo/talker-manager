const express = require('express');

const rootRouter = express.Router();

const { HTTP, RULES_ROUTES } = require('../../utils/sourceOfTruth');

// não remova esse endpoint, e para o avaliador funcionar
rootRouter.get(RULES_ROUTES.ROOT, (_request, response) => {
  response.status(HTTP.OK_STATUS).send();
});

module.exports = rootRouter;