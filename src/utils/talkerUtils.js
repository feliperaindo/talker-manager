const fileReader = require('./fileReader');
const fileWriter = require('./fileWriter');

const { talkerCreator } = require('../helpers/talkerHelpers');
const { talkerFinder, searchValidations, searchResult } = require('../helpers/searchHelpers');

async function addTalker(data) {
  const oldData = await fileReader();
  const newTalker = talkerCreator(data, (oldData.length + 1));
  await fileWriter([...oldData, newTalker]);
  return newTalker;
}

async function updateTalker(id, newInfo) {
  const oldData = await fileReader();
  const dataUpdate = oldData.reduce((newData, talker) => ((talker.id === id) 
      ? [...newData, { ...talker, ...talkerCreator(newInfo, id) }]
      : [...newData, talker]), []);
  await fileWriter(dataUpdate);
  return talkerFinder(id, dataUpdate);
}

async function removeTalker(id) {
  const oldData = await fileReader();
  const removedTalker = oldData.filter((talker) => talker.id !== id);
  await fileWriter(removedTalker);
}

async function searchBy(query) {
  const { queryQ, queryRate, queryDate } = searchValidations(query);
  const allTalkers = await fileReader();

  if (queryDate.applied && !query.date.length) {
    return allTalkers;
  }
  return searchResult([queryQ, queryDate, queryRate], query, allTalkers);
}

module.exports = { 
  talkerCreator,
  talkerFinder,
  addTalker,
  updateTalker,
  removeTalker,
  searchBy,
};