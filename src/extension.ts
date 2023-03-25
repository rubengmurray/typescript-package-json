import * as vscode from 'vscode';
import { updateTypeScriptVersion } from './versioning';

// https://github.com/Microsoft/vscode/blob/c3b73d3733e579b984d765b4264e34031cbf4397/extensions/typescript-language-features/src/tsServer/versionManager.ts#L161
// https://github.com/Microsoft/vscode/blob/c3b73d3733e579b984d765b4264e34031cbf4397/extensions/typescript-language-features/src/typescriptService.ts#L72

/**
 * This method is called when then extension is activated (when vs code starts up)
 */
export async function activate(_context: vscode.ExtensionContext) {
  // const vsCodeTSLangExt = vscode.extensions.getExtension('vscode.typescript-language-features')?.activate()
  // const vsCodeTSExt = vscode.extensions.getExtension('vscode.typescript')?.activate()

  // If the editor opens with a .ts file open, run the check against the file
  if (vscode.window.activeTextEditor?.document?.languageId === "typescript") {
    updateTypeScriptVersion(vscode.window.activeTextEditor?.document?.fileName);
  }

  // Add a listener for all other opened files in the editor
  vscode.workspace.onDidOpenTextDocument((doc) => {
    if (doc?.languageId === "typescript") {
      updateTypeScriptVersion(doc.fileName);
    }
  });

  vscode.window.onDidChangeActiveTextEditor(doc => {
    if (doc?.document?.languageId === "typescript") {
      updateTypeScriptVersion(doc?.document.fileName);
    }
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
