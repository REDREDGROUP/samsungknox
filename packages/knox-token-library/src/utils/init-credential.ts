import fs from 'fs';
import { CredentialType } from '../types';
import { isNil } from 'lodash-es';
import * as jwt from 'jsonwebtoken';

export const initCredential = async ({
  credentialPath,
  clientIdentifierJwtToken,
}: {
  credentialPath: string;
  clientIdentifierJwtToken?: string;
}): Promise<CredentialType> => {
  if (clientIdentifierJwtToken) {
    const decoded = jwt.decode(clientIdentifierJwtToken);
    if (!decoded) {
      throw new TypeError('clientIdentifierJwtToken is not a json web token type. check your clientIdentifierJwtToken');
    }
  }

  const credential: CredentialType = JSON.parse(fs.readFileSync(credentialPath, 'utf8'));

  if (isNil(credential?.Identifier)) {
    throw new TypeError('credential -> identifier is missing. Please check the credential file.');
  }

  if (isNil(credential?.Private)) {
    throw new TypeError('credential -> Private is missing. Please check the credential file.');
  }

  if (isNil(credential?.Public)) {
    throw new TypeError('credential -> Public is missing. Please check the credential file.');
  }

  return credential;
};
