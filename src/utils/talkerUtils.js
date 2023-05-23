const fileReader = require('./fileReader');
const fileWriter = require('./fileWriter');

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

async function searchByName(name) {
  const allTalkers = await fileReader();
  return allTalkers.filter((talker) => talker.name.includes(name));
}

module.exports = { 
  talkerCreator,
  talkerFinder,
  addTalker,
  updateTalker,
  removeTalker,
  searchByName,
};