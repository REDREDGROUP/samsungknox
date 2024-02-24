import { MAIN_BRANCHES } from '../constraint';

export const isMainBranch = (branchName: string) => {
  const isMainBranch = MAIN_BRANCHES.includes(branchName);

  return isMainBranch;
};
