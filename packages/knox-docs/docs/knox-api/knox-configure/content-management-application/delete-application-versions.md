---
sidebar_position: 2
title: Delete Application Version (Version Many)
---

### Delete Knox Configure Application Versions

:::warning
All versions for applicationId will be deleted when the externalIds option is not used in args! If you need to clear specific versions, be sure to enable the externalIds option. (If you only have one version of your app, don't include this option).

<br/>

Reference: **Comma-separated list of app versions to be deleted. If this is empty, the whole app defined by applicationId will be deleted. Do not pass any value if the app only has one version**
:::

To delete the **application versions of KnoxConfigure**, use the following methods.

```ts
import { kcDeleteApplicationVersions } from '@redredgroup/samsungknox-api';

const kcDeleteApplication  =  await kcDeleteApplicationVersions ({
  args: {
    applicationId: 'YOUR_APPLICATION_ID',
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(kcDeleteApplication)
```

Input parameters:

- args: Insert parameters for the delete application version (required) **applicationId**. 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:
- Detailed count information of deleted applications is displayed.
