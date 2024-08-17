import{r as o,j as e,W as p,Y as y,a as j}from"./app-CLqLlnJR.js";import{T as m,I as u}from"./TextInput-CXG85_ua.js";import{I as c}from"./InputLabel-BUJULuQT.js";import{A as b}from"./AuthenticatedLayout-DOwyOX3F.js";/* empty css            */import"./ApplicationLogo-D-kku-4I.js";import"./transition-kWffz3ZB.js";o.forwardRef(function({className:a="",children:l,...t},r){const d=r||o.useRef();return e.jsx("select",{...t,className:"border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "+a,ref:d,children:l})});o.forwardRef(function({className:a="",isFocused:l=!1,children:t,...r},d){const i=d||o.useRef();return o.useEffect(()=>{l&&i.current.focus()},[]),e.jsx("textarea",{...r,className:"border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "+a,ref:i,children:t})});function R({auth:n,whitelist:a,users:l}){const{data:t,setData:r,post:d,errors:i,reset:N}=p({whitelist_upload:"",friendly_name:a.friendly_name||"",users:l||"",_method:"PUT"}),f=s=>{s.preventDefault(),d(route("whitelist.update",a.id))},g=new FileReader;let x="";return e.jsxs(b,{user:n.user,header:e.jsx("div",{className:"flex justify-between items-center",children:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:["Edit whitelist: ",a.friendly_name]})}),children:[e.jsx(y,{title:"whitelists"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("form",{onSubmit:f,className:"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg",children:[a.image_path&&e.jsx("div",{className:"mb-4",children:e.jsx("img",{src:a.image_path,className:"w-64"})}),e.jsxs("div",{children:[e.jsx(c,{htmlFor:"whitelist_upload",value:"Whitelist File (JSON only, not required)",className:"text-gray-800 dark:text-gray-200"}),e.jsx(m,{id:"whitelist_upload",type:"file",name:"whitelist_upload",className:"mt-1 block w-full dark:text-gray-200",onChange:s=>{g.readAsText(s.target.files[0]),g.onload=function(h){x=h.target.result,r("whitelist_upload",x)}}}),e.jsx(u,{message:i.whitelist_upload,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(c,{htmlFor:"friendly_name",className:"text-gray-800 dark:text-gray-200",value:"Friendly Name"}),e.jsx(m,{id:"friendly_name",type:"text",name:"friendly_name",value:t.friendly_name,className:"mt-1 block w-full",isFocused:!0,placeholder:"My Favorite Server!",onChange:s=>r("friendly_name",s.target.value)}),e.jsx(u,{message:i.friendly_name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(c,{htmlFor:"users",className:"text-gray-800 dark:text-gray-200",value:"Users (Comma Separated)"}),e.jsx(m,{id:"users",type:"text",name:"users",value:t.users,className:"mt-1 block w-full",isFocused:!1,placeholder:"gamer101, apex_rocks13011, brettames11",onChange:s=>r("users",s.target.value)}),e.jsx(u,{message:i.users,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4 text-right",children:[e.jsx(j,{href:route("whitelist.edit",a.id),className:"bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2",children:"Cancel"}),e.jsx("button",{className:"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600",children:"Submit"})]})]})})})})]})}export{R as default};
