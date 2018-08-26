const fs = require("fs");
const path = require("path");
const readline = require('readline');
const { exec } = require('child_process');
const homedir = require('os').homedir();

// Takes the commit message and runs it through commoji
const commojiHook = `#!/bin/sh
exec < /dev/tty
commoji $1
`;
// Where the global hook will be located
const gitHooksPath = "/usr/local/share/git-core/templates/hooks";
// Command to run to set up global hooks path (git 2.9)
const cmdConfigCoreHooksPath = "git config --global core.hooksPath";
// Path where prepare-commit-msg will reside (has our commojiHook)
const prepareMessageHook = path.join(gitHooksPath, "prepare-commit-msg");

/**
 */

 module.exports = globalRepos = async () => {
	let hookExists;

	try {
		// Synchronously test the user's permissions for the file
		// F_OK: Constant for fs.access(). File is visible to the calling process
		fs.accessSync(gitHooksPath, fs.constants.F_OK);
		hookExists = true;
	} catch(_) {
		hookExists = false;
	}

	if (hookExists) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		rl.question(`
A prepare-commit-msg hook already exists at ${gitHooksPath}. 
Would you like to overwite the existing hook? (y/N) 
`, async (answer) => {
			// Exit if user does not want to override their hook
			if (!answer.match(/^(y|yes)$/gi)) {
				rl.close();
				return;
			}

			// Close readline
			rl.close();

			// Create folders where hook will reside if does not exist
			await exec(`mkdir -p ${gitHooksPath}`, err => {
				if (err) {
					console.log(`Unable to make folders ${gitHooksPath}: ${err}`);
					return;
				}
			});

			// Create prepare-commit-msg file if does not exist
			await exec(`touch ${prepareMessageHook}`, err => {
				if (err) {
					console.log(`Unable to create file ${prepareMessageHook}: ${err}`);
					return;
				}
			});

			// Write hook to folder (replace any existing)
			fs.writeFileSync(prepareMessageHook, commojiHook, {mode: 0o777});

			// Set up global config so commit will look at that hook by default (git 2.9)
			await exec(`${cmdConfigCoreHooksPath} ${gitHooksPath}`, err => {
				if (err) {
					console.log(`Unable to set up global core.hooks_path '${cmdConfigCoreHooksPath} ${gitHooksPath}': ${err}`);
					return;
				}
				console.log("✨ Successfully installed commoji globally 🌏 ! You can now commit as you normally would.")
			});
		});
	}
 }
