import { BaseCredentialInputType } from '../types';
import { exportCredentialPublicDerKey, initCredential } from '../utils';

type GenerateBase64EncodedStringPublicKeyType = BaseCredentialInputType;

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
