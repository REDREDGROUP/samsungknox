---
sidebar_position: 2
title: Get Device Logs
---

# Get Device Logs

To get the  **device Logs of KnoxConfigure**, use the following methods.

```ts
import { kcGetDeviceLogs } from '@redredgroup/samsungknox-api';

const kcGetDeviceLog =  await kcGetDeviceLogs ({
  args: {
    deviceId: 'YOUR_DEVICE_ID'
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(kcGetDeviceLog)
```

Input parameters:

- args: Insert parameters for the device (required) **deviceId**. 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:

- Responds with a detailed log for the Device.