---
sidebar_position: 2
title: Get License Detail (By License ID)
---

# Get License Detail (By License ID)

To get the license detail(By License ID) of KnoxConfigure, use the following methods.

```ts
import { kcGetLicenseDetailByLicenseId } from '@redredgroup/samsungknox-api';

const getLicenseDetailById =  await kcGetLicenseDetailByLicenseId ({
  args: {
    licenseId: 'YOUR_LICENSE_ID'
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(getLicenseDetailById)
```

Input parameters:

- args: Insert parameters for the profile (required) **licenseId**. 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:

- Respond with the details of that license ID.