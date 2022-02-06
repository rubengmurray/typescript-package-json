import * as vscode from 'vscode';

export const updateUserSettings = async (path: string) => {
	// Set the tsdk version in settings.json to the relative path of the repositories package.json
	await vscode.workspace
		.getConfiguration()
		.update("typescript.tsdk", path, vscode.ConfigurationTarget.Workspace);

	// TODO: Before prompt, check filename hasn't changed

	// Prompt the user to confirm a typescript selection change
	await vscode.commands.executeCommand('typescript.selectTypeScriptVersion');
};
