const { constants } = require('../SSOT/exporter');

function tokenGenerator(length) {
  const alphabet = constants.ALPHABET.split('');
  const randomCaracteres = [];

  for (let i = 0; i < length; i += 1) {
      randomCaracteres.push(
        alphabet[(Math.floor(Math.random() * (alphabet.length - 1)))],
      );
  }
  return randomCaracteres.join('');
}

module.exports = tokenGenerator;