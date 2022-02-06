import * as vscode from 'vscode';
import * as fs from 'fs';
import { getParentDir } from './traverse';
import { updateUserSettings } from './settings';

// Persist state of previous check
let currentTypescriptVersion = '';
let currentTypescriptPath = '';

export const updateTypeScriptVersion = async (fileName?: string) => {
	if (!fileName) {
		console.log('No filename to process... returning early')
		return;
	}

  const packageJSONDir = getClosestPackageJSONDir(fileName);
  const packageJSONPath = `${packageJSONDir}/package.json`;

  try {
    const res = fs.readFileSync(packageJSONPath, 'utf-8');
    const packageAsJs = JSON.parse(res);
    const tsDep = packageAsJs.dependencies.typescript || packageAsJs.devDependencies.typescript;

    if (currentTypescriptVersion === tsDep) {
      console.log('TS Version is the same as existing... returning early');
      return;
    }

    currentTypescriptVersion = tsDep;
  } catch (e) {
    console.error(e);
  }

  if (!vscode.workspace.rootPath) {
    console.log('Could not find root path... returning early');
    return;
  }
  
  // Get the difference of the open editor dir and the dir of the relevant package.json
  const relativeDifference = packageJSONDir?.replace(vscode.workspace.rootPath, '');

  // Get the tsdk path for this repository
  const tsdkPath = getTSDKPath(relativeDifference);

  // If it's the same as the current path, don't prompt the user
  if (currentTypescriptPath === tsdkPath) {
    console.log('File in same project... returning early');
    return;
  }

  currentTypescriptPath = tsdkPath;

  // Otherwise relative from the root to the dir
  await updateUserSettings(tsdkPath);
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
  // TODO: Stop recursive call if root dir is reached
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

