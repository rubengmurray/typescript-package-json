import * as vscode from 'vscode';
import { updateTypeScriptVersion } from './versioning';


// let mostRecentFile = '';

/**
 * This method is called when then extension is activated (when vs code starts up)
 */
export async function activate(_context: vscode.ExtensionContext) {
  // If the editor opens with a .ts file open, run the check against the file
  if (vscode.window.activeTextEditor?.document.languageId === "typescript") {
    // mostRecentFile = vscode.window.activeTextEditor?.document.fileName;
    updateTypeScriptVersion(vscode.window.activeTextEditor?.document.fileName);
  }

  // Add a listener for all other opened files in the editor
  vscode.workspace.onDidOpenTextDocument((doc) => {
    if (doc.languageId === "typescript") {
      // mostRecentFile = doc.fileName;
      updateTypeScriptVersion(doc.fileName);
    }
  });

  vscode.window.onDidChangeActiveTextEditor(doc => {
    console.log('change focus');
    if (doc?.document.languageId === "typescript") {
      // mostRecentFile = doc.fileName;
      updateTypeScriptVersion(doc?.document.fileName);
    }
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
