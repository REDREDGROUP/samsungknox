import * as core from '@actions/core';

import { gitGenerateBotAuthenticationFile, getChangesetState, gitSetupUser } from './utils';
import { runVersion } from './version';

import { LogLevel, createLogger } from '@/common';

const getOptionalInput = (name: string) => core.getInput(name) || undefined;

(async () => {
  const logLevel = core.getInput('log-level');
  const log = createLogger(logLevel as LogLevel);

  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    core.setFailed('Please add the GITHUB_TOKEN to the changesets action');
    return;
  }

  const inputCwd = core.getInput('cwd');
  if (inputCwd) {
    log.action('changing directory to the one given as the input');
    process.chdir(inputCwd);
  }

  const setupGitUser = core.getBooleanInput('setupGitUser');

  if (setupGitUser) {
    log.action('setting git user');
    await gitSetupUser();
  }

  await gitGenerateBotAuthenticationFile({ log, githubToken });

  const { changesets } = await getChangesetState({ log });

  const hasChangesets = changesets.length !== 0;

  if (!hasChangesets) {
    log.info('No changesets found');
    return;
  }

  if (hasChangesets) {
    const { pullRequestNumber } = await runVersion({
      log,
      script: getOptionalInput('version'),
      githubToken,
      prTitle: getOptionalInput('title'),
      commitMessage: getOptionalInput('commit'),
    });

    core.setOutput('pullRequestNumber', String(pullRequestNumber));

    return;
  }
})().catch((err) => {
  console.error(err);
  core.setFailed(err.message);
});
