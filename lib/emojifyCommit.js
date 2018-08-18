const fs = require('fs');

// Read and parse emojis
const json = fs.readFileSync('./emojis.json');
const emojis = JSON.parse(json);

// Make a list of emoji names
const commitNames = emojis.defaults.map(emoji => emoji.name);

/**
 * Returns a string containing the prefix of
 * emojis to prepend to the commit message
 * (up to two emojis)
 *
 * @param {Array<string>} foundNames
 * @returns {string}
 */
const getEmojisPrefix = (foundNames) => {
  const emojisFound = emojis.defaults.map((emoji) => {
    if (foundNames.includes(emoji.name)) return emoji.character;
  });

  return emojisFound.join('');
};

/**
 * Prepend given commit message with emoji
 *
 * @param {string} initalMsg
 * @returns {string}
 */
const prependMessage = (initalMsg) => {
  // Prep message. We lowercase to later on get value by key
  const preppedMsg = initalMsg.trim().toLowerCase();
  // Join the keys to form the regex
  const keys = commitNames.join('|');
  // ex: /(add|remove/fix)/gi
  const regex = RegExp(`(${keys})`, 'g');

  // ex: ['Add'], up to two verbs
  // TODO: Match only unique, need to filter
  const foundNames = preppedMsg.match(regex).slice(0, 1);

  return `${getEmojisPrefix(foundNames)} ${initalMsg}`;
};

module.exports = prependMessage;
