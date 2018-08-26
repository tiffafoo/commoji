const cosmiconfig = require("cosmiconfig");
const explorer = cosmiconfig("commoji");
const path = require("path");
const fs = require("fs");

module.exports = getConfig = () => {
  const result = explorer.searchSync();

  if (result) {
    return result.config;
  }

  return explorer.loadSync(path.resolve(__dirname, "../.defaultrc.json")).config;
};
