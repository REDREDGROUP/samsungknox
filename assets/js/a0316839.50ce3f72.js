"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[9410],{3246:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>t,metadata:()=>a,toc:()=>c});var r=o(7458),i=o(1135);const t={sidebar_position:1,title:"What is Knox Token Library?",description:"Explain what is Knox Token Library."},s="SamsungKnox Token Library",a={id:"knox-token-library/knox-token-library",title:"What is Knox Token Library?",description:"Explain what is Knox Token Library.",source:"@site/docs/knox-token-library/knox-token-library.md",sourceDirName:"knox-token-library",slug:"/knox-token-library/",permalink:"/samsungknox/docs/knox-token-library/",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-token-library/knox-token-library.md",tags:[],version:"current",lastUpdatedAt:1700912066,formattedLastUpdatedAt:"Nov 25, 2023",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"What is Knox Token Library?",description:"Explain what is Knox Token Library."},sidebar:"tutorialSidebar",previous:{title:"Knox Token Library",permalink:"/samsungknox/docs/category/knox-token-library"},next:{title:"Get Started",permalink:"/samsungknox/docs/knox-token-library/get-started"}},l={},c=[{value:"Portal flow",id:"portal-flow",level:3},{value:"Programmatic flow",id:"programmatic-flow",level:3}];function d(e){const n={a:"a",h1:"h1",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"samsungknox-token-library",children:"SamsungKnox Token Library"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://www.npmjs.com/package/@redredgroup/samsungknox-token-library",children:(0,r.jsx)(n.img,{src:"https://badge.fury.io/js/@redredgroup%2Fsamsungknox-token-library.svg",alt:"npm version"})})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"referenced the package"})," : ",(0,r.jsx)(n.a,{href:"https://www.npmjs.com/package/knox-token-library-js",children:"knox-token-library-js"})]}),"\n",(0,r.jsx)(n.p,{children:"This library provides utility methods to generate and sign Knox Tokens using server side Javascript. The pre-requisites for using this utility are"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"You have downloaded the Knox Credential file (credential.json)"}),"\n",(0,r.jsx)(n.li,{children:"You have generated a Client Identifier (api-key) for accessing apis of Knox Cloud Services."}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"The keys below must have Cloud API privileges on Samsung Knox. If you do not have permission, you can request permission by disconnecting the Ticket from the Samsung Knox Admin Portal."}),"\n",(0,r.jsxs)(n.p,{children:["Read: ",(0,r.jsx)(n.a,{href:"https://docs.samsungknox.com/dev/knox-cloud-authentication/tutorial/tutorial-for-customers-generate-access-token/",children:"https://docs.samsungknox.com/dev/knox-cloud-authentication/tutorial/tutorial-for-customers-generate-access-token/"})]}),"\n",(0,r.jsx)(n.h1,{id:"intended-use",children:"Intended Use"}),"\n",(0,r.jsx)(n.p,{children:"The workflow for making api calls to Knox Cloud Services is divided into a portal workflow, and a programmatic workflow."}),"\n",(0,r.jsx)(n.p,{children:"Check out the official Samsung Knox documentation below for more information."}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://docs.samsungknox.com/dev/knox-cloud-authentication",children:"https://docs.samsungknox.com/dev/knox-cloud-authentication"})}),"\n",(0,r.jsx)(n.h3,{id:"portal-flow",children:"Portal flow"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Download credential from Knox Api Portal"}),"\n",(0,r.jsx)(n.li,{children:"Generate and Download ClientIdentifier (api-key) for a specific Knox Solution"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"programmatic-flow",children:"Programmatic flow"}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsxs)(n.li,{children:["Call Knox api to generate an Api Access Token. This api call requires a ",(0,r.jsx)(n.strong,{children:"signed ClientIdentifier"}),", and specific contents of your credential (Public Key)."]}),"\n",(0,r.jsxs)(n.li,{children:["Call Knox api for your intended workflow (eg: upload device, configure device etc). This api call requires your ",(0,r.jsx)(n.strong,{children:"signed Api Access Token"}),", and specific contents of your credential (Public Key)."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"This utility js library helps generate signed clientIdentifiers, and signed accessTokens."})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},1135:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>s});var r=o(2983);const i={},t=r.createContext(i);function s(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);