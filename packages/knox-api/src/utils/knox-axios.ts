import axios from 'axios';
import { handleKnoxError } from '~/errors';

const defaultHeaders = {
  'content-type': 'application/json',
};

export const knoxDefaultAxios = ({ region, knoxAccessToken, customHeader }: { region: string; knoxAccessToken?: string; customHeader?: object }) => {
  const instance = axios.create({
    baseURL: `https://${region.toLowerCase()}-kcs-api.samsungknox.com`,
    headers: {
      ...(knoxAccessToken && {
        'X-KNOX-APITOKEN': knoxAccessToken,
      }),
      ...(customHeader ? customHeader : defaultHeaders),
    },
  });

  instance.interceptors.response.use((response) => response, handleKnoxError);

  return instance;
};
