"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[9252],{5769:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>o,default:()=>f,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var s=t(7458),r=t(1135),a=t(2292),i=t(4392);const l={sidebar_position:2,title:"Get License Detail (By License ID)",keywords:["knox-api","Knox Configure","get license detail (by license id)"],last_update:{date:"11/18/2023"}},o="Get License Detail (By License ID)",c={id:"knox-api/knox-configure/license/get-license-details-by-license-id",title:"Get License Detail (By License ID)",description:"To get the license detail(By License ID) of KnoxConfigure, use the following methods.",source:"@site/docs/knox-api/knox-configure/license/get-license-details-by-license-id.mdx",sourceDirName:"knox-api/knox-configure/license",slug:"/knox-api/knox-configure/license/get-license-details-by-license-id",permalink:"/samsungknox/docs/knox-api/knox-configure/license/get-license-details-by-license-id",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/license/get-license-details-by-license-id.mdx",tags:[],version:"current",lastUpdatedAt:1700265600,formattedLastUpdatedAt:"Nov 18, 2023",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Get License Detail (By License ID)",keywords:["knox-api","Knox Configure","get license detail (by license id)"],last_update:{date:"11/18/2023"}},sidebar:"tutorialSidebar",previous:{title:"Get License (Many)",permalink:"/samsungknox/docs/knox-api/knox-configure/license/get-licenses"},next:{title:"Register License",permalink:"/samsungknox/docs/knox-api/knox-configure/license/register-license"}},u={},d=[{value:"Example",id:"example",level:2}];function p(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"get-license-detail-by-license-id",children:"Get License Detail (By License ID)"}),"\n",(0,s.jsx)(n.p,{children:"To get the license detail(By License ID) of KnoxConfigure, use the following methods."}),"\n",(0,s.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,s.jsxs)(a.Z,{groupId:"syntax",defaultValue:"class",values:[{label:"class",value:"class"},{label:"function",value:"function"}],children:[(0,s.jsx)(i.Z,{value:"class",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { KnoxInstance } from '@redredgroup/samsungknox-api';\nconst instance = new KnoxInstance({\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n});\n\nconst getLicenseDetailById = await instance.kcLicense.getLicenseDetailByLicenseId({\n  args: {\n    licenseId: 'YOUR_LICENSE_ID',\n  },\n});\n\nconsole.log(getLicenseDetailById);\n"})})}),(0,s.jsx)(i.Z,{value:"function",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { kcGetLicenseDetailByLicenseId } from '@redredgroup/samsungknox-api';\n\nconst getLicenseDetailById = await kcGetLicenseDetailByLicenseId({\n  args: {\n    licenseId: 'YOUR_LICENSE_ID',\n  },\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n});\n\nconsole.log(getLicenseDetailById);\n"})})})]}),"\n",(0,s.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["args: Insert parameters for the profile (required) ",(0,s.jsx)(n.strong,{children:"licenseId"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,s.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,s.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Output:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Respond with the details of that license ID."}),"\n"]})]})}function f(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},4392:(e,n,t)=>{t.d(n,{Z:()=>i});t(2983);var s=t(4517);const r={tabItem:"tabItem_bqaL"};var a=t(7458);function i(e){let{children:n,hidden:t,className:i}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,s.Z)(r.tabItem,i),hidden:t,children:n})}},2292:(e,n,t)=>{t.d(n,{Z:()=>I});var s=t(2983),r=t(4517),a=t(3616),i=t(3729),l=t(2870),o=t(3431),c=t(2356),u=t(9198);function d(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:s,default:r}}=e;return{value:n,label:t,attributes:s,default:r}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function f(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function h(e){let{queryString:n=!1,groupId:t}=e;const r=(0,i.k6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,o._X)(a),(0,s.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(r.location.search);n.set(a,e),r.replace({...r.location,search:n.toString()})}),[a,r])]}function g(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,a=p(e),[i,o]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!f({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=t.find((e=>e.default))??t[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:a}))),[c,d]=h({queryString:t,groupId:r}),[g,m]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,a]=(0,u.Nk)(t);return[r,(0,s.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:r}),x=(()=>{const e=c??g;return f({value:e,tabValues:a})?e:null})();(0,l.Z)((()=>{x&&o(x)}),[x]);return{selectedValue:i,selectValue:(0,s.useCallback)((e=>{if(!f({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),m(e)}),[d,m,a]),tabValues:a}}var m=t(9660);const x={tabList:"tabList_M_z4",tabItem:"tabItem_wn4y"};var b=t(7458);function k(e){let{className:n,block:t,selectedValue:s,selectValue:i,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),u=e=>{const n=e.currentTarget,t=o.indexOf(n),r=l[t].value;r!==s&&(c(n),i(r))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;n=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;n=o[t]??o[o.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":t},n),children:l.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,ref:e=>o.push(e),onKeyDown:d,onClick:u,...a,className:(0,r.Z)("tabs__item",x.tabItem,a?.className,{"tabs__item--active":s===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:r}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===r));return e?(0,s.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function y(e){const n=g(e);return(0,b.jsxs)("div",{className:(0,r.Z)("tabs-container",x.tabList),children:[(0,b.jsx)(k,{...e,...n}),(0,b.jsx)(v,{...e,...n})]})}function I(e){const n=(0,m.Z)();return(0,b.jsx)(y,{...e,children:d(e.children)},String(n))}},1135:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>i});var s=t(2983);const r={},a=s.createContext(r);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);