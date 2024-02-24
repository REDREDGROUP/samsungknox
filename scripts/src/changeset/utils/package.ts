import path from 'path';

import { PackageJSON } from '@changesets/types';
import { getPackages } from '@manypkg/get-packages';
import type { Package } from '@manypkg/get-packages';
import fs from 'fs-extra';
import semver from 'semver';

import { FunctionsCommonOptions } from '../type';

export const getVersionsByDirectory = async (cwd: string) => {
  const { packages } = await getPackages(cwd);
  return new Map(packages.map((packages) => [packages.dir, packages.packageJson.version]));
};

export async function getChangedPackages({
  log,
  cwd,
  previousVersions,
}: FunctionsCommonOptions<{
  cwd: string;
  previousVersions: Map<string, string>;
}>) {
  const { packages } = await getPackages(cwd);
  log.debug(`Received: getChangedPackages ${previousVersions}`);

  const changedPackages = new Set<Package>();

  for (const pkg of packages) {
    const packageJsonVersion = pkg.packageJson.version;
    const packageJsonDir = pkg.dir;

    const previousVersion = previousVersions.get(packageJsonDir);
    log.debug(
      `Received: previousVersion:31 ${previousVersion} ${packageJsonDir} ${packageJsonVersion}`,
    );

    if (previousVersion !== packageJsonVersion) {
      changedPackages.add(pkg);
    }
  }

  return [...changedPackages];
}

export const getRootPackageJsonMetadata = async (
  cwd: string = process.cwd(),
): Promise<PackageJSON> => {
  const { root } = await getPackages(cwd);

  return root.packageJson;
};

export const getPackageMetadata = async (cwd: string) => {
  const getPackageMetadata = await fs.readJson(path.resolve(cwd, 'package.json'));

  return getPackageMetadata;
};

// TODO: pre releases feature will be added at a later date.
// interface PreInfo {
//   mode?: string;
//   tag?: string;
// }

// async function getPreInfo(repo: Repo): Promise<PreInfo> {
//   const preFilePath = path.join(repo.root.dir, '.changeset', 'pre.json');
//   if (!(await fs.pathExists(preFilePath))) {
//     return {};
//   }

//   const preFileContent = await fs.readJson(preFilePath);
//   return {
//     mode: preFileContent.mode,
//     tag: preFileContent.tag,
//   };
// }

export const updateRootPackageReleaseVersion = async ({
  cwd,
  type,
}: {
  cwd: string;
  type: 'minor' | 'patch';
}): Promise<void> => {
  // TODO: pre releases feature will be added at a later date.
  // const preInfo = await getPreInfo(repo);

  const { root } = await getPackages(cwd);
  const currentVersion = root.packageJson.version;

  let nextVersion: string | null = null;

  if (type === 'minor') {
    // if (preInfo.mode === 'pre') {
    //   if (semver.prerelease(currentVersion)) {
    //     nextVersion = semver.inc(currentVersion, 'pre', preInfo.tag);
    //   } else {
    //     nextVersion = semver.inc(currentVersion, 'preminor', preInfo.tag);
    //   }
    // } else if (preInfo.mode === 'exit') {
    //   nextVersion = semver.inc(currentVersion, 'patch');
    // } else {
    //   nextVersion = semver.inc(currentVersion, 'minor');
    // }
    nextVersion = semver.inc(currentVersion, 'minor');
  } else if (type === 'patch') {
    // if (preInfo.mode) {
    //   throw new Error(`Unexpected pre mode ${preInfo.mode} on current branch`);
    // }
    nextVersion = semver.inc(currentVersion, 'patch');
  }

  if (!nextVersion) {
    throw new Error('Failed to calculate next version');
  }

  await fs.writeJson(
    path.join(root.dir, 'package.json'),
    {
      ...root.packageJson,
      version: nextVersion,
    },
    { spaces: 2, encoding: 'utf8' },
  );
};
