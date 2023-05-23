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

module.exports = { talkerCreator, talkerFinder, addTalker, updateTalker };