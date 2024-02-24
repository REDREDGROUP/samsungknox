import { Logger } from '../common';

import { sortTheThings } from './utils';

type ChangelogEntries = {
  highestLevel: number;
  private: boolean;
  content: string;
}[];

type GitRepoOptions = {
  owner: string;
  repo: string;
};

export const MAIN_BRANCHES = ['main', 'origin/main', 'changeset-release/main'];

export const GIT_REPO_OPTIONS: GitRepoOptions = {
  owner: 'REDREDGROUP',
  repo: 'samsungknox',
};

export const createChangeLogTemplate = ({
  log,
  releaseVersion,
  changelogEntries,
}: {
  log: Logger;
  releaseVersion: string;
  changelogEntries: ChangelogEntries;
}) => {
  const logTemplate = `
  # Release v${releaseVersion}
  
  ${changelogEntries
    .filter((x) => x)
    .sort(sortTheThings)
    .map((x) => x.content)
    .join('\n')}
  `;

  log.debug(`Received: changeLog ${logTemplate}`);

  return logTemplate;
};

export const createChangeLogPullRequestDefaultBody = ({
  log,
  changelogPath,
}: {
  log: Logger;
  changelogPath: string;
}) => {
  const changeLogPullRequestDefaultBody = `See [${changelogPath}](https://github.com/REDREDGROUP/samsungknox/blob/main/${changelogPath}) for more information.`;

  log.debug(`Received: changeLogPullRequestDefaultBody ${changeLogPullRequestDefaultBody}`);

  return changeLogPullRequestDefaultBody;
};

export const createChangeLogDocsPath = ({
  log,
  releaseVersion,
}: {
  log: Logger;
  releaseVersion: string;
}) => {
  const LogDocsPath = `docs/releases/v${releaseVersion}-changelog.md`;

  log.debug(`Received: changeLogPath ${LogDocsPath}`);

  return LogDocsPath;
};
