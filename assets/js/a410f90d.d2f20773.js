"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[253],{8030:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>t,default:()=>u,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var s=i(7458),o=i(1135);const r={sidebar_position:5,title:"Unassign Profile Device"},t="Assign Profile Device",c={id:"knox-api/knox-configure/device/unassign-profile",title:"Unassign Profile Device",description:"To unassign Profile a device for KnoxConfigure, use the following methods",source:"@site/docs/knox-api/knox-configure/device/unassign-profile.md",sourceDirName:"knox-api/knox-configure/device",slug:"/knox-api/knox-configure/device/unassign-profile",permalink:"/samsungknox/docs/knox-api/knox-configure/device/unassign-profile",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/device/unassign-profile.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Unassign Profile Device"},sidebar:"tutorialSidebar",previous:{title:"Send Command To Multiple De",permalink:"/samsungknox/docs/knox-api/knox-configure/device/send-command-to-multiple-devices"},next:{title:"Profile",permalink:"/samsungknox/docs/category/profile"}},a={},l=[];function d(e){const n={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"assign-profile-device",children:"Assign Profile Device"}),"\n",(0,s.jsx)(n.p,{children:"To unassign Profile a device for KnoxConfigure, use the following methods"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { kcUnassignProfileDevices } from '@redredgroup/samsungknox-api';\n\nconst kcUnassignProfileDevice  =  await kcUnassignProfileDevices ({\n  args: {\n    deviceIds: ['YOUR_DEVICE_ID1', 'YOUR_DEVICE_ID2']\n  },\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n})\n\nconsole.log(kcUnassignProfileDevice)\n"})}),"\n",(0,s.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["args: Insert parameters for the device (required) ",(0,s.jsx)(n.strong,{children:"deviceIds"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,s.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,s.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Output:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Responds with a number that represents the result of hedging the profile assignment of the device to which the profile is assigned."}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1135:(e,n,i)=>{i.d(n,{Z:()=>c,a:()=>t});var s=i(2983);const o={},r=s.createContext(o);function t(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);