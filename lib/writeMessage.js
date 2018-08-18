const fs = require('fs');

module.exports = function getCommitMessage(filePath, message) {
  return fs.writeFileSync(filePath, message);
};
