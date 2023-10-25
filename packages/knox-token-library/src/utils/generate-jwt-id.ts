import { v1 } from 'uuid';

export const generateJwtId = () => {
  const generateJwtId = v1() + v1();
  return generateJwtId;
};
