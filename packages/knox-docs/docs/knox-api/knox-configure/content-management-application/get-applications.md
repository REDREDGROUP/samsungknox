---
sidebar_position: 1
title: Get Applications (Many)
---

### Get Knox Configure Applications

To Get the **applications of KnoxConfigure**, use the following methods.

```ts
import { kcGetApplications } from '@redredgroup/samsungknox-api';

const kcGetApplication  =  await kcGetApplications ({
  args: {},
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(kcGetApplication)
```

Input parameters:

- args: Insert params for the get applications (optional) See this document for more params. : https://docs.samsungknox.com/dev/knox-configure/api/#tag/Content-Management-Application-APIs/operation/getApplicationListUsingGET
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:

- All the details about the application are displayed.