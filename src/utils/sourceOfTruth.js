// HTTP status
const HTTP_OK_STATUS = 200;
const HTTP_TOKEN_NOT_FOUND = 401;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST = 400;

// Routes, paths and port
const PORT = process.env.PORT || '3001';
const ROOT = '/';
const TALKER = '/talker';
const LOGIN = '/login';
const ID = ':id';
const PATH_TALKER_FILE = '../../talker.json';

// App constants
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const EMAIL_KEY = 'email';
const PASSWORD_KEY = 'password';
const AUTHORIZATION_KEY = 'authorization';
const NAME_KEY = 'name';
const AGE_KEY = 'age';
const TALK_KEY = 'talk';
const WATCHED_AT_KEY = 'watchedAt';
const PASSWORD_MIN = 6;
const TOKEN_LENGTH = 16;

module.exports = {
  HTTP: {
    OK_STATUS: HTTP_OK_STATUS,
    TOKEN_NOT_FOUND: HTTP_TOKEN_NOT_FOUND,
    NOT_FOUND_STATUS: HTTP_NOT_FOUND_STATUS,
    BAD_REQUEST: HTTP_BAD_REQUEST,
  },
  CONSTANTS: {
    ALPHABET,
    EMAIL_KEY,
    TOKEN_LENGTH,
    PASSWORD_MIN,
    PASSWORD_KEY,
    AUTHORIZATION_KEY,
    NAME_KEY,
    TALK_KEY,
    AGE_KEY,
    WATCHED_AT_KEY,
  },
  RULES_ROUTES: {
    ROOT,
    PORT,
    TALKER,
    LOGIN,
    PATH_TALKER_FILE,
    ID,
  },
};