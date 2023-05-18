const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const ROOT = '/';
const TALKER = '/talker';
const PATH_TALKER_FILE = '../../talker.json';

module.exports = { HTTP_OK_STATUS, ROOT, PORT, TALKER, PATH_TALKER_FILE };