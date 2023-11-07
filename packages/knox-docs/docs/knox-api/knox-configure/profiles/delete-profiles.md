---
sidebar_position: 3
title: Delete Profile (Many)
---

### Delete Knox Configure Profiles

To delete the **profiles of KnoxConfigure**, use the following methods.


```ts
import { kcDeleteProfile } from '@redredgroup/samsungknox-api';

const deleteProfiles =  await kcDeleteProfile ({
  args: {
    profileIds: ['YOUR_PROFILE_ID1', 'YOUR_PROFILE_ID2']
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(deleteProfiles)
```

Input parameters:

- args: Insert parameters for the profile (required) **profileIds**.
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:
- completed status response code and message is output.
