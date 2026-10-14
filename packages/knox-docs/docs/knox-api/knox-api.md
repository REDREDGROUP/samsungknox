---
sidebar_position: 1
title: What is Knox API?
description: Explain what the Knox API
---

# SamsungKnox API

[![npm version](https://badge.fury.io/js/@redredgroup%2Fsamsungknox-api.svg)](https://www.npmjs.com/package/@redredgroup/samsungknox-api)

## Current Knox Configure API

For new Knox Configure integrations, use `KnoxConfigureClient` with a global
OAuth access token. Create a Cloud App to obtain its `client_id` and
`client_secret`, then use
[`v2.requestOAuthAccessToken`](https://www.npmjs.com/package/@redredgroup/samsungknox-token-library)
from the token library to request that token. These Cloud App credentials are
inputs to the token helper; a Knox Credential file and signed identifier are
not prerequisites for current v2.

See the [Configure v2 migration guide](./migration-v2.mdx) for setup, scopes,
client usage, and migration details. The client uses the global
`https://api.samsungknox.com` host.

## Legacy authentication

The earlier API uses a Knox Credential file (`credential.json`), signed
identifiers, regional authentication, and the legacy request contract. Keep
that guidance only when maintaining an existing integration; see the
[legacy Get Started guide](./get-started.mdx) and the retained legacy
operation pages.
