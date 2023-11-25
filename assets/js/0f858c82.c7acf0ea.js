"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[2178],{3043:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>g,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var r=t(7458),s=t(1135),a=t(2292),i=t(4392);const o={sidebar_position:3,title:"Register License",keywords:["knox-api","Knox Configure","register license"],last_update:{date:"11/18/2023"}},l="Register License",c={id:"knox-api/knox-configure/license/register-license",title:"Register License",description:"To register a license for KnoxConfigure, use the following methods",source:"@site/docs/knox-api/knox-configure/license/register-license.mdx",sourceDirName:"knox-api/knox-configure/license",slug:"/knox-api/knox-configure/license/register-license",permalink:"/samsungknox/docs/knox-api/knox-configure/license/register-license",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/license/register-license.mdx",tags:[],version:"current",lastUpdatedAt:1700265600,formattedLastUpdatedAt:"Nov 18, 2023",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Register License",keywords:["knox-api","Knox Configure","register license"],last_update:{date:"11/18/2023"}},sidebar:"tutorialSidebar",previous:{title:"Get License Detail (By License ID)",permalink:"/samsungknox/docs/knox-api/knox-configure/license/get-license-details-by-license-id"},next:{title:"Validate License",permalink:"/samsungknox/docs/knox-api/knox-configure/license/validate-license"}},u={},d=[{value:"Example",id:"example",level:2}];function p(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"register-license",children:"Register License"}),"\n",(0,r.jsx)(n.p,{children:"To register a license for KnoxConfigure, use the following methods"}),"\n",(0,r.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,r.jsxs)(a.Z,{groupId:"syntax",defaultValue:"class",values:[{label:"class",value:"class"},{label:"function",value:"function"}],children:[(0,r.jsx)(i.Z,{value:"class",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { KnoxInstance } from '@redredgroup/samsungknox-api';\nconst instance = new KnoxInstance({\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n});\n\nconst registerLicense = await instance.kcLicense.registerLicense({\n  args: {\n    licenseKey: 'YOUR_LICENSE_KEY',\n    licenseName: 'YOUR_LICENSE_NAME',\n  },\n});\n\nconsole.log(registerLicense);\n"})})}),(0,r.jsx)(i.Z,{value:"function",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { kcRegisterLicense } from '@redredgroup/samsungknox-api';\n\nconst registerLicense = await kcRegisterLicense({\n  args: {\n    licenseKey: 'YOUR_LICENSE_KEY',\n    licenseName: 'YOUR_LICENSE_NAME',\n  },\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n});\n\nconsole.log(registerLicense);\n"})})})]}),"\n",(0,r.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["args: Insert parameters for the profile (required) ",(0,r.jsx)(n.strong,{children:"licenseKey"})," and ",(0,r.jsx)(n.strong,{children:"licenseName"}),"."]}),"\n",(0,r.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,r.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,r.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Output:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Responds with the result of the registered license."}),"\n"]})]})}function g(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},4392:(e,n,t)=>{t.d(n,{Z:()=>i});t(2983);var r=t(4517);const s={tabItem:"tabItem_bqaL"};var a=t(7458);function i(e){let{children:n,hidden:t,className:i}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,i),hidden:t,children:n})}},2292:(e,n,t)=>{t.d(n,{Z:()=>j});var r=t(2983),s=t(4517),a=t(3616),i=t(3729),o=t(2870),l=t(3431),c=t(2356),u=t(9198);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:s}}=e;return{value:n,label:t,attributes:r,default:s}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function g(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function f(e){let{queryString:n=!1,groupId:t}=e;const s=(0,i.k6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l._X)(a),(0,r.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(s.location.search);n.set(a,e),s.replace({...s.location,search:n.toString()})}),[a,s])]}function h(e){const{defaultValue:n,queryString:t=!1,groupId:s}=e,a=p(e),[i,l]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!g({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[c,d]=f({queryString:t,groupId:s}),[h,m]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,a]=(0,u.Nk)(t);return[s,(0,r.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:s}),x=(()=>{const e=c??h;return g({value:e,tabValues:a})?e:null})();(0,o.Z)((()=>{x&&l(x)}),[x]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!g({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),m(e)}),[d,m,a]),tabValues:a}}var m=t(9660);const x={tabList:"tabList_M_z4",tabItem:"tabItem_wn4y"};var b=t(7458);function k(e){let{className:n,block:t,selectedValue:r,selectValue:i,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),u=e=>{const n=e.currentTarget,t=l.indexOf(n),s=o[t].value;s!==r&&(c(n),i(s))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>l.push(e),onKeyDown:d,onClick:u,...a,className:(0,s.Z)("tabs__item",x.tabItem,a?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:s}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function E(e){const n=h(e);return(0,b.jsxs)("div",{className:(0,s.Z)("tabs-container",x.tabList),children:[(0,b.jsx)(k,{...e,...n}),(0,b.jsx)(v,{...e,...n})]})}function j(e){const n=(0,m.Z)();return(0,b.jsx)(E,{...e,children:d(e.children)},String(n))}},1135:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>i});var r=t(2983);const s={},a=r.createContext(s);function i(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);