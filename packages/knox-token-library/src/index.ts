import { exportCredentialPrivateKey, exportCredentialPublicDerKey, generateJwtId, initCredential } from './utils';
import jwt from 'jsonwebtoken';

const jwtSignOptionsBase: jwt.SignOptions = {
  audience: 'KnoxWSM',
  expiresIn: '30m',
  algorithm: 'RS512',
};

const generateSignedJWT = async (credentialPath: string, tokenOrAccess: string, isClientIdentifier: boolean): Promise<{ accessToken: string }> => {
  const credential = await initCredential({
    credentialPath,
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

export const generateSignedClientIdentifierJWT = async (params: {
  credentialPath: string;
  clientIdentifierJwtToken: string;
}): Promise<{ accessToken: string }> => generateSignedJWT(params.credentialPath, params.clientIdentifierJwtToken, true);

export const generateSignedAccessTokenJWT = async (params: { credentialPath: string; accessToken: string }): Promise<{ accessToken: string }> =>
  generateSignedJWT(params.credentialPath, params.accessToken, false);

export const generateBase64EncodedStringPublicKey = async ({ credentialPath }: { credentialPath: string }): Promise<{ publicKey: string }> => {
  const { publicKey } = exportCredentialPublicDerKey({
    credential: await initCredential({ credentialPath }),
  });

  return { publicKey };
};
