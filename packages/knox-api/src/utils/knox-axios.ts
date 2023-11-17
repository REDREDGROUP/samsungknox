import axios from 'axios';
import { handleKnoxError } from '~/errors';

const defaultHeaders = {
  'content-type': 'application/json',
};

export const knoxDefaultAxios = ({ region, knoxApiToken }: { region: string; knoxApiToken?: string }) => {
  const instance = axios.create({
    baseURL: `https://${region.toLowerCase()}-kcs-api.samsungknox.com`,
    headers: {
      ...(knoxApiToken && {
        'X-KNOX-APITOKEN': knoxApiToken,
      }),
      ...defaultHeaders,
    },
  });

  instance.interceptors.response.use((response) => response, handleKnoxError);

  return instance;
};
