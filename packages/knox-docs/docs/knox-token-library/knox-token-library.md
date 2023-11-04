---
sidebar_position: 1
title: What is Knox Token Library?
description: Explain what is Knox Token Library.
---

# SamsungKnox Token Library

[![npm version](https://badge.fury.io/js/@redredgroup%2Fsamsungknox-token-library.svg)](https://www.npmjs.com/package/@redredgroup/samsungknox-token-library)

**referenced the package** : [knox-token-library-js](https://www.npmjs.com/package/knox-token-library-js)

This library provides utility methods to generate and sign Knox Tokens using server side Javascript. The pre-requisites for using this utility are

- You have downloaded the Knox Credential file (credential.json)
- You have generated a Client Identifier (api-key) for accessing apis of Knox Cloud Services.

The keys below must have Cloud API privileges on Samsung Knox. If you do not have permission, you can request permission by disconnecting the Ticket from the Samsung Knox Admin Portal.

Read: https://docs.samsungknox.com/dev/knox-cloud-authentication/tutorial/tutorial-for-customers-generate-access-token/


# Intended Use

The workflow for making api calls to Knox Cloud Services is divided into a portal workflow, and a programmatic workflow.

Check out the official Samsung Knox documentation below for more information.

https://docs.samsungknox.com/dev/knox-cloud-authentication


### Portal flow

1.  Download credential from Knox Api Portal
2.  Generate and Download ClientIdentifier (api-key) for a specific Knox Solution


### Programmatic flow

3. Call Knox api to generate an Api Access Token. This api call requires a **signed ClientIdentifier**, and specific contents of your credential (Public Key).
4. Call Knox api for your intended workflow (eg: upload device, configure device etc). This api call requires your **signed Api Access Token**, and specific contents of your credential (Public Key).

This utility js library helps generate signed clientIdentifiers, and signed accessTokens.
