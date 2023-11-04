---
sidebar_position: 1
title: Get Profiles 
---

### Get Knox Configure Profiles

To get the **profiles of KnoxConfigure**, use the following methods.

```ts
import { kcGetProfiles } from '@redredgroup/samsungknox-api';

const getProfiles =  await kcGetProfiles({
  args: {}, // <- get KnoxConfigureProfiles Params
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(getProfiles)
```

Input parameters:

- args: Insert params for the profile (optional) See this document for more params. : https://docs.samsungknox.com/dev/knox-configure/api/#tag/Profile-APIs/operation/getProfilesUsingGET
- region: Insert your Knox Region. Most are the EU. (Case-insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**

Output:

- Profiles registered with KnoxConfigure respond in Array format.

