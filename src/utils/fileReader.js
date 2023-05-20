const { readFile } = require('fs').promises;

async function fileReader(fileName) {
 return JSON.parse(await readFile(fileName));
}

module.exports = fileReader;