"use strict";(self.webpackChunk_redredgroup_samsungknox_docs=self.webpackChunk_redredgroup_samsungknox_docs||[]).push([[7154],{5989:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var o=t(7458),r=t(1135),a=t(2292),s=t(4392);const i={sidebar_position:5,title:"Send Command To Multiple Device (Many)",keywords:["knox-api","Knox Configure","send command to multiple devices"],last_update:{date:"11/18/2023"}},l="Send Command To Multiple Device",c={id:"knox-api/knox-configure/device/send-command-to-multiple-devices",title:"Send Command To Multiple Device (Many)",description:"In the command options, FACTORY_RESET literally returns the device to its factory default state.",source:"@site/docs/knox-api/knox-configure/device/send-command-to-multiple-devices.mdx",sourceDirName:"knox-api/knox-configure/device",slug:"/knox-api/knox-configure/device/send-command-to-multiple-devices",permalink:"/samsungknox/docs/knox-api/knox-configure/device/send-command-to-multiple-devices",draft:!1,unlisted:!1,editUrl:"https://github.com/REDREDGROUP/samsungknox/docs/knox-api/knox-configure/device/send-command-to-multiple-devices.mdx",tags:[],version:"current",lastUpdatedAt:1700265600,formattedLastUpdatedAt:"Nov 18, 2023",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Send Command To Multiple Device (Many)",keywords:["knox-api","Knox Configure","send command to multiple devices"],last_update:{date:"11/18/2023"}},sidebar:"tutorialSidebar",previous:{title:"Assign Profile Device",permalink:"/samsungknox/docs/knox-api/knox-configure/device/assign-profile"},next:{title:"Unassign Profile Device",permalink:"/samsungknox/docs/knox-api/knox-configure/device/unassign-profile"}},u={},d=[{value:"Example",id:"example",level:2}];function m(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"send-command-to-multiple-device",children:"Send Command To Multiple Device"}),"\n",(0,o.jsxs)(n.admonition,{type:"warning",children:[(0,o.jsxs)(n.p,{children:["In the command options, ",(0,o.jsx)(n.strong,{children:"FACTORY_RESET"})," literally returns the device to its factory default state."]}),(0,o.jsxs)(n.p,{children:["If you choose the ",(0,o.jsx)(n.strong,{children:"FACTORY_RESET"})," option, double-check that the device you want to factory reset is the right one. This setting is irreversible."]})]}),"\n",(0,o.jsxs)(n.p,{children:["To send command to ",(0,o.jsx)(n.strong,{children:"multiple devices of KnoxConfigure"}),", use the following methods."]}),"\n",(0,o.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,o.jsxs)(a.Z,{groupId:"installation",defaultValue:"class",values:[{label:"class",value:"class"},{label:"function",value:"function"}],children:[(0,o.jsx)(s.Z,{value:"class",children:(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { KnoxInstance } from '@redredgroup/samsungknox-api';\nconst instance = new KnoxInstance({\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n});\n\nconst kcSendCommandToMultipleDevice = await instance.kcDevice.sendCommandToMultipleDevices({\n  args: {\n    command: 'REBOOT',\n    devices: ['YOUR_DEVICE_ID1', 'YOUR_DEVICE_ID2'],\n  }, // <- other optional param\n});\n\nconsole.log(kcSendCommandToMultipleDevice);\n"})})}),(0,o.jsx)(s.Z,{value:"function",children:(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { kcSendCommandToMultipleDevices } from '@redredgroup/samsungknox-api';\n\nconst kcSendCommandToMultipleDevice = await kcSendCommandToMultipleDevices({\n  args: {\n    command: 'REBOOT',\n    devices: ['YOUR_DEVICE_ID1', 'YOUR_DEVICE_ID2'],\n  }, // <- other optional param\n  region: 'YOUR_KNOX_REGION',\n  knoxAccessToken: 'YOUR_JWT_TOKEN',\n});\n\nconsole.log(kcSendCommandToMultipleDevice);\n"})})})]}),"\n",(0,o.jsx)(n.p,{children:"Input parameters:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["args: Insert parameters for the device (required) ",(0,o.jsx)(n.strong,{children:"command"})," and ",(0,o.jsx)(n.strong,{children:"devices"}),"."]}),"\n",(0,o.jsx)(n.li,{children:"region: Insert the Knox region. Most of them are EU (case insensitive)"}),"\n",(0,o.jsxs)(n.li,{children:["knoxAccessToken: Your ",(0,o.jsx)(n.strong,{children:"X-KNOX-APITOKEN"}),"."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Output:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Responds with a code in response to sending a command."}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}},4392:(e,n,t)=>{t.d(n,{Z:()=>s});t(2983);var o=t(4517);const r={tabItem:"tabItem_bqaL"};var a=t(7458);function s(e){let{children:n,hidden:t,className:s}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,o.Z)(r.tabItem,s),hidden:t,children:n})}},2292:(e,n,t)=>{t.d(n,{Z:()=>j});var o=t(2983),r=t(4517),a=t(3616),s=t(3729),i=t(2870),l=t(3431),c=t(2356),u=t(9198);function d(e){return o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function m(e){const{values:n,children:t}=e;return(0,o.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:o,default:r}}=e;return{value:n,label:t,attributes:o,default:r}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function h(e){let{queryString:n=!1,groupId:t}=e;const r=(0,s.k6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l._X)(a),(0,o.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(r.location.search);n.set(a,e),r.replace({...r.location,search:n.toString()})}),[a,r])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,a=m(e),[s,l]=(0,o.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const o=t.find((e=>e.default))??t[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:n,tabValues:a}))),[c,d]=h({queryString:t,groupId:r}),[f,v]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,a]=(0,u.Nk)(t);return[r,(0,o.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:r}),x=(()=>{const e=c??f;return p({value:e,tabValues:a})?e:null})();(0,i.Z)((()=>{x&&l(x)}),[x]);return{selectedValue:s,selectValue:(0,o.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),v(e)}),[d,v,a]),tabValues:a}}var v=t(9660);const x={tabList:"tabList_M_z4",tabItem:"tabItem_wn4y"};var g=t(7458);function b(e){let{className:n,block:t,selectedValue:o,selectValue:s,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),u=e=>{const n=e.currentTarget,t=l.indexOf(n),r=i[t].value;r!==o&&(c(n),s(r))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:o===n?0:-1,"aria-selected":o===n,ref:e=>l.push(e),onKeyDown:d,onClick:u,...a,className:(0,r.Z)("tabs__item",x.tabItem,a?.className,{"tabs__item--active":o===n}),children:t??n},n)}))})}function k(e){let{lazy:n,children:t,selectedValue:r}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===r));return e?(0,o.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,o.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function T(e){const n=f(e);return(0,g.jsxs)("div",{className:(0,r.Z)("tabs-container",x.tabList),children:[(0,g.jsx)(b,{...e,...n}),(0,g.jsx)(k,{...e,...n})]})}function j(e){const n=(0,v.Z)();return(0,g.jsx)(T,{...e,children:d(e.children)},String(n))}},1135:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>s});var o=t(2983);const r={},a=o.createContext(r);function s(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);