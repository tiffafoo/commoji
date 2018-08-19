const emojiRegex = require("emoji-regex");
const getConfig = require("./getConfig");

/**
 * Prepend given commit message with emoji
 *
 * @param {string} initalMsg
 * @returns {string}
 */
module.exports = prependMessage = initalMsg => {
  // Read and parse emojis
  const emojis = getConfig();
  let words = initalMsg.trim();

  const startsWithEmoji = `^${emojiRegex.toString()}`;

  // Do not prepend if message already starts with an emoji or markdown emoji
  if (
    words.match(new RegExp(startsWithEmoji)) ||
    words.match(/^:[a-zA-Z0-9-]+:/)
  )
    return initalMsg;

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

  return prefix ? `${prefix} ${initalMsg}` : initalMsg;
};
