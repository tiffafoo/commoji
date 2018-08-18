const fs = require("fs");
const emojiRegex = require("emoji-regex");

/**
 * Prepend given commit message with emoji
 *
 * @param {string} initalMsg
 * @returns {string}
 */
module.exports = prependMessage = initalMsg => {
  // Read and parse emojis
  const json = fs.readFileSync("./emojis.json");
  const emojis = JSON.parse(json);
  let words = initalMsg.trim();

  const startsWithEmoji = `^${emojiRegex.toString()}`;

  if (words.match(new RegExp(startsWithEmoji))) return initalMsg;

  // Prep message. We lowercase to later on get value by key
  words = words
    .replace(/\W/, " ")
    .toLowerCase()
    .split(" ");

  const emojisArr = Object.entries(emojis);
  let prefix = "";

  for (emoji of emojisArr) {
    const qualifiers = emoji[1];

    for (qualifier of qualifiers) {
      if (words.includes(qualifier)) {
        prefix += emoji[0];
        break;
      }
    }
  }

  return `${prefix} ${initalMsg}`;
};
