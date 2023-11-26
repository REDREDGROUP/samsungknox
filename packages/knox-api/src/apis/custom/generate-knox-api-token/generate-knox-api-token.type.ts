export type GenerateKnoxApiTokenArgs = {
  credential: CredentialOptions;
  clientIdentifierJwtToken: string;
  region: string;
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
