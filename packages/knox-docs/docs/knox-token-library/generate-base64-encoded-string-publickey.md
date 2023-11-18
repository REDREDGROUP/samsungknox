---
sidebar_position: 5
title: Generate Base64 Encoded String PublicKey
description: Describes how to use the library to generate Base64 encoded Public Keys available in Samsung Knox.
---

# Generate Base64 Encoded String PublicKey

KnoxTokenUtility class provides the following method to generate a **signed api access token**.

```ts
import knoxTokenLibrary from '@redredgroup/samsungknox-token-library';

const { publicKey } = await knoxTokenLibrary.generateBase64EncodedStringPublicKey({
  credential: {
    // provide either key or path.
    path: 'credential.json',
    key: 'credential',
  },
});

console.log(publicKey);
```

Input parameters:

- credentialPath: An input stream of the Knox credential (credential.json) that was downloaded from Knox Api portal.

Output:

- The public key encoded in Base 64 is outputted as a String.
