import fs from 'fs';
import path from 'path';
import type { PackageJson } from 'types-package-json';

export const readPackageJsonData = async () => {
  const packageJsonPath = path.join('package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJsonString = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson: PackageJson = JSON.parse(packageJsonString);

    return { bugReportUrl: packageJson?.bugs?.url || '' };
  }
  throw new Error('package.json read failed.');
};
