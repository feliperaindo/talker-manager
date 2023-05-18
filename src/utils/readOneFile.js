const { readFile } = require('fs').promises;

async function readOneFile(fileName) {
 return JSON.parse(await readFile(fileName));
}

module.exports = readOneFile;