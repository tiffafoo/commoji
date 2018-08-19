const cosmiconfig = require("cosmiconfig");
const explorer = cosmiconfig("commoji");

module.exports = getConfig = () => {
  const result = explorer.searchSync();

  if (result) {
    return result.config;
  }

  return explorer.loadSync("./.defaultrc.json").config;
};
