export type GenerateKnoxApiTokenArgs = {
  credential: CredentialOptions;
  clientIdentifierJwtToken: string;
};

type CredentialOptions =
  | {
      credentialKey: string;
      credentialPath?: never;
    }
  | {
      credentialKey?: never;
      credentialPath: string;
    };
