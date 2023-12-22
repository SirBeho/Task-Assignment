import{j as e,r as n,W as V,a as H}from"./app-67a9b6ea.js";import{A as I}from"./AuthenticatedLayout-71ac0110.js";import{f as N}from"./index-af05e076.js";import{M as E}from"./Modal-c7427ea3.js";import"./transition-7475cba5.js";import"./typeof-7fd5df1e.js";const J=({data:t,click:v,open:l,adm:x})=>{const h=N(new Date(t.created_at),"dd/MM/yyyy hh:mm:ss a"),o=["bg-blue-500","bg-yellow-500","bg-cyan-500","bg-blue-800"],r=["bg-lime-100","bg-orange-100","bg-orange-100","bg-red-100","bg-red-100","bg-green-100"];return e.jsxs("li",{onClick:v,className:`flex w-80 ${r[t.status_id-1]} ${l==t.id?"border-2 scale-90":""} duration-300 rounded-md cursor-pointer`,children:[e.jsx("div",{className:`max-h-[740px] min-h-full w-2 ${o[t.tipo.tipo-1]} rounded-l-lg`}),e.jsxs("div",{className:"flex flex-col gap-2 p-2 text-textgray w-full",children:[x?e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:t.user.name}),e.jsxs("span",{children:["#",t.numero]})]}):e.jsxs("span",{children:["Task: ",t.numero]}),e.jsxs("p",{className:"font-medium text-sm",children:[t.tipo.name,t.tipo_id==1?" "+t.descripcion:""]}),e.jsxs("div",{className:"flex justify-between pe-5 ",children:[e.jsx("span",{className:"text-xs",children:h}),e.jsx("span",{className:"text-xs",children:t.status.name})]})]})]})};function ee({auth:t,TaskTypes:v,msj:l,Task_id:x,statusList:h}){var W;const o=t.user.Tasks.filter(s=>s.tipo_id>2),[r,y]=n.useState(null),[d,M]=n.useState(0),[C,A]=n.useState(0),[f,F]=n.useState(o),[B,c]=n.useState(!1),{data:p,setData:u,post:k}=V(null),[R,g]=n.useState(l!=null),[U,S]=n.useState(!1),[D,$]=n.useState(""),[b,q]=n.useState(!1),[i,w]=n.useState({estado:0,todas:!1,texto:""});n.useEffect(()=>{if(F(o),d){const s=o.find(a=>a.id===d);y(s),u(s)}},[t.user.Tasks]),n.useEffect(()=>{((l==null?void 0:l.error)==null||(l==null?void 0:l.error)==[])&&($(""),g(l!=null))},[l]),n.useEffect(()=>{x&&!d&&L(parseInt(x))},[x]),n.useEffect(()=>{console.log(i);const s=o.filter(a=>(console.log(a),!(i.estado&&a.status_id!==i.estado||!i.todas&&a.status_id>4&&i.estado<4||i.texto&&!JSON.stringify(a).toLowerCase().includes(i.texto))));F(s)},[i]);const L=s=>{if(d==s)M(0),setTimeout(()=>y(null),500);else{M(s);const a=o.find(m=>m.id===s);y(a),u(a)}},T=s=>{C==s?A(0):A(s)},z=s=>{const a=s.id,m=s.name+"."+s.extencion;axios.post("/download",{id:a},{responseType:"blob"}).then(_=>{const G=window.URL.createObjectURL(new Blob([_.data])),j=document.createElement("a");j.href=G,j.setAttribute("download",m),document.body.appendChild(j),j.click()}).catch(_=>{console.error("Error al descargar el archivo:",_)})},O=s=>{s.preventDefault(),k(route("Task.update"))};return e.jsxs(I,{user:t.user,msj:l,countNotificaciones:t.countNotificaciones,Task_id:d,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Administración de Tasks"}),children:[e.jsx(H,{title:"Tasks"}),e.jsx("div",{className:" pb-1  ",children:e.jsxs("div",{className:" m-5 h-full bg-white shadow-lg   rounded-md gap-10 p-10 pt-4",children:[e.jsxs("div",{className:"flex gap-3 mb-5 border-b-2 pb-2",children:[e.jsxs("label",{className:" flex items-center border-2 border-black w-80 h-9 text-sm bg-white rounded-lg overflow-hidden p-2 font-medium",children:["Buscar",e.jsx("input",{onChange:s=>w({...i,texto:s.target.value}),className:"border-none h-full w-full outline-none focus:ring-0"})]}),e.jsx("div",{className:"cursor-pointer flex items-center",onClick:()=>{q(!b),b&&w({estado:0,todas:!1,texto:i.texto})},children:e.jsx("img",{className:"w-5 h-5",src:`/assets/svg/${b?"nofilter.svg":"filter.svg"}`,alt:""})}),e.jsx("div",{className:`${b?"w-[35rem]":"w-0"} overflow-hidden transition-all duration-500`,children:e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("label",{className:"flex gap-3 items-center",children:[e.jsx("span",{className:"font-semibold",children:" Estados:"}),e.jsxs("select",{required:!0,value:i.estado,onChange:s=>w({...i,estado:parseInt(s.target.value)}),name:"tipo_id",id:"tipo_id",className:"p-0 px-2 w-fit rounded-md h-8",children:[e.jsx("option",{value:0,select:!0,children:"Todas"}),h.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]})]}),e.jsxs("label",{className:" relative inline-flex gap-2 cursor-pointer select-none items-center ",children:[e.jsx("span",{className:"whitespace-nowrap",children:"Mostras Completas: "}),e.jsx("input",{type:"checkbox",name:"autoSaver",className:"sr-only",checked:i.todas,onChange:s=>w({...i,todas:s.target.checked})}),e.jsx("span",{className:` mr-3 flex h-[24px] w-[43px] items-center rounded-full p-1 duration-200  ${i.todas?"bg-blue-500":"bg-[#CCCCCE]"}`,children:e.jsx("span",{className:` h-[17px] w-[17px] rounded-full bg-white duration-200 ${i.todas?"translate-x-4":""}`})})]})]})})]}),e.jsxs("div",{className:"flex  gap-16",children:[e.jsx("ul",{className:"flex flex-col col gap-4 overflow-hidden overflow-y-scroll  h-full max-h-[740px] p-2 rounded-md pe-8  ",children:f!=null&&f.length?f.map(s=>e.jsx(J,{adm:t.user.id!=2,data:s,click:()=>L(s.id),open:d},s.id)):e.jsx("h1",{children:"No hay Tasks"})}),e.jsx("div",{className:`flex flex-col gap-3  ${d?"w-[600px]":"w-0 opacity-0 "}   p-4 bg-gray-200 rounded-md shadow-xl ms-4    overflow-hidden transition-all duration-500 `,children:r?e.jsxs(e.Fragment,{children:[e.jsx("table",{children:e.jsxs("tbody",{className:" bg-white py-2 p-4 rounded-md flex justify-between ",children:[e.jsxs("tr",{className:"w-full",children:[e.jsx("td",{className:"font-bold w-44 py-2 whitespace-nowrap",children:"name solicitante"}),e.jsx("td",{className:"",children:r.user.name})]}),r.status_id==1&&t.user.id==r.user.id&&e.jsx("div",{className:"font-bold  flex justify-end items-center",children:e.jsx("button",{onClick:()=>c(!0),className:"bg-blue-400 px-2 py-1 rounded-lg font-semibold text-white",children:" Editar "})})]})}),e.jsx("div",{className:"bg-white  py-2 p-4 rounded-md overflow-hidden opacity-100",children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{className:"w-fit p-6",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"Número Task"}),e.jsx("td",{children:r.numero})]}),e.jsxs("tr",{className:"w-fit",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"Fecha"}),e.jsx("td",{children:N(new Date(r.created_at),"dd/MM/yyyy hh:mm:ss a")})]}),e.jsxs("tr",{className:"w-fit",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"Tramite"}),e.jsx("td",{children:r.tipo.name})]}),t.user.rol_id!==2&&e.jsxs(e.Fragment,{children:[e.jsxs("tr",{className:"w-fit",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"name empresa"}),e.jsx("td",{children:r.user.empresa})]}),e.jsxs("tr",{className:"w-fit",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"RNC"}),e.jsx("td",{children:r.user.rnc})]}),e.jsxs("tr",{className:"w-fit",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"Télefono"}),e.jsx("td",{children:r.user.telefono})]}),e.jsxs("tr",{className:"w-fit",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"Correo"}),e.jsx("td",{children:r.user.email})]})]}),e.jsxs("tr",{className:"w-fit",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"Estatus"}),e.jsxs("td",{className:"flex gap-2 py-2",children:[r.status.name,t.user.rol_id!=2&&e.jsx("span",{onClick:()=>S(!0),className:"cursor-pointer text-blue-600",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"})})})]})]}),e.jsxs("tr",{className:"w-fit",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"Descripcion"}),e.jsx("td",{children:e.jsx("p",{className:"text-justify",children:r.descripcion})})]}),e.jsxs("tr",{className:"w-fit",children:[e.jsx("td",{className:"font-bold w-44 py-2",children:"Usuario Asignado"}),e.jsx("td",{children:e.jsx("p",{className:"text-justify",children:((W=r.user_asignado)==null?void 0:W.name)||"Sin Asignar"})})]})]})})}),e.jsxs("div",{className:"flex flex-col w-full border h-92 p-4 py-2 gap-2 rounded-md bg-white",children:[e.jsx("span",{className:"font-semibold",children:"Comentarios"}),e.jsx("div",{className:"flex flex-col",children:(l==null?void 0:l.error)&&Array.isArray(l==null?void 0:l.error)&&l.error.map((s,a)=>e.jsx("h1",{className:"flex w-full text-red-400",children:s},a))}),t.user.rol_id!=2&&e.jsxs("div",{className:"flex justify-between w-full gap-5",children:[e.jsx("span",{className:"w-20",children:"Task Assignment:"}),e.jsx("input",{value:D,onChange:s=>$(s.target.value),type:"text",className:"h-8 w-full rounded-md"}),e.jsx("label",{onClick:()=>k(route("comentario.create",{Task_id:r.id,comentario:D})),className:"bg-blue-500 px-2 py-1 rounded-lg font-semibold text-white min-w-fit cursor-pointer",children:" Agregar"})]}),e.jsx("div",{className:"flex flex-wrap gap-1",children:r.comentarios.filter(s=>s.status==1).map(s=>e.jsxs("div",{className:"flex gap-3 w-full group ",children:[e.jsxs("div",{className:"flex flex-col justify-between",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"w-20",children:"Task Assignment:"}),e.jsxs("span",{className:"hidden text-sm group-hover:block ",children:[" ",s.created_at&&N(new Date(s.created_at),"dd/MM/yyyy")]})]}),e.jsx("span",{className:"hidden  mt-2 group-hover:block cursor-pointer self",onClick:()=>k(route("comentario.destroy",{comentario_id:s.id})),children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6 hover:stroke-red-600",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})})})]}),e.jsx("span",{className:"overflow-hidden text-ellipsis whitespace-nowrap rounded-md block w-full  group-hover:overflow-visible group-hover:whitespace-normal",children:s.comentario})]},s.id))})]}),e.jsxs("div",{className:"flex flex-col w-full border h-92 p-4 py-2 gap-6 rounded-md bg-white",children:[e.jsxs("div",{className:"flex justify-between w-full",children:[e.jsx("span",{className:"font-semibold",children:"Archivos Subidos"}),r.status_id<4&&t.user.rol_id==2&&e.jsx("label",{htmlFor:"file",className:"bg-upload px-2 py-1 rounded-lg font-semibold text-white",children:" Agregar + "})]}),e.jsx("div",{className:"flex flex-wrap gap-1",children:r.files.filter(s=>s.user.rol_id===2).map(s=>{const a=t.user.rol_id==1||t.user.id==s.user.id;return e.jsxs("div",{onClick:()=>T(s.id),className:"text-center w-16 group relative cursor-pointer",children:[e.jsxs("div",{className:"w-16 relative",children:[e.jsx("img",{className:"w-full",src:`/assets/svg/${s.extencion}.svg`,alt:"",onError:m=>m.target.src="/assets/svg/file3.svg"}),s.confidencial?e.jsx("img",{src:"/assets/confidencial.png",className:`absolute top-0 ${a&&"w-1/2"} `,alt:""}):null,C==s.id&&(!s.confidencial||a)?e.jsx("img",{onClick:()=>z(s),src:"/assets/svg/descargar.svg",alt:"",className:"z-20 top-10 left-14 w-8 absolute transform -translate-x-1/2 hover:scale-125 "}):null]}),e.jsx("span",{className:" left-1/2 transform -translate-x-1/2  relative overflow-hidden text-ellipsis whitespace-nowrap rounded-md block w-16 group-hover:bg-gray-200 group-hover:px-1 group-hover:overflow-visible group-hover:w-fit group-hover:z-10",children:s.name})]},s.id)})})]}),e.jsxs("div",{className:"flex flex-col w-full border h-92 p-4 py-2 gap-6 rounded-md bg-white",children:[e.jsxs("div",{className:"flex justify-between w-full",children:[e.jsx("span",{className:"font-semibold",children:"Entregas"}),t.user.rol_id!=2&&e.jsx("label",{htmlFor:"file",className:"bg-upload px-2 py-1 rounded-lg font-semibold text-white",children:" Agregar + "})]}),e.jsx("div",{className:"flex flex-wrap gap-1",children:r.files.filter(s=>s.user.rol_id!=2).map(s=>e.jsxs("div",{onClick:()=>T(s.id),className:"text-center w-16 group relative cursor-pointer",children:[e.jsxs("div",{className:"w-16 relative",children:[e.jsx("img",{className:"w-full",src:`/assets/svg/${s.extencion}.svg`,alt:"",onError:a=>a.target.src="/assets/svg/file3.svg"}),C==s.id?e.jsx("img",{onClick:()=>z(s),src:"/assets/svg/descargar.svg",alt:"",className:"z-20 top-10 left-14 w-8 absolute transform -translate-x-1/2 hover:scale-125 "}):null]}),e.jsx("span",{className:" left-1/2 transform -translate-x-1/2  relative overflow-hidden text-ellipsis whitespace-nowrap rounded-md block w-16 group-hover:bg-gray-200 group-hover:px-1 group-hover:overflow-visible group-hover:w-fit group-hover:z-10",children:s.name})]},s.id))})]}),e.jsxs(E,{show:B,onClose:()=>{g(!1),c(!1)},children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{onClick:()=>c(!1),className:"px-2 font-bold hover:bg-gray-300 rounded-lg",children:"x"})}),e.jsxs("form",{onSubmit:O,className:"flex flex-col w-full gap-4 text-textgray p-4",children:[e.jsxs("label",{htmlFor:"name",className:"text-xs flex flex-col ",children:["Numero de Task",e.jsx("input",{disabled:!0,type:"text",id:"name",name:"name",value:p.numero,className:"h-9 rounded-md  outline-none px-2"})]}),e.jsxs("div",{className:"flex gap-4 justify-between ",children:[e.jsxs("label",{className:"text-xs flex flex-col  w-full",children:["Task",e.jsxs("select",{required:!0,name:"Task_id",id:"Task_id",value:p.tipo_id,onChange:s=>u("tipo_id",s.target.value),className:"h-9 rounded-md  outline-none px-2",children:[e.jsx("option",{value:"",children:"Seleccione servicio"}),v.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]})]}),e.jsxs("label",{htmlFor:"date",className:"text-xs flex flex-col max-w-[10rem]",children:["Fecha",e.jsx("input",{disabled:!0,type:"text",id:"date",name:"date",value:N(new Date(p.created_at),"dd/MM/yyyy hh:mm:ss a"),className:"h-9 rounded-md w-full outline-none px-2"})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"descripcion",className:"text-xs",children:"Descripcion"}),e.jsx("textarea",{value:p.descripcion,onChange:s=>u("descripcion",s.target.value),placeholder:"Escribe tu descripcion",name:"descripcion",id:"descripcion",className:"w-full resize-none h-28 p-3 rounded-md outline-none "})]}),e.jsx("div",{className:"flex flex-col",children:(l==null?void 0:l.error)&&Array.isArray(l==null?void 0:l.error)&&l.error.map((s,a)=>e.jsx("h1",{className:"flex w-full text-red-400",children:s},a))}),e.jsx("button",{className:"border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-center justify-center mr-5 mt-5",children:"Guardar"})]})]})]}):null})]})]})}),e.jsxs(E,{show:R,maxWidth:"sm",onClose:()=>{g(!1),c(!1)},children:[e.jsx("img",{className:"z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  ",src:"/assets/svg/check.svg",alt:""}),e.jsxs("div",{className:"text-center relative mb-2 ",children:[e.jsx("h1",{className:"mt-14 mb-8 font-semibold",children:l==null?void 0:l.success}),e.jsx("div",{className:"hover:scale-110",children:e.jsx("button",{onClick:()=>{g(!1),c(!1),S(!1)},className:"bg-green-600 rounded-lg px-3 py-1     text-lg font-bold text-white  ",children:"Cerrar"})})]})]}),e.jsx(E,{show:U,maxWidth:"sm",children:e.jsxs("div",{className:"flex flex-col items-center gap-5 relative  ",children:[e.jsx("h1",{className:"font-semibold text-xl",children:"Cambiar estado de Task"}),e.jsx("select",{name:"statusTask",id:"statusTask",defaultValue:r==null?void 0:r.status.id,onChange:s=>u("status_id",s.target.value),className:"w-60 h-9 rounded-md  outline-none",children:h.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))}),e.jsxs("div",{className:"flex justify-evenly w-full",children:[e.jsx("div",{className:"hover:scale-110",children:e.jsx("button",{onClick:()=>{S(!1),c(!1)},className:"bg-green-600 rounded-lg px-3 py-1     text-lg font-bold text-white  ",children:"Cancelar"})}),e.jsx("div",{className:"hover:scale-110",children:e.jsx("button",{onClick:O,className:"bg-blue-600 rounded-lg px-3 py-1     text-lg font-bold text-white  ",children:"Guardar"})})]})]})})]})}export{ee as default};
