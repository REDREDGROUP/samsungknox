"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[8284],{2206:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>k,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var s=t(7458),o=t(1135);const r={sidebar_position:4,title:"Generate Signed API Access Token"},i="Generate Signed API Access Token",a={id:"knox-token-library/generate-signed-api-access-token",title:"Generate Signed API Access Token",description:"KnoxTokenUtility class provides the following method to generate a signed api access token.",source:"@site/docs/knox-token-library/generate-signed-api-access-token.md",sourceDirName:"knox-token-library",slug:"/knox-token-library/generate-signed-api-access-token",permalink:"/samsungknox/docs/knox-token-library/generate-signed-api-access-token",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-token-library/generate-signed-api-access-token.md",tags:[],version:"current",lastUpdatedAt:1700912066,formattedLastUpdatedAt:"Nov 25, 2023",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Generate Signed API Access Token"},sidebar:"tutorialSidebar",previous:{title:"Generate Signed ClientIdentifier",permalink:"/samsungknox/docs/knox-token-library/generate-signed-clientidentifier"},next:{title:"Generate Base64 Encoded String PublicKey",permalink:"/samsungknox/docs/knox-token-library/generate-base64-encoded-string-publickey"}},c={},d=[];function l(e){const n={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"generate-signed-api-access-token",children:"Generate Signed API Access Token"}),"\n",(0,s.jsxs)(n.p,{children:["KnoxTokenUtility class provides the following method to generate a ",(0,s.jsx)(n.strong,{children:"signed api access token"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const { accessToken } = await knoxTokenLibrary.generateSignedAccessTokenJWT({\n  credential: {\n    // provide either key or path.\n    path: 'credential.json',\n    key: 'credential',\n  },\n  accessToken: 'my-access-token',\n});\n\nconsole.log(accessToken);\n"})}),"\n",(0,s.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"credential: An input stream of the Knox credential (credential.json) that was downloaded from Knox Api portal."}),"\n",(0,s.jsx)(n.li,{children:"accessToken: The string api AccessToken returned by calling Knox Cloud Services' generateAccessToken api."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Output:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"A String representing the AccessToken signed with the primary key from the downloaded credential."}),"\n"]})]})}function k(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1135:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>i});var s=t(2983);const o={},r=s.createContext(o);function i(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);