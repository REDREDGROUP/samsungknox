---
sidebar_position: 4
title: Validate License
---

# Validate License

To validate the  **license of KnoxConfigure**, use the following methods.

```ts
import { kcValidateLicense } from '@redredgroup/samsungknox-api';

const validateLicense =  await kcValidateLicense ({
  args: {
    licenseKey: 'YOUR_LICENSE_KEY',
    licenseName: 'YOUR_LICENSE_NAME'
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(validateLicense)
```

Input parameters:

- args: Insert parameters for the profile (required) **licenseKey** and **licenseName**. 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:
- Responds with the validation results for that license.
