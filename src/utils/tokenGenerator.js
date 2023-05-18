const { ALPHABET } = require('./sourceOfTruth');

function tokenGenerator(length) {
  const alphabet = ALPHABET.split('');
  const randomCaracteres = [];

  for (let i = 0; i < length; i += 1) {
      randomCaracteres.push(
        alphabet[(Math.floor(Math.random() * (alphabet.length - 1)))],
      );
  }
  return randomCaracteres.join('');
}

module.exports = tokenGenerator;