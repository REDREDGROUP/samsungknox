import { v1 } from '@redredgroup/samsungknox-token-library';
import { requestAccessToken } from '~/apis';
import { GenerateKnoxApiTokenArgs } from './generate-knox-api-token.type';

export const generateKnoxApiToken = async ({ credential, clientIdentifierJwtToken, region }: GenerateKnoxApiTokenArgs): Promise<{ accessToken: string }> => {
  const data = await v1.generateSignedClientIdentifierJWT({
    credential: {
      key: credential.credentialKey,
      path: credential.credentialPath,
    },
    clientIdentifierJwtToken,
  });

  const { publicKey } = await v1.generateBase64EncodedStringPublicKey({
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

  const { accessToken } = await v1.generateSignedAccessTokenJWT({
    credential: {
      key: credential.credentialKey,
      path: credential.credentialPath,
    },
    accessToken: result.accessToken,
  });

  return { accessToken };
};
