// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
// import { extractAsKeyValue, GeneralObject } from "./util";
// import { defaultSettings } from "./defaultSettings";

// https://www.google.com/search?q=vscode+intellisense+typescript+enum&oq=vscode+intellisense+typescript+enum&aqs=chrome..69i57.5961j0j1&sourceid=chrome&ie=UTF-8
// https://code.visualstudio.com/docs/editor/intellisense
// https://stackoverflow.com/questions/40275832/typescript-has-unions-so-are-enums-redundant/60041791#60041791
// https://stackoverflow.com/questions/45141756/cant-intellisense-include-type-script-enum-reverse-mapping
// https://github.com/microsoft/TypeScript/issues/38486
// https://github.com/microsoft/vscode/blob/main/extensions/typescript-language-features/src/languageFeatures/hover.ts
// https://github.com/Microsoft/vscode/issues/30386
// https://code.visualstudio.com/api/references/vscode-api
// https://www.google.com/search?q=vs+code+intellisense+hover&oq=vs+code+intellisense+hover&aqs=chrome..69i57.4417j0j1&sourceid=chrome&ie=UTF-8
// https://blog.logrocket.com/writing-readable-code-with-typescript-enums-a84864f340e9/
// https://code.visualstudio.com/api/language-extensions/programmatic-language-features
// https://www.google.com/search?q=can+you+change+the+typescript+version+programatically&oq=can+you+change+the+typescript+version+programatically&aqs=chrome..69i57.8189j0j1&sourceid=chrome&ie=UTF-8
// https://www.google.com/search?q=set+typescript+version+vscode+api&oq=set+type&aqs=chrome.0.69i59l2j69i57j69i60.1760j0j1&sourceid=chrome&ie=UTF-8
// https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions
// https://www.google.com/search?q=npm+package+to+navigate+directories&oq=npm+package+to+navigate+directories&aqs=chrome..69i57j69i64.6798j0j1&sourceid=chrome&ie=UTF-8
// https://www.npmjs.com/search?q=directory%20walk&page=2
// https://www.npmjs.com/search?q=directory-traversal
// https://www.npmjs.com/package/traverse-folders
// https://www.google.com/search?q=npm+traverse+directories&oq=npm+traverse+directories&aqs=chrome..69i57j69i64.7094j0j1&sourceid=chrome&ie=UTF-8
// https://code.visualstudio.com/api
// https://code.visualstudio.com/api/extension-guides/virtual-documents
// https://www.google.com/search?q=get+path+of+file+in+view&oq=get+path+of+file+in+view&aqs=chrome..69i57.6654j0j1&sourceid=chrome&ie=UTF-8
// https://www.google.com/search?q=nodejspath&oq=nodejspath&aqs=chrome..69i57.4033j0j1&sourceid=chrome&ie=UTF-8
// https://github.com/CoenraadS/BracketPair/blob/develop/src/extension.ts
// https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer
// https://code.visualstudio.com/api/references/extension-manifest
// https://github.com/microsoft/vscode/issues/80056
// https://github.com/Microsoft/vscode/issues/58470
// https://code.visualstudio.com/api/advanced-topics/extension-host
// https://code.visualstudio.com/api/get-started/your-first-extension
// https://github.com/reduckted/GitWebLinks/blob/master/vscode/src/repository-finder.ts
// https://github.com/reduckted/GitWebLinks/blob/master/vscode/src/commands/index.ts
// https://github.com/reduckted/GitWebLinks/blob/master/vscode/src/commands/index.ts
// https://marketplace.visualstudio.com/items?itemName=Dang.package-json-helper
// https://marketplace.visualstudio.com/items?itemName=ldd-vs-code.better-package-json
// https://marketplace.visualstudio.com/items?itemName=loiane.ts-extension-pack
// https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero
// https://www.google.com/search?q=typescript+version+extension+vscode&oq=typescript+version+extension+vscode&aqs=chrome..69i57.5573j0j1&sourceid=chrome&ie=UTF-8
// https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions
// https://github.com/sveltejs/language-tools/issues/1045
// https://github.com/microsoft/vscode/issues/116503
// https://www.google.com/search?q=use+package.json+version+of+typescript+in+vs+code&sxsrf=APq-WBu4SHM8LRPYm-qUqrYk0_aQ0f3oRQ%3A1643667399132&ei=x1_4Yem7B4-D8gKZiaioDw&ved=0ahUKEwipu9Cbgt31AhWPgVwKHZkECvUQ4dUDCA4&uact=5&oq=use+package.json+version+of+typescript+in+vs+code&gs_lcp=Cgdnd3Mtd2l6EAM6BwgAEEcQsANKBAhBGABKBAhGGABQjwRYoxRg-BVoBHACeACAAYsBiAHaCZIBBDEzLjGYAQCgAQHIAQjAAQE&sclient=gws-wiz
// https://stackoverflow.com/questions/39668731/what-typescript-version-is-visual-studio-code-using-how-to-update-it
// https://github.com/CoenraadS/BracketPair#readme
// https://github.com/microsoft/vscode/issues

