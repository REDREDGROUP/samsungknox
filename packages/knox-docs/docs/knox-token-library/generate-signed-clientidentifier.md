---
sidebar_position: 3
title: Generate Signed ClientIdentifier
---

# Generate Signed ClientIdentifier

The following method is provided to generate a **signed client identifier**.

```ts
import knoxTokenLibrary from '@redredgroup/samsungknox-token-library';

const { accessToken } = await knoxTokenLibrary.generateSignedClientIdentifierJWT({
  credential: {
    // provide either key or path.
    path: 'credential.json',
    key: 'credential',
  },
  clientIdentifierJwtToken: 'my-client-identifier',
});

console.log(accessToken);
```

Input parameters:

- credential: An input stream of the Knox credential (credential.json) that was downloaded from Knox Api portal.
- clientIdentifier: The string ClientIdentifier downloaded from Knox Api portal.

Output:

- A String representing the ClientIdentifier signed with the primary key from the downloaded credential.
