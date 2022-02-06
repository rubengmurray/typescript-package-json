export const getParentDir = (dir2: string) => {
  const splitByPath = dir2?.split('/');

  if (!splitByPath) {
    return;
  }

  const fileName = splitByPath[ splitByPath.length - 1 ];
  const dir = dir2?.replace(`/${fileName}`, '');

  return dir;
};
