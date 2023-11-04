"use strict";(self.webpackChunkknox_docs=self.webpackChunkknox_docs||[]).push([[246],{678:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>g,frontMatter:()=>t,metadata:()=>c,toc:()=>l});var o=s(7458),i=s(1135);const t={sidebar_position:1,title:"Get License (Many)"},r="Get Knox Configure Licenses",c={id:"knox-api/knox-configure/license/get-licenses",title:"Get License (Many)",description:"To get the  license of KnoxConfigure, use the following methods.",source:"@site/docs/knox-api/knox-configure/license/get-licenses.md",sourceDirName:"knox-api/knox-configure/license",slug:"/knox-api/knox-configure/license/get-licenses",permalink:"/samsungknox/docs/knox-api/knox-configure/license/get-licenses",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/license/get-licenses.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Get License (Many)"},sidebar:"tutorialSidebar",previous:{title:"License",permalink:"/samsungknox/docs/category/license"},next:{title:"Get License Detail (By License ID)",permalink:"/samsungknox/docs/knox-api/knox-configure/license/get-license-details-by-license-id"}},a={},l=[];function u(e){const n={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"get-knox-configure-licenses",children:"Get Knox Configure Licenses"}),"\n",(0,o.jsxs)(n.p,{children:["To get the  ",(0,o.jsx)(n.strong,{children:"license of KnoxConfigure"}),", use the following methods."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { kcGetLicenses } from '@redredgroup/samsungknox-api';\n\nconst getLicenses =  await kcGetLicenses({\n  args: {}, // <- get KnoxConfigureLicense Params\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n})\n\nconsole.log(getLicenses)\n"})}),"\n",(0,o.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["args: Insert params for the profile (optional) See this document for more params. : ",(0,o.jsx)(n.a,{href:"https://docs.samsungknox.com/dev/knox-configure/api/#tag/License-APIs/operation/getLicensesUsingGET",children:"https://docs.samsungknox.com/dev/knox-configure/api/#tag/License-APIs/operation/getLicensesUsingGET"})]}),"\n",(0,o.jsx)(n.li,{children:"region: Insert your Knox Region. Most are the EU. (Case-insensitive)"}),"\n",(0,o.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,o.jsx)(n.strong,{children:"X-KNOX-APITOKEN"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Output:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Profiles registered with KnoxConfigure respond in Array format."}),"\n"]})]})}function g(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},1135:(e,n,s)=>{s.d(n,{Z:()=>c,a:()=>r});var o=s(2983);const i={},t=o.createContext(i);function r(e){const n=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(t.Provider,{value:n},e.children)}}}]);