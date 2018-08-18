const argument = process.argv[2];

const helpMessage = `commoji
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

switch (argument) {
  case '--init': initializeGitRepo(`${process.env.PWD}/.git/hooks`);
    break;
  case '--global': initializeGitGlobal();
    break;
  case 'COMMIT_EDITMSG': emojifyCommit();
    break;
  default: console.log(`\n${helpMessage}`);
}
