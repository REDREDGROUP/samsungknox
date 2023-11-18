---
sidebar_position: 4
title: Generate Signed API Access Token
---

# Generate Signed API Access Token

KnoxTokenUtility class provides the following method to generate a **signed api access token**.

```ts
const { accessToken } = await knoxTokenLibrary.generateSignedAccessTokenJWT({
  credential: {
    // provide either key or path.
    path: 'credential.json',
    key: 'credential',
  },
  accessToken: 'my-access-token',
});

console.log(accessToken);
```

Input parameters:

- credential: An input stream of the Knox credential (credential.json) that was downloaded from Knox Api portal.
- accessToken: The string api AccessToken returned by calling Knox Cloud Services' generateAccessToken api.

Output:

- A String representing the AccessToken signed with the primary key from the downloaded credential.
