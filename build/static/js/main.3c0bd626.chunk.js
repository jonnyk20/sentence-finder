(this["webpackJsonpone-click-quiz"]=this["webpackJsonpone-click-quiz"]||[]).push([[0],{77:function(e,t,a){e.exports=a(97)},82:function(e,t,a){},83:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){},89:function(e,t,a){},91:function(e,t,a){},95:function(e,t,a){},97:function(e,t,a){"use strict";a.r(t);var n,r,c=a(0),o=a.n(c),l=a(9),i=a.n(l),s=(a(82),a(83),a(69)),u=a(24),m=a(56),d=a(14),v=a(28),f=a(21),p=a.n(f),g=a(32),E=a(133),h=a(30),b=a(131),N=a(126),j=a(134),w=Object(b.a)(N.a,j.a),O=function(e){return!w(e)},_=(window.location.host.includes("localhost"),a(61)),k=a.n(_);a(87);!function(e){e.NARROW="narrow",e.NORMAL="normal",e.WIDE="wide",e.FULL="full"}(n||(n={})),function(e){e.SMALL="small",e.NORMAL="normal",e.LARGE="large"}(r||(r={}));var x,S,y=function(e){var t=e.onClick,a=e.children,n=e.size,c=void 0===n?r.NORMAL:n,l=k()("button",Object(v.a)({},"".concat("button","--size-").concat(c),!0));return o.a.createElement("div",{className:l,onClick:t},a)};!function(e){e[e.INPUTTING=0]="INPUTTING",e[e.PREPARING=1]="PREPARING",e[e.READY=2]="READY",e[e.FAILED=3]="FAILED"}(x||(x={})),function(e){e.FR="fra",e.SP="spa",e.JA="jpn",e.EN="eng"}(S||(S={}));a(88);var A,I=a(130),L=a(132),R=a(65),C=a.n(R),F=8,P=(a(89),function(e){var t=e.items,a=e.setItems,n=Object(c.useState)(3),r=Object(d.a)(n,2),l=r[0],i=r[1],s=Object(c.useState)(""),u=Object(d.a)(s,2),m=u[0],v=u[1],f=Object(c.useState)(!1),p=Object(d.a)(f,2),g=p[0],E=p[1],h=function(){if(!g){var e=t.size-1;return E(!0),void i(e)}var n=Array.from(t).pop();if(!Object(N.a)(n)){var r=new Set(t);r.delete(n),a(r)}v(""),E(!1)},b=Array.from(t).map((function(e,n){return function(e,t){var a=e.text,n=e.isFocused,r=e.handleClick,c=e.handleDelete;e.className;return o.a.createElement(L.a,{key:t,className:"".concat("chips-input","__chips__chip"),style:{backgroundColor:n?C.a[300]:void 0},onClick:r,onDelete:c,label:a})}({text:e,isFocused:l===n&&g,handleClick:function(){return i(n)},handleDelete:function(){return function(e,n){var r=new Set(t);r.delete(e),a(r)}(e)},className:"text"},n)}));return o.a.createElement("div",{className:"chips-input"},o.a.createElement("div",{className:"".concat("chips-input","__chips")},b),o.a.createElement(I.a,{id:"standard-textarea",multiline:!0,className:"{classes.textField}",margin:"normal",value:m,fullWidth:!0,onChange:function(e){var n=e.target,r=n.value,c=/; |;|, |,|\n/,o=c.test(r);if(Object(j.a)(r))h();else{if(o){console.log("contains",r);var l=r.trim().split(c),i=new Set(t);return l.forEach((function(e){O(e)&&i.add(e)})),a(i),void v("")}v(n.value)}},placeholder:"Enter words here, separated by new lines or commas, then press enter",onKeyDown:function(e){Object(j.a)(m)&&e.keyCode===F&&h()}}))}),T=(a(91),function(e){var t=e.key,a=e.label;return o.a.createElement("option",{value:t,className:"seleciton-list__item",key:t},a)}),D=function(e){var t=e.options,a=e.defaultText,n=e.onChange,r=e.initialValue,l=Object(c.useState)(r||""),i=Object(d.a)(l,2),s=i[0],u=i[1];return o.a.createElement("select",{className:"selection-list",value:s,onChange:function(e){var t=e.target,a=t.value;u(t.value),n(a)}},w(a)&&o.a.createElement("option",{value:"",disabled:!0},a),t.map(T))},M=a(66),U=a.n(M),z=a(51),G=a(53),W=(a(95),function(e){var t=e.vocabItems,a=(e.sourceLang,e.translationLang,Object(c.useState)((function(){var e=new Map;return Object(h.a)(t.keys()).forEach((function(t){return e.set(t,0)})),e}))),n=Object(d.a)(a,2),l=n[0],i=n[1],s=Object(c.useRef)(null);return o.a.createElement("div",{className:"".concat("words-export")},o.a.createElement("div",{className:"".concat("words-export","__prompt")},o.a.createElement("div",null,o.a.createElement("div",{className:"text-bold"},"Pick sentences and save them"),o.a.createElement("div",null,"Click ",o.a.createElement(z.a,{icon:G.a,size:"1x"})," to change sentences")),o.a.createElement(y,{onClick:function(){var e=Object(h.a)(t.keys()).filter((function(e){return O(t.get(e))})).map((function(e){var a=t.get(e).sentences[l.get(e)],n=null===a||void 0===a?void 0:a.translations[0];return{word:e,sentence:a.original,sentenceTranslation:n}})),a=U.a.unparse(e),n=new Blob([a],{type:"text/csv;charset=utf-8;"}),r=window.URL.createObjectURL(n),c=s.current;(null===c||void 0===c?void 0:c.href)&&(c.href=r,c.click())},size:r.SMALL},"Save CSV")),o.a.createElement("div",{className:"".concat("words-export","__vocab-items")},o.a.createElement("div",{className:"".concat("words-export","__vocab-items__item")},o.a.createElement("div",{className:"border-right padding-5 flex"},o.a.createElement("b",null,"Word")),o.a.createElement("div",{className:"border-right padding-5 flex"},"Sentence"),o.a.createElement("div",{className:"border-right padding-5 flex"},"Translation"),o.a.createElement("div",{className:"padding-5 flex fd-column jc-around"},"Change")),Array.from(t.entries()).map((function(e,a){var n,c=Object(d.a)(e,2),s=c[0],u=c[1],m=null===u||void 0===u||null===(n=u.sentences)||void 0===n?void 0:n[l.get(s)],v=null===m||void 0===m?void 0:m.original,f=null===m||void 0===m?void 0:m.translations[0];return o.a.createElement("div",{key:a,className:"".concat("words-export","__vocab-items__item")},o.a.createElement("div",{className:"border-right padding-5 flex"},s),w(u)&&o.a.createElement("div",{className:"".concat("words-export","__vocab-items__item__loading-indicator border-right padding-5 flex grid-column-3")},"Loading..."),O(u)&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"border-right padding-5 flex"},v),o.a.createElement("div",{className:"border-right padding-5 flex"},f),o.a.createElement("div",{className:"padding-5 flex fd-column jc-around"},o.a.createElement(y,{onClick:function(){return function(e){var a=l.get(e),n=t.get(e),r=a===Math.max((null===n||void 0===n?void 0:n.sentences).length-1,0)?0:a+1,c=new Map(l);c.set(e,r),i(c)}(s)},size:r.SMALL},o.a.createElement(z.a,{icon:G.a,size:"1x"})))))}))),o.a.createElement("a",{href:"null",download:"vocab.csv",ref:s,style:{display:"none"}},"Download"))}),J=function(){var e=Object(g.a)(p.a.mark((function e(t){var a,n,r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.words,n=t.languageFrom,r=t.languageTo,c=t.onUpdate,a.forEach(function(){var e=Object(g.a)(p.a.mark((function e(t){var a,o,l;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat("https://sentence-finder-backend.herokuapp.com","/search?word=").concat(t,"&language_from=").concat(n,"&language_to=").concat(r));case 3:return a=e.sent,e.next=6,a.json();case 6:o=e.sent,l=o.vocab_item,console.log("json",o),console.log("vocabItem",l),c(l),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(0);case 15:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=new Set(["hielo","hormiga","reconocer"]),B=(A={},Object(v.a)(A,S.FR,"French"),Object(v.a)(A,S.SP,"Spanish"),Object(v.a)(A,S.JA,"Japanese"),Object(v.a)(A,S.EN,"English"),A),q=Object.entries(B).map((function(e){var t=Object(d.a)(e,2);return{key:t[0],label:t[1]}})),Y=function(){var e=Object(c.useState)(V),t=Object(d.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)(new Map),l=Object(d.a)(r,2),i=l[0],s=l[1],u=Object(c.useState)(null),m=Object(d.a)(u,2),v=m[0],f=(m[1],Object(c.useState)(S.EN)),h=Object(d.a)(f,2),b=h[0],N=h[1],j=Object(c.useState)(S.SP),w=Object(d.a)(j,2),_=w[0],k=w[1],A=Object(c.useState)(x.INPUTTING),I=Object(d.a)(A,2),L=I[0],R=I[1],C=Array.from(a).filter(O),F=function(){var e=Object(g.a)(p.a.mark((function e(t){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==Object(E.a)(C).length){e.next=2;break}return e.abrupt("return");case 2:t.preventDefault(),a={words:Object(E.a)(C),languageFrom:_,languageTo:b,onUpdate:function(e){s((function(t){var a=new Map(t);return a.set(e.word,e),a}))}},console.log("sending",a),null===v||void 0===v||v.emit("get-sentences",a),n=new Map,C.forEach((function(e){return n.set(e,null)})),s(n),J(a),R(x.PREPARING);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){}),[]);var T=L===x.INPUTTING,M=L===x.PREPARING,U=L===x.FAILED;return o.a.createElement("div",{className:"sentence-finder container"},o.a.createElement("div",null,o.a.createElement("h2",null,"Sentence Finder \ud83c\udf0d")),T&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"mb-10 text-light-color text-light"},"Automatic sentence cards for language learners"),o.a.createElement("div",{className:"sentence-finder__form"},o.a.createElement("div",{className:"sentence-finder__form__language-selection"},o.a.createElement("div",null,"Native Language"),o.a.createElement(D,{options:q,onChange:function(e){N(e)},initialValue:b})),o.a.createElement("div",{className:"sentence-finder__form__language-selection"},o.a.createElement("div",null,"Target Language"),o.a.createElement(D,{options:q,defaultText:"e.g. Reptiles",onChange:function(e){k(e)},initialValue:_})),o.a.createElement("div",{className:"sentence-finder__form__submission mv-20"},o.a.createElement("div",{className:"mr-10"},"Enter ".concat(B[_]," words below and then click 'Find Sentences'")),o.a.createElement(y,{onClick:F},"Find Sentences")),o.a.createElement("div",{className:"sentence-finder__form__input"},o.a.createElement(P,{items:a,setItems:n})))),M&&o.a.createElement("div",null,o.a.createElement(W,{vocabItems:i,sourceLang:_,translationLang:b})),U&&o.a.createElement("div",{className:"mv-20"},o.a.createElement("div",{className:"mb-20"},"Failed to Find Sentences"),o.a.createElement(y,{onClick:function(){n(V),R(x.INPUTTING)}},"Try again")))},K=a(67),Q=a(68),$=a(71),H=a(72),X=encodeURI("1 Click Quiz - Error"),Z=function(e){Object(H.a)(a,e);var t=Object($.a)(a);function a(e){var n;return Object(K.a)(this,a),(n=t.call(this,e)).state={hasError:!1},n}return Object(Q.a)(a,[{key:"componentDidCatch",value:function(e,t){console.error(e,t)}},{key:"render",value:function(){return this.state.hasError?o.a.createElement("div",{className:"error-boundary container text-center"},o.a.createElement("h1",null,"Something went wrong."),o.a.createElement("div",{className:"mv-50"},"Please\xa0",o.a.createElement("a",{className:"text-light-color",href:"mailto:jonnyk_78@hotmail.com?subject=".concat(X),target:"_blank",rel:"noopener noreferrer"},"email me for help"))):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),a}(o.a.Component);m.a.initialize("UA-33174971-5"),m.a.pageview(window.location.pathname+window.location.search);var ee=function(){return o.a.createElement(s.a,null,o.a.createElement("div",{className:"app","data-testid":"app"},o.a.createElement(Z,null,o.a.createElement("div",{className:"appp__bg-overlay"}),o.a.createElement(u.c,null,o.a.createElement(u.a,{path:"/"},o.a.createElement(Y,null))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(ee,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[77,1,2]]]);
//# sourceMappingURL=main.3c0bd626.chunk.js.map