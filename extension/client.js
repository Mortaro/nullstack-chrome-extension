(()=>{"use strict";const e=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/,t=/^\/Date\((d|-|.*)\)[\/|\\]$/;function dateParser(n,r){if("string"==typeof r){let n=e.exec(r);if(n)return new Date(r);if(n=t.exec(r),n){const e=n[1].split(/[-+,.]/);return new Date(e[0]?+e[0]:0-+e[1])}}return r}function deserialize(e){return JSON.parse(e,dateParser)}const n=deserialize(decodeURIComponent(document.querySelector("[name=nullstack]").content));function fragment({children:e}){return e}function element_element(e,t,...n){n=function flattenChildren(e){return e=[].concat.apply([],e).map((e=>null!=e&&e)),[].concat.apply([],e)}(n),"textarea"===e&&(n=[n.join("")]);const r={...t,children:n};return"element"===e&&(e=r.tag||fragment,delete r.tag),"function"==typeof e&&void 0!==e.render?{type:e,attributes:r,children:null}:{type:e,attributes:r,children:n}}function isFalse(e){return null===e||!1===e||((null==e?void 0:e.hasOwnProperty("type"))&&null===e.type||!1===e.type)}function isText(e){return void 0===e.children}function extractLocation(e){let[t,n]=e.split("#"),[r,i]=t.split("?");"/"!==r&&r.endsWith("/")&&(r=r.substring(0,r.length-1));let a=r;i&&(a+="?"+i);let s=a;return n&&(s+="#"+n),void 0===n&&(n=""),{path:r,search:i,url:a,urlWithHash:s,hash:n}}function extractParamValue(e){return"true"===e||"false"!==e&&(e?decodeURIComponent(e.replace(/\+/g," ")):"")}function erase(e){e.type=!1,delete e.attributes,delete e.children}const r={load:function load({router:e}){e._routes={},e._oldSegments?(e._oldSegments=e._newSegments,e._newSegments={}):(e._oldSegments={},e._newSegments={})},transform:function transform({node:e,depth:t,router:n}){if(!function match(e){return e&&void 0!==e.attributes&&void 0!==e.attributes.route}(e))return;const r=t.slice(0,-1).join(".");if(void 0!==n._routes[r])erase(e);else{const t=function routeMatches(e,t){let{path:n}=extractLocation(e);const r=n.split("/"),i=t.split("/"),a={},s=Math.max(r.length,i.length);let o=!1;for(let e=0;e<s;e++)if(!o)if("*"===i[e])o=!0;else if(i[e]&&i[e].startsWith(":"))a[i[e].replace(":","")]=extractParamValue(r[e]);else if(i[e]!==r[e])return!1;return a}(n.url,e.attributes.route);t?(n._routes[r]=!0,n._newSegments[r]=t,Object.assign(n._segments,t)):erase(e)}},client:!0,server:!0};const i={transform:function bindable_transform({node:e,environment:t}){if(!function bindable_match(e){return void 0!==e&&void 0!==e.attributes&&void 0!==e.attributes.bind&&void 0!==e.attributes.source}(e))return;const n=e.attributes.source;"textarea"===e.type?e.children=[n[e.attributes.bind]]:"input"===e.type&&"checkbox"===e.attributes.type?e.attributes.checked=n[e.attributes.bind]:e.attributes.value=n[e.attributes.bind]||"",e.attributes.name=e.attributes.name||e.attributes.bind,t.client&&function attachEvent(e){const t=e.attributes.source;let n="oninput",r="value";"checkbox"===e.attributes.type||"radio"===e.attributes.type?(n="onclick",r="checked"):"input"!==e.type&&"textarea"!==e.type&&(n="onchange");const i=e.attributes[n];e.attributes[n]=({event:n,value:a})=>{"checked"==r?t[e.attributes.bind]=n.target[r]:!0===t[e.attributes.bind]||!1===t[e.attributes.bind]?t[e.attributes.bind]=n?"true"==n.target[r]:a:"number"==typeof t[e.attributes.bind]?t[e.attributes.bind]=parseFloat(n?n.target[r]:a)||0:t[e.attributes.bind]=n?n.target[r]:a,void 0!==i&&setTimeout((()=>{i({...e.attributes,event:n,value:a})}),0)}}(e)},client:!0,server:!0};function camelize(e){return e.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,((e,t)=>t.toUpperCase()))}function kebabize(e){return e.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()}function serializeParam(e){return e&&void 0!==e.toJSON?e.toJSON():e}function serializeSearch(e){return Object.keys(e).map((t=>!1===e[t]||e[t]?`${t}=${e[t]}`:"")).filter((e=>!!e)).join("&")}const a={transform:function parameterizable_transform({node:e,router:t,params:n}){if(!function parameterizable_match(e){return e&&e.attributes&&(e.attributes.params||e.attributes.path)}(e))return;let r;if(e.attributes.params){r={};for(const t in e.attributes.params)r[t]=serializeParam(e.attributes.params[t])}else r=n;const i=serializeSearch(r),a=e.attributes.path||t.path;e.attributes.href=a+(i?"?":"")+i,delete e.attributes.path,delete e.attributes.params},client:!0,server:!0};const s={transform:function anchorable_transform({node:e,router:t}){if(!function anchorable_match(e){return e&&"a"===e.type&&e.attributes.href&&e.attributes.href.startsWith("/")&&!e.attributes.target}(e))return;const n=e.attributes.onclick;e.attributes.default=!0,e.attributes.onclick=({event:r})=>{r.ctrlKey||r.shiftKey||r.altKey||r.metaKey||(r.preventDefault(),t.url=e.attributes.href),n&&setTimeout((()=>{n({...e.attributes,event:r})}),0)}},client:!0};let o=[{transform:function objectable_transform({node:e}){if(function objectable_match(e){return e&&void 0!==e.attributes}(e))for(const t in e.attributes)if(t.startsWith("on")&&"object"==typeof e.attributes[t]){const n=e.attributes.source,r=e.attributes[t];e.attributes[t]=function(){Object.assign(n,r)}.bind(n)}},client:!0},a,s,r,{transform:function datable_transform({node:e}){if(function datable_match(e){return e&&void 0!==e.attributes}(e)){e.attributes.data=e.attributes.data||{};for(const t in e.attributes)if(t.startsWith("data-")){const n=camelize(t.slice(5));e.attributes.data[n]=e.attributes[t]}for(const t in e.attributes.data){const n="data-"+kebabize(t);e.attributes[n]=e.attributes.data[t]}}},client:!0,server:!0},i];function loadPlugins(e){for(const t of o)t.load&&t.load(e.context);return o}async function generateBranch(e,t,n,r){if(function transformNodes(e,t,n){for(const r of o)r.transform({...e.context,node:t,depth:n})}(r,t,n),function isUndefined(e){return void 0===e||e.hasOwnProperty("type")&&void 0===e.type}(t)){let e="Attempting to render an undefined node. \n";throw e+=void 0===t?"This error usually happens because of a missing return statement around JSX or returning undefined from a renderable function.":"This error usually happens because of a missing import statement or a typo on a component tag",new Error(e)}if(isFalse(t))e.children.push(!1);else if(function isClass(e){return"function"==typeof e.type&&e.type.prototype&&"function"==typeof e.type.prototype.render}(t)){const i=t.attributes.key?t.attributes.key:function generateKey(e,t){return 1===t.length?"application":e.type.name+"/"+t.join("-")}(t,n)+(t.attributes.route?r.context.router.url:"");if(r.context.environment.client&&r.context.router._changed&&t.attributes&&t.attributes.route&&"ssg"!==r.context.environment.mode){const e=n.slice(0,-1).join("."),t=r.context.router._newSegments[e];if(t){const n=r.context.router._oldSegments[e];for(const e in t)n[e]!==t[e]&&delete r.memory[i]}}const a=r.instances[i]||new t.type(r);let s;a._self.persistent=!!t.attributes.persistent,a._self.key=i,a._attributes=t.attributes,a._scope=r,r.memory&&(s=r.memory[i],s&&(a._self.prerendered=!0,a._self.initiated=!0,Object.assign(a,s),delete r.memory[i]));let o=!1;const c=a._self.initiated&&(!a._self.prerendered||a._self.persistent&&a._self.terminated);a._self.terminated&&(o=!0,a._self.terminated=!1);const u=void 0===r.instances[i];r.instances[i]=a,u&&(void 0===s&&(a.prepare&&a.prepare(),r.context.environment.server?(a.initiate&&await a.initiate(),a._self.initiated=!0,a.launch&&a.launch()):r.initiationQueue.push(a)),o=!0),r.hydrationQueue&&(o?(c&&a.launch&&a.launch(),r.hydrationQueue.push(a)):1==a._self.initiated&&a.update&&a.update()),r.context.environment.client&&r.renewalQueue.push(a);const l=a.render();l&&l.type&&(l.instance=a),t.children=[].concat(l);for(let i=0;i<t.children.length;i++)await generateBranch(e,t.children[i],[...n,i],r)}else if(function isFunction(e){return"function"==typeof e.type}(t)){const i=t.type.name?r.generateContext(t.attributes):t.attributes,a=t.type(i);t.children=[].concat(a);for(let i=0;i<t.children.length;i++)await generateBranch(e,t.children[i],[...n,i],r)}else if(t.type){const i={type:t.type,attributes:t.attributes||{},instance:t.instance,children:[]};if(t.children)for(let e=0;e<t.children.length;e++)await generateBranch(i,t.children[e],[...n,e],r);e.children.push(i)}else e.children.push(t)}async function generateTree(e,t){const n={type:"div",attributes:{id:"application"},children:[]};return await generateBranch(n,e,[0],t),n}const c={set(e,t,n){return isProxyable(t,n)?(n._isProxy=!0,e[t]=new Proxy(n,this)):e[t]=n,t.startsWith("_")||E.update(),!0},get(e,t){return"_isProxy"===t||Reflect.get(...arguments)}};function isProxyable(e,t){return!(e.startsWith("_")||null===t||"object"!=typeof t||void 0!==t._isProxy||t instanceof Date)}function generateObjectProxy(e,t){if(isProxyable(e,t)){if("object"==typeof t)for(const e of Object.keys(t))t[e]=generateObjectProxy(e,t[e]);return new Proxy(t,c)}return t}const u={};for(const M of Object.keys(n.context))u[M]=generateObjectProxy(M,n.context[M]);const l={set:(e,t,n)=>(u[t]=generateObjectProxy(t,n),E.update(),!0),get:(e,t)=>"_isProxy"===t||(void 0===e[t]?u[t]:e[t])};function generateContext(e){return new Proxy(e,l)}const d=u,f={...n.environment,client:!0,server:!1};Object.freeze(f);const h=f;function windowEvent(e){clearTimeout(null),setTimeout((()=>{const t=new Event("nullstack."+e);window.dispatchEvent(t)}),0)}const p={...n.page,event:"nullstack.page"};delete n.page;const b=new Proxy(p,{set(e,t,n){"title"===t&&(document.title=n);const r=Reflect.set(...arguments);return"title"===t&&windowEvent("page"),E.update(),r}});const m={},y=m;const g={set(e,t,n){const r=serializeParam(n);e[t]=r;const i=serializeSearch(e);return z.url=z.path+(i?"?":"")+i,!0},get:(e,t)=>!1!==e[t]&&(!1!==y[t]&&(e[t]||y[t]||""))},v={...n.params};delete n.params;const w=new Proxy(v,g);function updateParams(e){!function resetSegments(){for(const e in m)delete m[e]}();const t=function getQueryStringParams(e){const[t,n]=e.split("?");return n?n.split("&").reduce(((e,t)=>{let[n,r]=t.split("=");return e[n]=extractParamValue(r),e}),{}):{}}(e);for(const e of Object.keys({...t,...v}))v[e]=t[e];return w}const _=w,x={...n.worker};delete n.worker;const P=Object.freeze([]),k={set:(e,t,n)=>(e[t]=n,E.update(),!0),get:(e,t)=>e[t]||P};x.queues=new Proxy({},k);const j=new Proxy(x,{set:(e,t,n)=>(e[t]!==n&&(e[t]=n,E.update()),!0)});if(x.enabled){async function register(){if("serviceWorker"in navigator){const e="/service-worker.js";try{j.registration=await navigator.serviceWorker.register(e,{scope:"/"})}catch(e){console.log(e)}}}window.addEventListener("beforeinstallprompt",(function(e){e.preventDefault(),j.installation=e})),register()}window.addEventListener("online",(()=>{j.online=!0,"ssg"===h.mode?z._update(z.url):j.responsive=!0})),window.addEventListener("offline",(()=>{j.online=!1}));const O=j;function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let T=null;const z=new class Router{constructor(){_defineProperty(this,"event","nullstack.router"),_defineProperty(this,"previous",null),_defineProperty(this,"_changed",!1),_defineProperty(this,"_segments",y);const{hash:e,url:t}=extractLocation(window.location.pathname+window.location.search);this._url=t,this._hash=e}async _popState(){const{urlWithHash:e}=extractLocation(window.location.pathname+window.location.search);await this._update(e,!1)}async _update(e,t){this.previous=this.url;const{url:n,path:r,hash:i,urlWithHash:a}=extractLocation(e);clearTimeout(T),T=setTimeout((async()=>{if(b.status=200,"ssg"===h.mode){O.fetching=!0;const e="/index.json",t="/"===r?e:r+e;try{const e=await fetch(t),r=await e.json(n);E.memory=r.instances;for(const e in r.page)b[e]=r.page[e];O.responsive=!0}catch(e){O.responsive=!1}O.fetching=!1}t&&history.pushState({},document.title,a),this._url=n,this._hash=i,this._changed=!0,updateParams(n),E.update(),windowEvent("router")}),0)}async _redirect(e){if(e.startsWith("http"))return window.location.href=e;const{url:t,hash:n,urlWithHash:r}=extractLocation(e);t===this._url&&this._hash===n||await this._update(r,!0),n||window.scroll(0,0)}get url(){return this._url}set url(e){this._redirect(e)}get path(){return extractLocation(this._url).path}set path(e){this._redirect(e+window.location.search)}};function anchorableElement(e){const t=e.querySelectorAll('a[href^="/"]:not([target])');for(const e of t){if(e.dataset.nullstack)return;e.dataset.nullstack=!0,e.addEventListener("click",(t=>{t.ctrlKey||t.shiftKey||t.altKey||t.metaKey||(t.preventDefault(),z.url=e.getAttribute("href"))}))}}function render(e,t){if(isFalse(e)||"head"===e.type)return document.createComment("");if(isText(e))return document.createTextNode(e);const n=t&&t.svg||"svg"===e.type;let r;r=n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),e.instance&&(e.instance._self.element=r);for(let t in e.attributes)if("html"===t)r.innerHTML=e.attributes[t],anchorableElement(r);else if(t.startsWith("on")){if(void 0!==e.attributes[t]){const n=t.replace("on",""),i="_event."+n;e[i]=n=>{!0!==e.attributes.default&&n.preventDefault(),e.attributes[t]({...e.attributes,event:n})},r.addEventListener(n,e[i])}}else{const n=typeof e.attributes[t];"object"!==n&&"function"!==n&&("value"!=t&&!0===e.attributes[t]?r.setAttribute(t,""):("value"==t||!1!==e.attributes[t]&&null!==e.attributes[t]&&void 0!==e.attributes[t])&&r.setAttribute(t,e.attributes[t]))}if(!e.attributes.html){for(let t=0;t<e.children.length;t++){const i=render(e.children[t],{svg:n});r.appendChild(i)}"select"==e.type&&(r.value=e.attributes.value)}return r}function rerender(e,t,n){if(t=void 0===t?E.virtualDom:t,(n=void 0===n?E.nextVirtualDom:n).instance&&(n.instance._self.element=e),!E.hydrated&&e)for(const t of e.childNodes)t.tagName&&"textarea"==t.tagName.toLowerCase()&&0==t.childNodes.length&&t.appendChild(document.createTextNode("")),8===t.COMMENT_NODE&&"#"===t.textContent&&e.removeChild(t);if(!isFalse(t)||!isFalse(n)){if((isFalse(t)||isFalse(n))&&t!=n){const t=render(n);return e.replaceWith(t)}if("head"!=t.type||"head"!=n.type){if("head"==t.type||"head"==n.type){const t=render(n);return e.replaceWith(t)}if(t.type!==n.type){const t=render(n);return e.replaceWith(t)}if(isText(t)&&isText(n))t!=n&&(e.nodeValue=n);else if(t.type===n.type){const r=Object.keys({...t.attributes,...n.attributes});for(const i of r)if("html"===i)n.attributes[i]!==t.attributes[i]&&(e.innerHTML=n.attributes[i]),anchorableElement(e);else if("checked"===i)n.attributes[i]!==e.value&&(e.checked=n.attributes[i]);else if("value"===i)n.attributes[i]!==e.value&&(e.value=n.attributes[i]);else if(i.startsWith("on")){const r=i.replace("on",""),a="_event."+r;e.removeEventListener(r,t[a]),n.attributes[i]&&(n[a]=e=>{!0!==n.attributes.default&&e.preventDefault(),n.attributes[i]({...n.attributes,event:e})},e.addEventListener(r,n[a]))}else{const r=typeof n.attributes[i];"object"!==r&&"function"!==r&&(void 0!==t.attributes[i]&&void 0===n.attributes[i]?e.removeAttribute(i):t.attributes[i]!==n.attributes[i]&&("value"!=i&&!1===n.attributes[i]||null===n.attributes[i]||void 0===n.attributes[i]?e.removeAttribute(i):"value"!=i&&!0===n.attributes[i]?e.setAttribute(i,""):e.setAttribute(i,n.attributes[i])))}if(n.attributes.html)return;const i=Math.max(t.children.length,n.children.length);if(n.children.length>t.children.length){for(let r=0;r<t.children.length;r++)rerender(e.childNodes[r],t.children[r],n.children[r]);for(let r=t.children.length;r<n.children.length;r++){const t=render(n.children[r]);e.appendChild(t)}}else if(t.children.length>n.children.length){for(let r=0;r<n.children.length;r++)rerender(e.childNodes[r],t.children[r],n.children[r]);for(let r=t.children.length-1;r>=n.children.length;r--)e.removeChild(e.childNodes[r])}else for(let r=i-1;r>-1;r--){if(void 0===e.childNodes[r])throw console.error(`${t.type.toUpperCase()} expected tag ${t.children[r].type.toUpperCase()} to be child at index ${r} but instead found undefined. This error usually happens because of an invalid HTML hierarchy or changes in comparisons after serialization.`,e),new Error("Virtual DOM does not match the DOM.");rerender(e.childNodes[r],t.children[r],n.children[r])}"textarea"==n.type&&(e.value=n.children.join("")),"select"==n.type&&(e.value=n.attributes.value)}}}}const S={initialized:!1,hydrated:!1,initializer:null,instances:{}};d.instances=S.instances,S.initiationQueue=[],S.renewalQueue=[],S.hydrationQueue=[],S.virtualDom={},S.selector=null,S.events={},S.generateContext=generateContext,S.renderQueue=null,S.update=async function(){S.initialized&&(clearInterval(S.renderQueue),S.renderQueue=setTimeout((async()=>{const e=S;e.context=d,e.plugins=loadPlugins(e),S.initialized=!1,S.initiationQueue=[],S.renewalQueue=[],S.hydrationQueue=[],S.nextVirtualDom=await generateTree(S.initializer(),e),rerender(S.selector),S.virtualDom=S.nextVirtualDom,S.nextVirtualDom=null,S.processLifecycleQueues()}),16))},S.processLifecycleQueues=async function(){S.initialized||(S.initialized=!0,S.hydrated=!0);const e=S.initiationQueue,t=S.hydrationQueue;for(const t of e)t.initiate&&await t.initiate(),t._self.initiated=!0,t.launch&&t.launch();e.length&&S.update();for(const e of t)e.hydrate&&await e.hydrate(),e._self.hydrated=!0;t.length&&S.update();for(const e in S.instances){const t=S.instances[e];S.renewalQueue.includes(t)||t._self.terminated||(t.terminate&&await t.terminate(),t._self.persistent?t._self.terminated=!0:delete S.instances[e])}z._changed=!1};const E=S,N={get(e,t){var n,r,i;if("_isProxy"===t)return!0;if("_invoke"===(null===(n=e.constructor[t])||void 0===n?void 0:n.name))return e.constructor[t].bind(e.constructor);if(!(null!==(r=e[t])&&void 0!==r&&null!==(i=r.name)&&void 0!==i&&i.startsWith("_")||t.startsWith("_")||"function"!=typeof e[t]||"constructor"===t)){const{[t]:n}={[t]:n=>{const r=generateContext({...e._attributes,...n,self:e._self});return e[t](r)}};return n}return Reflect.get(...arguments)},set(e,t,n){var r;return null!=n&&null!==(r=n.name)&&void 0!==r&&r.startsWith("_")||t.startsWith("_")?e[t]=n:(e[t]=generateObjectProxy(t,n),E.update()),!0}},C=N;const D={...n.project};delete n.project,Object.freeze(D);const L=D,W={...n.settings};delete n.settings,Object.freeze(W);const A=W;function client_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}d.page=b,d.router=z,d.settings=A,d.worker=O,d.params=_,d.project=L,d.environment=n.environment,E.memory=n.instances;const Q=E;Q.generateContext=generateContext,Q.context=d,E.plugins=loadPlugins(Q);class Nullstack{static start(e){return setTimeout((async()=>{if(window.addEventListener("popstate",(()=>{z._popState()})),E.routes={},updateParams(z.url),E.currentInstance=null,E.initializer=()=>element_element(e),E.selector=document.querySelector("#application"),"spa"===h.mode){Q.plugins=loadPlugins(Q),O.online=navigator.onLine,"function"==typeof d.start&&await d.start(d),d.environment=h,E.virtualDom=await generateTree(E.initializer(),Q);const e=render(E.virtualDom);E.selector.replaceWith(e),E.selector=e}else E.virtualDom=await generateTree(E.initializer(),Q),d.environment=h,Q.plugins=loadPlugins(Q),O.online=navigator.onLine,"function"==typeof d.start&&await d.start(d),E.nextVirtualDom=await generateTree(E.initializer(),Q),rerender(E.selector),E.virtualDom=E.nextVirtualDom,E.nextVirtualDom=null;E.processLifecycleQueues(),delete n.context}),0),generateContext({})}constructor(){client_defineProperty(this,"_self",{prerendered:!1,initiated:!1,hydrated:!1,terminated:!1});const e=function getProxyableMethods(e){let t=new Set,n=e;do{Object.getOwnPropertyNames(n).map((e=>t.add(e)))}while((n=Object.getPrototypeOf(n))&&n!=Object.prototype);return[...t.keys()].filter((t=>"constructor"!==t&&"function"==typeof e[t]))}(this),t=new Proxy(this,C);for(const n of e)this[n]=this[n].bind(t);return t}render(){return!1}}client_defineProperty(Nullstack,"element",element_element),client_defineProperty(Nullstack,"invoke",(function invoke(e,t){return async function _invoke(n={}){var r;let i;O.fetching=!0,Object.isFrozen(O.queues[e])?O.queues[e]=[n]:O.queues[e]=[...O.queues[e],n];const a=t===this.hash?t:`${t}-${this.hash}`;let s=`${O.api}/nullstack/${a}/${e}.json`,o=JSON.stringify(n||{});const c={headers:O.headers,mode:"cors",cache:"no-cache",credentials:"same-origin",redirect:"follow",referrerPolicy:"no-referrer"};/get[A-Z]([*]*)/.test(e)?(c.method="GET",s+=`?payload=${o}`):(c.body=o,/patch[A-Z]([*]*)/.test(e)?c.method="PATCH":/put[A-Z]([*]*)/.test(e)?c.method="PUT":/delete[A-Z]([*]*)/.test(e)?c.method="DELETE":c.method="POST");try{const e=await fetch(s,c);b.status=e.status;i=deserialize(await e.text()).result,O.responsive=!0}catch(e){O.responsive=!1}return 1===(null===(r=O.queues[e])||void 0===r?void 0:r.length)?delete O.queues[e]:O.queues[e]=O.queues[e].filter((e=>e!==n)),O.fetching=!!Object.keys(O.queues).length,i}})),client_defineProperty(Nullstack,"fragment",fragment),client_defineProperty(Nullstack,"use",function usePlugins(e){return async(...t)=>{o=[...new Set([...t.flat(),...o])].filter((t=>t[e]))}}("client"));const $=Nullstack;function _defineProperty2(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class Popup extends ${constructor(...e){super(...e),function Popup_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(this,"alive",!1)}async clientFunction(){var e;if(null===(e=chrome)||void 0===e||!e.tabs)return void console.error("This button should be only used in the extension popup!");const t=await Popup.serverFunction({});let[n]=await chrome.tabs.query({active:!0,currentWindow:!0});chrome.scripting.executeScript({target:{tabId:n.id},args:[t],function:e=>{if(console.log({alive:e}),e)return document.body.innerText="Server is Alive",!0}},(([{result:e}])=>{console.log({alive:e}),this.alive=e}))}render({project:e}){return $.element("section",null,$.element("h1",null," $",e.name," "),$.element("button",{source:this,onclick:this.clientFunction},"Test server"),this.alive&&$.element("p",null," Extension and server are Alive "))}}_defineProperty2(Popup,"hash","fd11c8714de2a9edde4c5f290777dcfa"),_defineProperty2(Popup,"serverFunction",$.invoke("serverFunction","fd11c8714de2a9edde4c5f290777dcfa"));const F=Popup;class Application extends ${prepare({page:e,project:t}){e.locale="en-US",e.title=`${t.name} - Welcome to Nullstack!`,e.description=`${t.name} was made with Nullstack`}render(){return $.element("main",null,$.element(F,null))}}!function Application_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(Application,"hash","14abf0fc5ae09fd933eaa4ce4af567da");const q=Application,V=$.start(q);V.start=async function start(){}})();