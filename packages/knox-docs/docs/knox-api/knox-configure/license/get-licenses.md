---
sidebar_position: 1
title: Get License (Many)
---

# Get Knox Configure Licenses

To get the  **license of KnoxConfigure**, use the following methods.

```ts
import { kcGetLicenses } from '@redredgroup/samsungknox-api';

const getLicenses =  await kcGetLicenses({
  args: {}, // <- get KnoxConfigureLicense Params
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(getLicenses)
```


Input parameters:

- args: Insert params for the profile (optional) See this document for more params. : https://docs.samsungknox.com/dev/knox-configure/api/#tag/License-APIs/operation/getLicensesUsingGET
- region: Insert your Knox Region. Most are the EU. (Case-insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**

Output:

- Profiles registered with KnoxConfigure respond in Array format.

