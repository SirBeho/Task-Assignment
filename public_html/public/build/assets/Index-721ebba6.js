import{j as e,r as f,W as L,a as S,d as P}from"./app-67a9b6ea.js";import{D as V}from"./DeleteUser-2ac3f9aa.js";import{M as w}from"./Modal-c7427ea3.js";import{A,L as D}from"./AuthenticatedLayout-71ac0110.js";import"./transition-7475cba5.js";function R({data:l,currentPage:r,setCurrentPage:s}){const i=l.length%5===0?l.length/5:parseInt(l.length/5)+1,n=c=>{if(c>i){s(1);return}if(c<=0){s(i);return}s(c)},o=()=>{const c=[];let h=1,d=i;if(i>5){const x=Math.floor(2.5);r>x?(h=r-x,d=r+x):(h=1,d=5),d>i&&(d=i,h=i-5+1)}for(let x=h;x<=d;x++)c.push(e.jsx("li",{children:e.jsx("a",{href:"#",onClick:()=>n(x),className:`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${r===x?"text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white":""}`,children:x})},x));return h>1&&c.unshift(e.jsx("li",{children:e.jsx("span",{children:"..."})},"ellipsisStart")),d<i&&c.push(e.jsx("li",{children:e.jsx("span",{children:"..."})},"ellipsisEnd")),c};return e.jsx("nav",{"aria-label":"Page navigation example",children:e.jsxs("ul",{className:"flex items-center -space-x-px h-10 text-base",children:[e.jsx("li",{children:e.jsxs("a",{href:"#",onClick:()=>n(r-1),className:"flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",children:[e.jsx("span",{className:"sr-only",children:"Previous"}),e.jsx("svg",{className:"w-3 h-3 rtl:rotate-180","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 1 1 5l4 4"})})]})}),o(),e.jsx("li",{children:e.jsxs("a",{href:"#",onClick:()=>n(r+1),className:"flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",children:[e.jsx("span",{className:"sr-only",children:"Next"}),e.jsx("span",{className:"sr-only",children:"Next"}),e.jsx("svg",{className:"w-3 h-3 rtl:rotate-180","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 9 4-4-4-4"})})]})})]})})}function W({data:l,action:r,tbStructure:s,onNew:t,onUpdate:i,onDelete:n}){const[o,c]=f.useState(l),[h,d]=f.useState(1),[x,j]=f.useState([]),[p,a]=f.useState("asc");let k=5;const C=Object.keys(s),T=Object.values(s),N=u=>{if(s.hasOwnProperty(u)){const g=s[u];a(p==="asc"?"desc":"asc");const y=[...l].sort((b,m)=>p==="asc"?b[g]>m[g]?1:-1:m[g]>b[g]?1:-1);c(y),d(1)}},M=u=>{const g=(h-1)*k,v=g+k;j(u.slice(g,v))},E=u=>{d(1);const g=l.filter(v=>v.name.toLocaleLowerCase().includes(u));c(g)};return f.useEffect(()=>{c(l)},[l]),f.useEffect(()=>{M(o)},[o,h]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"my-2 flex sm:flex-row flex-col gap-4 items-center",children:[e.jsxs("div",{className:"block relative",children:[e.jsx("span",{className:"h-full absolute inset-y-0 left-0 flex items-center pl-2",children:e.jsx("svg",{viewBox:"0 0 24 24",className:"h-4 w-4 fill-current text-gray-500",children:e.jsx("path",{d:"M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"})})}),e.jsx("input",{placeholder:"Buscar tipo de Task",className:"appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none",onChange:u=>E(u.target.value.toLocaleLowerCase())})]}),e.jsx("div",{children:e.jsx("button",{className:"bg-blue-600 rounded-sm h-9 px-2 hover:bg-blue-700 hover:shadow-md  text-gray-950 hover:text-gray-100",onClick:t,children:"Nuevo"})})]}),e.jsxs("div",{className:"-mx-4 sm:-mx-8 px-4 sm:px-8 pt-4 overflow-x-auto",children:[e.jsx("div",{className:"inline-block min-w-full shadow rounded-lg overflow-hidden",children:e.jsxs("table",{className:"min-w-full leading-normal overflow-hidden",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[C.map(u=>e.jsx("th",{onClick:()=>N(u),className:"thStyle cursor-pointer",children:u},u)),r&&e.jsx("th",{className:"thStyle",children:"Actions"})]})}),e.jsx("tbody",{children:x&&x.map((u,g)=>e.jsxs("tr",{children:[T.map((v,y)=>e.jsx("td",{className:"px-5 py-3 border-b border-gray-200 bg-white text-base font-medium",children:u[v]},y)),r&&e.jsx("td",{className:"px-5 py-3 border-b border-gray-200 bg-white text-sm",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx("span",{className:"cursor-pointer",onClick:()=>i(u.id),children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6 hover:stroke-blue-600",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"})})}),e.jsx("span",{className:"cursor-pointer",onClick:()=>{n(u.id)},children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6 hover:stroke-red-600",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})})})]})})]},g))})]})}),e.jsx("div",{className:"flex justify-end py-4",children:e.jsx(R,{data:o,currentPage:h,setCurrentPage:d})})]})]})}function q({hideModal:l,show:r,msj:s,TaskTypeData:t,setLoading:i}){const[n,o]=f.useState(s);f.useEffect(()=>{o(s),console.log(s)},[s]);const c=[{id:1,category:"Servicios"},{id:2,category:"Certificacioens"},{id:3,category:"Estados Financieros"},{id:4,category:"Reportes Generales"}],{data:h,setData:d,post:x,reset:j}=L({id:t==null?void 0:t.id,name:t==null?void 0:t.name,tipo:t==null?void 0:t.tipo,status:t==null?void 0:t.status});function p(a){a.preventDefault(),l(),i(!0),x(route("TaskType.update",t.id),{onSuccess:()=>{j(),i(!1)}})}return e.jsxs(w,{show:r,maxWidth:"md",children:[e.jsx("h1",{className:"w-100% py-4 text-lg text-center font-bold",children:"Editar Tipo de Task"}),"'",e.jsxs("form",{className:"flex flex-col gap-4 text-textgray",children:[e.jsx("div",{className:"flex gap-8",children:e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"name",className:"text-xs",children:"name de la Task"}),e.jsx("input",{type:"text",name:"name",id:"name",required:!0,className:"h-9 rounded-md w-full outline-none",value:h.name,placeholder:"Diseño Web",onChange:a=>d("name",a.target.value)})]})}),e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-3/5",children:[e.jsx("label",{htmlFor:"tipo",className:"text-xs",children:"Categoria de la Task"}),e.jsxs("select",{name:"tipo",id:"tipo",className:"w-full py-1 px-2 bg-white rounded-md outline-none",required:!0,defaultValue:h.tipo,onChange:a=>d("tipo",a.target.value),children:[e.jsx("option",{value:"",children:"Selecionar Categoria"}),c.map(a=>e.jsx("option",{value:a.id,children:a.category},a.id))]})]}),e.jsxs("div",{className:"flex flex-col w-2/5",children:[e.jsx("label",{htmlFor:"tipo",className:"text-xs",children:"Select Status"}),e.jsxs("select",{name:"status",id:"status",className:"w-full py-1 px-2 bg-white rounded-md outline-none",defaultValue:h.status,required:!0,onChange:a=>d("status",a.target.value),children:[e.jsx("option",{value:"",children:"Status"}),e.jsx("option",{value:1,children:"Activo"}),e.jsx("option",{value:0,children:"Inactivo"})]})]})]}),(n==null?void 0:n.error)&&e.jsx("span",{className:"text-red-500 text-xs italic",children:n==null?void 0:n.error[0]})]}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{type:"button",className:"border py-1 w-32 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-4 mt-5",onClick:()=>{l(),j()},children:"Cancelar"}),e.jsx("button",{onClick:p,className:"border py-1 w-32 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end  mt-5",children:"Guardar"})]})]})}function O({empresa:l,setLoading:r}){const{data:s,setData:t,post:i}=L({RNC:l.RNC||"",empresa:l.empresa||"",direccion:l.direccion||"",telefono:l.telefono||"",telefono2:l.telefono2||""});function n(o){o.preventDefault(),r(!0),i(route("empresa.update",1),{onSuccess:()=>{r(!1)}})}return e.jsxs("form",{onSubmit:n,className:"flex flex-col gap-4 text-textgray px-10 pb-3",children:[e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-3/5",children:[e.jsx("label",{htmlFor:"name",className:"text-xs",children:"name de la empresa"}),e.jsx("input",{type:"text",name:"empresa",id:"empresa",className:"h-9 rounded-md w-full outline-none",value:s.empresa,onChange:o=>t("empresa",o.target.value)})]}),e.jsxs("div",{className:"flex flex-col w-2/5",children:[e.jsx("label",{htmlFor:"telefono",className:"text-xs",children:"RNC"}),e.jsx("input",{type:"tel",name:"telefono",id:"telefono",className:"h-9 rounded-md full outline-none px-2",value:s.RNC,onChange:o=>t("RNC",o.target.value)})]})]}),e.jsx("div",{className:"flex gap-8",children:e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"direccion",className:"text-xs",children:"Dirección"}),e.jsx("input",{type:"text",name:"direccion",id:"direccion",className:"h-9 rounded-md w-full outline-none",value:s.direccion,onChange:o=>t("direccion",o.target.value)})]})}),e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-1/2",children:[e.jsx("label",{htmlFor:"telefono",className:"text-xs",children:"Teléfono"}),e.jsx("input",{type:"tel",name:"telefono",id:"telefono",className:"h-9 rounded-md w-full outline-none",value:s.telefono,onChange:o=>t("telefono",o.target.value)})]}),e.jsxs("div",{className:"flex flex-col w-1/2",children:[e.jsx("label",{htmlFor:"telefono",className:"text-xs",children:"Teléfono"}),e.jsx("input",{type:"tel",name:"telefono2",id:"telefono2",className:"h-9 rounded-md full outline-none px-2",value:s.telefono2,onChange:o=>t("telefono2",o.target.value)})]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{type:"submit",className:"border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5",children:"Guardar"})})]})}function B({submit:p,hideModal:r,show:s,msj:t,setLoading:i}){const[n,o]=f.useState(t),c=[{id:1,category:"Servicios"},{id:2,category:"Certificacioens"},{id:3,category:"Estados Financieros"},{id:4,category:"Reportes Generales"}],{data:h,setData:d,post:x,reset:j}=L({id:0,name:"",tipo:""});function p(a){if(a.preventDefault(),h.name===""||h.tipo===""){o({error:["Todos los datos son campos requeridos"]});return}i(!0),r(!0),x(route("TaskType.create"),{onSuccess:()=>{i(!1)}})}return e.jsxs(w,{show:s,children:[e.jsx("h1",{className:"w-100% py-4 text-lg text-center",children:"Nuevo Tipo de Task"}),"'",e.jsxs("form",{onSubmit:p,className:"flex flex-col gap-4 text-textgray",children:[e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-3/5",children:[e.jsx("label",{htmlFor:"name",className:"text-xs",children:"Tipo de la Task"}),e.jsx("input",{type:"text",name:"name",id:"name",required:!0,className:"h-9 rounded-md w-full outline-none",placeholder:"name del tipo",onChange:a=>d("name",a.target.value)})]}),e.jsxs("div",{className:"flex flex-col w-2/5",children:[e.jsx("label",{htmlFor:"tipo",className:"text-xs",children:"Categoria de la Task"}),e.jsxs("select",{name:"tipo",id:"tipo",className:"w-full py-1 px-2 bg-white rounded-md outline-none",required:!0,onChange:a=>d("tipo",a.target.value),children:[e.jsx("option",{value:"",children:"Selecionar Categoria"}),c.map(a=>e.jsx("option",{value:a.id,children:a.category},a.id))]})]})]}),(n==null?void 0:n.error)&&e.jsx("span",{className:"text-red-500 text-xs italic",children:n==null?void 0:n.error[0]}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{type:"button",className:"border py-1 w-36 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-5 mt-5",onClick:r,children:"Cancelar"}),e.jsx("button",{type:"submit",onClick:p,className:"border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5",children:"Guardar"})]})]})]})}function G({show:l,hideModal:r,msj:s}){return e.jsxs(w,{show:l,maxWidth:"sm",onClose:r,children:[e.jsx("img",{className:"z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  ",src:"/assets/svg/check.svg",alt:""}),e.jsxs("div",{className:"text-center relative mb-2 ",children:[e.jsx("h1",{className:"mt-14 mb-8 font-semibold",children:s==null?void 0:s.success}),e.jsx("div",{className:"hover:scale-110",children:e.jsx("button",{onClick:r,className:"bg-green-600 rounded-lg px-3 py-1 text-lg font-bold text-white  ",children:"Cerrar"})})]})]})}function _({auth:l,TaskTypes:r,msj:s,empresa:t}){const[i,n]=f.useState(r),[o,c]=f.useState(!1),[h,d]=f.useState(!1),[x,j]=f.useState(!1),[p,a]=f.useState(),[k,C]=f.useState(s==null?void 0:s.success),[T,N]=f.useState(!1),{post:M}=L({});f.useEffect(()=>{C((s==null?void 0:s.success)!=null)},[s]),f.useEffect(()=>{if(r){const b=r.map(m=>{if(delete m.created_at,delete m.updated_at,m.tipo===1)return m.categoria="Servicios",m;if(m.tipo===2)return m.categoria="Certificaciones",m;if(m.tipo===3)return m.categoria="Estados Financieros",m;if(m.tipo===4)return m.categoria="Reportes Generales",m});n(b)}},[r]);const E={"Tipo de Task":"name",Categoria:"categoria",Status:"status"};function u(b){const m=r.filter(F=>F.id===b);a(m[0])}const g=b=>{u(b),c(!0)},v=b=>{u(b),j(!0)};function y(b){b.preventDefault(),c(!1),N(!0),M(route("TaskType.delete",p.id),{onSuccess:()=>{N(!1)}})}return e.jsxs(A,{countNotificaciones:l.countNotificaciones,user:l.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Mantenimiento"}),children:[e.jsx(S,{title:"Mantenimiento"}),e.jsxs("div",{className:"container mx-auto px-4 sm:px-8",children:[e.jsxs("ul",{className:"flex flex-wrap text-sm font-medium text-center text-gray-500   mt-8 ",children:[e.jsx("li",{className:"me-2",children:e.jsx(P,{href:route("empresa.index"),className:`inline-block p-4 rounded-t-lg ${t?"activeTab":"NoactiveTab"}`,children:"Empresa"})}),e.jsx("li",{className:"me-2",children:e.jsx(P,{href:route("TaskType.index"),"aria-current":"page",className:` inline-block p-4 rounded-t-lg    ${r?"activeTab":"NoactiveTab"}`,children:"Tasks"})})]}),e.jsxs("div",{className:"mb-8 bg-gray-300 rounded-xl rounded-tl-none  p-2",children:[i&&e.jsx(W,{data:i,action:!0,tbStructure:E,onNew:()=>d(!0),onUpdate:v,onDelete:g}),h&&e.jsx(B,{show:h,hideModal:()=>d(!1),setLoading:N}),x&&e.jsx(q,{show:x,TaskTypeData:p,hideModal:()=>j(!1),setLoading:N}),e.jsx(G,{hideModal:()=>C(!1),show:k,msj:s}),T&&e.jsx(w,{maxWidth:"sm",show:T,children:e.jsx(D,{})}),e.jsx(w,{show:o,children:e.jsx(V,{hideModal:()=>c(!1),destroy:y,selectedUser:p})}),t&&e.jsx(O,{empresa:t,setLoading:N})]})]})]})}export{_ as default};
