import jwt from 'jsonwebtoken';
import { v1 } from 'uuid';

export const generateExampleJwtToken = () => {
  const payload = {
    clientIdentifier: `${v1()}-${v1()}`,
    attr1: '1',
  };

  const token = jwt.sign(payload, 'example-key');
  return token;
};
