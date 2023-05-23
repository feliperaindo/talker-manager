const express = require('express');

const fileReader = require('../../utils/fileReader');
const { 
  talkerFinder,
  addTalker,
  updateTalker,
  removeTalker,
  searchByName } = require('../../utils/talkerUtils');

const { midErrorHandler, midValidations } = require('../../middleware/exporter');

const { HTTP, routes } = require('../../SSOT/exporter');

const talkerRouter = express.Router();

talkerRouter.get(routes.ROOT, async (_request, response) => (
    response.status(HTTP.OK_STATUS).send(await fileReader() || [])
));

talkerRouter.get(routes.SEARCH,
  midValidations.midTokenValidation,
  async (request, response) => {
    const talkers = await searchByName(request.query.q);
    return response.status(HTTP.OK_STATUS).send(talkers);
});

talkerRouter.get(routes.ID, 
  midValidations.midIdValidation,
  async (request, response) => {
    const talkers = await fileReader();
    const talker = talkerFinder(+request.params.id, talkers);
    return response.status(HTTP.OK_STATUS).send(talker); 
});

talkerRouter.use(midValidations.midTokenValidation);

talkerRouter.delete(routes.ID, async (request, response) => {
    removeTalker(Number(request.params.id));
    return response.status(HTTP.DELETE_STATUS).send();
});

talkerRouter.use(midValidations.midTalkerValidation);

talkerRouter.post(routes.ROOT, async (request, response) => {
  const newTalker = await addTalker(request.body);
  return response.status(HTTP.CREATED_STATUS).send(newTalker);
});

talkerRouter.put(routes.ID,
  midValidations.midIdValidation,
  async (request, response) => {
    const talkerUpdated = await updateTalker(Number(request.params.id), request.body);
    return response.status(HTTP.OK_STATUS).send(talkerUpdated);
});

talkerRouter.use(midErrorHandler);

module.exports = talkerRouter;