import { exec } from '@actions/exec';
import type { Context } from '@actions/github/lib/context';
import { GitHub } from '@actions/github/lib/utils';
import { PreState } from '@changesets/types';
import fs from 'fs-extra';

import { FunctionsCommonOptions } from '../type';

import { execWithOutput } from './exec';

export const gitGenerateBotAuthenticationFile = async ({
  log,
  githubToken,
  homePath = process.env.HOME,
}: FunctionsCommonOptions<{
  githubToken: string;
  homePath?: string;
}>) => {
  log.action('setting GitHub credentials');

  await fs.writeFile(
    `${homePath}/.netrc`,
    `machine github.com\nlogin github-actions[bot]\npassword ${githubToken}`,
  );
};

export const gitSetupUser = async () => {
  await exec('git', ['config', 'user.name', `"github-actions[bot]"`]);
  await exec('git', ['config', 'user.email', `"github-actions[bot]@users.noreply.github.com"`]);
};

export const gitPullBranch = async (branch: string) => {
  await exec('git', ['pull', 'origin', branch]);
};

export const gitPushToOrigin = async (branch: string, { force }: { force?: boolean } = {}) => {
  await exec(
    'git',
    ['push', 'origin', `HEAD:${branch}`, force && '--force'].filter<string>(Boolean as any),
  );
};

export const gitSwitchToMaybeExistingBranch = async (branch: string) => {
  const { stderr } = await execWithOutput('git', ['checkout', branch], {
    ignoreReturnCode: true,
  });
  const isCreatingBranch = !stderr.toString().includes(`Switched to a new branch '${branch}'`);
  if (isCreatingBranch) {
    await exec('git', ['checkout', '-b', branch]);
  }
};

export const gitReset = async (pathSpec: string, mode: 'hard' | 'soft' | 'mixed' = 'hard') => {
  await exec('git', ['reset', `--${mode}`, pathSpec]);
};

export const gitCommitAll = async (message: string) => {
  await exec('git', ['add', '.']);
  await exec('git', ['commit', '-m', message]);
};

export const gitCheckIfClean = async (): Promise<boolean> => {
  const { stdout } = await execWithOutput('git', ['status', '--porcelain']);
  return !stdout.length;
};

export const createGitPullRequestTitle = ({
  log,
  pullRequestTitle,
  preState,
}: FunctionsCommonOptions<{
  pullRequestTitle: string;
  preState: PreState;
}>) => {
  const preStateSuffix = preState ? ` (${preState.tag})` : '';

  const prTitle = `${pullRequestTitle}${preStateSuffix}`;

  log.debug(`Received: prTitle ${prTitle}`);
  return prTitle;
};

export const createGitPullRequestCommitMessage = ({
  log,
  pullRequestTitle,
  preState,
}: FunctionsCommonOptions<{
  pullRequestTitle: string;
  preState: PreState;
}>) => {
  const preStateSuffix = preState ? ` (${preState.tag})` : '';

  const prTitle = `${pullRequestTitle}${preStateSuffix}`;

  log.debug(`Received: prTitle ${prTitle}`);
  return prTitle;
};

export const createGitPullRequest = async ({
  log,
  octokit,
  option,
}: FunctionsCommonOptions<{
  octokit: InstanceType<typeof GitHub>;
  option: {
    baseBranch: string; // main
    versionBranch: string; // changeset-release/main
    pullRequestTitle: string;
    pullRequestBody: string;
    githubRepo: Context['repo'];
  };
}>) => {
  log.debug(`Option Received: createGitPullRequest ${JSON.stringify(option)}`);
  const { baseBranch, versionBranch, pullRequestTitle, pullRequestBody, githubRepo } = option;

  log.action('Creating New pull request....');

  const {
    data: { number },
  } = await octokit.pulls.create({
    base: baseBranch,
    head: versionBranch,
    title: pullRequestTitle,
    body: pullRequestBody,
    ...githubRepo,
  });

  log.info('Successfully pull request Opened.');

  return {
    pullRequestNumber: number,
  };
};

export const updateGitPullRequest = async ({
  log,
  octokit,
  option,
}: FunctionsCommonOptions<{
  octokit: InstanceType<typeof GitHub>;
  option: {
    pullRequestNumber: number;
    pullRequestTitle: string;
    pullRequestBody: string;
    githubRepo: Context['repo'];
  };
}>) => {
  const { pullRequestBody, pullRequestNumber, pullRequestTitle, githubRepo } = option;
  log.debug(`Option Received: updateGitPullRequest ${JSON.stringify(option)}`);

  log.action('updating pull request....');

  await octokit.pulls.update({
    pull_number: pullRequestNumber,
    title: pullRequestTitle,
    body: pullRequestBody,
    ...githubRepo,
  });
  log.info('pull request found');

  return {
    pullRequestNumber,
  };
};
