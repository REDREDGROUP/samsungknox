---
sidebar_position: 1
title: Request AccessToken
---

# Request Knox Cloud Authentication AccessToken

:::warning Legacy API
The examples on this page use the legacy contract. They are not v2 fallbacks.
Operations without a v2 equivalent remain legacy-only. See the [Configure v2
migration guide](/docs/knox-api/migration-v2).
:::

:::note
This token is not X-KNOX-APITOKEN. The Access Token after signing the corresponding Access Token from generateSignedAccessTokenJWT is X-KNOX-APITOKEN
:::

<!-- https://docs.samsungknox.com/dev/knox-cloud-authentication/api-reference/api/#tag/Authentication/operation/createApiAccessToken -->

Request an authentication token from **Knox Cloud Authentication.**

```ts
import { requestAccessToken } from '@redredgroup/samsungknox-api';

const { result } = await requestAccessToken({
  base64EncodedStringPublicKey: 'YOUR PUBLIC KEY',
  clientIdentifierJwt: 'YOUR_JWT_TOKEN',
  region: 'YOUR_KNOX_REGION',
  validityForAccessTokenInMinutes: 30,
});

console.log(result.accessToken);
```

Input parameters:

- base64EncodedStringPublicKey: Insert Public Key in credential.json
- validityForAccessTokenInMinutes: Determines how much tokens you want to retain. Up to 30 minutes (optional)
- region: Insert your Knox Region. Most are the EU. (Case-insensitive)
- clientIdentifierJwt: Your Client Identifier JWT Token

Output: generateSignedAccessTokenJWT issues an AccessToken that can be authenticated.
