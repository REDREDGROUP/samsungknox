---
sidebar_position: 4
title: Assign Profile Device
---

# Assign Profile Device

To Assign Profile a device for KnoxConfigure, use the following methods

```ts
import { kcAssignProfileDevices } from '@redredgroup/samsungknox-api';

const kcAssignProfileDevice  =  await kcAssignProfileDevices ({
  args: {
    assignFeature: {
      licenseId: 'YOUR_LICENSE_ID',
      licenseKey: 'YOUR_LICENSE_KEY',
      profileId: 'YOUR_PROFILE_ID',
      profileName: 'YOUR_PROFILE_NAME',
      replaceLicense: false
    },
    deviceIds: ['YOUR_DEVICE_ID1', 'YOUR_DEVICE_ID2']
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(kcAssignProfileDevice)
```

Input parameters:

- args: Insert parameters for the device (required) **deviceIds** and **assignFeature**. 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:
- Apply the profile to the deviceIds and respond with the resulting value. 