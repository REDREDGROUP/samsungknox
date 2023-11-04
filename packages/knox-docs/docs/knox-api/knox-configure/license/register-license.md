---
sidebar_position: 3
title: Register License
---

# Register Knox Configure License

To register a license for KnoxConfigure, use the following methods

```ts
import { kcRegisterLicense } from '@redredgroup/samsungknox-api';

const registerLicense =  await kcRegisterLicense({
  args: {
    licenseKey: 'YOUR_LICENSE_KEY',
    licenseName: 'YOUR_LICENSE_NAME'
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(registerLicense)
```

Input parameters:

- args: Insert parameters for the profile (required) **licenseKey** and **licenseName**. 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:

- Responds with the result of the registered license.