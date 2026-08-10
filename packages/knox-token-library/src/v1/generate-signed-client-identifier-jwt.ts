import { BaseCredentialInputType } from '../types';
import { generateSignedJWT } from '../utils';

type GenerateSignedClientIdentifierJwtType = BaseCredentialInputType & {
  clientIdentifierJwtToken: string;
};

export const generateSignedClientIdentifierJWT = async (params: GenerateSignedClientIdentifierJwtType): Promise<{ accessToken: string }> =>
  generateSignedJWT({
    credential: {
      key: params.credential.key,
      path: params.credential.path,
    },
    tokenOrAccess: params.clientIdentifierJwtToken,
    isClientIdentifier: true,
  });
