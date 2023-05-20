const express = require('express');

const rootRouter = express.Router();

const { HTTP, routes } = require('../../SSOT/exporter');

// não remova esse endpoint, e para o avaliador funcionar
rootRouter.get(routes.ROOT, (_request, response) => {
  response.status(HTTP.OK_STATUS).send();
});

module.exports = rootRouter;