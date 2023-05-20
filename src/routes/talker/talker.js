const express = require('express');
const { resolve } = require('path');

const fileReader = require('../../utils/fileReader');
const fileWriter = require('../../utils/fileWriter');

const { midErrorHandler, midValidations } = require('../../middleware/exporter');

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

talkerRouter.use(
  midValidations.midTokenChecker,
  midValidations.midTokenValidation,
  midValidations.midTalkerValidation,
);

talkerRouter.post(routes.ROOT, async (request, response) => {
  const newTalker = await fileWriter(
    resolve(__dirname, paths.PATH_TALKER_FILE),
    {
      name: request.body.name,
      age: request.body.age,
      talk:
        {
          watchedAt: request.body.talk.watchedAt,
          rate: request.body.talk.rate,
        },
    },
  );

  return response.status(HTTP.CREATED_STATUS).send(newTalker);
});

talkerRouter.use(midErrorHandler);

module.exports = talkerRouter;