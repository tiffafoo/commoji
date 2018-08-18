const fs = require('fs');
const path = require('path');

module.exports = async function initializeRepo(hooksPath) {
  const prepareMessageHook = path.join(hooksPath, 'prepare-commit-msg');

  let hookExists;
  try {
    fs.accessSync(prepareMessageHook, fs.constants.F_OK);
    hookExists = true;
  } catch (_) {
    hookExists = false;
  }

  if (hookExists) {
    console.log(`
A prepare-commit-msg hook already exists.
Run the following command to delete it and proceed with using commoji:

    rm ${prepareMessageHook}
`);
    return undefined;
  }
};
