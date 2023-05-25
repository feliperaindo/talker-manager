const fileReader = require('./fileReader');
const fileWriter = require('./fileWriter');
const { objectValidator } = require('./validators');

const { constants } = require('../SSOT/exporter');
const { rateChecker, dateChecker } = require('../helpers/talkerHelpers');

function talkerCreator(talker, id) {
  return {
      id,
      name: talker.name,
      age: talker.age,
      talk:
        {
          watchedAt: talker.talk.watchedAt,
          rate: talker.talk.rate,
        },
    };
}

function talkerFinder(id, array) {
  return array.find((e) => e.id === id);
}

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

function searchByName(name, talkers) {
  return talkers.filter((talker) => talker.name.includes(name));
}

function searchByRate(rate, talkers) {
  rateChecker(+rate);
  return talkers.filter((talker) => (talker.talk.rate === +rate));
}

function searchByDate(date, talkers) {
  dateChecker(date);
  
  const [searchDay, searchMonth, searchYear] = date.split('/');
  const searchDate = new Date(`${searchYear}-${searchMonth}-${searchDay}`).toString();

  return talkers.filter((talker) => {
    const [day, month, year] = talker.talk.watchedAt.split('/');
    const eachTalkerDate = new Date(`${year}-${month}-${day}`).toString();
    return (searchDate === eachTalkerDate);
  });
}

function searchValidations(query) {
  return { 
    queryQ: { 
      applied: objectValidator(query, constants.QUERY_Q),
      filter: searchByName,
      key: constants.QUERY_Q,
    },
    queryRate: { 
      applied: objectValidator(query, constants.RATE_KEY),
      filter: searchByRate,
      key: constants.RATE_KEY,
    },
    queryDate: { 
      applied: objectValidator(query, constants.QUERY_DATE),
      filter: searchByDate,
      key: constants.QUERY_DATE,
    },
  };
}

function searchResult(filtersApplied, query, allTalkers) {
  return filtersApplied
    .reduce((result, { applied, filter, key }) => (
      applied 
        ? filter(query[key], result) 
        : result), [...allTalkers]);
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
  searchByName,
  searchByDate,
  searchBy,
  searchByRate,
};