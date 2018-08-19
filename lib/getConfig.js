const fs = require("fs");
const cosmiconfig = require("cosmiconfig");
const explorer = cosmiconfig("commoji");

module.exports = getConfig = () => {
  const result = explorer.searchSync();

  if (result) {
    return result.config;
  }

  const json = fs.readFileSync("./.defaultrc.json");
  return JSON.parse(json);
};
