import { AxiosError } from 'axios';
import { BaseKnoxErrorResponse } from '~/types';
import { KnoxRequestError } from './base-knox.error';

export const ERROR_MESSAGES = {
  KNOX_ACCESS_TOKEN_MISSING: 'For the Class type, an X-KNOX-APITOKEN must be injected into the instance.',
  KNOX_REGION_MISSING: 'For the Class type, an region must be injected into the instance.',
};

// export const ERROR_MAP: Record<number | string, string> = {
//   // Standard HTTP error codes (subset)
//   401: 'Unauthorized',
//   403: 'Forbidden',
//   404: 'Not Found',
//   500: 'Server Error',

//   // Knox Configure error codes
//   40000000: 'RESOURCE_INVALID_PARAM',
//   40000017: 'PROFILE_ID_MISSING',
//   4012250: 'ACCESS_TOKEN_BAD_REQUEST',
//   40300000: 'AUTHORIZATION_FAIL',
//   40400000: 'RESOURCE_NOT_FOUND',
//   40400005: 'DEVICES_NOT_FOUND',
//   40400007: 'LICENSE_NOT_FOUND',
//   50000000: 'INTERNAL_SERVER_ERROR',

//   // Knox Cloud authentication API for customers
//   4000000: 'RESOURCE_INVALID_PARAM',
//   4002250: 'API_KEY_NON_UNIQUE_JWTID',
//   4002251: 'ACCESS_TOKEN_TIMEOUT_VALIDITY_RESOURCE_INVALID_PARAM',
//   4010011: 'IDP_AUTHORIZATION_FAIL',
//   40122050: 'ACCESS_TOKEN_BAD_REQUEST',
//   4032251: 'ACCESS_TOKEN_EXPIRED',
//   4032252: 'ACCESS_TOKEN_INVALID',
//   4042251: 'API_KEY_RESTRICTION_NOT_FOUND',
//   4042252: 'API_KEY_RESTRICTION_INVALID',

//   // Knox Error codes for HTTP 400
//   AUT_1001:
//     'The value of the client_id parameter was not present or had an empty value. Ensure your request body includes a valid client_id parameter and retry your request.',
//   AUT_1002:
//     'The value of the client_secret parameter was not present or had an empty value. Ensure your request body includes a valid client_secret parameter and retry your request.',
//   AUT_1006:
//     'The value of the code parameter was not present or had an empty value. Ensure your request body includes a valid code parameter and retry your request.',
//   AUT_1008:
//     'The value of grant_type parameter was not present or had an empty value. Ensure your request body includes a valid grant_type parameter and retry your request.',
//   AUT_1010:
//     "The length of the client_id parameter is invalid. Double check that you've included your full client_id in your request body and retry your request.",
//   AUT_1011:
//     "The length of the client_secret parameter is invalid. Double check that you've included your full client_secret in your request body and retry your request.",
//   AUT_1015:
//     "The length of the code parameter is invalid. Double check that you've included your full authorization code in your request body and retry your request.",
//   AUT_1017:
//     "The length of the grant_type parameter is invalid. Double check that you've included your full grant_type in your request body and retry your request.",
//   AUT_1022:
//     'The pattern of the redirect_uri parameter is invalid. Ensure your redirect_uri is registered with Samsung Account and exhibits proper URL encoding, then retry your request.',
//   AUT_1024:
//     "The pattern of the client_id parameter is invalid. Double check that you've included your full client_id in your request body and retry your request.",
//   AUT_1045:
//     "The length of a redirect_uri parameter is invalid. Double check that you've included your, full Samsung Account-registered and URL-encoded redirect_uri in the request body, then retry your request.",
//   AUT_1702:
//     "The value of the client_secret parameter is incorrect. Ensure you've included your full Samsung Account client_secret in your request body, then retry your request.",
//   AUT_1785:
//     "Unauthenticated client_id can't be issued access_token. Ensure the value of your Samsung Account client_id in the request body does not include any errors. If your client_id looks correct, but you still receive this error, clientIdentifierJwt contact Knox Support.",
//   AUT_1802:
//     'The value of the code parameter is incorrect. Ensure the value of the authorization code in the request body does not include any errors. If your code looks correct, but you still receive this error, please contact Knox Support.',
//   AUT_1806:
//     "The value of the client_id parameter for code and access_token does not match. Ensure that you're sending the same Samsung Account client id used to call signInGate in the token request body.",

//   // Samsung Account authorizeToken API
//   LIC_4101: 'Invalid request header or authToken.',
//   LIC_4102: 'The authToken value was not found.',
//   LIC_4103: 'x-osp-appId was not equal to the client_id of authToken.',
//   LIC_5101: 'Unknown or internal error.',
// };

export const handleKnoxError = async (error: AxiosError<BaseKnoxErrorResponse>) => {
  if (!error.response || !error.response.data) {
    throw new KnoxRequestError(
      0,
      `
    Check the Internet or check the region. Case-insensitive (e.g. EU or US). 
    If there seems to be another problem, please report the issue rule to us:

    https://github.com/REDREDGROUP/samsungknox/issues
    `,
    );
  }

  const { code, message, data } = error.response.data;

  throw new KnoxRequestError(code, message, data);
};
