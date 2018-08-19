#!/usr/bin/env node
const initializeGitRepo = require("./lib/initializeRepo");
const emojifyCommit = require("./lib/emojifyCommit");
const getCommitMessage = require("./lib/getCommitMessage");
const writeMessage = require("./lib/writeMessage");

const helpMessage = `
commoji
Configure a git commit hook to auto-emojify your commits! ✌️

USAGE:
    commoji [FLAG]

FLAGS:
    --init
        Initialize a git repository to automatically prepend git commits with
        the appropriate emoji for the commit that was written.

    --global
        Configure your local git installation to automatically install the
        commoji git hook in all git repos initialized in the future with 
        'git init'.
`;

function main(argument = "") {
  if (argument === "--init") {
    return initializeGitRepo(`${process.env.PWD}/.git/hooks`);
  }
  if (argument === "--global") {
    return initializeGitGlobal();
  }
  if (typeof argument === "string" && argument.includes("COMMIT_EDITMSG")) {
    const originalMessage = getCommitMessage(argument);
    const newMessage = emojifyCommit(originalMessage);
    return writeMessage(argument, newMessage);
  }
  console.log(helpMessage);
}

main(process.argv[2]);
