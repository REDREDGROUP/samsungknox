# SamsungKnox API

[![npm version](https://badge.fury.io/js/@redredgroup%2Fsamsungknox-api.svg)](https://www.npmjs.com/package/@redredgroup/samsungknox-api)

# Intended Use

This library provides utility methods to generate and sign Knox Tokens using server side Javascript. The pre-requisites for using this utility are

- You have downloaded the Knox Credential file (credential.json)
- You have generated a Client Identifier (api-key) for accessing apis of Knox Cloud Services. (Use this package: [@redredgroup/samsungknox-token-library](https://www.npmjs.com/package/@redredgroup/samsungknox-token-library))

The keys below must have Cloud API privileges on Samsung Knox. If you do not have permission, you can request permission by disconnecting the Ticket from the Samsung Knox Admin Portal.

Read: https://docs.samsungknox.com/dev/knox-cloud-authentication/tutorial/tutorial-for-customers-generate-access-token/

### Installing

using NPM

```
npm install @redredgroup/samsungknox-api
```

using Yarn

```
yarn install @redredgroup/samsungknox-api
```

using PNPM

```
pnpm install @redredgroup/samsungknox-api
```

### Request Knox Cloud Authentication AccessToken

Request an authentication token from **Knox Cloud Authentication.**

```
import { requestAccessToken } from '@redredgroup/samsungknox-api';

  const { result } = await requestAccessToken({
    base64EncodedStringPublicKey: 'YOUR PUBLIC KEY',
    clientIdentifierJwt: 'YOUR_JWT_TOKEN',
    region: 'YOUR_KNOX_REGION',
    validityForAccessTokenInMinutes: 30,
  })

  console.log(result.accessToken)
```

Input parameters:

- base64EncodedStringPublicKey: Insert Public Key in credential.json
- validityForAccessTokenInMinutes: Determines how much tokens you want to retain. Up to 30 minutes (optional)
- region: Insert your Knox Region. Most are the EU. (Case-insensitive)
- clientIdentifierJwt: Your Client Identifier JWT Token

Output: generateSignedAccessTokenJWT issues an AccessToken that can be authenticated.

**_Note: This token is not X-KNOX-APITOKEN. The Access Token after signing the corresponding Access Token from generateSignedAccessTokenJWT is X-KNOX-APITOKEN._**

### Get Knox Configure Profiles

To get the **profiles of KnoxConfigure**, use the following methods.

```
import { getKnoxConfigureProfiles } from '@redredgroup/samsungknox-api';

const getProfiles =  await getKnoxConfigureProfiles({
  args: {}, // <- get KnoxConfigureProfiles Params
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(getProfiles)
```

Input parameters:

- args: Insert params for the profile (optional) See this document for more params. : https://docs.samsungknox.com/dev/knox-configure/api/#tag/Profile-APIs/operation/getProfilesUsingGET
- region: Insert your Knox Region. Most are the EU. (Case-insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**

Output:

- Profiles registered with KnoxConfigure respond in Array format.

## API Support

APIs that continue to be supported are being added and please refer to the corresponding README as soon as they are updated! :)

## Copyright

© 2023 REDREDGROUP Web Service. All Right Reserved.

**REDREDGROUP is Notify that it is not related to the SamsungKnox service.**

## License

Apache
