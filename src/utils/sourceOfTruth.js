const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST = 400;
const TOKEN_LENGTH = 16;
const PORT = process.env.PORT || '3001';
const ROOT = '/';
const TALKER = '/talker';
const LOGIN = '/login';
const ID = ':id';
const PATH_TALKER_FILE = '../../talker.json';
const PASSWORD_MIN = 6;
const EMAIL_KEY = 'email';
const PASSWORD_KEY = 'password';
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

module.exports = { 
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_BAD_REQUEST,
  TOKEN_LENGTH,
  ROOT,
  PORT,
  TALKER,
  LOGIN,
  PATH_TALKER_FILE,
  ID,
  PASSWORD_MIN,
  EMAIL_KEY,
  PASSWORD_KEY,
  ALPHABET,
};