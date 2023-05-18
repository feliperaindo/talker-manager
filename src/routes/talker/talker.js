const express = require('express');
const { resolve } = require('path');

const readOneFile = require('../../utils/readOneFile');
const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS, 
  ROOT, PATH_TALKER_FILE, ID } = require('../../utils/sourceOfTruth');
const { TALKER_NOT_FOUND } = require('../../utils/errorMessages');

const talkerRouter = express.Router();

talkerRouter.get(ROOT, async (_request, response) => (
    response.status(HTTP_OK_STATUS)
      .send(await readOneFile(resolve(__dirname, PATH_TALKER_FILE) || []))
  ));

talkerRouter.get(`${ROOT}${ID}`, async ({ params: { id } }, response) => {
  const talker = (await readOneFile(resolve(__dirname, PATH_TALKER_FILE)))
    .find(({ id: talkerId }) => (talkerId === +id));

  return (talker === undefined)
    ? response.status(HTTP_NOT_FOUND_STATUS)
        .send({ message: TALKER_NOT_FOUND })
    : response.status(HTTP_OK_STATUS).send(talker);
});

module.exports = talkerRouter;