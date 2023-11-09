---
sidebar_position: 5
title: Unassign Profile Device
---

# Assign Profile Device

To unassign Profile a device for KnoxConfigure, use the following methods

```ts
import { kcUnassignProfileDevices } from '@redredgroup/samsungknox-api';

const kcUnassignProfileDevice  =  await kcUnassignProfileDevices ({
  args: {
    deviceIds: ['YOUR_DEVICE_ID1', 'YOUR_DEVICE_ID2']
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(kcUnassignProfileDevice)
```

Input parameters:

- args: Insert parameters for the device (required) **deviceIds**. 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:
- Responds with a number that represents the result of hedging the profile assignment of the device to which the profile is assigned. 