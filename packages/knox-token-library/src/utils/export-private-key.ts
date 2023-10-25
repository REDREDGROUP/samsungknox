import NodeRSA from 'node-rsa';
import { CredentialType } from '../types';

export const exportCredentialPrivateKey = ({ credential }: { credential: CredentialType }) => {
  const rsaPrivateKey = new NodeRSA(credential.Private, 'pkcs8-private-pem');
  const privateKey = rsaPrivateKey.exportKey('pkcs8-private-pem');

  return { privateKey };
};
