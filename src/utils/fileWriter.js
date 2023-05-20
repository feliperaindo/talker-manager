const { writeFile } = require('fs').promises;

const fileReader = require('./fileReader');

async function fileWriter(fileName, newData) {
  const oldData = await fileReader(fileName);
  const dataUpdate = [...oldData, { ...newData, id: (oldData.length + 1) }];
  await writeFile(fileName, JSON.stringify(dataUpdate));
  return { ...newData, id: (oldData.length + 1) };
}

module.exports = fileWriter;