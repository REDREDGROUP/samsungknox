---
sidebar_position: 1
title: Get Device (Many)
---

# Get Devices

To get the **devices of KnoxConfigure**, use the following methods.

```ts
import { kcGetDevices } from '@redredgroup/samsungknox-api';

const kcGetDeviceList =  await kcGetDevices ({
  args: {},
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(kcGetDeviceList)
```

Input parameters:

- args: Insert params for the device (optional) See this document for more params. : https://docs.samsungknox.com/dev/knox-configure/api/#tag/Device-APIs/operation/getDevicesUsingGET_2
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:

- Device registered with KnoxConfigure respond in Array format.

