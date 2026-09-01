var W_=Object.defineProperty;var j_=(t,e,n)=>e in t?W_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Lt=(t,e,n)=>j_(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function q_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var lg={exports:{}},oc={},cg={exports:{}},Be={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var po=Symbol.for("react.element"),X_=Symbol.for("react.portal"),$_=Symbol.for("react.fragment"),Y_=Symbol.for("react.strict_mode"),K_=Symbol.for("react.profiler"),Z_=Symbol.for("react.provider"),Q_=Symbol.for("react.context"),J_=Symbol.for("react.forward_ref"),ey=Symbol.for("react.suspense"),ty=Symbol.for("react.memo"),ny=Symbol.for("react.lazy"),Yh=Symbol.iterator;function iy(t){return t===null||typeof t!="object"?null:(t=Yh&&t[Yh]||t["@@iterator"],typeof t=="function"?t:null)}var ug={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},dg=Object.assign,fg={};function sa(t,e,n){this.props=t,this.context=e,this.refs=fg,this.updater=n||ug}sa.prototype.isReactComponent={};sa.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};sa.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function hg(){}hg.prototype=sa.prototype;function Ef(t,e,n){this.props=t,this.context=e,this.refs=fg,this.updater=n||ug}var wf=Ef.prototype=new hg;wf.constructor=Ef;dg(wf,sa.prototype);wf.isPureReactComponent=!0;var Kh=Array.isArray,pg=Object.prototype.hasOwnProperty,Tf={current:null},mg={key:!0,ref:!0,__self:!0,__source:!0};function gg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)pg.call(e,i)&&!mg.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:po,type:t,key:s,ref:a,props:r,_owner:Tf.current}}function ry(t,e){return{$$typeof:po,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Af(t){return typeof t=="object"&&t!==null&&t.$$typeof===po}function sy(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Zh=/\/+/g;function Dc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?sy(""+t.key):e.toString(36)}function ul(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case po:case X_:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Dc(a,0):i,Kh(r)?(n="",t!=null&&(n=t.replace(Zh,"$&/")+"/"),ul(r,e,n,"",function(c){return c})):r!=null&&(Af(r)&&(r=ry(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Zh,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",Kh(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+Dc(s,o);a+=ul(s,e,n,l,r)}else if(l=iy(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+Dc(s,o++),a+=ul(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function Ao(t,e,n){if(t==null)return t;var i=[],r=0;return ul(t,i,"","",function(s){return e.call(n,s,r++)}),i}function ay(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var rn={current:null},dl={transition:null},oy={ReactCurrentDispatcher:rn,ReactCurrentBatchConfig:dl,ReactCurrentOwner:Tf};function vg(){throw Error("act(...) is not supported in production builds of React.")}Be.Children={map:Ao,forEach:function(t,e,n){Ao(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ao(t,function(){e++}),e},toArray:function(t){return Ao(t,function(e){return e})||[]},only:function(t){if(!Af(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Be.Component=sa;Be.Fragment=$_;Be.Profiler=K_;Be.PureComponent=Ef;Be.StrictMode=Y_;Be.Suspense=ey;Be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oy;Be.act=vg;Be.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=dg({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Tf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)pg.call(e,l)&&!mg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:po,type:t.type,key:r,ref:s,props:i,_owner:a}};Be.createContext=function(t){return t={$$typeof:Q_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Z_,_context:t},t.Consumer=t};Be.createElement=gg;Be.createFactory=function(t){var e=gg.bind(null,t);return e.type=t,e};Be.createRef=function(){return{current:null}};Be.forwardRef=function(t){return{$$typeof:J_,render:t}};Be.isValidElement=Af;Be.lazy=function(t){return{$$typeof:ny,_payload:{_status:-1,_result:t},_init:ay}};Be.memo=function(t,e){return{$$typeof:ty,type:t,compare:e===void 0?null:e}};Be.startTransition=function(t){var e=dl.transition;dl.transition={};try{t()}finally{dl.transition=e}};Be.unstable_act=vg;Be.useCallback=function(t,e){return rn.current.useCallback(t,e)};Be.useContext=function(t){return rn.current.useContext(t)};Be.useDebugValue=function(){};Be.useDeferredValue=function(t){return rn.current.useDeferredValue(t)};Be.useEffect=function(t,e){return rn.current.useEffect(t,e)};Be.useId=function(){return rn.current.useId()};Be.useImperativeHandle=function(t,e,n){return rn.current.useImperativeHandle(t,e,n)};Be.useInsertionEffect=function(t,e){return rn.current.useInsertionEffect(t,e)};Be.useLayoutEffect=function(t,e){return rn.current.useLayoutEffect(t,e)};Be.useMemo=function(t,e){return rn.current.useMemo(t,e)};Be.useReducer=function(t,e,n){return rn.current.useReducer(t,e,n)};Be.useRef=function(t){return rn.current.useRef(t)};Be.useState=function(t){return rn.current.useState(t)};Be.useSyncExternalStore=function(t,e,n){return rn.current.useSyncExternalStore(t,e,n)};Be.useTransition=function(){return rn.current.useTransition()};Be.version="18.3.1";cg.exports=Be;var it=cg.exports;const ly=q_(it);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cy=it,uy=Symbol.for("react.element"),dy=Symbol.for("react.fragment"),fy=Object.prototype.hasOwnProperty,hy=cy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,py={key:!0,ref:!0,__self:!0,__source:!0};function _g(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)fy.call(e,i)&&!py.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:uy,type:t,key:s,ref:a,props:r,_owner:hy.current}}oc.Fragment=dy;oc.jsx=_g;oc.jsxs=_g;lg.exports=oc;var m=lg.exports,Bu={},yg={exports:{}},bn={},xg={exports:{}},Sg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(N,X){var Q=N.length;N.push(X);e:for(;0<Q;){var ae=Q-1>>>1,xe=N[ae];if(0<r(xe,X))N[ae]=X,N[Q]=xe,Q=ae;else break e}}function n(N){return N.length===0?null:N[0]}function i(N){if(N.length===0)return null;var X=N[0],Q=N.pop();if(Q!==X){N[0]=Q;e:for(var ae=0,xe=N.length,Ke=xe>>>1;ae<Ke;){var W=2*(ae+1)-1,ie=N[W],pe=W+1,se=N[pe];if(0>r(ie,Q))pe<xe&&0>r(se,ie)?(N[ae]=se,N[pe]=Q,ae=pe):(N[ae]=ie,N[W]=Q,ae=W);else if(pe<xe&&0>r(se,Q))N[ae]=se,N[pe]=Q,ae=pe;else break e}}return X}function r(N,X){var Q=N.sortIndex-X.sortIndex;return Q!==0?Q:N.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],d=1,h=null,f=3,p=!1,v=!1,x=!1,g=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(N){for(var X=n(c);X!==null;){if(X.callback===null)i(c);else if(X.startTime<=N)i(c),X.sortIndex=X.expirationTime,e(l,X);else break;X=n(c)}}function S(N){if(x=!1,y(N),!v)if(n(l)!==null)v=!0,j(b);else{var X=n(c);X!==null&&J(S,X.startTime-N)}}function b(N,X){v=!1,x&&(x=!1,u(P),P=-1),p=!0;var Q=f;try{for(y(X),h=n(l);h!==null&&(!(h.expirationTime>X)||N&&!I());){var ae=h.callback;if(typeof ae=="function"){h.callback=null,f=h.priorityLevel;var xe=ae(h.expirationTime<=X);X=t.unstable_now(),typeof xe=="function"?h.callback=xe:h===n(l)&&i(l),y(X)}else i(l);h=n(l)}if(h!==null)var Ke=!0;else{var W=n(c);W!==null&&J(S,W.startTime-X),Ke=!1}return Ke}finally{h=null,f=Q,p=!1}}var R=!1,A=null,P=-1,T=5,M=-1;function I(){return!(t.unstable_now()-M<T)}function V(){if(A!==null){var N=t.unstable_now();M=N;var X=!0;try{X=A(!0,N)}finally{X?O():(R=!1,A=null)}}else R=!1}var O;if(typeof _=="function")O=function(){_(V)};else if(typeof MessageChannel<"u"){var q=new MessageChannel,Y=q.port2;q.port1.onmessage=V,O=function(){Y.postMessage(null)}}else O=function(){g(V,0)};function j(N){A=N,R||(R=!0,O())}function J(N,X){P=g(function(){N(t.unstable_now())},X)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(N){N.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,j(b))},t.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<N?Math.floor(1e3/N):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(N){switch(f){case 1:case 2:case 3:var X=3;break;default:X=f}var Q=f;f=X;try{return N()}finally{f=Q}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(N,X){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var Q=f;f=N;try{return X()}finally{f=Q}},t.unstable_scheduleCallback=function(N,X,Q){var ae=t.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?ae+Q:ae):Q=ae,N){case 1:var xe=-1;break;case 2:xe=250;break;case 5:xe=1073741823;break;case 4:xe=1e4;break;default:xe=5e3}return xe=Q+xe,N={id:d++,callback:X,priorityLevel:N,startTime:Q,expirationTime:xe,sortIndex:-1},Q>ae?(N.sortIndex=Q,e(c,N),n(l)===null&&N===n(c)&&(x?(u(P),P=-1):x=!0,J(S,Q-ae))):(N.sortIndex=xe,e(l,N),v||p||(v=!0,j(b))),N},t.unstable_shouldYield=I,t.unstable_wrapCallback=function(N){var X=f;return function(){var Q=f;f=X;try{return N.apply(this,arguments)}finally{f=Q}}}})(Sg);xg.exports=Sg;var my=xg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gy=it,An=my;function te(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Mg=new Set,ja={};function Jr(t,e){Bs(t,e),Bs(t+"Capture",e)}function Bs(t,e){for(ja[t]=e,t=0;t<e.length;t++)Mg.add(e[t])}var Ni=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Hu=Object.prototype.hasOwnProperty,vy=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Qh={},Jh={};function _y(t){return Hu.call(Jh,t)?!0:Hu.call(Qh,t)?!1:vy.test(t)?Jh[t]=!0:(Qh[t]=!0,!1)}function yy(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function xy(t,e,n,i){if(e===null||typeof e>"u"||yy(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function sn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Wt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Wt[t]=new sn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Wt[e]=new sn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Wt[t]=new sn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Wt[t]=new sn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Wt[t]=new sn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Wt[t]=new sn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Wt[t]=new sn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Wt[t]=new sn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Wt[t]=new sn(t,5,!1,t.toLowerCase(),null,!1,!1)});var bf=/[\-:]([a-z])/g;function Cf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(bf,Cf);Wt[e]=new sn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(bf,Cf);Wt[e]=new sn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(bf,Cf);Wt[e]=new sn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Wt[t]=new sn(t,1,!1,t.toLowerCase(),null,!1,!1)});Wt.xlinkHref=new sn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Wt[t]=new sn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Rf(t,e,n,i){var r=Wt.hasOwnProperty(e)?Wt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(xy(e,n,r,i)&&(n=null),i||r===null?_y(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var zi=gy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,bo=Symbol.for("react.element"),_s=Symbol.for("react.portal"),ys=Symbol.for("react.fragment"),Pf=Symbol.for("react.strict_mode"),Vu=Symbol.for("react.profiler"),Eg=Symbol.for("react.provider"),wg=Symbol.for("react.context"),If=Symbol.for("react.forward_ref"),Gu=Symbol.for("react.suspense"),Wu=Symbol.for("react.suspense_list"),Lf=Symbol.for("react.memo"),$i=Symbol.for("react.lazy"),Tg=Symbol.for("react.offscreen"),ep=Symbol.iterator;function ha(t){return t===null||typeof t!="object"?null:(t=ep&&t[ep]||t["@@iterator"],typeof t=="function"?t:null)}var _t=Object.assign,Uc;function Aa(t){if(Uc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Uc=e&&e[1]||""}return`
`+Uc+t}var Fc=!1;function Oc(t,e){if(!t||Fc)return"";Fc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{Fc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Aa(t):""}function Sy(t){switch(t.tag){case 5:return Aa(t.type);case 16:return Aa("Lazy");case 13:return Aa("Suspense");case 19:return Aa("SuspenseList");case 0:case 2:case 15:return t=Oc(t.type,!1),t;case 11:return t=Oc(t.type.render,!1),t;case 1:return t=Oc(t.type,!0),t;default:return""}}function ju(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ys:return"Fragment";case _s:return"Portal";case Vu:return"Profiler";case Pf:return"StrictMode";case Gu:return"Suspense";case Wu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case wg:return(t.displayName||"Context")+".Consumer";case Eg:return(t._context.displayName||"Context")+".Provider";case If:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Lf:return e=t.displayName||null,e!==null?e:ju(t.type)||"Memo";case $i:e=t._payload,t=t._init;try{return ju(t(e))}catch{}}return null}function My(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ju(e);case 8:return e===Pf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function hr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ag(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Ey(t){var e=Ag(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Co(t){t._valueTracker||(t._valueTracker=Ey(t))}function bg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Ag(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Cl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function qu(t,e){var n=e.checked;return _t({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function tp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=hr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Cg(t,e){e=e.checked,e!=null&&Rf(t,"checked",e,!1)}function Xu(t,e){Cg(t,e);var n=hr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?$u(t,e.type,n):e.hasOwnProperty("defaultValue")&&$u(t,e.type,hr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function np(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function $u(t,e,n){(e!=="number"||Cl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var ba=Array.isArray;function Is(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+hr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Yu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(te(91));return _t({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function ip(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(te(92));if(ba(n)){if(1<n.length)throw Error(te(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:hr(n)}}function Rg(t,e){var n=hr(e.value),i=hr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function rp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Pg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ku(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Pg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ro,Ig=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ro=Ro||document.createElement("div"),Ro.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ro.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function qa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var La={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},wy=["Webkit","ms","Moz","O"];Object.keys(La).forEach(function(t){wy.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),La[e]=La[t]})});function Lg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||La.hasOwnProperty(t)&&La[t]?(""+e).trim():e+"px"}function Ng(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Lg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Ty=_t({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Zu(t,e){if(e){if(Ty[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(te(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(te(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(te(61))}if(e.style!=null&&typeof e.style!="object")throw Error(te(62))}}function Qu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ju=null;function Nf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ed=null,Ls=null,Ns=null;function sp(t){if(t=vo(t)){if(typeof ed!="function")throw Error(te(280));var e=t.stateNode;e&&(e=fc(e),ed(t.stateNode,t.type,e))}}function kg(t){Ls?Ns?Ns.push(t):Ns=[t]:Ls=t}function Dg(){if(Ls){var t=Ls,e=Ns;if(Ns=Ls=null,sp(t),e)for(t=0;t<e.length;t++)sp(e[t])}}function Ug(t,e){return t(e)}function Fg(){}var zc=!1;function Og(t,e,n){if(zc)return t(e,n);zc=!0;try{return Ug(t,e,n)}finally{zc=!1,(Ls!==null||Ns!==null)&&(Fg(),Dg())}}function Xa(t,e){var n=t.stateNode;if(n===null)return null;var i=fc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(te(231,e,typeof n));return n}var td=!1;if(Ni)try{var pa={};Object.defineProperty(pa,"passive",{get:function(){td=!0}}),window.addEventListener("test",pa,pa),window.removeEventListener("test",pa,pa)}catch{td=!1}function Ay(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var Na=!1,Rl=null,Pl=!1,nd=null,by={onError:function(t){Na=!0,Rl=t}};function Cy(t,e,n,i,r,s,a,o,l){Na=!1,Rl=null,Ay.apply(by,arguments)}function Ry(t,e,n,i,r,s,a,o,l){if(Cy.apply(this,arguments),Na){if(Na){var c=Rl;Na=!1,Rl=null}else throw Error(te(198));Pl||(Pl=!0,nd=c)}}function es(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function zg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function ap(t){if(es(t)!==t)throw Error(te(188))}function Py(t){var e=t.alternate;if(!e){if(e=es(t),e===null)throw Error(te(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return ap(r),t;if(s===i)return ap(r),e;s=s.sibling}throw Error(te(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(te(189))}}if(n.alternate!==i)throw Error(te(190))}if(n.tag!==3)throw Error(te(188));return n.stateNode.current===n?t:e}function Bg(t){return t=Py(t),t!==null?Hg(t):null}function Hg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Hg(t);if(e!==null)return e;t=t.sibling}return null}var Vg=An.unstable_scheduleCallback,op=An.unstable_cancelCallback,Iy=An.unstable_shouldYield,Ly=An.unstable_requestPaint,Tt=An.unstable_now,Ny=An.unstable_getCurrentPriorityLevel,kf=An.unstable_ImmediatePriority,Gg=An.unstable_UserBlockingPriority,Il=An.unstable_NormalPriority,ky=An.unstable_LowPriority,Wg=An.unstable_IdlePriority,lc=null,di=null;function Dy(t){if(di&&typeof di.onCommitFiberRoot=="function")try{di.onCommitFiberRoot(lc,t,void 0,(t.current.flags&128)===128)}catch{}}var ei=Math.clz32?Math.clz32:Oy,Uy=Math.log,Fy=Math.LN2;function Oy(t){return t>>>=0,t===0?32:31-(Uy(t)/Fy|0)|0}var Po=64,Io=4194304;function Ca(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ll(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=Ca(o):(s&=a,s!==0&&(i=Ca(s)))}else a=n&~r,a!==0?i=Ca(a):s!==0&&(i=Ca(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ei(e),r=1<<n,i|=t[n],e&=~r;return i}function zy(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function By(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-ei(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=zy(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function id(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function jg(){var t=Po;return Po<<=1,!(Po&4194240)&&(Po=64),t}function Bc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function mo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ei(e),t[e]=n}function Hy(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ei(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Df(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ei(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var st=0;function qg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Xg,Uf,$g,Yg,Kg,rd=!1,Lo=[],nr=null,ir=null,rr=null,$a=new Map,Ya=new Map,Ki=[],Vy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function lp(t,e){switch(t){case"focusin":case"focusout":nr=null;break;case"dragenter":case"dragleave":ir=null;break;case"mouseover":case"mouseout":rr=null;break;case"pointerover":case"pointerout":$a.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ya.delete(e.pointerId)}}function ma(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=vo(e),e!==null&&Uf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Gy(t,e,n,i,r){switch(e){case"focusin":return nr=ma(nr,t,e,n,i,r),!0;case"dragenter":return ir=ma(ir,t,e,n,i,r),!0;case"mouseover":return rr=ma(rr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return $a.set(s,ma($a.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ya.set(s,ma(Ya.get(s)||null,t,e,n,i,r)),!0}return!1}function Zg(t){var e=Ur(t.target);if(e!==null){var n=es(e);if(n!==null){if(e=n.tag,e===13){if(e=zg(n),e!==null){t.blockedOn=e,Kg(t.priority,function(){$g(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function fl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=sd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Ju=i,n.target.dispatchEvent(i),Ju=null}else return e=vo(n),e!==null&&Uf(e),t.blockedOn=n,!1;e.shift()}return!0}function cp(t,e,n){fl(t)&&n.delete(e)}function Wy(){rd=!1,nr!==null&&fl(nr)&&(nr=null),ir!==null&&fl(ir)&&(ir=null),rr!==null&&fl(rr)&&(rr=null),$a.forEach(cp),Ya.forEach(cp)}function ga(t,e){t.blockedOn===e&&(t.blockedOn=null,rd||(rd=!0,An.unstable_scheduleCallback(An.unstable_NormalPriority,Wy)))}function Ka(t){function e(r){return ga(r,t)}if(0<Lo.length){ga(Lo[0],t);for(var n=1;n<Lo.length;n++){var i=Lo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(nr!==null&&ga(nr,t),ir!==null&&ga(ir,t),rr!==null&&ga(rr,t),$a.forEach(e),Ya.forEach(e),n=0;n<Ki.length;n++)i=Ki[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ki.length&&(n=Ki[0],n.blockedOn===null);)Zg(n),n.blockedOn===null&&Ki.shift()}var ks=zi.ReactCurrentBatchConfig,Nl=!0;function jy(t,e,n,i){var r=st,s=ks.transition;ks.transition=null;try{st=1,Ff(t,e,n,i)}finally{st=r,ks.transition=s}}function qy(t,e,n,i){var r=st,s=ks.transition;ks.transition=null;try{st=4,Ff(t,e,n,i)}finally{st=r,ks.transition=s}}function Ff(t,e,n,i){if(Nl){var r=sd(t,e,n,i);if(r===null)Kc(t,e,i,kl,n),lp(t,i);else if(Gy(r,t,e,n,i))i.stopPropagation();else if(lp(t,i),e&4&&-1<Vy.indexOf(t)){for(;r!==null;){var s=vo(r);if(s!==null&&Xg(s),s=sd(t,e,n,i),s===null&&Kc(t,e,i,kl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Kc(t,e,i,null,n)}}var kl=null;function sd(t,e,n,i){if(kl=null,t=Nf(i),t=Ur(t),t!==null)if(e=es(t),e===null)t=null;else if(n=e.tag,n===13){if(t=zg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return kl=t,null}function Qg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ny()){case kf:return 1;case Gg:return 4;case Il:case ky:return 16;case Wg:return 536870912;default:return 16}default:return 16}}var Ji=null,Of=null,hl=null;function Jg(){if(hl)return hl;var t,e=Of,n=e.length,i,r="value"in Ji?Ji.value:Ji.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return hl=r.slice(t,1<i?1-i:void 0)}function pl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function No(){return!0}function up(){return!1}function Cn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?No:up,this.isPropagationStopped=up,this}return _t(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=No)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=No)},persist:function(){},isPersistent:No}),e}var aa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zf=Cn(aa),go=_t({},aa,{view:0,detail:0}),Xy=Cn(go),Hc,Vc,va,cc=_t({},go,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Bf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==va&&(va&&t.type==="mousemove"?(Hc=t.screenX-va.screenX,Vc=t.screenY-va.screenY):Vc=Hc=0,va=t),Hc)},movementY:function(t){return"movementY"in t?t.movementY:Vc}}),dp=Cn(cc),$y=_t({},cc,{dataTransfer:0}),Yy=Cn($y),Ky=_t({},go,{relatedTarget:0}),Gc=Cn(Ky),Zy=_t({},aa,{animationName:0,elapsedTime:0,pseudoElement:0}),Qy=Cn(Zy),Jy=_t({},aa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ex=Cn(Jy),tx=_t({},aa,{data:0}),fp=Cn(tx),nx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ix={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=rx[t])?!!e[t]:!1}function Bf(){return sx}var ax=_t({},go,{key:function(t){if(t.key){var e=nx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=pl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ix[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Bf,charCode:function(t){return t.type==="keypress"?pl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?pl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),ox=Cn(ax),lx=_t({},cc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hp=Cn(lx),cx=_t({},go,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Bf}),ux=Cn(cx),dx=_t({},aa,{propertyName:0,elapsedTime:0,pseudoElement:0}),fx=Cn(dx),hx=_t({},cc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),px=Cn(hx),mx=[9,13,27,32],Hf=Ni&&"CompositionEvent"in window,ka=null;Ni&&"documentMode"in document&&(ka=document.documentMode);var gx=Ni&&"TextEvent"in window&&!ka,e0=Ni&&(!Hf||ka&&8<ka&&11>=ka),pp=" ",mp=!1;function t0(t,e){switch(t){case"keyup":return mx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function n0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var xs=!1;function vx(t,e){switch(t){case"compositionend":return n0(e);case"keypress":return e.which!==32?null:(mp=!0,pp);case"textInput":return t=e.data,t===pp&&mp?null:t;default:return null}}function _x(t,e){if(xs)return t==="compositionend"||!Hf&&t0(t,e)?(t=Jg(),hl=Of=Ji=null,xs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return e0&&e.locale!=="ko"?null:e.data;default:return null}}var yx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!yx[t.type]:e==="textarea"}function i0(t,e,n,i){kg(i),e=Dl(e,"onChange"),0<e.length&&(n=new zf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Da=null,Za=null;function xx(t){p0(t,0)}function uc(t){var e=Es(t);if(bg(e))return t}function Sx(t,e){if(t==="change")return e}var r0=!1;if(Ni){var Wc;if(Ni){var jc="oninput"in document;if(!jc){var vp=document.createElement("div");vp.setAttribute("oninput","return;"),jc=typeof vp.oninput=="function"}Wc=jc}else Wc=!1;r0=Wc&&(!document.documentMode||9<document.documentMode)}function _p(){Da&&(Da.detachEvent("onpropertychange",s0),Za=Da=null)}function s0(t){if(t.propertyName==="value"&&uc(Za)){var e=[];i0(e,Za,t,Nf(t)),Og(xx,e)}}function Mx(t,e,n){t==="focusin"?(_p(),Da=e,Za=n,Da.attachEvent("onpropertychange",s0)):t==="focusout"&&_p()}function Ex(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return uc(Za)}function wx(t,e){if(t==="click")return uc(e)}function Tx(t,e){if(t==="input"||t==="change")return uc(e)}function Ax(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ii=typeof Object.is=="function"?Object.is:Ax;function Qa(t,e){if(ii(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Hu.call(e,r)||!ii(t[r],e[r]))return!1}return!0}function yp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function xp(t,e){var n=yp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=yp(n)}}function a0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?a0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function o0(){for(var t=window,e=Cl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Cl(t.document)}return e}function Vf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function bx(t){var e=o0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&a0(n.ownerDocument.documentElement,n)){if(i!==null&&Vf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=xp(n,s);var a=xp(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Cx=Ni&&"documentMode"in document&&11>=document.documentMode,Ss=null,ad=null,Ua=null,od=!1;function Sp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;od||Ss==null||Ss!==Cl(i)||(i=Ss,"selectionStart"in i&&Vf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ua&&Qa(Ua,i)||(Ua=i,i=Dl(ad,"onSelect"),0<i.length&&(e=new zf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Ss)))}function ko(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ms={animationend:ko("Animation","AnimationEnd"),animationiteration:ko("Animation","AnimationIteration"),animationstart:ko("Animation","AnimationStart"),transitionend:ko("Transition","TransitionEnd")},qc={},l0={};Ni&&(l0=document.createElement("div").style,"AnimationEvent"in window||(delete Ms.animationend.animation,delete Ms.animationiteration.animation,delete Ms.animationstart.animation),"TransitionEvent"in window||delete Ms.transitionend.transition);function dc(t){if(qc[t])return qc[t];if(!Ms[t])return t;var e=Ms[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in l0)return qc[t]=e[n];return t}var c0=dc("animationend"),u0=dc("animationiteration"),d0=dc("animationstart"),f0=dc("transitionend"),h0=new Map,Mp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yr(t,e){h0.set(t,e),Jr(e,[t])}for(var Xc=0;Xc<Mp.length;Xc++){var $c=Mp[Xc],Rx=$c.toLowerCase(),Px=$c[0].toUpperCase()+$c.slice(1);yr(Rx,"on"+Px)}yr(c0,"onAnimationEnd");yr(u0,"onAnimationIteration");yr(d0,"onAnimationStart");yr("dblclick","onDoubleClick");yr("focusin","onFocus");yr("focusout","onBlur");yr(f0,"onTransitionEnd");Bs("onMouseEnter",["mouseout","mouseover"]);Bs("onMouseLeave",["mouseout","mouseover"]);Bs("onPointerEnter",["pointerout","pointerover"]);Bs("onPointerLeave",["pointerout","pointerover"]);Jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Jr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ra="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ix=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ra));function Ep(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Ry(i,e,void 0,t),t.currentTarget=null}function p0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Ep(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Ep(r,o,c),s=l}}}if(Pl)throw t=nd,Pl=!1,nd=null,t}function ut(t,e){var n=e[fd];n===void 0&&(n=e[fd]=new Set);var i=t+"__bubble";n.has(i)||(m0(e,t,2,!1),n.add(i))}function Yc(t,e,n){var i=0;e&&(i|=4),m0(n,t,i,e)}var Do="_reactListening"+Math.random().toString(36).slice(2);function Ja(t){if(!t[Do]){t[Do]=!0,Mg.forEach(function(n){n!=="selectionchange"&&(Ix.has(n)||Yc(n,!1,t),Yc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Do]||(e[Do]=!0,Yc("selectionchange",!1,e))}}function m0(t,e,n,i){switch(Qg(e)){case 1:var r=jy;break;case 4:r=qy;break;default:r=Ff}n=r.bind(null,e,n,t),r=void 0,!td||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Kc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Ur(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Og(function(){var c=s,d=Nf(n),h=[];e:{var f=h0.get(t);if(f!==void 0){var p=zf,v=t;switch(t){case"keypress":if(pl(n)===0)break e;case"keydown":case"keyup":p=ox;break;case"focusin":v="focus",p=Gc;break;case"focusout":v="blur",p=Gc;break;case"beforeblur":case"afterblur":p=Gc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=dp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Yy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=ux;break;case c0:case u0:case d0:p=Qy;break;case f0:p=fx;break;case"scroll":p=Xy;break;case"wheel":p=px;break;case"copy":case"cut":case"paste":p=ex;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=hp}var x=(e&4)!==0,g=!x&&t==="scroll",u=x?f!==null?f+"Capture":null:f;x=[];for(var _=c,y;_!==null;){y=_;var S=y.stateNode;if(y.tag===5&&S!==null&&(y=S,u!==null&&(S=Xa(_,u),S!=null&&x.push(eo(_,S,y)))),g)break;_=_.return}0<x.length&&(f=new p(f,v,null,n,d),h.push({event:f,listeners:x}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==Ju&&(v=n.relatedTarget||n.fromElement)&&(Ur(v)||v[ki]))break e;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?Ur(v):null,v!==null&&(g=es(v),v!==g||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(x=dp,S="onMouseLeave",u="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(x=hp,S="onPointerLeave",u="onPointerEnter",_="pointer"),g=p==null?f:Es(p),y=v==null?f:Es(v),f=new x(S,_+"leave",p,n,d),f.target=g,f.relatedTarget=y,S=null,Ur(d)===c&&(x=new x(u,_+"enter",v,n,d),x.target=y,x.relatedTarget=g,S=x),g=S,p&&v)t:{for(x=p,u=v,_=0,y=x;y;y=ns(y))_++;for(y=0,S=u;S;S=ns(S))y++;for(;0<_-y;)x=ns(x),_--;for(;0<y-_;)u=ns(u),y--;for(;_--;){if(x===u||u!==null&&x===u.alternate)break t;x=ns(x),u=ns(u)}x=null}else x=null;p!==null&&wp(h,f,p,x,!1),v!==null&&g!==null&&wp(h,g,v,x,!0)}}e:{if(f=c?Es(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var b=Sx;else if(gp(f))if(r0)b=Tx;else{b=Ex;var R=Mx}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(b=wx);if(b&&(b=b(t,c))){i0(h,b,n,d);break e}R&&R(t,f,c),t==="focusout"&&(R=f._wrapperState)&&R.controlled&&f.type==="number"&&$u(f,"number",f.value)}switch(R=c?Es(c):window,t){case"focusin":(gp(R)||R.contentEditable==="true")&&(Ss=R,ad=c,Ua=null);break;case"focusout":Ua=ad=Ss=null;break;case"mousedown":od=!0;break;case"contextmenu":case"mouseup":case"dragend":od=!1,Sp(h,n,d);break;case"selectionchange":if(Cx)break;case"keydown":case"keyup":Sp(h,n,d)}var A;if(Hf)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else xs?t0(t,n)&&(P="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(e0&&n.locale!=="ko"&&(xs||P!=="onCompositionStart"?P==="onCompositionEnd"&&xs&&(A=Jg()):(Ji=d,Of="value"in Ji?Ji.value:Ji.textContent,xs=!0)),R=Dl(c,P),0<R.length&&(P=new fp(P,t,null,n,d),h.push({event:P,listeners:R}),A?P.data=A:(A=n0(n),A!==null&&(P.data=A)))),(A=gx?vx(t,n):_x(t,n))&&(c=Dl(c,"onBeforeInput"),0<c.length&&(d=new fp("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:c}),d.data=A))}p0(h,e)})}function eo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Dl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Xa(t,n),s!=null&&i.unshift(eo(t,s,r)),s=Xa(t,e),s!=null&&i.push(eo(t,s,r))),t=t.return}return i}function ns(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function wp(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=Xa(n,s),l!=null&&a.unshift(eo(n,l,o))):r||(l=Xa(n,s),l!=null&&a.push(eo(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Lx=/\r\n?/g,Nx=/\u0000|\uFFFD/g;function Tp(t){return(typeof t=="string"?t:""+t).replace(Lx,`
`).replace(Nx,"")}function Uo(t,e,n){if(e=Tp(e),Tp(t)!==e&&n)throw Error(te(425))}function Ul(){}var ld=null,cd=null;function ud(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var dd=typeof setTimeout=="function"?setTimeout:void 0,kx=typeof clearTimeout=="function"?clearTimeout:void 0,Ap=typeof Promise=="function"?Promise:void 0,Dx=typeof queueMicrotask=="function"?queueMicrotask:typeof Ap<"u"?function(t){return Ap.resolve(null).then(t).catch(Ux)}:dd;function Ux(t){setTimeout(function(){throw t})}function Zc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ka(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ka(e)}function sr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function bp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var oa=Math.random().toString(36).slice(2),ci="__reactFiber$"+oa,to="__reactProps$"+oa,ki="__reactContainer$"+oa,fd="__reactEvents$"+oa,Fx="__reactListeners$"+oa,Ox="__reactHandles$"+oa;function Ur(t){var e=t[ci];if(e)return e;for(var n=t.parentNode;n;){if(e=n[ki]||n[ci]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=bp(t);t!==null;){if(n=t[ci])return n;t=bp(t)}return e}t=n,n=t.parentNode}return null}function vo(t){return t=t[ci]||t[ki],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Es(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(te(33))}function fc(t){return t[to]||null}var hd=[],ws=-1;function xr(t){return{current:t}}function dt(t){0>ws||(t.current=hd[ws],hd[ws]=null,ws--)}function lt(t,e){ws++,hd[ws]=t.current,t.current=e}var pr={},Zt=xr(pr),un=xr(!1),Wr=pr;function Hs(t,e){var n=t.type.contextTypes;if(!n)return pr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function dn(t){return t=t.childContextTypes,t!=null}function Fl(){dt(un),dt(Zt)}function Cp(t,e,n){if(Zt.current!==pr)throw Error(te(168));lt(Zt,e),lt(un,n)}function g0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(te(108,My(t)||"Unknown",r));return _t({},n,i)}function Ol(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||pr,Wr=Zt.current,lt(Zt,t),lt(un,un.current),!0}function Rp(t,e,n){var i=t.stateNode;if(!i)throw Error(te(169));n?(t=g0(t,e,Wr),i.__reactInternalMemoizedMergedChildContext=t,dt(un),dt(Zt),lt(Zt,t)):dt(un),lt(un,n)}var Ei=null,hc=!1,Qc=!1;function v0(t){Ei===null?Ei=[t]:Ei.push(t)}function zx(t){hc=!0,v0(t)}function Sr(){if(!Qc&&Ei!==null){Qc=!0;var t=0,e=st;try{var n=Ei;for(st=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ei=null,hc=!1}catch(r){throw Ei!==null&&(Ei=Ei.slice(t+1)),Vg(kf,Sr),r}finally{st=e,Qc=!1}}return null}var Ts=[],As=0,zl=null,Bl=0,Nn=[],kn=0,jr=null,Ai=1,bi="";function Pr(t,e){Ts[As++]=Bl,Ts[As++]=zl,zl=t,Bl=e}function _0(t,e,n){Nn[kn++]=Ai,Nn[kn++]=bi,Nn[kn++]=jr,jr=t;var i=Ai;t=bi;var r=32-ei(i)-1;i&=~(1<<r),n+=1;var s=32-ei(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Ai=1<<32-ei(e)+r|n<<r|i,bi=s+t}else Ai=1<<s|n<<r|i,bi=t}function Gf(t){t.return!==null&&(Pr(t,1),_0(t,1,0))}function Wf(t){for(;t===zl;)zl=Ts[--As],Ts[As]=null,Bl=Ts[--As],Ts[As]=null;for(;t===jr;)jr=Nn[--kn],Nn[kn]=null,bi=Nn[--kn],Nn[kn]=null,Ai=Nn[--kn],Nn[kn]=null}var Mn=null,Sn=null,ht=!1,Yn=null;function y0(t,e){var n=Dn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Pp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Mn=t,Sn=sr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Mn=t,Sn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=jr!==null?{id:Ai,overflow:bi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Dn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Mn=t,Sn=null,!0):!1;default:return!1}}function pd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function md(t){if(ht){var e=Sn;if(e){var n=e;if(!Pp(t,e)){if(pd(t))throw Error(te(418));e=sr(n.nextSibling);var i=Mn;e&&Pp(t,e)?y0(i,n):(t.flags=t.flags&-4097|2,ht=!1,Mn=t)}}else{if(pd(t))throw Error(te(418));t.flags=t.flags&-4097|2,ht=!1,Mn=t}}}function Ip(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Mn=t}function Fo(t){if(t!==Mn)return!1;if(!ht)return Ip(t),ht=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!ud(t.type,t.memoizedProps)),e&&(e=Sn)){if(pd(t))throw x0(),Error(te(418));for(;e;)y0(t,e),e=sr(e.nextSibling)}if(Ip(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(te(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Sn=sr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Sn=null}}else Sn=Mn?sr(t.stateNode.nextSibling):null;return!0}function x0(){for(var t=Sn;t;)t=sr(t.nextSibling)}function Vs(){Sn=Mn=null,ht=!1}function jf(t){Yn===null?Yn=[t]:Yn.push(t)}var Bx=zi.ReactCurrentBatchConfig;function _a(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(te(309));var i=n.stateNode}if(!i)throw Error(te(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(te(284));if(!n._owner)throw Error(te(290,t))}return t}function Oo(t,e){throw t=Object.prototype.toString.call(e),Error(te(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Lp(t){var e=t._init;return e(t._payload)}function S0(t){function e(u,_){if(t){var y=u.deletions;y===null?(u.deletions=[_],u.flags|=16):y.push(_)}}function n(u,_){if(!t)return null;for(;_!==null;)e(u,_),_=_.sibling;return null}function i(u,_){for(u=new Map;_!==null;)_.key!==null?u.set(_.key,_):u.set(_.index,_),_=_.sibling;return u}function r(u,_){return u=cr(u,_),u.index=0,u.sibling=null,u}function s(u,_,y){return u.index=y,t?(y=u.alternate,y!==null?(y=y.index,y<_?(u.flags|=2,_):y):(u.flags|=2,_)):(u.flags|=1048576,_)}function a(u){return t&&u.alternate===null&&(u.flags|=2),u}function o(u,_,y,S){return _===null||_.tag!==6?(_=su(y,u.mode,S),_.return=u,_):(_=r(_,y),_.return=u,_)}function l(u,_,y,S){var b=y.type;return b===ys?d(u,_,y.props.children,S,y.key):_!==null&&(_.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===$i&&Lp(b)===_.type)?(S=r(_,y.props),S.ref=_a(u,_,y),S.return=u,S):(S=Sl(y.type,y.key,y.props,null,u.mode,S),S.ref=_a(u,_,y),S.return=u,S)}function c(u,_,y,S){return _===null||_.tag!==4||_.stateNode.containerInfo!==y.containerInfo||_.stateNode.implementation!==y.implementation?(_=au(y,u.mode,S),_.return=u,_):(_=r(_,y.children||[]),_.return=u,_)}function d(u,_,y,S,b){return _===null||_.tag!==7?(_=Gr(y,u.mode,S,b),_.return=u,_):(_=r(_,y),_.return=u,_)}function h(u,_,y){if(typeof _=="string"&&_!==""||typeof _=="number")return _=su(""+_,u.mode,y),_.return=u,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case bo:return y=Sl(_.type,_.key,_.props,null,u.mode,y),y.ref=_a(u,null,_),y.return=u,y;case _s:return _=au(_,u.mode,y),_.return=u,_;case $i:var S=_._init;return h(u,S(_._payload),y)}if(ba(_)||ha(_))return _=Gr(_,u.mode,y,null),_.return=u,_;Oo(u,_)}return null}function f(u,_,y,S){var b=_!==null?_.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return b!==null?null:o(u,_,""+y,S);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case bo:return y.key===b?l(u,_,y,S):null;case _s:return y.key===b?c(u,_,y,S):null;case $i:return b=y._init,f(u,_,b(y._payload),S)}if(ba(y)||ha(y))return b!==null?null:d(u,_,y,S,null);Oo(u,y)}return null}function p(u,_,y,S,b){if(typeof S=="string"&&S!==""||typeof S=="number")return u=u.get(y)||null,o(_,u,""+S,b);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case bo:return u=u.get(S.key===null?y:S.key)||null,l(_,u,S,b);case _s:return u=u.get(S.key===null?y:S.key)||null,c(_,u,S,b);case $i:var R=S._init;return p(u,_,y,R(S._payload),b)}if(ba(S)||ha(S))return u=u.get(y)||null,d(_,u,S,b,null);Oo(_,S)}return null}function v(u,_,y,S){for(var b=null,R=null,A=_,P=_=0,T=null;A!==null&&P<y.length;P++){A.index>P?(T=A,A=null):T=A.sibling;var M=f(u,A,y[P],S);if(M===null){A===null&&(A=T);break}t&&A&&M.alternate===null&&e(u,A),_=s(M,_,P),R===null?b=M:R.sibling=M,R=M,A=T}if(P===y.length)return n(u,A),ht&&Pr(u,P),b;if(A===null){for(;P<y.length;P++)A=h(u,y[P],S),A!==null&&(_=s(A,_,P),R===null?b=A:R.sibling=A,R=A);return ht&&Pr(u,P),b}for(A=i(u,A);P<y.length;P++)T=p(A,u,P,y[P],S),T!==null&&(t&&T.alternate!==null&&A.delete(T.key===null?P:T.key),_=s(T,_,P),R===null?b=T:R.sibling=T,R=T);return t&&A.forEach(function(I){return e(u,I)}),ht&&Pr(u,P),b}function x(u,_,y,S){var b=ha(y);if(typeof b!="function")throw Error(te(150));if(y=b.call(y),y==null)throw Error(te(151));for(var R=b=null,A=_,P=_=0,T=null,M=y.next();A!==null&&!M.done;P++,M=y.next()){A.index>P?(T=A,A=null):T=A.sibling;var I=f(u,A,M.value,S);if(I===null){A===null&&(A=T);break}t&&A&&I.alternate===null&&e(u,A),_=s(I,_,P),R===null?b=I:R.sibling=I,R=I,A=T}if(M.done)return n(u,A),ht&&Pr(u,P),b;if(A===null){for(;!M.done;P++,M=y.next())M=h(u,M.value,S),M!==null&&(_=s(M,_,P),R===null?b=M:R.sibling=M,R=M);return ht&&Pr(u,P),b}for(A=i(u,A);!M.done;P++,M=y.next())M=p(A,u,P,M.value,S),M!==null&&(t&&M.alternate!==null&&A.delete(M.key===null?P:M.key),_=s(M,_,P),R===null?b=M:R.sibling=M,R=M);return t&&A.forEach(function(V){return e(u,V)}),ht&&Pr(u,P),b}function g(u,_,y,S){if(typeof y=="object"&&y!==null&&y.type===ys&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case bo:e:{for(var b=y.key,R=_;R!==null;){if(R.key===b){if(b=y.type,b===ys){if(R.tag===7){n(u,R.sibling),_=r(R,y.props.children),_.return=u,u=_;break e}}else if(R.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===$i&&Lp(b)===R.type){n(u,R.sibling),_=r(R,y.props),_.ref=_a(u,R,y),_.return=u,u=_;break e}n(u,R);break}else e(u,R);R=R.sibling}y.type===ys?(_=Gr(y.props.children,u.mode,S,y.key),_.return=u,u=_):(S=Sl(y.type,y.key,y.props,null,u.mode,S),S.ref=_a(u,_,y),S.return=u,u=S)}return a(u);case _s:e:{for(R=y.key;_!==null;){if(_.key===R)if(_.tag===4&&_.stateNode.containerInfo===y.containerInfo&&_.stateNode.implementation===y.implementation){n(u,_.sibling),_=r(_,y.children||[]),_.return=u,u=_;break e}else{n(u,_);break}else e(u,_);_=_.sibling}_=au(y,u.mode,S),_.return=u,u=_}return a(u);case $i:return R=y._init,g(u,_,R(y._payload),S)}if(ba(y))return v(u,_,y,S);if(ha(y))return x(u,_,y,S);Oo(u,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,_!==null&&_.tag===6?(n(u,_.sibling),_=r(_,y),_.return=u,u=_):(n(u,_),_=su(y,u.mode,S),_.return=u,u=_),a(u)):n(u,_)}return g}var Gs=S0(!0),M0=S0(!1),Hl=xr(null),Vl=null,bs=null,qf=null;function Xf(){qf=bs=Vl=null}function $f(t){var e=Hl.current;dt(Hl),t._currentValue=e}function gd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Ds(t,e){Vl=t,qf=bs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(cn=!0),t.firstContext=null)}function On(t){var e=t._currentValue;if(qf!==t)if(t={context:t,memoizedValue:e,next:null},bs===null){if(Vl===null)throw Error(te(308));bs=t,Vl.dependencies={lanes:0,firstContext:t}}else bs=bs.next=t;return e}var Fr=null;function Yf(t){Fr===null?Fr=[t]:Fr.push(t)}function E0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Yf(e)):(n.next=r.next,r.next=n),e.interleaved=n,Di(t,i)}function Di(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Yi=!1;function Kf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function w0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Pi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function ar(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Ye&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Di(t,n)}return r=i.interleaved,r===null?(e.next=e,Yf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Di(t,n)}function ml(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Df(t,n)}}function Np(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Gl(t,e,n,i){var r=t.updateQueue;Yi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==a&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;a=0,d=c=l=null,o=s;do{var f=o.lane,p=o.eventTime;if((i&f)===f){d!==null&&(d=d.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var v=t,x=o;switch(f=e,p=n,x.tag){case 1:if(v=x.payload,typeof v=="function"){h=v.call(p,h,f);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=x.payload,f=typeof v=="function"?v.call(p,h,f):v,f==null)break e;h=_t({},h,f);break e;case 2:Yi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[o]:f.push(o))}else p={eventTime:p,lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=p,l=h):d=d.next=p,a|=f;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;f=o,o=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(d===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Xr|=a,t.lanes=a,t.memoizedState=h}}function kp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(te(191,r));r.call(i)}}}var _o={},fi=xr(_o),no=xr(_o),io=xr(_o);function Or(t){if(t===_o)throw Error(te(174));return t}function Zf(t,e){switch(lt(io,e),lt(no,t),lt(fi,_o),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ku(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Ku(e,t)}dt(fi),lt(fi,e)}function Ws(){dt(fi),dt(no),dt(io)}function T0(t){Or(io.current);var e=Or(fi.current),n=Ku(e,t.type);e!==n&&(lt(no,t),lt(fi,n))}function Qf(t){no.current===t&&(dt(fi),dt(no))}var gt=xr(0);function Wl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Jc=[];function Jf(){for(var t=0;t<Jc.length;t++)Jc[t]._workInProgressVersionPrimary=null;Jc.length=0}var gl=zi.ReactCurrentDispatcher,eu=zi.ReactCurrentBatchConfig,qr=0,vt=null,Nt=null,Ot=null,jl=!1,Fa=!1,ro=0,Hx=0;function qt(){throw Error(te(321))}function eh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ii(t[n],e[n]))return!1;return!0}function th(t,e,n,i,r,s){if(qr=s,vt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,gl.current=t===null||t.memoizedState===null?jx:qx,t=n(i,r),Fa){s=0;do{if(Fa=!1,ro=0,25<=s)throw Error(te(301));s+=1,Ot=Nt=null,e.updateQueue=null,gl.current=Xx,t=n(i,r)}while(Fa)}if(gl.current=ql,e=Nt!==null&&Nt.next!==null,qr=0,Ot=Nt=vt=null,jl=!1,e)throw Error(te(300));return t}function nh(){var t=ro!==0;return ro=0,t}function oi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ot===null?vt.memoizedState=Ot=t:Ot=Ot.next=t,Ot}function zn(){if(Nt===null){var t=vt.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=Ot===null?vt.memoizedState:Ot.next;if(e!==null)Ot=e,Nt=t;else{if(t===null)throw Error(te(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},Ot===null?vt.memoizedState=Ot=t:Ot=Ot.next=t}return Ot}function so(t,e){return typeof e=="function"?e(t):e}function tu(t){var e=zn(),n=e.queue;if(n===null)throw Error(te(311));n.lastRenderedReducer=t;var i=Nt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var d=c.lane;if((qr&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=h,a=i):l=l.next=h,vt.lanes|=d,Xr|=d}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,ii(i,e.memoizedState)||(cn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,vt.lanes|=s,Xr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function nu(t){var e=zn(),n=e.queue;if(n===null)throw Error(te(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);ii(s,e.memoizedState)||(cn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function A0(){}function b0(t,e){var n=vt,i=zn(),r=e(),s=!ii(i.memoizedState,r);if(s&&(i.memoizedState=r,cn=!0),i=i.queue,ih(P0.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ot!==null&&Ot.memoizedState.tag&1){if(n.flags|=2048,ao(9,R0.bind(null,n,i,r,e),void 0,null),zt===null)throw Error(te(349));qr&30||C0(n,e,r)}return r}function C0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function R0(t,e,n,i){e.value=n,e.getSnapshot=i,I0(e)&&L0(t)}function P0(t,e,n){return n(function(){I0(e)&&L0(t)})}function I0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ii(t,n)}catch{return!0}}function L0(t){var e=Di(t,1);e!==null&&ti(e,t,1,-1)}function Dp(t){var e=oi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:so,lastRenderedState:t},e.queue=t,t=t.dispatch=Wx.bind(null,vt,t),[e.memoizedState,t]}function ao(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function N0(){return zn().memoizedState}function vl(t,e,n,i){var r=oi();vt.flags|=t,r.memoizedState=ao(1|e,n,void 0,i===void 0?null:i)}function pc(t,e,n,i){var r=zn();i=i===void 0?null:i;var s=void 0;if(Nt!==null){var a=Nt.memoizedState;if(s=a.destroy,i!==null&&eh(i,a.deps)){r.memoizedState=ao(e,n,s,i);return}}vt.flags|=t,r.memoizedState=ao(1|e,n,s,i)}function Up(t,e){return vl(8390656,8,t,e)}function ih(t,e){return pc(2048,8,t,e)}function k0(t,e){return pc(4,2,t,e)}function D0(t,e){return pc(4,4,t,e)}function U0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function F0(t,e,n){return n=n!=null?n.concat([t]):null,pc(4,4,U0.bind(null,e,t),n)}function rh(){}function O0(t,e){var n=zn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&eh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function z0(t,e){var n=zn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&eh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function B0(t,e,n){return qr&21?(ii(n,e)||(n=jg(),vt.lanes|=n,Xr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,cn=!0),t.memoizedState=n)}function Vx(t,e){var n=st;st=n!==0&&4>n?n:4,t(!0);var i=eu.transition;eu.transition={};try{t(!1),e()}finally{st=n,eu.transition=i}}function H0(){return zn().memoizedState}function Gx(t,e,n){var i=lr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},V0(t))G0(e,n);else if(n=E0(t,e,n,i),n!==null){var r=nn();ti(n,t,i,r),W0(n,e,i)}}function Wx(t,e,n){var i=lr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(V0(t))G0(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,ii(o,a)){var l=e.interleaved;l===null?(r.next=r,Yf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=E0(t,e,r,i),n!==null&&(r=nn(),ti(n,t,i,r),W0(n,e,i))}}function V0(t){var e=t.alternate;return t===vt||e!==null&&e===vt}function G0(t,e){Fa=jl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function W0(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Df(t,n)}}var ql={readContext:On,useCallback:qt,useContext:qt,useEffect:qt,useImperativeHandle:qt,useInsertionEffect:qt,useLayoutEffect:qt,useMemo:qt,useReducer:qt,useRef:qt,useState:qt,useDebugValue:qt,useDeferredValue:qt,useTransition:qt,useMutableSource:qt,useSyncExternalStore:qt,useId:qt,unstable_isNewReconciler:!1},jx={readContext:On,useCallback:function(t,e){return oi().memoizedState=[t,e===void 0?null:e],t},useContext:On,useEffect:Up,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,vl(4194308,4,U0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return vl(4194308,4,t,e)},useInsertionEffect:function(t,e){return vl(4,2,t,e)},useMemo:function(t,e){var n=oi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=oi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Gx.bind(null,vt,t),[i.memoizedState,t]},useRef:function(t){var e=oi();return t={current:t},e.memoizedState=t},useState:Dp,useDebugValue:rh,useDeferredValue:function(t){return oi().memoizedState=t},useTransition:function(){var t=Dp(!1),e=t[0];return t=Vx.bind(null,t[1]),oi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=vt,r=oi();if(ht){if(n===void 0)throw Error(te(407));n=n()}else{if(n=e(),zt===null)throw Error(te(349));qr&30||C0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Up(P0.bind(null,i,s,t),[t]),i.flags|=2048,ao(9,R0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=oi(),e=zt.identifierPrefix;if(ht){var n=bi,i=Ai;n=(i&~(1<<32-ei(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ro++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Hx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},qx={readContext:On,useCallback:O0,useContext:On,useEffect:ih,useImperativeHandle:F0,useInsertionEffect:k0,useLayoutEffect:D0,useMemo:z0,useReducer:tu,useRef:N0,useState:function(){return tu(so)},useDebugValue:rh,useDeferredValue:function(t){var e=zn();return B0(e,Nt.memoizedState,t)},useTransition:function(){var t=tu(so)[0],e=zn().memoizedState;return[t,e]},useMutableSource:A0,useSyncExternalStore:b0,useId:H0,unstable_isNewReconciler:!1},Xx={readContext:On,useCallback:O0,useContext:On,useEffect:ih,useImperativeHandle:F0,useInsertionEffect:k0,useLayoutEffect:D0,useMemo:z0,useReducer:nu,useRef:N0,useState:function(){return nu(so)},useDebugValue:rh,useDeferredValue:function(t){var e=zn();return Nt===null?e.memoizedState=t:B0(e,Nt.memoizedState,t)},useTransition:function(){var t=nu(so)[0],e=zn().memoizedState;return[t,e]},useMutableSource:A0,useSyncExternalStore:b0,useId:H0,unstable_isNewReconciler:!1};function Xn(t,e){if(t&&t.defaultProps){e=_t({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function vd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:_t({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var mc={isMounted:function(t){return(t=t._reactInternals)?es(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=nn(),r=lr(t),s=Pi(i,r);s.payload=e,n!=null&&(s.callback=n),e=ar(t,s,r),e!==null&&(ti(e,t,r,i),ml(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=nn(),r=lr(t),s=Pi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=ar(t,s,r),e!==null&&(ti(e,t,r,i),ml(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=nn(),i=lr(t),r=Pi(n,i);r.tag=2,e!=null&&(r.callback=e),e=ar(t,r,i),e!==null&&(ti(e,t,i,n),ml(e,t,i))}};function Fp(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Qa(n,i)||!Qa(r,s):!0}function j0(t,e,n){var i=!1,r=pr,s=e.contextType;return typeof s=="object"&&s!==null?s=On(s):(r=dn(e)?Wr:Zt.current,i=e.contextTypes,s=(i=i!=null)?Hs(t,r):pr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=mc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Op(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&mc.enqueueReplaceState(e,e.state,null)}function _d(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Kf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=On(s):(s=dn(e)?Wr:Zt.current,r.context=Hs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(vd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&mc.enqueueReplaceState(r,r.state,null),Gl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function js(t,e){try{var n="",i=e;do n+=Sy(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function iu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function yd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var $x=typeof WeakMap=="function"?WeakMap:Map;function q0(t,e,n){n=Pi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){$l||($l=!0,Rd=i),yd(t,e)},n}function X0(t,e,n){n=Pi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){yd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){yd(t,e),typeof i!="function"&&(or===null?or=new Set([this]):or.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function zp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new $x;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=l1.bind(null,t,e,n),e.then(t,t))}function Bp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Hp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Pi(-1,1),e.tag=2,ar(n,e,1))),n.lanes|=1),t)}var Yx=zi.ReactCurrentOwner,cn=!1;function tn(t,e,n,i){e.child=t===null?M0(e,null,n,i):Gs(e,t.child,n,i)}function Vp(t,e,n,i,r){n=n.render;var s=e.ref;return Ds(e,r),i=th(t,e,n,i,s,r),n=nh(),t!==null&&!cn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ui(t,e,r)):(ht&&n&&Gf(e),e.flags|=1,tn(t,e,i,r),e.child)}function Gp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!fh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,$0(t,e,s,i,r)):(t=Sl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Qa,n(a,i)&&t.ref===e.ref)return Ui(t,e,r)}return e.flags|=1,t=cr(s,i),t.ref=e.ref,t.return=e,e.child=t}function $0(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Qa(s,i)&&t.ref===e.ref)if(cn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(cn=!0);else return e.lanes=t.lanes,Ui(t,e,r)}return xd(t,e,n,i,r)}function Y0(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},lt(Rs,yn),yn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,lt(Rs,yn),yn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,lt(Rs,yn),yn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,lt(Rs,yn),yn|=i;return tn(t,e,r,n),e.child}function K0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function xd(t,e,n,i,r){var s=dn(n)?Wr:Zt.current;return s=Hs(e,s),Ds(e,r),n=th(t,e,n,i,s,r),i=nh(),t!==null&&!cn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ui(t,e,r)):(ht&&i&&Gf(e),e.flags|=1,tn(t,e,n,r),e.child)}function Wp(t,e,n,i,r){if(dn(n)){var s=!0;Ol(e)}else s=!1;if(Ds(e,r),e.stateNode===null)_l(t,e),j0(e,n,i),_d(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=On(c):(c=dn(n)?Wr:Zt.current,c=Hs(e,c));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&Op(e,a,i,c),Yi=!1;var f=e.memoizedState;a.state=f,Gl(e,i,a,r),l=e.memoizedState,o!==i||f!==l||un.current||Yi?(typeof d=="function"&&(vd(e,n,d,i),l=e.memoizedState),(o=Yi||Fp(e,n,o,i,f,l,c))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,w0(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:Xn(e.type,o),a.props=c,h=e.pendingProps,f=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=On(l):(l=dn(n)?Wr:Zt.current,l=Hs(e,l));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==h||f!==l)&&Op(e,a,i,l),Yi=!1,f=e.memoizedState,a.state=f,Gl(e,i,a,r);var v=e.memoizedState;o!==h||f!==v||un.current||Yi?(typeof p=="function"&&(vd(e,n,p,i),v=e.memoizedState),(c=Yi||Fp(e,n,c,i,f,v,l)||!1)?(d||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,v,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,v,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),a.props=i,a.state=v,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return Sd(t,e,n,i,s,r)}function Sd(t,e,n,i,r,s){K0(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Rp(e,n,!1),Ui(t,e,s);i=e.stateNode,Yx.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Gs(e,t.child,null,s),e.child=Gs(e,null,o,s)):tn(t,e,o,s),e.memoizedState=i.state,r&&Rp(e,n,!0),e.child}function Z0(t){var e=t.stateNode;e.pendingContext?Cp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Cp(t,e.context,!1),Zf(t,e.containerInfo)}function jp(t,e,n,i,r){return Vs(),jf(r),e.flags|=256,tn(t,e,n,i),e.child}var Md={dehydrated:null,treeContext:null,retryLane:0};function Ed(t){return{baseLanes:t,cachePool:null,transitions:null}}function Q0(t,e,n){var i=e.pendingProps,r=gt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),lt(gt,r&1),t===null)return md(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=_c(a,i,0,null),t=Gr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ed(n),e.memoizedState=Md,t):sh(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return Kx(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=cr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=cr(o,s):(s=Gr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Ed(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Md,i}return s=t.child,t=s.sibling,i=cr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function sh(t,e){return e=_c({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function zo(t,e,n,i){return i!==null&&jf(i),Gs(e,t.child,null,n),t=sh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Kx(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=iu(Error(te(422))),zo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=_c({mode:"visible",children:i.children},r,0,null),s=Gr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Gs(e,t.child,null,a),e.child.memoizedState=Ed(a),e.memoizedState=Md,s);if(!(e.mode&1))return zo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(te(419)),i=iu(s,i,void 0),zo(t,e,a,i)}if(o=(a&t.childLanes)!==0,cn||o){if(i=zt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Di(t,r),ti(i,t,r,-1))}return dh(),i=iu(Error(te(421))),zo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=c1.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Sn=sr(r.nextSibling),Mn=e,ht=!0,Yn=null,t!==null&&(Nn[kn++]=Ai,Nn[kn++]=bi,Nn[kn++]=jr,Ai=t.id,bi=t.overflow,jr=e),e=sh(e,i.children),e.flags|=4096,e)}function qp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),gd(t.return,e,n)}function ru(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function J0(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(tn(t,e,i.children,n),i=gt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&qp(t,n,e);else if(t.tag===19)qp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(lt(gt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Wl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),ru(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Wl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}ru(e,!0,n,null,s);break;case"together":ru(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function _l(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ui(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Xr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(te(153));if(e.child!==null){for(t=e.child,n=cr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=cr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Zx(t,e,n){switch(e.tag){case 3:Z0(e),Vs();break;case 5:T0(e);break;case 1:dn(e.type)&&Ol(e);break;case 4:Zf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;lt(Hl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(lt(gt,gt.current&1),e.flags|=128,null):n&e.child.childLanes?Q0(t,e,n):(lt(gt,gt.current&1),t=Ui(t,e,n),t!==null?t.sibling:null);lt(gt,gt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return J0(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),lt(gt,gt.current),i)break;return null;case 22:case 23:return e.lanes=0,Y0(t,e,n)}return Ui(t,e,n)}var ev,wd,tv,nv;ev=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};wd=function(){};tv=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Or(fi.current);var s=null;switch(n){case"input":r=qu(t,r),i=qu(t,i),s=[];break;case"select":r=_t({},r,{value:void 0}),i=_t({},i,{value:void 0}),s=[];break;case"textarea":r=Yu(t,r),i=Yu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Ul)}Zu(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ja.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ja.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ut("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};nv=function(t,e,n,i){n!==i&&(e.flags|=4)};function ya(t,e){if(!ht)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Xt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Qx(t,e,n){var i=e.pendingProps;switch(Wf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Xt(e),null;case 1:return dn(e.type)&&Fl(),Xt(e),null;case 3:return i=e.stateNode,Ws(),dt(un),dt(Zt),Jf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Fo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Yn!==null&&(Ld(Yn),Yn=null))),wd(t,e),Xt(e),null;case 5:Qf(e);var r=Or(io.current);if(n=e.type,t!==null&&e.stateNode!=null)tv(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(te(166));return Xt(e),null}if(t=Or(fi.current),Fo(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ci]=e,i[to]=s,t=(e.mode&1)!==0,n){case"dialog":ut("cancel",i),ut("close",i);break;case"iframe":case"object":case"embed":ut("load",i);break;case"video":case"audio":for(r=0;r<Ra.length;r++)ut(Ra[r],i);break;case"source":ut("error",i);break;case"img":case"image":case"link":ut("error",i),ut("load",i);break;case"details":ut("toggle",i);break;case"input":tp(i,s),ut("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ut("invalid",i);break;case"textarea":ip(i,s),ut("invalid",i)}Zu(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Uo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Uo(i.textContent,o,t),r=["children",""+o]):ja.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&ut("scroll",i)}switch(n){case"input":Co(i),np(i,s,!0);break;case"textarea":Co(i),rp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Ul)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Pg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[ci]=e,t[to]=i,ev(t,e,!1,!1),e.stateNode=t;e:{switch(a=Qu(n,i),n){case"dialog":ut("cancel",t),ut("close",t),r=i;break;case"iframe":case"object":case"embed":ut("load",t),r=i;break;case"video":case"audio":for(r=0;r<Ra.length;r++)ut(Ra[r],t);r=i;break;case"source":ut("error",t),r=i;break;case"img":case"image":case"link":ut("error",t),ut("load",t),r=i;break;case"details":ut("toggle",t),r=i;break;case"input":tp(t,i),r=qu(t,i),ut("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=_t({},i,{value:void 0}),ut("invalid",t);break;case"textarea":ip(t,i),r=Yu(t,i),ut("invalid",t);break;default:r=i}Zu(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Ng(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Ig(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&qa(t,l):typeof l=="number"&&qa(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ja.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ut("scroll",t):l!=null&&Rf(t,s,l,a))}switch(n){case"input":Co(t),np(t,i,!1);break;case"textarea":Co(t),rp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+hr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Is(t,!!i.multiple,s,!1):i.defaultValue!=null&&Is(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Ul)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Xt(e),null;case 6:if(t&&e.stateNode!=null)nv(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(te(166));if(n=Or(io.current),Or(fi.current),Fo(e)){if(i=e.stateNode,n=e.memoizedProps,i[ci]=e,(s=i.nodeValue!==n)&&(t=Mn,t!==null))switch(t.tag){case 3:Uo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Uo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ci]=e,e.stateNode=i}return Xt(e),null;case 13:if(dt(gt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ht&&Sn!==null&&e.mode&1&&!(e.flags&128))x0(),Vs(),e.flags|=98560,s=!1;else if(s=Fo(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(te(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(te(317));s[ci]=e}else Vs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Xt(e),s=!1}else Yn!==null&&(Ld(Yn),Yn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||gt.current&1?kt===0&&(kt=3):dh())),e.updateQueue!==null&&(e.flags|=4),Xt(e),null);case 4:return Ws(),wd(t,e),t===null&&Ja(e.stateNode.containerInfo),Xt(e),null;case 10:return $f(e.type._context),Xt(e),null;case 17:return dn(e.type)&&Fl(),Xt(e),null;case 19:if(dt(gt),s=e.memoizedState,s===null)return Xt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)ya(s,!1);else{if(kt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Wl(t),a!==null){for(e.flags|=128,ya(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return lt(gt,gt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Tt()>qs&&(e.flags|=128,i=!0,ya(s,!1),e.lanes=4194304)}else{if(!i)if(t=Wl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ya(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!ht)return Xt(e),null}else 2*Tt()-s.renderingStartTime>qs&&n!==1073741824&&(e.flags|=128,i=!0,ya(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Tt(),e.sibling=null,n=gt.current,lt(gt,i?n&1|2:n&1),e):(Xt(e),null);case 22:case 23:return uh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?yn&1073741824&&(Xt(e),e.subtreeFlags&6&&(e.flags|=8192)):Xt(e),null;case 24:return null;case 25:return null}throw Error(te(156,e.tag))}function Jx(t,e){switch(Wf(e),e.tag){case 1:return dn(e.type)&&Fl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ws(),dt(un),dt(Zt),Jf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Qf(e),null;case 13:if(dt(gt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(te(340));Vs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return dt(gt),null;case 4:return Ws(),null;case 10:return $f(e.type._context),null;case 22:case 23:return uh(),null;case 24:return null;default:return null}}var Bo=!1,Kt=!1,e1=typeof WeakSet=="function"?WeakSet:Set,he=null;function Cs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){St(t,e,i)}else n.current=null}function Td(t,e,n){try{n()}catch(i){St(t,e,i)}}var Xp=!1;function t1(t,e){if(ld=Nl,t=o0(),Vf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,d=0,h=t,f=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(o=a+r),h!==s||i!==0&&h.nodeType!==3||(l=a+i),h.nodeType===3&&(a+=h.nodeValue.length),(p=h.firstChild)!==null;)f=h,h=p;for(;;){if(h===t)break t;if(f===n&&++c===r&&(o=a),f===s&&++d===i&&(l=a),(p=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(cd={focusedElem:t,selectionRange:n},Nl=!1,he=e;he!==null;)if(e=he,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,he=t;else for(;he!==null;){e=he;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var x=v.memoizedProps,g=v.memoizedState,u=e.stateNode,_=u.getSnapshotBeforeUpdate(e.elementType===e.type?x:Xn(e.type,x),g);u.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var y=e.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(te(163))}}catch(S){St(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,he=t;break}he=e.return}return v=Xp,Xp=!1,v}function Oa(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Td(e,n,s)}r=r.next}while(r!==i)}}function gc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Ad(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function iv(t){var e=t.alternate;e!==null&&(t.alternate=null,iv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ci],delete e[to],delete e[fd],delete e[Fx],delete e[Ox])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function rv(t){return t.tag===5||t.tag===3||t.tag===4}function $p(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||rv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function bd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ul));else if(i!==4&&(t=t.child,t!==null))for(bd(t,e,n),t=t.sibling;t!==null;)bd(t,e,n),t=t.sibling}function Cd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Cd(t,e,n),t=t.sibling;t!==null;)Cd(t,e,n),t=t.sibling}var Ht=null,$n=!1;function Hi(t,e,n){for(n=n.child;n!==null;)sv(t,e,n),n=n.sibling}function sv(t,e,n){if(di&&typeof di.onCommitFiberUnmount=="function")try{di.onCommitFiberUnmount(lc,n)}catch{}switch(n.tag){case 5:Kt||Cs(n,e);case 6:var i=Ht,r=$n;Ht=null,Hi(t,e,n),Ht=i,$n=r,Ht!==null&&($n?(t=Ht,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ht.removeChild(n.stateNode));break;case 18:Ht!==null&&($n?(t=Ht,n=n.stateNode,t.nodeType===8?Zc(t.parentNode,n):t.nodeType===1&&Zc(t,n),Ka(t)):Zc(Ht,n.stateNode));break;case 4:i=Ht,r=$n,Ht=n.stateNode.containerInfo,$n=!0,Hi(t,e,n),Ht=i,$n=r;break;case 0:case 11:case 14:case 15:if(!Kt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Td(n,e,a),r=r.next}while(r!==i)}Hi(t,e,n);break;case 1:if(!Kt&&(Cs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){St(n,e,o)}Hi(t,e,n);break;case 21:Hi(t,e,n);break;case 22:n.mode&1?(Kt=(i=Kt)||n.memoizedState!==null,Hi(t,e,n),Kt=i):Hi(t,e,n);break;default:Hi(t,e,n)}}function Yp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new e1),e.forEach(function(i){var r=u1.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Gn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Ht=o.stateNode,$n=!1;break e;case 3:Ht=o.stateNode.containerInfo,$n=!0;break e;case 4:Ht=o.stateNode.containerInfo,$n=!0;break e}o=o.return}if(Ht===null)throw Error(te(160));sv(s,a,r),Ht=null,$n=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){St(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)av(e,t),e=e.sibling}function av(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Gn(e,t),ai(t),i&4){try{Oa(3,t,t.return),gc(3,t)}catch(x){St(t,t.return,x)}try{Oa(5,t,t.return)}catch(x){St(t,t.return,x)}}break;case 1:Gn(e,t),ai(t),i&512&&n!==null&&Cs(n,n.return);break;case 5:if(Gn(e,t),ai(t),i&512&&n!==null&&Cs(n,n.return),t.flags&32){var r=t.stateNode;try{qa(r,"")}catch(x){St(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Cg(r,s),Qu(o,a);var c=Qu(o,s);for(a=0;a<l.length;a+=2){var d=l[a],h=l[a+1];d==="style"?Ng(r,h):d==="dangerouslySetInnerHTML"?Ig(r,h):d==="children"?qa(r,h):Rf(r,d,h,c)}switch(o){case"input":Xu(r,s);break;case"textarea":Rg(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Is(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?Is(r,!!s.multiple,s.defaultValue,!0):Is(r,!!s.multiple,s.multiple?[]:"",!1))}r[to]=s}catch(x){St(t,t.return,x)}}break;case 6:if(Gn(e,t),ai(t),i&4){if(t.stateNode===null)throw Error(te(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){St(t,t.return,x)}}break;case 3:if(Gn(e,t),ai(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ka(e.containerInfo)}catch(x){St(t,t.return,x)}break;case 4:Gn(e,t),ai(t);break;case 13:Gn(e,t),ai(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(lh=Tt())),i&4&&Yp(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(Kt=(c=Kt)||d,Gn(e,t),Kt=c):Gn(e,t),ai(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(he=t,d=t.child;d!==null;){for(h=he=d;he!==null;){switch(f=he,p=f.child,f.tag){case 0:case 11:case 14:case 15:Oa(4,f,f.return);break;case 1:Cs(f,f.return);var v=f.stateNode;if(typeof v.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(x){St(i,n,x)}}break;case 5:Cs(f,f.return);break;case 22:if(f.memoizedState!==null){Zp(h);continue}}p!==null?(p.return=f,he=p):Zp(h)}d=d.sibling}e:for(d=null,h=t;;){if(h.tag===5){if(d===null){d=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=h.stateNode,l=h.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Lg("display",a))}catch(x){St(t,t.return,x)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(x){St(t,t.return,x)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Gn(e,t),ai(t),i&4&&Yp(t);break;case 21:break;default:Gn(e,t),ai(t)}}function ai(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(rv(n)){var i=n;break e}n=n.return}throw Error(te(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(qa(r,""),i.flags&=-33);var s=$p(t);Cd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=$p(t);bd(t,o,a);break;default:throw Error(te(161))}}catch(l){St(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function n1(t,e,n){he=t,ov(t)}function ov(t,e,n){for(var i=(t.mode&1)!==0;he!==null;){var r=he,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Bo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||Kt;o=Bo;var c=Kt;if(Bo=a,(Kt=l)&&!c)for(he=r;he!==null;)a=he,l=a.child,a.tag===22&&a.memoizedState!==null?Qp(r):l!==null?(l.return=a,he=l):Qp(r);for(;s!==null;)he=s,ov(s),s=s.sibling;he=r,Bo=o,Kt=c}Kp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,he=s):Kp(t)}}function Kp(t){for(;he!==null;){var e=he;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Kt||gc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Kt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Xn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&kp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}kp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&Ka(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(te(163))}Kt||e.flags&512&&Ad(e)}catch(f){St(e,e.return,f)}}if(e===t){he=null;break}if(n=e.sibling,n!==null){n.return=e.return,he=n;break}he=e.return}}function Zp(t){for(;he!==null;){var e=he;if(e===t){he=null;break}var n=e.sibling;if(n!==null){n.return=e.return,he=n;break}he=e.return}}function Qp(t){for(;he!==null;){var e=he;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{gc(4,e)}catch(l){St(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){St(e,r,l)}}var s=e.return;try{Ad(e)}catch(l){St(e,s,l)}break;case 5:var a=e.return;try{Ad(e)}catch(l){St(e,a,l)}}}catch(l){St(e,e.return,l)}if(e===t){he=null;break}var o=e.sibling;if(o!==null){o.return=e.return,he=o;break}he=e.return}}var i1=Math.ceil,Xl=zi.ReactCurrentDispatcher,ah=zi.ReactCurrentOwner,Un=zi.ReactCurrentBatchConfig,Ye=0,zt=null,Pt=null,Gt=0,yn=0,Rs=xr(0),kt=0,oo=null,Xr=0,vc=0,oh=0,za=null,ln=null,lh=0,qs=1/0,Mi=null,$l=!1,Rd=null,or=null,Ho=!1,er=null,Yl=0,Ba=0,Pd=null,yl=-1,xl=0;function nn(){return Ye&6?Tt():yl!==-1?yl:yl=Tt()}function lr(t){return t.mode&1?Ye&2&&Gt!==0?Gt&-Gt:Bx.transition!==null?(xl===0&&(xl=jg()),xl):(t=st,t!==0||(t=window.event,t=t===void 0?16:Qg(t.type)),t):1}function ti(t,e,n,i){if(50<Ba)throw Ba=0,Pd=null,Error(te(185));mo(t,n,i),(!(Ye&2)||t!==zt)&&(t===zt&&(!(Ye&2)&&(vc|=n),kt===4&&Zi(t,Gt)),fn(t,i),n===1&&Ye===0&&!(e.mode&1)&&(qs=Tt()+500,hc&&Sr()))}function fn(t,e){var n=t.callbackNode;By(t,e);var i=Ll(t,t===zt?Gt:0);if(i===0)n!==null&&op(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&op(n),e===1)t.tag===0?zx(Jp.bind(null,t)):v0(Jp.bind(null,t)),Dx(function(){!(Ye&6)&&Sr()}),n=null;else{switch(qg(i)){case 1:n=kf;break;case 4:n=Gg;break;case 16:n=Il;break;case 536870912:n=Wg;break;default:n=Il}n=mv(n,lv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function lv(t,e){if(yl=-1,xl=0,Ye&6)throw Error(te(327));var n=t.callbackNode;if(Us()&&t.callbackNode!==n)return null;var i=Ll(t,t===zt?Gt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Kl(t,i);else{e=i;var r=Ye;Ye|=2;var s=uv();(zt!==t||Gt!==e)&&(Mi=null,qs=Tt()+500,Vr(t,e));do try{a1();break}catch(o){cv(t,o)}while(!0);Xf(),Xl.current=s,Ye=r,Pt!==null?e=0:(zt=null,Gt=0,e=kt)}if(e!==0){if(e===2&&(r=id(t),r!==0&&(i=r,e=Id(t,r))),e===1)throw n=oo,Vr(t,0),Zi(t,i),fn(t,Tt()),n;if(e===6)Zi(t,i);else{if(r=t.current.alternate,!(i&30)&&!r1(r)&&(e=Kl(t,i),e===2&&(s=id(t),s!==0&&(i=s,e=Id(t,s))),e===1))throw n=oo,Vr(t,0),Zi(t,i),fn(t,Tt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(te(345));case 2:Ir(t,ln,Mi);break;case 3:if(Zi(t,i),(i&130023424)===i&&(e=lh+500-Tt(),10<e)){if(Ll(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){nn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=dd(Ir.bind(null,t,ln,Mi),e);break}Ir(t,ln,Mi);break;case 4:if(Zi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-ei(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Tt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*i1(i/1960))-i,10<i){t.timeoutHandle=dd(Ir.bind(null,t,ln,Mi),i);break}Ir(t,ln,Mi);break;case 5:Ir(t,ln,Mi);break;default:throw Error(te(329))}}}return fn(t,Tt()),t.callbackNode===n?lv.bind(null,t):null}function Id(t,e){var n=za;return t.current.memoizedState.isDehydrated&&(Vr(t,e).flags|=256),t=Kl(t,e),t!==2&&(e=ln,ln=n,e!==null&&Ld(e)),t}function Ld(t){ln===null?ln=t:ln.push.apply(ln,t)}function r1(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ii(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Zi(t,e){for(e&=~oh,e&=~vc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ei(e),i=1<<n;t[n]=-1,e&=~i}}function Jp(t){if(Ye&6)throw Error(te(327));Us();var e=Ll(t,0);if(!(e&1))return fn(t,Tt()),null;var n=Kl(t,e);if(t.tag!==0&&n===2){var i=id(t);i!==0&&(e=i,n=Id(t,i))}if(n===1)throw n=oo,Vr(t,0),Zi(t,e),fn(t,Tt()),n;if(n===6)throw Error(te(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ir(t,ln,Mi),fn(t,Tt()),null}function ch(t,e){var n=Ye;Ye|=1;try{return t(e)}finally{Ye=n,Ye===0&&(qs=Tt()+500,hc&&Sr())}}function $r(t){er!==null&&er.tag===0&&!(Ye&6)&&Us();var e=Ye;Ye|=1;var n=Un.transition,i=st;try{if(Un.transition=null,st=1,t)return t()}finally{st=i,Un.transition=n,Ye=e,!(Ye&6)&&Sr()}}function uh(){yn=Rs.current,dt(Rs)}function Vr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,kx(n)),Pt!==null)for(n=Pt.return;n!==null;){var i=n;switch(Wf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Fl();break;case 3:Ws(),dt(un),dt(Zt),Jf();break;case 5:Qf(i);break;case 4:Ws();break;case 13:dt(gt);break;case 19:dt(gt);break;case 10:$f(i.type._context);break;case 22:case 23:uh()}n=n.return}if(zt=t,Pt=t=cr(t.current,null),Gt=yn=e,kt=0,oo=null,oh=vc=Xr=0,ln=za=null,Fr!==null){for(e=0;e<Fr.length;e++)if(n=Fr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Fr=null}return t}function cv(t,e){do{var n=Pt;try{if(Xf(),gl.current=ql,jl){for(var i=vt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}jl=!1}if(qr=0,Ot=Nt=vt=null,Fa=!1,ro=0,ah.current=null,n===null||n.return===null){kt=1,oo=e,Pt=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Gt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=o,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=Bp(a);if(p!==null){p.flags&=-257,Hp(p,a,o,s,e),p.mode&1&&zp(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var x=new Set;x.add(l),e.updateQueue=x}else v.add(l);break e}else{if(!(e&1)){zp(s,c,e),dh();break e}l=Error(te(426))}}else if(ht&&o.mode&1){var g=Bp(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),Hp(g,a,o,s,e),jf(js(l,o));break e}}s=l=js(l,o),kt!==4&&(kt=2),za===null?za=[s]:za.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=q0(s,l,e);Np(s,u);break e;case 1:o=l;var _=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(or===null||!or.has(y)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=X0(s,o,e);Np(s,S);break e}}s=s.return}while(s!==null)}fv(n)}catch(b){e=b,Pt===n&&n!==null&&(Pt=n=n.return);continue}break}while(!0)}function uv(){var t=Xl.current;return Xl.current=ql,t===null?ql:t}function dh(){(kt===0||kt===3||kt===2)&&(kt=4),zt===null||!(Xr&268435455)&&!(vc&268435455)||Zi(zt,Gt)}function Kl(t,e){var n=Ye;Ye|=2;var i=uv();(zt!==t||Gt!==e)&&(Mi=null,Vr(t,e));do try{s1();break}catch(r){cv(t,r)}while(!0);if(Xf(),Ye=n,Xl.current=i,Pt!==null)throw Error(te(261));return zt=null,Gt=0,kt}function s1(){for(;Pt!==null;)dv(Pt)}function a1(){for(;Pt!==null&&!Iy();)dv(Pt)}function dv(t){var e=pv(t.alternate,t,yn);t.memoizedProps=t.pendingProps,e===null?fv(t):Pt=e,ah.current=null}function fv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Jx(n,e),n!==null){n.flags&=32767,Pt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{kt=6,Pt=null;return}}else if(n=Qx(n,e,yn),n!==null){Pt=n;return}if(e=e.sibling,e!==null){Pt=e;return}Pt=e=t}while(e!==null);kt===0&&(kt=5)}function Ir(t,e,n){var i=st,r=Un.transition;try{Un.transition=null,st=1,o1(t,e,n,i)}finally{Un.transition=r,st=i}return null}function o1(t,e,n,i){do Us();while(er!==null);if(Ye&6)throw Error(te(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(te(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Hy(t,s),t===zt&&(Pt=zt=null,Gt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ho||(Ho=!0,mv(Il,function(){return Us(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Un.transition,Un.transition=null;var a=st;st=1;var o=Ye;Ye|=4,ah.current=null,t1(t,n),av(n,t),bx(cd),Nl=!!ld,cd=ld=null,t.current=n,n1(n),Ly(),Ye=o,st=a,Un.transition=s}else t.current=n;if(Ho&&(Ho=!1,er=t,Yl=r),s=t.pendingLanes,s===0&&(or=null),Dy(n.stateNode),fn(t,Tt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if($l)throw $l=!1,t=Rd,Rd=null,t;return Yl&1&&t.tag!==0&&Us(),s=t.pendingLanes,s&1?t===Pd?Ba++:(Ba=0,Pd=t):Ba=0,Sr(),null}function Us(){if(er!==null){var t=qg(Yl),e=Un.transition,n=st;try{if(Un.transition=null,st=16>t?16:t,er===null)var i=!1;else{if(t=er,er=null,Yl=0,Ye&6)throw Error(te(331));var r=Ye;for(Ye|=4,he=t.current;he!==null;){var s=he,a=s.child;if(he.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(he=c;he!==null;){var d=he;switch(d.tag){case 0:case 11:case 15:Oa(8,d,s)}var h=d.child;if(h!==null)h.return=d,he=h;else for(;he!==null;){d=he;var f=d.sibling,p=d.return;if(iv(d),d===c){he=null;break}if(f!==null){f.return=p,he=f;break}he=p}}}var v=s.alternate;if(v!==null){var x=v.child;if(x!==null){v.child=null;do{var g=x.sibling;x.sibling=null,x=g}while(x!==null)}}he=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,he=a;else e:for(;he!==null;){if(s=he,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Oa(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,he=u;break e}he=s.return}}var _=t.current;for(he=_;he!==null;){a=he;var y=a.child;if(a.subtreeFlags&2064&&y!==null)y.return=a,he=y;else e:for(a=_;he!==null;){if(o=he,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:gc(9,o)}}catch(b){St(o,o.return,b)}if(o===a){he=null;break e}var S=o.sibling;if(S!==null){S.return=o.return,he=S;break e}he=o.return}}if(Ye=r,Sr(),di&&typeof di.onPostCommitFiberRoot=="function")try{di.onPostCommitFiberRoot(lc,t)}catch{}i=!0}return i}finally{st=n,Un.transition=e}}return!1}function em(t,e,n){e=js(n,e),e=q0(t,e,1),t=ar(t,e,1),e=nn(),t!==null&&(mo(t,1,e),fn(t,e))}function St(t,e,n){if(t.tag===3)em(t,t,n);else for(;e!==null;){if(e.tag===3){em(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(or===null||!or.has(i))){t=js(n,t),t=X0(e,t,1),e=ar(e,t,1),t=nn(),e!==null&&(mo(e,1,t),fn(e,t));break}}e=e.return}}function l1(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=nn(),t.pingedLanes|=t.suspendedLanes&n,zt===t&&(Gt&n)===n&&(kt===4||kt===3&&(Gt&130023424)===Gt&&500>Tt()-lh?Vr(t,0):oh|=n),fn(t,e)}function hv(t,e){e===0&&(t.mode&1?(e=Io,Io<<=1,!(Io&130023424)&&(Io=4194304)):e=1);var n=nn();t=Di(t,e),t!==null&&(mo(t,e,n),fn(t,n))}function c1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),hv(t,n)}function u1(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(te(314))}i!==null&&i.delete(e),hv(t,n)}var pv;pv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||un.current)cn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return cn=!1,Zx(t,e,n);cn=!!(t.flags&131072)}else cn=!1,ht&&e.flags&1048576&&_0(e,Bl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;_l(t,e),t=e.pendingProps;var r=Hs(e,Zt.current);Ds(e,n),r=th(null,e,i,t,r,n);var s=nh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,dn(i)?(s=!0,Ol(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Kf(e),r.updater=mc,e.stateNode=r,r._reactInternals=e,_d(e,i,t,n),e=Sd(null,e,i,!0,s,n)):(e.tag=0,ht&&s&&Gf(e),tn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(_l(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=f1(i),t=Xn(i,t),r){case 0:e=xd(null,e,i,t,n);break e;case 1:e=Wp(null,e,i,t,n);break e;case 11:e=Vp(null,e,i,t,n);break e;case 14:e=Gp(null,e,i,Xn(i.type,t),n);break e}throw Error(te(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),xd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),Wp(t,e,i,r,n);case 3:e:{if(Z0(e),t===null)throw Error(te(387));i=e.pendingProps,s=e.memoizedState,r=s.element,w0(t,e),Gl(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=js(Error(te(423)),e),e=jp(t,e,i,n,r);break e}else if(i!==r){r=js(Error(te(424)),e),e=jp(t,e,i,n,r);break e}else for(Sn=sr(e.stateNode.containerInfo.firstChild),Mn=e,ht=!0,Yn=null,n=M0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Vs(),i===r){e=Ui(t,e,n);break e}tn(t,e,i,n)}e=e.child}return e;case 5:return T0(e),t===null&&md(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,ud(i,r)?a=null:s!==null&&ud(i,s)&&(e.flags|=32),K0(t,e),tn(t,e,a,n),e.child;case 6:return t===null&&md(e),null;case 13:return Q0(t,e,n);case 4:return Zf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Gs(e,null,i,n):tn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),Vp(t,e,i,r,n);case 7:return tn(t,e,e.pendingProps,n),e.child;case 8:return tn(t,e,e.pendingProps.children,n),e.child;case 12:return tn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,lt(Hl,i._currentValue),i._currentValue=a,s!==null)if(ii(s.value,a)){if(s.children===r.children&&!un.current){e=Ui(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Pi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),gd(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(te(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),gd(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}tn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Ds(e,n),r=On(r),i=i(r),e.flags|=1,tn(t,e,i,n),e.child;case 14:return i=e.type,r=Xn(i,e.pendingProps),r=Xn(i.type,r),Gp(t,e,i,r,n);case 15:return $0(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),_l(t,e),e.tag=1,dn(i)?(t=!0,Ol(e)):t=!1,Ds(e,n),j0(e,i,r),_d(e,i,r,n),Sd(null,e,i,!0,t,n);case 19:return J0(t,e,n);case 22:return Y0(t,e,n)}throw Error(te(156,e.tag))};function mv(t,e){return Vg(t,e)}function d1(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Dn(t,e,n,i){return new d1(t,e,n,i)}function fh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function f1(t){if(typeof t=="function")return fh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===If)return 11;if(t===Lf)return 14}return 2}function cr(t,e){var n=t.alternate;return n===null?(n=Dn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Sl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")fh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case ys:return Gr(n.children,r,s,e);case Pf:a=8,r|=8;break;case Vu:return t=Dn(12,n,e,r|2),t.elementType=Vu,t.lanes=s,t;case Gu:return t=Dn(13,n,e,r),t.elementType=Gu,t.lanes=s,t;case Wu:return t=Dn(19,n,e,r),t.elementType=Wu,t.lanes=s,t;case Tg:return _c(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Eg:a=10;break e;case wg:a=9;break e;case If:a=11;break e;case Lf:a=14;break e;case $i:a=16,i=null;break e}throw Error(te(130,t==null?t:typeof t,""))}return e=Dn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Gr(t,e,n,i){return t=Dn(7,t,i,e),t.lanes=n,t}function _c(t,e,n,i){return t=Dn(22,t,i,e),t.elementType=Tg,t.lanes=n,t.stateNode={isHidden:!1},t}function su(t,e,n){return t=Dn(6,t,null,e),t.lanes=n,t}function au(t,e,n){return e=Dn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function h1(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Bc(0),this.expirationTimes=Bc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function hh(t,e,n,i,r,s,a,o,l){return t=new h1(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Dn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Kf(s),t}function p1(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:_s,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function gv(t){if(!t)return pr;t=t._reactInternals;e:{if(es(t)!==t||t.tag!==1)throw Error(te(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(dn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(te(171))}if(t.tag===1){var n=t.type;if(dn(n))return g0(t,n,e)}return e}function vv(t,e,n,i,r,s,a,o,l){return t=hh(n,i,!0,t,r,s,a,o,l),t.context=gv(null),n=t.current,i=nn(),r=lr(n),s=Pi(i,r),s.callback=e??null,ar(n,s,r),t.current.lanes=r,mo(t,r,i),fn(t,i),t}function yc(t,e,n,i){var r=e.current,s=nn(),a=lr(r);return n=gv(n),e.context===null?e.context=n:e.pendingContext=n,e=Pi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=ar(r,e,a),t!==null&&(ti(t,r,a,s),ml(t,r,a)),a}function Zl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function tm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ph(t,e){tm(t,e),(t=t.alternate)&&tm(t,e)}function m1(){return null}var _v=typeof reportError=="function"?reportError:function(t){console.error(t)};function mh(t){this._internalRoot=t}xc.prototype.render=mh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(te(409));yc(t,e,null,null)};xc.prototype.unmount=mh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;$r(function(){yc(null,t,null,null)}),e[ki]=null}};function xc(t){this._internalRoot=t}xc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Yg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ki.length&&e!==0&&e<Ki[n].priority;n++);Ki.splice(n,0,t),n===0&&Zg(t)}};function gh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Sc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function nm(){}function g1(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Zl(a);s.call(c)}}var a=vv(e,i,t,0,null,!1,!1,"",nm);return t._reactRootContainer=a,t[ki]=a.current,Ja(t.nodeType===8?t.parentNode:t),$r(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=Zl(l);o.call(c)}}var l=hh(t,0,!1,null,null,!1,!1,"",nm);return t._reactRootContainer=l,t[ki]=l.current,Ja(t.nodeType===8?t.parentNode:t),$r(function(){yc(e,l,n,i)}),l}function Mc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=Zl(a);o.call(l)}}yc(e,a,t,r)}else a=g1(n,e,t,r,i);return Zl(a)}Xg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ca(e.pendingLanes);n!==0&&(Df(e,n|1),fn(e,Tt()),!(Ye&6)&&(qs=Tt()+500,Sr()))}break;case 13:$r(function(){var i=Di(t,1);if(i!==null){var r=nn();ti(i,t,1,r)}}),ph(t,1)}};Uf=function(t){if(t.tag===13){var e=Di(t,134217728);if(e!==null){var n=nn();ti(e,t,134217728,n)}ph(t,134217728)}};$g=function(t){if(t.tag===13){var e=lr(t),n=Di(t,e);if(n!==null){var i=nn();ti(n,t,e,i)}ph(t,e)}};Yg=function(){return st};Kg=function(t,e){var n=st;try{return st=t,e()}finally{st=n}};ed=function(t,e,n){switch(e){case"input":if(Xu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=fc(i);if(!r)throw Error(te(90));bg(i),Xu(i,r)}}}break;case"textarea":Rg(t,n);break;case"select":e=n.value,e!=null&&Is(t,!!n.multiple,e,!1)}};Ug=ch;Fg=$r;var v1={usingClientEntryPoint:!1,Events:[vo,Es,fc,kg,Dg,ch]},xa={findFiberByHostInstance:Ur,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_1={bundleType:xa.bundleType,version:xa.version,rendererPackageName:xa.rendererPackageName,rendererConfig:xa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Bg(t),t===null?null:t.stateNode},findFiberByHostInstance:xa.findFiberByHostInstance||m1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Vo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Vo.isDisabled&&Vo.supportsFiber)try{lc=Vo.inject(_1),di=Vo}catch{}}bn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=v1;bn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!gh(e))throw Error(te(200));return p1(t,e,null,n)};bn.createRoot=function(t,e){if(!gh(t))throw Error(te(299));var n=!1,i="",r=_v;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=hh(t,1,!1,null,null,n,!1,i,r),t[ki]=e.current,Ja(t.nodeType===8?t.parentNode:t),new mh(e)};bn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(te(188)):(t=Object.keys(t).join(","),Error(te(268,t)));return t=Bg(e),t=t===null?null:t.stateNode,t};bn.flushSync=function(t){return $r(t)};bn.hydrate=function(t,e,n){if(!Sc(e))throw Error(te(200));return Mc(null,t,e,!0,n)};bn.hydrateRoot=function(t,e,n){if(!gh(t))throw Error(te(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=_v;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=vv(e,null,t,1,n??null,r,!1,s,a),t[ki]=e.current,Ja(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new xc(e)};bn.render=function(t,e,n){if(!Sc(e))throw Error(te(200));return Mc(null,t,e,!1,n)};bn.unmountComponentAtNode=function(t){if(!Sc(t))throw Error(te(40));return t._reactRootContainer?($r(function(){Mc(null,null,t,!1,function(){t._reactRootContainer=null,t[ki]=null})}),!0):!1};bn.unstable_batchedUpdates=ch;bn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Sc(n))throw Error(te(200));if(t==null||t._reactInternals===void 0)throw Error(te(38));return Mc(t,e,n,!1,i)};bn.version="18.3.1-next-f1338f8080-20240426";function yv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yv)}catch(t){console.error(t)}}yv(),yg.exports=bn;var y1=yg.exports,im=y1;Bu.createRoot=im.createRoot,Bu.hydrateRoot=im.hydrateRoot;const xv=[{id:"cut_woodland_tree",skillId:"woodcutting",name:"Woodland Tree",levelRequired:1,intervalMs:1300,xp:8,masteryXp:4,description:"A steady source of basic logs.",area:"Greenrise Grove",tags:["gathering"],outputs:[{itemId:"normal_log",quantity:1,chance:1}],visual:{targetName:"Tree",color:"#16a34a",shape:"tree"}},{id:"cut_oak_tree",skillId:"woodcutting",name:"Oak Stand",levelRequired:5,intervalMs:2300,xp:18,masteryXp:8,description:"Sturdier logs for bows and shields.",area:"Greenrise Grove",tags:["gathering"],outputs:[{itemId:"oak_log",quantity:1,chance:1}],visual:{targetName:"Oak",color:"#65a30d",shape:"tree"}},{id:"cut_willow_tree",skillId:"woodcutting",name:"Willow Copse",levelRequired:10,intervalMs:3600,xp:42,masteryXp:16,description:"Flexible wood for longbows, steel grips, and wand shafts.",area:"Glasswater Bank",tags:["gathering"],outputs:[{itemId:"willow_log",quantity:1,chance:1}],visual:{targetName:"Willow",color:"#84cc16",shape:"tree"}},{id:"fish_shrimp",skillId:"fishing",name:"Tidepool Shrimp",levelRequired:1,intervalMs:1500,xp:9,masteryXp:4,description:"Easy food for the first fights.",area:"Glasswater Coast",tags:["gathering"],outputs:[{itemId:"raw_shrimp",quantity:1,chance:1}],visual:{targetName:"Tidepool",color:"#0284c7",shape:"water"}},{id:"fish_trout",skillId:"fishing",name:"River Trout",levelRequired:6,intervalMs:2600,xp:22,masteryXp:10,description:"Better food for long combat runs.",area:"Glasswater River",tags:["gathering"],outputs:[{itemId:"raw_trout",quantity:1,chance:1}],visual:{targetName:"River",color:"#0ea5e9",shape:"water"}},{id:"fish_salmon",skillId:"fishing",name:"Highwater Salmon",levelRequired:10,intervalMs:3600,xp:44,masteryXp:18,description:"A richer catch that needs fuel before it becomes strong dungeon food.",area:"Highwater Run",tags:["gathering"],outputs:[{itemId:"raw_salmon",quantity:1,chance:1}],visual:{targetName:"Salmon Run",color:"#fb7185",shape:"water"}},{id:"mine_copper",skillId:"mining",name:"Copper Vein",levelRequired:1,intervalMs:1450,xp:10,masteryXp:4,description:"Copper is half of every bronze bar.",area:"Lowrock Mine",tags:["gathering"],outputs:[{itemId:"copper_ore",quantity:1,chance:1}],visual:{targetName:"Copper",color:"#b45309",shape:"rock"}},{id:"mine_tin",skillId:"mining",name:"Tin Seam",levelRequired:1,intervalMs:1450,xp:10,masteryXp:4,description:"Tin completes the bronze recipe.",area:"Lowrock Mine",tags:["gathering"],outputs:[{itemId:"tin_ore",quantity:1,chance:1}],visual:{targetName:"Tin",color:"#94a3b8",shape:"rock"}},{id:"mine_iron",skillId:"mining",name:"Iron Deposit",levelRequired:8,intervalMs:3200,xp:32,masteryXp:14,description:"Iron opens the first serious weapon tier.",area:"Lowrock Mine",tags:["gathering"],outputs:[{itemId:"iron_ore",quantity:1,chance:1},{itemId:"rune_essence",quantity:1,chance:.08}],visual:{targetName:"Iron",color:"#64748b",shape:"rock"}},{id:"mine_coal",skillId:"mining",name:"Coal Face",levelRequired:10,intervalMs:3600,xp:38,masteryXp:16,description:"Fuel-rich ore for steel bars and hardened arrows.",area:"Lowrock Depths",tags:["gathering"],outputs:[{itemId:"coal_ore",quantity:1,chance:1},{itemId:"rune_essence",quantity:1,chance:.05}],visual:{targetName:"Coal",color:"#1f2937",shape:"rock"}},{id:"burn_normal_log",skillId:"firemaking",name:"Kindle Normal Logs",levelRequired:1,intervalMs:1200,xp:11,masteryXp:5,description:"Fast XP and a small chance at charcoal.",area:"Camp Hearth",tags:["processing"],inputs:[{itemId:"normal_log",quantity:1}],outputs:[{itemId:"charcoal",quantity:1,chance:.35}],visual:{targetName:"Campfire",color:"#f59e0b",shape:"flame"}},{id:"burn_oak_log",skillId:"firemaking",name:"Kindle Oak Logs",levelRequired:5,intervalMs:1700,xp:24,masteryXp:10,description:"Slower fires with better charcoal returns.",area:"Camp Hearth",tags:["processing"],inputs:[{itemId:"oak_log",quantity:1}],outputs:[{itemId:"charcoal",quantity:1,chance:.75}],visual:{targetName:"Oak Fire",color:"#fb923c",shape:"flame"}},{id:"burn_willow_log",skillId:"firemaking",name:"Char Willow Logs",levelRequired:10,intervalMs:2400,xp:44,masteryXp:18,description:"A better charcoal source for steel, salmon, and rune work.",area:"Camp Hearth",tags:["processing"],inputs:[{itemId:"willow_log",quantity:1}],outputs:[{itemId:"charcoal",quantity:2,chance:.65}],visual:{targetName:"Willow Coals",color:"#f59e0b",shape:"flame"}},{id:"cook_shrimp",skillId:"cooking",name:"Cook Shrimp",levelRequired:1,intervalMs:1150,xp:10,masteryXp:4,description:"Reliable early healing for combat.",area:"Saltpan Kitchen",tags:["processing"],inputs:[{itemId:"raw_shrimp",quantity:1}],outputs:[{itemId:"cooked_shrimp",quantity:1,chance:1}],visual:{targetName:"Stove",color:"#fb7185",shape:"flame"}},{id:"cook_trout",skillId:"cooking",name:"Cook Trout",levelRequired:6,intervalMs:1900,xp:26,masteryXp:10,description:"A stronger meal for dungeon runs.",area:"Saltpan Kitchen",tags:["processing"],inputs:[{itemId:"raw_trout",quantity:1}],outputs:[{itemId:"cooked_trout",quantity:1,chance:1}],visual:{targetName:"Grill",color:"#0ea5e9",shape:"flame"}},{id:"smoke_salmon",skillId:"cooking",name:"Smoke Salmon",levelRequired:10,intervalMs:2800,xp:48,masteryXp:18,description:"Turns salmon and charcoal into reliable dungeon food.",area:"Saltpan Smokehouse",tags:["processing"],inputs:[{itemId:"raw_salmon",quantity:1},{itemId:"charcoal",quantity:1}],outputs:[{itemId:"cooked_salmon",quantity:1,chance:1}],visual:{targetName:"Smokehouse",color:"#f43f5e",shape:"flame"}},{id:"smelt_bronze_bar",skillId:"smithing",name:"Smelt Bronze Bar",levelRequired:1,intervalMs:1800,xp:16,masteryXp:7,description:"Consumes one copper and one tin ore.",area:"Lowrock Forge",tags:["processing"],inputs:[{itemId:"copper_ore",quantity:1},{itemId:"tin_ore",quantity:1}],outputs:[{itemId:"bronze_bar",quantity:1,chance:1}],visual:{targetName:"Smelter",color:"#94a3b8",shape:"forge"}},{id:"smelt_iron_bar",skillId:"smithing",name:"Smelt Iron Bar",levelRequired:8,intervalMs:2600,xp:36,masteryXp:14,description:"Consumes iron ore and charcoal.",area:"Lowrock Forge",tags:["processing"],inputs:[{itemId:"iron_ore",quantity:1},{itemId:"charcoal",quantity:1}],outputs:[{itemId:"iron_bar",quantity:1,chance:1}],visual:{targetName:"Iron Forge",color:"#64748b",shape:"forge"}},{id:"smelt_steel_bar",skillId:"smithing",name:"Smelt Steel Bar",levelRequired:12,intervalMs:3600,xp:62,masteryXp:22,description:"Consumes iron, coal, and charcoal for the first rare metal tier.",area:"Lowrock Forge",tags:["processing"],inputs:[{itemId:"iron_ore",quantity:1},{itemId:"coal_ore",quantity:1},{itemId:"charcoal",quantity:1}],outputs:[{itemId:"steel_bar",quantity:1,chance:1}],visual:{targetName:"Steel Furnace",color:"#64748b",shape:"forge"}},{id:"forge_bronze_sword",skillId:"smithing",name:"Forge Bronze Sword",levelRequired:3,intervalMs:2600,xp:28,masteryXp:12,description:"First meaningful melee upgrade.",area:"Lowrock Forge",tags:["crafting"],inputs:[{itemId:"bronze_bar",quantity:2}],outputs:[{itemId:"bronze_sword",quantity:1,chance:1}],visual:{targetName:"Anvil",color:"#cd7f32",shape:"forge"}},{id:"forge_bronze_armor",skillId:"smithing",name:"Forge Bronze Armor",levelRequired:5,intervalMs:3400,xp:42,masteryXp:16,description:"Alternates between helm and legs for early defence.",area:"Lowrock Forge",tags:["crafting"],inputs:[{itemId:"bronze_bar",quantity:3}],outputs:[{itemId:"bronze_helm",quantity:1,chance:.55},{itemId:"bronze_platelegs",quantity:1,chance:.45}],visual:{targetName:"Armor Stand",color:"#cd7f32",shape:"forge"}},{id:"forge_iron_sword",skillId:"smithing",name:"Forge Iron Sword",levelRequired:9,intervalMs:4200,xp:72,masteryXp:24,description:"A strong weapon for the Ember Vault.",area:"Lowrock Forge",tags:["crafting"],inputs:[{itemId:"iron_bar",quantity:3}],outputs:[{itemId:"iron_sword",quantity:1,chance:1}],visual:{targetName:"Iron Anvil",color:"#cbd5e1",shape:"forge"}},{id:"forge_iron_shield",skillId:"smithing",name:"Forge Iron Shield",levelRequired:10,intervalMs:3800,xp:58,masteryXp:20,description:"A defensive upgrade that binds metal to an oak frame with fuel.",area:"Lowrock Forge",tags:["crafting"],inputs:[{itemId:"iron_bar",quantity:2},{itemId:"oak_log",quantity:1},{itemId:"charcoal",quantity:1}],outputs:[{itemId:"iron_shield",quantity:1,chance:1}],visual:{targetName:"Shield Mold",color:"#9ca3af",shape:"forge"}},{id:"forge_steel_sword",skillId:"smithing",name:"Forge Steel Sword",levelRequired:14,intervalMs:5200,xp:112,masteryXp:34,description:"A serious weapon that needs steel bars and a willow grip.",area:"Lowrock Forge",tags:["crafting"],inputs:[{itemId:"steel_bar",quantity:4},{itemId:"willow_log",quantity:1}],outputs:[{itemId:"steel_sword",quantity:1,chance:1}],visual:{targetName:"Steel Anvil",color:"#94a3b8",shape:"forge"}},{id:"fletch_shortbow",skillId:"fletching",name:"Fletch Shortbow",levelRequired:3,intervalMs:2100,xp:24,masteryXp:11,description:"Turns oak into a ranged weapon.",area:"Bowyer Bench",tags:["crafting"],inputs:[{itemId:"oak_log",quantity:2}],outputs:[{itemId:"shortbow",quantity:1,chance:1},{itemId:"training_arrows",quantity:25,chance:1}],visual:{targetName:"Bow Bench",color:"#84cc16",shape:"workbench"}},{id:"fletch_hardened_arrows",skillId:"fletching",name:"Fletch Hardened Arrows",levelRequired:8,intervalMs:3e3,xp:42,masteryXp:16,description:"Combines oak shafts with iron and charcoal-treated arrowheads.",area:"Bowyer Bench",tags:["crafting"],inputs:[{itemId:"oak_log",quantity:1},{itemId:"iron_bar",quantity:1},{itemId:"charcoal",quantity:1}],outputs:[{itemId:"hardened_arrows",quantity:35,chance:1}],visual:{targetName:"Arrow Jig",color:"#facc15",shape:"workbench"}},{id:"fletch_longbow",skillId:"fletching",name:"Fletch Longbow",levelRequired:10,intervalMs:3600,xp:58,masteryXp:21,description:"A ranged upgrade that needs flexible willow and monster leather.",area:"Bowyer Bench",tags:["crafting"],inputs:[{itemId:"willow_log",quantity:2},{itemId:"leather",quantity:1}],outputs:[{itemId:"longbow",quantity:1,chance:1}],visual:{targetName:"Longbow Form",color:"#84cc16",shape:"workbench"}},{id:"craft_leather_body",skillId:"crafting",name:"Stitch Leather Body",levelRequired:3,intervalMs:2300,xp:26,masteryXp:12,description:"Turns monster leather into light armor.",area:"Tinker Table",tags:["crafting"],inputs:[{itemId:"leather",quantity:3}],outputs:[{itemId:"leather_body",quantity:1,chance:1}],visual:{targetName:"Stitching Table",color:"#14b8a6",shape:"workbench"}},{id:"craft_wooden_shield",skillId:"crafting",name:"Shape Wooden Shield",levelRequired:2,intervalMs:1900,xp:20,masteryXp:9,description:"A defensive bridge from gathering to combat.",area:"Tinker Table",tags:["crafting"],inputs:[{itemId:"oak_log",quantity:2},{itemId:"charcoal",quantity:1}],outputs:[{itemId:"wooden_shield",quantity:1,chance:1}],visual:{targetName:"Shield Press",color:"#8b5e34",shape:"workbench"}},{id:"craft_apprentice_wand",skillId:"crafting",name:"Craft Apprentice Wand",levelRequired:7,intervalMs:3600,xp:54,masteryXp:20,description:"Turns willow, monster leather, and a rune focus into magic gear.",area:"Tinker Table",tags:["crafting","magic"],inputs:[{itemId:"willow_log",quantity:1},{itemId:"rune_focus",quantity:1},{itemId:"leather",quantity:2}],outputs:[{itemId:"apprentice_wand",quantity:1,chance:1}],visual:{targetName:"Wand Lathe",color:"#818cf8",shape:"workbench"}},{id:"craft_air_runes",skillId:"runecrafting",name:"Craft Air Runes",levelRequired:1,intervalMs:1800,xp:17,masteryXp:7,description:"Basic runes from essence.",area:"First Altar",tags:["magic","processing"],inputs:[{itemId:"rune_essence",quantity:1}],outputs:[{itemId:"air_rune",quantity:8,chance:1}],visual:{targetName:"Air Altar",color:"#a5f3fc",shape:"runes"}},{id:"craft_fire_runes",skillId:"runecrafting",name:"Craft Fire Runes",levelRequired:5,intervalMs:2400,xp:28,masteryXp:11,description:"More volatile runes for future spells.",area:"First Altar",tags:["magic","processing"],inputs:[{itemId:"rune_essence",quantity:1},{itemId:"charcoal",quantity:1}],outputs:[{itemId:"fire_rune",quantity:6,chance:1}],visual:{targetName:"Fire Altar",color:"#fb923c",shape:"runes"}},{id:"bind_rune_focus",skillId:"runecrafting",name:"Bind Rune Focus",levelRequired:8,intervalMs:3400,xp:46,masteryXp:18,description:"Binds essence, air, fire, and charcoal into a wand core.",area:"First Altar",tags:["magic","crafting"],inputs:[{itemId:"rune_essence",quantity:2},{itemId:"air_rune",quantity:12},{itemId:"fire_rune",quantity:6},{itemId:"charcoal",quantity:1}],outputs:[{itemId:"rune_focus",quantity:1,chance:1}],visual:{targetName:"Rune Core",color:"#a78bfa",shape:"runes"}}],ri=xv.reduce((t,e)=>(t[e.id]=e,t),{});function x1(t){return xv.filter(e=>e.skillId===t)}const Sv=[{id:"weapon",label:"Weapon"},{id:"shield",label:"Shield"},{id:"helm",label:"Helm"},{id:"body",label:"Body"},{id:"legs",label:"Legs"},{id:"gloves",label:"Gloves"},{id:"boots",label:"Boots"},{id:"amulet",label:"Amulet"},{id:"ring",label:"Ring"},{id:"ammo",label:"Ammo"}],Mt={normal_log:{id:"normal_log",name:"Normal Log",type:"resource",rarity:"common",iconText:"LG",color:"#8b5e34",description:"Basic wood for fires and early tools.",sellValue:2,stackable:!0,category:"wood"},oak_log:{id:"oak_log",name:"Oak Log",type:"resource",rarity:"common",iconText:"OK",color:"#a8793f",description:"Sturdy wood for bows and stronger fires.",sellValue:5,stackable:!0,category:"wood"},willow_log:{id:"willow_log",name:"Willow Log",type:"resource",rarity:"uncommon",iconText:"WL",color:"#84cc16",description:"Flexible wood used for mid-tier bows and wand shafts.",sellValue:9,stackable:!0,category:"wood"},charcoal:{id:"charcoal",name:"Charcoal",type:"material",rarity:"common",iconText:"CH",color:"#334155",description:"Fuel used by smithing and runecrafting.",sellValue:4,stackable:!0,category:"material"},raw_shrimp:{id:"raw_shrimp",name:"Raw Shrimp",type:"resource",rarity:"common",iconText:"RS",color:"#fb7185",description:"Raw food. Cook it before combat.",sellValue:3,stackable:!0,category:"fish"},cooked_shrimp:{id:"cooked_shrimp",name:"Cooked Shrimp",type:"food",rarity:"common",iconText:"CS",color:"#f97316",description:"Restores 9 HP automatically in combat.",sellValue:6,stackable:!0,category:"food",healAmount:9},raw_trout:{id:"raw_trout",name:"Raw Trout",type:"resource",rarity:"uncommon",iconText:"RT",color:"#38bdf8",description:"A better fish for cooking practice.",sellValue:7,stackable:!0,category:"fish"},cooked_trout:{id:"cooked_trout",name:"Cooked Trout",type:"food",rarity:"uncommon",iconText:"CT",color:"#0ea5e9",description:"Restores 18 HP automatically in combat.",sellValue:14,stackable:!0,category:"food",healAmount:18},raw_salmon:{id:"raw_salmon",name:"Raw Salmon",type:"resource",rarity:"uncommon",iconText:"RA",color:"#fb7185",description:"A richer catch that needs fuel to cook well.",sellValue:11,stackable:!0,category:"fish"},cooked_salmon:{id:"cooked_salmon",name:"Smoked Salmon",type:"food",rarity:"uncommon",iconText:"SA",color:"#f43f5e",description:"Restores 28 HP automatically in combat.",sellValue:23,stackable:!0,category:"food",healAmount:28},copper_ore:{id:"copper_ore",name:"Copper Ore",type:"resource",rarity:"common",iconText:"CO",color:"#b45309",description:"Smelt with tin to create bronze.",sellValue:4,stackable:!0,category:"ore"},tin_ore:{id:"tin_ore",name:"Tin Ore",type:"resource",rarity:"common",iconText:"TO",color:"#94a3b8",description:"Smelt with copper to create bronze.",sellValue:4,stackable:!0,category:"ore"},iron_ore:{id:"iron_ore",name:"Iron Ore",type:"resource",rarity:"uncommon",iconText:"IO",color:"#64748b",description:"A reliable ore for stronger equipment.",sellValue:9,stackable:!0,category:"ore"},coal_ore:{id:"coal_ore",name:"Coal Ore",type:"resource",rarity:"uncommon",iconText:"CL",color:"#1f2937",description:"Dense fuel needed for steel and deep forge work.",sellValue:10,stackable:!0,category:"ore"},bronze_bar:{id:"bronze_bar",name:"Bronze Bar",type:"material",rarity:"common",iconText:"BB",color:"#cd7f32",description:"Used to forge simple weapons and armor.",sellValue:14,stackable:!0,category:"bar"},iron_bar:{id:"iron_bar",name:"Iron Bar",type:"material",rarity:"uncommon",iconText:"IB",color:"#9ca3af",description:"Used for sturdier combat equipment.",sellValue:25,stackable:!0,category:"bar"},steel_bar:{id:"steel_bar",name:"Steel Bar",type:"material",rarity:"rare",iconText:"ST",color:"#64748b",description:"A refined bar that links mining, firemaking, and smithing.",sellValue:42,stackable:!0,category:"bar"},leather:{id:"leather",name:"Leather",type:"material",rarity:"common",iconText:"LE",color:"#92400e",description:"Flexible material dropped by early monsters.",sellValue:8,stackable:!0,category:"material"},rune_essence:{id:"rune_essence",name:"Rune Essence",type:"material",rarity:"common",iconText:"RE",color:"#c4b5fd",description:"Raw magical matter used to craft runes.",sellValue:6,stackable:!0,category:"rune"},air_rune:{id:"air_rune",name:"Air Rune",type:"rune",rarity:"common",iconText:"AR",color:"#a5f3fc",description:"Basic rune for magic combat.",sellValue:2,stackable:!0,category:"rune"},fire_rune:{id:"fire_rune",name:"Fire Rune",type:"rune",rarity:"common",iconText:"FR",color:"#fb923c",description:"A warm rune used by early damage spells.",sellValue:3,stackable:!0,category:"rune"},rune_focus:{id:"rune_focus",name:"Rune Focus",type:"material",rarity:"uncommon",iconText:"RF",color:"#a78bfa",description:"Bound runes and fuel used to craft magical equipment.",sellValue:38,stackable:!0,category:"rune"},training_sword:{id:"training_sword",name:"Training Sword",type:"equipment",rarity:"common",iconText:"TS",color:"#cbd5e1",description:"A simple blade for new heroes.",sellValue:10,stackable:!1,category:"weapon",equipment:{slot:"weapon",stats:{attack:2,strength:1,maxHit:1}}},bronze_sword:{id:"bronze_sword",name:"Bronze Sword",type:"equipment",rarity:"common",iconText:"BS",color:"#cd7f32",description:"A forged sword with reliable balance.",sellValue:55,stackable:!1,category:"weapon",equipment:{slot:"weapon",stats:{attack:6,strength:4,maxHit:2},levelRequirements:{attack:3}}},iron_sword:{id:"iron_sword",name:"Iron Sword",type:"equipment",rarity:"uncommon",iconText:"IS",color:"#cbd5e1",description:"Sharper and heavier than bronze.",sellValue:120,stackable:!1,category:"weapon",equipment:{slot:"weapon",stats:{attack:12,strength:8,maxHit:4},levelRequirements:{attack:8}}},steel_sword:{id:"steel_sword",name:"Steel Sword",type:"equipment",rarity:"rare",iconText:"SS",color:"#94a3b8",description:"A serious blade for pushing deeper into the Ember Vault.",sellValue:240,stackable:!1,category:"weapon",equipment:{slot:"weapon",stats:{attack:18,strength:14,maxHit:6},levelRequirements:{attack:14}}},wooden_shield:{id:"wooden_shield",name:"Wooden Shield",type:"equipment",rarity:"common",iconText:"WS",color:"#8b5e34",description:"A light shield made from oak.",sellValue:35,stackable:!1,category:"shield",equipment:{slot:"shield",stats:{defence:5},levelRequirements:{defence:2}}},iron_shield:{id:"iron_shield",name:"Iron Shield",type:"equipment",rarity:"uncommon",iconText:"IH",color:"#9ca3af",description:"A reinforced shield that consumes metal, wood, and fuel.",sellValue:105,stackable:!1,category:"shield",equipment:{slot:"shield",stats:{defence:9},levelRequirements:{defence:8}}},leather_body:{id:"leather_body",name:"Leather Body",type:"equipment",rarity:"common",iconText:"LB",color:"#92400e",description:"Flexible armor for early fights.",sellValue:45,stackable:!1,category:"armor",equipment:{slot:"body",stats:{defence:4,ranged:2},levelRequirements:{defence:3}}},bronze_helm:{id:"bronze_helm",name:"Bronze Helm",type:"equipment",rarity:"common",iconText:"BH",color:"#cd7f32",description:"Basic protection for dungeon attempts.",sellValue:45,stackable:!1,category:"armor",equipment:{slot:"helm",stats:{defence:3},levelRequirements:{defence:3}}},bronze_platelegs:{id:"bronze_platelegs",name:"Bronze Platelegs",type:"equipment",rarity:"common",iconText:"BP",color:"#cd7f32",description:"Heavy early armor.",sellValue:70,stackable:!1,category:"armor",equipment:{slot:"legs",stats:{defence:5},levelRequirements:{defence:4}}},shortbow:{id:"shortbow",name:"Shortbow",type:"equipment",rarity:"common",iconText:"SB",color:"#a3e635",description:"A fast bow for ranged training.",sellValue:45,stackable:!1,category:"weapon",equipment:{slot:"weapon",stats:{ranged:6,maxHit:2,intervalReduction:100},levelRequirements:{ranged:3}}},longbow:{id:"longbow",name:"Longbow",type:"equipment",rarity:"uncommon",iconText:"LW",color:"#84cc16",description:"A stronger ranged weapon shaped from flexible willow.",sellValue:125,stackable:!1,category:"weapon",equipment:{slot:"weapon",stats:{ranged:11,maxHit:4,intervalReduction:160},levelRequirements:{ranged:9}}},training_arrows:{id:"training_arrows",name:"Training Arrows",type:"equipment",rarity:"common",iconText:"TA",color:"#facc15",description:"Simple arrows for the shortbow.",sellValue:1,stackable:!0,category:"ammo",equipment:{slot:"ammo",stats:{ranged:2}}},hardened_arrows:{id:"hardened_arrows",name:"Hardened Arrows",type:"equipment",rarity:"uncommon",iconText:"HA",color:"#fde68a",description:"Iron-tipped arrows for mid-tier ranged training.",sellValue:2,stackable:!0,category:"ammo",equipment:{slot:"ammo",stats:{ranged:5},levelRequirements:{ranged:8}}},apprentice_wand:{id:"apprentice_wand",name:"Apprentice Wand",type:"equipment",rarity:"uncommon",iconText:"AW",color:"#818cf8",description:"Focuses crafted runes into small bursts.",sellValue:80,stackable:!1,category:"weapon",equipment:{slot:"weapon",stats:{magic:8,maxHit:3},levelRequirements:{magic:4}}},ember_amulet:{id:"ember_amulet",name:"Ember Amulet",type:"equipment",rarity:"rare",iconText:"EA",color:"#fb923c",description:"A rare charm from the Ember Vault.",sellValue:320,stackable:!1,category:"amulet",equipment:{slot:"amulet",stats:{attack:2,strength:2,magic:2,prayer:1,maxHit:1}}},vault_key:{id:"vault_key",name:"Vault Key",type:"relic",rarity:"rare",iconText:"VK",color:"#facc15",description:"Opens the first dungeon path.",sellValue:90,stackable:!0,category:"relic"},ancient_page:{id:"ancient_page",name:"Ancient Page",type:"relic",rarity:"epic",iconText:"AP",color:"#fde68a",description:"A lore page used by future Atlas upgrades.",sellValue:180,stackable:!0,category:"relic"},tiny_wisp:{id:"tiny_wisp",name:"Tiny Wisp",type:"pet",rarity:"legendary",iconText:"TW",color:"#67e8f9",description:"A rare companion that marks your luck.",sellValue:0,stackable:!1,category:"pet"}},S1={training_sword:1,cooked_shrimp:8,normal_log:6},Mv=[{id:"bank_slot_bundle",name:"Bank Slot Bundle",description:"Adds 8 permanent bank slots.",cost:180,maxPurchases:8,effectLabel:"+8 bank slots"},{id:"tool_oil",name:"Tool Oil",description:"Future upgrade hook for skilling speed.",cost:500,maxPurchases:1,effectLabel:"Prepared for speed upgrades"}],vh=[{id:"attack",name:"Attack",category:"combat",description:"Accuracy with melee weapons.",color:"#ef4444",accent:"#fecaca",order:10,implemented:!0,unlockedByDefault:!0},{id:"strength",name:"Strength",category:"combat",description:"Raw melee damage.",color:"#f97316",accent:"#fed7aa",order:11,implemented:!0,unlockedByDefault:!0},{id:"defence",name:"Defence",category:"combat",description:"Reduces incoming damage.",color:"#0ea5e9",accent:"#bae6fd",order:12,implemented:!0,unlockedByDefault:!0},{id:"hitpoints",name:"Hitpoints",category:"combat",description:"Keeps your hero standing.",color:"#dc2626",accent:"#fecaca",order:13,implemented:!0,unlockedByDefault:!0},{id:"ranged",name:"Ranged",category:"combat",description:"Marksman training and ammo mastery.",color:"#22c55e",accent:"#bbf7d0",order:14,implemented:!0,unlockedByDefault:!0},{id:"magic",name:"Magic",category:"combat",description:"Spell accuracy and magical force.",color:"#6366f1",accent:"#c7d2fe",order:15,implemented:!0,unlockedByDefault:!0},{id:"prayer",name:"Prayer",category:"combat",description:"Passive combat blessings.",color:"#eab308",accent:"#fef08a",order:16,implemented:!1,unlockedByDefault:!0,lockedNote:"Blessings arrive after the first dungeon."},{id:"slayer",name:"Slayer",category:"combat",description:"Task-based monster hunting.",color:"#a855f7",accent:"#e9d5ff",order:17,implemented:!1,unlockedByDefault:!1,lockedNote:"Unlocks in a later combat pass."},{id:"woodcutting",name:"Woodcutting",category:"gathering",description:"Harvest logs used by firemaking and fletching.",color:"#16a34a",accent:"#bbf7d0",order:20,implemented:!0,unlockedByDefault:!0},{id:"fishing",name:"Fishing",category:"gathering",description:"Catch fish that become combat food.",color:"#0284c7",accent:"#bae6fd",order:21,implemented:!0,unlockedByDefault:!0},{id:"mining",name:"Mining",category:"gathering",description:"Mine ore for smithing bars and gear.",color:"#64748b",accent:"#cbd5e1",order:22,implemented:!0,unlockedByDefault:!0},{id:"thieving",name:"Thieving",category:"gathering",description:"Risky GP and material gathering.",color:"#d946ef",accent:"#f5d0fe",order:23,implemented:!1,unlockedByDefault:!1,lockedNote:"Planned for the next town update."},{id:"firemaking",name:"Firemaking",category:"processing",description:"Burn logs for XP and useful charcoal.",color:"#f59e0b",accent:"#fde68a",order:30,implemented:!0,unlockedByDefault:!0},{id:"cooking",name:"Cooking",category:"processing",description:"Turn raw fish into food for combat.",color:"#fb7185",accent:"#ffe4e6",order:31,implemented:!0,unlockedByDefault:!0},{id:"smithing",name:"Smithing",category:"processing",description:"Smelt bars and forge early equipment.",color:"#94a3b8",accent:"#e2e8f0",order:32,implemented:!0,unlockedByDefault:!0},{id:"fletching",name:"Fletching",category:"processing",description:"Make bows and ammo from wood.",color:"#84cc16",accent:"#d9f99d",order:33,implemented:!0,unlockedByDefault:!0},{id:"crafting",name:"Crafting",category:"processing",description:"Create gear and accessories from monster materials.",color:"#14b8a6",accent:"#99f6e4",order:34,implemented:!0,unlockedByDefault:!0},{id:"runecrafting",name:"Runecrafting",category:"processing",description:"Craft runes for magic combat.",color:"#8b5cf6",accent:"#ddd6fe",order:35,implemented:!0,unlockedByDefault:!0},{id:"herblore",name:"Herblore",category:"processing",description:"Brew potions from farming and monster drops.",color:"#10b981",accent:"#a7f3d0",order:36,implemented:!1,unlockedByDefault:!1,lockedNote:"Potion lab is planned after Farming."},{id:"farming",name:"Farming",category:"processing",description:"Grow ingredients on long timers.",color:"#65a30d",accent:"#bef264",order:37,implemented:!1,unlockedByDefault:!1,lockedNote:"Long-cycle timers arrive in a future pass."},{id:"summoning",name:"Summoning",category:"support",description:"Create familiars and synergies.",color:"#06b6d4",accent:"#a5f3fc",order:40,implemented:!1,unlockedByDefault:!1,lockedNote:"Synergies are visible but not active yet."},{id:"astrology",name:"Astrology",category:"support",description:"Passive constellations and small bonuses.",color:"#7c3aed",accent:"#ddd6fe",order:41,implemented:!1,unlockedByDefault:!1,lockedNote:"Planned as a passive mastery system."},{id:"agility",name:"Agility",category:"support",description:"Build courses that modify your whole account.",color:"#0891b2",accent:"#a5f3fc",order:42,implemented:!1,unlockedByDefault:!1,lockedNote:"Course building comes later."},{id:"altMagic",name:"Alt. Magic",category:"support",description:"Utility spells for converting resources.",color:"#4f46e5",accent:"#c7d2fe",order:43,implemented:!1,unlockedByDefault:!1,lockedNote:"Utility spells will use crafted runes."},{id:"township",name:"Township",category:"world",description:"Manage a settlement that feeds the economy.",color:"#0f766e",accent:"#99f6e4",order:50,implemented:!1,unlockedByDefault:!1,lockedNote:"Large expansion feature."},{id:"atlas",name:"Atlas",category:"world",description:"Discover regions, relics, and long-term goals.",color:"#b45309",accent:"#fed7aa",order:51,implemented:!1,unlockedByDefault:!1,lockedNote:"Discovery map planned as endgame progression."}],si=vh.reduce((t,e)=>(t[e.id]=e,t),{}),M1=[{id:"combat",label:"Combat"},{id:"gathering",label:"Gathering"},{id:"processing",label:"Processing"},{id:"support",label:"Support"},{id:"world",label:"World"}],E1=[{id:"training",label:"Training"},{id:"crafting",label:"Crafting"},{id:"combat",label:"Combat"},{id:"exploration",label:"Exploration"},{id:"collection",label:"Collection"}],zr=[{id:"level_10_any",name:"First Rhythm",description:"Reach level 10 in any skill.",category:"training",tier:"bronze",points:5,check:"level10",reward:[{gp:50,quantity:1}]},{id:"three_level_10",name:"Balanced Routine",description:"Reach level 10 in three different skills.",category:"training",tier:"silver",points:12,check:"threeLevel10",reward:[{gp:120,quantity:1}]},{id:"first_craft",name:"Hands On",description:"Craft or forge your first equipment item.",category:"crafting",tier:"bronze",points:5,check:"firstCraft",reward:[{gp:35,quantity:1}]},{id:"steel_weapon",name:"Steel Intent",description:"Own or equip a Steel Sword.",category:"crafting",tier:"gold",points:20,check:"steelWeapon",reward:[{gp:180,quantity:1}]},{id:"rune_focus",name:"Bound Focus",description:"Craft a Rune Focus or Apprentice Wand.",category:"crafting",tier:"silver",points:14,check:"runeFocus",reward:[{gp:90,quantity:1}]},{id:"first_dungeon_clear",name:"Vault Breaker",description:"Clear the Ember Vault once.",category:"combat",tier:"silver",points:15,check:"firstDungeon",reward:[{gp:140,quantity:1}]},{id:"three_dungeon_clears",name:"Vault Regular",description:"Clear dungeons three times.",category:"combat",tier:"gold",points:25,check:"threeDungeonClears",reward:[{itemId:"ancient_page",quantity:1}]},{id:"vault_prep",name:"Ready for the Heat",description:"Own an Iron Shield and at least 10 Smoked Salmon.",category:"combat",tier:"silver",points:12,check:"vaultPrep",reward:[{gp:110,quantity:1}]},{id:"map_scout",name:"Camp Cartographer",description:"Discover 12 map tiles.",category:"exploration",tier:"bronze",points:6,check:"mapScout",reward:[{gp:70,quantity:1}]},{id:"secret_hunter",name:"Under the Ash",description:"Find three map secrets.",category:"exploration",tier:"gold",points:20,check:"secretHunter",reward:[{itemId:"vault_key",quantity:1}]},{id:"hundred_logs",name:"Timber Routine",description:"Hold 100 total logs in the bank.",category:"collection",tier:"bronze",points:8,check:"hundredLogs",reward:[{itemId:"charcoal",quantity:15}]},{id:"supply_cache",name:"Supply Cache",description:"Hold 350 stackable resources, food, materials, bars, ores, or runes.",category:"collection",tier:"silver",points:14,check:"supplyCache",reward:[{gp:125,quantity:1}]},{id:"rare_find",name:"Rare Spark",description:"Discover a rare or better item.",category:"collection",tier:"silver",points:12,check:"rareItem",reward:[{gp:100,quantity:1}]},{id:"ranged_kit",name:"Full Draw",description:"Own a Longbow and Hardened Arrows.",category:"collection",tier:"silver",points:12,check:"rangedKit",reward:[{itemId:"training_arrows",quantity:100}]}],w1=1.25;function Ql(t,e,n){return Math.min(n,Math.max(e,t))}function Jl(t){if(t<=1)return 0;let e=0;for(let n=1;n<t;n+=1)e+=Math.floor((55+n*22+Math.pow(n,2.12)*10)*w1);return e}function ec(t){let e=1;for(;e<120&&t>=Jl(e+1);)e+=1;return e}function Vt(t,e){var n;return ec(((n=t.skills[e])==null?void 0:n.xp)??0)}function Ev(t,e){var a;const n=((a=t.skills[e])==null?void 0:a.xp)??0,i=ec(n),r=Jl(i),s=Jl(i+1);return s===r?1:Ql((n-r)/(s-r),0,1)}function Fn(t,e=!0){return e?t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e4?`${(t/1e3).toFixed(1)}K`:Math.floor(t).toLocaleString():Math.floor(t).toLocaleString()}function _h(t){return Object.values(t.bank).filter(e=>e>0).length}function T1(t,e,n){if(typeof n=="number")return n;const i=t??1,r=e??i;return Math.floor(i+Math.random()*(r-i+1))}function yh(t){const e={attack:0,strength:0,defence:0,ranged:0,magic:0,prayer:0,maxHit:0,intervalReduction:0};return Object.values(t.equipment).forEach(n=>{if(!n)return;const i=Mt[n];i!=null&&i.equipment&&Object.entries(i.equipment.stats).forEach(([r,s])=>{const a=r;e[a]+=s??0})}),e}function Bn(t){const e=Vt(t,"hitpoints"),n=yh(t);return Math.floor(32+e*7+n.defence*.65)}function xh(t){const e=yh(t),n=Vt(t,"attack"),i=Vt(t,"strength"),r=Vt(t,"defence"),s=Vt(t,"ranged"),a=Vt(t,"magic"),o=Math.floor(42+n*2.4+s*.9+a*.9+e.attack*2.6+e.ranged*2.1+e.magic*2.1),l=Math.floor(28+r*2.2+e.defence*2.8),c=Math.max(1,Math.floor(2+i/3+e.strength/2+e.maxHit)),d=Ql(2600-e.intervalReduction,1400,3400);return{accuracy:o,defence:l,maxHit:c,attackIntervalMs:d}}function A1(t,e){var i;const n=(i=e.equipment)==null?void 0:i.levelRequirements;return n?Object.entries(n).every(([r,s])=>Vt(t,r)>=(s??1)):!0}function rm(t){return{common:1,uncommon:2,rare:3,epic:4,legendary:5}[t.rarity]}const b1=6,Pa=b1,wv=2200,la={minX:-Pa,maxX:Pa,minY:-Pa,maxY:Pa},Sh={origin:{label:"Camp",color:"#38bdf8",short:"Safe camp and survey point."},plains:{label:"Wilds",color:"#84cc16",short:"Open ground with small discoveries."},grove:{label:"Grove",color:"#22c55e",short:"Trees, herbs, and hidden paths."},mine:{label:"Mine",color:"#94a3b8",short:"Stone seams and buried caches."},coast:{label:"Coast",color:"#0ea5e9",short:"Waterways, tide pools, and wreckage."},ruins:{label:"Ruins",color:"#a78bfa",short:"Old masonry with secrets inside."},shrine:{label:"Shrine",color:"#facc15",short:"A quiet place for offerings and relics."},npc:{label:"NPC",color:"#14b8a6",short:"A wanderer with a story or trade."},puzzle:{label:"Puzzle",color:"#c084fc",short:"A lock, riddle, or strange mechanism."},treasure:{label:"Treasure",color:"#f59e0b",short:"A stash waiting to be searched."},encounter:{label:"Encounter",color:"#fb7185",short:"Hostile movement in the dark."},boss:{label:"Boss",color:"#ef4444",short:"A dangerous guardian blocks this place."},locked:{label:"Locked",color:"#64748b",short:"Something bars the way for now."}},Mh={rune_order:{id:"rune_order",title:"Runic Sequence",prompt:"Three stones glow in sequence: air, ember, shadow. Which rune do you touch last?",choices:[{id:"air",label:"Air"},{id:"ember",label:"Ember"},{id:"shadow",label:"Shadow"}],solutionId:"shadow",solvedText:"The stones settle and reveal a small cache of essence.",failureText:"The runes dim. The sequence resets, waiting for a calmer hand.",rewards:[{itemId:"rune_essence",quantity:6,chance:1},{itemId:"air_rune",quantity:12,chance:1}]},ancient_lock:{id:"ancient_lock",title:"Ancient Lock",prompt:"A bronze lock has three worn teeth. Which craft answers it?",choices:[{id:"forge",label:"Forge heat"},{id:"thread",label:"Leather thread"},{id:"water",label:"River water"}],solutionId:"forge",solvedText:"Heat softens the old mechanism. The lock gives way.",failureText:"The lock grinds and refuses to move.",rewards:[{itemId:"bronze_bar",quantity:2,chance:1},{gp:28,quantity:1,chance:1}]},offering_shrine:{id:"offering_shrine",title:"Offering Shrine",prompt:"A shrine asks for a humble offering. What belongs here?",choices:[{id:"log",label:"A clean log"},{id:"ore",label:"A cold ore"},{id:"coin",label:"A coin"}],solutionId:"log",solvedText:"The shrine accepts the simple gift and uncovers a relic page.",failureText:"The shrine remains silent.",rewards:[{itemId:"ancient_page",quantity:1,chance:1},{gp:42,quantity:1,chance:1}]}};function En(t){return`${t.x},${t.y}`}function Ec(t){const[e,n]=t.split(",").map(Number);return{x:Number.isFinite(e)?e:0,y:Number.isFinite(n)?n:0}}function wc(t,e={x:0,y:0}){return Math.abs(t.x-e.x)+Math.abs(t.y-e.y)}function Tc(t,e){return t.x===e.x&&t.y===e.y}function Nd(t,e){return wc(t,e)===1}function Tv(t){return[{x:t.x,y:t.y-1},{x:t.x+1,y:t.y},{x:t.x,y:t.y+1},{x:t.x-1,y:t.y}]}function mr(t,e){return t.x>=e.minX&&t.x<=e.maxX&&t.y>=e.minY&&t.y<=e.maxY}function Eh(t=la){const e=[];for(let n=t.minY;n<=t.maxY;n+=1)for(let i=t.minX;i<=t.maxX;i+=1)e.push({x:i,y:n});return e}function C1(t=la){return{columns:t.maxX-t.minX+1,rows:t.maxY-t.minY+1}}function R1(t,e,n){let i=t^Math.imul(e.x+374761393,668265263)^Math.imul(e.y+1442695041,2246822519)^Math.imul(n,3266489917);return i=Math.imul(i^i>>>15,2246822507),i=Math.imul(i^i>>>13,3266489909),(i^i>>>16)>>>0}function lo(t,e,n){return R1(t,e,n)/4294967295}function Ha(t,e,n,i){return t[Math.floor(lo(e,n,i)*t.length)%t.length]}function P1(t,e,n,i=!1){return i||t>=7?"vault_warden":t>=5?Ha(["cave_sentry","ember_acolyte"],e,n,20):t>=3?Ha(["lane_bandit","cave_sentry"],e,n,21):Ha(["training_dummy","lane_bandit"],e,n,22)}function I1(t,e){return Ha(Object.keys(Mh),t,e,30)}function Av(){return Math.floor(1e5+Math.random()*9e5)}function bv(t,e=la){const n=Eh(e).filter(r=>wc(r)>=Pa+3&&mr(r,e)&&!Tc(r,{x:0,y:0})),i={x:e.maxX,y:e.maxY};return n.length?n[Math.floor(lo(t,i,42)*n.length)%n.length]:i}function L1(t,e){return t==="treasure"?[{gp:20+e*9,quantity:1,chance:1},{itemId:"vault_key",quantity:1,chance:e>3?.25:.08}]:t==="grove"?[{itemId:e>3?"oak_log":"normal_log",quantity:3+Math.floor(e/2),chance:1}]:t==="mine"?[{itemId:e>4?"iron_ore":"copper_ore",quantity:2+Math.floor(e/2),chance:1},{itemId:"tin_ore",quantity:2,chance:e<=4?.7:.15}]:t==="coast"?[{itemId:e>4?"raw_trout":"raw_shrimp",quantity:3,chance:1}]:t==="npc"?[{gp:18+e*4,quantity:1,chance:1},{itemId:"cooked_shrimp",quantity:2,chance:.6}]:t==="shrine"?[{itemId:"rune_essence",quantity:3+e,chance:1},{itemId:"ancient_page",quantity:1,chance:e>4?.18:.04}]:t==="ruins"?[{itemId:"ancient_page",quantity:1,chance:.18},{gp:30+e*6,quantity:1,chance:1}]:[]}function N1(t,e,n=null){const i=wc(e);if(i===0)return"origin";if(n&&Tc(e,n))return"boss";const r=lo(t,e,1);if(i>=6&&r>.9||r>.76)return"encounter";if(r>.66)return"treasure";if(r>.56)return"puzzle";if(r>.49)return"npc";if(r>.42)return"shrine";if(r>.34)return"ruins";const s=lo(t,e,2);return s>.75?"coast":s>.5?"mine":s>.25?"grove":"plains"}function ca(t,e,n=null){const i=En(e),r=wc(e),s=N1(t,e,n),a=Sh[s],o=Ha(["Greenrise","Lowrock","Glasswater","Emberfall","Old Vale"],t,e,3),l=lo(t,e,4)>.92&&r>1,c=s==="boss"?5:s==="encounter"?Math.min(4,1+Math.floor(r/2)):s==="locked"?3:Math.max(0,Math.floor(r/4)),d=wv+Math.min(4200,r*260+c*360),h=L1(s,r),f={key:i,coord:e,type:s,name:s==="origin"?"Hero Camp":`${o} ${a.label}`,description:s==="origin"?"The center of your expedition. Routes branch in every direction.":`${a.short} Distance ${r} from camp.`,biome:o,color:a.color,danger:c,travelTimeMs:d,rewards:h,secret:l};return(s==="encounter"||s==="boss")&&(f.monsterId=P1(r,t,e,s==="boss")),s==="puzzle"&&(f.puzzleId=I1(t,e)),f}function k1(t,e=la,n=bv(t,e)){return Eh(e).reduce((i,r)=>{const s=ca(t,r,n);return i[s.key]=s,i},{})}function ou(t,e){return Object.entries(t).reduce((n,[i,r])=>(r&&e.has(i)&&(n[i]=!0),n),{})}function wh(t=Av(),e=1,n=la){const i={x:0,y:0},r={x:0,y:0},s=bv(t,n),a=k1(t,n,s),o={};[i,...Tv(i)].forEach(c=>{if(!mr(c,n))return;const d=a[En(c)]??ca(t,c,s);a[d.key]=d,o[d.key]=!0});const l=En(i);return{runId:e,runStatus:"active",seed:t,bounds:n,origin:r,position:i,destination:null,travelProgressMs:0,travelIntervalMs:wv,revealed:o,explored:{[l]:!0},completed:{[l]:!0},knownTiles:a,selectedTileKey:l,activeTileKey:l,activePuzzleId:null,bossTileKey:En(s),runStartedAt:Date.now(),runCompletedAt:null,secretsFound:0,bossesDefeated:0,mapLog:[]}}function D1(t){var c;const e=(t==null?void 0:t.seed)??Av(),n=(t==null?void 0:t.bounds)??la,i=wh(e,(t==null?void 0:t.runId)??1,n);if(!t)return i;const r=t.position&&mr(t.position,n)?t.position:i.position,s=t.destination&&mr(t.destination,n)?t.destination:null,a={...i,...t,runId:t.runId??i.runId,runStatus:t.runStatus??i.runStatus,bounds:n,origin:t.origin??i.origin,position:r,destination:s,revealed:{...i.revealed,...t.revealed??{}},explored:{...i.explored,...t.explored??{}},completed:{...i.completed,...t.completed??{}},knownTiles:i.knownTiles,bossTileKey:t.bossTileKey&&((c=i.knownTiles[t.bossTileKey])==null?void 0:c.type)==="boss"?t.bossTileKey:i.bossTileKey,runStartedAt:t.runStartedAt??i.runStartedAt,runCompletedAt:t.runCompletedAt??i.runCompletedAt,mapLog:t.mapLog??i.mapLog},o=En(a.position);a.knownTiles[o]||(a.knownTiles[o]=ca(a.seed,a.position,a.bossTileKey?Ec(a.bossTileKey):null));const l=new Set(Object.keys(a.knownTiles));return a.revealed=ou(a.revealed,l),a.explored=ou(a.explored,l),a.completed=ou(a.completed,l),a.revealed[o]=!0,a.explored[o]=!0,(!a.selectedTileKey||!a.knownTiles[a.selectedTileKey])&&(a.selectedTileKey=o),(!a.activeTileKey||!a.knownTiles[a.activeTileKey])&&(a.activeTileKey=o),a}function lu(t,e){return t.knownTiles[En(e)]??ca(t.seed,e,t.bossTileKey?Ec(t.bossTileKey):null)}const Cv=3;function kd(t){return JSON.parse(JSON.stringify(t))}function Va(t=Date.now()){const e=vh.reduce((i,r)=>(i[r.id]={xp:r.id==="hitpoints"?Jl(5):0,masteryXp:0,unlocked:r.unlockedByDefault},i),{}),n=Sv.reduce((i,r)=>(i[r.id]=null,i),{});return{version:Cv,playerName:"Idle Hero",mode:"standard",gp:50,bankSlots:28,activeView:"map",selectedSkill:"woodcutting",activeActionId:null,actionProgressMs:0,skills:e,bank:{...S1},equipment:n,map:wh(),combat:{mode:"idle",selectedMonsterId:"training_dummy",activeMonsterId:null,dungeonId:null,dungeonStep:0,dungeonClears:0,playerHp:67,monsterHp:0,playerProgressMs:0,monsterProgressMs:0,lastHit:null,mapTileKey:null},pets:{},achievements:zr.reduce((i,r)=>(i[r.id]=!1,i),{}),shopPurchases:{},activityLog:[{id:`log-${t}`,time:t,tone:"info",message:"Welcome to Idle Hero. Run 1 begins at camp. The map is fixed until the expedition ends."}],offlineSummary:null,settings:{reduceMotion:!1,compactNumbers:!0,showBackgroundScene:!0,highContrastMode:!1,denseBank:!1,hideLockedSkills:!1,showMapLabels:!0,showLogTimestamps:!0,confirmReset:!0},createdAt:t,lastSavedAt:t}}function De(t,e,n){t.activityLog=[{id:`log-${Date.now()}-${Math.random().toString(16).slice(2)}`,time:Date.now(),tone:e,message:n},...t.activityLog].slice(0,40)}function tr(t,e,n,i=0){const r=t.skills[e];if(!r||n<=0)return;const s=ec(r.xp);r.xp+=n,r.masteryXp+=i;const a=ec(r.xp);a>s&&De(t,"success",`${si[e].name} reached level ${a}.`)}function Th(t,e=[]){return e.every(n=>(t.bank[n.itemId]??0)>=n.quantity)}function co(t,e,n){const i=t.bank[e]??0;if(i<n)return!1;const r=i-n;return r<=0?delete t.bank[e]:t.bank[e]=r,!0}function Rv(t,e=[]){return Th(t,e)?(e.forEach(n=>co(t,n.itemId,n.quantity)),!0):!1}function tc(t,e,n){const i=Mt[e];if(!i||n<=0)return!1;if(i.type==="pet")return t.pets[e]=!0,De(t,"success",`${i.name} joined your collection.`),!0;const r=t.bank[e]??0;return r<=0&&_h(t)>=t.bankSlots?(De(t,"warning",`Bank is full. ${i.name} was left behind.`),!1):(t.bank[e]=r+n,!0)}function U1(t,e){var r;const n=e.chance??1;if(Math.random()>n)return null;const i=T1(e.minQuantity,e.maxQuantity,e.quantity);if(e.gp&&e.gp>0){const s=e.gp*i;return t.gp+=s,{label:"GP",quantity:s}}return e.itemId&&tc(t,e.itemId,i)?{label:((r=Mt[e.itemId])==null?void 0:r.name)??e.itemId,quantity:i}:null}function Xs(t,e){return e.map(n=>U1(t,n)).filter(n=>!!n)}const sm=new Set(["bronze_sword","iron_sword","steel_sword","wooden_shield","iron_shield","leather_body","bronze_helm","bronze_platelegs","shortbow","longbow","hardened_arrows","apprentice_wand"]),F1=new Set(["wood","material","fish","food","ore","bar","rune"]);function Jt(t,e){const n=Math.max(1,e),i=Math.max(0,t);return{current:i,target:n,ratio:Math.min(1,i/n),label:`${Math.min(i,n)} / ${n}`,complete:i>=n}}function am(t){return Object.keys(t.skills).map(e=>Vt(t,e))}function Pv(t,e){const n=t.bank[e]??0,i=Object.values(t.equipment).filter(r=>r===e).length;return n+i}function om(t,e){return e.some(n=>Pv(t,n)>0||!!t.pets[n])}function lm(t,e){return e.filter(n=>Pv(t,n.itemId)>=(n.quantity??1)).length}function O1(t){return(t.bank.normal_log??0)+(t.bank.oak_log??0)+(t.bank.willow_log??0)}function z1(t){return Object.entries(t.bank).reduce((e,[n,i])=>{const r=Mt[n];return!(r!=null&&r.stackable)||!F1.has(r.category)?e:e+i},0)}function B1(t){const e=Object.entries(t.bank).some(([i,r])=>{const s=Mt[i];return r>0&&s&&rm(s)>=3}),n=Object.values(t.equipment).some(i=>{const r=i?Mt[i]:void 0;return r?rm(r)>=3:!1});return e||n||Object.values(t.pets).some(Boolean)}function H1(t){return Object.entries(t.bank).some(([e,n])=>sm.has(e)&&n>0)||Object.values(t.equipment).some(e=>!!(e&&sm.has(e)))}function Iv(t,e){return e.check==="level10"?Jt(Math.max(...am(t)),10):e.check==="threeLevel10"?Jt(am(t).filter(n=>n>=10).length,3):e.check==="firstDungeon"?Jt(t.combat.dungeonClears,1):e.check==="threeDungeonClears"?Jt(t.combat.dungeonClears,3):e.check==="hundredLogs"?Jt(O1(t),100):e.check==="supplyCache"?Jt(z1(t),350):e.check==="rareItem"?Jt(B1(t)?1:0,1):e.check==="firstCraft"?Jt(H1(t)?1:0,1):e.check==="mapScout"?Jt(Object.keys(t.map.revealed).length,12):e.check==="secretHunter"?Jt(t.map.secretsFound,3):e.check==="rangedKit"?Jt(lm(t,[{itemId:"longbow"},{itemId:"hardened_arrows"}]),2):e.check==="vaultPrep"?Jt(lm(t,[{itemId:"iron_shield"},{itemId:"cooked_salmon",quantity:10}]),2):e.check==="steelWeapon"?Jt(om(t,["steel_sword"])?1:0,1):e.check==="runeFocus"?Jt(om(t,["rune_focus","apprentice_wand"])?1:0,1):Jt(0,1)}function V1(t){return zr.reduce((e,n)=>e+(t.achievements[n.id]?n.points:0),0)}function G1(t){zr.forEach(e=>{if(t.achievements[e.id])return;if(Iv(t,e).complete){t.achievements[e.id]=!0;const i=e.reward?Xs(t,e.reward):[],r=i.length>0?` Rewards: ${i.map(s=>`${s.quantity} ${s.label}`).join(", ")}.`:"";De(t,"success",`Goal completed: ${e.name}.${r}`)}})}const W1=[{id:"training_dummy",name:"Training Dummy",zone:"Practice Yard",level:1,maxHp:30,attackIntervalMs:2400,stats:{attack:3,strength:2,defence:2,maxHit:3,accuracy:52},xp:{attack:5,strength:5,defence:3,hitpoints:4},drops:[{gp:3,quantity:1,chance:1},{itemId:"rune_essence",quantity:1,chance:.08}],color:"#94a3b8"},{id:"lane_bandit",name:"Lane Bandit",zone:"Old Road",level:4,maxHp:48,attackIntervalMs:2200,stats:{attack:6,strength:5,defence:5,maxHit:5,accuracy:60},xp:{attack:8,strength:8,defence:5,hitpoints:7},drops:[{gp:7,quantity:1,chance:1},{itemId:"leather",quantity:1,chance:.35},{itemId:"vault_key",quantity:1,chance:.04}],color:"#f97316"},{id:"cave_sentry",name:"Cave Sentry",zone:"Lowrock Gate",level:8,maxHp:78,attackIntervalMs:2300,stats:{attack:10,strength:9,defence:10,maxHit:7,accuracy:66},xp:{attack:13,strength:13,defence:10,hitpoints:10},drops:[{gp:14,quantity:1,chance:1},{itemId:"iron_ore",quantity:1,chance:.26},{itemId:"leather",quantity:2,chance:.22},{itemId:"vault_key",quantity:1,chance:.07}],color:"#64748b"},{id:"ember_acolyte",name:"Ember Acolyte",zone:"Ember Vault",level:13,maxHp:112,attackIntervalMs:2100,stats:{attack:15,strength:14,defence:12,maxHit:10,accuracy:71},xp:{attack:18,strength:18,defence:14,hitpoints:14,magic:4},drops:[{gp:24,quantity:1,chance:1},{itemId:"fire_rune",quantity:8,chance:.4},{itemId:"ancient_page",quantity:1,chance:.04}],color:"#fb923c"},{id:"vault_warden",name:"Vault Warden",zone:"Ember Vault",level:18,maxHp:180,attackIntervalMs:2e3,stats:{attack:21,strength:20,defence:18,maxHit:14,accuracy:80},xp:{attack:34,strength:34,defence:24,hitpoints:24,prayer:8},drops:[{gp:65,quantity:1,chance:1},{itemId:"ember_amulet",quantity:1,chance:.18},{itemId:"ancient_page",quantity:1,chance:.35},{itemId:"tiny_wisp",quantity:1,chance:.01}],isBoss:!0,color:"#f43f5e"}],pi=W1.reduce((t,e)=>(t[e.id]=e,t),{}),j1=[{id:"ember_vault",name:"Ember Vault",description:"A short dungeon ending with the Vault Warden.",levelRequired:10,monsters:["cave_sentry","ember_acolyte","vault_warden"],reward:[{gp:100,quantity:1,chance:1},{itemId:"ancient_page",quantity:1,chance:1}],color:"#f97316"}],Lv=j1.reduce((t,e)=>(t[e.id]=e,t),{});function cm(t){return Math.max(1,Math.floor(1+Math.random()*t))}function q1(t){var n;return((n=Object.entries(t.bank).map(([i,r])=>({item:Mt[i],itemId:i,quantity:r})).filter(i=>{var r;return i.quantity>0&&!!((r=i.item)!=null&&r.healAmount)}).sort((i,r)=>{var s,a;return(((s=r.item)==null?void 0:s.healAmount)??0)-(((a=i.item)==null?void 0:a.healAmount)??0)})[0])==null?void 0:n.itemId)??null}function X1(t){const e=Bn(t);if(t.combat.playerHp>e*.38)return;const n=q1(t);if(!n)return;const i=Mt[n];!(i!=null&&i.healAmount)||!co(t,n,1)||(t.combat.playerHp=Math.min(e,t.combat.playerHp+i.healAmount),De(t,"info",`Auto-ate ${i.name} for ${i.healAmount} HP.`))}function uo(t,e){const n=pi[e];n&&(t.combat.activeMonsterId=n.id,t.combat.selectedMonsterId=n.id,t.combat.monsterHp=n.maxHp,t.combat.playerProgressMs=0,t.combat.monsterProgressMs=0,t.combat.lastHit=null)}function $1(t){const e=t.combat.activeMonsterId,n=e?pi[e]:void 0;if(!n)return;Object.entries(n.xp).forEach(([s,a])=>tr(t,s,a??0,0));const i=Xs(t,n.drops),r=i.length>0?` Rewards: ${i.map(s=>`${s.quantity} ${s.label}`).join(", ")}.`:"";if(De(t,"success",`${n.name} defeated.${r}`),t.combat.mapTileKey){const s=t.combat.mapTileKey,a=t.map.knownTiles[s];t.map.completed[s]=!0,t.map.activePuzzleId=null,t.map.activeTileKey=s,t.map.selectedTileKey=s,a!=null&&a.secret&&(t.map.secretsFound+=1),(a==null?void 0:a.type)==="boss"&&(t.map.bossesDefeated+=1),(s===t.map.bossTileKey||(a==null?void 0:a.type)==="boss")&&(t.map.runStatus="victory",t.map.runCompletedAt=Date.now()),t.combat.mode="idle",t.combat.activeMonsterId=null,t.combat.dungeonId=null,t.combat.dungeonStep=0,t.combat.monsterHp=0,t.combat.playerProgressMs=0,t.combat.monsterProgressMs=0,t.combat.mapTileKey=null,De(t,"success",`${(a==null?void 0:a.name)??"Map encounter"} secured.`),(s===t.map.bossTileKey||(a==null?void 0:a.type)==="boss")&&De(t,"success",`Run ${t.map.runId} cleared. A new route can now be drawn.`);return}if(t.combat.mode==="dungeon"&&t.combat.dungeonId){const s=Lv[t.combat.dungeonId],a=t.combat.dungeonStep+1;if(!s||a>=s.monsters.length){s&&(Xs(t,s.reward),t.combat.dungeonClears+=1,De(t,"success",`${s.name} cleared.`)),t.combat.mode="idle",t.combat.activeMonsterId=null,t.combat.dungeonId=null,t.combat.dungeonStep=0,t.combat.monsterHp=0,t.combat.mapTileKey=null;return}t.combat.dungeonStep=a,uo(t,s.monsters[a]);return}uo(t,n.id)}function Y1(t,e){if(t.combat.mode==="idle"||!t.combat.activeMonsterId)return;const n=pi[t.combat.activeMonsterId];if(!n)return;const i=xh(t),r=Bn(t);for(t.combat.playerHp<=0&&(t.combat.playerHp=r),t.combat.playerProgressMs+=e,t.combat.monsterProgressMs+=e;t.combat.playerProgressMs>=i.attackIntervalMs&&t.combat.activeMonsterId;){t.combat.playerProgressMs-=i.attackIntervalMs;const a=Ql(i.accuracy/(i.accuracy+n.stats.defence*8),.18,.94),o=Math.random()>a,l=!o&&Math.random()<.08,c=o?0:cm(i.maxHit+(l?2:0));if(t.combat.lastHit={source:"hero",amount:c,missed:o,critical:l},o||(t.combat.monsterHp-=c,tr(t,"attack",c*.55,0),tr(t,"strength",c*.55,0),tr(t,"hitpoints",c*.35,0)),t.combat.monsterHp<=0){$1(t);break}}const s=t.combat.activeMonsterId?pi[t.combat.activeMonsterId]:null;if(s)for(;t.combat.monsterProgressMs>=s.attackIntervalMs&&t.combat.activeMonsterId;){t.combat.monsterProgressMs-=s.attackIntervalMs;const a=Ql(s.stats.accuracy/(s.stats.accuracy+i.defence*4.5),.12,.88),o=Math.random()>a,l=o?0:cm(s.stats.maxHit);if(t.combat.lastHit={source:"monster",amount:l,missed:o},o||(t.combat.playerHp-=l,tr(t,"defence",l*.25,0)),X1(t),t.combat.playerHp<=0){De(t,"danger","You retreated after running out of food."),kv(t),t.combat.playerHp=Math.ceil(Bn(t)*.55);break}}}function K1(t,e){const n=pi[e];n&&(t.activeActionId=null,t.actionProgressMs=0,t.activeView="map",t.combat.mode="monster",t.combat.dungeonId=null,t.combat.dungeonStep=0,t.combat.mapTileKey=null,t.combat.playerHp=Math.max(1,Math.min(t.combat.playerHp||Bn(t),Bn(t))),uo(t,n.id),De(t,"info",`Engaging ${n.name}.`))}function Nv(t,e,n){const i=pi[e];i&&(t.activeActionId=null,t.actionProgressMs=0,t.activeView="map",t.map.destination=null,t.map.travelProgressMs=0,t.map.activeTileKey=n,t.map.selectedTileKey=n,t.combat.mode="monster",t.combat.dungeonId=null,t.combat.dungeonStep=0,t.combat.mapTileKey=n,t.combat.playerHp=Math.max(1,Math.min(t.combat.playerHp||Bn(t),Bn(t))),uo(t,i.id),De(t,"warning",`${i.name} blocks the route.`))}function Z1(t,e){const n=Lv[e];if(!n)return;if(Math.max(Vt(t,"attack"),Vt(t,"strength"),Vt(t,"defence"))<n.levelRequired){De(t,"warning",`${n.name} requires combat level ${n.levelRequired}.`);return}t.activeActionId=null,t.actionProgressMs=0,t.activeView="map",t.combat.mode="dungeon",t.combat.dungeonId=n.id,t.combat.dungeonStep=0,t.combat.mapTileKey=null,t.combat.playerHp=Math.max(1,Math.min(t.combat.playerHp||Bn(t),Bn(t))),uo(t,n.monsters[0]),De(t,"info",`${n.name} started.`)}function kv(t){t.combat.mode="idle",t.combat.activeMonsterId=null,t.combat.dungeonId=null,t.combat.dungeonStep=0,t.combat.monsterHp=0,t.combat.playerProgressMs=0,t.combat.monsterProgressMs=0,t.combat.mapTileKey=null}function Q1(t,e){const n=Mt[e];!(n!=null&&n.healAmount)||!co(t,e,1)||(t.combat.playerHp=Math.min(Bn(t),t.combat.playerHp+n.healAmount),De(t,"info",`Ate ${n.name}.`))}function J1(t,e){if(!t.activeActionId)return;const n=ri[t.activeActionId];if(!n){t.activeActionId=null,t.actionProgressMs=0;return}if(Vt(t,n.skillId)<n.levelRequired){De(t,"warning",`${n.name} requires ${si[n.skillId].name} level ${n.levelRequired}.`),t.activeActionId=null,t.actionProgressMs=0;return}t.actionProgressMs+=e;let r=0;for(;t.actionProgressMs>=n.intervalMs&&r<40;){if(!Th(t,n.inputs)){De(t,"warning",`${n.name} stopped: missing resources.`),t.activeActionId=null,t.actionProgressMs=0;break}Rv(t,n.inputs),tr(t,n.skillId,n.xp,n.masteryXp),Xs(t,n.outputs),t.actionProgressMs-=n.intervalMs,r+=1}if(r>0){const s=r===1?"":` x${r}`;De(t,"info",`${n.name} completed${s}.`)}}function eS(t){if(!t.activeActionId)return;const e=ri[t.activeActionId];t.activeActionId=null,t.actionProgressMs=0,De(t,"info",e?`${e.name} stopped.`:"Action stopped.")}function rt(t,e,n){const i={id:`map-${Date.now()}-${Math.random().toString(16).slice(2)}`,time:Date.now(),tone:e,message:n};t.map.mapLog=[i,...t.map.mapLog].slice(0,24),De(t,e,n)}function Ac(t,e){const n=En(e);return t.map.knownTiles[n]||(t.map.knownTiles[n]=ca(t.map.seed,e,t.map.bossTileKey?Ec(t.map.bossTileKey):null)),t.map.knownTiles[n]}function tS(t,e,n=!1){const i=[e,...Tv(e)];n&&i.push({x:e.x-1,y:e.y-1},{x:e.x+1,y:e.y-1},{x:e.x-1,y:e.y+1},{x:e.x+1,y:e.y+1}),i.forEach(r=>{if(!mr(r,t.map.bounds))return;const s=Ac(t,r);t.map.revealed[s.key]=!0})}function Dv(t,e){if(!mr(e,t.map.bounds))return;const n=Ac(t,e);t.map.selectedTileKey=n.key}function Ah(t,e){t.map.completed[e.key]||(t.map.completed[e.key]=!0,t.map.activePuzzleId=null,e.secret&&(t.map.secretsFound+=1))}function nS(t){if(t.map.runStatus==="active"){if(t.combat.mode!=="idle"){rt(t,"warning","Finish or flee the current encounter before retiring the run.");return}t.map.runStatus="retired",t.map.destination=null,t.map.travelProgressMs=0,t.map.activePuzzleId=null,t.map.runCompletedAt=Date.now(),rt(t,"info",`Run ${t.map.runId} retired. Your permanent progress remains.`)}}function iS(t){if(t.combat.mode!=="idle"){rt(t,"warning","Finish or flee the current encounter before starting a new run.");return}if(t.activeActionId){rt(t,"warning","Stop your current skill action before starting a new run.");return}const e=t.map.runId+1;t.map=wh(void 0,e),t.activeView="map",rt(t,"success",`Run ${t.map.runId} began. The map is fixed until this expedition ends.`)}function Uv(t){return t.length?` Found ${t.map(e=>`${e.quantity} ${e.label}`).join(", ")}.`:""}function rS(t,e=t.map.activeTileKey??t.map.selectedTileKey){if(t.map.runStatus!=="active"){rt(t,"warning","Start a new run to keep exploring.");return}if(!e)return;const n=t.map.knownTiles[e];if(!n)return;if(En(t.map.position)!==n.key){rt(t,"warning","Travel to this location before searching it.");return}if(t.map.completed[n.key]){rt(t,"info",`${n.name} is already resolved.`);return}if(n.type==="puzzle"){t.map.activePuzzleId=n.puzzleId??null,rt(t,"info",`${n.name} waits for an answer.`);return}if(n.type==="encounter"||n.type==="boss"){n.monsterId&&Nv(t,n.monsterId,n.key);return}const i=Xs(t,n.rewards??[]);Ah(t,n);const r=Uv(i);rt(t,n.secret?"success":"info",`${n.name} explored.${r}`)}function sS(t,e,n){if(t.map.runStatus!=="active"){rt(t,"warning","Start a new run to solve new rooms.");return}const i=t.map.knownTiles[e];if(!(i!=null&&i.puzzleId))return;const r=Mh[i.puzzleId];if(!r)return;if(En(t.map.position)!==i.key){rt(t,"warning","You need to stand at the puzzle to solve it.");return}if(t.map.completed[i.key]){rt(t,"info",`${r.title} is already solved.`);return}if(n!==r.solutionId){rt(t,"warning",r.failureText);return}const s=Xs(t,r.rewards);Ah(t,i),rt(t,"success",`${r.solvedText}${Uv(s)}`)}function aS(t,e){if(t.map.activeTileKey=e.key,t.map.selectedTileKey=e.key,t.map.completed[e.key]){rt(t,"info",`Returned to ${e.name}.`);return}if(e.type==="encounter"||e.type==="boss"){const n=e.monsterId?pi[e.monsterId]:null;if(e.monsterId&&n){rt(t,e.type==="boss"?"danger":"warning",`${n.name} emerges at ${e.name}.`),Nv(t,e.monsterId,e.key);return}}if(e.type==="puzzle"){t.map.activePuzzleId=e.puzzleId??null,rt(t,"info",`${e.name} reveals a puzzle.`);return}if(["treasure","npc","shrine","ruins","grove","mine","coast"].includes(e.type)){rt(t,"info",`${e.name} has something to inspect.`);return}rt(t,"info",`${e.name} charted.`),e.type==="plains"&&Ah(t,e)}function oS(t,e){if(t.map.runStatus!=="active"){rt(t,"warning","This run is over. Start a new run to keep exploring.");return}if(t.combat.mode!=="idle"){rt(t,"warning","Finish or flee the current encounter before travelling.");return}if(t.activeActionId){rt(t,"warning","Stop your current skill action before travelling.");return}if(!mr(e,t.map.bounds)){rt(t,"warning","The run map ends there. Choose a room inside the current route.");return}if(!Nd(t.map.position,e)){rt(t,"warning","You can only travel to adjacent tiles."),Dv(t,e);return}const n=Ac(t,e);if(!t.map.revealed[n.key]){rt(t,"warning","The fog hides that route. Reveal it first.");return}Tc(t.map.position,e)||(t.activeView="map",t.map.destination=e,t.map.travelProgressMs=0,t.map.travelIntervalMs=n.travelTimeMs,t.map.selectedTileKey=n.key,t.map.activePuzzleId=null,rt(t,"info",`Travelling to ${n.name}.`))}function Fv(t,e){if(!t.map.destination||t.combat.mode!=="idle")return;if(t.map.runStatus!=="active"){t.map.destination=null,t.map.travelProgressMs=0;return}const n=t.map.destination;if(!mr(n,t.map.bounds)){t.map.destination=null,t.map.travelProgressMs=0,rt(t,"warning","Travel cancelled: that room is outside this run.");return}const i=Ac(t,n);t.map.travelIntervalMs=i.travelTimeMs,t.map.travelProgressMs+=e,!(t.map.travelProgressMs<t.map.travelIntervalMs)&&(t.map.position=n,t.map.destination=null,t.map.travelProgressMs=0,t.map.explored[i.key]=!0,tS(t,n,i.secret??!1),rt(t,"success",`Arrived at ${i.name}.`),aS(t,i))}function lS(t,e){return!t.map.destination||t.combat.mode!=="idle"?!1:(Fv(t,e),!t.map.destination)}const cu=24*60*60*1e3,cS=5e3;function uS(t){var e;return t.gp?"GP":t.itemId?((e=Mt[t.itemId])==null?void 0:e.name)??t.itemId:"Reward"}function dS(t,e){const n=t.chance??1,r=(t.quantity??((t.minQuantity??1)+(t.maxQuantity??t.minQuantity??1))/2)*n*e,s=Math.floor(r),a=r-s;return s+(Math.random()<a?1:0)}function fS(t,e,n){var r;const i=ri[e];return(r=i==null?void 0:i.inputs)!=null&&r.length?i.inputs.reduce((s,a)=>Math.min(s,Math.floor((t.bank[a.itemId]??0)/a.quantity)),n):n}function hS(t,e=Date.now()){var d;const n=Math.max(0,e-t.lastSavedAt);if(n<cS)return{...t,lastSavedAt:e};const i=Math.min(n,cu),r=kd(t);r.lastSavedAt=e;const s=lS(r,i);if(!r.activeActionId)return r.offlineSummary={secondsAway:Math.floor(i/1e3),capped:n>cu,actionName:s?"Map travel":null,completions:s?1:0,rewards:[],xp:{}},r;const a=ri[r.activeActionId];if(!a)return r.activeActionId=null,r.actionProgressMs=0,r;const o=Math.floor((i+r.actionProgressMs)/a.intervalMs),l=fS(r,a.id,o),c=[];for(let h=0;h<l&&Th(r,a.inputs);h+=1)Rv(r,a.inputs);return l>0&&(tr(r,a.skillId,a.xp*l,a.masteryXp*l),a.outputs.forEach(h=>{const f=dS(h,l);if(!(f<=0)){if(h.gp){const p=h.gp*f;r.gp+=p,c.push({label:"GP",quantity:p});return}h.itemId&&tc(r,h.itemId,f)&&c.push({label:uS(h),quantity:f})}})),l<o&&((d=a.inputs)!=null&&d.length)?(r.activeActionId=null,r.actionProgressMs=0,De(r,"warning",`${a.name} stopped offline: missing resources.`)):r.actionProgressMs=(i+r.actionProgressMs)%a.intervalMs,r.offlineSummary={secondsAway:Math.floor(i/1e3),capped:n>cu,actionName:a.name,completions:l,rewards:c,xp:l>0?{[a.skillId]:a.xp*l}:{}},r}const bh="idle-hero-save-v1";function Ov(t,e=Date.now()){var r,s;const n=Va(e);if(!t)return n;const i={...n,...t,version:Cv,skills:{...n.skills,...t.skills??{}},bank:{...n.bank,...t.bank??{}},equipment:{...n.equipment,...t.equipment??{}},map:D1(t.map),combat:{...n.combat,...t.combat??{},mapTileKey:((r=t.combat)==null?void 0:r.mapTileKey)??null},pets:{...n.pets,...t.pets??{}},achievements:{...n.achievements,...t.achievements??{}},shopPurchases:{...n.shopPurchases,...t.shopPurchases??{}},settings:{...n.settings,...t.settings??{}},activityLog:(s=t.activityLog)!=null&&s.length?t.activityLog:n.activityLog,offlineSummary:null,createdAt:t.createdAt??n.createdAt,lastSavedAt:t.lastSavedAt??n.lastSavedAt};return t.activeView==="combat"&&(i.activeView="map"),i.combat.mode!=="idle"&&!i.combat.mapTileKey&&(i.combat={...n.combat}),i}function pS(){if(typeof localStorage>"u")return Va();try{const t=localStorage.getItem(bh);if(!t)return Va();const e=JSON.parse(t);return hS(Ov(e))}catch(t){return console.warn("Failed to load save",t),Va()}}function Ga(t){if(typeof localStorage>"u")return;const e={...t,lastSavedAt:Date.now(),offlineSummary:null};localStorage.setItem(bh,JSON.stringify(e))}function mS(t){return JSON.stringify({...t,lastSavedAt:Date.now(),offlineSummary:null},null,2)}function gS(t){try{const e=JSON.parse(t);return Ov(e)}catch(e){return console.warn("Failed to import save",e),null}}function vS(){typeof localStorage<"u"&&localStorage.removeItem(bh)}function _S(t){var n;const e=((n=t.reward)==null?void 0:n.idleHero)??t.reward;return e?{xp:e.xp??{},gp:Math.max(0,Number(e.gp)||0),message:String(e.message||`TheHUB rewarded ${t.label||t.type}.`).slice(0,180)}:null}function zv(t){const e=_S(t);if(e)return e;const n=Math.max(1,Number(t.points)||1),i=String(t.label||t.type||"Hub activity").slice(0,120),r={xp:{},gp:0,message:`TheHUB momentum rewarded: ${i}.`};return t.type==="task_done"?{xp:{attack:n*12,strength:n*8},gp:n*6,message:`Quest completed from TheHUB: ${i}.`}:t.type==="focus_session_completed"?{xp:{agility:n*12,hitpoints:n*8},gp:n*3,message:`Deep focus empowered your hero: ${i}.`}:t.type==="note_created"?{xp:{magic:n*8,runecrafting:n*4},gp:0,message:`Knowledge discovered from TheHUB: ${i}.`}:t.type==="note_edited"?{xp:{magic:n*5},gp:0,message:`Knowledge refined from TheHUB: ${i}.`}:t.type==="intake_logged"?{xp:{hitpoints:n*5},gp:0,message:`Stamina restored from TheHUB: ${i}.`}:t.type==="event_added"?{xp:{atlas:n*8},gp:n*2,message:`A new quest marker appeared: ${i}.`}:t.type==="bookmark_added"?{xp:{crafting:n*5},gp:n*2,message:`Resource gathered from TheHUB: ${i}.`}:t.type==="ai_action_approved"?{xp:{astrology:n*8},gp:0,message:`Strategy insight received from Marciale: ${i}.`}:r}const Bv=it.createContext(null);function um(t){var n;const e=t.activeActionId?ri[t.activeActionId]:null;return e?((n=si[e.skillId])==null?void 0:n.name)??e.name:null}function yS(t,e){var i;if(e.type==="replaceState")return e.state;if(e.type==="resetGame")return vS(),Va();if(e.type==="importRawSave"){const r=gS(e.raw);if(!r){const s=kd(t);return De(s,"danger","Import failed: invalid save data."),s}return Ga(r),r}const n=kd(t);switch(e.type){case"hubReward":{const r=zv(e.event);return Object.entries(r.xp).forEach(([s,a])=>tr(n,s,Number(a)||0)),r.gp>0&&(n.gp+=r.gp),De(n,"success",r.message),n}case"tick":return J1(n,e.deltaMs),Fv(n,e.deltaMs),Y1(n,e.deltaMs),G1(n),n;case"selectView":return n.activeView=e.view,n;case"selectSkill":return n.selectedSkill=e.skillId,n.activeView="skills",n;case"startAction":{const r=ri[e.actionId];if(!r)return n;const s=si[r.skillId];if(!s.implemented||!n.skills[s.id].unlocked)return De(n,"warning",`${s.name} is not ready yet.`),n;if(Vt(n,r.skillId)<r.levelRequired)return De(n,"warning",`${r.name} requires ${s.name} level ${r.levelRequired}.`),n;if(n.combat.mode!=="idle")return De(n,"warning",`Finish the current encounter before starting ${s.name}.`),n;if(n.map.destination)return De(n,"warning",`Finish travelling before starting ${s.name}.`),n;const o=n.activeActionId?ri[n.activeActionId]:null;if(o&&o.skillId!==r.skillId){const l=((i=si[o.skillId])==null?void 0:i.name)??o.name;De(n,"warning",`${l} stopped to start ${s.name}.`)}return n.activeActionId=r.id,n.actionProgressMs=0,n.selectedSkill=r.skillId,n.activeView="skills",De(n,"info",`${r.name} started.`),n}case"stopAction":return eS(n),n;case"startCombat":{const r=um(n);return r?(De(n,"warning",`Stop ${r} before starting an encounter.`),n):(K1(n,e.monsterId),n)}case"startDungeon":{const r=um(n);return r?(De(n,"warning",`Stop ${r} before starting an encounter.`),n):(Z1(n,e.dungeonId),n)}case"stopCombat":return kv(n),De(n,"info","Combat stopped."),n;case"selectMapTile":return Dv(n,{x:e.x,y:e.y}),n.activeView="map",n;case"startMapTravel":return oS(n,{x:e.x,y:e.y}),n;case"resolveMapTile":return rS(n,e.tileKey),n;case"solveMapPuzzle":return sS(n,e.tileKey,e.choiceId),n;case"startNewMapRun":return iS(n),n;case"retireMapRun":return nS(n),n;case"equipItem":{const r=Mt[e.itemId];if(!(r!=null&&r.equipment))return De(n,"warning","That item cannot be equipped."),n;if(!A1(n,r))return De(n,"warning",`${r.name} requirements are not met.`),n;const s=r.equipment.slot;if(!r.stackable&&!co(n,r.id,1))return De(n,"warning",`${r.name} is not in the bank.`),n;const a=n.equipment[s];if(a&&a!==r.id){const o=Mt[a];o!=null&&o.stackable||tc(n,a,1)}return n.equipment[s]=r.id,De(n,"success",`${r.name} equipped.`),n}case"unequipItem":{const r=n.equipment[e.slot];if(!r)return n;const s=Mt[r];return!(s!=null&&s.stackable)&&!tc(n,r,1)||(n.equipment[e.slot]=null,De(n,"info",`${(s==null?void 0:s.name)??r} unequipped.`)),n}case"useFood":return Q1(n,e.itemId),n;case"sellItem":{const r=Mt[e.itemId];if(!r||r.sellValue<=0)return n;const s=n.bank[e.itemId]??0,a=Math.max(1,Math.min(e.quantity,s));if(!co(n,e.itemId,a))return n;const o=r.sellValue*a;return n.gp+=o,De(n,"success",`Sold ${a} ${r.name} for ${o} GP.`),n}case"buyUpgrade":{const r=Mv.find(a=>a.id===e.upgradeId);if(!r)return n;const s=n.shopPurchases[r.id]??0;return s>=r.maxPurchases?(De(n,"warning",`${r.name} is already maxed.`),n):n.gp<r.cost?(De(n,"warning",`Need ${r.cost} GP for ${r.name}.`),n):(n.gp-=r.cost,n.shopPurchases[r.id]=s+1,r.id==="bank_slot_bundle"&&(n.bankSlots+=8),De(n,"success",`${r.name} purchased.`),n)}case"dismissOffline":return n.offlineSummary=null,n;case"toggleSetting":return n.settings[e.key]=!n.settings[e.key],n;default:return n}}function xS({children:t}){const[e,n]=it.useReducer(yS,void 0,pS),i=it.useRef(e);it.useEffect(()=>{i.current=e},[e]),it.useEffect(()=>{let s=performance.now();const a=window.setInterval(()=>{const o=performance.now(),l=Math.min(1e3,o-s);s=o,n({type:"tick",deltaMs:l})},200);return()=>window.clearInterval(a)},[]),it.useEffect(()=>{var c;const s="idlehero-hub-events-v1",a=()=>{try{return JSON.parse(localStorage.getItem(s)||"[]")}catch{return[]}},o=d=>{const h=Array.from(new Set([...a(),d])).slice(-250);localStorage.setItem(s,JSON.stringify(h))},l=d=>{var g,u;const h=d.data||{};if(h.type==="hub.companion.pause"||h.type==="hub.companion.resume"||h.type!=="hub.activity")return;const f=h.event||{},p=String(f.sourceActivityId||f.id||""),v=!!p&&a().includes(p),x=zv(f);v||(p&&o(p),n({type:"hubReward",event:f}));try{(u=window.parent)==null||u.postMessage({type:"idlehero.ack",version:1,sourceActivityId:p,eventId:String(((g=h.event)==null?void 0:g.id)||""),duplicate:v,reward:{xp:x.xp,gp:x.gp,message:x.message,source:"hub-reward-v2"}},"*")}catch{}};window.addEventListener("message",l);try{(c=window.parent)==null||c.postMessage({type:"idlehero.ready",version:1,source:"idle-hero-react"},"*")}catch{}return()=>window.removeEventListener("message",l)},[]),it.useEffect(()=>{const s=window.setInterval(()=>Ga(i.current),2500),a=()=>Ga(i.current);return window.addEventListener("beforeunload",a),()=>{window.clearInterval(s),window.removeEventListener("beforeunload",a),Ga(i.current)}},[]);const r=it.useMemo(()=>({state:e,dispatch:n}),[e]);return m.jsx(Bv.Provider,{value:r,children:t})}function mn(){const t=it.useContext(Bv);if(!t)throw new Error("useGame must be used within GameProvider");return t}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ch="171",SS=0,dm=1,MS=2,Hv=1,ES=2,Si=3,gr=0,hn=1,wi=2,ur=0,Fs=1,fm=2,hm=3,pm=4,wS=5,kr=100,TS=101,AS=102,bS=103,CS=104,RS=200,PS=201,IS=202,LS=203,Dd=204,Ud=205,NS=206,kS=207,DS=208,US=209,FS=210,OS=211,zS=212,BS=213,HS=214,Fd=0,Od=1,zd=2,$s=3,Bd=4,Hd=5,Vd=6,Gd=7,Vv=0,VS=1,GS=2,dr=0,WS=1,jS=2,qS=3,XS=4,$S=5,YS=6,KS=7,Gv=300,Ys=301,Ks=302,Wd=303,jd=304,bc=306,qd=1e3,Br=1001,Xd=1002,ni=1003,ZS=1004,Go=1005,ui=1006,uu=1007,Hr=1008,Fi=1009,Wv=1010,jv=1011,fo=1012,Rh=1013,Yr=1014,Ci=1015,yo=1016,Ph=1017,Ih=1018,Zs=1020,qv=35902,Xv=1021,$v=1022,Qn=1023,Yv=1024,Kv=1025,Os=1026,Qs=1027,Zv=1028,Lh=1029,Qv=1030,Nh=1031,kh=1033,Ml=33776,El=33777,wl=33778,Tl=33779,$d=35840,Yd=35841,Kd=35842,Zd=35843,Qd=36196,Jd=37492,ef=37496,tf=37808,nf=37809,rf=37810,sf=37811,af=37812,of=37813,lf=37814,cf=37815,uf=37816,df=37817,ff=37818,hf=37819,pf=37820,mf=37821,Al=36492,gf=36494,vf=36495,Jv=36283,_f=36284,yf=36285,xf=36286,QS=3200,JS=3201,eM=0,tM=1,Qi="",xn="srgb",Js="srgb-linear",nc="linear",at="srgb",is=7680,mm=519,nM=512,iM=513,rM=514,e_=515,sM=516,aM=517,oM=518,lM=519,gm=35044,vm="300 es",Ri=2e3,ic=2001;class ua{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const $t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],du=Math.PI/180,Sf=180/Math.PI;function xo(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($t[t&255]+$t[t>>8&255]+$t[t>>16&255]+$t[t>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[n&63|128]+$t[n>>8&255]+"-"+$t[n>>16&255]+$t[n>>24&255]+$t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]).toLowerCase()}function Ve(t,e,n){return Math.max(e,Math.min(n,t))}function cM(t,e){return(t%e+e)%e}function fu(t,e,n){return(1-n)*t+n*e}function Sa(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function on(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class tt{constructor(e=0,n=0){tt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ve(this.x,e.x,n.x),this.y=Ve(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ve(this.x,e,n),this.y=Ve(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,n,i,r,s,a,o,l,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],f=i[2],p=i[5],v=i[8],x=r[0],g=r[3],u=r[6],_=r[1],y=r[4],S=r[7],b=r[2],R=r[5],A=r[8];return s[0]=a*x+o*_+l*b,s[3]=a*g+o*y+l*R,s[6]=a*u+o*S+l*A,s[1]=c*x+d*_+h*b,s[4]=c*g+d*y+h*R,s[7]=c*u+d*S+h*A,s[2]=f*x+p*_+v*b,s[5]=f*g+p*y+v*R,s[8]=f*u+p*S+v*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return n*a*d-n*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,f=o*l-d*s,p=c*s-a*l,v=n*h+i*f+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=h*x,e[1]=(r*c-d*i)*x,e[2]=(o*i-r*a)*x,e[3]=f*x,e[4]=(d*n-r*l)*x,e[5]=(r*s-o*n)*x,e[6]=p*x,e[7]=(i*l-c*n)*x,e[8]=(a*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(hu.makeScale(e,n)),this}rotate(e){return this.premultiply(hu.makeRotation(-e)),this}translate(e,n){return this.premultiply(hu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const hu=new Ue;function t_(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function rc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function uM(){const t=rc("canvas");return t.style.display="block",t}const _m={};function vs(t){t in _m||(_m[t]=!0,console.warn(t))}function dM(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function fM(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function hM(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const ym=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xm=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pM(){const t={enabled:!0,workingColorSpace:Js,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===at&&(r.r=Ii(r.r),r.g=Ii(r.g),r.b=Ii(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(r.r=zs(r.r),r.g=zs(r.g),r.b=zs(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Qi?nc:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Js]:{primaries:e,whitePoint:i,transfer:nc,toXYZ:ym,fromXYZ:xm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:e,whitePoint:i,transfer:at,toXYZ:ym,fromXYZ:xm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}}),t}const Qe=pM();function Ii(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function zs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let rs;class mM{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{rs===void 0&&(rs=rc("canvas")),rs.width=e.width,rs.height=e.height;const i=rs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=rs}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=rc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ii(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ii(n[i]/255)*255):n[i]=Ii(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gM=0;class n_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gM++}),this.uuid=xo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(pu(r[a].image)):s.push(pu(r[a]))}else s=pu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function pu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?mM.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vM=0;class pn extends ua{constructor(e=pn.DEFAULT_IMAGE,n=pn.DEFAULT_MAPPING,i=Br,r=Br,s=ui,a=Hr,o=Qn,l=Fi,c=pn.DEFAULT_ANISOTROPY,d=Qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vM++}),this.uuid=xo(),this.name="",this.source=new n_(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qd:e.x=e.x-Math.floor(e.x);break;case Br:e.x=e.x<0?0:1;break;case Xd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qd:e.y=e.y-Math.floor(e.y);break;case Br:e.y=e.y<0?0:1;break;case Xd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=Gv;pn.DEFAULT_ANISOTROPY=1;class At{constructor(e=0,n=0,i=0,r=1){At.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],d=l[4],h=l[8],f=l[1],p=l[5],v=l[9],x=l[2],g=l[6],u=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-x)<.01&&Math.abs(v-g)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+x)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const y=(c+1)/2,S=(p+1)/2,b=(u+1)/2,R=(d+f)/4,A=(h+x)/4,P=(v+g)/4;return y>S&&y>b?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=R/i,s=A/i):S>b?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=R/r,s=P/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=A/s,r=P/s),this.set(i,r,s,n),this}let _=Math.sqrt((g-v)*(g-v)+(h-x)*(h-x)+(f-d)*(f-d));return Math.abs(_)<.001&&(_=1),this.x=(g-v)/_,this.y=(h-x)/_,this.z=(f-d)/_,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ve(this.x,e.x,n.x),this.y=Ve(this.y,e.y,n.y),this.z=Ve(this.z,e.z,n.z),this.w=Ve(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ve(this.x,e,n),this.y=Ve(this.y,e,n),this.z=Ve(this.z,e,n),this.w=Ve(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _M extends ua{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new At(0,0,e,n),this.scissorTest=!1,this.viewport=new At(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ui,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new pn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new n_(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kr extends _M{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class i_ extends pn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=ni,this.minFilter=ni,this.wrapR=Br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class yM extends pn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=ni,this.minFilter=ni,this.wrapR=Br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class So{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],h=i[r+3];const f=s[a+0],p=s[a+1],v=s[a+2],x=s[a+3];if(o===0){e[n+0]=l,e[n+1]=c,e[n+2]=d,e[n+3]=h;return}if(o===1){e[n+0]=f,e[n+1]=p,e[n+2]=v,e[n+3]=x;return}if(h!==x||l!==f||c!==p||d!==v){let g=1-o;const u=l*f+c*p+d*v+h*x,_=u>=0?1:-1,y=1-u*u;if(y>Number.EPSILON){const b=Math.sqrt(y),R=Math.atan2(b,u*_);g=Math.sin(g*R)/b,o=Math.sin(o*R)/b}const S=o*_;if(l=l*g+f*S,c=c*g+p*S,d=d*g+v*S,h=h*g+x*S,g===1-o){const b=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=b,c*=b,d*=b,h*=b}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],h=s[a],f=s[a+1],p=s[a+2],v=s[a+3];return e[n]=o*v+d*h+l*p-c*f,e[n+1]=l*v+d*f+c*h-o*p,e[n+2]=c*v+d*p+o*f-l*h,e[n+3]=d*v-o*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),h=o(s/2),f=l(i/2),p=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=f*d*h+c*p*v,this._y=c*p*h-f*d*v,this._z=c*d*v+f*p*h,this._w=c*d*h-f*p*v;break;case"YXZ":this._x=f*d*h+c*p*v,this._y=c*p*h-f*d*v,this._z=c*d*v-f*p*h,this._w=c*d*h+f*p*v;break;case"ZXY":this._x=f*d*h-c*p*v,this._y=c*p*h+f*d*v,this._z=c*d*v+f*p*h,this._w=c*d*h-f*p*v;break;case"ZYX":this._x=f*d*h-c*p*v,this._y=c*p*h+f*d*v,this._z=c*d*v-f*p*h,this._w=c*d*h+f*p*v;break;case"YZX":this._x=f*d*h+c*p*v,this._y=c*p*h+f*d*v,this._z=c*d*v-f*p*h,this._w=c*d*h-f*p*v;break;case"XZY":this._x=f*d*h-c*p*v,this._y=c*p*h-f*d*v,this._z=c*d*v+f*p*h,this._w=c*d*h+f*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],d=n[6],h=n[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(d-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-n;return this._w=p*a+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-n)*d)/c,f=Math.sin(n*d)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,n=0,i=0){H.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Sm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Sm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*n-s*r),h=2*(s*i-a*n);return this.x=n+l*c+a*h-o*d,this.y=i+l*d+o*c-s*h,this.z=r+l*h+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ve(this.x,e.x,n.x),this.y=Ve(this.y,e.y,n.y),this.z=Ve(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ve(this.x,e,n),this.y=Ve(this.y,e,n),this.z=Ve(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return mu.copy(this).projectOnVector(e),this.sub(mu)}reflect(e){return this.sub(mu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const mu=new H,Sm=new So;class Mo{constructor(e=new H(1/0,1/0,1/0),n=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Wn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Wn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Wn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Wn):Wn.fromBufferAttribute(s,a),Wn.applyMatrix4(e.matrixWorld),this.expandByPoint(Wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Wo.copy(i.boundingBox)),Wo.applyMatrix4(e.matrixWorld),this.union(Wo)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wn),Wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ma),jo.subVectors(this.max,Ma),ss.subVectors(e.a,Ma),as.subVectors(e.b,Ma),os.subVectors(e.c,Ma),Vi.subVectors(as,ss),Gi.subVectors(os,as),wr.subVectors(ss,os);let n=[0,-Vi.z,Vi.y,0,-Gi.z,Gi.y,0,-wr.z,wr.y,Vi.z,0,-Vi.x,Gi.z,0,-Gi.x,wr.z,0,-wr.x,-Vi.y,Vi.x,0,-Gi.y,Gi.x,0,-wr.y,wr.x,0];return!gu(n,ss,as,os,jo)||(n=[1,0,0,0,1,0,0,0,1],!gu(n,ss,as,os,jo))?!1:(qo.crossVectors(Vi,Gi),n=[qo.x,qo.y,qo.z],gu(n,ss,as,os,jo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gi=[new H,new H,new H,new H,new H,new H,new H,new H],Wn=new H,Wo=new Mo,ss=new H,as=new H,os=new H,Vi=new H,Gi=new H,wr=new H,Ma=new H,jo=new H,qo=new H,Tr=new H;function gu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Tr.fromArray(t,s);const o=r.x*Math.abs(Tr.x)+r.y*Math.abs(Tr.y)+r.z*Math.abs(Tr.z),l=e.dot(Tr),c=n.dot(Tr),d=i.dot(Tr);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const xM=new Mo,Ea=new H,vu=new H;class Dh{constructor(e=new H,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):xM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ea.subVectors(e,this.center);const n=Ea.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ea,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ea.copy(e.center).add(vu)),this.expandByPoint(Ea.copy(e.center).sub(vu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vi=new H,_u=new H,Xo=new H,Wi=new H,yu=new H,$o=new H,xu=new H;class SM{constructor(e=new H,n=new H(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=vi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(vi.copy(this.origin).addScaledVector(this.direction,n),vi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){_u.copy(e).add(n).multiplyScalar(.5),Xo.copy(n).sub(e).normalize(),Wi.copy(this.origin).sub(_u);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Xo),o=Wi.dot(this.direction),l=-Wi.dot(Xo),c=Wi.lengthSq(),d=Math.abs(1-a*a);let h,f,p,v;if(d>0)if(h=a*l-o,f=a*o-l,v=s*d,h>=0)if(f>=-v)if(f<=v){const x=1/d;h*=x,f*=x,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-v?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=v?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(_u).addScaledVector(Xo,f),p}intersectSphere(e,n){vi.subVectors(e.center,this.origin);const i=vi.dot(this.direction),r=vi.dot(vi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(s=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(s=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,vi)!==null}intersectTriangle(e,n,i,r,s){yu.subVectors(n,e),$o.subVectors(i,e),xu.crossVectors(yu,$o);let a=this.direction.dot(xu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wi.subVectors(this.origin,e);const l=o*this.direction.dot($o.crossVectors(Wi,$o));if(l<0)return null;const c=o*this.direction.dot(yu.cross(Wi));if(c<0||l+c>a)return null;const d=-o*Wi.dot(xu);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class It{constructor(e,n,i,r,s,a,o,l,c,d,h,f,p,v,x,g){It.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,d,h,f,p,v,x,g)}set(e,n,i,r,s,a,o,l,c,d,h,f,p,v,x,g){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=f,u[3]=p,u[7]=v,u[11]=x,u[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/ls.setFromMatrixColumn(e,0).length(),s=1/ls.setFromMatrixColumn(e,1).length(),a=1/ls.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*d,p=a*h,v=o*d,x=o*h;n[0]=l*d,n[4]=-l*h,n[8]=c,n[1]=p+v*c,n[5]=f-x*c,n[9]=-o*l,n[2]=x-f*c,n[6]=v+p*c,n[10]=a*l}else if(e.order==="YXZ"){const f=l*d,p=l*h,v=c*d,x=c*h;n[0]=f+x*o,n[4]=v*o-p,n[8]=a*c,n[1]=a*h,n[5]=a*d,n[9]=-o,n[2]=p*o-v,n[6]=x+f*o,n[10]=a*l}else if(e.order==="ZXY"){const f=l*d,p=l*h,v=c*d,x=c*h;n[0]=f-x*o,n[4]=-a*h,n[8]=v+p*o,n[1]=p+v*o,n[5]=a*d,n[9]=x-f*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const f=a*d,p=a*h,v=o*d,x=o*h;n[0]=l*d,n[4]=v*c-p,n[8]=f*c+x,n[1]=l*h,n[5]=x*c+f,n[9]=p*c-v,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,v=o*l,x=o*c;n[0]=l*d,n[4]=x-f*h,n[8]=v*h+p,n[1]=h,n[5]=a*d,n[9]=-o*d,n[2]=-c*d,n[6]=p*h+v,n[10]=f-x*h}else if(e.order==="XZY"){const f=a*l,p=a*c,v=o*l,x=o*c;n[0]=l*d,n[4]=-h,n[8]=c*d,n[1]=f*h+x,n[5]=a*d,n[9]=p*h-v,n[2]=v*h-p,n[6]=o*d,n[10]=x*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(MM,e,EM)}lookAt(e,n,i){const r=this.elements;return vn.subVectors(e,n),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),ji.crossVectors(i,vn),ji.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),ji.crossVectors(i,vn)),ji.normalize(),Yo.crossVectors(vn,ji),r[0]=ji.x,r[4]=Yo.x,r[8]=vn.x,r[1]=ji.y,r[5]=Yo.y,r[9]=vn.y,r[2]=ji.z,r[6]=Yo.z,r[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],f=i[9],p=i[13],v=i[2],x=i[6],g=i[10],u=i[14],_=i[3],y=i[7],S=i[11],b=i[15],R=r[0],A=r[4],P=r[8],T=r[12],M=r[1],I=r[5],V=r[9],O=r[13],q=r[2],Y=r[6],j=r[10],J=r[14],N=r[3],X=r[7],Q=r[11],ae=r[15];return s[0]=a*R+o*M+l*q+c*N,s[4]=a*A+o*I+l*Y+c*X,s[8]=a*P+o*V+l*j+c*Q,s[12]=a*T+o*O+l*J+c*ae,s[1]=d*R+h*M+f*q+p*N,s[5]=d*A+h*I+f*Y+p*X,s[9]=d*P+h*V+f*j+p*Q,s[13]=d*T+h*O+f*J+p*ae,s[2]=v*R+x*M+g*q+u*N,s[6]=v*A+x*I+g*Y+u*X,s[10]=v*P+x*V+g*j+u*Q,s[14]=v*T+x*O+g*J+u*ae,s[3]=_*R+y*M+S*q+b*N,s[7]=_*A+y*I+S*Y+b*X,s[11]=_*P+y*V+S*j+b*Q,s[15]=_*T+y*O+S*J+b*ae,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],f=e[10],p=e[14],v=e[3],x=e[7],g=e[11],u=e[15];return v*(+s*l*h-r*c*h-s*o*f+i*c*f+r*o*p-i*l*p)+x*(+n*l*p-n*c*f+s*a*f-r*a*p+r*c*d-s*l*d)+g*(+n*c*h-n*o*p-s*a*h+i*a*p+s*o*d-i*c*d)+u*(-r*o*d-n*l*h+n*o*f+r*a*h-i*a*f+i*l*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],f=e[10],p=e[11],v=e[12],x=e[13],g=e[14],u=e[15],_=h*g*c-x*f*c+x*l*p-o*g*p-h*l*u+o*f*u,y=v*f*c-d*g*c-v*l*p+a*g*p+d*l*u-a*f*u,S=d*x*c-v*h*c+v*o*p-a*x*p-d*o*u+a*h*u,b=v*h*l-d*x*l-v*o*f+a*x*f+d*o*g-a*h*g,R=n*_+i*y+r*S+s*b;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=_*A,e[1]=(x*f*s-h*g*s-x*r*p+i*g*p+h*r*u-i*f*u)*A,e[2]=(o*g*s-x*l*s+x*r*c-i*g*c-o*r*u+i*l*u)*A,e[3]=(h*l*s-o*f*s-h*r*c+i*f*c+o*r*p-i*l*p)*A,e[4]=y*A,e[5]=(d*g*s-v*f*s+v*r*p-n*g*p-d*r*u+n*f*u)*A,e[6]=(v*l*s-a*g*s-v*r*c+n*g*c+a*r*u-n*l*u)*A,e[7]=(a*f*s-d*l*s+d*r*c-n*f*c-a*r*p+n*l*p)*A,e[8]=S*A,e[9]=(v*h*s-d*x*s-v*i*p+n*x*p+d*i*u-n*h*u)*A,e[10]=(a*x*s-v*o*s+v*i*c-n*x*c-a*i*u+n*o*u)*A,e[11]=(d*o*s-a*h*s-d*i*c+n*h*c+a*i*p-n*o*p)*A,e[12]=b*A,e[13]=(d*x*r-v*h*r+v*i*f-n*x*f-d*i*g+n*h*g)*A,e[14]=(v*o*r-a*x*r-v*i*l+n*x*l+a*i*g-n*o*g)*A,e[15]=(a*h*r-d*o*r+d*i*l-n*h*l-a*i*f+n*o*f)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,d=a+a,h=o+o,f=s*c,p=s*d,v=s*h,x=a*d,g=a*h,u=o*h,_=l*c,y=l*d,S=l*h,b=i.x,R=i.y,A=i.z;return r[0]=(1-(x+u))*b,r[1]=(p+S)*b,r[2]=(v-y)*b,r[3]=0,r[4]=(p-S)*R,r[5]=(1-(f+u))*R,r[6]=(g+_)*R,r[7]=0,r[8]=(v+y)*A,r[9]=(g-_)*A,r[10]=(1-(f+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=ls.set(r[0],r[1],r[2]).length();const a=ls.set(r[4],r[5],r[6]).length(),o=ls.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],jn.copy(this);const c=1/s,d=1/a,h=1/o;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=d,jn.elements[5]*=d,jn.elements[6]*=d,jn.elements[8]*=h,jn.elements[9]*=h,jn.elements[10]*=h,n.setFromRotationMatrix(jn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=Ri){const l=this.elements,c=2*s/(n-e),d=2*s/(i-r),h=(n+e)/(n-e),f=(i+r)/(i-r);let p,v;if(o===Ri)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ic)p=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=Ri){const l=this.elements,c=1/(n-e),d=1/(i-r),h=1/(a-s),f=(n+e)*c,p=(i+r)*d;let v,x;if(o===Ri)v=(a+s)*h,x=-2*h;else if(o===ic)v=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const ls=new H,jn=new It,MM=new H(0,0,0),EM=new H(1,1,1),ji=new H,Yo=new H,vn=new H,Mm=new It,Em=new So;class Oi{constructor(e=0,n=0,i=0,r=Oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],h=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Mm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Em.setFromEuler(this),this.setFromQuaternion(Em,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Oi.DEFAULT_ORDER="XYZ";class r_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wM=0;const wm=new H,cs=new So,_i=new It,Ko=new H,wa=new H,TM=new H,AM=new So,Tm=new H(1,0,0),Am=new H(0,1,0),bm=new H(0,0,1),Cm={type:"added"},bM={type:"removed"},us={type:"childadded",child:null},Su={type:"childremoved",child:null};class wn extends ua{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wM++}),this.uuid=xo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wn.DEFAULT_UP.clone();const e=new H,n=new Oi,i=new So,r=new H(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new It},normalMatrix:{value:new Ue}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new r_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return cs.setFromAxisAngle(e,n),this.quaternion.multiply(cs),this}rotateOnWorldAxis(e,n){return cs.setFromAxisAngle(e,n),this.quaternion.premultiply(cs),this}rotateX(e){return this.rotateOnAxis(Tm,e)}rotateY(e){return this.rotateOnAxis(Am,e)}rotateZ(e){return this.rotateOnAxis(bm,e)}translateOnAxis(e,n){return wm.copy(e).applyQuaternion(this.quaternion),this.position.add(wm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Tm,e)}translateY(e){return this.translateOnAxis(Am,e)}translateZ(e){return this.translateOnAxis(bm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ko.copy(e):Ko.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),wa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(wa,Ko,this.up):_i.lookAt(Ko,wa,this.up),this.quaternion.setFromRotationMatrix(_i),r&&(_i.extractRotation(r.matrixWorld),cs.setFromRotationMatrix(_i),this.quaternion.premultiply(cs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cm),us.child=e,this.dispatchEvent(us),us.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(bM),Su.child=e,this.dispatchEvent(Su),Su.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cm),us.child=e,this.dispatchEvent(us),us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wa,e,TM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wa,AM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),f=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}wn.DEFAULT_UP=new H(0,1,0);wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qn=new H,yi=new H,Mu=new H,xi=new H,ds=new H,fs=new H,Rm=new H,Eu=new H,wu=new H,Tu=new H,Au=new At,bu=new At,Cu=new At;class Zn{constructor(e=new H,n=new H,i=new H){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),qn.subVectors(e,n),r.cross(qn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){qn.subVectors(r,n),yi.subVectors(i,n),Mu.subVectors(e,n);const a=qn.dot(qn),o=qn.dot(yi),l=qn.dot(Mu),c=yi.dot(yi),d=yi.dot(Mu),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-o*d)*f,v=(a*d-o*l)*f;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,xi.x),l.addScaledVector(a,xi.y),l.addScaledVector(o,xi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return Au.setScalar(0),bu.setScalar(0),Cu.setScalar(0),Au.fromBufferAttribute(e,n),bu.fromBufferAttribute(e,i),Cu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Au,s.x),a.addScaledVector(bu,s.y),a.addScaledVector(Cu,s.z),a}static isFrontFacing(e,n,i,r){return qn.subVectors(i,n),yi.subVectors(e,n),qn.cross(yi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),qn.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Zn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Zn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Zn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;ds.subVectors(r,i),fs.subVectors(s,i),Eu.subVectors(e,i);const l=ds.dot(Eu),c=fs.dot(Eu);if(l<=0&&c<=0)return n.copy(i);wu.subVectors(e,r);const d=ds.dot(wu),h=fs.dot(wu);if(d>=0&&h<=d)return n.copy(r);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),n.copy(i).addScaledVector(ds,a);Tu.subVectors(e,s);const p=ds.dot(Tu),v=fs.dot(Tu);if(v>=0&&p<=v)return n.copy(s);const x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(fs,o);const g=d*v-p*h;if(g<=0&&h-d>=0&&p-v>=0)return Rm.subVectors(s,r),o=(h-d)/(h-d+(p-v)),n.copy(r).addScaledVector(Rm,o);const u=1/(g+x+f);return a=x*u,o=f*u,n.copy(i).addScaledVector(ds,a).addScaledVector(fs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const s_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Zo={h:0,s:0,l:0};function Ru(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class He{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=Qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,Qe.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=Qe.workingColorSpace){if(e=cM(e,1),n=Ve(n,0,1),i=Ve(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Ru(a,s,e+1/3),this.g=Ru(a,s,e),this.b=Ru(a,s,e-1/3)}return Qe.toWorkingColorSpace(this,r),this}setStyle(e,n=xn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=xn){const i=s_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}copyLinearToSRGB(e){return this.r=zs(e.r),this.g=zs(e.g),this.b=zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xn){return Qe.fromWorkingColorSpace(Yt.copy(this),e),Math.round(Ve(Yt.r*255,0,255))*65536+Math.round(Ve(Yt.g*255,0,255))*256+Math.round(Ve(Yt.b*255,0,255))}getHexString(e=xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Qe.workingColorSpace){Qe.fromWorkingColorSpace(Yt.copy(this),n);const i=Yt.r,r=Yt.g,s=Yt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(Yt.copy(this),n),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=xn){Qe.fromWorkingColorSpace(Yt.copy(this),e);const n=Yt.r,i=Yt.g,r=Yt.b;return e!==xn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+n,qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(qi),e.getHSL(Zo);const i=fu(qi.h,Zo.h,n),r=fu(qi.s,Zo.s,n),s=fu(qi.l,Zo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new He;He.NAMES=s_;let CM=0;class Cc extends ua{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:CM++}),this.uuid=xo(),this.name="",this.type="Material",this.blending=Fs,this.side=gr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Dd,this.blendDst=Ud,this.blendEquation=kr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Fs&&(i.blending=this.blending),this.side!==gr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Dd&&(i.blendSrc=this.blendSrc),this.blendDst!==Ud&&(i.blendDst=this.blendDst),this.blendEquation!==kr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$s&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(i.stencilFail=this.stencilFail),this.stencilZFail!==is&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class mt extends Cc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Oi,this.combine=Vv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ct=new H,Qo=new tt;class hi{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=gm,this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Qo.fromBufferAttribute(this,n),Qo.applyMatrix3(e),this.setXY(n,Qo.x,Qo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.applyMatrix3(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.applyMatrix4(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.applyNormalMatrix(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.transformDirection(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Sa(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=on(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Sa(n,this.array)),n}setX(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Sa(n,this.array)),n}setY(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Sa(n,this.array)),n}setZ(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Sa(n,this.array)),n}setW(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=on(n,this.array),i=on(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=on(n,this.array),i=on(i,this.array),r=on(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=on(n,this.array),i=on(i,this.array),r=on(r,this.array),s=on(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gm&&(e.usage=this.usage),e}}class a_ extends hi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class o_ extends hi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Tn extends hi{constructor(e,n,i){super(new Float32Array(e),n,i)}}let RM=0;const Ln=new It,Pu=new wn,hs=new H,_n=new Mo,Ta=new Mo,Ft=new H;class Bi extends ua{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:RM++}),this.uuid=xo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(t_(e)?o_:a_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ue().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ln.makeRotationFromQuaternion(e),this.applyMatrix4(Ln),this}rotateX(e){return Ln.makeRotationX(e),this.applyMatrix4(Ln),this}rotateY(e){return Ln.makeRotationY(e),this.applyMatrix4(Ln),this}rotateZ(e){return Ln.makeRotationZ(e),this.applyMatrix4(Ln),this}translate(e,n,i){return Ln.makeTranslation(e,n,i),this.applyMatrix4(Ln),this}scale(e,n,i){return Ln.makeScale(e,n,i),this.applyMatrix4(Ln),this}lookAt(e){return Pu.lookAt(e),Pu.updateMatrix(),this.applyMatrix4(Pu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Tn(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];_n.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Dh);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const i=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];Ta.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(_n.min,Ta.min),_n.expandByPoint(Ft),Ft.addVectors(_n.max,Ta.max),_n.expandByPoint(Ft)):(_n.expandByPoint(Ta.min),_n.expandByPoint(Ta.max))}_n.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ft.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ft));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Ft.fromBufferAttribute(o,c),l&&(hs.fromBufferAttribute(e,c),Ft.add(hs)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hi(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<i.count;P++)o[P]=new H,l[P]=new H;const c=new H,d=new H,h=new H,f=new tt,p=new tt,v=new tt,x=new H,g=new H;function u(P,T,M){c.fromBufferAttribute(i,P),d.fromBufferAttribute(i,T),h.fromBufferAttribute(i,M),f.fromBufferAttribute(s,P),p.fromBufferAttribute(s,T),v.fromBufferAttribute(s,M),d.sub(c),h.sub(c),p.sub(f),v.sub(f);const I=1/(p.x*v.y-v.x*p.y);isFinite(I)&&(x.copy(d).multiplyScalar(v.y).addScaledVector(h,-p.y).multiplyScalar(I),g.copy(h).multiplyScalar(p.x).addScaledVector(d,-v.x).multiplyScalar(I),o[P].add(x),o[T].add(x),o[M].add(x),l[P].add(g),l[T].add(g),l[M].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let P=0,T=_.length;P<T;++P){const M=_[P],I=M.start,V=M.count;for(let O=I,q=I+V;O<q;O+=3)u(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const y=new H,S=new H,b=new H,R=new H;function A(P){b.fromBufferAttribute(r,P),R.copy(b);const T=o[P];y.copy(T),y.sub(b.multiplyScalar(b.dot(T))).normalize(),S.crossVectors(R,T);const I=S.dot(l[P])<0?-1:1;a.setXYZW(P,y.x,y.y,y.z,I)}for(let P=0,T=_.length;P<T;++P){const M=_[P],I=M.start,V=M.count;for(let O=I,q=I+V;O<q;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new hi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new H,s=new H,a=new H,o=new H,l=new H,c=new H,d=new H,h=new H;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,x),a.fromBufferAttribute(n,g),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(d),l.add(d),c.add(d),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),a.fromBufferAttribute(n,f+2),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ft.fromBufferAttribute(e,n),Ft.normalize(),e.setXYZ(n,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,f=new c.constructor(l.length*d);let p=0,v=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*d;for(let u=0;u<d;u++)f[v++]=c[p++]}return new hi(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Bi,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,h=c.length;d<h;d++){const f=c[d],p=e(f,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let f=0,p=h.length;f<p;f++)d.push(h[f].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Pm=new It,Ar=new SM,Jo=new Dh,Im=new H,el=new H,tl=new H,nl=new H,Iu=new H,il=new H,Lm=new H,rl=new H;class Re extends wn{constructor(e=new Bi,n=new mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){il.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],h=s[l];d!==0&&(Iu.fromBufferAttribute(h,e),a?il.addScaledVector(Iu,d):il.addScaledVector(Iu.sub(n),d))}n.add(il)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Jo.copy(i.boundingSphere),Jo.applyMatrix4(s),Ar.copy(e.ray).recast(e.near),!(Jo.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(Jo,Im)===null||Ar.origin.distanceToSquared(Im)>(e.far-e.near)**2))&&(Pm.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(Pm),!(i.boundingBox!==null&&Ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ar)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,x=f.length;v<x;v++){const g=f[v],u=a[g.materialIndex],_=Math.max(g.start,p.start),y=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let S=_,b=y;S<b;S+=3){const R=o.getX(S),A=o.getX(S+1),P=o.getX(S+2);r=sl(this,u,e,i,c,d,h,R,A,P),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let g=v,u=x;g<u;g+=3){const _=o.getX(g),y=o.getX(g+1),S=o.getX(g+2);r=sl(this,a,e,i,c,d,h,_,y,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,x=f.length;v<x;v++){const g=f[v],u=a[g.materialIndex],_=Math.max(g.start,p.start),y=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let S=_,b=y;S<b;S+=3){const R=S,A=S+1,P=S+2;r=sl(this,u,e,i,c,d,h,R,A,P),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=v,u=x;g<u;g+=3){const _=g,y=g+1,S=g+2;r=sl(this,a,e,i,c,d,h,_,y,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function PM(t,e,n,i,r,s,a,o){let l;if(e.side===hn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===gr,o),l===null)return null;rl.copy(o),rl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(rl);return c<n.near||c>n.far?null:{distance:c,point:rl.clone(),object:t}}function sl(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,el),t.getVertexPosition(l,tl),t.getVertexPosition(c,nl);const d=PM(t,e,n,i,el,tl,nl,Lm);if(d){const h=new H;Zn.getBarycoord(Lm,el,tl,nl,h),r&&(d.uv=Zn.getInterpolatedAttribute(r,o,l,c,h,new tt)),s&&(d.uv1=Zn.getInterpolatedAttribute(s,o,l,c,h,new tt)),a&&(d.normal=Zn.getInterpolatedAttribute(a,o,l,c,h,new H),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new H,materialIndex:0};Zn.getNormal(el,tl,nl,f.normal),d.face=f,d.barycoord=h}return d}class Eo extends Bi{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],h=[];let f=0,p=0;v("z","y","x",-1,-1,i,n,e,a,s,0),v("z","y","x",1,-1,i,n,-e,a,s,1),v("x","z","y",1,1,e,i,n,r,a,2),v("x","z","y",1,-1,e,i,-n,r,a,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Tn(c,3)),this.setAttribute("normal",new Tn(d,3)),this.setAttribute("uv",new Tn(h,2));function v(x,g,u,_,y,S,b,R,A,P,T){const M=S/A,I=b/P,V=S/2,O=b/2,q=R/2,Y=A+1,j=P+1;let J=0,N=0;const X=new H;for(let Q=0;Q<j;Q++){const ae=Q*I-O;for(let xe=0;xe<Y;xe++){const Ke=xe*M-V;X[x]=Ke*_,X[g]=ae*y,X[u]=q,c.push(X.x,X.y,X.z),X[x]=0,X[g]=0,X[u]=R>0?1:-1,d.push(X.x,X.y,X.z),h.push(xe/A),h.push(1-Q/P),J+=1}}for(let Q=0;Q<P;Q++)for(let ae=0;ae<A;ae++){const xe=f+ae+Y*Q,Ke=f+ae+Y*(Q+1),W=f+(ae+1)+Y*(Q+1),ie=f+(ae+1)+Y*Q;l.push(xe,Ke,ie),l.push(Ke,W,ie),N+=6}o.addGroup(p,N,T),p+=N,f+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Eo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ea(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function en(t){const e={};for(let n=0;n<t.length;n++){const i=ea(t[n]);for(const r in i)e[r]=i[r]}return e}function IM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function l_(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const LM={clone:ea,merge:en};var NM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vr extends Cc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=NM,this.fragmentShader=kM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ea(e.uniforms),this.uniformsGroups=IM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class c_ extends wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=Ri}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new H,Nm=new tt,km=new tt;class Kn extends c_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Sf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(du*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Sf*2*Math.atan(Math.tan(du*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,n){return this.getViewBounds(e,Nm,km),n.subVectors(km,Nm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(du*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ps=-90,ms=1;class DM extends wn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Kn(ps,ms,e,n);r.layers=this.layers,this.add(r);const s=new Kn(ps,ms,e,n);s.layers=this.layers,this.add(s);const a=new Kn(ps,ms,e,n);a.layers=this.layers,this.add(a);const o=new Kn(ps,ms,e,n);o.layers=this.layers,this.add(o);const l=new Kn(ps,ms,e,n);l.layers=this.layers,this.add(l);const c=new Kn(ps,ms,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===Ri)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ic)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,d),e.setRenderTarget(h,f,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class u_ extends pn{constructor(e,n,i,r,s,a,o,l,c,d){e=e!==void 0?e:[],n=n!==void 0?n:Ys,super(e,n,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class UM extends Kr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new u_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ui}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Eo(5,5,5),s=new vr({name:"CubemapFromEquirect",uniforms:ea(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:ur});s.uniforms.tEquirect.value=n;const a=new Re(r,s),o=n.minFilter;return n.minFilter===Hr&&(n.minFilter=ui),new DM(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}class FM extends wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Oi,this.environmentIntensity=1,this.environmentRotation=new Oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Lu=new H,OM=new H,zM=new Ue;class Lr{constructor(e=new H(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Lu.subVectors(i,n).cross(OM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Lu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||zM.getNormalMatrix(e),r=this.coplanarPoint(Lu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const br=new Dh,al=new H;class d_{constructor(e=new Lr,n=new Lr,i=new Lr,r=new Lr,s=new Lr,a=new Lr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Ri){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],h=r[6],f=r[7],p=r[8],v=r[9],x=r[10],g=r[11],u=r[12],_=r[13],y=r[14],S=r[15];if(i[0].setComponents(l-s,f-c,g-p,S-u).normalize(),i[1].setComponents(l+s,f+c,g+p,S+u).normalize(),i[2].setComponents(l+a,f+d,g+v,S+_).normalize(),i[3].setComponents(l-a,f-d,g-v,S-_).normalize(),i[4].setComponents(l-o,f-h,g-x,S-y).normalize(),n===Ri)i[5].setComponents(l+o,f+h,g+x,S+y).normalize();else if(n===ic)i[5].setComponents(o,h,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),br.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(br)}intersectsSprite(e){return br.center.set(0,0,0),br.radius=.7071067811865476,br.applyMatrix4(e.matrixWorld),this.intersectsSphere(br)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(al.x=r.normal.x>0?e.max.x:e.min.x,al.y=r.normal.y>0?e.max.y:e.min.y,al.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(al)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ti extends wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class f_ extends pn{constructor(e,n,i,r,s,a,o,l,c,d=Os){if(d!==Os&&d!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Os&&(i=Yr),i===void 0&&d===Qs&&(i=Zs),super(null,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:ni,this.minFilter=l!==void 0?l:ni,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class wt extends Bi{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],a=[],o=[],l=[],c=new H,d=new tt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=n;h++,f+=3){const p=i+h/n*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[f]/e+1)/2,d.y=(a[f+1]/e+1)/2,l.push(d.x,d.y)}for(let h=1;h<=n;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Tn(a,3)),this.setAttribute("normal",new Tn(o,3)),this.setAttribute("uv",new Tn(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wt(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Uh extends Bi{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const d=[],h=[],f=[],p=[];let v=0;const x=[],g=i/2;let u=0;_(),a===!1&&(e>0&&y(!0),n>0&&y(!1)),this.setIndex(d),this.setAttribute("position",new Tn(h,3)),this.setAttribute("normal",new Tn(f,3)),this.setAttribute("uv",new Tn(p,2));function _(){const S=new H,b=new H;let R=0;const A=(n-e)/i;for(let P=0;P<=s;P++){const T=[],M=P/s,I=M*(n-e)+e;for(let V=0;V<=r;V++){const O=V/r,q=O*l+o,Y=Math.sin(q),j=Math.cos(q);b.x=I*Y,b.y=-M*i+g,b.z=I*j,h.push(b.x,b.y,b.z),S.set(Y,A,j).normalize(),f.push(S.x,S.y,S.z),p.push(O,1-M),T.push(v++)}x.push(T)}for(let P=0;P<r;P++)for(let T=0;T<s;T++){const M=x[T][P],I=x[T+1][P],V=x[T+1][P+1],O=x[T][P+1];(e>0||T!==0)&&(d.push(M,I,O),R+=3),(n>0||T!==s-1)&&(d.push(I,V,O),R+=3)}c.addGroup(u,R,0),u+=R}function y(S){const b=v,R=new tt,A=new H;let P=0;const T=S===!0?e:n,M=S===!0?1:-1;for(let V=1;V<=r;V++)h.push(0,g*M,0),f.push(0,M,0),p.push(.5,.5),v++;const I=v;for(let V=0;V<=r;V++){const q=V/r*l+o,Y=Math.cos(q),j=Math.sin(q);A.x=T*j,A.y=g*M,A.z=T*Y,h.push(A.x,A.y,A.z),f.push(0,M,0),R.x=Y*.5+.5,R.y=j*.5*M+.5,p.push(R.x,R.y),v++}for(let V=0;V<r;V++){const O=b+V,q=I+V;S===!0?d.push(q,q+1,O):d.push(q+1,q,O),P+=3}c.addGroup(u,P,S===!0?1:2),u+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uh(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wa extends Uh{constructor(e=1,n=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,n,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Wa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Rt extends Bi{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,h=e/o,f=n/l,p=[],v=[],x=[],g=[];for(let u=0;u<d;u++){const _=u*f-a;for(let y=0;y<c;y++){const S=y*h-s;v.push(S,-_,0),x.push(0,0,1),g.push(y/o),g.push(1-u/l)}}for(let u=0;u<l;u++)for(let _=0;_<o;_++){const y=_+c*u,S=_+c*(u+1),b=_+1+c*(u+1),R=_+1+c*u;p.push(y,S,R),p.push(S,b,R)}this.setIndex(p),this.setAttribute("position",new Tn(v,3)),this.setAttribute("normal",new Tn(x,3)),this.setAttribute("uv",new Tn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rt(e.width,e.height,e.widthSegments,e.heightSegments)}}class BM extends Cc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=QS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class HM extends Cc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class h_ extends c_{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class VM extends Kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}function Dm(t,e,n,i){const r=GM(i);switch(n){case Xv:return t*e;case Yv:return t*e;case Kv:return t*e*2;case Zv:return t*e/r.components*r.byteLength;case Lh:return t*e/r.components*r.byteLength;case Qv:return t*e*2/r.components*r.byteLength;case Nh:return t*e*2/r.components*r.byteLength;case $v:return t*e*3/r.components*r.byteLength;case Qn:return t*e*4/r.components*r.byteLength;case kh:return t*e*4/r.components*r.byteLength;case Ml:case El:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case wl:case Tl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Yd:case Zd:return Math.max(t,16)*Math.max(e,8)/4;case $d:case Kd:return Math.max(t,8)*Math.max(e,8)/2;case Qd:case Jd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ef:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case tf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case nf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case rf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case sf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case af:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case of:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case lf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case cf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case uf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case df:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case ff:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case hf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case pf:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case mf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Al:case gf:case vf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Jv:case _f:return Math.ceil(t/4)*Math.ceil(e/4)*8;case yf:case xf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function GM(t){switch(t){case Fi:case Wv:return{byteLength:1,components:1};case fo:case jv:case yo:return{byteLength:2,components:1};case Ph:case Ih:return{byteLength:2,components:4};case Yr:case Rh:case Ci:return{byteLength:4,components:1};case qv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ch}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ch);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function p_(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function WM(t){const e=new WeakMap;function n(o,l){const c=o.array,d=o.usage,h=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(t.bindBuffer(c,o),h.length===0)t.bufferSubData(c,0,d);else{h.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<h.length;p++){const v=h[f],x=h[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++f,h[f]=x)}h.length=f+1;for(let p=0,v=h.length;p<v;p++){const x=h[p];t.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var jM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,XM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$M=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,YM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,KM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ZM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,QM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,JM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,eE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,rE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,aE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,oE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,pE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,vE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_E=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,SE="gl_FragColor = linearToOutputTexel( gl_FragColor );",ME=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,EE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,wE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,TE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,AE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,CE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,RE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,PE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,IE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,LE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,NE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,DE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,UE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,FE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,OE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,BE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,HE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,VE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,GE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,WE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,jE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,XE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$E=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,YE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,KE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ZE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,QE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,JE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ew=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,aw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ow=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,uw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_w=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,xw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ew=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ww=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Aw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,bw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Cw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Rw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Iw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Nw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Uw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ow=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Bw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ww=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$w=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Qw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Jw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,e2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,t2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,i2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,r2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,s2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,o2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,c2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,d2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,f2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,m2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,y2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,M2=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,E2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:jM,alphahash_pars_fragment:qM,alphamap_fragment:XM,alphamap_pars_fragment:$M,alphatest_fragment:YM,alphatest_pars_fragment:KM,aomap_fragment:ZM,aomap_pars_fragment:QM,batching_pars_vertex:JM,batching_vertex:eE,begin_vertex:tE,beginnormal_vertex:nE,bsdfs:iE,iridescence_fragment:rE,bumpmap_pars_fragment:sE,clipping_planes_fragment:aE,clipping_planes_pars_fragment:oE,clipping_planes_pars_vertex:lE,clipping_planes_vertex:cE,color_fragment:uE,color_pars_fragment:dE,color_pars_vertex:fE,color_vertex:hE,common:pE,cube_uv_reflection_fragment:mE,defaultnormal_vertex:gE,displacementmap_pars_vertex:vE,displacementmap_vertex:_E,emissivemap_fragment:yE,emissivemap_pars_fragment:xE,colorspace_fragment:SE,colorspace_pars_fragment:ME,envmap_fragment:EE,envmap_common_pars_fragment:wE,envmap_pars_fragment:TE,envmap_pars_vertex:AE,envmap_physical_pars_fragment:FE,envmap_vertex:bE,fog_vertex:CE,fog_pars_vertex:RE,fog_fragment:PE,fog_pars_fragment:IE,gradientmap_pars_fragment:LE,lightmap_pars_fragment:NE,lights_lambert_fragment:kE,lights_lambert_pars_fragment:DE,lights_pars_begin:UE,lights_toon_fragment:OE,lights_toon_pars_fragment:zE,lights_phong_fragment:BE,lights_phong_pars_fragment:HE,lights_physical_fragment:VE,lights_physical_pars_fragment:GE,lights_fragment_begin:WE,lights_fragment_maps:jE,lights_fragment_end:qE,logdepthbuf_fragment:XE,logdepthbuf_pars_fragment:$E,logdepthbuf_pars_vertex:YE,logdepthbuf_vertex:KE,map_fragment:ZE,map_pars_fragment:QE,map_particle_fragment:JE,map_particle_pars_fragment:ew,metalnessmap_fragment:tw,metalnessmap_pars_fragment:nw,morphinstance_vertex:iw,morphcolor_vertex:rw,morphnormal_vertex:sw,morphtarget_pars_vertex:aw,morphtarget_vertex:ow,normal_fragment_begin:lw,normal_fragment_maps:cw,normal_pars_fragment:uw,normal_pars_vertex:dw,normal_vertex:fw,normalmap_pars_fragment:hw,clearcoat_normal_fragment_begin:pw,clearcoat_normal_fragment_maps:mw,clearcoat_pars_fragment:gw,iridescence_pars_fragment:vw,opaque_fragment:_w,packing:yw,premultiplied_alpha_fragment:xw,project_vertex:Sw,dithering_fragment:Mw,dithering_pars_fragment:Ew,roughnessmap_fragment:ww,roughnessmap_pars_fragment:Tw,shadowmap_pars_fragment:Aw,shadowmap_pars_vertex:bw,shadowmap_vertex:Cw,shadowmask_pars_fragment:Rw,skinbase_vertex:Pw,skinning_pars_vertex:Iw,skinning_vertex:Lw,skinnormal_vertex:Nw,specularmap_fragment:kw,specularmap_pars_fragment:Dw,tonemapping_fragment:Uw,tonemapping_pars_fragment:Fw,transmission_fragment:Ow,transmission_pars_fragment:zw,uv_pars_fragment:Bw,uv_pars_vertex:Hw,uv_vertex:Vw,worldpos_vertex:Gw,background_vert:Ww,background_frag:jw,backgroundCube_vert:qw,backgroundCube_frag:Xw,cube_vert:$w,cube_frag:Yw,depth_vert:Kw,depth_frag:Zw,distanceRGBA_vert:Qw,distanceRGBA_frag:Jw,equirect_vert:e2,equirect_frag:t2,linedashed_vert:n2,linedashed_frag:i2,meshbasic_vert:r2,meshbasic_frag:s2,meshlambert_vert:a2,meshlambert_frag:o2,meshmatcap_vert:l2,meshmatcap_frag:c2,meshnormal_vert:u2,meshnormal_frag:d2,meshphong_vert:f2,meshphong_frag:h2,meshphysical_vert:p2,meshphysical_frag:m2,meshtoon_vert:g2,meshtoon_frag:v2,points_vert:_2,points_frag:y2,shadow_vert:x2,shadow_frag:S2,sprite_vert:M2,sprite_frag:E2},oe={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},li={basic:{uniforms:en([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:en([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new He(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:en([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:en([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:en([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new He(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:en([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:en([oe.points,oe.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:en([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:en([oe.common,oe.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:en([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:en([oe.sprite,oe.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:en([oe.common,oe.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:en([oe.lights,oe.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};li.physical={uniforms:en([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const ol={r:0,b:0,g:0},Cr=new Oi,w2=new It;function T2(t,e,n,i,r,s,a){const o=new He(0);let l=s===!0?0:1,c,d,h=null,f=0,p=null;function v(y){let S=y.isScene===!0?y.background:null;return S&&S.isTexture&&(S=(y.backgroundBlurriness>0?n:e).get(S)),S}function x(y){let S=!1;const b=v(y);b===null?u(o,l):b&&b.isColor&&(u(b,1),S=!0);const R=t.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(y,S){const b=v(S);b&&(b.isCubeTexture||b.mapping===bc)?(d===void 0&&(d=new Re(new Eo(1,1,1),new vr({name:"BackgroundCubeMaterial",uniforms:ea(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Cr.copy(S.backgroundRotation),Cr.x*=-1,Cr.y*=-1,Cr.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Cr.y*=-1,Cr.z*=-1),d.material.uniforms.envMap.value=b,d.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(w2.makeRotationFromEuler(Cr)),d.material.toneMapped=Qe.getTransfer(b.colorSpace)!==at,(h!==b||f!==b.version||p!==t.toneMapping)&&(d.material.needsUpdate=!0,h=b,f=b.version,p=t.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Re(new Rt(2,2),new vr({name:"BackgroundMaterial",uniforms:ea(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:gr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(b.colorSpace)!==at,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||f!==b.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,h=b,f=b.version,p=t.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function u(y,S){y.getRGB(ol,l_(t)),i.buffers.color.setClear(ol.r,ol.g,ol.b,S,a)}function _(){d!==void 0&&(d.geometry.dispose(),d.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(y,S=1){o.set(y),l=S,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,u(o,l)},render:x,addToRenderList:g,dispose:_}}function A2(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(M,I,V,O,q){let Y=!1;const j=h(O,V,I);s!==j&&(s=j,c(s.object)),Y=p(M,O,V,q),Y&&v(M,O,V,q),q!==null&&e.update(q,t.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,S(M,I,V,O),q!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return t.createVertexArray()}function c(M){return t.bindVertexArray(M)}function d(M){return t.deleteVertexArray(M)}function h(M,I,V){const O=V.wireframe===!0;let q=i[M.id];q===void 0&&(q={},i[M.id]=q);let Y=q[I.id];Y===void 0&&(Y={},q[I.id]=Y);let j=Y[O];return j===void 0&&(j=f(l()),Y[O]=j),j}function f(M){const I=[],V=[],O=[];for(let q=0;q<n;q++)I[q]=0,V[q]=0,O[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:O,object:M,attributes:{},index:null}}function p(M,I,V,O){const q=s.attributes,Y=I.attributes;let j=0;const J=V.getAttributes();for(const N in J)if(J[N].location>=0){const Q=q[N];let ae=Y[N];if(ae===void 0&&(N==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),N==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor)),Q===void 0||Q.attribute!==ae||ae&&Q.data!==ae.data)return!0;j++}return s.attributesNum!==j||s.index!==O}function v(M,I,V,O){const q={},Y=I.attributes;let j=0;const J=V.getAttributes();for(const N in J)if(J[N].location>=0){let Q=Y[N];Q===void 0&&(N==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),N==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor));const ae={};ae.attribute=Q,Q&&Q.data&&(ae.data=Q.data),q[N]=ae,j++}s.attributes=q,s.attributesNum=j,s.index=O}function x(){const M=s.newAttributes;for(let I=0,V=M.length;I<V;I++)M[I]=0}function g(M){u(M,0)}function u(M,I){const V=s.newAttributes,O=s.enabledAttributes,q=s.attributeDivisors;V[M]=1,O[M]===0&&(t.enableVertexAttribArray(M),O[M]=1),q[M]!==I&&(t.vertexAttribDivisor(M,I),q[M]=I)}function _(){const M=s.newAttributes,I=s.enabledAttributes;for(let V=0,O=I.length;V<O;V++)I[V]!==M[V]&&(t.disableVertexAttribArray(V),I[V]=0)}function y(M,I,V,O,q,Y,j){j===!0?t.vertexAttribIPointer(M,I,V,q,Y):t.vertexAttribPointer(M,I,V,O,q,Y)}function S(M,I,V,O){x();const q=O.attributes,Y=V.getAttributes(),j=I.defaultAttributeValues;for(const J in Y){const N=Y[J];if(N.location>=0){let X=q[J];if(X===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(X=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(X=M.instanceColor)),X!==void 0){const Q=X.normalized,ae=X.itemSize,xe=e.get(X);if(xe===void 0)continue;const Ke=xe.buffer,W=xe.type,ie=xe.bytesPerElement,pe=W===t.INT||W===t.UNSIGNED_INT||X.gpuType===Rh;if(X.isInterleavedBufferAttribute){const se=X.data,Ce=se.stride,Ne=X.offset;if(se.isInstancedInterleavedBuffer){for(let ze=0;ze<N.locationSize;ze++)u(N.location+ze,se.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ze=0;ze<N.locationSize;ze++)g(N.location+ze);t.bindBuffer(t.ARRAY_BUFFER,Ke);for(let ze=0;ze<N.locationSize;ze++)y(N.location+ze,ae/N.locationSize,W,Q,Ce*ie,(Ne+ae/N.locationSize*ze)*ie,pe)}else{if(X.isInstancedBufferAttribute){for(let se=0;se<N.locationSize;se++)u(N.location+se,X.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let se=0;se<N.locationSize;se++)g(N.location+se);t.bindBuffer(t.ARRAY_BUFFER,Ke);for(let se=0;se<N.locationSize;se++)y(N.location+se,ae/N.locationSize,W,Q,ae*ie,ae/N.locationSize*se*ie,pe)}}else if(j!==void 0){const Q=j[J];if(Q!==void 0)switch(Q.length){case 2:t.vertexAttrib2fv(N.location,Q);break;case 3:t.vertexAttrib3fv(N.location,Q);break;case 4:t.vertexAttrib4fv(N.location,Q);break;default:t.vertexAttrib1fv(N.location,Q)}}}}_()}function b(){P();for(const M in i){const I=i[M];for(const V in I){const O=I[V];for(const q in O)d(O[q].object),delete O[q];delete I[V]}delete i[M]}}function R(M){if(i[M.id]===void 0)return;const I=i[M.id];for(const V in I){const O=I[V];for(const q in O)d(O[q].object),delete O[q];delete I[V]}delete i[M.id]}function A(M){for(const I in i){const V=i[I];if(V[M.id]===void 0)continue;const O=V[M.id];for(const q in O)d(O[q].object),delete O[q];delete V[M.id]}}function P(){T(),a=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:T,dispose:b,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:g,disableUnusedAttributes:_}}function b2(t,e,n){let i;function r(c){i=c}function s(c,d){t.drawArrays(i,c,d),n.update(d,i,1)}function a(c,d,h){h!==0&&(t.drawArraysInstanced(i,c,d,h),n.update(d,i,h))}function o(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let p=0;for(let v=0;v<h;v++)p+=d[v];n.update(p,i,1)}function l(c,d,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)a(c[v],d[v],f[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,f,0,h);let v=0;for(let x=0;x<h;x++)v+=d[x]*f[x];n.update(v,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function C2(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==Qn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const P=A===yo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Fi&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ci&&!P)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),y=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),b=v>0,R=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:g,maxAttributes:u,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:S,vertexTextures:b,maxSamples:R}}function R2(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Lr,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){n=d(h,f,0)},this.setState=function(h,f,p){const v=h.clippingPlanes,x=h.clipIntersection,g=h.clipShadows,u=t.get(h);if(!r||v===null||v.length===0||s&&!g)s?d(null):c();else{const _=s?0:i,y=_*4;let S=u.clippingState||null;l.value=S,S=d(v,f,y,p);for(let b=0;b!==y;++b)S[b]=n[b];u.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,f,p,v){const x=h!==null?h.length:0;let g=null;if(x!==0){if(g=l.value,v!==!0||g===null){const u=p+x*4,_=f.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<u)&&(g=new Float32Array(u));for(let y=0,S=p;y!==x;++y,S+=4)a.copy(h[y]).applyMatrix4(_,o),a.normal.toArray(g,S),g[S+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function P2(t){let e=new WeakMap;function n(a,o){return o===Wd?a.mapping=Ys:o===jd&&(a.mapping=Ks),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Wd||o===jd)if(e.has(a)){const l=e.get(a).texture;return n(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new UM(l.height);return c.fromEquirectangularTexture(t,a),e.set(a,c),a.addEventListener("dispose",r),n(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const Ps=4,Um=[.125,.215,.35,.446,.526,.582],Dr=20,Nu=new h_,Fm=new He;let ku=null,Du=0,Uu=0,Fu=!1;const Nr=(1+Math.sqrt(5))/2,gs=1/Nr,Om=[new H(-Nr,gs,0),new H(Nr,gs,0),new H(-gs,0,Nr),new H(gs,0,Nr),new H(0,Nr,-gs),new H(0,Nr,gs),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)];class zm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){ku=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Uu=this._renderer.getActiveMipmapLevel(),Fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ku,Du,Uu),this._renderer.xr.enabled=Fu,e.scissorTest=!1,ll(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ys||e.mapping===Ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ku=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Uu=this._renderer.getActiveMipmapLevel(),Fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ui,minFilter:ui,generateMipmaps:!1,type:yo,format:Qn,colorSpace:Js,depthBuffer:!1},r=Bm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=I2(s)),this._blurMaterial=L2(s,e,n)}return r}_compileMaterial(e){const n=new Re(this._lodPlanes[0],e);this._renderer.compile(n,Nu)}_sceneToCubeUV(e,n,i,r){const o=new Kn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Fm),d.toneMapping=dr,d.autoClear=!1;const p=new mt({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),v=new Re(new Eo,p);let x=!1;const g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,x=!0):(p.color.copy(Fm),x=!0);for(let u=0;u<6;u++){const _=u%3;_===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):_===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const y=this._cubeSize;ll(r,_*y,u>2?y:0,y,y),d.setRenderTarget(r),x&&d.render(v,o),d.render(e,o)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ys||e.mapping===Ks;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hm());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Re(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ll(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,Nu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Om[(r-s-1)%Om.length];this._blur(e,s-1,s,a,o)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new Re(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Dr-1),x=s/v,g=isFinite(s)?1+Math.floor(d*x):Dr;g>Dr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Dr}`);const u=[];let _=0;for(let A=0;A<Dr;++A){const P=A/x,T=Math.exp(-P*P/2);u.push(T),A===0?_+=T:A<g&&(_+=2*T)}for(let A=0;A<u.length;A++)u[A]=u[A]/_;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:y}=this;f.dTheta.value=v,f.mipInt.value=y-i;const S=this._sizeLods[r],b=3*S*(r>y-Ps?r-y+Ps:0),R=4*(this._cubeSize-S);ll(n,b,R,3*S,2*S),l.setRenderTarget(n),l.render(h,Nu)}}function I2(t){const e=[],n=[],i=[];let r=t;const s=t-Ps+1+Um.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let l=1/o;a>t-Ps?l=Um[a-t+Ps-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,v=6,x=3,g=2,u=1,_=new Float32Array(x*v*p),y=new Float32Array(g*v*p),S=new Float32Array(u*v*p);for(let R=0;R<p;R++){const A=R%3*2/3-1,P=R>2?0:-1,T=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];_.set(T,x*v*R),y.set(f,g*v*R);const M=[R,R,R,R,R,R];S.set(M,u*v*R)}const b=new Bi;b.setAttribute("position",new hi(_,x)),b.setAttribute("uv",new hi(y,g)),b.setAttribute("faceIndex",new hi(S,u)),e.push(b),r>Ps&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Bm(t,e,n){const i=new Kr(t,e,n);return i.texture.mapping=bc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ll(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function L2(t,e,n){const i=new Float32Array(Dr),r=new H(0,1,0);return new vr({name:"SphericalGaussianBlur",defines:{n:Dr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ur,depthTest:!1,depthWrite:!1})}function Hm(){return new vr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ur,depthTest:!1,depthWrite:!1})}function Vm(){return new vr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ur,depthTest:!1,depthWrite:!1})}function Fh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function N2(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Wd||l===jd,d=l===Ys||l===Ks;if(c||d){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return n===null&&(n=new zm(t)),h=c?n.fromEquirectangular(o,h):n.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return c&&p&&p.height>0||d&&p&&r(p)?(n===null&&(n=new zm(t)),h=c?n.fromEquirectangular(o):n.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function k2(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&vs("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function D2(t,e,n,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);f.removeEventListener("dispose",a),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,n.memory.geometries++),f}function l(h){const f=h.attributes;for(const p in f)e.update(f[p],t.ARRAY_BUFFER)}function c(h){const f=[],p=h.index,v=h.attributes.position;let x=0;if(p!==null){const _=p.array;x=p.version;for(let y=0,S=_.length;y<S;y+=3){const b=_[y+0],R=_[y+1],A=_[y+2];f.push(b,R,R,A,A,b)}}else if(v!==void 0){const _=v.array;x=v.version;for(let y=0,S=_.length/3-1;y<S;y+=3){const b=y+0,R=y+1,A=y+2;f.push(b,R,R,A,A,b)}}else return;const g=new(t_(f)?o_:a_)(f,1);g.version=x;const u=s.get(h);u&&e.remove(u),s.set(h,g)}function d(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function U2(t,e,n){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*a),n.update(p,i,1)}function c(f,p,v){v!==0&&(t.drawElementsInstanced(i,p,s,f*a,v),n.update(p,i,v))}function d(f,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,v);let g=0;for(let u=0;u<v;u++)g+=p[u];n.update(g,i,1)}function h(f,p,v,x){if(v===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let u=0;u<f.length;u++)c(f[u]/a,p[u],x[u]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,x,0,v);let u=0;for(let _=0;_<v;_++)u+=p[_]*x[_];n.update(u,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function F2(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function O2(t,e,n){const i=new WeakMap,r=new At;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let M=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var p=M;f!==void 0&&f.texture.dispose();const v=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let S=0;v===!0&&(S=1),x===!0&&(S=2),g===!0&&(S=3);let b=o.attributes.position.count*S,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const A=new Float32Array(b*R*4*h),P=new i_(A,b,R,h);P.type=Ci,P.needsUpdate=!0;const T=S*4;for(let I=0;I<h;I++){const V=u[I],O=_[I],q=y[I],Y=b*R*4*I;for(let j=0;j<V.count;j++){const J=j*T;v===!0&&(r.fromBufferAttribute(V,j),A[Y+J+0]=r.x,A[Y+J+1]=r.y,A[Y+J+2]=r.z,A[Y+J+3]=0),x===!0&&(r.fromBufferAttribute(O,j),A[Y+J+4]=r.x,A[Y+J+5]=r.y,A[Y+J+6]=r.z,A[Y+J+7]=0),g===!0&&(r.fromBufferAttribute(q,j),A[Y+J+8]=r.x,A[Y+J+9]=r.y,A[Y+J+10]=r.z,A[Y+J+11]=q.itemSize===4?r.w:1)}}f={count:h,texture:P,size:new tt(b,R)},i.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let v=0;for(let g=0;g<c.length;g++)v+=c[g];const x=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",x),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function z2(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:a}}const m_=new pn,Gm=new f_(1,1),g_=new i_,v_=new yM,__=new u_,Wm=[],jm=[],qm=new Float32Array(16),Xm=new Float32Array(9),$m=new Float32Array(4);function da(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Wm[r];if(s===void 0&&(s=new Float32Array(r),Wm[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Dt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ut(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Rc(t,e){let n=jm[e];n===void 0&&(n=new Int32Array(e),jm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function B2(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function H2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2fv(this.addr,e),Ut(n,e)}}function V2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Dt(n,e))return;t.uniform3fv(this.addr,e),Ut(n,e)}}function G2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4fv(this.addr,e),Ut(n,e)}}function W2(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ut(n,e)}else{if(Dt(n,i))return;$m.set(i),t.uniformMatrix2fv(this.addr,!1,$m),Ut(n,i)}}function j2(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ut(n,e)}else{if(Dt(n,i))return;Xm.set(i),t.uniformMatrix3fv(this.addr,!1,Xm),Ut(n,i)}}function q2(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ut(n,e)}else{if(Dt(n,i))return;qm.set(i),t.uniformMatrix4fv(this.addr,!1,qm),Ut(n,i)}}function X2(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function $2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2iv(this.addr,e),Ut(n,e)}}function Y2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Dt(n,e))return;t.uniform3iv(this.addr,e),Ut(n,e)}}function K2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4iv(this.addr,e),Ut(n,e)}}function Z2(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Q2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2uiv(this.addr,e),Ut(n,e)}}function J2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Dt(n,e))return;t.uniform3uiv(this.addr,e),Ut(n,e)}}function eT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4uiv(this.addr,e),Ut(n,e)}}function tT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Gm.compareFunction=e_,s=Gm):s=m_,n.setTexture2D(e||s,r)}function nT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||v_,r)}function iT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||__,r)}function rT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||g_,r)}function sT(t){switch(t){case 5126:return B2;case 35664:return H2;case 35665:return V2;case 35666:return G2;case 35674:return W2;case 35675:return j2;case 35676:return q2;case 5124:case 35670:return X2;case 35667:case 35671:return $2;case 35668:case 35672:return Y2;case 35669:case 35673:return K2;case 5125:return Z2;case 36294:return Q2;case 36295:return J2;case 36296:return eT;case 35678:case 36198:case 36298:case 36306:case 35682:return tT;case 35679:case 36299:case 36307:return nT;case 35680:case 36300:case 36308:case 36293:return iT;case 36289:case 36303:case 36311:case 36292:return rT}}function aT(t,e){t.uniform1fv(this.addr,e)}function oT(t,e){const n=da(e,this.size,2);t.uniform2fv(this.addr,n)}function lT(t,e){const n=da(e,this.size,3);t.uniform3fv(this.addr,n)}function cT(t,e){const n=da(e,this.size,4);t.uniform4fv(this.addr,n)}function uT(t,e){const n=da(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function dT(t,e){const n=da(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function fT(t,e){const n=da(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function hT(t,e){t.uniform1iv(this.addr,e)}function pT(t,e){t.uniform2iv(this.addr,e)}function mT(t,e){t.uniform3iv(this.addr,e)}function gT(t,e){t.uniform4iv(this.addr,e)}function vT(t,e){t.uniform1uiv(this.addr,e)}function _T(t,e){t.uniform2uiv(this.addr,e)}function yT(t,e){t.uniform3uiv(this.addr,e)}function xT(t,e){t.uniform4uiv(this.addr,e)}function ST(t,e,n){const i=this.cache,r=e.length,s=Rc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||m_,s[a])}function MT(t,e,n){const i=this.cache,r=e.length,s=Rc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||v_,s[a])}function ET(t,e,n){const i=this.cache,r=e.length,s=Rc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||__,s[a])}function wT(t,e,n){const i=this.cache,r=e.length,s=Rc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||g_,s[a])}function TT(t){switch(t){case 5126:return aT;case 35664:return oT;case 35665:return lT;case 35666:return cT;case 35674:return uT;case 35675:return dT;case 35676:return fT;case 5124:case 35670:return hT;case 35667:case 35671:return pT;case 35668:case 35672:return mT;case 35669:case 35673:return gT;case 5125:return vT;case 36294:return _T;case 36295:return yT;case 36296:return xT;case 35678:case 36198:case 36298:case 36306:case 35682:return ST;case 35679:case 36299:case 36307:return MT;case 35680:case 36300:case 36308:case 36293:return ET;case 36289:case 36303:case 36311:case 36292:return wT}}class AT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=sT(n.type)}}class bT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=TT(n.type)}}class CT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Ou=/(\w+)(\])?(\[|\.)?/g;function Ym(t,e){t.seq.push(e),t.map[e.id]=e}function RT(t,e,n){const i=t.name,r=i.length;for(Ou.lastIndex=0;;){const s=Ou.exec(i),a=Ou.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Ym(n,c===void 0?new AT(o,t,e):new bT(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new CT(o),Ym(n,h)),n=h}}}class bl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);RT(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function Km(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const PT=37297;let IT=0;function LT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const Zm=new Ue;function NT(t){Qe._getMatrix(Zm,Qe.workingColorSpace,t);const e=`mat3( ${Zm.elements.map(n=>n.toFixed(4))} )`;switch(Qe.getTransfer(t)){case nc:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Qm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+LT(t.getShaderSource(e),a)}else return r}function kT(t,e){const n=NT(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function DT(t,e){let n;switch(e){case WS:n="Linear";break;case jS:n="Reinhard";break;case qS:n="Cineon";break;case XS:n="ACESFilmic";break;case YS:n="AgX";break;case KS:n="Neutral";break;case $S:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const cl=new H;function UT(){Qe.getLuminanceCoefficients(cl);const t=cl.x.toFixed(4),e=cl.y.toFixed(4),n=cl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function FT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ia).join(`
`)}function OT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function zT(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ia(t){return t!==""}function Jm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function eg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const BT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mf(t){return t.replace(BT,VT)}const HT=new Map;function VT(t,e){let n=Oe[e];if(n===void 0){const i=HT.get(e);if(i!==void 0)n=Oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Mf(n)}const GT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tg(t){return t.replace(GT,WT)}function WT(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ng(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function jT(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Hv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===ES?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Si&&(e="SHADOWMAP_TYPE_VSM"),e}function qT(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ys:case Ks:e="ENVMAP_TYPE_CUBE";break;case bc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function XT(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Ks:e="ENVMAP_MODE_REFRACTION";break}return e}function $T(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Vv:e="ENVMAP_BLENDING_MULTIPLY";break;case VS:e="ENVMAP_BLENDING_MIX";break;case GS:e="ENVMAP_BLENDING_ADD";break}return e}function YT(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function KT(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=jT(n),c=qT(n),d=XT(n),h=$T(n),f=YT(n),p=FT(n),v=OT(s),x=r.createProgram();let g,u,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Ia).join(`
`),g.length>0&&(g+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Ia).join(`
`),u.length>0&&(u+=`
`)):(g=[ng(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ia).join(`
`),u=[ng(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==dr?"#define TONE_MAPPING":"",n.toneMapping!==dr?Oe.tonemapping_pars_fragment:"",n.toneMapping!==dr?DT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,kT("linearToOutputTexel",n.outputColorSpace),UT(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ia).join(`
`)),a=Mf(a),a=Jm(a,n),a=eg(a,n),o=Mf(o),o=Jm(o,n),o=eg(o,n),a=tg(a),o=tg(o),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,u=["#define varying in",n.glslVersion===vm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===vm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const y=_+g+a,S=_+u+o,b=Km(r,r.VERTEX_SHADER,y),R=Km(r,r.FRAGMENT_SHADER,S);r.attachShader(x,b),r.attachShader(x,R),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(I){if(t.debug.checkShaderErrors){const V=r.getProgramInfoLog(x).trim(),O=r.getShaderInfoLog(b).trim(),q=r.getShaderInfoLog(R).trim();let Y=!0,j=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(Y=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,x,b,R);else{const J=Qm(r,b,"vertex"),N=Qm(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+V+`
`+J+`
`+N)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(O===""||q==="")&&(j=!1);j&&(I.diagnostics={runnable:Y,programLog:V,vertexShader:{log:O,prefix:g},fragmentShader:{log:q,prefix:u}})}r.deleteShader(b),r.deleteShader(R),P=new bl(r,x),T=zT(r,x)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(x,PT)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=IT++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=R,this}let ZT=0;class QT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new JT(e),n.set(e,i)),i}}class JT{constructor(e){this.id=ZT++,this.code=e,this.usedTimes=0}}function eA(t,e,n,i,r,s,a){const o=new r_,l=new QT,c=new Set,d=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(T){return c.add(T),T===0?"uv":`uv${T}`}function g(T,M,I,V,O){const q=V.fog,Y=O.geometry,j=T.isMeshStandardMaterial?V.environment:null,J=(T.isMeshStandardMaterial?n:e).get(T.envMap||j),N=J&&J.mapping===bc?J.image.height:null,X=v[T.type];T.precision!==null&&(p=r.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const Q=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ae=Q!==void 0?Q.length:0;let xe=0;Y.morphAttributes.position!==void 0&&(xe=1),Y.morphAttributes.normal!==void 0&&(xe=2),Y.morphAttributes.color!==void 0&&(xe=3);let Ke,W,ie,pe;if(X){const nt=li[X];Ke=nt.vertexShader,W=nt.fragmentShader}else Ke=T.vertexShader,W=T.fragmentShader,l.update(T),ie=l.getVertexShaderID(T),pe=l.getFragmentShaderID(T);const se=t.getRenderTarget(),Ce=t.state.buffers.depth.getReversed(),Ne=O.isInstancedMesh===!0,ze=O.isBatchedMesh===!0,pt=!!T.map,qe=!!T.matcap,Et=!!J,L=!!T.aoMap,Rn=!!T.lightMap,Ge=!!T.bumpMap,We=!!T.normalMap,Ee=!!T.displacementMap,ct=!!T.emissiveMap,we=!!T.metalnessMap,C=!!T.roughnessMap,E=T.anisotropy>0,F=T.clearcoat>0,K=T.dispersion>0,ee=T.iridescence>0,$=T.sheen>0,Se=T.transmission>0,ue=E&&!!T.anisotropyMap,ge=F&&!!T.clearcoatMap,Xe=F&&!!T.clearcoatNormalMap,re=F&&!!T.clearcoatRoughnessMap,ve=ee&&!!T.iridescenceMap,be=ee&&!!T.iridescenceThicknessMap,Pe=$&&!!T.sheenColorMap,_e=$&&!!T.sheenRoughnessMap,je=!!T.specularMap,Fe=!!T.specularColorMap,ot=!!T.specularIntensityMap,k=Se&&!!T.transmissionMap,le=Se&&!!T.thicknessMap,G=!!T.gradientMap,Z=!!T.alphaMap,fe=T.alphaTest>0,de=!!T.alphaHash,ke=!!T.extensions;let yt=dr;T.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(yt=t.toneMapping);const jt={shaderID:X,shaderType:T.type,shaderName:T.name,vertexShader:Ke,fragmentShader:W,defines:T.defines,customVertexShaderID:ie,customFragmentShaderID:pe,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:ze,batchingColor:ze&&O._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&O.instanceColor!==null,instancingMorph:Ne&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:se===null?t.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Js,alphaToCoverage:!!T.alphaToCoverage,map:pt,matcap:qe,envMap:Et,envMapMode:Et&&J.mapping,envMapCubeUVHeight:N,aoMap:L,lightMap:Rn,bumpMap:Ge,normalMap:We,displacementMap:f&&Ee,emissiveMap:ct,normalMapObjectSpace:We&&T.normalMapType===tM,normalMapTangentSpace:We&&T.normalMapType===eM,metalnessMap:we,roughnessMap:C,anisotropy:E,anisotropyMap:ue,clearcoat:F,clearcoatMap:ge,clearcoatNormalMap:Xe,clearcoatRoughnessMap:re,dispersion:K,iridescence:ee,iridescenceMap:ve,iridescenceThicknessMap:be,sheen:$,sheenColorMap:Pe,sheenRoughnessMap:_e,specularMap:je,specularColorMap:Fe,specularIntensityMap:ot,transmission:Se,transmissionMap:k,thicknessMap:le,gradientMap:G,opaque:T.transparent===!1&&T.blending===Fs&&T.alphaToCoverage===!1,alphaMap:Z,alphaTest:fe,alphaHash:de,combine:T.combine,mapUv:pt&&x(T.map.channel),aoMapUv:L&&x(T.aoMap.channel),lightMapUv:Rn&&x(T.lightMap.channel),bumpMapUv:Ge&&x(T.bumpMap.channel),normalMapUv:We&&x(T.normalMap.channel),displacementMapUv:Ee&&x(T.displacementMap.channel),emissiveMapUv:ct&&x(T.emissiveMap.channel),metalnessMapUv:we&&x(T.metalnessMap.channel),roughnessMapUv:C&&x(T.roughnessMap.channel),anisotropyMapUv:ue&&x(T.anisotropyMap.channel),clearcoatMapUv:ge&&x(T.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&x(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&x(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&x(T.iridescenceMap.channel),iridescenceThicknessMapUv:be&&x(T.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&x(T.sheenColorMap.channel),sheenRoughnessMapUv:_e&&x(T.sheenRoughnessMap.channel),specularMapUv:je&&x(T.specularMap.channel),specularColorMapUv:Fe&&x(T.specularColorMap.channel),specularIntensityMapUv:ot&&x(T.specularIntensityMap.channel),transmissionMapUv:k&&x(T.transmissionMap.channel),thicknessMapUv:le&&x(T.thicknessMap.channel),alphaMapUv:Z&&x(T.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(We||E),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!Y.attributes.uv&&(pt||Z),fog:!!q,useFog:T.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ce,skinning:O.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:xe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:t.shadowMap.enabled&&I.length>0,shadowMapType:t.shadowMap.type,toneMapping:yt,decodeVideoTexture:pt&&T.map.isVideoTexture===!0&&Qe.getTransfer(T.map.colorSpace)===at,decodeVideoTextureEmissive:ct&&T.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(T.emissiveMap.colorSpace)===at,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===wi,flipSided:T.side===hn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:ke&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&T.extensions.multiDraw===!0||ze)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return jt.vertexUv1s=c.has(1),jt.vertexUv2s=c.has(2),jt.vertexUv3s=c.has(3),c.clear(),jt}function u(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const I in T.defines)M.push(I),M.push(T.defines[I]);return T.isRawShaderMaterial===!1&&(_(M,T),y(M,T),M.push(t.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function _(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function y(T,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),T.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),T.push(o.mask)}function S(T){const M=v[T.type];let I;if(M){const V=li[M];I=LM.clone(V.uniforms)}else I=T.uniforms;return I}function b(T,M){let I;for(let V=0,O=d.length;V<O;V++){const q=d[V];if(q.cacheKey===M){I=q,++I.usedTimes;break}}return I===void 0&&(I=new KT(t,M,T,s),d.push(I)),I}function R(T){if(--T.usedTimes===0){const M=d.indexOf(T);d[M]=d[d.length-1],d.pop(),T.destroy()}}function A(T){l.remove(T)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:u,getUniforms:S,acquireProgram:b,releaseProgram:R,releaseShaderCache:A,programs:d,dispose:P}}function tA(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function nA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function ig(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function rg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(h,f,p,v,x,g){let u=t[e];return u===void 0?(u={id:h.id,object:h,geometry:f,material:p,groupOrder:v,renderOrder:h.renderOrder,z:x,group:g},t[e]=u):(u.id=h.id,u.object=h,u.geometry=f,u.material=p,u.groupOrder=v,u.renderOrder=h.renderOrder,u.z=x,u.group=g),e++,u}function o(h,f,p,v,x,g){const u=a(h,f,p,v,x,g);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(h,f,p,v,x,g){const u=a(h,f,p,v,x,g);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(h,f){n.length>1&&n.sort(h||nA),i.length>1&&i.sort(f||ig),r.length>1&&r.sort(f||ig)}function d(){for(let h=e,f=t.length;h<f;h++){const p=t[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function iA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new rg,t.set(i,[a])):r>=s.length?(a=new rg,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function rA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new H,color:new He};break;case"SpotLight":n={position:new H,direction:new H,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new H,color:new He,distance:0,decay:0};break;case"HemisphereLight":n={direction:new H,skyColor:new He,groundColor:new He};break;case"RectAreaLight":n={color:new He,position:new H,halfWidth:new H,halfHeight:new H};break}return t[e.id]=n,n}}}function sA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let aA=0;function oA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function lA(t){const e=new rA,n=sA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new H);const r=new H,s=new It,a=new It;function o(c){let d=0,h=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,v=0,x=0,g=0,u=0,_=0,y=0,S=0,b=0,R=0,A=0;c.sort(oA);for(let T=0,M=c.length;T<M;T++){const I=c[T],V=I.color,O=I.intensity,q=I.distance,Y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=V.r*O,h+=V.g*O,f+=V.b*O;else if(I.isLightProbe){for(let j=0;j<9;j++)i.probe[j].addScaledVector(I.sh.coefficients[j],O);A++}else if(I.isDirectionalLight){const j=e.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const J=I.shadow,N=n.get(I);N.shadowIntensity=J.intensity,N.shadowBias=J.bias,N.shadowNormalBias=J.normalBias,N.shadowRadius=J.radius,N.shadowMapSize=J.mapSize,i.directionalShadow[p]=N,i.directionalShadowMap[p]=Y,i.directionalShadowMatrix[p]=I.shadow.matrix,_++}i.directional[p]=j,p++}else if(I.isSpotLight){const j=e.get(I);j.position.setFromMatrixPosition(I.matrixWorld),j.color.copy(V).multiplyScalar(O),j.distance=q,j.coneCos=Math.cos(I.angle),j.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),j.decay=I.decay,i.spot[x]=j;const J=I.shadow;if(I.map&&(i.spotLightMap[b]=I.map,b++,J.updateMatrices(I),I.castShadow&&R++),i.spotLightMatrix[x]=J.matrix,I.castShadow){const N=n.get(I);N.shadowIntensity=J.intensity,N.shadowBias=J.bias,N.shadowNormalBias=J.normalBias,N.shadowRadius=J.radius,N.shadowMapSize=J.mapSize,i.spotShadow[x]=N,i.spotShadowMap[x]=Y,S++}x++}else if(I.isRectAreaLight){const j=e.get(I);j.color.copy(V).multiplyScalar(O),j.halfWidth.set(I.width*.5,0,0),j.halfHeight.set(0,I.height*.5,0),i.rectArea[g]=j,g++}else if(I.isPointLight){const j=e.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),j.distance=I.distance,j.decay=I.decay,I.castShadow){const J=I.shadow,N=n.get(I);N.shadowIntensity=J.intensity,N.shadowBias=J.bias,N.shadowNormalBias=J.normalBias,N.shadowRadius=J.radius,N.shadowMapSize=J.mapSize,N.shadowCameraNear=J.camera.near,N.shadowCameraFar=J.camera.far,i.pointShadow[v]=N,i.pointShadowMap[v]=Y,i.pointShadowMatrix[v]=I.shadow.matrix,y++}i.point[v]=j,v++}else if(I.isHemisphereLight){const j=e.get(I);j.skyColor.copy(I.color).multiplyScalar(O),j.groundColor.copy(I.groundColor).multiplyScalar(O),i.hemi[u]=j,u++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==p||P.pointLength!==v||P.spotLength!==x||P.rectAreaLength!==g||P.hemiLength!==u||P.numDirectionalShadows!==_||P.numPointShadows!==y||P.numSpotShadows!==S||P.numSpotMaps!==b||P.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=g,i.point.length=v,i.hemi.length=u,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=S+b-R,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=A,P.directionalLength=p,P.pointLength=v,P.spotLength=x,P.rectAreaLength=g,P.hemiLength=u,P.numDirectionalShadows=_,P.numPointShadows=y,P.numSpotShadows=S,P.numSpotMaps=b,P.numLightProbes=A,i.version=aA++)}function l(c,d){let h=0,f=0,p=0,v=0,x=0;const g=d.matrixWorldInverse;for(let u=0,_=c.length;u<_;u++){const y=c[u];if(y.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),h++}else if(y.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),p++}else if(y.isRectAreaLight){const S=i.rectArea[v];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),v++}else if(y.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:i}}function sg(t){const e=new lA(t),n=[],i=[];function r(d){c.camera=d,n.length=0,i.length=0}function s(d){n.push(d)}function a(d){i.push(d)}function o(){e.setup(n)}function l(d){e.setupView(n,d)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function cA(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new sg(t),e.set(r,[o])):s>=a.length?(o=new sg(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const uA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function fA(t,e,n){let i=new d_;const r=new tt,s=new tt,a=new At,o=new BM({depthPacking:JS}),l=new HM,c={},d=n.maxTextureSize,h={[gr]:hn,[hn]:gr,[wi]:wi},f=new vr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:uA,fragmentShader:dA}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new Bi;v.setAttribute("position",new hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Re(v,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hv;let u=this.type;this.render=function(R,A,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;const T=t.getRenderTarget(),M=t.getActiveCubeFace(),I=t.getActiveMipmapLevel(),V=t.state;V.setBlending(ur),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const O=u!==Si&&this.type===Si,q=u===Si&&this.type!==Si;for(let Y=0,j=R.length;Y<j;Y++){const J=R[Y],N=J.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const X=N.getFrameExtents();if(r.multiply(X),s.copy(N.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/X.x),r.x=s.x*X.x,N.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/X.y),r.y=s.y*X.y,N.mapSize.y=s.y)),N.map===null||O===!0||q===!0){const ae=this.type!==Si?{minFilter:ni,magFilter:ni}:{};N.map!==null&&N.map.dispose(),N.map=new Kr(r.x,r.y,ae),N.map.texture.name=J.name+".shadowMap",N.camera.updateProjectionMatrix()}t.setRenderTarget(N.map),t.clear();const Q=N.getViewportCount();for(let ae=0;ae<Q;ae++){const xe=N.getViewport(ae);a.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),V.viewport(a),N.updateMatrices(J,ae),i=N.getFrustum(),S(A,P,N.camera,J,this.type)}N.isPointLightShadow!==!0&&this.type===Si&&_(N,P),N.needsUpdate=!1}u=this.type,g.needsUpdate=!1,t.setRenderTarget(T,M,I)};function _(R,A){const P=e.update(x);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Kr(r.x,r.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(A,null,P,f,x,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(A,null,P,p,x,null)}function y(R,A,P,T){let M=null;const I=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)M=I;else if(M=P.isPointLight===!0?l:o,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const V=M.uuid,O=A.uuid;let q=c[V];q===void 0&&(q={},c[V]=q);let Y=q[O];Y===void 0&&(Y=M.clone(),q[O]=Y,A.addEventListener("dispose",b)),M=Y}if(M.visible=A.visible,M.wireframe=A.wireframe,T===Si?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:h[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=t.properties.get(M);V.light=P}return M}function S(R,A,P,T,M){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===Si)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const O=e.update(R),q=R.material;if(Array.isArray(q)){const Y=O.groups;for(let j=0,J=Y.length;j<J;j++){const N=Y[j],X=q[N.materialIndex];if(X&&X.visible){const Q=y(R,X,T,M);R.onBeforeShadow(t,R,A,P,O,Q,N),t.renderBufferDirect(P,null,O,Q,R,N),R.onAfterShadow(t,R,A,P,O,Q,N)}}}else if(q.visible){const Y=y(R,q,T,M);R.onBeforeShadow(t,R,A,P,O,Y,null),t.renderBufferDirect(P,null,O,Y,R,null),R.onAfterShadow(t,R,A,P,O,Y,null)}}const V=R.children;for(let O=0,q=V.length;O<q;O++)S(V[O],A,P,T,M)}function b(R){R.target.removeEventListener("dispose",b);for(const P in c){const T=c[P],M=R.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}const hA={[Fd]:Od,[zd]:Vd,[Bd]:Gd,[$s]:Hd,[Od]:Fd,[Vd]:zd,[Gd]:Bd,[Hd]:$s};function pA(t,e){function n(){let k=!1;const le=new At;let G=null;const Z=new At(0,0,0,0);return{setMask:function(fe){G!==fe&&!k&&(t.colorMask(fe,fe,fe,fe),G=fe)},setLocked:function(fe){k=fe},setClear:function(fe,de,ke,yt,jt){jt===!0&&(fe*=yt,de*=yt,ke*=yt),le.set(fe,de,ke,yt),Z.equals(le)===!1&&(t.clearColor(fe,de,ke,yt),Z.copy(le))},reset:function(){k=!1,G=null,Z.set(-1,0,0,0)}}}function i(){let k=!1,le=!1,G=null,Z=null,fe=null;return{setReversed:function(de){if(le!==de){const ke=e.get("EXT_clip_control");le?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT);const yt=fe;fe=null,this.setClear(yt)}le=de},getReversed:function(){return le},setTest:function(de){de?se(t.DEPTH_TEST):Ce(t.DEPTH_TEST)},setMask:function(de){G!==de&&!k&&(t.depthMask(de),G=de)},setFunc:function(de){if(le&&(de=hA[de]),Z!==de){switch(de){case Fd:t.depthFunc(t.NEVER);break;case Od:t.depthFunc(t.ALWAYS);break;case zd:t.depthFunc(t.LESS);break;case $s:t.depthFunc(t.LEQUAL);break;case Bd:t.depthFunc(t.EQUAL);break;case Hd:t.depthFunc(t.GEQUAL);break;case Vd:t.depthFunc(t.GREATER);break;case Gd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Z=de}},setLocked:function(de){k=de},setClear:function(de){fe!==de&&(le&&(de=1-de),t.clearDepth(de),fe=de)},reset:function(){k=!1,G=null,Z=null,fe=null,le=!1}}}function r(){let k=!1,le=null,G=null,Z=null,fe=null,de=null,ke=null,yt=null,jt=null;return{setTest:function(nt){k||(nt?se(t.STENCIL_TEST):Ce(t.STENCIL_TEST))},setMask:function(nt){le!==nt&&!k&&(t.stencilMask(nt),le=nt)},setFunc:function(nt,Hn,mi){(G!==nt||Z!==Hn||fe!==mi)&&(t.stencilFunc(nt,Hn,mi),G=nt,Z=Hn,fe=mi)},setOp:function(nt,Hn,mi){(de!==nt||ke!==Hn||yt!==mi)&&(t.stencilOp(nt,Hn,mi),de=nt,ke=Hn,yt=mi)},setLocked:function(nt){k=nt},setClear:function(nt){jt!==nt&&(t.clearStencil(nt),jt=nt)},reset:function(){k=!1,le=null,G=null,Z=null,fe=null,de=null,ke=null,yt=null,jt=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let d={},h={},f=new WeakMap,p=[],v=null,x=!1,g=null,u=null,_=null,y=null,S=null,b=null,R=null,A=new He(0,0,0),P=0,T=!1,M=null,I=null,V=null,O=null,q=null;const Y=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,J=0;const N=t.getParameter(t.VERSION);N.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(N)[1]),j=J>=1):N.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),j=J>=2);let X=null,Q={};const ae=t.getParameter(t.SCISSOR_BOX),xe=t.getParameter(t.VIEWPORT),Ke=new At().fromArray(ae),W=new At().fromArray(xe);function ie(k,le,G,Z){const fe=new Uint8Array(4),de=t.createTexture();t.bindTexture(k,de),t.texParameteri(k,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(k,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ke=0;ke<G;ke++)k===t.TEXTURE_3D||k===t.TEXTURE_2D_ARRAY?t.texImage3D(le,0,t.RGBA,1,1,Z,0,t.RGBA,t.UNSIGNED_BYTE,fe):t.texImage2D(le+ke,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,fe);return de}const pe={};pe[t.TEXTURE_2D]=ie(t.TEXTURE_2D,t.TEXTURE_2D,1),pe[t.TEXTURE_CUBE_MAP]=ie(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[t.TEXTURE_2D_ARRAY]=ie(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),pe[t.TEXTURE_3D]=ie(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(t.DEPTH_TEST),a.setFunc($s),Ge(!1),We(dm),se(t.CULL_FACE),L(ur);function se(k){d[k]!==!0&&(t.enable(k),d[k]=!0)}function Ce(k){d[k]!==!1&&(t.disable(k),d[k]=!1)}function Ne(k,le){return h[k]!==le?(t.bindFramebuffer(k,le),h[k]=le,k===t.DRAW_FRAMEBUFFER&&(h[t.FRAMEBUFFER]=le),k===t.FRAMEBUFFER&&(h[t.DRAW_FRAMEBUFFER]=le),!0):!1}function ze(k,le){let G=p,Z=!1;if(k){G=f.get(le),G===void 0&&(G=[],f.set(le,G));const fe=k.textures;if(G.length!==fe.length||G[0]!==t.COLOR_ATTACHMENT0){for(let de=0,ke=fe.length;de<ke;de++)G[de]=t.COLOR_ATTACHMENT0+de;G.length=fe.length,Z=!0}}else G[0]!==t.BACK&&(G[0]=t.BACK,Z=!0);Z&&t.drawBuffers(G)}function pt(k){return v!==k?(t.useProgram(k),v=k,!0):!1}const qe={[kr]:t.FUNC_ADD,[TS]:t.FUNC_SUBTRACT,[AS]:t.FUNC_REVERSE_SUBTRACT};qe[bS]=t.MIN,qe[CS]=t.MAX;const Et={[RS]:t.ZERO,[PS]:t.ONE,[IS]:t.SRC_COLOR,[Dd]:t.SRC_ALPHA,[FS]:t.SRC_ALPHA_SATURATE,[DS]:t.DST_COLOR,[NS]:t.DST_ALPHA,[LS]:t.ONE_MINUS_SRC_COLOR,[Ud]:t.ONE_MINUS_SRC_ALPHA,[US]:t.ONE_MINUS_DST_COLOR,[kS]:t.ONE_MINUS_DST_ALPHA,[OS]:t.CONSTANT_COLOR,[zS]:t.ONE_MINUS_CONSTANT_COLOR,[BS]:t.CONSTANT_ALPHA,[HS]:t.ONE_MINUS_CONSTANT_ALPHA};function L(k,le,G,Z,fe,de,ke,yt,jt,nt){if(k===ur){x===!0&&(Ce(t.BLEND),x=!1);return}if(x===!1&&(se(t.BLEND),x=!0),k!==wS){if(k!==g||nt!==T){if((u!==kr||S!==kr)&&(t.blendEquation(t.FUNC_ADD),u=kr,S=kr),nt)switch(k){case Fs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case fm:t.blendFunc(t.ONE,t.ONE);break;case hm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case pm:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Fs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case fm:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case hm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case pm:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}_=null,y=null,b=null,R=null,A.set(0,0,0),P=0,g=k,T=nt}return}fe=fe||le,de=de||G,ke=ke||Z,(le!==u||fe!==S)&&(t.blendEquationSeparate(qe[le],qe[fe]),u=le,S=fe),(G!==_||Z!==y||de!==b||ke!==R)&&(t.blendFuncSeparate(Et[G],Et[Z],Et[de],Et[ke]),_=G,y=Z,b=de,R=ke),(yt.equals(A)===!1||jt!==P)&&(t.blendColor(yt.r,yt.g,yt.b,jt),A.copy(yt),P=jt),g=k,T=!1}function Rn(k,le){k.side===wi?Ce(t.CULL_FACE):se(t.CULL_FACE);let G=k.side===hn;le&&(G=!G),Ge(G),k.blending===Fs&&k.transparent===!1?L(ur):L(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const Z=k.stencilWrite;o.setTest(Z),Z&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ct(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?se(t.SAMPLE_ALPHA_TO_COVERAGE):Ce(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(k){M!==k&&(k?t.frontFace(t.CW):t.frontFace(t.CCW),M=k)}function We(k){k!==SS?(se(t.CULL_FACE),k!==I&&(k===dm?t.cullFace(t.BACK):k===MS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ce(t.CULL_FACE),I=k}function Ee(k){k!==V&&(j&&t.lineWidth(k),V=k)}function ct(k,le,G){k?(se(t.POLYGON_OFFSET_FILL),(O!==le||q!==G)&&(t.polygonOffset(le,G),O=le,q=G)):Ce(t.POLYGON_OFFSET_FILL)}function we(k){k?se(t.SCISSOR_TEST):Ce(t.SCISSOR_TEST)}function C(k){k===void 0&&(k=t.TEXTURE0+Y-1),X!==k&&(t.activeTexture(k),X=k)}function E(k,le,G){G===void 0&&(X===null?G=t.TEXTURE0+Y-1:G=X);let Z=Q[G];Z===void 0&&(Z={type:void 0,texture:void 0},Q[G]=Z),(Z.type!==k||Z.texture!==le)&&(X!==G&&(t.activeTexture(G),X=G),t.bindTexture(k,le||pe[k]),Z.type=k,Z.texture=le)}function F(){const k=Q[X];k!==void 0&&k.type!==void 0&&(t.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function K(){try{t.compressedTexImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ee(){try{t.compressedTexImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function $(){try{t.texSubImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Se(){try{t.texSubImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ue(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ge(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Xe(){try{t.texStorage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{t.texStorage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ve(){try{t.texImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function be(){try{t.texImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Pe(k){Ke.equals(k)===!1&&(t.scissor(k.x,k.y,k.z,k.w),Ke.copy(k))}function _e(k){W.equals(k)===!1&&(t.viewport(k.x,k.y,k.z,k.w),W.copy(k))}function je(k,le){let G=c.get(le);G===void 0&&(G=new WeakMap,c.set(le,G));let Z=G.get(k);Z===void 0&&(Z=t.getUniformBlockIndex(le,k.name),G.set(k,Z))}function Fe(k,le){const Z=c.get(le).get(k);l.get(le)!==Z&&(t.uniformBlockBinding(le,Z,k.__bindingPointIndex),l.set(le,Z))}function ot(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),d={},X=null,Q={},h={},f=new WeakMap,p=[],v=null,x=!1,g=null,u=null,_=null,y=null,S=null,b=null,R=null,A=new He(0,0,0),P=0,T=!1,M=null,I=null,V=null,O=null,q=null,Ke.set(0,0,t.canvas.width,t.canvas.height),W.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:Ce,bindFramebuffer:Ne,drawBuffers:ze,useProgram:pt,setBlending:L,setMaterial:Rn,setFlipSided:Ge,setCullFace:We,setLineWidth:Ee,setPolygonOffset:ct,setScissorTest:we,activeTexture:C,bindTexture:E,unbindTexture:F,compressedTexImage2D:K,compressedTexImage3D:ee,texImage2D:ve,texImage3D:be,updateUBOMapping:je,uniformBlockBinding:Fe,texStorage2D:Xe,texStorage3D:re,texSubImage2D:$,texSubImage3D:Se,compressedTexSubImage2D:ue,compressedTexSubImage3D:ge,scissor:Pe,viewport:_e,reset:ot}}function mA(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new tt,d=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,E){return p?new OffscreenCanvas(C,E):rc("canvas")}function x(C,E,F){let K=1;const ee=we(C);if((ee.width>F||ee.height>F)&&(K=F/Math.max(ee.width,ee.height)),K<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const $=Math.floor(K*ee.width),Se=Math.floor(K*ee.height);h===void 0&&(h=v($,Se));const ue=E?v($,Se):h;return ue.width=$,ue.height=Se,ue.getContext("2d").drawImage(C,0,0,$,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+$+"x"+Se+")."),ue}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),C;return C}function g(C){return C.generateMipmaps}function u(C){t.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?t.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function y(C,E,F,K,ee=!1){if(C!==null){if(t[C]!==void 0)return t[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let $=E;if(E===t.RED&&(F===t.FLOAT&&($=t.R32F),F===t.HALF_FLOAT&&($=t.R16F),F===t.UNSIGNED_BYTE&&($=t.R8)),E===t.RED_INTEGER&&(F===t.UNSIGNED_BYTE&&($=t.R8UI),F===t.UNSIGNED_SHORT&&($=t.R16UI),F===t.UNSIGNED_INT&&($=t.R32UI),F===t.BYTE&&($=t.R8I),F===t.SHORT&&($=t.R16I),F===t.INT&&($=t.R32I)),E===t.RG&&(F===t.FLOAT&&($=t.RG32F),F===t.HALF_FLOAT&&($=t.RG16F),F===t.UNSIGNED_BYTE&&($=t.RG8)),E===t.RG_INTEGER&&(F===t.UNSIGNED_BYTE&&($=t.RG8UI),F===t.UNSIGNED_SHORT&&($=t.RG16UI),F===t.UNSIGNED_INT&&($=t.RG32UI),F===t.BYTE&&($=t.RG8I),F===t.SHORT&&($=t.RG16I),F===t.INT&&($=t.RG32I)),E===t.RGB_INTEGER&&(F===t.UNSIGNED_BYTE&&($=t.RGB8UI),F===t.UNSIGNED_SHORT&&($=t.RGB16UI),F===t.UNSIGNED_INT&&($=t.RGB32UI),F===t.BYTE&&($=t.RGB8I),F===t.SHORT&&($=t.RGB16I),F===t.INT&&($=t.RGB32I)),E===t.RGBA_INTEGER&&(F===t.UNSIGNED_BYTE&&($=t.RGBA8UI),F===t.UNSIGNED_SHORT&&($=t.RGBA16UI),F===t.UNSIGNED_INT&&($=t.RGBA32UI),F===t.BYTE&&($=t.RGBA8I),F===t.SHORT&&($=t.RGBA16I),F===t.INT&&($=t.RGBA32I)),E===t.RGB&&F===t.UNSIGNED_INT_5_9_9_9_REV&&($=t.RGB9_E5),E===t.RGBA){const Se=ee?nc:Qe.getTransfer(K);F===t.FLOAT&&($=t.RGBA32F),F===t.HALF_FLOAT&&($=t.RGBA16F),F===t.UNSIGNED_BYTE&&($=Se===at?t.SRGB8_ALPHA8:t.RGBA8),F===t.UNSIGNED_SHORT_4_4_4_4&&($=t.RGBA4),F===t.UNSIGNED_SHORT_5_5_5_1&&($=t.RGB5_A1)}return($===t.R16F||$===t.R32F||$===t.RG16F||$===t.RG32F||$===t.RGBA16F||$===t.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function S(C,E){let F;return C?E===null||E===Yr||E===Zs?F=t.DEPTH24_STENCIL8:E===Ci?F=t.DEPTH32F_STENCIL8:E===fo&&(F=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Yr||E===Zs?F=t.DEPTH_COMPONENT24:E===Ci?F=t.DEPTH_COMPONENT32F:E===fo&&(F=t.DEPTH_COMPONENT16),F}function b(C,E){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==ni&&C.minFilter!==ui?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function R(C){const E=C.target;E.removeEventListener("dispose",R),P(E),E.isVideoTexture&&d.delete(E)}function A(C){const E=C.target;E.removeEventListener("dispose",A),M(E)}function P(C){const E=i.get(C);if(E.__webglInit===void 0)return;const F=C.source,K=f.get(F);if(K){const ee=K[E.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&T(C),Object.keys(K).length===0&&f.delete(F)}i.remove(C)}function T(C){const E=i.get(C);t.deleteTexture(E.__webglTexture);const F=C.source,K=f.get(F);delete K[E.__cacheKey],a.memory.textures--}function M(C){const E=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(E.__webglFramebuffer[K]))for(let ee=0;ee<E.__webglFramebuffer[K].length;ee++)t.deleteFramebuffer(E.__webglFramebuffer[K][ee]);else t.deleteFramebuffer(E.__webglFramebuffer[K]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[K])}else{if(Array.isArray(E.__webglFramebuffer))for(let K=0;K<E.__webglFramebuffer.length;K++)t.deleteFramebuffer(E.__webglFramebuffer[K]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let K=0;K<E.__webglColorRenderbuffer.length;K++)E.__webglColorRenderbuffer[K]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[K]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const F=C.textures;for(let K=0,ee=F.length;K<ee;K++){const $=i.get(F[K]);$.__webglTexture&&(t.deleteTexture($.__webglTexture),a.memory.textures--),i.remove(F[K])}i.remove(C)}let I=0;function V(){I=0}function O(){const C=I;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),I+=1,C}function q(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function Y(C,E){const F=i.get(C);if(C.isVideoTexture&&Ee(C),C.isRenderTargetTexture===!1&&C.version>0&&F.__version!==C.version){const K=C.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(F,C,E);return}}n.bindTexture(t.TEXTURE_2D,F.__webglTexture,t.TEXTURE0+E)}function j(C,E){const F=i.get(C);if(C.version>0&&F.__version!==C.version){W(F,C,E);return}n.bindTexture(t.TEXTURE_2D_ARRAY,F.__webglTexture,t.TEXTURE0+E)}function J(C,E){const F=i.get(C);if(C.version>0&&F.__version!==C.version){W(F,C,E);return}n.bindTexture(t.TEXTURE_3D,F.__webglTexture,t.TEXTURE0+E)}function N(C,E){const F=i.get(C);if(C.version>0&&F.__version!==C.version){ie(F,C,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,F.__webglTexture,t.TEXTURE0+E)}const X={[qd]:t.REPEAT,[Br]:t.CLAMP_TO_EDGE,[Xd]:t.MIRRORED_REPEAT},Q={[ni]:t.NEAREST,[ZS]:t.NEAREST_MIPMAP_NEAREST,[Go]:t.NEAREST_MIPMAP_LINEAR,[ui]:t.LINEAR,[uu]:t.LINEAR_MIPMAP_NEAREST,[Hr]:t.LINEAR_MIPMAP_LINEAR},ae={[nM]:t.NEVER,[lM]:t.ALWAYS,[iM]:t.LESS,[e_]:t.LEQUAL,[rM]:t.EQUAL,[oM]:t.GEQUAL,[sM]:t.GREATER,[aM]:t.NOTEQUAL};function xe(C,E){if(E.type===Ci&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===ui||E.magFilter===uu||E.magFilter===Go||E.magFilter===Hr||E.minFilter===ui||E.minFilter===uu||E.minFilter===Go||E.minFilter===Hr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(C,t.TEXTURE_WRAP_S,X[E.wrapS]),t.texParameteri(C,t.TEXTURE_WRAP_T,X[E.wrapT]),(C===t.TEXTURE_3D||C===t.TEXTURE_2D_ARRAY)&&t.texParameteri(C,t.TEXTURE_WRAP_R,X[E.wrapR]),t.texParameteri(C,t.TEXTURE_MAG_FILTER,Q[E.magFilter]),t.texParameteri(C,t.TEXTURE_MIN_FILTER,Q[E.minFilter]),E.compareFunction&&(t.texParameteri(C,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(C,t.TEXTURE_COMPARE_FUNC,ae[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ni||E.minFilter!==Go&&E.minFilter!==Hr||E.type===Ci&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");t.texParameterf(C,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Ke(C,E){let F=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",R));const K=E.source;let ee=f.get(K);ee===void 0&&(ee={},f.set(K,ee));const $=q(E);if($!==C.__cacheKey){ee[$]===void 0&&(ee[$]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,F=!0),ee[$].usedTimes++;const Se=ee[C.__cacheKey];Se!==void 0&&(ee[C.__cacheKey].usedTimes--,Se.usedTimes===0&&T(E)),C.__cacheKey=$,C.__webglTexture=ee[$].texture}return F}function W(C,E,F){let K=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(K=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(K=t.TEXTURE_3D);const ee=Ke(C,E),$=E.source;n.bindTexture(K,C.__webglTexture,t.TEXTURE0+F);const Se=i.get($);if($.version!==Se.__version||ee===!0){n.activeTexture(t.TEXTURE0+F);const ue=Qe.getPrimaries(Qe.workingColorSpace),ge=E.colorSpace===Qi?null:Qe.getPrimaries(E.colorSpace),Xe=E.colorSpace===Qi||ue===ge?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let re=x(E.image,!1,r.maxTextureSize);re=ct(E,re);const ve=s.convert(E.format,E.colorSpace),be=s.convert(E.type);let Pe=y(E.internalFormat,ve,be,E.colorSpace,E.isVideoTexture);xe(K,E);let _e;const je=E.mipmaps,Fe=E.isVideoTexture!==!0,ot=Se.__version===void 0||ee===!0,k=$.dataReady,le=b(E,re);if(E.isDepthTexture)Pe=S(E.format===Qs,E.type),ot&&(Fe?n.texStorage2D(t.TEXTURE_2D,1,Pe,re.width,re.height):n.texImage2D(t.TEXTURE_2D,0,Pe,re.width,re.height,0,ve,be,null));else if(E.isDataTexture)if(je.length>0){Fe&&ot&&n.texStorage2D(t.TEXTURE_2D,le,Pe,je[0].width,je[0].height);for(let G=0,Z=je.length;G<Z;G++)_e=je[G],Fe?k&&n.texSubImage2D(t.TEXTURE_2D,G,0,0,_e.width,_e.height,ve,be,_e.data):n.texImage2D(t.TEXTURE_2D,G,Pe,_e.width,_e.height,0,ve,be,_e.data);E.generateMipmaps=!1}else Fe?(ot&&n.texStorage2D(t.TEXTURE_2D,le,Pe,re.width,re.height),k&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,re.width,re.height,ve,be,re.data)):n.texImage2D(t.TEXTURE_2D,0,Pe,re.width,re.height,0,ve,be,re.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Fe&&ot&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,Pe,je[0].width,je[0].height,re.depth);for(let G=0,Z=je.length;G<Z;G++)if(_e=je[G],E.format!==Qn)if(ve!==null)if(Fe){if(k)if(E.layerUpdates.size>0){const fe=Dm(_e.width,_e.height,E.format,E.type);for(const de of E.layerUpdates){const ke=_e.data.subarray(de*fe/_e.data.BYTES_PER_ELEMENT,(de+1)*fe/_e.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,G,0,0,de,_e.width,_e.height,1,ve,ke)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,G,0,0,0,_e.width,_e.height,re.depth,ve,_e.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,G,Pe,_e.width,_e.height,re.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?k&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,G,0,0,0,_e.width,_e.height,re.depth,ve,be,_e.data):n.texImage3D(t.TEXTURE_2D_ARRAY,G,Pe,_e.width,_e.height,re.depth,0,ve,be,_e.data)}else{Fe&&ot&&n.texStorage2D(t.TEXTURE_2D,le,Pe,je[0].width,je[0].height);for(let G=0,Z=je.length;G<Z;G++)_e=je[G],E.format!==Qn?ve!==null?Fe?k&&n.compressedTexSubImage2D(t.TEXTURE_2D,G,0,0,_e.width,_e.height,ve,_e.data):n.compressedTexImage2D(t.TEXTURE_2D,G,Pe,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?k&&n.texSubImage2D(t.TEXTURE_2D,G,0,0,_e.width,_e.height,ve,be,_e.data):n.texImage2D(t.TEXTURE_2D,G,Pe,_e.width,_e.height,0,ve,be,_e.data)}else if(E.isDataArrayTexture)if(Fe){if(ot&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,Pe,re.width,re.height,re.depth),k)if(E.layerUpdates.size>0){const G=Dm(re.width,re.height,E.format,E.type);for(const Z of E.layerUpdates){const fe=re.data.subarray(Z*G/re.data.BYTES_PER_ELEMENT,(Z+1)*G/re.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Z,re.width,re.height,1,ve,be,fe)}E.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ve,be,re.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Pe,re.width,re.height,re.depth,0,ve,be,re.data);else if(E.isData3DTexture)Fe?(ot&&n.texStorage3D(t.TEXTURE_3D,le,Pe,re.width,re.height,re.depth),k&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ve,be,re.data)):n.texImage3D(t.TEXTURE_3D,0,Pe,re.width,re.height,re.depth,0,ve,be,re.data);else if(E.isFramebufferTexture){if(ot)if(Fe)n.texStorage2D(t.TEXTURE_2D,le,Pe,re.width,re.height);else{let G=re.width,Z=re.height;for(let fe=0;fe<le;fe++)n.texImage2D(t.TEXTURE_2D,fe,Pe,G,Z,0,ve,be,null),G>>=1,Z>>=1}}else if(je.length>0){if(Fe&&ot){const G=we(je[0]);n.texStorage2D(t.TEXTURE_2D,le,Pe,G.width,G.height)}for(let G=0,Z=je.length;G<Z;G++)_e=je[G],Fe?k&&n.texSubImage2D(t.TEXTURE_2D,G,0,0,ve,be,_e):n.texImage2D(t.TEXTURE_2D,G,Pe,ve,be,_e);E.generateMipmaps=!1}else if(Fe){if(ot){const G=we(re);n.texStorage2D(t.TEXTURE_2D,le,Pe,G.width,G.height)}k&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ve,be,re)}else n.texImage2D(t.TEXTURE_2D,0,Pe,ve,be,re);g(E)&&u(K),Se.__version=$.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function ie(C,E,F){if(E.image.length!==6)return;const K=Ke(C,E),ee=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,C.__webglTexture,t.TEXTURE0+F);const $=i.get(ee);if(ee.version!==$.__version||K===!0){n.activeTexture(t.TEXTURE0+F);const Se=Qe.getPrimaries(Qe.workingColorSpace),ue=E.colorSpace===Qi?null:Qe.getPrimaries(E.colorSpace),ge=E.colorSpace===Qi||Se===ue?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Xe=E.isCompressedTexture||E.image[0].isCompressedTexture,re=E.image[0]&&E.image[0].isDataTexture,ve=[];for(let Z=0;Z<6;Z++)!Xe&&!re?ve[Z]=x(E.image[Z],!0,r.maxCubemapSize):ve[Z]=re?E.image[Z].image:E.image[Z],ve[Z]=ct(E,ve[Z]);const be=ve[0],Pe=s.convert(E.format,E.colorSpace),_e=s.convert(E.type),je=y(E.internalFormat,Pe,_e,E.colorSpace),Fe=E.isVideoTexture!==!0,ot=$.__version===void 0||K===!0,k=ee.dataReady;let le=b(E,be);xe(t.TEXTURE_CUBE_MAP,E);let G;if(Xe){Fe&&ot&&n.texStorage2D(t.TEXTURE_CUBE_MAP,le,je,be.width,be.height);for(let Z=0;Z<6;Z++){G=ve[Z].mipmaps;for(let fe=0;fe<G.length;fe++){const de=G[fe];E.format!==Qn?Pe!==null?Fe?k&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe,0,0,de.width,de.height,Pe,de.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe,je,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe,0,0,de.width,de.height,Pe,_e,de.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe,je,de.width,de.height,0,Pe,_e,de.data)}}}else{if(G=E.mipmaps,Fe&&ot){G.length>0&&le++;const Z=we(ve[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,le,je,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(re){Fe?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ve[Z].width,ve[Z].height,Pe,_e,ve[Z].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,je,ve[Z].width,ve[Z].height,0,Pe,_e,ve[Z].data);for(let fe=0;fe<G.length;fe++){const ke=G[fe].image[Z].image;Fe?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe+1,0,0,ke.width,ke.height,Pe,_e,ke.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe+1,je,ke.width,ke.height,0,Pe,_e,ke.data)}}else{Fe?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Pe,_e,ve[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,je,Pe,_e,ve[Z]);for(let fe=0;fe<G.length;fe++){const de=G[fe];Fe?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe+1,0,0,Pe,_e,de.image[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe+1,je,Pe,_e,de.image[Z])}}}g(E)&&u(t.TEXTURE_CUBE_MAP),$.__version=ee.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function pe(C,E,F,K,ee,$){const Se=s.convert(F.format,F.colorSpace),ue=s.convert(F.type),ge=y(F.internalFormat,Se,ue,F.colorSpace),Xe=i.get(E),re=i.get(F);if(re.__renderTarget=E,!Xe.__hasExternalTextures){const ve=Math.max(1,E.width>>$),be=Math.max(1,E.height>>$);ee===t.TEXTURE_3D||ee===t.TEXTURE_2D_ARRAY?n.texImage3D(ee,$,ge,ve,be,E.depth,0,Se,ue,null):n.texImage2D(ee,$,ge,ve,be,0,Se,ue,null)}n.bindFramebuffer(t.FRAMEBUFFER,C),We(E)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,K,ee,re.__webglTexture,0,Ge(E)):(ee===t.TEXTURE_2D||ee>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,K,ee,re.__webglTexture,$),n.bindFramebuffer(t.FRAMEBUFFER,null)}function se(C,E,F){if(t.bindRenderbuffer(t.RENDERBUFFER,C),E.depthBuffer){const K=E.depthTexture,ee=K&&K.isDepthTexture?K.type:null,$=S(E.stencilBuffer,ee),Se=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ue=Ge(E);We(E)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ue,$,E.width,E.height):F?t.renderbufferStorageMultisample(t.RENDERBUFFER,ue,$,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,$,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Se,t.RENDERBUFFER,C)}else{const K=E.textures;for(let ee=0;ee<K.length;ee++){const $=K[ee],Se=s.convert($.format,$.colorSpace),ue=s.convert($.type),ge=y($.internalFormat,Se,ue,$.colorSpace),Xe=Ge(E);F&&We(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Xe,ge,E.width,E.height):We(E)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Xe,ge,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,ge,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ce(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(E.depthTexture);K.__renderTarget=E,(!K.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),Y(E.depthTexture,0);const ee=K.__webglTexture,$=Ge(E);if(E.depthTexture.format===Os)We(E)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,$):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(E.depthTexture.format===Qs)We(E)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,$):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ne(C){const E=i.get(C),F=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const K=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),K){const ee=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,K.removeEventListener("dispose",ee)};K.addEventListener("dispose",ee),E.__depthDisposeCallback=ee}E.__boundDepthTexture=K}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ce(E.__webglFramebuffer,C)}else if(F){E.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[K]),E.__webglDepthbuffer[K]===void 0)E.__webglDepthbuffer[K]=t.createRenderbuffer(),se(E.__webglDepthbuffer[K],C,!1);else{const ee=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,$=E.__webglDepthbuffer[K];t.bindRenderbuffer(t.RENDERBUFFER,$),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,$)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=t.createRenderbuffer(),se(E.__webglDepthbuffer,C,!1);else{const K=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ee=E.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ee),t.framebufferRenderbuffer(t.FRAMEBUFFER,K,t.RENDERBUFFER,ee)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function ze(C,E,F){const K=i.get(C);E!==void 0&&pe(K.__webglFramebuffer,C,C.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),F!==void 0&&Ne(C)}function pt(C){const E=C.texture,F=i.get(C),K=i.get(E);C.addEventListener("dispose",A);const ee=C.textures,$=C.isWebGLCubeRenderTarget===!0,Se=ee.length>1;if(Se||(K.__webglTexture===void 0&&(K.__webglTexture=t.createTexture()),K.__version=E.version,a.memory.textures++),$){F.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(E.mipmaps&&E.mipmaps.length>0){F.__webglFramebuffer[ue]=[];for(let ge=0;ge<E.mipmaps.length;ge++)F.__webglFramebuffer[ue][ge]=t.createFramebuffer()}else F.__webglFramebuffer[ue]=t.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){F.__webglFramebuffer=[];for(let ue=0;ue<E.mipmaps.length;ue++)F.__webglFramebuffer[ue]=t.createFramebuffer()}else F.__webglFramebuffer=t.createFramebuffer();if(Se)for(let ue=0,ge=ee.length;ue<ge;ue++){const Xe=i.get(ee[ue]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=t.createTexture(),a.memory.textures++)}if(C.samples>0&&We(C)===!1){F.__webglMultisampledFramebuffer=t.createFramebuffer(),F.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ue=0;ue<ee.length;ue++){const ge=ee[ue];F.__webglColorRenderbuffer[ue]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,F.__webglColorRenderbuffer[ue]);const Xe=s.convert(ge.format,ge.colorSpace),re=s.convert(ge.type),ve=y(ge.internalFormat,Xe,re,ge.colorSpace,C.isXRRenderTarget===!0),be=Ge(C);t.renderbufferStorageMultisample(t.RENDERBUFFER,be,ve,C.width,C.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,F.__webglColorRenderbuffer[ue])}t.bindRenderbuffer(t.RENDERBUFFER,null),C.depthBuffer&&(F.__webglDepthRenderbuffer=t.createRenderbuffer(),se(F.__webglDepthRenderbuffer,C,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if($){n.bindTexture(t.TEXTURE_CUBE_MAP,K.__webglTexture),xe(t.TEXTURE_CUBE_MAP,E);for(let ue=0;ue<6;ue++)if(E.mipmaps&&E.mipmaps.length>0)for(let ge=0;ge<E.mipmaps.length;ge++)pe(F.__webglFramebuffer[ue][ge],C,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ge);else pe(F.__webglFramebuffer[ue],C,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);g(E)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Se){for(let ue=0,ge=ee.length;ue<ge;ue++){const Xe=ee[ue],re=i.get(Xe);n.bindTexture(t.TEXTURE_2D,re.__webglTexture),xe(t.TEXTURE_2D,Xe),pe(F.__webglFramebuffer,C,Xe,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,0),g(Xe)&&u(t.TEXTURE_2D)}n.unbindTexture()}else{let ue=t.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ue=C.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ue,K.__webglTexture),xe(ue,E),E.mipmaps&&E.mipmaps.length>0)for(let ge=0;ge<E.mipmaps.length;ge++)pe(F.__webglFramebuffer[ge],C,E,t.COLOR_ATTACHMENT0,ue,ge);else pe(F.__webglFramebuffer,C,E,t.COLOR_ATTACHMENT0,ue,0);g(E)&&u(ue),n.unbindTexture()}C.depthBuffer&&Ne(C)}function qe(C){const E=C.textures;for(let F=0,K=E.length;F<K;F++){const ee=E[F];if(g(ee)){const $=_(C),Se=i.get(ee).__webglTexture;n.bindTexture($,Se),u($),n.unbindTexture()}}}const Et=[],L=[];function Rn(C){if(C.samples>0){if(We(C)===!1){const E=C.textures,F=C.width,K=C.height;let ee=t.COLOR_BUFFER_BIT;const $=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=i.get(C),ue=E.length>1;if(ue)for(let ge=0;ge<E.length;ge++)n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ge=0;ge<E.length;ge++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ee|=t.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ee|=t.STENCIL_BUFFER_BIT)),ue){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ge]);const Xe=i.get(E[ge]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Xe,0)}t.blitFramebuffer(0,0,F,K,0,0,F,K,ee,t.NEAREST),l===!0&&(Et.length=0,L.length=0,Et.push(t.COLOR_ATTACHMENT0+ge),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Et.push($),L.push($),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,L)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Et))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ue)for(let ge=0;ge<E.length;ge++){n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ge]);const Xe=i.get(E[ge]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.TEXTURE_2D,Xe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const E=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[E])}}}function Ge(C){return Math.min(r.maxSamples,C.samples)}function We(C){const E=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ee(C){const E=a.render.frame;d.get(C)!==E&&(d.set(C,E),C.update())}function ct(C,E){const F=C.colorSpace,K=C.format,ee=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||F!==Js&&F!==Qi&&(Qe.getTransfer(F)===at?(K!==Qn||ee!==Fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),E}function we(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=V,this.setTexture2D=Y,this.setTexture2DArray=j,this.setTexture3D=J,this.setTextureCube=N,this.rebindTextures=ze,this.setupRenderTarget=pt,this.updateRenderTargetMipmap=qe,this.updateMultisampleRenderTarget=Rn,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=We}function gA(t,e){function n(i,r=Qi){let s;const a=Qe.getTransfer(r);if(i===Fi)return t.UNSIGNED_BYTE;if(i===Ph)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Ih)return t.UNSIGNED_SHORT_5_5_5_1;if(i===qv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Wv)return t.BYTE;if(i===jv)return t.SHORT;if(i===fo)return t.UNSIGNED_SHORT;if(i===Rh)return t.INT;if(i===Yr)return t.UNSIGNED_INT;if(i===Ci)return t.FLOAT;if(i===yo)return t.HALF_FLOAT;if(i===Xv)return t.ALPHA;if(i===$v)return t.RGB;if(i===Qn)return t.RGBA;if(i===Yv)return t.LUMINANCE;if(i===Kv)return t.LUMINANCE_ALPHA;if(i===Os)return t.DEPTH_COMPONENT;if(i===Qs)return t.DEPTH_STENCIL;if(i===Zv)return t.RED;if(i===Lh)return t.RED_INTEGER;if(i===Qv)return t.RG;if(i===Nh)return t.RG_INTEGER;if(i===kh)return t.RGBA_INTEGER;if(i===Ml||i===El||i===wl||i===Tl)if(a===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ml)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===El)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===wl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Tl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ml)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===El)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===wl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Tl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===$d||i===Yd||i===Kd||i===Zd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===$d)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Kd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qd||i===Jd||i===ef)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Qd||i===Jd)return a===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ef)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===tf||i===nf||i===rf||i===sf||i===af||i===of||i===lf||i===cf||i===uf||i===df||i===ff||i===hf||i===pf||i===mf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===tf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===nf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===rf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===sf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===af)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===of)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===lf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===cf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===uf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===df)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ff)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===hf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===pf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===mf)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Al||i===gf||i===vf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Al)return a===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===gf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===vf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Jv||i===_f||i===yf||i===xf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Al)return s.COMPRESSED_RED_RGTC1_EXT;if(i===_f)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===yf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===xf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const vA={type:"move"};class zu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ti,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ti,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ti,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=n.getJointPose(x,i),u=this._getHandJoint(c,x);g!==null&&(u.matrix.fromArray(g.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=g.radius),u.visible=g!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&f>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vA)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ti;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const _A=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new pn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new vr({vertexShader:_A,fragmentShader:yA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Re(new Rt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class SA extends ua{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,f=null,p=null,v=null;const x=new xA,g=n.getContextAttributes();let u=null,_=null;const y=[],S=[],b=new tt;let R=null;const A=new Kn;A.viewport=new At;const P=new Kn;P.viewport=new At;const T=[A,P],M=new VM;let I=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ie=y[W];return ie===void 0&&(ie=new zu,y[W]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(W){let ie=y[W];return ie===void 0&&(ie=new zu,y[W]=ie),ie.getGripSpace()},this.getHand=function(W){let ie=y[W];return ie===void 0&&(ie=new zu,y[W]=ie),ie.getHandSpace()};function O(W){const ie=S.indexOf(W.inputSource);if(ie===-1)return;const pe=y[ie];pe!==void 0&&(pe.update(W.inputSource,W.frame,c||a),pe.dispatchEvent({type:W.type,data:W.inputSource}))}function q(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",Y);for(let W=0;W<y.length;W++){const ie=S[W];ie!==null&&(S[W]=null,y[W].disconnect(ie))}I=null,V=null,x.reset(),e.setRenderTarget(u),p=null,f=null,h=null,r=null,_=null,Ke.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",q),r.addEventListener("inputsourceschange",Y),g.xrCompatible!==!0&&await n.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0){const ie={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ie),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Kr(p.framebufferWidth,p.framebufferHeight,{format:Qn,type:Fi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ie=null,pe=null,se=null;g.depth&&(se=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ie=g.stencil?Qs:Os,pe=g.stencil?Zs:Yr);const Ce={colorFormat:n.RGBA8,depthFormat:se,scaleFactor:s};h=new XRWebGLBinding(r,n),f=h.createProjectionLayer(Ce),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new Kr(f.textureWidth,f.textureHeight,{format:Qn,type:Fi,depthTexture:new f_(f.textureWidth,f.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ke.setContext(r),Ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Y(W){for(let ie=0;ie<W.removed.length;ie++){const pe=W.removed[ie],se=S.indexOf(pe);se>=0&&(S[se]=null,y[se].disconnect(pe))}for(let ie=0;ie<W.added.length;ie++){const pe=W.added[ie];let se=S.indexOf(pe);if(se===-1){for(let Ne=0;Ne<y.length;Ne++)if(Ne>=S.length){S.push(pe),se=Ne;break}else if(S[Ne]===null){S[Ne]=pe,se=Ne;break}if(se===-1)break}const Ce=y[se];Ce&&Ce.connect(pe)}}const j=new H,J=new H;function N(W,ie,pe){j.setFromMatrixPosition(ie.matrixWorld),J.setFromMatrixPosition(pe.matrixWorld);const se=j.distanceTo(J),Ce=ie.projectionMatrix.elements,Ne=pe.projectionMatrix.elements,ze=Ce[14]/(Ce[10]-1),pt=Ce[14]/(Ce[10]+1),qe=(Ce[9]+1)/Ce[5],Et=(Ce[9]-1)/Ce[5],L=(Ce[8]-1)/Ce[0],Rn=(Ne[8]+1)/Ne[0],Ge=ze*L,We=ze*Rn,Ee=se/(-L+Rn),ct=Ee*-L;if(ie.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ct),W.translateZ(Ee),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Ce[10]===-1)W.projectionMatrix.copy(ie.projectionMatrix),W.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const we=ze+Ee,C=pt+Ee,E=Ge-ct,F=We+(se-ct),K=qe*pt/C*we,ee=Et*pt/C*we;W.projectionMatrix.makePerspective(E,F,K,ee,we,C),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function X(W,ie){ie===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ie.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let ie=W.near,pe=W.far;x.texture!==null&&(x.depthNear>0&&(ie=x.depthNear),x.depthFar>0&&(pe=x.depthFar)),M.near=P.near=A.near=ie,M.far=P.far=A.far=pe,(I!==M.near||V!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,V=M.far),A.layers.mask=W.layers.mask|2,P.layers.mask=W.layers.mask|4,M.layers.mask=A.layers.mask|P.layers.mask;const se=W.parent,Ce=M.cameras;X(M,se);for(let Ne=0;Ne<Ce.length;Ne++)X(Ce[Ne],se);Ce.length===2?N(M,A,P):M.projectionMatrix.copy(A.projectionMatrix),Q(W,M,se)};function Q(W,ie,pe){pe===null?W.matrix.copy(ie.matrixWorld):(W.matrix.copy(pe.matrixWorld),W.matrix.invert(),W.matrix.multiply(ie.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ie.projectionMatrix),W.projectionMatrixInverse.copy(ie.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Sf*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let ae=null;function xe(W,ie){if(d=ie.getViewerPose(c||a),v=ie,d!==null){const pe=d.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let se=!1;pe.length!==M.cameras.length&&(M.cameras.length=0,se=!0);for(let Ne=0;Ne<pe.length;Ne++){const ze=pe[Ne];let pt=null;if(p!==null)pt=p.getViewport(ze);else{const Et=h.getViewSubImage(f,ze);pt=Et.viewport,Ne===0&&(e.setRenderTargetTextures(_,Et.colorTexture,f.ignoreDepthValues?void 0:Et.depthStencilTexture),e.setRenderTarget(_))}let qe=T[Ne];qe===void 0&&(qe=new Kn,qe.layers.enable(Ne),qe.viewport=new At,T[Ne]=qe),qe.matrix.fromArray(ze.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(ze.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(pt.x,pt.y,pt.width,pt.height),Ne===0&&(M.matrix.copy(qe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),se===!0&&M.cameras.push(qe)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")){const Ne=h.getDepthInformation(pe[0]);Ne&&Ne.isValid&&Ne.texture&&x.init(e,Ne,r.renderState)}}for(let pe=0;pe<y.length;pe++){const se=S[pe],Ce=y[pe];se!==null&&Ce!==void 0&&Ce.update(se,ie,c||a)}ae&&ae(W,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),v=null}const Ke=new p_;Ke.setAnimationLoop(xe),this.setAnimationLoop=function(W){ae=W},this.dispose=function(){}}}const Rr=new Oi,MA=new It;function EA(t,e){function n(g,u){g.matrixAutoUpdate===!0&&g.updateMatrix(),u.value.copy(g.matrix)}function i(g,u){u.color.getRGB(g.fogColor.value,l_(t)),u.isFog?(g.fogNear.value=u.near,g.fogFar.value=u.far):u.isFogExp2&&(g.fogDensity.value=u.density)}function r(g,u,_,y,S){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(g,u):u.isMeshToonMaterial?(s(g,u),h(g,u)):u.isMeshPhongMaterial?(s(g,u),d(g,u)):u.isMeshStandardMaterial?(s(g,u),f(g,u),u.isMeshPhysicalMaterial&&p(g,u,S)):u.isMeshMatcapMaterial?(s(g,u),v(g,u)):u.isMeshDepthMaterial?s(g,u):u.isMeshDistanceMaterial?(s(g,u),x(g,u)):u.isMeshNormalMaterial?s(g,u):u.isLineBasicMaterial?(a(g,u),u.isLineDashedMaterial&&o(g,u)):u.isPointsMaterial?l(g,u,_,y):u.isSpriteMaterial?c(g,u):u.isShadowMaterial?(g.color.value.copy(u.color),g.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(g,u){g.opacity.value=u.opacity,u.color&&g.diffuse.value.copy(u.color),u.emissive&&g.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(g.map.value=u.map,n(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.bumpMap&&(g.bumpMap.value=u.bumpMap,n(u.bumpMap,g.bumpMapTransform),g.bumpScale.value=u.bumpScale,u.side===hn&&(g.bumpScale.value*=-1)),u.normalMap&&(g.normalMap.value=u.normalMap,n(u.normalMap,g.normalMapTransform),g.normalScale.value.copy(u.normalScale),u.side===hn&&g.normalScale.value.negate()),u.displacementMap&&(g.displacementMap.value=u.displacementMap,n(u.displacementMap,g.displacementMapTransform),g.displacementScale.value=u.displacementScale,g.displacementBias.value=u.displacementBias),u.emissiveMap&&(g.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,g.emissiveMapTransform)),u.specularMap&&(g.specularMap.value=u.specularMap,n(u.specularMap,g.specularMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest);const _=e.get(u),y=_.envMap,S=_.envMapRotation;y&&(g.envMap.value=y,Rr.copy(S),Rr.x*=-1,Rr.y*=-1,Rr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Rr.y*=-1,Rr.z*=-1),g.envMapRotation.value.setFromMatrix4(MA.makeRotationFromEuler(Rr)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=u.reflectivity,g.ior.value=u.ior,g.refractionRatio.value=u.refractionRatio),u.lightMap&&(g.lightMap.value=u.lightMap,g.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,g.lightMapTransform)),u.aoMap&&(g.aoMap.value=u.aoMap,g.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,g.aoMapTransform))}function a(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,u.map&&(g.map.value=u.map,n(u.map,g.mapTransform))}function o(g,u){g.dashSize.value=u.dashSize,g.totalSize.value=u.dashSize+u.gapSize,g.scale.value=u.scale}function l(g,u,_,y){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.size.value=u.size*_,g.scale.value=y*.5,u.map&&(g.map.value=u.map,n(u.map,g.uvTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function c(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.rotation.value=u.rotation,u.map&&(g.map.value=u.map,n(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function d(g,u){g.specular.value.copy(u.specular),g.shininess.value=Math.max(u.shininess,1e-4)}function h(g,u){u.gradientMap&&(g.gradientMap.value=u.gradientMap)}function f(g,u){g.metalness.value=u.metalness,u.metalnessMap&&(g.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,g.metalnessMapTransform)),g.roughness.value=u.roughness,u.roughnessMap&&(g.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,g.roughnessMapTransform)),u.envMap&&(g.envMapIntensity.value=u.envMapIntensity)}function p(g,u,_){g.ior.value=u.ior,u.sheen>0&&(g.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),g.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(g.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,g.sheenColorMapTransform)),u.sheenRoughnessMap&&(g.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,g.sheenRoughnessMapTransform))),u.clearcoat>0&&(g.clearcoat.value=u.clearcoat,g.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(g.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,g.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(g.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===hn&&g.clearcoatNormalScale.value.negate())),u.dispersion>0&&(g.dispersion.value=u.dispersion),u.iridescence>0&&(g.iridescence.value=u.iridescence,g.iridescenceIOR.value=u.iridescenceIOR,g.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(g.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,g.iridescenceMapTransform)),u.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),u.transmission>0&&(g.transmission.value=u.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),u.transmissionMap&&(g.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,g.transmissionMapTransform)),g.thickness.value=u.thickness,u.thicknessMap&&(g.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=u.attenuationDistance,g.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(g.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(g.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=u.specularIntensity,g.specularColor.value.copy(u.specularColor),u.specularColorMap&&(g.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,g.specularColorMapTransform)),u.specularIntensityMap&&(g.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,u){u.matcap&&(g.matcap.value=u.matcap)}function x(g,u){const _=e.get(u).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function wA(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,y){const S=y.program;i.uniformBlockBinding(_,S)}function c(_,y){let S=r[_.id];S===void 0&&(v(_),S=d(_),r[_.id]=S,_.addEventListener("dispose",g));const b=y.program;i.updateUBOMapping(_,b);const R=e.render.frame;s[_.id]!==R&&(f(_),s[_.id]=R)}function d(_){const y=h();_.__bindingPointIndex=y;const S=t.createBuffer(),b=_.__size,R=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,b,R),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,y,S),S}function h(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const y=r[_.id],S=_.uniforms,b=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,y);for(let R=0,A=S.length;R<A;R++){const P=Array.isArray(S[R])?S[R]:[S[R]];for(let T=0,M=P.length;T<M;T++){const I=P[T];if(p(I,R,T,b)===!0){const V=I.__offset,O=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let Y=0;Y<O.length;Y++){const j=O[Y],J=x(j);typeof j=="number"||typeof j=="boolean"?(I.__data[0]=j,t.bufferSubData(t.UNIFORM_BUFFER,V+q,I.__data)):j.isMatrix3?(I.__data[0]=j.elements[0],I.__data[1]=j.elements[1],I.__data[2]=j.elements[2],I.__data[3]=0,I.__data[4]=j.elements[3],I.__data[5]=j.elements[4],I.__data[6]=j.elements[5],I.__data[7]=0,I.__data[8]=j.elements[6],I.__data[9]=j.elements[7],I.__data[10]=j.elements[8],I.__data[11]=0):(j.toArray(I.__data,q),q+=J.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,V,I.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,y,S,b){const R=_.value,A=y+"_"+S;if(b[A]===void 0)return typeof R=="number"||typeof R=="boolean"?b[A]=R:b[A]=R.clone(),!0;{const P=b[A];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return b[A]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function v(_){const y=_.uniforms;let S=0;const b=16;for(let A=0,P=y.length;A<P;A++){const T=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,I=T.length;M<I;M++){const V=T[M],O=Array.isArray(V.value)?V.value:[V.value];for(let q=0,Y=O.length;q<Y;q++){const j=O[q],J=x(j),N=S%b,X=N%J.boundary,Q=N+X;S+=X,Q!==0&&b-Q<J.storage&&(S+=b-Q),V.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=S,S+=J.storage}}}const R=S%b;return R>0&&(S+=b-R),_.__size=S,_.__cache={},this}function x(_){const y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function g(_){const y=_.target;y.removeEventListener("dispose",g);const S=a.indexOf(y.__bindingPointIndex);a.splice(S,1),t.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function u(){for(const _ in r)t.deleteBuffer(r[_]);a=[],r={},s={}}return{bind:l,update:c,dispose:u}}class TA{constructor(e={}){const{canvas:n=uM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const v=new Uint32Array(4),x=new Int32Array(4);let g=null,u=null;const _=[],y=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xn,this.toneMapping=dr,this.toneMappingExposure=1;const S=this;let b=!1,R=0,A=0,P=null,T=-1,M=null;const I=new At,V=new At;let O=null;const q=new He(0);let Y=0,j=n.width,J=n.height,N=1,X=null,Q=null;const ae=new At(0,0,j,J),xe=new At(0,0,j,J);let Ke=!1;const W=new d_;let ie=!1,pe=!1;const se=new It,Ce=new It,Ne=new H,ze=new At,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qe=!1;function Et(){return P===null?N:1}let L=i;function Rn(w,D){return n.getContext(w,D)}try{const w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Ch}`),n.addEventListener("webglcontextlost",Z,!1),n.addEventListener("webglcontextrestored",fe,!1),n.addEventListener("webglcontextcreationerror",de,!1),L===null){const D="webgl2";if(L=Rn(D,w),L===null)throw Rn(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ge,We,Ee,ct,we,C,E,F,K,ee,$,Se,ue,ge,Xe,re,ve,be,Pe,_e,je,Fe,ot,k;function le(){Ge=new k2(L),Ge.init(),Fe=new gA(L,Ge),We=new C2(L,Ge,e,Fe),Ee=new pA(L,Ge),We.reverseDepthBuffer&&f&&Ee.buffers.depth.setReversed(!0),ct=new F2(L),we=new tA,C=new mA(L,Ge,Ee,we,We,Fe,ct),E=new P2(S),F=new N2(S),K=new WM(L),ot=new A2(L,K),ee=new D2(L,K,ct,ot),$=new z2(L,ee,K,ct),Pe=new O2(L,We,C),re=new R2(we),Se=new eA(S,E,F,Ge,We,ot,re),ue=new EA(S,we),ge=new iA,Xe=new cA(Ge),be=new T2(S,E,F,Ee,$,p,l),ve=new fA(S,$,We),k=new wA(L,ct,We,Ee),_e=new b2(L,Ge,ct),je=new U2(L,Ge,ct),ct.programs=Se.programs,S.capabilities=We,S.extensions=Ge,S.properties=we,S.renderLists=ge,S.shadowMap=ve,S.state=Ee,S.info=ct}le();const G=new SA(S,L);this.xr=G,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const w=Ge.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ge.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(w){w!==void 0&&(N=w,this.setSize(j,J,!1))},this.getSize=function(w){return w.set(j,J)},this.setSize=function(w,D,z=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=w,J=D,n.width=Math.floor(w*N),n.height=Math.floor(D*N),z===!0&&(n.style.width=w+"px",n.style.height=D+"px"),this.setViewport(0,0,w,D)},this.getDrawingBufferSize=function(w){return w.set(j*N,J*N).floor()},this.setDrawingBufferSize=function(w,D,z){j=w,J=D,N=z,n.width=Math.floor(w*z),n.height=Math.floor(D*z),this.setViewport(0,0,w,D)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(ae)},this.setViewport=function(w,D,z,B){w.isVector4?ae.set(w.x,w.y,w.z,w.w):ae.set(w,D,z,B),Ee.viewport(I.copy(ae).multiplyScalar(N).round())},this.getScissor=function(w){return w.copy(xe)},this.setScissor=function(w,D,z,B){w.isVector4?xe.set(w.x,w.y,w.z,w.w):xe.set(w,D,z,B),Ee.scissor(V.copy(xe).multiplyScalar(N).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(w){Ee.setScissorTest(Ke=w)},this.setOpaqueSort=function(w){X=w},this.setTransparentSort=function(w){Q=w},this.getClearColor=function(w){return w.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor.apply(be,arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha.apply(be,arguments)},this.clear=function(w=!0,D=!0,z=!0){let B=0;if(w){let U=!1;if(P!==null){const ne=P.texture.format;U=ne===kh||ne===Nh||ne===Lh}if(U){const ne=P.texture.type,ce=ne===Fi||ne===Yr||ne===fo||ne===Zs||ne===Ph||ne===Ih,me=be.getClearColor(),ye=be.getClearAlpha(),Ie=me.r,Le=me.g,Te=me.b;ce?(v[0]=Ie,v[1]=Le,v[2]=Te,v[3]=ye,L.clearBufferuiv(L.COLOR,0,v)):(x[0]=Ie,x[1]=Le,x[2]=Te,x[3]=ye,L.clearBufferiv(L.COLOR,0,x))}else B|=L.COLOR_BUFFER_BIT}D&&(B|=L.DEPTH_BUFFER_BIT),z&&(B|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Z,!1),n.removeEventListener("webglcontextrestored",fe,!1),n.removeEventListener("webglcontextcreationerror",de,!1),be.dispose(),ge.dispose(),Xe.dispose(),we.dispose(),E.dispose(),F.dispose(),$.dispose(),ot.dispose(),k.dispose(),Se.dispose(),G.dispose(),G.removeEventListener("sessionstart",Vh),G.removeEventListener("sessionend",Gh),Mr.stop()};function Z(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const w=ct.autoReset,D=ve.enabled,z=ve.autoUpdate,B=ve.needsUpdate,U=ve.type;le(),ct.autoReset=w,ve.enabled=D,ve.autoUpdate=z,ve.needsUpdate=B,ve.type=U}function de(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ke(w){const D=w.target;D.removeEventListener("dispose",ke),yt(D)}function yt(w){jt(w),we.remove(w)}function jt(w){const D=we.get(w).programs;D!==void 0&&(D.forEach(function(z){Se.releaseProgram(z)}),w.isShaderMaterial&&Se.releaseShaderCache(w))}this.renderBufferDirect=function(w,D,z,B,U,ne){D===null&&(D=pt);const ce=U.isMesh&&U.matrixWorld.determinant()<0,me=z_(w,D,z,B,U);Ee.setMaterial(B,ce);let ye=z.index,Ie=1;if(B.wireframe===!0){if(ye=ee.getWireframeAttribute(z),ye===void 0)return;Ie=2}const Le=z.drawRange,Te=z.attributes.position;let $e=Le.start*Ie,Je=(Le.start+Le.count)*Ie;ne!==null&&($e=Math.max($e,ne.start*Ie),Je=Math.min(Je,(ne.start+ne.count)*Ie)),ye!==null?($e=Math.max($e,0),Je=Math.min(Je,ye.count)):Te!=null&&($e=Math.max($e,0),Je=Math.min(Je,Te.count));const bt=Je-$e;if(bt<0||bt===1/0)return;ot.setup(U,B,me,z,ye);let xt,Ze=_e;if(ye!==null&&(xt=K.get(ye),Ze=je,Ze.setIndex(xt)),U.isMesh)B.wireframe===!0?(Ee.setLineWidth(B.wireframeLinewidth*Et()),Ze.setMode(L.LINES)):Ze.setMode(L.TRIANGLES);else if(U.isLine){let Ae=B.linewidth;Ae===void 0&&(Ae=1),Ee.setLineWidth(Ae*Et()),U.isLineSegments?Ze.setMode(L.LINES):U.isLineLoop?Ze.setMode(L.LINE_LOOP):Ze.setMode(L.LINE_STRIP)}else U.isPoints?Ze.setMode(L.POINTS):U.isSprite&&Ze.setMode(L.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Ze.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))Ze.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ae=U._multiDrawStarts,Bt=U._multiDrawCounts,et=U._multiDrawCount,Vn=ye?K.get(ye).bytesPerElement:1,ts=we.get(B).currentProgram.getUniforms();for(let gn=0;gn<et;gn++)ts.setValue(L,"_gl_DrawID",gn),Ze.render(Ae[gn]/Vn,Bt[gn])}else if(U.isInstancedMesh)Ze.renderInstances($e,bt,U.count);else if(z.isInstancedBufferGeometry){const Ae=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Bt=Math.min(z.instanceCount,Ae);Ze.renderInstances($e,bt,Bt)}else Ze.render($e,bt)};function nt(w,D,z){w.transparent===!0&&w.side===wi&&w.forceSinglePass===!1?(w.side=hn,w.needsUpdate=!0,To(w,D,z),w.side=gr,w.needsUpdate=!0,To(w,D,z),w.side=wi):To(w,D,z)}this.compile=function(w,D,z=null){z===null&&(z=w),u=Xe.get(z),u.init(D),y.push(u),z.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),w!==z&&w.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),u.setupLights();const B=new Set;return w.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ne=U.material;if(ne)if(Array.isArray(ne))for(let ce=0;ce<ne.length;ce++){const me=ne[ce];nt(me,z,U),B.add(me)}else nt(ne,z,U),B.add(ne)}),y.pop(),u=null,B},this.compileAsync=function(w,D,z=null){const B=this.compile(w,D,z);return new Promise(U=>{function ne(){if(B.forEach(function(ce){we.get(ce).currentProgram.isReady()&&B.delete(ce)}),B.size===0){U(w);return}setTimeout(ne,10)}Ge.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Hn=null;function mi(w){Hn&&Hn(w)}function Vh(){Mr.stop()}function Gh(){Mr.start()}const Mr=new p_;Mr.setAnimationLoop(mi),typeof self<"u"&&Mr.setContext(self),this.setAnimationLoop=function(w){Hn=w,G.setAnimationLoop(w),w===null?Mr.stop():Mr.start()},G.addEventListener("sessionstart",Vh),G.addEventListener("sessionend",Gh),this.render=function(w,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(D),D=G.getCamera()),w.isScene===!0&&w.onBeforeRender(S,w,D,P),u=Xe.get(w,y.length),u.init(D),y.push(u),Ce.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),W.setFromProjectionMatrix(Ce),pe=this.localClippingEnabled,ie=re.init(this.clippingPlanes,pe),g=ge.get(w,_.length),g.init(),_.push(g),G.enabled===!0&&G.isPresenting===!0){const ne=S.xr.getDepthSensingMesh();ne!==null&&Nc(ne,D,-1/0,S.sortObjects)}Nc(w,D,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(X,Q),qe=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,qe&&be.addToRenderList(g,w),this.info.render.frame++,ie===!0&&re.beginShadows();const z=u.state.shadowsArray;ve.render(z,w,D),ie===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=g.opaque,U=g.transmissive;if(u.setupLights(),D.isArrayCamera){const ne=D.cameras;if(U.length>0)for(let ce=0,me=ne.length;ce<me;ce++){const ye=ne[ce];jh(B,U,w,ye)}qe&&be.render(w);for(let ce=0,me=ne.length;ce<me;ce++){const ye=ne[ce];Wh(g,w,ye,ye.viewport)}}else U.length>0&&jh(B,U,w,D),qe&&be.render(w),Wh(g,w,D);P!==null&&(C.updateMultisampleRenderTarget(P),C.updateRenderTargetMipmap(P)),w.isScene===!0&&w.onAfterRender(S,w,D),ot.resetDefaultState(),T=-1,M=null,y.pop(),y.length>0?(u=y[y.length-1],ie===!0&&re.setGlobalState(S.clippingPlanes,u.state.camera)):u=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function Nc(w,D,z,B){if(w.visible===!1)return;if(w.layers.test(D.layers)){if(w.isGroup)z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(D);else if(w.isLight)u.pushLight(w),w.castShadow&&u.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||W.intersectsSprite(w)){B&&ze.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ce);const ce=$.update(w),me=w.material;me.visible&&g.push(w,ce,me,z,ze.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||W.intersectsObject(w))){const ce=$.update(w),me=w.material;if(B&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ze.copy(w.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),ze.copy(ce.boundingSphere.center)),ze.applyMatrix4(w.matrixWorld).applyMatrix4(Ce)),Array.isArray(me)){const ye=ce.groups;for(let Ie=0,Le=ye.length;Ie<Le;Ie++){const Te=ye[Ie],$e=me[Te.materialIndex];$e&&$e.visible&&g.push(w,ce,$e,z,ze.z,Te)}}else me.visible&&g.push(w,ce,me,z,ze.z,null)}}const ne=w.children;for(let ce=0,me=ne.length;ce<me;ce++)Nc(ne[ce],D,z,B)}function Wh(w,D,z,B){const U=w.opaque,ne=w.transmissive,ce=w.transparent;u.setupLightsView(z),ie===!0&&re.setGlobalState(S.clippingPlanes,z),B&&Ee.viewport(I.copy(B)),U.length>0&&wo(U,D,z),ne.length>0&&wo(ne,D,z),ce.length>0&&wo(ce,D,z),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function jh(w,D,z,B){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[B.id]===void 0&&(u.state.transmissionRenderTarget[B.id]=new Kr(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?yo:Fi,minFilter:Hr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const ne=u.state.transmissionRenderTarget[B.id],ce=B.viewport||I;ne.setSize(ce.z,ce.w);const me=S.getRenderTarget();S.setRenderTarget(ne),S.getClearColor(q),Y=S.getClearAlpha(),Y<1&&S.setClearColor(16777215,.5),S.clear(),qe&&be.render(z);const ye=S.toneMapping;S.toneMapping=dr;const Ie=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),u.setupLightsView(B),ie===!0&&re.setGlobalState(S.clippingPlanes,B),wo(w,z,B),C.updateMultisampleRenderTarget(ne),C.updateRenderTargetMipmap(ne),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let Te=0,$e=D.length;Te<$e;Te++){const Je=D[Te],bt=Je.object,xt=Je.geometry,Ze=Je.material,Ae=Je.group;if(Ze.side===wi&&bt.layers.test(B.layers)){const Bt=Ze.side;Ze.side=hn,Ze.needsUpdate=!0,qh(bt,z,B,xt,Ze,Ae),Ze.side=Bt,Ze.needsUpdate=!0,Le=!0}}Le===!0&&(C.updateMultisampleRenderTarget(ne),C.updateRenderTargetMipmap(ne))}S.setRenderTarget(me),S.setClearColor(q,Y),Ie!==void 0&&(B.viewport=Ie),S.toneMapping=ye}function wo(w,D,z){const B=D.isScene===!0?D.overrideMaterial:null;for(let U=0,ne=w.length;U<ne;U++){const ce=w[U],me=ce.object,ye=ce.geometry,Ie=B===null?ce.material:B,Le=ce.group;me.layers.test(z.layers)&&qh(me,D,z,ye,Ie,Le)}}function qh(w,D,z,B,U,ne){w.onBeforeRender(S,D,z,B,U,ne),w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),U.onBeforeRender(S,D,z,B,w,ne),U.transparent===!0&&U.side===wi&&U.forceSinglePass===!1?(U.side=hn,U.needsUpdate=!0,S.renderBufferDirect(z,D,B,U,w,ne),U.side=gr,U.needsUpdate=!0,S.renderBufferDirect(z,D,B,U,w,ne),U.side=wi):S.renderBufferDirect(z,D,B,U,w,ne),w.onAfterRender(S,D,z,B,U,ne)}function To(w,D,z){D.isScene!==!0&&(D=pt);const B=we.get(w),U=u.state.lights,ne=u.state.shadowsArray,ce=U.state.version,me=Se.getParameters(w,U.state,ne,D,z),ye=Se.getProgramCacheKey(me);let Ie=B.programs;B.environment=w.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(w.isMeshStandardMaterial?F:E).get(w.envMap||B.environment),B.envMapRotation=B.environment!==null&&w.envMap===null?D.environmentRotation:w.envMapRotation,Ie===void 0&&(w.addEventListener("dispose",ke),Ie=new Map,B.programs=Ie);let Le=Ie.get(ye);if(Le!==void 0){if(B.currentProgram===Le&&B.lightsStateVersion===ce)return $h(w,me),Le}else me.uniforms=Se.getUniforms(w),w.onBeforeCompile(me,S),Le=Se.acquireProgram(me,ye),Ie.set(ye,Le),B.uniforms=me.uniforms;const Te=B.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Te.clippingPlanes=re.uniform),$h(w,me),B.needsLights=H_(w),B.lightsStateVersion=ce,B.needsLights&&(Te.ambientLightColor.value=U.state.ambient,Te.lightProbe.value=U.state.probe,Te.directionalLights.value=U.state.directional,Te.directionalLightShadows.value=U.state.directionalShadow,Te.spotLights.value=U.state.spot,Te.spotLightShadows.value=U.state.spotShadow,Te.rectAreaLights.value=U.state.rectArea,Te.ltc_1.value=U.state.rectAreaLTC1,Te.ltc_2.value=U.state.rectAreaLTC2,Te.pointLights.value=U.state.point,Te.pointLightShadows.value=U.state.pointShadow,Te.hemisphereLights.value=U.state.hemi,Te.directionalShadowMap.value=U.state.directionalShadowMap,Te.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Te.spotShadowMap.value=U.state.spotShadowMap,Te.spotLightMatrix.value=U.state.spotLightMatrix,Te.spotLightMap.value=U.state.spotLightMap,Te.pointShadowMap.value=U.state.pointShadowMap,Te.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=Le,B.uniformsList=null,Le}function Xh(w){if(w.uniformsList===null){const D=w.currentProgram.getUniforms();w.uniformsList=bl.seqWithValue(D.seq,w.uniforms)}return w.uniformsList}function $h(w,D){const z=we.get(w);z.outputColorSpace=D.outputColorSpace,z.batching=D.batching,z.batchingColor=D.batchingColor,z.instancing=D.instancing,z.instancingColor=D.instancingColor,z.instancingMorph=D.instancingMorph,z.skinning=D.skinning,z.morphTargets=D.morphTargets,z.morphNormals=D.morphNormals,z.morphColors=D.morphColors,z.morphTargetsCount=D.morphTargetsCount,z.numClippingPlanes=D.numClippingPlanes,z.numIntersection=D.numClipIntersection,z.vertexAlphas=D.vertexAlphas,z.vertexTangents=D.vertexTangents,z.toneMapping=D.toneMapping}function z_(w,D,z,B,U){D.isScene!==!0&&(D=pt),C.resetTextureUnits();const ne=D.fog,ce=B.isMeshStandardMaterial?D.environment:null,me=P===null?S.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Js,ye=(B.isMeshStandardMaterial?F:E).get(B.envMap||ce),Ie=B.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Le=!!z.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Te=!!z.morphAttributes.position,$e=!!z.morphAttributes.normal,Je=!!z.morphAttributes.color;let bt=dr;B.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(bt=S.toneMapping);const xt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Ze=xt!==void 0?xt.length:0,Ae=we.get(B),Bt=u.state.lights;if(ie===!0&&(pe===!0||w!==M)){const Qt=w===M&&B.id===T;re.setState(B,w,Qt)}let et=!1;B.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Bt.state.version||Ae.outputColorSpace!==me||U.isBatchedMesh&&Ae.batching===!1||!U.isBatchedMesh&&Ae.batching===!0||U.isBatchedMesh&&Ae.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ae.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ae.instancing===!1||!U.isInstancedMesh&&Ae.instancing===!0||U.isSkinnedMesh&&Ae.skinning===!1||!U.isSkinnedMesh&&Ae.skinning===!0||U.isInstancedMesh&&Ae.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ae.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ae.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ae.instancingMorph===!1&&U.morphTexture!==null||Ae.envMap!==ye||B.fog===!0&&Ae.fog!==ne||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==re.numPlanes||Ae.numIntersection!==re.numIntersection)||Ae.vertexAlphas!==Ie||Ae.vertexTangents!==Le||Ae.morphTargets!==Te||Ae.morphNormals!==$e||Ae.morphColors!==Je||Ae.toneMapping!==bt||Ae.morphTargetsCount!==Ze)&&(et=!0):(et=!0,Ae.__version=B.version);let Vn=Ae.currentProgram;et===!0&&(Vn=To(B,D,U));let ts=!1,gn=!1,fa=!1;const ft=Vn.getUniforms(),Pn=Ae.uniforms;if(Ee.useProgram(Vn.program)&&(ts=!0,gn=!0,fa=!0),B.id!==T&&(T=B.id,gn=!0),ts||M!==w){Ee.buffers.depth.getReversed()?(se.copy(w.projectionMatrix),fM(se),hM(se),ft.setValue(L,"projectionMatrix",se)):ft.setValue(L,"projectionMatrix",w.projectionMatrix),ft.setValue(L,"viewMatrix",w.matrixWorldInverse);const an=ft.map.cameraPosition;an!==void 0&&an.setValue(L,Ne.setFromMatrixPosition(w.matrixWorld)),We.logarithmicDepthBuffer&&ft.setValue(L,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ft.setValue(L,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,gn=!0,fa=!0)}if(U.isSkinnedMesh){ft.setOptional(L,U,"bindMatrix"),ft.setOptional(L,U,"bindMatrixInverse");const Qt=U.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),ft.setValue(L,"boneTexture",Qt.boneTexture,C))}U.isBatchedMesh&&(ft.setOptional(L,U,"batchingTexture"),ft.setValue(L,"batchingTexture",U._matricesTexture,C),ft.setOptional(L,U,"batchingIdTexture"),ft.setValue(L,"batchingIdTexture",U._indirectTexture,C),ft.setOptional(L,U,"batchingColorTexture"),U._colorsTexture!==null&&ft.setValue(L,"batchingColorTexture",U._colorsTexture,C));const In=z.morphAttributes;if((In.position!==void 0||In.normal!==void 0||In.color!==void 0)&&Pe.update(U,z,Vn),(gn||Ae.receiveShadow!==U.receiveShadow)&&(Ae.receiveShadow=U.receiveShadow,ft.setValue(L,"receiveShadow",U.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Pn.envMap.value=ye,Pn.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(Pn.envMapIntensity.value=D.environmentIntensity),gn&&(ft.setValue(L,"toneMappingExposure",S.toneMappingExposure),Ae.needsLights&&B_(Pn,fa),ne&&B.fog===!0&&ue.refreshFogUniforms(Pn,ne),ue.refreshMaterialUniforms(Pn,B,N,J,u.state.transmissionRenderTarget[w.id]),bl.upload(L,Xh(Ae),Pn,C)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(bl.upload(L,Xh(Ae),Pn,C),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ft.setValue(L,"center",U.center),ft.setValue(L,"modelViewMatrix",U.modelViewMatrix),ft.setValue(L,"normalMatrix",U.normalMatrix),ft.setValue(L,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Qt=B.uniformsGroups;for(let an=0,kc=Qt.length;an<kc;an++){const Er=Qt[an];k.update(Er,Vn),k.bind(Er,Vn)}}return Vn}function B_(w,D){w.ambientLightColor.needsUpdate=D,w.lightProbe.needsUpdate=D,w.directionalLights.needsUpdate=D,w.directionalLightShadows.needsUpdate=D,w.pointLights.needsUpdate=D,w.pointLightShadows.needsUpdate=D,w.spotLights.needsUpdate=D,w.spotLightShadows.needsUpdate=D,w.rectAreaLights.needsUpdate=D,w.hemisphereLights.needsUpdate=D}function H_(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(w,D,z){we.get(w.texture).__webglTexture=D,we.get(w.depthTexture).__webglTexture=z;const B=we.get(w);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=z===void 0,B.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,D){const z=we.get(w);z.__webglFramebuffer=D,z.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(w,D=0,z=0){P=w,R=D,A=z;let B=!0,U=null,ne=!1,ce=!1;if(w){const ye=we.get(w);if(ye.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(L.FRAMEBUFFER,null),B=!1;else if(ye.__webglFramebuffer===void 0)C.setupRenderTarget(w);else if(ye.__hasExternalTextures)C.rebindTextures(w,we.get(w.texture).__webglTexture,we.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Te=w.depthTexture;if(ye.__boundDepthTexture!==Te){if(Te!==null&&we.has(Te)&&(w.width!==Te.image.width||w.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(w)}}const Ie=w.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(ce=!0);const Le=we.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Le[D])?U=Le[D][z]:U=Le[D],ne=!0):w.samples>0&&C.useMultisampledRTT(w)===!1?U=we.get(w).__webglMultisampledFramebuffer:Array.isArray(Le)?U=Le[z]:U=Le,I.copy(w.viewport),V.copy(w.scissor),O=w.scissorTest}else I.copy(ae).multiplyScalar(N).floor(),V.copy(xe).multiplyScalar(N).floor(),O=Ke;if(Ee.bindFramebuffer(L.FRAMEBUFFER,U)&&B&&Ee.drawBuffers(w,U),Ee.viewport(I),Ee.scissor(V),Ee.setScissorTest(O),ne){const ye=we.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,ye.__webglTexture,z)}else if(ce){const ye=we.get(w.texture),Ie=D||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,ye.__webglTexture,z||0,Ie)}T=-1},this.readRenderTargetPixels=function(w,D,z,B,U,ne,ce){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=we.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ce!==void 0&&(me=me[ce]),me){Ee.bindFramebuffer(L.FRAMEBUFFER,me);try{const ye=w.texture,Ie=ye.format,Le=ye.type;if(!We.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!We.textureTypeReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=w.width-B&&z>=0&&z<=w.height-U&&L.readPixels(D,z,B,U,Fe.convert(Ie),Fe.convert(Le),ne)}finally{const ye=P!==null?we.get(P).__webglFramebuffer:null;Ee.bindFramebuffer(L.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(w,D,z,B,U,ne,ce){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=we.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ce!==void 0&&(me=me[ce]),me){const ye=w.texture,Ie=ye.format,Le=ye.type;if(!We.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!We.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=w.width-B&&z>=0&&z<=w.height-U){Ee.bindFramebuffer(L.FRAMEBUFFER,me);const Te=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Te),L.bufferData(L.PIXEL_PACK_BUFFER,ne.byteLength,L.STREAM_READ),L.readPixels(D,z,B,U,Fe.convert(Ie),Fe.convert(Le),0);const $e=P!==null?we.get(P).__webglFramebuffer:null;Ee.bindFramebuffer(L.FRAMEBUFFER,$e);const Je=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await dM(L,Je,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Te),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ne),L.deleteBuffer(Te),L.deleteSync(Je),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,D=null,z=0){w.isTexture!==!0&&(vs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,w=arguments[1]);const B=Math.pow(2,-z),U=Math.floor(w.image.width*B),ne=Math.floor(w.image.height*B),ce=D!==null?D.x:0,me=D!==null?D.y:0;C.setTexture2D(w,0),L.copyTexSubImage2D(L.TEXTURE_2D,z,0,0,ce,me,U,ne),Ee.unbindTexture()};const V_=L.createFramebuffer(),G_=L.createFramebuffer();this.copyTextureToTexture=function(w,D,z=null,B=null,U=0,ne=null){w.isTexture!==!0&&(vs("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,w=arguments[1],D=arguments[2],ne=arguments[3]||0,z=null),ne===null&&(U!==0?(vs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ne=U,U=0):ne=0);let ce,me,ye,Ie,Le,Te,$e,Je,bt;const xt=w.isCompressedTexture?w.mipmaps[ne]:w.image;if(z!==null)ce=z.max.x-z.min.x,me=z.max.y-z.min.y,ye=z.isBox3?z.max.z-z.min.z:1,Ie=z.min.x,Le=z.min.y,Te=z.isBox3?z.min.z:0;else{const In=Math.pow(2,-U);ce=Math.floor(xt.width*In),me=Math.floor(xt.height*In),w.isDataArrayTexture?ye=xt.depth:w.isData3DTexture?ye=Math.floor(xt.depth*In):ye=1,Ie=0,Le=0,Te=0}B!==null?($e=B.x,Je=B.y,bt=B.z):($e=0,Je=0,bt=0);const Ze=Fe.convert(D.format),Ae=Fe.convert(D.type);let Bt;D.isData3DTexture?(C.setTexture3D(D,0),Bt=L.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(C.setTexture2DArray(D,0),Bt=L.TEXTURE_2D_ARRAY):(C.setTexture2D(D,0),Bt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const et=L.getParameter(L.UNPACK_ROW_LENGTH),Vn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ts=L.getParameter(L.UNPACK_SKIP_PIXELS),gn=L.getParameter(L.UNPACK_SKIP_ROWS),fa=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,xt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,xt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ie),L.pixelStorei(L.UNPACK_SKIP_ROWS,Le),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Te);const ft=w.isDataArrayTexture||w.isData3DTexture,Pn=D.isDataArrayTexture||D.isData3DTexture;if(w.isDepthTexture){const In=we.get(w),Qt=we.get(D),an=we.get(In.__renderTarget),kc=we.get(Qt.__renderTarget);Ee.bindFramebuffer(L.READ_FRAMEBUFFER,an.__webglFramebuffer),Ee.bindFramebuffer(L.DRAW_FRAMEBUFFER,kc.__webglFramebuffer);for(let Er=0;Er<ye;Er++)ft&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,we.get(w).__webglTexture,U,Te+Er),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,we.get(D).__webglTexture,ne,bt+Er)),L.blitFramebuffer(Ie,Le,ce,me,$e,Je,ce,me,L.DEPTH_BUFFER_BIT,L.NEAREST);Ee.bindFramebuffer(L.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(U!==0||w.isRenderTargetTexture||we.has(w)){const In=we.get(w),Qt=we.get(D);Ee.bindFramebuffer(L.READ_FRAMEBUFFER,V_),Ee.bindFramebuffer(L.DRAW_FRAMEBUFFER,G_);for(let an=0;an<ye;an++)ft?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,In.__webglTexture,U,Te+an):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,In.__webglTexture,U),Pn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Qt.__webglTexture,ne,bt+an):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Qt.__webglTexture,ne),U!==0?L.blitFramebuffer(Ie,Le,ce,me,$e,Je,ce,me,L.COLOR_BUFFER_BIT,L.NEAREST):Pn?L.copyTexSubImage3D(Bt,ne,$e,Je,bt+an,Ie,Le,ce,me):L.copyTexSubImage2D(Bt,ne,$e,Je,Ie,Le,ce,me);Ee.bindFramebuffer(L.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Pn?w.isDataTexture||w.isData3DTexture?L.texSubImage3D(Bt,ne,$e,Je,bt,ce,me,ye,Ze,Ae,xt.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(Bt,ne,$e,Je,bt,ce,me,ye,Ze,xt.data):L.texSubImage3D(Bt,ne,$e,Je,bt,ce,me,ye,Ze,Ae,xt):w.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ne,$e,Je,ce,me,Ze,Ae,xt.data):w.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ne,$e,Je,xt.width,xt.height,Ze,xt.data):L.texSubImage2D(L.TEXTURE_2D,ne,$e,Je,ce,me,Ze,Ae,xt);L.pixelStorei(L.UNPACK_ROW_LENGTH,et),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Vn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ts),L.pixelStorei(L.UNPACK_SKIP_ROWS,gn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,fa),ne===0&&D.generateMipmaps&&L.generateMipmap(Bt),Ee.unbindTexture()},this.copyTextureToTexture3D=function(w,D,z=null,B=null,U=0){return w.isTexture!==!0&&(vs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,B=arguments[1]||null,w=arguments[2],D=arguments[3],U=arguments[4]||0),vs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,D,z,B,U)},this.initRenderTarget=function(w){we.get(w).__webglFramebuffer===void 0&&C.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?C.setTextureCube(w,0):w.isData3DTexture?C.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?C.setTexture2DArray(w,0):C.setTexture2D(w,0),Ee.unbindTexture()},this.resetState=function(){R=0,A=0,P=null,Ee.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=Qe._getDrawingBufferColorSpace(e),n.unpackColorSpace=Qe._getUnpackColorSpace()}}class AA{constructor(e){Lt(this,"canvas");Lt(this,"renderer");Lt(this,"scene",new FM);Lt(this,"camera",new h_(-8,8,5,-5,.1,100));Lt(this,"terrain",new Ti);Lt(this,"hero",new Ti);Lt(this,"target",new Ti);Lt(this,"effectStrips",new Ti);Lt(this,"particles",new Ti);Lt(this,"targetShadow",new Re(new wt(.95,32),new mt({color:"#020617",transparent:!0,opacity:.38})));Lt(this,"progressFill");Lt(this,"progressTrackMaterial",new mt({color:"#172033"}));Lt(this,"stageMaterial",new mt({color:"#122033"}));Lt(this,"backgroundMaterial",new mt({color:"#07111f"}));Lt(this,"animationId",0);Lt(this,"latestState",null);Lt(this,"targetKey","");Lt(this,"disposed",!1);this.canvas=e,this.renderer=new TA({canvas:e,antialias:!0,alpha:!0}),this.renderer.outputColorSpace=xn,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera.position.z=10;const n=new Re(new Rt(40,24),this.backgroundMaterial);n.position.z=-5,this.scene.add(n),this.createWorldBackdrop(),this.scene.add(this.terrain);const i=new Re(new wt(4.3,64),this.stageMaterial);i.scale.y=.45,i.position.set(0,-.8,-3),this.scene.add(i),this.createHero(),this.targetShadow.scale.y=.22,this.targetShadow.position.set(1.45,-1.12,-.4),this.scene.add(this.targetShadow),this.scene.add(this.hero),this.scene.add(this.target),this.createEffectStrips(),this.scene.add(this.effectStrips),this.createParticles(),this.scene.add(this.particles);const r=new Re(new Rt(4.2,.14),this.progressTrackMaterial);r.position.set(0,-3.35,0),this.scene.add(r),this.progressFill=new Re(new Rt(4.2,.14),new mt({color:"#38bdf8"})),this.progressFill.position.set(-2.1,-3.35,.1),this.progressFill.scale.x=.001,this.progressFill.geometry.translate(.5,0,0),this.scene.add(this.progressFill)}updateState(e){this.latestState=e}start(){const e=n=>{this.disposed||(this.animationId=window.requestAnimationFrame(e),this.resize(),this.updateVisuals(n),this.renderer.render(this.scene,this.camera))};this.animationId=window.requestAnimationFrame(e)}dispose(){this.disposed=!0,window.cancelAnimationFrame(this.animationId),this.renderer.dispose(),this.scene.traverse(e=>{var r,s,a;const n=e;(s=(r=n.geometry)==null?void 0:r.dispose)==null||s.call(r);const i=n.material;Array.isArray(i)?i.forEach(o=>o.dispose()):(a=i==null?void 0:i.dispose)==null||a.call(i)})}resize(){const e=this.canvas.clientWidth||window.innerWidth,n=this.canvas.clientHeight||window.innerHeight,i=this.renderer.getSize(new tt);if(i.x===e&&i.y===n)return;this.renderer.setSize(e,n,!1);const r=e/Math.max(1,n);this.camera.left=-6.2*r,this.camera.right=6.2*r,this.camera.top=5.1,this.camera.bottom=-5.1,this.camera.updateProjectionMatrix()}createHero(){const e=new Re(new wt(.7,32),new mt({color:"#020617",transparent:!0,opacity:.42}));e.scale.y=.18,e.position.set(0,-.84,-.2);const n=new Re(new wt(.54,5),new mt({color:"#ef4444"}));n.scale.set(.8,1.15,1),n.position.set(-.24,-.02,-.08),n.rotation.z=.36;const i=new Re(new wt(.58,32),new mt({color:"#38bdf8"}));i.scale.y=1.18;const r=new Re(new wt(.3,24),new mt({color:"#14b8a6"}));r.scale.y=.72,r.position.set(.1,.05,.12);const s=new Re(new wt(.28,32),new mt({color:"#f8fafc"}));s.position.set(0,.66,.1);const a=new Re(new Rt(.38,.08),new mt({color:"#07111f"}));a.position.set(.06,.69,.18);const o=new Re(new Rt(.16,1.3),new mt({color:"#cbd5e1"}));o.position.set(.62,.1,.1),o.rotation.z=-.35;const l=new Re(new Rt(.55,.09),new mt({color:"#facc15"}));l.position.set(.45,-.18,.15),l.rotation.z=-.35,this.hero.add(e,n,i,r,s,a,o,l),this.hero.position.set(-1.6,-.35,0)}createParticles(){for(let e=0;e<28;e+=1){const n=new Re(new Rt(.12+Math.random()*.22,.018+Math.random()*.018),new mt({color:e%3===0?"#38bdf8":e%3===1?"#facc15":"#22c55e",transparent:!0,opacity:.28}));n.position.set(-4+Math.random()*8,-2.4+Math.random()*4.4,-1),n.rotation.z=-.55+Math.random()*.35,this.particles.add(n)}}createWorldBackdrop(){const e=new Re(new Rt(26,1.1),new mt({color:"#0f2535",transparent:!0,opacity:.78}));e.position.set(0,-2.45,-4.7),this.terrain.add(e);const n=new mt({color:"#14384a",transparent:!0,opacity:.72});for(let r=0;r<9;r+=1){const s=new Re(new Wa(1.2+r%3*.35,2.7+r%2*.55,3),n.clone());s.position.set(-8.2+r*2.1,-1.75+r%2*.16,-4.2),s.rotation.z=Math.PI,s.scale.x=1.2,this.terrain.add(s)}const i=new mt({color:"#0b2f2e",transparent:!0,opacity:.82});for(let r=0;r<7;r+=1){const s=new Re(new Rt(1.8,.18),i.clone());s.position.set(-5.8+r*1.95,-2.98+Math.sin(r)*.12,-2.7),s.rotation.z=Math.sin(r*2)*.18,this.terrain.add(s)}}createEffectStrips(){for(let e=0;e<9;e+=1){const n=new Re(new Rt(.9,.045),new mt({color:"#38bdf8",transparent:!0,opacity:0}));n.position.z=.6,this.effectStrips.add(n)}}updateVisuals(e){const n=this.latestState;if(!n)return;const i=n.settings.reduceMotion?0:1,r=Math.sin(e*.004)*.05*i;this.hero.position.y=-.35+r,this.hero.rotation.z=Math.sin(e*.002)*.025*i;const s=this.getCurrentVisual(n);s.key!==this.targetKey&&this.rebuildTarget(s.key,s.definition,s.isMonster);const a=s.progress>.05?Math.sin(e*.012)*.05*s.progress*i:0;this.target.position.set(1.45,-.35+Math.sin(e*.003)*.06*i,0),this.target.scale.setScalar(1+a),this.target.rotation.z=i*(s.isMonster?Math.sin(e*.002)*.06:Math.sin(e*.0014)*.025),this.targetShadow.scale.x=1+s.progress*.22,this.targetShadow.scale.y=.2+s.progress*.05;const o=new He(s.definition.color);this.stageMaterial.color.copy(o).lerp(new He("#122033"),.6),this.backgroundMaterial.color.copy(o).lerp(new He("#07111f"),.82),this.progressTrackMaterial.color.copy(o).lerp(new He("#172033"),.78),this.progressFill.material.color.copy(o),this.progressFill.scale.x=Math.max(.001,s.progress),this.updateEffectStrips(e,s.progress,o,s.isMonster,i),this.particles.children.forEach((l,c)=>{i&&(l.position.y+=Math.sin(e*.001+c)*.0015,l.position.x+=.002+Math.cos(e*8e-4+c)*.0012,l.position.x>5.2&&(l.position.x=-5.2),l.rotation.z+=8e-4)})}updateEffectStrips(e,n,i,r,s){this.effectStrips.children.forEach((a,o)=>{const l=a,c=o/this.effectStrips.children.length*Math.PI*2+e*.0015*s,d=.75+n*.75+o%3*.08;l.position.set(1.45+Math.cos(c)*d,-.35+Math.sin(c)*d*.45,.55),l.rotation.z=c+(r?.9:.35),l.scale.x=.45+n*1.2,l.scale.y=r?1.3:1;const h=l.material;h.opacity=s&&n>.03?.12+n*(r?.34:.22):0,h.color.copy(i).lerp(new He(o%2===0?"#facc15":"#ffffff"),.2)})}getCurrentVisual(e){if(e.combat.mode!=="idle"&&e.combat.activeMonsterId){const i=pi[e.combat.activeMonsterId],r=xh(e);return{key:`monster-${i.id}`,definition:{targetName:i.name,color:i.color,shape:"field"},progress:Math.min(1,e.combat.playerProgressMs/r.attackIntervalMs),isMonster:!0}}if(e.activeView==="map"||e.map.destination||e.map.activePuzzleId){const i=e.map.destination??e.map.position,r=En(i),s=e.map.knownTiles[r]??ca(e.map.seed,i);return{key:`map-${s.key}-${s.type}`,definition:{targetName:s.name,color:s.color,shape:this.getMapTileShape(s)},progress:e.map.destination?Math.min(1,e.map.travelProgressMs/Math.max(1,e.map.travelIntervalMs)):e.map.activePuzzleId?.72:.2,isMonster:!1}}if(e.activeActionId){const i=ri[e.activeActionId];return{key:`action-${i.id}`,definition:i.visual,progress:Math.min(1,e.actionProgressMs/i.intervalMs),isMonster:!1}}const n=si[e.selectedSkill];return{key:`idle-${n.id}`,definition:{targetName:n.name,color:n.color,shape:"field"},progress:.001,isMonster:!1}}getMapTileShape(e){return e.type==="grove"?"tree":e.type==="mine"?"rock":e.type==="coast"?"water":e.type==="shrine"||e.type==="puzzle"||e.type==="ruins"?"runes":e.type==="treasure"||e.type==="npc"?"workbench":(e.type==="boss"||e.type==="encounter","field")}rebuildTarget(e,n,i){var d,h,f;for(this.targetKey=e;this.target.children.length;){const p=this.target.children.pop();if(!p)break;const v=p;(h=(d=v.geometry)==null?void 0:d.dispose)==null||h.call(d);const x=v.material;Array.isArray(x)?x.forEach(g=>g.dispose()):(f=x==null?void 0:x.dispose)==null||f.call(x)}const r=new He(n.color),s=new mt({color:r}),a=new mt({color:r.clone().lerp(new He("#ffffff"),.45)}),o=new mt({color:r.clone().lerp(new He("#020617"),.5)});if(i){const p=new Re(new wt(.7,8),s);p.scale.y=1.12;const v=new Re(new wt(.26,24),a);v.position.set(.12,.12,.1);const x=new Re(new Rt(1.55,.18),o);x.position.set(0,-.72,-.1),this.target.add(p,v,x);return}if(n.shape==="tree"){const p=new Re(new Rt(.34,1.05),o);p.position.set(0,-.35,0);const v=new Re(new wt(.82,7),s);v.position.set(0,.35,.1);const x=new Re(new wt(.42,7),a);x.position.set(.24,.55,.2),this.target.add(p,v,x);return}if(n.shape==="rock"){const p=new Re(new wt(.78,6),s);p.scale.y=.74;const v=new Re(new wt(.26,5),a);v.position.set(.25,.15,.1),this.target.add(p,v);return}if(n.shape==="water"){const p=new Re(new wt(.78,32),s);p.scale.y=.42;const v=new Re(new Rt(.72,.08),a);v.position.set(.08,.08,.1),this.target.add(p,v);return}if(n.shape==="flame"){const p=new Re(new Wa(.55,1.25,5),s);p.rotation.z=Math.PI;const v=new Re(new Wa(.32,.75,5),a);v.rotation.z=Math.PI,v.position.set(.08,-.05,.1),this.target.add(p,v);return}if(n.shape==="forge"||n.shape==="workbench"){const p=new Re(new Rt(1.35,.5),s);p.position.set(0,-.25,0);const v=new Re(new Rt(.78,.62),o);v.position.set(.08,.18,.1);const x=new Re(new wt(.18,12),a);x.position.set(.42,.48,.2),this.target.add(p,v,x);return}if(n.shape==="runes"){const p=new Re(new wt(.7,6),s),v=new Re(new wt(.28,24),a);v.position.z=.1;const x=new Re(new Rt(1.3,.18),o);x.position.set(0,-.58,-.1),this.target.add(p,v,x);return}const l=new Re(new wt(.68,16),s),c=new Re(new wt(.32,16),a);c.position.z=.1,this.target.add(l,c)}}function bA({state:t}){const e=it.useRef(null),n=it.useRef(null);return it.useEffect(()=>{if(!e.current)return;const i=new AA(e.current);return n.current=i,i.start(),()=>{i.dispose(),n.current=null}},[]),it.useEffect(()=>{var i;(i=n.current)==null||i.updateState(t)},[t]),m.jsx("canvas",{ref:e,className:"game-canvas","aria-hidden":"true"})}/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CA=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y_=(...t)=>t.filter((e,n,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var RA={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PA=it.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:r="",children:s,iconNode:a,...o},l)=>it.createElement("svg",{ref:l,...RA,width:e,height:e,stroke:t,strokeWidth:i?Number(n)*24/Number(e):n,className:y_("lucide",r),...o},[...a.map(([c,d])=>it.createElement(c,d)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=(t,e)=>{const n=it.forwardRef(({className:i,...r},s)=>it.createElement(PA,{ref:s,iconNode:e,className:y_(`lucide-${CA(t)}`,i),...r}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oh=Me("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IA=Me("Axe",[["path",{d:"m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9",key:"csbz4o"}],["path",{d:"M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z",key:"113wfo"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zh=Me("Backpack",[["path",{d:"M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",key:"1ol0lm"}],["path",{d:"M8 10h8",key:"c7uz4u"}],["path",{d:"M8 18h8",key:"1no2b1"}],["path",{d:"M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6",key:"1fr6do"}],["path",{d:"M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2",key:"donm21"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LA=Me("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bh=Me("CircleDot",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NA=Me("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jn=Me("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zr=Me("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x_=Me("CookingPot",[["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8",key:"u0tga0"}],["path",{d:"m4 8 16-4",key:"16g0ng"}],["path",{d:"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",key:"12cejc"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S_=Me("Crosshair",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kA=Me("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DA=Me("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UA=Me("Dumbbell",[["path",{d:"M14.4 14.4 9.6 9.6",key:"ic80wn"}],["path",{d:"M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z",key:"nnl7wr"}],["path",{d:"m21.5 21.5-1.4-1.4",key:"1f1ice"}],["path",{d:"M3.9 3.9 2.5 2.5",key:"1evmna"}],["path",{d:"M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z",key:"yhosts"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hh=Me("Feather",[["path",{d:"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",key:"18jl4k"}],["path",{d:"M16 8 2 22",key:"vp34q"}],["path",{d:"M17.5 15H9",key:"1oz8nu"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ag=Me("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sc=Me("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FA=Me("FlaskConical",[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",key:"18mbvz"}],["path",{d:"M6.453 15h11.094",key:"3shlmq"}],["path",{d:"M8.5 2h7",key:"csnxdl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OA=Me("Footprints",[["path",{d:"M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",key:"1dudjm"}],["path",{d:"M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",key:"l2t8xc"}],["path",{d:"M16 17h4",key:"1dejxt"}],["path",{d:"M4 13h4",key:"1bwh8b"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pc=Me("Gem",[["path",{d:"M6 3h12l4 6-10 13L2 9Z",key:"1pcd5k"}],["path",{d:"M11 3 8 9l4 13 4-13-3-6",key:"1fcu3u"}],["path",{d:"M2 9h20",key:"16fsjt"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zA=Me("Gift",[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qr=Me("Hammer",[["path",{d:"m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9",key:"eefl8a"}],["path",{d:"m18 15 4-4",key:"16gjal"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",key:"b7pghm"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M_=Me("HandCoins",[["path",{d:"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",key:"geh8rc"}],["path",{d:"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"1fto5m"}],["path",{d:"m2 16 6 6",key:"1pfhp9"}],["circle",{cx:"16",cy:"9",r:"2.9",key:"1n0dlu"}],["circle",{cx:"6",cy:"5",r:"3",key:"151irh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E_=Me("HeartPulse",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"1uw2ng"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w_=Me("KeyRound",[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T_=Me("Landmark",[["line",{x1:"3",x2:"21",y1:"22",y2:"22",key:"j8o0r"}],["line",{x1:"6",x2:"6",y1:"18",y2:"11",key:"10tf0k"}],["line",{x1:"10",x2:"10",y1:"18",y2:"11",key:"54lgf6"}],["line",{x1:"14",x2:"14",y1:"18",y2:"11",key:"380y"}],["line",{x1:"18",x2:"18",y1:"18",y2:"11",key:"1kevvc"}],["polygon",{points:"12 2 20 7 4 7",key:"jkujk7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A_=Me("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BA=Me("Mountain",[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z",key:"otkl63"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HA=Me("Orbit",[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["circle",{cx:"19",cy:"5",r:"2",key:"mhkx31"}],["circle",{cx:"5",cy:"19",r:"2",key:"v8kfzx"}],["path",{d:"M10.4 21.9a10 10 0 0 0 9.941-15.416",key:"eohfx2"}],["path",{d:"M13.5 2.1a10 10 0 0 0-9.841 15.416",key:"19pvbm"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VA=Me("PackageCheck",[["path",{d:"m16 16 2 2 4-4",key:"gfu2re"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ic=Me("Package",[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["path",{d:"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",key:"yx3hmr"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta=Me("Pickaxe",[["path",{d:"M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912",key:"we99rg"}],["path",{d:"M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393",key:"1w6hck"}],["path",{d:"M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z",key:"15hgfx"}],["path",{d:"M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319",key:"452b4h"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GA=Me("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WA=Me("RefreshCcw",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jA=Me("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qA=Me("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b_=Me("ScrollText",[["path",{d:"M15 12h-5",key:"r7krc0"}],["path",{d:"M15 8h-5",key:"1khuty"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C_=Me("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XA=Me("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fr=Me("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ac=Me("Shirt",[["path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",key:"1wgbhj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R_=Me("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na=Me("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P_=Me("Sprout",[["path",{d:"M7 20h10",key:"e6iznv"}],["path",{d:"M10 20c5.5-2.5.8-6.4 3-10",key:"161w41"}],["path",{d:"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",key:"9gtqwd"}],["path",{d:"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",key:"bkxnd2"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I_=Me("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L_=Me("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N_=Me("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Li=Me("Swords",[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5",key:"1hfsw2"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13",key:"1vrmhu"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20",key:"1bron3"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19",key:"13pww6"}],["polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5",key:"hbey2j"}],["line",{x1:"5",x2:"9",y1:"14",y2:"18",key:"1hf58s"}],["line",{x1:"7",x2:"4",y1:"17",y2:"20",key:"pidxm4"}],["line",{x1:"3",x2:"5",y1:"19",y2:"21",key:"1pehsh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k_=Me("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $A=Me("Telescope",[["path",{d:"m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44",key:"k4qptu"}],["path",{d:"m13.56 11.747 4.332-.924",key:"19l80z"}],["path",{d:"m16 21-3.105-6.21",key:"7oh9d"}],["path",{d:"M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z",key:"m7xp4m"}],["path",{d:"m6.158 8.633 1.114 4.456",key:"74o979"}],["path",{d:"m8 21 3.105-6.21",key:"1fvxut"}],["circle",{cx:"12",cy:"13",r:"2",key:"1c1ljs"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=Me("TreePine",[["path",{d:"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",key:"cpyugq"}],["path",{d:"M12 22v-3",key:"kmzjlo"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D_=Me("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YA=Me("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lc=Me("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U_=Me("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia=Me("Waves",[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KA=Me("Wind",[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]]),ZA={attack:Li,strength:UA,defence:fr,hitpoints:E_,ranged:S_,magic:na,prayer:N_,slayer:k_,woodcutting:IA,fishing:ia,mining:ta,thieving:M_,firemaking:sc,cooking:x_,smithing:Qr,fletching:Hh,crafting:Pc,runecrafting:HA,herblore:FA,farming:P_,summoning:na,astrology:$A,agility:OA,altMagic:U_,township:T_,atlas:A_},QA={normal_log:ho,oak_log:ho,charcoal:sc,raw_shrimp:ia,cooked_shrimp:Lc,raw_trout:ia,cooked_trout:x_,copper_ore:ta,tin_ore:ta,iron_ore:BA,bronze_bar:Qr,iron_bar:Qr,leather:ac,rune_essence:na,air_rune:KA,fire_rune:sc,training_sword:Li,bronze_sword:Li,iron_sword:Li,wooden_shield:fr,leather_body:ac,bronze_helm:fr,bronze_platelegs:fr,shortbow:S_,training_arrows:Hh,apprentice_wand:U_,ember_amulet:Pc,vault_key:w_,ancient_page:b_,tiny_wisp:L_},JA={all:zh,wood:ho,material:Ic,fish:ia,food:Lc,ore:ta,bar:Qr,rune:na,weapon:Li,shield:fr,armor:ac,ammo:Hh,amulet:Pc,relic:b_,pet:L_},eb={tree:ho,rock:ta,water:ia,flame:sc,forge:Qr,workbench:Pc,runes:na,field:Zr},tb={origin:Zr,plains:P_,grove:ho,mine:ta,coast:ia,ruins:T_,shrine:N_,npc:M_,puzzle:w_,treasure:Ic,encounter:Li,boss:k_,locked:fr};function F_(t){return ZA[t]??Bh}function nb(t){return QA[t]??Ic}function ib(t){return JA[t]??Ic}function rb(t){return eb[t]??Oh}function O_(t){return tb[t]??Bh}function _r({itemId:t,quantity:e,muted:n=!1}){const i=Mt[t];if(!i)return null;const r=nb(t);return m.jsxs("span",{className:`item-icon ${n?"muted":""}`,title:i.name,style:{"--item-color":i.color},children:[m.jsx(r,{size:18,strokeWidth:2.4}),typeof e=="number"&&e>1&&m.jsx("small",{children:e})]})}function ra({value:t,label:e,detail:n}){const i=Math.max(0,Math.min(1,t));return m.jsxs("div",{className:"progress-block",children:[(e||n)&&m.jsxs("div",{className:"progress-meta",children:[m.jsx("span",{children:e}),m.jsx("span",{children:n})]}),m.jsx("div",{className:"progress-track",children:m.jsx("div",{className:"progress-fill",style:{transform:`scaleX(${i})`}})})]})}function og(t){return t.quantity??t.minQuantity??1}function sb({reward:t}){var e;return t.gp?m.jsxs("span",{className:"reward-chip money-chip",children:[m.jsx(Jn,{size:15}),t.gp*og(t)," GP"]}):t.itemId?m.jsxs("span",{className:"reward-chip",children:[m.jsx(_r,{itemId:t.itemId,quantity:og(t)}),((e=Mt[t.itemId])==null?void 0:e.name)??t.itemId]}):m.jsxs("span",{className:"reward-chip",children:[m.jsx(zA,{size:15}),"Reward"]})}function ab(){const{state:t}=mn(),[e,n]=it.useState("all"),i=zr.filter(c=>t.achievements[c.id]).length,r=V1(t),s=zr.reduce((c,d)=>c+d.points,0),a=it.useMemo(()=>zr.map(c=>({achievement:c,done:!!t.achievements[c.id],progress:Iv(t,c)})),[t]),o=a.filter(({achievement:c})=>e==="all"||c.category===e).sort((c,d)=>c.done!==d.done?c.done?1:-1:d.progress.ratio-c.progress.ratio||d.achievement.points-c.achievement.points),l=a.filter(c=>!c.done).sort((c,d)=>d.progress.ratio-c.progress.ratio)[0];return m.jsxs("section",{className:"main-view achievements-view",children:[m.jsxs("div",{className:"view-header",style:{"--view-color":"#facc15"},children:[m.jsxs("div",{children:[m.jsx("span",{className:"eyebrow",children:"Milestones"}),m.jsx("h2",{children:"Goals"}),m.jsxs("p",{children:[i," / ",zr.length," completed. Score ",Fn(r,t.settings.compactNumbers)," / ",Fn(s,t.settings.compactNumbers),"."]})]}),m.jsxs("div",{className:"goal-score-stack",children:[m.jsxs("div",{className:"level-badge",children:[m.jsx("span",{children:"Score"}),m.jsx("strong",{children:r})]}),l&&m.jsxs("div",{className:"level-badge",children:[m.jsx("span",{children:"Next"}),m.jsxs("strong",{children:[Math.round(l.progress.ratio*100),"%"]})]})]})]}),m.jsx("div",{className:"goal-toolbar",children:m.jsxs("div",{className:"category-tabs","aria-label":"Goal categories",children:[m.jsx("button",{className:e==="all"?"active":"",onClick:()=>n("all"),children:"All"}),E1.map(c=>m.jsx("button",{className:e===c.id?"active":"",onClick:()=>n(c.id),children:c.label},c.id))]})}),m.jsx("div",{className:"achievement-grid",children:o.map(({achievement:c,done:d,progress:h})=>{var p;const f=d?LA:Bh;return m.jsxs("article",{className:`achievement-card ${d?"done":""} ${c.tier}`,children:[m.jsx("span",{className:"achievement-icon",children:m.jsx(D_,{size:21})}),m.jsxs("div",{className:"achievement-content",children:[m.jsxs("div",{className:"achievement-title-row",children:[m.jsx("h3",{children:c.name}),m.jsx("span",{className:`tier-pill ${c.tier}`,children:c.tier})]}),m.jsxs("div",{className:"achievement-meta",children:[m.jsx("span",{children:c.category}),m.jsxs("span",{children:[c.points," pts"]})]}),m.jsx("p",{children:c.description}),m.jsx(ra,{value:d?1:h.ratio,label:d?"Completed":"Progress",detail:h.label}),(p=c.reward)!=null&&p.length?m.jsxs("div",{className:"reward-line goal-rewards",children:[m.jsx("span",{className:"tiny-label",children:"Reward"}),c.reward.map((v,x)=>m.jsx(sb,{reward:v},`${c.id}-reward-${x}`))]}):null]}),m.jsxs("span",{className:`goal-state ${d?"done":""}`,children:[m.jsx(f,{size:15}),d?"Done":`${Math.round(h.ratio*100)}%`]})]},c.id)})})]})}function ob(){const{state:t,dispatch:e}=mn(),[n,i]=it.useState(""),[r,s]=it.useState("all"),[a,o]=it.useState(null),l=it.useMemo(()=>Object.entries(t.bank).map(([f,p])=>({item:Mt[f],itemId:f,quantity:p})).filter(f=>f.item&&f.quantity>0).sort((f,p)=>f.item.name.localeCompare(p.item.name)),[t.bank]),c=["all",...Array.from(new Set(l.map(f=>f.item.category)))],d=l.filter(f=>{const p=r==="all"||f.item.category===r,v=f.item.name.toLowerCase().includes(n.toLowerCase());return p&&v}),h=a?l.find(f=>f.itemId===a):null;return m.jsxs("section",{className:`main-view bank-view ${t.settings.denseBank?"dense-bank-view":""}`,children:[m.jsxs("div",{className:"view-header",children:[m.jsxs("div",{children:[m.jsx("span",{className:"eyebrow",children:"Inventory"}),m.jsx("h2",{children:"Bank"}),m.jsxs("p",{children:[_h(t)," / ",t.bankSlots," slots used. Items feed skills, crafting, gear and combat loops."]})]}),m.jsxs("div",{className:"bank-value-pill stat-chip money-chip",children:[m.jsx(Jn,{size:16}),Fn(t.gp,t.settings.compactNumbers)," GP"]})]}),m.jsxs("div",{className:"bank-toolbar",children:[m.jsxs("label",{className:"search-field",children:[m.jsx(C_,{size:18}),m.jsx("input",{value:n,onChange:f=>i(f.target.value),placeholder:"Search bank"})]}),m.jsx("div",{className:"category-tabs",children:c.map(f=>{const p=ib(f);return m.jsxs("button",{className:r===f?"active":"",onClick:()=>s(f),children:[m.jsx(p,{size:15}),f]},f)})})]}),m.jsxs("div",{className:"bank-content",children:[m.jsxs("div",{className:"bank-grid",children:[d.map(f=>m.jsxs("button",{className:`bank-slot ${a===f.itemId?"active":""}`,onClick:()=>o(f.itemId),title:f.item.name,children:[m.jsx(_r,{itemId:f.itemId,quantity:f.quantity}),m.jsx("span",{children:f.item.name})]},f.itemId)),!d.length&&m.jsx("div",{className:"empty-state compact",children:m.jsx("h3",{children:"No items found"})})]}),m.jsx("aside",{className:"item-detail-panel",children:h!=null&&h.item?m.jsxs(m.Fragment,{children:[m.jsx(_r,{itemId:h.itemId,quantity:h.quantity}),m.jsx("h3",{children:h.item.name}),m.jsx("span",{className:`rarity-pill ${h.item.rarity}`,children:h.item.rarity}),m.jsx("p",{children:h.item.description}),m.jsxs("div",{className:"stat-grid",children:[m.jsx("span",{children:"Quantity"}),m.jsx("strong",{children:Fn(h.quantity,t.settings.compactNumbers)}),m.jsx("span",{children:"Sell each"}),m.jsxs("strong",{className:"inline-icon-value",children:[m.jsx(Jn,{size:14}),h.item.sellValue," GP"]}),m.jsx("span",{children:"Type"}),m.jsx("strong",{children:h.item.type})]}),h.item.equipment&&m.jsxs("button",{className:"primary-button",onClick:()=>e({type:"equipItem",itemId:h.itemId}),children:[m.jsx(fr,{size:16}),"Equip"]}),h.item.healAmount&&m.jsxs("button",{className:"secondary-button",onClick:()=>e({type:"useFood",itemId:h.itemId}),children:[m.jsx(Lc,{size:16}),"Eat"]}),h.item.sellValue>0&&m.jsxs("div",{className:"split-actions",children:[m.jsxs("button",{className:"secondary-button",onClick:()=>e({type:"sellItem",itemId:h.itemId,quantity:1}),children:[m.jsx(Jn,{size:16}),"Sell 1"]}),m.jsxs("button",{className:"secondary-button",onClick:()=>e({type:"sellItem",itemId:h.itemId,quantity:h.quantity}),children:[m.jsx(Jn,{size:16}),"Sell all"]})]})]}):m.jsxs("div",{className:"empty-state compact",children:[m.jsx("h3",{children:"No item selected"}),m.jsx("p",{children:"Select an item to inspect, equip, use or sell."})]})})]})]})}function lb({reward:t}){var e;return t.gp?m.jsxs("span",{className:"reward-chip money-chip",children:[m.jsx(Jn,{size:15}),t.gp," GP"]}):t.itemId?m.jsxs("span",{className:"reward-chip",children:[m.jsx(_r,{itemId:t.itemId,quantity:t.quantity??t.minQuantity??1}),((e=Mt[t.itemId])==null?void 0:e.name)??t.itemId]}):null}function cb({tile:t}){const e=O_(t.type);return m.jsxs("span",{className:"tile-type-badge",style:{"--tile-color":t.color},children:[m.jsx(e,{size:15}),Sh[t.type].label]})}function ub(){const{state:t,dispatch:e}=mn(),n=t.combat.activeMonsterId?pi[t.combat.activeMonsterId]:null,i=xh(t),r=Bn(t),s=Object.entries(t.bank).filter(([a,o])=>{var l;return o>0&&!!((l=Mt[a])!=null&&l.healAmount)});return n?m.jsxs("article",{className:"map-encounter-panel",style:{"--tile-color":n.color},children:[m.jsxs("div",{className:"panel-title-row",children:[m.jsx(Li,{size:18}),m.jsx("h3",{children:n.name})]}),m.jsxs("p",{children:[n.zone," threat level ",n.level,". Defeat it to secure this tile."]}),m.jsx(ra,{value:t.combat.monsterHp/n.maxHp,label:"Enemy HP",detail:`${Math.max(0,Math.ceil(t.combat.monsterHp))} / ${n.maxHp}`}),m.jsx(ra,{value:t.combat.playerProgressMs/i.attackIntervalMs,label:"Hero attack",detail:`${(i.attackIntervalMs/1e3).toFixed(1)}s`}),m.jsxs("div",{className:"map-combat-stats",children:[m.jsxs("span",{className:"inline-icon-value",children:[m.jsx(E_,{size:15}),"HP ",Math.max(0,Math.ceil(t.combat.playerHp))," / ",r]}),m.jsxs("span",{children:["Max hit ",i.maxHit]}),m.jsxs("span",{children:["Accuracy ",i.accuracy]})]}),m.jsx("div",{className:"combat-hit-line",children:t.combat.lastHit?t.combat.lastHit.missed?`${t.combat.lastHit.source} missed`:`${t.combat.lastHit.source} hit ${t.combat.lastHit.amount}${t.combat.lastHit.critical?" critical":""}`:"Waiting for first strike"}),m.jsx("div",{className:"food-strip",children:s.length?s.map(([a,o])=>{var l;return m.jsx("button",{className:"food-button",onClick:()=>e({type:"useFood",itemId:a}),title:`Eat ${(l=Mt[a])==null?void 0:l.name}`,children:m.jsx(_r,{itemId:a,quantity:o})},a)}):m.jsx("span",{className:"tiny-label",children:"No food in bank"})}),m.jsxs("button",{className:"secondary-button",onClick:()=>e({type:"stopCombat"}),children:[m.jsx(I_,{size:16}),"Flee encounter"]})]}):null}function db(){var y,S;const{state:t,dispatch:e}=mn(),n=En(t.map.position),i=t.map.destination?En(t.map.destination):null,r=t.map.selectedTileKey??n,s=Ec(r),a=t.map.knownTiles[r]??lu(t.map,s),o=!!t.map.revealed[r],l=a.key===n,c=Nd(t.map.position,a.coord),d=!!t.map.completed[a.key],h=a.puzzleId?Mh[a.puzzleId]:null,f=l&&!d&&h?h:null,p=lu(t.map,t.map.position),v=t.map.destination?t.map.travelProgressMs/Math.max(1,t.map.travelIntervalMs):0,x=C1(t.map.bounds),g=t.map.runStatus!=="active",u=it.useMemo(()=>Eh(t.map.bounds).map(b=>{const R=En(b);return{coord:b,key:R,tile:t.map.knownTiles[R]??lu(t.map,b),revealed:!!t.map.revealed[R],completed:!!t.map.completed[R],current:Tc(b,t.map.position),destination:i===R,selected:r===R,adjacent:Nd(t.map.position,b)}}),[i,r,t.map]),_=(b,R,A,P)=>{if(!R){e({type:"selectMapTile",x:b.coord.x,y:b.coord.y});return}if(A&&!P&&!t.map.destination&&t.combat.mode==="idle"&&t.map.runStatus==="active"){e({type:"startMapTravel",x:b.coord.x,y:b.coord.y});return}e({type:"selectMapTile",x:b.coord.x,y:b.coord.y})};return m.jsxs("section",{className:`main-view map-view ${t.settings.showMapLabels?"":"hide-map-labels"}`,children:[m.jsxs("div",{className:"view-header",style:{"--view-color":p.color},children:[m.jsxs("div",{className:"view-title-block",children:[m.jsx("span",{className:"view-icon",children:m.jsx(A_,{size:24,strokeWidth:2.35})}),m.jsxs("span",{className:"eyebrow",children:["Run ",t.map.runId," · seed ",t.map.seed," · ",t.map.runStatus]}),m.jsx("h2",{children:p.name}),m.jsx("p",{children:"Navigate the fog one step at a time. Secrets, puzzles, NPCs and fights are discovered by travelling through the grid."})]}),m.jsxs("div",{className:"map-header-actions",children:[m.jsxs("div",{className:"level-badge map-coordinate-badge",children:[m.jsx("span",{children:"Position"}),m.jsxs("strong",{children:[t.map.position.x,",",t.map.position.y]})]}),g?m.jsxs("button",{className:"secondary-button map-run-button",onClick:()=>e({type:"startNewMapRun"}),children:[m.jsx(WA,{size:15}),"New Run"]}):m.jsxs("button",{className:"secondary-button map-run-button",disabled:t.combat.mode!=="idle",onClick:()=>e({type:"retireMapRun"}),children:[m.jsx(ag,{size:15}),"Retire"]})]})]}),m.jsxs("div",{className:"map-status-strip",children:[m.jsxs("div",{className:"map-status-card",children:[m.jsxs("span",{className:"inline-icon-value",children:[m.jsx(ag,{size:16}),"Run"]}),m.jsx("strong",{children:t.map.runStatus})]}),m.jsxs("div",{className:"map-status-card",children:[m.jsx("span",{children:"Discovered"}),m.jsx("strong",{children:Object.keys(t.map.revealed).length})]}),m.jsxs("div",{className:"map-status-card",children:[m.jsx("span",{children:"Secrets"}),m.jsx("strong",{children:t.map.secretsFound})]}),m.jsx("div",{className:"map-status-card wide",children:m.jsx(ra,{value:v,label:t.map.destination?"Travelling":"Ready",detail:t.map.destination?`${Math.round(v*100)}%`:"Choose an adjacent tile"})})]}),m.jsxs("div",{className:"map-layout",children:[m.jsx("div",{className:"adventure-grid",style:{"--map-columns":x.columns,"--map-rows":x.rows},children:u.map(({tile:b,key:R,revealed:A,completed:P,current:T,destination:M,selected:I,adjacent:V})=>{const O=O_(b.type);return m.jsxs("button",{className:`map-tile ${A?"revealed":"hidden"} ${T?"current":""} ${M?"destination":""} ${I?"selected":""} ${P?"completed":""} ${V?"adjacent":""} ${b.type}`,style:{"--tile-color":b.color},onClick:()=>_(b,A,V,T),title:A?b.name:"Uncharted fog",children:[A?m.jsx(O,{size:18}):m.jsx("span",{className:"fog-dot"}),t.settings.showMapLabels&&m.jsx("span",{children:A?Sh[b.type].label:"?"}),b.secret&&A&&!P&&m.jsx("small",{children:"?"})]},R)})}),m.jsxs("div",{className:"map-side-stack",children:[m.jsx("aside",{className:"map-detail-panel",children:o?m.jsxs(m.Fragment,{children:[m.jsxs("div",{className:"map-detail-head",children:[m.jsx(cb,{tile:a}),m.jsxs("span",{children:[a.coord.x,",",a.coord.y]})]}),m.jsx("h3",{children:a.name}),m.jsx("p",{children:a.description}),m.jsxs("div",{className:"stat-grid",children:[m.jsx("span",{children:"Danger"}),m.jsx("strong",{children:a.danger}),m.jsx("span",{children:"Travel"}),m.jsxs("strong",{children:[(a.travelTimeMs/1e3).toFixed(1),"s"]}),m.jsx("span",{children:"Status"}),m.jsx("strong",{children:d?"Completed":l?"Here":c?"Adjacent":"Distant"})]}),a.monsterId&&m.jsxs("p",{className:"map-hint",children:[m.jsx(fr,{size:15})," Encounter: ",(y=pi[a.monsterId])==null?void 0:y.name]}),(S=a.rewards)!=null&&S.length?m.jsx("div",{className:"reward-line",children:a.rewards.map((b,R)=>m.jsx(lb,{reward:b},`${a.key}-${R}`))}):null,!l&&c&&m.jsxs("button",{className:"primary-button",disabled:!!t.map.destination||t.combat.mode!=="idle",onClick:()=>e({type:"startMapTravel",x:a.coord.x,y:a.coord.y}),children:[m.jsx(Zr,{size:16}),"Travel"]}),l&&!d&&a.type!=="encounter"&&a.type!=="boss"&&a.type!=="puzzle"&&m.jsxs("button",{className:"primary-button",onClick:()=>e({type:"resolveMapTile",tileKey:a.key}),children:[m.jsx(C_,{size:16}),"Search"]}),l&&!d&&(a.type==="encounter"||a.type==="boss")&&t.combat.mode==="idle"&&m.jsxs("button",{className:"primary-button",onClick:()=>e({type:"resolveMapTile",tileKey:a.key}),children:[m.jsx(Li,{size:16}),"Engage"]}),f&&m.jsxs("div",{className:"puzzle-panel",children:[m.jsx("h4",{children:f.title}),m.jsx("p",{children:f.prompt}),m.jsx("div",{className:"puzzle-choice-grid",children:f.choices.map(b=>m.jsx("button",{className:"secondary-button",onClick:()=>e({type:"solveMapPuzzle",tileKey:a.key,choiceId:b.id}),children:b.label},b.id))})]})]}):m.jsxs("div",{className:"empty-state compact",children:[m.jsx("h3",{children:"Uncharted fog"}),m.jsx("p",{children:"Move closer to reveal this tile."})]})}),m.jsxs("div",{className:"map-lower-panels",children:[m.jsx(ub,{}),m.jsxs("article",{className:"map-log-panel",children:[m.jsxs("div",{className:"panel-title-row",children:[m.jsx(Lc,{size:18}),m.jsx("h3",{children:"Expedition log"})]}),(t.map.mapLog.length?t.map.mapLog:t.activityLog).slice(0,4).map(b=>m.jsxs("div",{className:`log-entry ${b.tone}`,children:[t.settings.showLogTimestamps&&m.jsx("span",{children:new Date(b.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),m.jsx("p",{children:b.message})]},b.id))]})]})]})]})]})}function fb(){const{state:t,dispatch:e}=mn(),n=t.offlineSummary;if(!n)return null;const i=Math.floor(n.secondsAway/60),r=n.secondsAway%60;return m.jsx("div",{className:"modal-backdrop",role:"presentation",children:m.jsxs("section",{className:"modal-panel",role:"dialog","aria-modal":"true","aria-labelledby":"offline-title",children:[m.jsxs("div",{className:"modal-title-row",children:[m.jsx(NA,{size:22}),m.jsx("h2",{id:"offline-title",children:"Offline gains"})]}),m.jsxs("p",{className:"muted-copy",children:["Away for ",i,"m ",r,"s",n.capped?" (24h cap applied)":"","."]}),n.actionName?m.jsxs("div",{className:"offline-grid",children:[m.jsx("span",{children:"Action"}),m.jsx("strong",{children:n.actionName}),m.jsx("span",{children:"Completions"}),m.jsx("strong",{children:Fn(n.completions,t.settings.compactNumbers)}),Object.entries(n.xp).map(([s,a])=>m.jsxs("span",{children:[si[s].name," XP"]},s)),Object.entries(n.xp).map(([s,a])=>m.jsx("strong",{children:Fn(a??0,t.settings.compactNumbers)},`${s}-xp`)),n.rewards.map(s=>m.jsx("span",{children:s.label},s.label)),n.rewards.map(s=>m.jsx("strong",{children:Fn(s.quantity,t.settings.compactNumbers)},`${s.label}-qty`))]}):m.jsx("p",{children:"No active action was running."}),m.jsx("button",{className:"primary-button",onClick:()=>e({type:"dismissOffline"}),children:"OK"})]})})}function hb(){const{state:t,dispatch:e}=mn(),n=t.activeActionId?ri[t.activeActionId]:null,i=si[t.selectedSkill],r=yh(t),s=Object.values(t.pets).filter(Boolean).length,a=t.map.activeTileKey?t.map.knownTiles[t.map.activeTileKey]:null,o=t.map.selectedTileKey?t.map.knownTiles[t.map.selectedTileKey]:null;return m.jsxs("aside",{className:"right-panel",children:[m.jsxs("section",{className:"side-card",children:[m.jsxs("div",{className:"panel-title-row",children:[m.jsx(na,{size:18}),m.jsx("h2",{children:"Focus"})]}),n?m.jsxs("div",{className:"focus-block",children:[m.jsx("strong",{children:n.name}),m.jsxs("span",{children:[si[n.skillId].name," level ",Vt(t,n.skillId)]}),m.jsx("span",{children:n.area})]}):t.combat.mode!=="idle"?m.jsxs("div",{className:"focus-block",children:[m.jsx("strong",{children:"Map encounter"}),m.jsx("span",{children:(a==null?void 0:a.name)??"Threat active"}),m.jsxs("span",{children:["HP ",Math.ceil(t.combat.playerHp)," / ",Bn(t)]})]}):t.map.destination?m.jsxs("div",{className:"focus-block",children:[m.jsx("strong",{children:"Travelling"}),m.jsxs("span",{children:["From ",t.map.position.x,",",t.map.position.y," to ",t.map.destination.x,",",t.map.destination.y]}),m.jsxs("span",{children:[Math.round(t.map.travelProgressMs/Math.max(1,t.map.travelIntervalMs)*100),"% complete"]})]}):t.activeView==="map"?m.jsxs("div",{className:"focus-block",children:[m.jsx("strong",{children:(o==null?void 0:o.name)??(a==null?void 0:a.name)??"Exploration map"}),m.jsxs("span",{children:["Position ",t.map.position.x,",",t.map.position.y]}),m.jsxs("span",{children:[Object.keys(t.map.revealed).length," tiles discovered"]})]}):m.jsxs("div",{className:"focus-block",children:[m.jsx("strong",{children:i.name}),m.jsx("span",{children:"Ready for a new action"}),m.jsx("span",{children:i.category})]})]}),m.jsxs("section",{className:"side-card",children:[m.jsxs("div",{className:"panel-title-row",children:[m.jsx(ac,{size:18}),m.jsx("h2",{children:"Equipment"})]}),m.jsx("div",{className:"equipment-grid",children:Sv.map(l=>{var d;const c=t.equipment[l.id];return m.jsxs("button",{className:"equipment-slot",onClick:()=>e({type:"unequipItem",slot:l.id}),title:c?`Unequip ${(d=Mt[c])==null?void 0:d.name}`:l.label,children:[m.jsx("span",{children:l.label}),c?m.jsx(_r,{itemId:c}):m.jsx("strong",{children:"Empty"})]},l.id)})}),m.jsxs("div",{className:"stat-grid compact-stats",children:[m.jsx("span",{children:"Attack"}),m.jsx("strong",{children:r.attack}),m.jsx("span",{children:"Strength"}),m.jsx("strong",{children:r.strength}),m.jsx("span",{children:"Defence"}),m.jsx("strong",{children:r.defence}),m.jsx("span",{children:"Ranged"}),m.jsx("strong",{children:r.ranged}),m.jsx("span",{children:"Magic"}),m.jsx("strong",{children:r.magic}),m.jsx("span",{children:"Max hit"}),m.jsx("strong",{children:r.maxHit})]})]}),m.jsxs("section",{className:"side-card",children:[m.jsxs("div",{className:"panel-title-row",children:[m.jsx(VA,{size:18}),m.jsx("h2",{children:"Collections"})]}),m.jsxs("div",{className:"collection-row",children:[m.jsx("span",{children:"Pets"}),m.jsx("strong",{children:s}),m.jsxs("span",{className:"inline-icon-value",children:[m.jsx(Zr,{size:14}),"Discovered"]}),m.jsx("strong",{children:Object.keys(t.map.revealed).length}),m.jsx("span",{children:"Bosses defeated"}),m.jsx("strong",{children:t.map.bossesDefeated}),m.jsx("span",{children:"Secrets found"}),m.jsx("strong",{children:t.map.secretsFound}),m.jsx("span",{children:"Achievements"}),m.jsx("strong",{children:Object.values(t.achievements).filter(Boolean).length}),m.jsx("span",{children:"Total GP"}),m.jsxs("strong",{className:"inline-icon-value",children:[m.jsx(Jn,{size:14}),Fn(t.gp,t.settings.compactNumbers)]})]})]}),m.jsxs("section",{className:"side-card log-card",children:[m.jsxs("div",{className:"panel-title-row",children:[m.jsx(Oh,{size:18}),m.jsx("h2",{children:"Log"})]}),m.jsx("div",{className:"activity-log",children:t.activityLog.slice(0,10).map(l=>m.jsxs("div",{className:`log-entry ${l.tone}`,children:[t.settings.showLogTimestamps&&m.jsx("span",{children:new Date(l.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),m.jsx("p",{children:l.message})]},l.id))})]})]})}const pb=[{title:"Display",eyebrow:"Interface",options:[{key:"compactNumbers",label:"Compact numbers",description:"Shortens large quantities in the UI."},{key:"highContrastMode",label:"High contrast mode",description:"Boosts borders and panels for better readability."},{key:"denseBank",label:"Dense bank grid",description:"Fits more item slots into the bank at once."},{key:"showMapLabels",label:"Map tile labels",description:"Shows type labels inside the exploration grid."},{key:"showLogTimestamps",label:"Log timestamps",description:"Shows times next to activity and expedition log entries."}]},{title:"Comfort",eyebrow:"Gameplay feel",options:[{key:"reduceMotion",label:"Reduce motion",description:"Calms panel animations and background scene movement."},{key:"showBackgroundScene",label:"Animated background scene",description:"Renders the 3D hero backdrop behind the interface."},{key:"hideLockedSkills",label:"Hide locked skills",description:"Keeps the sidebar focused on playable skills."},{key:"confirmReset",label:"Confirm reset",description:"Asks before wiping the current local save."}]}];function mb(){const{state:t,dispatch:e}=mn();return m.jsxs("section",{className:"main-view settings-view",children:[m.jsx("div",{className:"view-header",children:m.jsxs("div",{children:[m.jsx("span",{className:"eyebrow",children:"Preferences"}),m.jsx("h2",{children:"Settings"}),m.jsx("p",{children:"Local options for the prototype."})]})}),m.jsx("div",{className:"settings-list",children:pb.map(n=>m.jsxs("section",{className:"settings-section",children:[m.jsxs("div",{className:"settings-section-header",children:[m.jsx("span",{className:"eyebrow",children:n.eyebrow}),m.jsx("h3",{children:n.title})]}),m.jsx("div",{className:"settings-grid",children:n.options.map(i=>m.jsxs("label",{className:"setting-row",children:[m.jsxs("span",{className:"setting-copy",children:[m.jsx("strong",{children:i.label}),m.jsx("small",{children:i.description})]}),m.jsx("input",{type:"checkbox",checked:t.settings[i.key],onChange:()=>e({type:"toggleSetting",key:i.key}),"aria-label":i.label})]},i.key))})]},n.title))})]})}function gb(){const{state:t,dispatch:e}=mn();return m.jsxs("section",{className:"main-view shop-view",children:[m.jsxs("div",{className:"view-header",children:[m.jsxs("div",{children:[m.jsx("span",{className:"eyebrow",children:"Town services"}),m.jsx("h2",{children:"Shop"}),m.jsx("p",{children:"Spend GP on permanent account upgrades."})]}),m.jsxs("div",{className:"bank-value-pill stat-chip money-chip",children:[m.jsx(Jn,{size:16}),Fn(t.gp,t.settings.compactNumbers)," GP"]})]}),m.jsx("div",{className:"shop-grid",children:Mv.map(n=>{const i=t.shopPurchases[n.id]??0,r=i>=n.maxPurchases;return m.jsxs("article",{className:"shop-card",children:[m.jsx("div",{className:"shop-icon",children:m.jsx(R_,{size:24})}),m.jsx("h3",{children:n.name}),m.jsx("p",{children:n.description}),m.jsxs("div",{className:"stat-grid",children:[m.jsx("span",{children:"Cost"}),m.jsxs("strong",{className:"inline-icon-value",children:[m.jsx(Jn,{size:14}),n.cost," GP"]}),m.jsx("span",{children:"Owned"}),m.jsxs("strong",{children:[i," / ",n.maxPurchases]}),m.jsx("span",{children:"Effect"}),m.jsx("strong",{children:n.effectLabel})]}),m.jsx("button",{className:"primary-button",disabled:r||t.gp<n.cost,onClick:()=>e({type:"buyUpgrade",upgradeId:n.id}),children:r?"Maxed":"Buy"})]},n.id)})})]})}const vb=[{view:"skills",label:"Skills",icon:Qr},{view:"map",label:"Map",icon:Zr},{view:"bank",label:"Bank",icon:zh},{view:"shop",label:"Shop",icon:R_},{view:"achievements",label:"Goals",icon:D_},{view:"settings",label:"Settings",icon:XA}];function _b(){const{state:t,dispatch:e}=mn();return m.jsxs("aside",{className:"sidebar",children:[m.jsx("nav",{className:"view-nav","aria-label":"Main views",children:vb.map(n=>{const i=n.icon;return m.jsxs("button",{className:t.activeView===n.view?"active":"",onClick:()=>e({type:"selectView",view:n.view}),title:n.label,children:[m.jsx(i,{size:18}),m.jsx("span",{children:n.label})]},n.view)})}),m.jsx("div",{className:"skill-scroll",children:M1.map(n=>{const i=vh.filter(r=>{var a;const s=r.implemented&&((a=t.skills[r.id])==null?void 0:a.unlocked);return r.category===n.id&&(!t.settings.hideLockedSkills||s)});return i.length?m.jsxs("section",{className:"skill-group",children:[m.jsx("h2",{children:n.label}),i.map(r=>{var d;const s=F_(r.id),a=Vt(t,r.id),o=Ev(t,r.id),l=t.selectedSkill===r.id&&t.activeView==="skills",c=t.activeActionId?((d=ri[t.activeActionId])==null?void 0:d.skillId)===r.id:!1;return m.jsxs("button",{className:`skill-nav-item ${l?"active":""} ${r.implemented?"":"locked"}`,onClick:()=>e({type:"selectSkill",skillId:r.id}),style:{"--skill-color":r.color},title:r.lockedNote??r.description,children:[m.jsx("span",{className:"skill-icon-wrap",children:m.jsx(s,{size:17,strokeWidth:2.35})}),m.jsx("span",{className:"skill-label",children:r.name}),m.jsx("span",{className:"skill-level",children:r.implemented?a:"Soon"}),m.jsx("span",{className:"skill-mini-track",children:m.jsx("span",{style:{transform:`scaleX(${r.implemented?o:0})`}})}),c&&m.jsx("span",{className:"running-pip"})]},r.id)})]},n.id):null})})]})}function yb(t){return t.quantity??t.minQuantity??1}function xb({reward:t}){var e;return t.gp?m.jsxs("span",{className:"reward-chip money-chip",children:[m.jsx(Jn,{size:15}),t.gp," GP"]}):t.itemId?m.jsxs("span",{className:"reward-chip",children:[m.jsx(_r,{itemId:t.itemId,quantity:yb(t)}),((e=Mt[t.itemId])==null?void 0:e.name)??t.itemId]}):m.jsx("span",{className:"reward-chip",children:"Reward"})}function Sb({action:t}){var x,g;const{state:e,dispatch:n}=mn(),i=Vt(e,t.skillId),r=e.activeActionId===t.id,s=e.activeActionId?ri[e.activeActionId]:null,a=s?(x=si[s.skillId])==null?void 0:x.name:null,o=!!(s&&s.skillId!==t.skillId),l=e.combat.mode!=="idle",c=i<t.levelRequired,d=!c&&!l,h=r?e.actionProgressMs/t.intervalMs:0,f=rb(t.visual.shape),p=c?`Level ${t.levelRequired}`:l?"Combat active":o?"Switch":"Start",v=l?"Stop combat first":o&&a?`Stops ${a}`:void 0;return m.jsxs("article",{className:`action-card ${r?"active":""}`,style:{"--card-color":t.visual.color},children:[m.jsxs("div",{className:"action-card-head",children:[m.jsx("span",{className:"action-icon",style:{"--action-color":t.visual.color},children:m.jsx(f,{size:19,strokeWidth:2.35})}),m.jsxs("div",{children:[m.jsx("h3",{children:t.name}),m.jsx("span",{children:t.area})]}),m.jsxs("strong",{children:[(t.intervalMs/1e3).toFixed(1),"s"]})]}),m.jsx("p",{children:t.description}),m.jsxs("div",{className:"action-meta-grid",children:[m.jsx("span",{children:"Level"}),m.jsx("strong",{children:t.levelRequired}),m.jsx("span",{children:"XP"}),m.jsx("strong",{children:t.xp}),m.jsx("span",{children:"Mastery"}),m.jsx("strong",{children:t.masteryXp})]}),m.jsx("div",{className:"item-row compact",children:(g=t.inputs)!=null&&g.length?t.inputs.map(u=>m.jsx(_r,{itemId:u.itemId,quantity:u.quantity,muted:(e.bank[u.itemId]??0)<u.quantity},u.itemId)):m.jsx("span",{className:"tiny-label",children:"No inputs"})}),m.jsx("div",{className:"reward-line",children:t.outputs.map((u,_)=>m.jsx(xb,{reward:u},`${t.id}-reward-${_}`))}),m.jsx(ra,{value:h,label:r?"Progress":"",detail:r?`${Math.round(h*100)}%`:""}),m.jsxs("button",{className:r?"secondary-button":"primary-button",disabled:!r&&!d,title:v,onClick:()=>n(r?{type:"stopAction"}:{type:"startAction",actionId:t.id}),children:[r?m.jsx(I_,{size:16}):m.jsx(GA,{size:16}),r?"Stop":p]})]})}function Mb(){const{state:t}=mn(),e=si[t.selectedSkill],n=x1(e.id),i=Vt(t,e.id),r=Ev(t,e.id),s=t.skills[e.id],a=F_(e.id);return m.jsxs("section",{className:"main-view skill-view",children:[m.jsxs("div",{className:"view-header",style:{"--view-color":e.color},children:[m.jsxs("div",{className:"view-title-block",children:[m.jsx("span",{className:"view-icon",children:m.jsx(a,{size:24,strokeWidth:2.35})}),m.jsx("span",{className:"eyebrow",children:e.category}),m.jsx("h2",{children:e.name}),m.jsx("p",{children:e.description})]}),m.jsxs("div",{className:"level-badge",children:[m.jsx("span",{children:"Level"}),m.jsx("strong",{children:e.implemented?i:"Soon"})]})]}),e.implemented?m.jsxs(m.Fragment,{children:[m.jsxs("div",{className:"skill-summary-strip",children:[m.jsx(ra,{value:r,label:"Level progress",detail:`${Math.round(r*100)}%`}),m.jsxs("div",{children:[m.jsx("span",{children:"Total XP"}),m.jsx("strong",{children:Fn(s.xp,t.settings.compactNumbers)})]}),m.jsxs("div",{children:[m.jsx("span",{children:"Mastery XP"}),m.jsx("strong",{children:Fn(s.masteryXp,t.settings.compactNumbers)})]})]}),m.jsx("div",{className:"action-grid",children:n.map(o=>m.jsx(Sb,{action:o},o.id))})]}):m.jsxs("div",{className:"empty-state",children:[m.jsx("h3",{children:e.lockedNote??"Coming soon"}),m.jsx("p",{children:"This skill is present in the account plan and will plug into the same XP, bank, and mastery systems."})]})]})}function Eb(){const{state:t,dispatch:e}=mn(),n=it.useRef(null),i=t.activeActionId?Qr:t.combat.mode!=="idle"?Li:t.map.destination?Zr:Oh,r=t.activeActionId?"Skilling":t.combat.mode!=="idle"?"Encounter":t.map.destination?"Travelling":t.activeView==="map"?"Exploring":"Idle",s=()=>{const l=new Blob([mS(t)],{type:"application/json"}),c=URL.createObjectURL(l),d=document.createElement("a");d.href=c,d.download="idle-hero-save.json",d.click(),URL.revokeObjectURL(c)},a=l=>{if(!l)return;const c=new FileReader;c.onload=()=>{e({type:"importRawSave",raw:String(c.result??"")})},c.readAsText(l)},o=()=>{(!t.settings.confirmReset||window.confirm("Reset Idle Hero?"))&&e({type:"resetGame"})};return m.jsxs("header",{className:"top-bar",children:[m.jsxs("div",{className:"brand-lockup",children:[m.jsx("div",{className:"brand-mark",children:m.jsx(kA,{size:21})}),m.jsxs("div",{children:[m.jsx("h1",{children:"Idle Hero"}),m.jsxs("span",{children:[t.mode," mode"]})]})]}),m.jsxs("div",{className:"top-stats",children:[m.jsxs("span",{className:"stat-chip money-chip",children:[m.jsx(Jn,{size:16}),Fn(t.gp,t.settings.compactNumbers)," GP"]}),m.jsxs("span",{className:"stat-chip",children:[m.jsx(zh,{size:16}),"Bank ",_h(t)," / ",t.bankSlots]}),m.jsxs("span",{className:"stat-chip",children:[m.jsx(i,{size:16}),r]}),t.activeView==="map"&&m.jsxs("span",{className:"stat-chip",children:[m.jsx(Zr,{size:16}),t.map.position.x,",",t.map.position.y]})]}),m.jsxs("div",{className:"top-actions",children:[m.jsx("button",{title:"Save now",className:"icon-button",onClick:()=>Ga(t),children:m.jsx(qA,{size:18})}),m.jsx("button",{title:"Export save",className:"icon-button",onClick:s,children:m.jsx(DA,{size:18})}),m.jsx("button",{title:"Import save",className:"icon-button",onClick:()=>{var l;return(l=n.current)==null?void 0:l.click()},children:m.jsx(YA,{size:18})}),m.jsx("button",{title:"Reset game",className:"icon-button danger",onClick:o,children:m.jsx(jA,{size:18})}),m.jsx("input",{ref:n,hidden:!0,type:"file",accept:"application/json",onChange:l=>{var c;return a((c=l.target.files)==null?void 0:c[0])}})]})]})}function wb(){const{state:t}=mn();return t.activeView==="map"?m.jsx(db,{}):t.activeView==="bank"?m.jsx(ob,{}):t.activeView==="shop"?m.jsx(gb,{}):t.activeView==="achievements"?m.jsx(ab,{}):t.activeView==="settings"?m.jsx(mb,{}):m.jsx(Mb,{})}function Tb(){const{state:t}=mn(),e=["app-shell",t.settings.reduceMotion?"reduce-motion":"",t.settings.highContrastMode?"high-contrast":"",t.settings.showBackgroundScene?"":"scene-disabled"].filter(Boolean).join(" ");return m.jsxs("div",{className:e,children:[t.settings.showBackgroundScene&&m.jsx(bA,{state:t}),m.jsxs("div",{className:"ui-shell",children:[m.jsx(Eb,{}),m.jsx(_b,{}),m.jsx("main",{className:"main-panel",children:m.jsx(wb,{})}),m.jsx(hb,{})]}),m.jsx(fb,{})]})}function Ab(){return m.jsx(xS,{children:m.jsx(Tb,{})})}Bu.createRoot(document.getElementById("root")).render(m.jsx(ly.StrictMode,{children:m.jsx(Ab,{})}));
