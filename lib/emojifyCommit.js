const fs = require("fs");

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

  // Prep message. We lowercase to later on get value by key
  const words = initalMsg
    .trim()
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
