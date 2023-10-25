# SamsungKnox Token Library
[![npm version](https://badge.fury.io/js/@redredgroup/samsungknox-token-library.svg)](https://www.npmjs.com/package/@redredgroup/samsungknox-token-library)

referenced the package : [knox-token-library-js](https://www.npmjs.com/package/knox-token-library-js)

This library provides utility methods to generate and sign Knox Tokens using server side Javascript. The pre-requisites for using this utility are

- You have downloaded the Knox Credential file (credential.json)
- You have generated a Client Identifier (api-key) for accessing apis of Knox Cloud Services.

The keys below must have Cloud API privileges on Samsung Knox. If you do not have permission, you can request permission by disconnecting the Ticket from the Samsung Knox Admin Portal.

Read: https://docs.samsungknox.com/dev/knox-cloud-authentication/tutorial/tutorial-for-customers-generate-access-token/

# Intended Use

The workflow for making api calls to Knox Cloud Services is divided into a portal workflow, and a programmatic workflow.

Check out the official Samsung Knox documentation below for more information. </br>
https://docs.samsungknox.com/dev/knox-cloud-authentication

### Portal flow

1.  Download credential from Knox Api Portal
2.  Generate and Download ClientIdentifier (api-key) for a specific Knox Solution

### Programmatic flow

3. Call Knox api to generate an Api Access Token. This api call requires a **signed ClientIdentifier**, and specific contents of your credential (Public Key).
4. Call Knox api for your intended workflow (eg: upload device, configure device etc). This api call requires your **signed Api Access Token**, and specific contents of your credential (Public Key).

This utility js library helps generate signed clientIdentifiers, and signed accessTokens.

### Installing

using NPM

```
npm install @redredgroup/samsungknox-token-library
```

using Yarn

```
yarn install @redredgroup/samsungknox-token-library
```

using PNPM

```
pnpm install @redredgroup/samsungknox-token-library
```

### Generate Signed ClientIdentifier

The following method is provided to generate a **signed client identifier**.

```
import knoxTokenLibrary from '@redredgroup/samsungknox-token-library'

const { accessToken } = await knoxTokenLibrary.generateSignedClientIdentifierJWT({
  credentialPath: "credential.json",
  clientIdentifierJwtToken: "my-client-identifier"
});

console.log(accessToken)
```

Input parameters:

- credential: An input stream of the Knox credential (credential.json) that was downloaded from Knox Api portal.
- clientIdentifier: The string ClientIdentifier downloaded from Knox Api portal.

Output:

- A String representing the ClientIdentifier signed with the primary key from the downloaded credential.

### Generate Signed Api Access Token

KnoxTokenUtility class provides the following method to generate a **signed api access token**.

```
import knoxTokenLibrary from '@redredgroup/samsungknox-token-library'

const { accessToken } = await knoxTokenLibrary.generateSignedAccessTokenJWT({
  credentialPath: "credential.json",
  accessToken: "my-access-token"
});

console.log(accessToken)
```

Input parameters:

- credential: An input stream of the Knox credential (credential.json) that was downloaded from Knox Api portal.
- accessToken: The string api AccessToken returned by calling Knox Cloud Services' generateAccessToken api.

Output:

- A String representing the AccessToken signed with the primary key from the downloaded credential.

### Generate Base64 Encoded String PublicKey

KnoxTokenUtility class provides the following method to generate a **signed api access token**.

```
import knoxTokenLibrary from '@redredgroup/samsungknox-token-library'

const { publicKey } = await knoxTokenLibrary.generateBase64EncodedStringPublicKey({
  credentialPath: "credential.json",
});

console.log(publicKey)
```

Input parameters:

- credentialPath: An input stream of the Knox credential (credential.json) that was downloaded from Knox Api portal.

Output:

- The public key encoded in Base 64 is outputted as a String.

## Copyright

© 2023 REDREDGROUP Web Service. All Right Reserved.

**REDREDGROUP has only changed the design of SamsungKnox [knox-token-library-js](https://www.npmjs.com/package/knox-token-library-js) package. Notify that it is not related to the SamsungKnox service.**

## License

Apache
