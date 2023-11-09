"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[81],{3900:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var r=o(7458),s=o(1135);const i={sidebar_position:3,title:"Delete Profile (Many)"},t=void 0,l={id:"knox-api/knox-configure/profiles/delete-profiles",title:"Delete Profile (Many)",description:"Delete Knox Configure Profiles",source:"@site/docs/knox-api/knox-configure/profiles/delete-profiles.md",sourceDirName:"knox-api/knox-configure/profiles",slug:"/knox-api/knox-configure/profiles/delete-profiles",permalink:"/samsungknox/docs/knox-api/knox-configure/profiles/delete-profiles",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/profiles/delete-profiles.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Delete Profile (Many)"},sidebar:"tutorialSidebar",previous:{title:"Get Profile Details",permalink:"/samsungknox/docs/knox-api/knox-configure/profiles/get-profile-details"},next:{title:"License",permalink:"/samsungknox/docs/category/license"}},c={},d=[{value:"Delete Knox Configure Profiles",id:"delete-knox-configure-profiles",level:3}];function a(e){const n={code:"code",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h3,{id:"delete-knox-configure-profiles",children:"Delete Knox Configure Profiles"}),"\n",(0,r.jsxs)(n.p,{children:["To delete the ",(0,r.jsx)(n.strong,{children:"profiles of KnoxConfigure"}),", use the following methods."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { kcDeleteProfile } from '@redredgroup/samsungknox-api';\n\nconst deleteProfiles =  await kcDeleteProfile ({\n  args: {\n    profileIds: ['YOUR_PROFILE_ID1', 'YOUR_PROFILE_ID2']\n  },\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n})\n\nconsole.log(deleteProfiles)\n"})}),"\n",(0,r.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["args: Insert parameters for the profile (required) ",(0,r.jsx)(n.strong,{children:"profileIds"}),"."]}),"\n",(0,r.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,r.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,r.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Output:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"completed status response code and message is output."}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},1135:(e,n,o)=>{o.d(n,{Z:()=>l,a:()=>t});var r=o(2983);const s={},i=r.createContext(s);function t(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);