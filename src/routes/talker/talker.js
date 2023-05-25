const express = require('express');

const { midErrorHandler, midValidations } = require('../../middleware/exporter');

const connection = require('../../database/connection');
const fileReader = require('../../utils/fileReader');
const utils = require('../../utils/talkerUtils');

const { HTTP, routes } = require('../../SSOT/exporter');

const talkerRouter = express.Router();

talkerRouter.get(routes.ROOT, async (_request, response) => (
    response.status(HTTP.OK_STATUS).send(await fileReader() || [])
));

talkerRouter.get(routes.DB, async (_request, response) => {
  const db = connection();
  const [resultFromDB] = await db.execute('SELECT * FROM talkers;');
  const talkers = utils.convertDataFromDB(resultFromDB);
  response.status(HTTP.OK_STATUS).send(talkers);
});

talkerRouter.get(routes.SEARCH,
  midValidations.midTokenValidation,
  async (request, response) => {
    try {
      const search = await utils.searchBy(request.query);
      return response.status(HTTP.OK_STATUS).send(search);
    } catch (error) {
      return response.status(error.cause).send({ message: error.message });
    }
});

talkerRouter.get(routes.ID, 
  midValidations.midIdValidation,
  async (request, response) => {
    const talkers = await fileReader();
    const talker = utils.talkerFinder(+request.params.id, talkers);
    return response.status(HTTP.OK_STATUS).send(talker); 
});

talkerRouter.use(midValidations.midTokenValidation);

talkerRouter.delete(routes.ID, async (request, response) => {
    utils.removeTalker(Number(request.params.id));
    return response.status(HTTP.DELETE_STATUS).send();
});

talkerRouter.patch(routes.RATE,
  midValidations.midRateValidation,
  async (request, response) => {
    await utils.updateRate(request.body, request.params.id);
    response.status(HTTP.UPDATE_STATUS).send({});
});

talkerRouter.use(midValidations.midTalkerValidation);

talkerRouter.post(routes.ROOT, async (request, response) => {
  const newTalker = await utils.addTalker(request.body);
  return response.status(HTTP.CREATED_STATUS).send(newTalker);
});

talkerRouter.put(routes.ID,
  midValidations.midIdValidation,
  async (request, response) => {
    const talkerUpdated = await utils.updateTalker(Number(request.params.id), request.body);
    return response.status(HTTP.OK_STATUS).send(talkerUpdated);
});

talkerRouter.use(midErrorHandler);

module.exports = talkerRouter;