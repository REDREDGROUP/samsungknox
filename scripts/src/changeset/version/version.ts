import path from 'path';

import { exec } from '@actions/exec';
import * as github from '@actions/github';
import fs from 'fs-extra';
import * as semver from 'semver';

import {
  createChangeLogPullRequestDefaultBody,
  createChangeLogDocsPath,
  createChangeLogTemplate,
} from '../constraint';
import { FunctionsCommonOptions } from '../type';
import {
  getChangesetState,
  getChangedPackages,
  getVersionsByDirectory,
  requireChangesetsCliPkgJson,
  execChangesetCommand,
  getPackageMetadata,
  gitSwitchToMaybeExistingBranch,
  gitCheckIfClean,
  gitReset,
  gitCommitAll,
  gitPushToOrigin,
  formatChangeLogFile,
  createGitPullRequestTitle,
  createGitPullRequest,
  updateGitPullRequest,
  getChangelogEntry,
  updateRootPackageReleaseVersion,
  isMainBranch,
} from '../utils';

type VersionOptions = {
  script?: string;
  githubToken: string;
  cwd?: string;
  prTitle?: string;
  commitMessage?: string;
};

type RunVersionResult = {
  pullRequestNumber: number;
};

export async function runVersion({
  log,
  script,
  githubToken,
  cwd = process.cwd(),
  prTitle = 'Version Packages',
  commitMessage = 'Version Packages',
}: FunctionsCommonOptions<VersionOptions>): Promise<RunVersionResult> {
  const repo = `${github.context.repo.owner}/${github.context.repo.repo}`;
  const branch = github.context.ref.replace('refs/heads/', '');

  const versionBranch = `changeset-release/${branch}`;

  const octokit = github.getOctokit(githubToken);
  const { preState } = await getChangesetState({ log, cwd });

  await gitSwitchToMaybeExistingBranch(versionBranch);
  await gitReset(github.context.sha);

  const versionsByDirectory = await getVersionsByDirectory(cwd);

  const branchName = isMainBranch(branch);
  await updateRootPackageReleaseVersion({ cwd, type: branchName ? 'minor' : 'patch' });

  if (script) {
    const [versionCommand, ...versionArgs] = script.split(/\s+/);
    await exec(versionCommand, versionArgs, { cwd });
  } else {
    const changesetsCliPkgJson = requireChangesetsCliPkgJson(cwd);

    const changesetCommand = semver.lt(changesetsCliPkgJson.version, '2.0.0') ? 'bump' : 'version';

    await execChangesetCommand({ log, cwd, command: changesetCommand });
  }

  const searchQuery = `repo:${repo}+state:open+head:${versionBranch}+base:${branch}`;

  const searchResult = await octokit.search.issuesAndPullRequests({
    q: searchQuery,
  });

  const changedPackages = await getChangedPackages({
    log,
    cwd,
    previousVersions: versionsByDirectory,
  });

  const { version: releaseVersion } = await getPackageMetadata(cwd);

  const changelogEntries = await Promise.all(
    changedPackages.map(async (pkg) => {
      const changelogContents = await fs.readFile(path.join(pkg.dir, 'CHANGELOG.md'), 'utf8');

      const entry = getChangelogEntry(changelogContents, pkg.packageJson.version);
      return {
        highestLevel: entry.highestLevel,
        private: !!pkg.packageJson.private,
        content: `## ${pkg.packageJson.name}@${pkg.packageJson.version}\n\n` + entry.content,
      };
    }),
  );

  const changeLog = createChangeLogTemplate({ log, releaseVersion, changelogEntries });
  const changelogPath = createChangeLogDocsPath({ log, releaseVersion });
  const pullRequestBody = createChangeLogPullRequestDefaultBody({ log, changelogPath });
  const pullRequestTitle = createGitPullRequestTitle({ log, pullRequestTitle: prTitle, preState });

  const formattedChangeLog = await formatChangeLogFile({ log, cwd, changeLog });

  await fs.writeFile(changelogPath, formattedChangeLog);

  const isGitCheckoutClean = await gitCheckIfClean();

  if (!isGitCheckoutClean) {
    const finalCommitMessage = `${commitMessage}${!!preState ? ` (${preState.tag})` : ''}`;
    await gitCommitAll(finalCommitMessage);
  }

  await gitPushToOrigin(versionBranch, { force: true });

  // Empty Version PR Exists
  if (searchResult.data.items.length === 0) {
    const pullRequest = await createGitPullRequest({
      log,
      octokit,
      option: {
        baseBranch: branch,
        versionBranch,
        pullRequestTitle,
        pullRequestBody,
        githubRepo: github.context.repo,
      },
    });

    return pullRequest;
  }

  // Already PR Exists
  if (searchResult.data.items.length) {
    const pullRequest = updateGitPullRequest({
      log,
      octokit,
      option: {
        pullRequestNumber: searchResult.data.items[0].number,
        pullRequestTitle,
        pullRequestBody,
        githubRepo: github.context.repo,
      },
    });

    return pullRequest;
  }
}
