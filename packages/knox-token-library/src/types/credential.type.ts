export type CredentialType = {
  Private: string;
  Public: string;
  Identifier: string;
};

export type BaseCredentialInputType = {
  credential: {
    path?: string;
    key?: string;
  };
};
