---
sidebar_position: 1
title: What is Knox Token Library?
description: Explain what is Knox Token Library.
---

# SamsungKnox Token Library

[![npm version](https://badge.fury.io/js/@redredgroup%2Fsamsungknox-token-library.svg)](https://www.npmjs.com/package/@redredgroup/samsungknox-token-library)

**referenced the package** : [knox-token-library-js](https://www.npmjs.com/package/knox-token-library-js)

Use the current OAuth 2.0 flow with `v2.requestOAuthAccessToken`. Create a
Cloud App in Samsung Knox Cloud Apps and use its client ID and client secret.
The helper returns an opaque Bearer access token; pass it to your API client
and renew it when needed. The caller owns token expiry and renewal.

See [OAuth v2 access tokens](./oauth-v2.mdx) for setup and usage.

## Legacy v1 token generation

The credential-file and client-identifier workflow below is for **Legacy v1**
only. It is not required by the current OAuth 2.0 flow.

### Legacy v1 portal steps

1. Download the Knox Credential file (`credential.json`).
2. Generate and download a Client Identifier (`api-key`) for a specific Knox
   Solution.

### Legacy v1 programmatic steps

3. Call Knox API to generate an API access token. This call requires a signed
   Client Identifier and specific contents of your credential (public key).
4. Call Knox API for your intended workflow. This call requires a signed API
   access token and specific contents of your credential (public key).

The library retains these signed-token utilities for Legacy v1 integrations.
