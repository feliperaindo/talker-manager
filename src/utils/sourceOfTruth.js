const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = process.env.PORT || '3001';
const ROOT = '/';
const TALKER = '/talker';
const ID = ':id';
const PATH_TALKER_FILE = '../../talker.json';

module.exports = { 
  HTTP_OK_STATUS, 
  ROOT, 
  PORT, 
  TALKER, 
  PATH_TALKER_FILE, 
  ID, 
  HTTP_NOT_FOUND_STATUS,
};