import{o as N,_ as R,r as T,a as c,V as F,a7 as S,b as P,$ as D,E as M,f as j,h as z,g as A,l as G,p as e,q as n,t as L,m as r,z as m,R as x,v as O,A as Q,Q as H,D as _,a8 as J,ab as K,a4 as W}from"./index-994a8404.js";import{_ as X}from"./auth-container-c722073f.js";import{_ as Y,v as Z}from"./captcha-1ffa6403.js";import"./_plugin-vue_export-helper-09d269c4.js";const ee={class:"flex-col login-p"},te={style:{"margin-bottom":"40px"},class:"flex-center"},oe=r("h3",{class:"flex-1 login-p__title"},"\u5FD8\u8BB0\u5BC6\u7801",-1),se={class:"app-flex-left"},le={class:"flex align-center"},ae={class:"flex-1 flex-col justify-end login-p__btns"},de={__name:"reset-pass",setup(ne){N(()=>{document.title=`\u627E\u56DE\u5BC6\u7801-${R.title}`});let f="";const V=s=>{f=s.toUpperCase()},g=Q(),w=H(),v=T(null),o=c({phone:"",code:"",password:"",captcha:""}),C=c({phone:[{required:!0,message:"\u8BF7\u8F93\u5165\u5E10\u53F7/\u624B\u673A\u53F7",trigger:"blur"}],code:[{required:!0,message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}]});let u;const h=60,l=c({value:h,posting:!1,counting:!1}),k=F(()=>l.counting?`${l.value} s\u53EF\u91CD\u53D1`:"\u53D1\u9001\u9A8C\u8BC1\u7801"),d=()=>{!u||(clearInterval(u),u=null)},q=()=>{d(),l.value=h,l.counting=!0,u=setInterval(()=>{const s=l.value-1;s>0?l.value=s:(d(),l.counting=!1)},1e3)};S(()=>d());const E=async()=>{if(!(l.posting||l.counting))if(o.captcha.toUpperCase()!=f)_({message:"\u8BF7\u5148\u8F93\u5165\u6B63\u786E\u7684\u56FE\u7247\u9A8C\u8BC1\u7801",type:"error"});else if(!Z(o.phone))_({message:"\u8BF7\u5148\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801",type:"error"});else{const s=await J(o.phone);s&&(l.posting=!0,q()),console.log(s)}},U=async s=>{if(!s||!await s.validate())return;await K(o)&&(_({message:"\u5F00\u59CB\u63D0\u4EA4...",type:"success"}),g.push({path:"/login",replace:!0}))},$=s=>{g.push({name:s,query:w.query})};return(s,t)=>{const y=P,B=D,i=M,p=j,b=z,I=A;return L(),G("div",null,[e(X,null,{default:n(()=>[r("div",ee,[r("div",te,[oe,e(B,{underline:!1,onClick:t[0]||(t[0]=a=>$("login"))},{default:n(()=>[m(" \u767B\u5F55"),e(y,{class:"el-icon--right"},{default:n(()=>[e(x(W))]),_:1})]),_:1})]),e(I,{ref_key:"formRef",ref:v,model:o,rules:C,"label-width":"84px","label-position":"left","hide-required-asterisk":""},{default:n(()=>[e(p,{label:"\u624B\u673A\u53F7\u7801",prop:"phone"},{default:n(()=>[e(i,{modelValue:o.phone,"onUpdate:modelValue":t[1]||(t[1]=a=>o.phone=a),type:"text",placeholder:"\u8BF7\u8F93\u5165\u60A8\u7684\u5E10\u53F7"},null,8,["modelValue"])]),_:1}),e(p,{label:"\u56FE\u7247\u9A8C\u8BC1\u7801",prop:"captcha"},{default:n(()=>[r("div",se,[e(i,{modelValue:o.captcha,"onUpdate:modelValue":t[2]||(t[2]=a=>o.captcha=a),type:"text",placeholder:"\u8BF7\u8F93\u5165\u56FE\u7247\u9A8C\u8BC1\u7801"},null,8,["modelValue"]),e(Y,{onGetCaptcha:t[3]||(t[3]=a=>V(a))})])]),_:1}),e(p,{label:"\u77ED\u4FE1\u9A8C\u8BC1\u7801",prop:"code"},{default:n(()=>[r("div",le,[e(i,{class:"flex-1",modelValue:o.code,"onUpdate:modelValue":t[4]||(t[4]=a=>o.code=a),type:"text",placeholder:"\u8BF7\u586B\u5199\u77ED\u4FE1\u9A8C\u8BC1\u7801"},null,8,["modelValue"]),e(b,{type:"primary",disabled:l.posting,onClick:E},{default:n(()=>[m(O(x(k)),1)]),_:1},8,["disabled"])])]),_:1}),e(p,{label:"\u65B0\u5BC6\u7801",prop:"password"},{default:n(()=>[e(i,{modelValue:o.password,"onUpdate:modelValue":t[5]||(t[5]=a=>o.password=a),"show-password":"",type:"password",placeholder:"8-16\u4F4D\u5FC5\u987B\u5305\u542B\u6570\u5B57\u548C\u5B57\u6BCD"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),r("div",ae,[e(b,{type:"primary",onClick:t[6]||(t[6]=a=>U(v.value))},{default:n(()=>[m("\u786E\u8BA4\u4FEE\u6539")]),_:1})])])]),_:1})])}}};export{de as default};