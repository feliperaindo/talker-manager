const { objectValidator } = require('../utils/validators');
const { dateChecker, rateChecker } = require('./talkerHelpers');

const { constants } = require('../SSOT/exporter');

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

function talkerFinder(id, array) {
  return array.find((e) => e.id === id);
}

module.exports = {
  talkerFinder,
  searchResult,
  searchValidations,
};