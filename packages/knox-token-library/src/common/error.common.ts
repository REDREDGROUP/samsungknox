export const ERRORS = {
  INVALID_JWT: 'clientIdentifierJwtToken is not a json web token type. check your clientIdentifierJwtToken',
  BOTH_CREDENTIAL_DETECTED: 'credentials exceeded one. You must specify either key or path.',
  CREDENTIAL_MISSING: 'credential is missing. Please check the credential file or path,',
  CREDENTIAL_IS_NOT_JSON_TYPE: 'credential is not json type. Please check the credential file or path,',
  IDENTIFIER_MISSING: 'credential -> identifier is missing. Please check the credential file or path.',
  PRIVATE_MISSING: 'credential -> Private is missing. Please check the credential file or path.',
  PUBLIC_MISSING: 'credential -> Public is missing. Please check the credential file or path.',
};
