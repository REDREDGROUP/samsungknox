import { exec } from '@actions/exec';
import { readPreState } from '@changesets/pre';
import readChangesets from '@changesets/read';
import type { PreState, NewChangeset } from '@changesets/types';
import mdastToString from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import resolveFrom from 'resolve-from';
import unified from 'unified';

import { FunctionsCommonOptions } from '../type';

export type ChangesetState = {
  preState: PreState | undefined;
  changesets: NewChangeset[];
};

export const getChangesetState = async ({
  log,
  cwd = process.cwd(),
}: FunctionsCommonOptions<{
  cwd?: string;
}>): Promise<ChangesetState> => {
  const preState = await readPreState(cwd);
  const isInPreMode = preState !== undefined && preState.mode === 'pre';

  log.debug(`Received: isInPreMode ${isInPreMode}`);

  let changesets = await readChangesets(cwd);

  if (isInPreMode) {
    const changesetsToFilter = new Set(preState.changesets);
    changesets = changesets.filter((x) => !changesetsToFilter.has(x.id));
  }

  return {
    preState: isInPreMode ? preState : undefined,
    changesets,
  };
};

export const requireChangesetsCliPkgJson = (cwd: string) => {
  try {
    return require(resolveFrom(cwd, '@changesets/cli/package.json'));
  } catch (err) {
    if (err && err.code === 'MODULE_NOT_FOUND') {
      throw new Error(`Have you forgotten to install \`@changesets/cli\` in "${cwd}"?`);
    }
    throw err;
  }
};

export const execChangesetCommand = async ({
  log,
  cwd,
  command,
}: FunctionsCommonOptions<{ cwd: string; command: string }>) => {
  log.action(
    `Received: execChangesetCommand ${resolveFrom(cwd, '@changesets/cli/bin.js')} ${command}`,
  );

  await exec('node', [resolveFrom(cwd, '@changesets/cli/bin.js'), command], {
    cwd,
  });
};

export const formatChangeLogFile = async ({
  log,
  cwd,
  changeLog,
}: FunctionsCommonOptions<{
  cwd: string;
  changeLog: string;
}>) => {
  try {
    const prettier = require(resolveFrom(cwd, 'prettier'));
    const prettierConfig = await prettier.resolveConfig(cwd);
    const formattedChangeLog = await prettier.format(changeLog, {
      ...prettierConfig,
      parser: 'markdown',
    });

    log.debug(`Received: formattedChangeLog ${formattedChangeLog}`);

    return formattedChangeLog;
  } catch (error) {}
};

export const BumpLevels = {
  dep: 0,
  patch: 1,
  minor: 2,
  major: 3,
} as const;

export function getChangelogEntry(changelog: string, version: string) {
  const ast = unified().use(remarkParse).parse(changelog);

  let highestLevel: number = BumpLevels.dep;

  //@ts-ignore
  const nodes = ast.children as Array<any>;
  let headingStartInfo:
    | {
        index: number;
        depth: number;
      }
    | undefined;
  let endIndex: number | undefined;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === 'heading') {
      const stringified: string = mdastToString(node);
      const match = stringified.toLowerCase().match(/(major|minor|patch)/);
      if (match !== null) {
        const level = BumpLevels[match[0] as 'major' | 'minor' | 'patch'];
        highestLevel = Math.max(level, highestLevel);
      }
      if (headingStartInfo === undefined && stringified === version) {
        headingStartInfo = {
          index: i,
          depth: node.depth,
        };
        continue;
      }
      if (
        endIndex === undefined &&
        headingStartInfo !== undefined &&
        headingStartInfo.depth === node.depth
      ) {
        endIndex = i;
        break;
      }
    }
  }
  if (headingStartInfo) {
    //@ts-ignore
    ast.children = (ast.children as any).slice(headingStartInfo.index + 1, endIndex);
  }
  return {
    content: unified().use(remarkStringify).stringify(ast),
    highestLevel: highestLevel,
  };
}

export function sortTheThings(
  a: { private: boolean; highestLevel: number },
  b: { private: boolean; highestLevel: number },
) {
  if (a.private === b.private) {
    return b.highestLevel - a.highestLevel;
  }
  if (a.private) {
    return 1;
  }
  return -1;
}
