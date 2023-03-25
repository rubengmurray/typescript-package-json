import * as vscode from 'vscode';

export const updateUserSettings = async (path: string, fileName: string) => {
  // Set the tsdk version in settings.json to the relative path of the repositories package.json
  await vscode.workspace
    .getConfiguration()
    .update("typescript.tsdk", path, vscode.ConfigurationTarget.Workspace);
  
  const currentOpenFile = vscode.window.activeTextEditor?.document?.fileName

  if (currentOpenFile !== fileName) {
    console.log('Active file has changed since initial prompt... returning early')
    return;
  }

  // Prompt the user to confirm a typescript selection change
  await vscode.commands.executeCommand('typescript.selectTypeScriptVersion');
};
