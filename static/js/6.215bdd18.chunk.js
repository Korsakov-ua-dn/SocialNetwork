(this.webpackJsonpsocialnetwork=this.webpackJsonpsocialnetwork||[]).push([[6],{101:function(e,s,a){"use strict";a.r(s);var t=a(2),n=(a(0),a(90)),i=a.n(n),r=a(13),c=a(91),o=a(1),l=function(e){var s="/dialogs/".concat(e.id);return Object(o.jsxs)("div",{className:i.a.dialog+" "+i.a.active,children:[Object(o.jsx)("div",{className:i.a.avatar,children:Object(o.jsx)("img",{src:c.a,alt:"userAvatar"})}),Object(o.jsx)(r.b,{to:s,children:e.name})]})},d=function(e){return Object(o.jsx)("div",{className:i.a.message,children:e.message})},u=a(88),g=function(e){var s,a,n=Object(u.a)(),r=n.register,c=n.handleSubmit,l=n.formState.errors;return Object(o.jsxs)("form",{onSubmit:c((function(s){return e.sendMessage(s.newMessageBody)})),className:i.a.sendWrapper,children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("textarea",Object(t.a)(Object(t.a)({},r("newMessageBody",{required:!0,maxLength:{value:10,message:"max length 10"}})),{},{placeholder:"Enter message"})),Object(o.jsx)("input",{type:"submit",value:"send"})]}),"required"===(null===(s=l.newMessageBody)||void 0===s?void 0:s.type)&&Object(o.jsx)("span",{children:"Field is required"}),(null===(a=l.newMessageBody)||void 0===a?void 0:a.message)&&Object(o.jsx)("span",{children:l.newMessageBody.message})]})},j=function(e){var s=e.dialogsData.map((function(e){return Object(o.jsx)(l,{name:e.name,id:e.id},e.id)})),a=e.messagesData.map((function(e){return Object(o.jsx)(d,{message:e.message,id:e.id},e.id)}));return Object(o.jsxs)("div",{className:i.a.dialogs,children:[Object(o.jsx)("div",{className:i.a.dialogItems,children:s}),Object(o.jsxs)("div",{className:i.a.messages,children:[Object(o.jsx)("div",{children:a}),Object(o.jsx)(g,{sendMessage:e.sendMessage})]})]})},b=a(45),m=a(15),O=a(19),f=a(92),v=a(5),h=["isAuth"],x=function(e){return{isAuth:e.auth.isAuth}};s.default=Object(m.c)(Object(O.b)((function(e){return{dialogsData:e.dialogsPage.dialogsData,messagesData:e.dialogsPage.messagesData}}),(function(e){return{sendMessage:function(s){return e(Object(b.b)(s))}}})),(function(e){return Object(O.b)(x)((function(s){var a=s.isAuth,n=Object(f.a)(s,h);return a?Object(o.jsx)(e,Object(t.a)({},n)):Object(o.jsx)(v.a,{to:"/login"})}))}))(j)},90:function(e,s,a){e.exports={avatar:"Dialogs_avatar__3cCQ9",dialogs:"Dialogs_dialogs__y_Nd1",dialogItems:"Dialogs_dialogItems__2zA9g",active:"Dialogs_active__w-kk1",dialog:"Dialogs_dialog__yolLc",messages:"Dialogs_messages__1MO4E"}},91:function(e,s,a){"use strict";s.a=a.p+"static/media/null-avatar-icon.6545822b.png"},92:function(e,s,a){"use strict";function t(e,s){if(null==e)return{};var a,t,n=function(e,s){if(null==e)return{};var a,t,n={},i=Object.keys(e);for(t=0;t<i.length;t++)a=i[t],s.indexOf(a)>=0||(n[a]=e[a]);return n}(e,s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)a=i[t],s.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}a.d(s,"a",(function(){return t}))}}]);
//# sourceMappingURL=6.215bdd18.chunk.js.map