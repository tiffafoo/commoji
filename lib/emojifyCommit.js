const fs = require("fs");

// Read and parse emojis
const json = fs.readFileSync("./emojis.json");
const emojis = JSON.parse(json);

/**
 * Returns a string containing the prefix of
 * emojis to prepend to the commit message
 * (up to two emojis)
 *
 * @param {Array<string>} foundNames
 * @returns {string}
 */
const getEmojisPrefix = foundNames => {
  // [[✨, ['add', 'feat'...]], [🔥, [...]]...]
  const emojisArr = Object.entries(emojis);
  // Holder
  let prefix = "";

  foundNames.forEach(name => {
    emojisArr.forEach(emoji => {
      if (emoji[1].includes(name)) prefix += emoji[0];
    });
  });

  return prefix;
};

const reducer = (accumulator, currentValue) => [
  ...accumulator,
  ...currentValue
];

/**
 * Prepend given commit message with emoji
 *
 * @param {string} initalMsg
 * @returns {string}
 */
const prependMessage = initalMsg => {
  // Prep message. We lowercase to later on get value by key
  const preppedMsg = initalMsg.trim().toLowerCase();

  // Join the keys to form the regex
  const keys = Object.values(emojis)
    .reduce(reducer)
    .join("|");

  // ex: /(add|remove/fix)(?!.*\1)/g
  // Negative lookaround to remove duplicates
  const regex = RegExp(`(${keys})(?!.*\\1)`, "g");

  // ex: ['Add'], up to two verbs
  const foundNames = preppedMsg.match(regex).slice(0, 1);

  return `${getEmojisPrefix(foundNames)} ${initalMsg}`;
};

module.exports = prependMessage;
