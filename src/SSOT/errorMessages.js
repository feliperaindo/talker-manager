const requiredMessage = (field) => `O campo "${field}" é obrigatório`;

const EMAIL_NOT_FOUND = requiredMessage('email');
const PASSWORD_NOT_FOUND = requiredMessage('password');
const NAME_NOT_FOUND = requiredMessage('name');
const AGE_NOT_FOUND = requiredMessage('age');
const TALK_NOT_FOUND = requiredMessage('talk');
const WATCHED_NOT_FOUND = requiredMessage('watchedAt');
const RATE_NOT_FOUND = requiredMessage('rate');
const TALKER_NOT_FOUND = 'Pessoa palestrante não encontrada';
const EMAIL_INVALID = 'O "email" deve ter o formato "email@email.com"';
const PASSWORD_INVALID = 'O "password" deve ter pelo menos 6 caracteres';
const TOKEN_NOT_FOUND = 'Token não encontrado';
const TOKEN_INVALID = 'Token inválido';
const NAME_INVALID = 'O "name" deve ter pelo menos 3 caracteres';
const AGE_INVALID = 'O campo "age" deve ser um número inteiro igual ou maior que 18';
const WATCHED_AT_INVALID = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const RATE_INVALID = 'O campo "rate" deve ser um número inteiro entre 1 e 5';

module.exports = {
  TALKER_NOT_FOUND,
  EMAIL_INVALID,
  EMAIL_NOT_FOUND,
  PASSWORD_INVALID,
  PASSWORD_NOT_FOUND,
  TOKEN_NOT_FOUND,
  TOKEN_INVALID,
  NAME_NOT_FOUND,
  AGE_NOT_FOUND,
  TALK_NOT_FOUND,
  WATCHED_NOT_FOUND,
  RATE_NOT_FOUND,
  NAME_INVALID,
  AGE_INVALID,
  WATCHED_AT_INVALID,
  RATE_INVALID,
};