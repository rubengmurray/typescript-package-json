import * as vscode from 'vscode';
import * as fs from 'fs';
import { getParentDir } from './traverse';
import { updateUserSettings } from './settings';

// Persist state of previous check
// let currentTypescriptVersion = '';
// let currentTypescriptPath = '';

const getTypeScriptFromPackageJSON = (packageJSONPath: string) => {
  // Try and extract the TS version from the repos package.json... and carry on case of failure
  try {
    const res = fs.readFileSync(packageJSONPath, 'utf-8');
    const packageAsJs = JSON.parse(res);
    return packageAsJs.dependencies?.typescript || packageAsJs.devDependencies?.typescript || 'Not Found';
  } catch (e) {
    console.error(e);
  }
}

export const updateTypeScriptVersion = async (fileName?: string) => {
  if (!fileName) {
    console.log('No filename to process... returning early')
    return;
  }

  const packageJSONDir = getClosestPackageJSONDir(fileName);
  const packageJSONPath = `${packageJSONDir}/package.json`;

  // Get the typescript version for this repository
  const newTypescriptVersion = getTypeScriptFromPackageJSON(packageJSONPath);

  // If it's not declared in package.json, or the version declared is the same as the existing setting, return early
  // TODO: Get existing settings from vs code api somehow... can't find where
  if (
    newTypescriptVersion === 'Not Found'
    // || currentTypescriptVersion === newTypescriptVersion
  ) {
    // console.log('TS Version is the same as existing... returning early');
    console.log('TS Version not found... returning early');
    return;
  }

  // TODO: Deprecated... use something else
  if (!vscode.workspace.rootPath) {
    console.log('Could not find root path... returning early');
    return;
  }
  
  // Get the difference of the open editor dir and the dir of the relevant package.json
  const relativeDifference = packageJSONDir?.replace(vscode.workspace.rootPath, '');

  // Get the tsdk path for this repository
  const tsdkPath = getTSDKPath(relativeDifference);

  // If it's the same as the current path, don't prompt the user
  // if (currentTypescriptPath === tsdkPath) {
  //   console.log('File in same project... returning early');
  //   return;
  // }
  
  // Otherwise relative from the root to the dir
  await updateUserSettings(tsdkPath, fileName);
  
  // In theory updateUserSettings will only return if the dialogue is acknowledged or ignored
  // currentTypescriptVersion = newTypescriptVersion;
  // currentTypescriptPath = tsdkPath;
};

/**
 * Get the closest parent directory including a package.json
 */
const getClosestPackageJSONDir = (path: string): string | undefined => {
  const dir = getParentDir(path);

  if (!dir) {
    return;
  }

  const files = fs.readdirSync(dir);

  if (vscode.workspace.rootPath === dir) {
    console.log('Didnt find package.json traversing up from file directory to root workspace directory');
    return;
  }

  // Recursively call until we find a package.json
  if (!files.includes('package.json')) {
    return getClosestPackageJSONDir(dir);
  }

  return dir;
};

/**
 * Return tsdk path for the workspace
 */
export const getTSDKPath = (relativeDifference?: string) => {
  const basePath = 'node_modules/typescript/lib';

  if (!relativeDifference) {
    return basePath;
  }

  return `.${relativeDifference}/${basePath}`;
};

