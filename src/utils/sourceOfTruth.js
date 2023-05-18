const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const TOKEN_LENGTH = 16;
const PORT = process.env.PORT || '3001';
const ROOT = '/';
const TALKER = '/talker';
const LOGIN = '/login';
const ID = ':id';
const PATH_TALKER_FILE = '../../talker.json';

module.exports = { 
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  TOKEN_LENGTH,
  ROOT,
  PORT,
  TALKER,
  LOGIN,
  PATH_TALKER_FILE,
  ID,
};