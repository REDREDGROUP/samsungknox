export type AccessTokenArgs = {
  base64EncodedStringPublicKey: string;
  clientIdentifierJwt: string;
  validityForAccessTokenInMinutes: number;
};

export type AccessTokenResponse = {
  accessToken: string;
};