const getParentDir = (dir2?: string) => {
	const splitByPath = dir2?.split('/');

	if (!splitByPath) {
		return;
	}

	const fileName = splitByPath[ splitByPath.length - 1 ];
	
	const dir = dir2?.replace(`/${fileName}`, '');

	return dir;
};

let i = 0;

const getTypeScriptPath = (path?: string): string | undefined => {
	i = i + 1;
	const dir = getParentDir(path);
	// console.log(dir, 'ful dir');

	if (!dir) {
		return;
	}

	const files = fs.readdirSync(dir);


	if (i > 5) {
		return;
	}

	if (!files.includes('package.json')) {
		return getTypeScriptPath(dir);
	}

	console.log(dir, 'files at the end');

	// Found the path including package.json
	return dir;
};

const updateUserSettings = async (path: string) => {
  // settings.forEach(async setting => {
  //   const { key, value } = extractAsKeyValue(setting);
	const r = await vscode.workspace
		.getConfiguration()
		.update("typescript.tsdk", path, vscode.ConfigurationTarget.Workspace);

	// @ts-ignore
	// const trusted = await vscode.workspace.requestWorkspaceTrust();
	// if (trusted) {
	// 	await this.workspaceState.update(useWorkspaceTsdkStorageKey, true);
	// 	const tsConfig = vscode.workspace.getConfiguration('typescript');
	// 	await tsConfig.update('tsdk', version.pathLabel, false);
	// 	this.updateActiveVersion(version);
	// }
	
	console.log(r, 'r');
	// const conf = vscode.workspace
	// 	.getConfiguration();
	
	// console.log(conf, 'conf');
	// 	.update("typescript.tsdk", path, vscode.ConfigurationTarget.Global);
  // });
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "typescript-package-json" is now active!');
	// console.log(__dirname);
	// console.log(process.cwd());
	// console.log(vscode.workspace.rootPath, 'root workspir dir');

	const lol = getTypeScriptPath(vscode.window.activeTextEditor?.document.fileName);

	// console.log(lol, vscode.workspace.rootPath);

	const rootPath = vscode.workspace.rootPath;

	if (!rootPath) {
		return;
	}
	
	const relativeDifference = lol?.replace(rootPath, '');

	console.log(relativeDifference, 'relativeDifference');

	if (!relativeDifference) {
		console.log(`node_modules/typescript/lib`);
		return updateUserSettings(`node_modules/typescript/lib`);
	}

	await updateUserSettings(`${relativeDifference}/node_modules/typescript/lib`);

	console.log(`${relativeDifference}/node_modules/typescript/lib`);


	// let disposable = vscode.commands.registerCommand(
  //   "zpack.updateConfig",
  //   async () => {
  //     console.log(JSON.stringify(defaultSettings, null, 1));
  //     await updateUserSettings(defaultSettings);
  //     await vscode.window.showInformationMessage(
  //       "ZPack Config has been updated"
  //     );
  //   }
  // );


	// const dir = getParentDir(vscode.window.activeTextEditor?.document.fileName);
	// // console.log(dir, 'ful dir');

	// if (!dir) {
	// 	return;
	// }

	// const files = fs.readdirSync(dir);
	// // console.log(files);

	// if (!files.includes('package.json')) {
	// 	const files2 = getParentDir(dir);

	// 	// console.log(files2, 'files2');

	// 	if (!files2) {
	// 		return;
	// 	}

	// 	const files3 = fs.readdirSync(files2);

	// 	console.log(files3);
	// }

	// const dirs = fs.readdirSync();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('typescript-package-json.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from VS Code');
	// });

	// let disposable = vscode.commands.registerCommand('typescript-package-json.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	// vscode.window.showInformationMessage('Hello World from VS Code');
	// 	vscode.window.showInformationMessage(__dirname);
	// });

	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
