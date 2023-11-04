"use strict";(self.webpackChunkknox_docs=self.webpackChunkknox_docs||[]).push([[133],{8687:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>u,frontMatter:()=>t,metadata:()=>c,toc:()=>l});var r=i(7458),s=i(1135);const t={sidebar_position:5,title:"Generate Trial License"},o="Generate Trial License",c={id:"knox-api/knox-configure/license/generate-trial-license",title:"Generate Trial License",description:"To generate trial license for KnoxConfigure, use the following methods",source:"@site/docs/knox-api/knox-configure/license/generate-trial-license.md",sourceDirName:"knox-api/knox-configure/license",slug:"/knox-api/knox-configure/license/generate-trial-license",permalink:"/docs/knox-api/knox-configure/license/generate-trial-license",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/license/generate-trial-license.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Generate Trial License"},sidebar:"tutorialSidebar",previous:{title:"Validate License",permalink:"/docs/knox-api/knox-configure/license/validate-license"}},a={},l=[];function d(e){const n={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"generate-trial-license",children:"Generate Trial License"}),"\n",(0,r.jsxs)(n.p,{children:["To generate ",(0,r.jsx)(n.strong,{children:"trial license for KnoxConfigure"}),", use the following methods"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { kcGenerateTrialLicense } from '@redredgroup/samsungknox-api';\n\nconst generateTrialLicense =  await kcGenerateTrialLicense({\n  args: {\n  licenseType: 'SELECT_LICENSE_TYPE',\n},\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n})\n\nconsole.log(generateTrialLicense)\n"})}),"\n",(0,r.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["args: Insert parameters for the profile (required) ",(0,r.jsx)(n.strong,{children:"licenseType"})]}),"\n",(0,r.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,r.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,r.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Output:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Respond with the result of issuing a new trial license."}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},1135:(e,n,i)=>{i.d(n,{Z:()=>c,a:()=>o});var r=i(2983);const s={},t=r.createContext(s);function o(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);