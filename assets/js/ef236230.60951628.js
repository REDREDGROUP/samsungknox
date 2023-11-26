"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[9404],{2259:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var t=a(7458),o=a(1135),r=a(2292),s=a(4392);const l={sidebar_position:4,title:"Upload An In House App (Knox Library)",keywords:["knox-api","Knox Configure","upload an in house app (Knox Library)"],last_update:{date:"11/26/2023"}},i="Upload An In House App (Knox Library)",u={id:"knox-api/knox-configure/content-management-application/upload-an-in-house-app",title:"Upload An In House App (Knox Library)",description:"Apps that are uploaded to the Knox Configure Library must have an arbitrarily different version.",source:"@site/docs/knox-api/knox-configure/content-management-application/upload-an-in-house-app.mdx",sourceDirName:"knox-api/knox-configure/content-management-application",slug:"/knox-api/knox-configure/content-management-application/upload-an-in-house-app",permalink:"/samsungknox/docs/knox-api/knox-configure/content-management-application/upload-an-in-house-app",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/content-management-application/upload-an-in-house-app.mdx",tags:[],version:"current",lastUpdatedAt:1700956800,formattedLastUpdatedAt:"Nov 26, 2023",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Upload An In House App (Knox Library)",keywords:["knox-api","Knox Configure","upload an in house app (Knox Library)"],last_update:{date:"11/26/2023"}},sidebar:"tutorialSidebar",previous:{title:"Upload A Public App From Play Store Or Galaxy Store",permalink:"/samsungknox/docs/knox-api/knox-configure/content-management-application/upload-a-public-app-from-playstore-or-galaxystore"},next:{title:"Delete Application Version (Version Many)",permalink:"/samsungknox/docs/knox-api/knox-configure/content-management-application/delete-application-versions"}},c={},p=[{value:"Example",id:"example",level:2}];function d(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"upload-an-in-house-app-knox-library",children:"Upload An In House App (Knox Library)"}),"\n",(0,t.jsxs)(n.admonition,{type:"warning",children:[(0,t.jsx)(n.p,{children:"Apps that are uploaded to the Knox Configure Library must have an arbitrarily different version."}),(0,t.jsx)(n.p,{children:"For example, if an app called test has a version of 1.0.0, uploading the same version of test 1.0.0 to that endpoint will result in an error.\nAlways check the version before attempting to upload."})]}),"\n",(0,t.jsxs)(n.p,{children:["To Upload the ",(0,t.jsx)(n.strong,{children:"in house app (Knox Library) of KnoxConfigure"}),", use the following methods."]}),"\n",(0,t.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,t.jsxs)(r.Z,{groupId:"syntax",defaultValue:"class",values:[{label:"class",value:"class"},{label:"function",value:"function"}],children:[(0,t.jsx)(s.Z,{value:"class",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { KnoxInstance } from '@redredgroup/samsungknox-api';\n\nconst instance = new KnoxInstance({\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n});\n\nconst uploadAnInHouseApp = await instance.kcContentManagementApplication.uploadAnInHouseApp({\n  args: {\n    name: '',\n    file: '',\n  }, // <- other optional param\n});\n\nconsole.log(uploadAnInHouseApp);\n"})})}),(0,t.jsx)(s.Z,{value:"function",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { kcUploadAnInHouseApp } from '@redredgroup/samsungknox-api';\n\nconst uploadAnInHouseApp = await kcUploadAnInHouseApp({\n  args: {\n    name: '',\n    file: '',\n  }, // <- other optional param\n  region: 'YOUR-KNOX-REGION',\n  knoxAccessToken: 'YOUR-X-KNOX-APITOKEN',\n});\n\nconsole.log(uploadAnInHouseApp);\n"})})})]}),"\n",(0,t.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["args: Insert parameters for the upload in house app (required) ",(0,t.jsx)(n.strong,{children:"name"})," and ",(0,t.jsx)(n.strong,{children:"file"}),"."]}),"\n",(0,t.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,t.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,t.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Output:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Responds with the results of the application upload."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},4392:(e,n,a)=>{a.d(n,{Z:()=>s});a(2983);var t=a(4517);const o={tabItem:"tabItem_bqaL"};var r=a(7458);function s(e){let{children:n,hidden:a,className:s}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,t.Z)(o.tabItem,s),hidden:a,children:n})}},2292:(e,n,a)=>{a.d(n,{Z:()=>A});var t=a(2983),o=a(4517),r=a(3616),s=a(3729),l=a(2870),i=a(3431),u=a(2356),c=a(9198);function p(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function d(e){const{values:n,children:a}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return p(e).map((e=>{let{props:{value:n,label:a,attributes:t,default:o}}=e;return{value:n,label:a,attributes:t,default:o}}))}(a);return function(e){const n=(0,u.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,a])}function h(e){let{value:n,tabValues:a}=e;return a.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:a}=e;const o=(0,s.k6)(),r=function(e){let{queryString:n=!1,groupId:a}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:n,groupId:a});return[(0,i._X)(r),(0,t.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(o.location.search);n.set(r,e),o.replace({...o.location,search:n.toString()})}),[r,o])]}function f(e){const{defaultValue:n,queryString:a=!1,groupId:o}=e,r=d(e),[s,i]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=a.find((e=>e.default))??a[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:r}))),[u,p]=m({queryString:a,groupId:o}),[f,x]=function(e){let{groupId:n}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(n),[o,r]=(0,c.Nk)(a);return[o,(0,t.useCallback)((e=>{a&&r.set(e)}),[a,r])]}({groupId:o}),g=(()=>{const e=u??f;return h({value:e,tabValues:r})?e:null})();(0,l.Z)((()=>{g&&i(g)}),[g]);return{selectedValue:s,selectValue:(0,t.useCallback)((e=>{if(!h({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);i(e),p(e),x(e)}),[p,x,r]),tabValues:r}}var x=a(9660);const g={tabList:"tabList_M_z4",tabItem:"tabItem_wn4y"};var b=a(7458);function v(e){let{className:n,block:a,selectedValue:t,selectValue:s,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:u}=(0,r.o5)(),c=e=>{const n=e.currentTarget,a=i.indexOf(n),o=l[a].value;o!==t&&(u(n),s(o))},p=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const a=i.indexOf(e.currentTarget)+1;n=i[a]??i[0];break}case"ArrowLeft":{const a=i.indexOf(e.currentTarget)-1;n=i[a]??i[i.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":a},n),children:l.map((e=>{let{value:n,label:a,attributes:r}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>i.push(e),onKeyDown:p,onClick:c,...r,className:(0,o.Z)("tabs__item",g.tabItem,r?.className,{"tabs__item--active":t===n}),children:a??n},n)}))})}function k(e){let{lazy:n,children:a,selectedValue:o}=e;const r=(Array.isArray(a)?a:[a]).filter(Boolean);if(n){const e=r.find((e=>e.props.value===o));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:r.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==o})))})}function y(e){const n=f(e);return(0,b.jsxs)("div",{className:(0,o.Z)("tabs-container",g.tabList),children:[(0,b.jsx)(v,{...e,...n}),(0,b.jsx)(k,{...e,...n})]})}function A(e){const n=(0,x.Z)();return(0,b.jsx)(y,{...e,children:p(e.children)},String(n))}},1135:(e,n,a)=>{a.d(n,{Z:()=>l,a:()=>s});var t=a(2983);const o={},r=t.createContext(o);function s(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);