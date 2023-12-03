import { BaseCredentialInputType } from './types';
import { exportCredentialPublicDerKey, generateSignedJWT, initCredential } from './utils';

type GenerateSignedClientIdentifierJwtType = BaseCredentialInputType & {
  clientIdentifierJwtToken: string;
};

type GenerateSignedAccessTokenJwtType = BaseCredentialInputType & {
  accessToken: string;
};

type GenerateBase64EncodedStringPublicKeyType = BaseCredentialInputType;

export const generateSignedClientIdentifierJWT = async (params: GenerateSignedClientIdentifierJwtType): Promise<{ accessToken: string }> =>
  generateSignedJWT({
    credential: {
      key: params.credential.key,
      path: params.credential.path,
    },
    tokenOrAccess: params.clientIdentifierJwtToken,
    isClientIdentifier: true,
  });

export const generateSignedAccessTokenJWT = async (params: GenerateSignedAccessTokenJwtType): Promise<{ accessToken: string }> =>
  generateSignedJWT({
    credential: {
      key: params.credential.key,
      path: params.credential.path,
    },
    tokenOrAccess: params.accessToken,
    isClientIdentifier: false,
  });

export const generateBase64EncodedStringPublicKey = async (params: GenerateBase64EncodedStringPublicKeyType): Promise<{ publicKey: string }> => {
  const { publicKey } = exportCredentialPublicDerKey({
    credential: await initCredential({
      credential: {
        key: params.credential.key,
        path: params.credential.path,
      },
    }),
  });

  return { publicKey };
};
