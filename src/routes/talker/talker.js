const express = require('express');
const { resolve } = require('path');

const readOneFile = require('../../utils/readOneFile');
const { HTTP_OK_STATUS, ROOT, PATH_TALKER_FILE } = require('../../utils/sourceOfTruth');

const talkerRouter = express.Router();

talkerRouter.get(ROOT, async (_request, response) => (
    response.status(HTTP_OK_STATUS)
      .send(await readOneFile(resolve(__dirname, PATH_TALKER_FILE)))
  )
);

module.exports = talkerRouter;