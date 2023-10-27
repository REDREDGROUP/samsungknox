import NodeRSA from 'node-rsa';
import fs from 'fs';
import path from 'path';
import { v1 } from 'uuid';

export const generateExampleKey = () => {
  const generatedKey = new NodeRSA({ b: 2048 });

  const generatedPrivateKey = generatedKey.exportKey('pkcs8-private-pem');
  const generatedPublicKey = generatedKey.exportKey('pkcs8-public-pem');

  const rsaPrivateKey = new NodeRSA(generatedPrivateKey, 'pkcs8-private-pem');
  const exportedPrivateKey = rsaPrivateKey.exportKey('pkcs8-private-pem');

  const rsaPublicKey = new NodeRSA(generatedPublicKey, 'pkcs8-public-pem');
  const exportedPublicKey = rsaPublicKey.exportKey('pkcs8-public-pem');

  const exampleCredential = JSON.stringify({
    Private: exportedPrivateKey.replace(/-----[^\n]+-----/g, '').trim(),
    Public: exportedPublicKey.replace(/-----[^\n]+-----/g, '').trim(),
    Identifier: 'bb62a066-7467-11ee-b962-0242ac120002',
  });

  fs.writeFileSync(path.join(process.cwd(), 'example-credential.json'), exampleCredential);

  return JSON.stringify({
    Private: exportedPrivateKey.replace(/-----[^\n]+-----/g, '').trim(),
    Public: exportedPublicKey.replace(/-----[^\n]+-----/g, '').trim(),
    Identifier: v1(),
  });
};
