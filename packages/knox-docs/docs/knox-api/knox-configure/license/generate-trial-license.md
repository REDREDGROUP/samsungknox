---
sidebar_position: 5
title: Generate Trial License
---

# Generate Trial License

To generate **trial license for KnoxConfigure**, use the following methods

```ts
import { kcGenerateTrialLicense } from '@redredgroup/samsungknox-api';

const generateTrialLicense =  await kcGenerateTrialLicense({
  args: {
  licenseType: 'SELECT_LICENSE_TYPE',
},
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(generateTrialLicense)
```

Input parameters:

- args: Insert parameters for the profile (required) **licenseType** 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:

- Respond with the result of issuing a new trial license.