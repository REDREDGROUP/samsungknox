import { BaseCredentialInputType } from '../types';
import { exportCredentialPrivateKey } from './export-private-key';
import { exportCredentialPublicDerKey } from './export-public-der-key';
import { generateJwtId } from './generate-jwt-id';
import { initCredential } from './init-credential';
import jwt from 'jsonwebtoken';

type GenerateSignedJwtType = BaseCredentialInputType & {
  tokenOrAccess: string;
  isClientIdentifier: boolean;
};

const jwtSignOptionsBase: jwt.SignOptions = {
  audience: 'KnoxWSM',
  expiresIn: '30m',
  algorithm: 'RS512',
};

export const generateSignedJWT = async ({
  credential: { key, path },
  isClientIdentifier,
  tokenOrAccess,
}: GenerateSignedJwtType): Promise<{ accessToken: string }> => {
  const credential = await initCredential({
    credential: {
      path: path,
      key: key,
    },
    clientIdentifierJwtToken: isClientIdentifier ? tokenOrAccess : undefined,
  });

  const { privateKey } = exportCredentialPrivateKey({ credential });
  const { publicKey } = exportCredentialPublicDerKey({ credential });

  const payload: {
    publicKey: string;
    clientIdentifier?: string;
    accessToken?: string;
  } = {
    publicKey: publicKey,
  };

  if (isClientIdentifier) {
    payload.clientIdentifier = tokenOrAccess;
  } else {
    payload.accessToken = tokenOrAccess;
  }

  const jwtSignOptions = { ...jwtSignOptionsBase, jwtid: generateJwtId() };

  const signJwtToken = jwt.sign(payload, privateKey, jwtSignOptions);

  return { accessToken: signJwtToken };
};
