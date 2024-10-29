import{g as me}from"./@babel-a2e15b44.js";function we(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const i=e[t],l=typeof i;(l==="object"||l==="function")&&!Object.isFrozen(i)&&we(i)}),e}class he{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function xe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function C(e,...t){const i=Object.create(null);for(const l in e)i[l]=e[l];return t.forEach(function(l){for(const b in l)i[b]=l[b]}),i}const Qe="</span>",pe=e=>!!e.scope,qe=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const i=e.split(".");return[`${t}${i.shift()}`,...i.map((l,b)=>`${l}${"_".repeat(b+1)}`)].join(" ")}return`${t}${e}`};class et{constructor(t,i){this.buffer="",this.classPrefix=i.classPrefix,t.walk(this)}addText(t){this.buffer+=xe(t)}openNode(t){if(!pe(t))return;const i=qe(t.scope,{prefix:this.classPrefix});this.span(i)}closeNode(t){pe(t)&&(this.buffer+=Qe)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const de=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class te{constructor(){this.rootNode=de(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const i=de({scope:t});this.add(i),this.stack.push(i)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,i){return typeof i=="string"?t.addText(i):i.children&&(t.openNode(i),i.children.forEach(l=>this._walk(t,l)),t.closeNode(i)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(i=>typeof i=="string")?t.children=[t.children.join("")]:t.children.forEach(i=>{te._collapse(i)}))}}class tt extends te{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,i){const l=t.root;i&&(l.scope=`language:${i}`),this.add(l)}toHTML(){return new et(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function j(e){return e?typeof e=="string"?e:e.source:null}function Oe(e){return B("(?=",e,")")}function nt(e){return B("(?:",e,")*")}function it(e){return B("(?:",e,")?")}function B(...e){return e.map(i=>j(i)).join("")}function st(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ne(...e){return"("+(st(e).capture?"":"?:")+e.map(l=>j(l)).join("|")+")"}function Re(e){return new RegExp(e.toString()+"|").exec("").length-1}function rt(e,t){const i=e&&e.exec(t);return i&&i.index===0}const ct=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ie(e,{joinWith:t}){let i=0;return e.map(l=>{i+=1;const b=i;let _=j(l),c="";for(;_.length>0;){const r=ct.exec(_);if(!r){c+=_;break}c+=_.substring(0,r.index),_=_.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?c+="\\"+String(Number(r[1])+b):(c+=r[0],r[0]==="("&&i++)}return c}).map(l=>`(${l})`).join(t)}const ot=/\b\B/,Se="[a-zA-Z]\\w*",se="[a-zA-Z_]\\w*",ye="\\b\\d+(\\.\\d+)?",Ne="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ae="\\b(0b[01]+)",at="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",lt=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=B(t,/.*\b/,e.binary,/\b.*/)),C({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(i,l)=>{i.index!==0&&l.ignoreMatch()}},e)},U={begin:"\\\\[\\s\\S]",relevance:0},ut={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[U]},ft={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[U]},gt={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Y=function(e,t,i={}){const l=C({scope:"comment",begin:e,end:t,contains:[]},i);l.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const b=ne("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return l.contains.push({begin:B(/[ ]+/,"(",b,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),l},ht=Y("//","$"),pt=Y("/\\*","\\*/"),dt=Y("#","$"),Et={scope:"number",begin:ye,relevance:0},bt={scope:"number",begin:Ne,relevance:0},_t={scope:"number",begin:Ae,relevance:0},Mt={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[U,{begin:/\[/,end:/\]/,relevance:0,contains:[U]}]}]},wt={scope:"title",begin:Se,relevance:0},xt={scope:"title",begin:se,relevance:0},Ot={begin:"\\.\\s*"+se,relevance:0},Rt=function(e){return Object.assign(e,{"on:begin":(t,i)=>{i.data._beginMatch=t[1]},"on:end":(t,i)=>{i.data._beginMatch!==t[1]&&i.ignoreMatch()}})};var z=Object.freeze({__proto__:null,MATCH_NOTHING_RE:ot,IDENT_RE:Se,UNDERSCORE_IDENT_RE:se,NUMBER_RE:ye,C_NUMBER_RE:Ne,BINARY_NUMBER_RE:Ae,RE_STARTERS_RE:at,SHEBANG:lt,BACKSLASH_ESCAPE:U,APOS_STRING_MODE:ut,QUOTE_STRING_MODE:ft,PHRASAL_WORDS_MODE:gt,COMMENT:Y,C_LINE_COMMENT_MODE:ht,C_BLOCK_COMMENT_MODE:pt,HASH_COMMENT_MODE:dt,NUMBER_MODE:Et,C_NUMBER_MODE:bt,BINARY_NUMBER_MODE:_t,REGEXP_MODE:Mt,TITLE_MODE:wt,UNDERSCORE_TITLE_MODE:xt,METHOD_GUARD:Ot,END_SAME_AS_BEGIN:Rt});function St(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function yt(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Nt(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=St,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function At(e,t){Array.isArray(e.illegal)&&(e.illegal=ne(...e.illegal))}function Tt(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function kt(e,t){e.relevance===void 0&&(e.relevance=1)}const It=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const i=Object.assign({},e);Object.keys(e).forEach(l=>{delete e[l]}),e.keywords=i.keywords,e.begin=B(i.beforeMatch,Oe(i.begin)),e.starts={relevance:0,contains:[Object.assign(i,{endsParent:!0})]},e.relevance=0,delete i.beforeMatch},Ct=["of","and","for","in","not","or","if","then","parent","list","value"],Dt="keyword";function Te(e,t,i=Dt){const l=Object.create(null);return typeof e=="string"?b(i,e.split(" ")):Array.isArray(e)?b(i,e):Object.keys(e).forEach(function(_){Object.assign(l,Te(e[_],t,_))}),l;function b(_,c){t&&(c=c.map(r=>r.toLowerCase())),c.forEach(function(r){const u=r.split("|");l[u[0]]=[_,Lt(u[0],u[1])]})}}function Lt(e,t){return t?Number(t):Bt(e)?0:1}function Bt(e){return Ct.includes(e.toLowerCase())}const Ee={},L=e=>{console.error(e)},be=(e,...t)=>{console.log(`WARN: ${e}`,...t)},v=(e,t)=>{Ee[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Ee[`${e}/${t}`]=!0)},X=new Error;function ke(e,t,{key:i}){let l=0;const b=e[i],_={},c={};for(let r=1;r<=t.length;r++)c[r+l]=b[r],_[r+l]=!0,l+=Re(t[r-1]);e[i]=c,e[i]._emit=_,e[i]._multi=!0}function vt(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw L("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),X;if(typeof e.beginScope!="object"||e.beginScope===null)throw L("beginScope must be object"),X;ke(e,e.begin,{key:"beginScope"}),e.begin=ie(e.begin,{joinWith:""})}}function Ht(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw L("skip, excludeEnd, returnEnd not compatible with endScope: {}"),X;if(typeof e.endScope!="object"||e.endScope===null)throw L("endScope must be object"),X;ke(e,e.end,{key:"endScope"}),e.end=ie(e.end,{joinWith:""})}}function Pt(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function jt(e){Pt(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),vt(e),Ht(e)}function Ut(e){function t(c,r){return new RegExp(j(c),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class i{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,u){u.position=this.position++,this.matchIndexes[this.matchAt]=u,this.regexes.push([u,r]),this.matchAt+=Re(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(u=>u[1]);this.matcherRe=t(ie(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const u=this.matcherRe.exec(r);if(!u)return null;const x=u.findIndex((P,Z)=>Z>0&&P!==void 0),M=this.matchIndexes[x];return u.splice(0,x),Object.assign(u,M)}}class l{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const u=new i;return this.rules.slice(r).forEach(([x,M])=>u.addRule(x,M)),u.compile(),this.multiRegexes[r]=u,u}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,u){this.rules.push([r,u]),u.type==="begin"&&this.count++}exec(r){const u=this.getMatcher(this.regexIndex);u.lastIndex=this.lastIndex;let x=u.exec(r);if(this.resumingScanAtSamePosition()&&!(x&&x.index===this.lastIndex)){const M=this.getMatcher(0);M.lastIndex=this.lastIndex+1,x=M.exec(r)}return x&&(this.regexIndex+=x.position+1,this.regexIndex===this.count&&this.considerAll()),x}}function b(c){const r=new l;return c.contains.forEach(u=>r.addRule(u.begin,{rule:u,type:"begin"})),c.terminatorEnd&&r.addRule(c.terminatorEnd,{type:"end"}),c.illegal&&r.addRule(c.illegal,{type:"illegal"}),r}function _(c,r){const u=c;if(c.isCompiled)return u;[yt,Tt,jt,It].forEach(M=>M(c,r)),e.compilerExtensions.forEach(M=>M(c,r)),c.__beforeBegin=null,[Nt,At,kt].forEach(M=>M(c,r)),c.isCompiled=!0;let x=null;return typeof c.keywords=="object"&&c.keywords.$pattern&&(c.keywords=Object.assign({},c.keywords),x=c.keywords.$pattern,delete c.keywords.$pattern),x=x||/\w+/,c.keywords&&(c.keywords=Te(c.keywords,e.case_insensitive)),u.keywordPatternRe=t(x,!0),r&&(c.begin||(c.begin=/\B|\b/),u.beginRe=t(u.begin),!c.end&&!c.endsWithParent&&(c.end=/\B|\b/),c.end&&(u.endRe=t(u.end)),u.terminatorEnd=j(u.end)||"",c.endsWithParent&&r.terminatorEnd&&(u.terminatorEnd+=(c.end?"|":"")+r.terminatorEnd)),c.illegal&&(u.illegalRe=t(c.illegal)),c.contains||(c.contains=[]),c.contains=[].concat(...c.contains.map(function(M){return $t(M==="self"?c:M)})),c.contains.forEach(function(M){_(M,u)}),c.starts&&_(c.starts,r),u.matcher=b(u),u}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=C(e.classNameAliases||{}),_(e)}function Ie(e){return e?e.endsWithParent||Ie(e.starts):!1}function $t(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return C(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ie(e)?C(e,{starts:e.starts?C(e.starts):null}):Object.isFrozen(e)?C(e):e}var Gt="11.8.0";class Kt extends Error{constructor(t,i){super(t),this.name="HTMLInjectionError",this.html=i}}const ee=xe,_e=C,Me=Symbol("nomatch"),Wt=7,Ce=function(e){const t=Object.create(null),i=Object.create(null),l=[];let b=!0;const _="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:tt};function u(n){return r.noHighlightRe.test(n)}function x(n){let a=n.className+" ";a+=n.parentNode?n.parentNode.className:"";const h=r.languageDetectRe.exec(a);if(h){const d=k(h[1]);return d||(be(_.replace("{}",h[1])),be("Falling back to no-highlight mode for this block.",n)),d?h[1]:"no-highlight"}return a.split(/\s+/).find(d=>u(d)||k(d))}function M(n,a,h){let d="",w="";typeof a=="object"?(d=n,h=a.ignoreIllegals,w=a.language):(v("10.7.0","highlight(lang, code, ...args) has been deprecated."),v("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),w=n,d=a),h===void 0&&(h=!0);const y={code:d,language:w};G("before:highlight",y);const I=y.result?y.result:P(y.language,y.code,h);return I.code=y.code,G("after:highlight",I),I}function P(n,a,h,d){const w=Object.create(null);function y(s,o){return s.keywords[o]}function I(){if(!f.keywords){O.addText(E);return}let s=0;f.keywordPatternRe.lastIndex=0;let o=f.keywordPatternRe.exec(E),g="";for(;o;){g+=E.substring(s,o.index);const p=A.case_insensitive?o[0].toLowerCase():o[0],R=y(f,p);if(R){const[T,Je]=R;if(O.addText(g),g="",w[p]=(w[p]||0)+1,w[p]<=Wt&&(F+=Je),T.startsWith("_"))g+=o[0];else{const Ve=A.classNameAliases[T]||T;N(o[0],Ve)}}else g+=o[0];s=f.keywordPatternRe.lastIndex,o=f.keywordPatternRe.exec(E)}g+=E.substring(s),O.addText(g)}function K(){if(E==="")return;let s=null;if(typeof f.subLanguage=="string"){if(!t[f.subLanguage]){O.addText(E);return}s=P(f.subLanguage,E,!0,ge[f.subLanguage]),ge[f.subLanguage]=s._top}else s=J(E,f.subLanguage.length?f.subLanguage:null);f.relevance>0&&(F+=s.relevance),O.__addSublanguage(s._emitter,s.language)}function S(){f.subLanguage!=null?K():I(),E=""}function N(s,o){s!==""&&(O.startScope(o),O.addText(s),O.endScope())}function ae(s,o){let g=1;const p=o.length-1;for(;g<=p;){if(!s._emit[g]){g++;continue}const R=A.classNameAliases[s[g]]||s[g],T=o[g];R?N(T,R):(E=T,I(),E=""),g++}}function le(s,o){return s.scope&&typeof s.scope=="string"&&O.openNode(A.classNameAliases[s.scope]||s.scope),s.beginScope&&(s.beginScope._wrap?(N(E,A.classNameAliases[s.beginScope._wrap]||s.beginScope._wrap),E=""):s.beginScope._multi&&(ae(s.beginScope,o),E="")),f=Object.create(s,{parent:{value:f}}),f}function ue(s,o,g){let p=rt(s.endRe,g);if(p){if(s["on:end"]){const R=new he(s);s["on:end"](o,R),R.isMatchIgnored&&(p=!1)}if(p){for(;s.endsParent&&s.parent;)s=s.parent;return s}}if(s.endsWithParent)return ue(s.parent,o,g)}function Fe(s){return f.matcher.regexIndex===0?(E+=s[0],1):(q=!0,0)}function ze(s){const o=s[0],g=s.rule,p=new he(g),R=[g.__beforeBegin,g["on:begin"]];for(const T of R)if(T&&(T(s,p),p.isMatchIgnored))return Fe(o);return g.skip?E+=o:(g.excludeBegin&&(E+=o),S(),!g.returnBegin&&!g.excludeBegin&&(E=o)),le(g,s),g.returnBegin?0:o.length}function Xe(s){const o=s[0],g=a.substring(s.index),p=ue(f,s,g);if(!p)return Me;const R=f;f.endScope&&f.endScope._wrap?(S(),N(o,f.endScope._wrap)):f.endScope&&f.endScope._multi?(S(),ae(f.endScope,s)):R.skip?E+=o:(R.returnEnd||R.excludeEnd||(E+=o),S(),R.excludeEnd&&(E=o));do f.scope&&O.closeNode(),!f.skip&&!f.subLanguage&&(F+=f.relevance),f=f.parent;while(f!==p.parent);return p.starts&&le(p.starts,s),R.returnEnd?0:o.length}function Ye(){const s=[];for(let o=f;o!==A;o=o.parent)o.scope&&s.unshift(o.scope);s.forEach(o=>O.openNode(o))}let W={};function fe(s,o){const g=o&&o[0];if(E+=s,g==null)return S(),0;if(W.type==="begin"&&o.type==="end"&&W.index===o.index&&g===""){if(E+=a.slice(o.index,o.index+1),!b){const p=new Error(`0 width match regex (${n})`);throw p.languageName=n,p.badRule=W.rule,p}return 1}if(W=o,o.type==="begin")return ze(o);if(o.type==="illegal"&&!h){const p=new Error('Illegal lexeme "'+g+'" for mode "'+(f.scope||"<unnamed>")+'"');throw p.mode=f,p}else if(o.type==="end"){const p=Xe(o);if(p!==Me)return p}if(o.type==="illegal"&&g==="")return 1;if(Q>1e5&&Q>o.index*3)throw new Error("potential infinite loop, way more iterations than matches");return E+=g,g.length}const A=k(n);if(!A)throw L(_.replace("{}",n)),new Error('Unknown language: "'+n+'"');const Ze=Ut(A);let m="",f=d||Ze;const ge={},O=new r.__emitter(r);Ye();let E="",F=0,D=0,Q=0,q=!1;try{if(A.__emitTokens)A.__emitTokens(a,O);else{for(f.matcher.considerAll();;){Q++,q?q=!1:f.matcher.considerAll(),f.matcher.lastIndex=D;const s=f.matcher.exec(a);if(!s)break;const o=a.substring(D,s.index),g=fe(o,s);D=s.index+g}fe(a.substring(D))}return O.finalize(),m=O.toHTML(),{language:n,value:m,relevance:F,illegal:!1,_emitter:O,_top:f}}catch(s){if(s.message&&s.message.includes("Illegal"))return{language:n,value:ee(a),illegal:!0,relevance:0,_illegalBy:{message:s.message,index:D,context:a.slice(D-100,D+100),mode:s.mode,resultSoFar:m},_emitter:O};if(b)return{language:n,value:ee(a),illegal:!1,relevance:0,errorRaised:s,_emitter:O,_top:f};throw s}}function Z(n){const a={value:ee(n),illegal:!1,relevance:0,_top:c,_emitter:new r.__emitter(r)};return a._emitter.addText(n),a}function J(n,a){a=a||r.languages||Object.keys(t);const h=Z(n),d=a.filter(k).filter(oe).map(S=>P(S,n,!1));d.unshift(h);const w=d.sort((S,N)=>{if(S.relevance!==N.relevance)return N.relevance-S.relevance;if(S.language&&N.language){if(k(S.language).supersetOf===N.language)return 1;if(k(N.language).supersetOf===S.language)return-1}return 0}),[y,I]=w,K=y;return K.secondBest=I,K}function De(n,a,h){const d=a&&i[a]||h;n.classList.add("hljs"),n.classList.add(`language-${d}`)}function V(n){let a=null;const h=x(n);if(u(h))return;if(G("before:highlightElement",{el:n,language:h}),n.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(n)),r.throwUnescapedHTML))throw new Kt("One of your code blocks includes unescaped HTML.",n.innerHTML);a=n;const d=a.textContent,w=h?M(d,{language:h,ignoreIllegals:!0}):J(d);n.innerHTML=w.value,De(n,h,w.language),n.result={language:w.language,re:w.relevance,relevance:w.relevance},w.secondBest&&(n.secondBest={language:w.secondBest.language,relevance:w.secondBest.relevance}),G("after:highlightElement",{el:n,result:w,text:d})}function Le(n){r=_e(r,n)}const Be=()=>{$(),v("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function ve(){$(),v("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let re=!1;function $(){if(document.readyState==="loading"){re=!0;return}document.querySelectorAll(r.cssSelector).forEach(V)}function He(){re&&$()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",He,!1);function Pe(n,a){let h=null;try{h=a(e)}catch(d){if(L("Language definition for '{}' could not be registered.".replace("{}",n)),b)L(d);else throw d;h=c}h.name||(h.name=n),t[n]=h,h.rawDefinition=a.bind(null,e),h.aliases&&ce(h.aliases,{languageName:n})}function je(n){delete t[n];for(const a of Object.keys(i))i[a]===n&&delete i[a]}function Ue(){return Object.keys(t)}function k(n){return n=(n||"").toLowerCase(),t[n]||t[i[n]]}function ce(n,{languageName:a}){typeof n=="string"&&(n=[n]),n.forEach(h=>{i[h.toLowerCase()]=a})}function oe(n){const a=k(n);return a&&!a.disableAutodetect}function $e(n){n["before:highlightBlock"]&&!n["before:highlightElement"]&&(n["before:highlightElement"]=a=>{n["before:highlightBlock"](Object.assign({block:a.el},a))}),n["after:highlightBlock"]&&!n["after:highlightElement"]&&(n["after:highlightElement"]=a=>{n["after:highlightBlock"](Object.assign({block:a.el},a))})}function Ge(n){$e(n),l.push(n)}function Ke(n){const a=l.indexOf(n);a!==-1&&l.splice(a,1)}function G(n,a){const h=n;l.forEach(function(d){d[h]&&d[h](a)})}function We(n){return v("10.7.0","highlightBlock will be removed entirely in v12.0"),v("10.7.0","Please use highlightElement now."),V(n)}Object.assign(e,{highlight:M,highlightAuto:J,highlightAll:$,highlightElement:V,highlightBlock:We,configure:Le,initHighlighting:Be,initHighlightingOnLoad:ve,registerLanguage:Pe,unregisterLanguage:je,listLanguages:Ue,getLanguage:k,registerAliases:ce,autoDetection:oe,inherit:_e,addPlugin:Ge,removePlugin:Ke}),e.debugMode=function(){b=!1},e.safeMode=function(){b=!0},e.versionString=Gt,e.regex={concat:B,lookahead:Oe,either:ne,optional:it,anyNumberOfTimes:nt};for(const n in z)typeof z[n]=="object"&&we(z[n]);return Object.assign(e,z),e},H=Ce({});H.newInstance=()=>Ce({});var Ft=H;H.HighlightJS=H;H.default=H;const Xt=me(Ft);function Yt(e){const t={className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},i={match:/[{}[\],:]/,className:"punctuation",relevance:0},l=["true","false","null"],b={scope:"literal",beginKeywords:l.join(" ")};return{name:"JSON",keywords:{literal:l},contains:[t,i,e.QUOTE_STRING_MODE,b,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\S"}}export{Xt as H,Yt as j};
