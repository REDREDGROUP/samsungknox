import axios from 'axios';
import { handleKnoxError } from '~/errors';

const defaultHeaders = {
  'content-type': 'application/json',
};

export const knoxDefaultAxios = ({ region }: { region: string }) => {
  const instance = axios.create({
    baseURL: `https://${region.toLowerCase()}-kcs-api.samsungknox.com`,
    headers: {
      ...defaultHeaders,
    },
  });

  instance.interceptors.response.use((response) => response, handleKnoxError);

  return instance;
};
