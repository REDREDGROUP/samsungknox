---
sidebar_position: 2
title: Get Profile Details 
---

### Get Knox Configure Profile Detail

To get the **profile (detail) of KnoxConfigure**, use the following methods.

```ts
import { kcGetProfileDetails } from '@redredgroup/samsungknox-api';

const getProfileDetail =  await kcGetProfileDetails ({
  args: {
    profileId: 'YOUR_PROFILE_ID'
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(getProfileDetail)
```

Input parameters:

- args: Insert parameters for the profile (required) **profileId**.
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:
- Responds with more details about the profileId.
