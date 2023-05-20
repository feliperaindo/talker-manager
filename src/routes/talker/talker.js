const express = require('express');
const { resolve } = require('path');

const fileReader = require('../../utils/fileReader');
const {
  // midTalkerValidation,
  midTokenValidation,
  midTokenChecker } = require('../../middleware/midValidations');

const { HTTP, errors, routes, paths } = require('../../SSOT/exporter');

const talkerRouter = express.Router();

talkerRouter.get(routes.ROOT, async (_request, response) => (
    response.status(HTTP.OK_STATUS)
      .send(await fileReader(resolve(__dirname, paths.PATH_TALKER_FILE) || []))
  ));

talkerRouter.get(`${routes.ROOT}${routes.ID}`, async ({ params: { id } }, response) => {
  const talker = (await fileReader(resolve(__dirname, paths.PATH_TALKER_FILE)))
    .find(({ id: talkerId }) => (talkerId === +id));

  return (talker === undefined)
    ? response.status(HTTP.NOT_FOUND_STATUS)
        .send({ message: errors.TALKER_NOT_FOUND })
    : response.status(HTTP.OK_STATUS).send(talker);
});

talkerRouter.use(midTokenChecker, midTokenValidation);

// midTalkerValidation

// talkerRouter.post(routes.ROOT, (request, response) => {
 
// });

module.exports = talkerRouter;