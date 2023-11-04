"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[484],{901:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var s=i(7458),t=i(1135);const o={sidebar_position:4,title:"Validate License"},r="Validate License",c={id:"knox-api/knox-configure/license/validate-license",title:"Validate License",description:"To validate the  license of KnoxConfigure, use the following methods.",source:"@site/docs/knox-api/knox-configure/license/validate-license.md",sourceDirName:"knox-api/knox-configure/license",slug:"/knox-api/knox-configure/license/validate-license",permalink:"/samsungknox/docs/knox-api/knox-configure/license/validate-license",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/license/validate-license.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Validate License"},sidebar:"tutorialSidebar",previous:{title:"Register License",permalink:"/samsungknox/docs/knox-api/knox-configure/license/register-license"},next:{title:"Generate Trial License",permalink:"/samsungknox/docs/knox-api/knox-configure/license/generate-trial-license"}},a={},l=[];function d(e){const n={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"validate-license",children:"Validate License"}),"\n",(0,s.jsxs)(n.p,{children:["To validate the  ",(0,s.jsx)(n.strong,{children:"license of KnoxConfigure"}),", use the following methods."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { kcValidateLicense } from '@redredgroup/samsungknox-api';\n\nconst validateLicense =  await kcValidateLicense ({\n  args: {\n    licenseKey: 'YOUR_LICENSE_KEY',\n    licenseName: 'YOUR_LICENSE_NAME'\n  },\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n})\n\nconsole.log(validateLicense)\n"})}),"\n",(0,s.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["args: Insert parameters for the profile (required) ",(0,s.jsx)(n.strong,{children:"licenseKey"})," and ",(0,s.jsx)(n.strong,{children:"licenseName"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,s.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,s.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Output:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Responds with the validation results for that license."}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1135:(e,n,i)=>{i.d(n,{Z:()=>c,a:()=>r});var s=i(2983);const t={},o=s.createContext(t);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);