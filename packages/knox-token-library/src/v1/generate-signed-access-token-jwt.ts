import { BaseCredentialInputType } from '../types';
import { generateSignedJWT } from '../utils';

type GenerateSignedAccessTokenJwtType = BaseCredentialInputType & {
  accessToken: string;
};

export const generateSignedAccessTokenJWT = async (params: GenerateSignedAccessTokenJwtType): Promise<{ accessToken: string }> =>
  generateSignedJWT({
    credential: {
      key: params.credential.key,
      path: params.credential.path,
    },
    tokenOrAccess: params.accessToken,
    isClientIdentifier: false,
  });
