import { EOL } from 'os';

import { Octokit } from '@octokit/rest';
import fs from 'fs-extra';

import { GIT_REPO_OPTIONS } from '../constraint';
import { getRootPackageJsonMetadata } from '../utils';

import { createLogger } from '@/common';

async function createGitTag(octokit: Octokit, commitSha: string, tagName: string): Promise<void> {
  const annotatedTag = await octokit.git.createTag({
    ...GIT_REPO_OPTIONS,
    tag: tagName,
    message: tagName,
    object: commitSha,
    type: 'commit',
  });

  try {
    await octokit.git.createRef({
      ...GIT_REPO_OPTIONS,
      ref: `refs/tags/${tagName}`,
      sha: annotatedTag.data.sha,
    });
  } catch (error) {
    if (error.status === 422 && error.response?.data?.message === 'Reference already exists') {
      throw new Error(`Tag ${tagName} already exists in repository`);
    }
    console.error(`Tag creation for ${tagName} failed`);
    throw error;
  }
}

async function main(): Promise<void> {
  const log = createLogger('debug');

  if (!process.env.GITHUB_SHA) {
    throw new Error('GITHUB_SHA is not set');
  }
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not set');
  }
  if (!process.env.GITHUB_OUTPUT) {
    throw new Error('GITHUB_OUTPUT environment variable not set');
  }

  const commitSha: string = process.env.GITHUB_SHA;
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const { version } = await getRootPackageJsonMetadata();
  const tagName = `v${version}`;

  log.debug(`tag_name=${tagName}${EOL}`);
  log.action(`Creating release tag ${tagName} at ${commitSha}`);

  await createGitTag(octokit, commitSha, tagName);

  log.info(`Successfully! release tag ${tagName} at ${commitSha}`);

  await fs.appendFile(process.env.GITHUB_OUTPUT, `tag_name=${tagName}${EOL}`);
  await fs.appendFile(process.env.GITHUB_OUTPUT, `version=${version}${EOL}`);
}

main().catch((error) => {
  console.error(error.stack);
  process.exit(1);
});
