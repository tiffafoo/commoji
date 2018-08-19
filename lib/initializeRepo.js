const fs = require("fs");
const path = require("path");

const commojiHook = `#!/bin/sh
exec < /dev/tty
commoji $1
`;

module.exports = async function initializeRepo(hooksPath) {
  const prepareMessageHook = path.join(hooksPath, "prepare-commit-msg");

  // Check for pre-existing hooks
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

  // Create git hook
  fs.writeFileSync(prepareMessageHook, commojiHook, { mode: 0o777 });
};
