const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

// KEYS
const EMAIL_KEY = 'email';
const PASSWORD_KEY = 'password';
const AUTHORIZATION_KEY = 'authorization';
const NAME_KEY = 'name';
const AGE_KEY = 'age';
const TALK_KEY = 'talk';
const WATCHED_AT_KEY = 'watchedAt';
const RATE_KEY = 'rate';

// RULES
const PASSWORD_MIN = 6;
const NAME_MIN = 3;
const TOKEN_LENGTH = 16;
const RATE_MIN = 1;
const RATE_MAX = 5;

// PARAMETERS
const QUERY_Q = 'q';
const QUERY_DATE = 'date';

// DATABASE
const LOCALHOST = 'localhost';
const USER_DB = 'root';
const PASSWORD_DB = 'password';
const NAME_DB = 'TalkerDB';

module.exports = {
  ALPHABET,
  EMAIL_KEY,
  PASSWORD_KEY,
  AUTHORIZATION_KEY,
  NAME_KEY,
  AGE_KEY,
  TALK_KEY,
  WATCHED_AT_KEY,
  RATE_KEY,
  PASSWORD_MIN,
  TOKEN_LENGTH,
  NAME_MIN,
  RATE_MAX,
  RATE_MIN,
  QUERY_Q,
  QUERY_DATE,
  LOCALHOST,
  USER_DB,
  PASSWORD_DB,
  NAME_DB,
};