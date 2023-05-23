const express = require('express');

const fileReader = require('../../utils/fileReader');
const { talkerFinder, addTalker, updateTalker, removeTalker } = require('../../utils/talkerUtils');

const { midErrorHandler, midValidations } = require('../../middleware/exporter');

const { HTTP, routes } = require('../../SSOT/exporter');

const talkerRouter = express.Router();

talkerRouter.get(routes.ROOT, async (_request, response) => (
    response.status(HTTP.OK_STATUS)
      .send(await fileReader() || [])
  ));

talkerRouter.get(`${routes.ROOT}${routes.ID}`, 
  midValidations.midIdValidation,
  async (request, response) => {
    const talkers = await fileReader();
    const talker = talkerFinder(+request.params.id, talkers);
    response.status(HTTP.OK_STATUS).send(talker); 
  });

talkerRouter.delete(`${routes.ROOT}${routes.ID}`,
  midValidations.midTokenValidation,
  async (request, response) => {
    removeTalker(Number(request.params.id));
    response.status(HTTP.DELETE_STATUS).send('');
});

talkerRouter.use(
  midValidations.midTokenValidation,
  midValidations.midTalkerValidation,
);

talkerRouter.post(routes.ROOT, async (request, response) => {
  const newTalker = await addTalker(request.body);

  return response.status(HTTP.CREATED_STATUS).send(newTalker);
});

talkerRouter.put(`${routes.ROOT}${routes.ID}`,
  midValidations.midIdValidation,
  async (request, response) => {
    const talkerUpdated = await updateTalker(Number(request.params.id), request.body);
    response.status(HTTP.OK_STATUS).send(talkerUpdated);
  });

talkerRouter.use(midErrorHandler);

module.exports = talkerRouter;