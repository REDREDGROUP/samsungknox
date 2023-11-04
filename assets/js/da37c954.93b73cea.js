"use strict";(self.webpackChunkknox_docs=self.webpackChunkknox_docs||[]).push([[139],{9313:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>a});var s=i(7458),t=i(1135);const o={sidebar_position:2,title:"Get License Detail (By License ID)"},c="Get License Detail (By License ID)",r={id:"knox-api/knox-configure/license/get-license-details-by-license-id",title:"Get License Detail (By License ID)",description:"To get the license detail(By License ID) of KnoxConfigure, use the following methods.",source:"@site/docs/knox-api/knox-configure/license/get-license-details-by-license-id.md",sourceDirName:"knox-api/knox-configure/license",slug:"/knox-api/knox-configure/license/get-license-details-by-license-id",permalink:"/samsungknox/docs/knox-api/knox-configure/license/get-license-details-by-license-id",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/license/get-license-details-by-license-id.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Get License Detail (By License ID)"},sidebar:"tutorialSidebar",previous:{title:"Get License (Many)",permalink:"/samsungknox/docs/knox-api/knox-configure/license/get-licenses"},next:{title:"Register License",permalink:"/samsungknox/docs/knox-api/knox-configure/license/register-license"}},l={},a=[];function d(e){const n={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"get-license-detail-by-license-id",children:"Get License Detail (By License ID)"}),"\n",(0,s.jsx)(n.p,{children:"To get the license detail(By License ID) of KnoxConfigure, use the following methods."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { kcGetLicenseDetailByLicenseId } from '@redredgroup/samsungknox-api';\n\nconst getLicenseDetailById =  await kcGetLicenseDetailByLicenseId ({\n  args: {\n    licenseId: 'YOUR_LICENSE_ID'\n  },\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n})\n\nconsole.log(getLicenseDetailById)\n"})}),"\n",(0,s.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["args: Insert parameters for the profile (required) ",(0,s.jsx)(n.strong,{children:"licenseId"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,s.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,s.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Output:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Respond with the details of that license ID."}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1135:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>c});var s=i(2983);const t={},o=s.createContext(t);function c(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);