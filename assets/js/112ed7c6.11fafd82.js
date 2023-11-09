"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[673],{9320:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var i=o(7458),t=o(1135);const s={sidebar_position:3,title:"Delete Device"},c=void 0,r={id:"knox-api/knox-configure/device/delete-devices",title:"Delete Device",description:"Delete Device",source:"@site/docs/knox-api/knox-configure/device/delete-devices.md",sourceDirName:"knox-api/knox-configure/device",slug:"/knox-api/knox-configure/device/delete-devices",permalink:"/samsungknox/docs/knox-api/knox-configure/device/delete-devices",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/device/delete-devices.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Delete Device"},sidebar:"tutorialSidebar",previous:{title:"Get Device Logs",permalink:"/samsungknox/docs/knox-api/knox-configure/device/get-device-logs"},next:{title:"Assign Profile Device",permalink:"/samsungknox/docs/knox-api/knox-configure/device/assign-profile"}},d={},l=[{value:"Delete Device",id:"delete-device",level:3}];function a(e){const n={admonition:"admonition",code:"code",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h3,{id:"delete-device",children:"Delete Device"}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsx)(n.p,{children:"If you delete your device, you'll need to contact your partner or SamsungKnox to reenroll your device. You can't manually enroll things like licenses."})}),"\n",(0,i.jsx)(n.p,{children:"To Delete a device for KnoxConfigure, use the following methods"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { kcDeleteDevices } from '@redredgroup/samsungknox-api';\n\nconst kcDeleteDevice =  await kcDeleteDevices ({\n  args: {\n    deviceIds: ['YOUR_DEVICE_ID1']\n  },\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n})\n\nconsole.log(kcDeleteDevice)\n"})}),"\n",(0,i.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["args: Insert parameters for the device (required) ",(0,i.jsx)(n.strong,{children:"deviceIds"}),"."]}),"\n",(0,i.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,i.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,i.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Output:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The total number of devices, including the number of successful and unsuccessful attempts to delete a device, and the number of pending devices are also responded"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},1135:(e,n,o)=>{o.d(n,{Z:()=>r,a:()=>c});var i=o(2983);const t={},s=i.createContext(t);function c(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);