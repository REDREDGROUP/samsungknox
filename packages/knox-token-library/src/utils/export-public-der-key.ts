import NodeRSA from 'node-rsa';
import { CredentialType } from '../types';

export const exportCredentialPublicDerKey = ({ credential }: { credential: CredentialType }) => {
  const rsaPublicKey = new NodeRSA(credential.Public, 'pkcs8-public-pem');
  const exportpublicKey = rsaPublicKey.exportKey('pkcs8-public-pem');
  const publicKey = Buffer.from(exportpublicKey).toString('base64');

  return { publicKey };
};
