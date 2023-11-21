import {
  generateBase64EncodedStringPublicKey,
  generateSignedAccessTokenJWT,
  generateSignedClientIdentifierJWT,
} from '@redredgroup/samsungknox-token-library';
import { requestAccessToken } from '~/apis';
import { GenerateKnoxApiTokenArgs } from './generate-knox-api-token.type';

export const generateKnoxApiToken = async ({
  credential,
  clientIdentifierJwtToken,
  region,
}: GenerateKnoxApiTokenArgs): Promise<{ accessToken: string }> => {
  const data = await generateSignedClientIdentifierJWT({
    credential: {
      key: credential.credentialKey,
      path: credential.credentialPath,
    },
    clientIdentifierJwtToken,
  });

  const { publicKey } = await generateBase64EncodedStringPublicKey({
    credential: {
      key: credential.credentialKey,
      path: credential.credentialPath,
    },
  });

  const { result } = await requestAccessToken({
    region,
    base64EncodedStringPublicKey: publicKey,
    clientIdentifierJwt: data.accessToken,
    validityForAccessTokenInMinutes: 10,
  });

  const { accessToken } = await generateSignedAccessTokenJWT({
    credential: {
      key: credential.credentialKey,
      path: credential.credentialPath,
    },
    accessToken: result.accessToken,
  });

  return { accessToken };
};
