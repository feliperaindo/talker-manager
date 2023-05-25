const express = require('express');

const { HTTP, routes } = require('../../SSOT/exporter');

const rootRouter = express.Router();

// não remova esse endpoint, e para o avaliador funcionar
rootRouter.get(routes.ROOT, (_request, response) => response.status(HTTP.OK_STATUS).send());

module.exports = rootRouter;