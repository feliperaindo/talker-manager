const { writeFile } = require('fs').promises;
const { resolve } = require('path');
const { paths } = require('../SSOT/exporter');

// const oldData = await fileReader();
// const newTalker = talkerCreator(data, (oldData.length + 1));

async function fileWriter(data) {
  await writeFile(resolve(__dirname, paths.PATH_TALKER_FILE), JSON.stringify(data));
}

module.exports = fileWriter;