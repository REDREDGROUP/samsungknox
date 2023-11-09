---
sidebar_position: 5
title: Send Command To Multiple De
---

# Send Command To Multiple Device

:::warning
In the command options, **FACTORY_RESET** literally returns the device to its factory default state. 

If you choose the **FACTORY_RESET** option, double-check that the device you want to factory reset is the right one. This setting is irreversible.
:::


To send command to **multiple devices of KnoxConfigure**, use the following methods.

```ts
import { kcSendCommandToMultipleDevices } from '@redredgroup/samsungknox-api';

const kcSendCommandToMultipleDevice =  await kcSendCommandToMultipleDevices ({
  args: {
    command: 'REBOOT',
    devices: ['YOUR_DEVICE_ID1', 'YOUR_DEVICE_ID2']
  },
  region: 'YOUR_KNOX_REGION',
  knoxAccessToken: 'YOUR_JWT_TOKEN',
})

console.log(kcSendCommandToMultipleDevice)
```

Input parameters:

- args: Insert parameters for the device (required) **command** and **devices**. 
- region: Insert the Knox region. Most of them are EU (case insensitive)
- knoxAccessToken: Your **X-KNOX-APITOKEN**.

Output:
- Responds with a code in response to sending a command.