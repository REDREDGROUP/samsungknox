---
sidebar_position: 3
title: Delete Device
---

### Delete Device

:::warning
If you delete your device, you'll need to contact your partner or SamsungKnox to reenroll your device. You can't manually enroll things like licenses.
:::

To Delete a device for KnoxConfigure, use the following methods

```ts
import { kcDeleteDevices } from '@redredgroup/samsungknox-api';

const kcDeleteDevice =  await kcDeleteDevices ({
  args: {
    deviceIds: ['YOUR_DEVICE_ID1']
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(kcDeleteDevice)
```

Input parameters:

- args: Insert parameters for the device (required) **deviceIds**. 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:

- The total number of devices, including the number of successful and unsuccessful attempts to delete a device, and the number of pending devices are also responded