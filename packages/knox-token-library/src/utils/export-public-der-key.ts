import NodeRSA from 'node-rsa';
import Forge from 'node-forge';
import { CredentialType } from '../types';

export const exportCredentialPublicDerKey = ({ credential }: { credential: CredentialType }) => {
  const rsaPublicKey = new NodeRSA(credential.Public, 'pkcs8-public-pem');

  const exportpublicKey = rsaPublicKey.exportKey('pkcs8-public-pem');

  const forgePublicKey = Forge.pki.publicKeyFromPem(exportpublicKey);
  
  const derBuffer = Forge.asn1.toDer(Forge.pki.publicKeyToAsn1(forgePublicKey));

  const publicKey = Forge.util.encode64(derBuffer.getBytes());

  return { publicKey };
};
