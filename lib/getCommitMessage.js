const fs = require("fs");

module.exports = function getCommitMessage(commitMessageFile) {
  return fs.readFileSync(commitMessageFile, { encoding: "utf8" });
};
