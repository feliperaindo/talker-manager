const express = require('express');
const { resolve } = require('path');

const readOneFile = require('../../utils/readOneFile');
const {
  midTalkerValidation,
  midTokenValidation,
  midTokenChecker } = require('../../middleware/midValidations');

const MESSAGES = require('../../utils/errorMessages');
const { HTTP, RULES_ROUTES } = require('../../utils/sourceOfTruth');

const talkerRouter = express.Router();

talkerRouter.get(RULES_ROUTES.ROOT, async (_request, response) => (
    response.status(HTTP.OK_STATUS)
      .send(await readOneFile(resolve(__dirname, RULES_ROUTES.PATH_TALKER_FILE) || []))
  ));

talkerRouter.get(`${RULES_ROUTES.ROOT}${RULES_ROUTES.ID}`, async ({ params: { id } }, response) => {
  const talker = (await readOneFile(resolve(__dirname, RULES_ROUTES.PATH_TALKER_FILE)))
    .find(({ id: talkerId }) => (talkerId === +id));

  return (talker === undefined)
    ? response.status(HTTP.NOT_FOUND_STATUS)
        .send({ message: MESSAGES.TALKER_NOT_FOUND })
    : response.status(HTTP.OK_STATUS).send(talker);
});

talkerRouter.use(midTokenChecker, midTokenValidation, midTalkerValidation);

talkerRouter.post(RULES_ROUTES.ROOT, (request, response) => {
 
});

module.exports = talkerRouter;