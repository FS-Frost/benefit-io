function S(){}function T(t,n){for(const e in n)t[e]=n[e];return t}function C(t){return t()}function G(){return Object.create(null)}function D(t){t.forEach(C)}function J(t){return typeof t=="function"}function K(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function Q(t){return Object.keys(t).length===0}function H(t,...n){if(t==null){for(const i of n)i(void 0);return S}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function V(t,n,e){t.$$.on_destroy.push(H(n,e))}function X(t,n,e,i){if(t){const c=N(t,n,e,i);return t[0](c)}}function N(t,n,e,i){return t[1]&&i?T(e.ctx.slice(),t[1](i(n))):e.ctx}function Y(t,n,e,i){if(t[2]&&i){const c=t[2](i(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const s=[],l=Math.max(n.dirty.length,c.length);for(let o=0;o<l;o+=1)s[o]=n.dirty[o]|c[o];return s}return n.dirty|c}return n.dirty}function Z(t,n,e,i,c,s){if(c){const l=N(n,e,i,s);t.p(l,c)}}function $(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function tt(t){return t??""}let m=!1;function nt(){m=!0}function et(){m=!1}function P(t,n,e,i){for(;t<n;){const c=t+(n-t>>1);e(c)<=i?t=c+1:n=c}return t}function q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&r.push(a)}n=r}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let c=0;for(let r=0;r<n.length;r++){const u=n[r].claim_order,a=(c>0&&n[e[c]].claim_order<=u?c+1:P(1,c,j=>n[e[j]].claim_order,u))-1;i[r]=e[a]+1;const E=a+1;e[E]=r,c=Math.max(E,c)}const s=[],l=[];let o=n.length-1;for(let r=e[c]+1;r!=0;r=i[r-1]){for(s.push(n[r-1]);o>=r;o--)l.push(n[o]);o--}for(;o>=0;o--)l.push(n[o]);s.reverse(),l.sort((r,u)=>r.claim_order-u.claim_order);for(let r=0,u=0;r<l.length;r++){for(;u<s.length&&l[r].claim_order>=s[u].claim_order;)u++;const a=u<s.length?s[u]:null;t.insertBefore(l[r],a)}}function B(t,n){if(m){for(q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function it(t,n,e){m&&!e?B(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function ct(t){t.parentNode&&t.parentNode.removeChild(t)}function lt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function M(t){return document.createElement(t)}function g(t){return document.createTextNode(t)}function rt(){return g(" ")}function ot(){return g("")}function st(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function ut(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function at(t){return t.dataset.svelteH}function ft(t){return Array.from(t.childNodes)}function O(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function w(t,n,e,i,c=!1){O(t);const s=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const o=t[l];if(n(o)){const r=e(o);return r===void 0?t.splice(l,1):t[l]=r,c||(t.claim_info.last_index=l),o}}for(let l=t.claim_info.last_index-1;l>=0;l--){const o=t[l];if(n(o)){const r=e(o);return r===void 0?t.splice(l,1):t[l]=r,c?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,o}}return i()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function I(t,n,e,i){return w(t,c=>c.nodeName===n,c=>{const s=[];for(let l=0;l<c.attributes.length;l++){const o=c.attributes[l];e[o.name]||s.push(o.name)}s.forEach(l=>c.removeAttribute(l))},()=>i(n))}function _t(t,n,e){return I(t,n,e,M)}function L(t,n){return w(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>g(n),!0)}function dt(t){return L(t," ")}function ht(t,n){n=""+n,t.data!==n&&(t.data=n)}function mt(t,n){t.value=n??""}function pt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function yt(t,n,e){for(let i=0;i<t.options.length;i+=1){const c=t.options[i];if(c.__value===n){c.selected=!0;return}}(!e||n!==void 0)&&(t.selectedIndex=-1)}function bt(t){const n=t.querySelector(":checked");return n&&n.__value}function z(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function xt(t,n){const e=[];let i=0;for(const c of n.childNodes)if(c.nodeType===8){const s=c.textContent.trim();s===`HEAD_${t}_END`?(i-=1,e.push(c)):s===`HEAD_${t}_START`&&(i+=1,e.push(c))}else i>0&&e.push(c);return e}function gt(t,n){return new t(n)}let h;function p(t){h=t}function v(){if(!h)throw new Error("Function called outside component initialization");return h}function vt(t){v().$$.on_mount.push(t)}function Et(t){v().$$.after_update.push(t)}function kt(){const t=v();return(n,e,{cancelable:i=!1}={})=>{const c=t.$$.callbacks[n];if(c){const s=z(n,e,{cancelable:i});return c.slice().forEach(l=>{l.call(t,s)}),!s.defaultPrevented}return!0}}const d=[],k=[];let _=[];const b=[],A=Promise.resolve();let x=!1;function F(){x||(x=!0,A.then(U))}function Nt(){return F(),A}function R(t){_.push(t)}function wt(t){b.push(t)}const y=new Set;let f=0;function U(){if(f!==0)return;const t=h;do{try{for(;f<d.length;){const n=d[f];f++,p(n),W(n.$$)}}catch(n){throw d.length=0,f=0,n}for(p(null),d.length=0,f=0;k.length;)k.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];y.has(e)||(y.add(e),e())}_.length=0}while(d.length);for(;b.length;)b.pop()();x=!1,y.clear(),p(t)}function W(t){if(t.fragment!==null){t.update(),D(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(R)}}function At(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{D as A,G as B,U as C,J as D,Q as E,R as F,At as G,h as H,p as I,C as J,d as K,F as L,nt as M,et as N,st as O,at as P,xt as Q,kt as R,wt as S,lt as T,mt as U,tt as V,yt as W,bt as X,rt as a,ft as b,_t as c,L as d,M as e,ct as f,dt as g,B as h,it as i,ht as j,V as k,X as l,ut as m,S as n,$ as o,Y as p,ot as q,Et as r,K as s,g as t,Z as u,vt as v,pt as w,k as x,gt as y,Nt as z};
