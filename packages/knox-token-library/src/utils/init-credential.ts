import fs from 'fs';
import { CredentialType } from '../types';
import { isNil } from 'lodash-es';
import * as jwt from 'jsonwebtoken';
import { ERRORS } from '../common';

const validateJWT = (token: string) => {
  const decoded = jwt.decode(token);
  if (!decoded) {
    throw new TypeError(ERRORS.INVALID_JWT);
  }
};

const readCredential = (credential: { path?: string; key?: string }): CredentialType | null => {
  if (credential.path && credential.key) {
    throw new TypeError(ERRORS.BOTH_CREDENTIAL_DETECTED);
  }

  try {
    if (credential.path) {
      return JSON.parse(fs.readFileSync(credential.path, 'utf8'));
    }
    if (credential.key) {
      return JSON.parse(credential.key);
    }
  } catch (e) {
    throw new TypeError(ERRORS.CREDENTIAL_IS_NOT_JSON_TYPE);
  }

  return null;
};

export const initCredential = async ({
  credential,
  clientIdentifierJwtToken,
}: {
  credential: { path?: string; key?: string };
  clientIdentifierJwtToken?: string;
}): Promise<CredentialType> => {
  if (clientIdentifierJwtToken) {
    validateJWT(clientIdentifierJwtToken);
  }

  const credentialManifest = readCredential(credential);
  if (isNil(credentialManifest)) {
    throw new TypeError(ERRORS.CREDENTIAL_MISSING);
  }

  if (isNil(credentialManifest.Identifier)) {
    throw new TypeError(ERRORS.IDENTIFIER_MISSING);
  }

  if (isNil(credentialManifest.Private)) {
    throw new TypeError(ERRORS.PRIVATE_MISSING);
  }

  if (isNil(credentialManifest.Public)) {
    throw new TypeError(ERRORS.PUBLIC_MISSING);
  }

  return credentialManifest;
};
