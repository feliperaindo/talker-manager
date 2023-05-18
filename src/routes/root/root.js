const express = require('express');

const rootRouter = express.Router();

const { HTTP_OK_STATUS, ROOT } = require('../../utils/sourceOfTruth');

// não remova esse endpoint, e para o avaliador funcionar
rootRouter.get(ROOT, (_request, response) => (
    response.status(HTTP_OK_STATUS).send()
  ));

module.exports = rootRouter;