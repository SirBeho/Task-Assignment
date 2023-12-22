import{j as e,r as l,W as g}from"./app-3ca061b3.js";import{I as h}from"./InputError-31e77835.js";import{I as w}from"./InputLabel-3a0bb58d.js";import{M as j}from"./Modal-8801e493.js";import{T as b}from"./TextInput-7d228aa4.js";import"./transition-c2f24ee9.js";function d({className:r="",disabled:s,children:t,...o}){return e.jsx("button",{...o,className:`inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${s&&"opacity-25"} `+r,disabled:s,children:t})}function N({type:r="button",className:s="",disabled:t,children:o,...n}){return e.jsx("button",{...n,type:r,className:`inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${t&&"opacity-25"} `+s,disabled:t,children:o})}function U({className:r=""}){const[s,t]=l.useState(!1),o=l.useRef(),{data:n,setData:u,delete:m,processing:p,reset:c,errors:f}=g({password:""}),x=()=>{t(!0)},y=i=>{i.preventDefault(),m(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>a(),onError:()=>o.current.focus(),onFinish:()=>c()})},a=()=>{t(!1),c()};return e.jsxs("section",{className:`space-y-6 ${r}`,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Delete Account"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),e.jsx(d,{onClick:x,children:"Delete Account"}),e.jsx(j,{show:s,onClose:a,children:e.jsxs("form",{onSubmit:y,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Are you sure you want to delete your account?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsxs("div",{className:"mt-6",children:[e.jsx(w,{htmlFor:"password",value:"Password",className:"sr-only"}),e.jsx(b,{id:"password",type:"password",name:"password",ref:o,value:n.password,onChange:i=>u("password",i.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"Password"}),e.jsx(h,{message:f.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(N,{onClick:a,children:"Cancel"}),e.jsx(d,{className:"ml-3",disabled:p,children:"Delete Account"})]})]})})]})}export{U as default};
