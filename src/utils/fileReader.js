const { readFile } = require('fs').promises;
const { resolve } = require('path');

const { paths } = require('../SSOT/exporter');

async function fileReader() {
 return JSON.parse(await readFile(resolve(__dirname, paths.PATH_TALKER_FILE)));
}

module.exports = fileReader;