"use strict";define("common/kernel/kernel",["common/touchslider/touchslider","common/touchguesture/touchguesture","common/pointerevents/pointerevents","common/svgicos/svgicos","site/pages/pages","site/popups/popups"],function(e,t,n,o,i,s){function l(e,t,n,o){function s(i){var s;c.querySelector(":scope>.content").insertAdjacentHTML("beforeEnd",'<div class="'+t+'">'+i+"</div>"),d(c.querySelector(":scope>.content>."+t)),"js"in e?(p.showLoading(),s=h+e.js,require.data.debug?require([s],l):require([s],l,function(t){e.loaded=0,t.requireType&&"scripterror"!==t.requireType&&"nodefine"!==t.requireType||t.xhr&&404!==t.xhr.status?(require.undef(s),a(s,t.message,n)):r(n),p.hideLoading()})):(e.loaded=2,o(!0))}function l(t){delete e.js,t&&p.extendIn(e,t,f),e.loaded=2,o(!0),p.hideLoading()}var c,u,f,h,y,m,v;n&&e.alias&&(t=e.alias,e=i[e.alias]),2===e.loaded?o():1!==e.loaded&&(e.loaded=1,n?(c=document.getElementById("page"),u="page",f=["onload","onloadend","onunload","onunloadend","onrightmenuclick","onleftmenuclick","rightMenuDomContent","leftMenuDomContent"]):(c=document.getElementById("popup"),u="popup",f=["onload","onloadend","onunload","onunloadend","open"]),h=u+"/"+t+"/",y=require.toUrl(h),"css"in e&&(p.appendCss(y+e.css),delete e.css),"html"in e?(p.showLoading(),m=y+e.html,v=new XMLHttpRequest,v.open("get",m,!0),v.onreadystatechange=function(){4===this.readyState&&(200===this.status?(delete e.html,s(this.responseText)):(e.loaded=0,require.data.debug||404!==this.status?a(m,this.status,n):r(n)),p.hideLoading())},v.send("")):s(""))}function a(e,t,n){p.alert("加载"+e+"时发生了一个错误: "+t,n?function(){history.back()}:void 0)}function r(e){e?location.reload():p.confirm("网站已经更新, 使用该功能需要先重新加载. 是否立即刷新本页?",function(e){e&&location.reload()})}function c(e,t,n,o){function i(e){this.removeEventListener(e.type,i,!1),o()}e.style.visibility="visible",n?(t.classList.add("panelTransR1"),e.classList.add("panelTransR2")):(t.classList.add("panelTransL1"),e.classList.add("panelTransL2")),"function"==typeof o&&d(e,i)}function d(e,t){"function"!=typeof t&&(t=u),e.addEventListener(p.names.aniEvt,t,!1)}function u(e){e.target===this&&(this.className.match(/ panelTrans[LR]1/)?this.style.right=this.style.visibility="":this.style.right=0,this.className=this.className.replace(/ panelTrans[LR][12]/,""))}function f(e,t){for(;i[e].back;)if(e=i[e].back,e===t)return!0}var h,p={appendCss:function(e){var t=document.createElement("link");/\.less$/.test(e)?"object"==typeof less?(t.rel="stylesheet/less",t.href=e,less.sheets.push(t),less.refresh()):(t.rel="stylesheet",t.href=e.replace(/less$/,"css")):(t.rel="stylesheet",t.href=e),document.head.appendChild(t)},makeSvg:function(e,t){var n="http://www.w3.org/2000/svg",o=document.createElementNS(n,"svg");return o.appendChild(document.createElementNS(n,"path")).setAttribute("transform","scale(1,-1)"),e&&p.setSvgPath(o,e,t),o},setSvgPath:function(e,t,n){var i,s=p.makeSvg();s.style.position="absolute",s.style.bottom=s.style.right="100%",s.firstChild.setAttribute("d",o[t]),document.body.appendChild(s),i=s.firstChild.getBBox(),document.body.removeChild(s),n&&(i.width>i.height?(i.y-=(i.width-i.height)/2,i.height=i.width):(i.x-=(i.height-i.width)/2,i.width=i.height)),e.firstChild.setAttribute("d",o[t]),e.setAttribute("viewBox",i.x+" "+(-i.y-i.height)+" "+i.width+" "+i.height)},extendIn:function(e,t,n){for(var o=0;o<n.length;o++)n[o]in t&&(e[n[o]]=t[n[o]])},buildHash:function(e){var t,n="#!"+encodeURIComponent(e.id);for(t in e.args)n+=void 0===e.args[t]?"&"+encodeURIComponent(t):"&"+encodeURIComponent(t)+"="+encodeURIComponent(e.args[t]);return n},parseHash:function(e){var t,n,o,s={id:h,args:{}};if(e=e.substr(1).replace(/[#\?].*$/,""),o=e.match(/[^=&]+(=[^&]*)?/g)){"!"===o[0].charAt(0)&&(n=o[0].substr(1),n in i&&(s.id=decodeURIComponent(n)));for(t=1;t<o.length;t++)n=o[t].match(/^([^=]+)(=)?(.+)?$/),n&&(s.args[decodeURIComponent(n[1])]=n[2]?decodeURIComponent(n[3]||""):void 0)}return s},getDefaultBack:function(e){var t,n,o;if(e||(e=p.location),i[e.id])if(i[e.id].backLoc instanceof Object)o=i[e.id].backLoc;else if(i[e.id].back&&i[i[e.id].back]&&(o={id:i[e.id].back,args:{}},n=i[i[e.id].back].alias?i[i[i[e.id].back].alias]:i[i[e.id].back],n.args))for(t=0;t<n.args.length;t++)n.args[t]in e.args&&(o.args[n.args[t]]=e.args[n.args[t]]);return o},isSameLocation:function(e,t){var n;if(e.id===t.id&&Object.keys(e.args).length===Object.keys(t.args).length){for(n in e.args)if(!(n in t.args)||e.args[n]!==t.args[n])return!1;return!0}return!1},isGoingback:function(e,t){return f(e,t)?!0:f(t,e)?!1:i[e].alias?f(i[e].alias,t)?!0:f(t,i[e].alias)?!1:t===h:i[t].alias?f(e,i[t].alias)?!0:f(i[t].alias,e)?!1:i[e]===h:t===h},clone:function(e){var t,n;if(e instanceof Date)t=new Date(e.valueOf());else if(e instanceof RegExp)n="",e.ignoreCase&&(n+="i"),e.multiline&&(n+="m"),e.global&&(n+="g"),t=RegExp(e.source.RegEncode(),n);else if(e instanceof Error)n=e.message?e.message:"",t=e instanceof RangeError?RangeError(n):e instanceof ReferenceError?ReferenceError(n):e instanceof SyntaxError?SyntaxError(n):e instanceof TypeError?TypeError(n):e instanceof URIError?URIError(n):Error(n);else if(e instanceof Array)for(t=[],n=0;n<e.length;n++)t[n]=p.clone(e[n]);else if(e instanceof Object){t={};for(n in e)t[n]=p.clone(e[n])}else t=e;return t},isEqual:function(e,t){var n,o=Object.prototype.toString.call(e);if(o===Object.prototype.toString.call(t)){if("[object Object]"===o){if(Object.keys(e).length===Object.keys(t).length){for(n in e)if(!(n in t&&p.isEqual(e[n],t[n])))return!1;return!0}return!1}if("[object Array]"===o){if(e.length===t.length){for(n=0;n<e.length;n++)if(!p.isEqual(e[n],t[n]))return!1;return!0}return!1}return"[object String]"===o||"[object Number]"===o||"[object Undefined]"===o||"[object Null]"===o?e===t:!1}return!1},cancelEvent:function(e){e.preventDefault()},stopEvent:function(e){e.stopPropagation()}};return!function(){function e(e,t){var n,o,i;for(e.xEvents[t.type].locked=!0,n=0;n<e.xEvents[t.type].length;n++)e.xEvents[t.type][n].call(e,t);for(e.xEvents[t.type].locked=!1;e.xEvents[t.type].stack.length>0;)e.xEvents[t.type].stack[0]?(o=e.xEvents[t.type].indexOf(e.xEvents[t.type].stack[0][1]),e.xEvents[t.type].stack[0][0]?-1!==o&&e.xEvents[t.type].splice(o,1):-1===o&&e.xEvents[t.type].push(e.xEvents[t.type].stack[0][1])):e.xEvents[t.type].splice(0,e.xEvents[t.type].length),e.xEvents[t.type].stack.shift();if(0===e.xEvents[t.type].length&&(delete e.xEvents[t.type],e["on"+t.type]=null),e.xEvents.removeMark){delete e.xEvents.removeMark;for(i in e.xEvents)delete e.xEvents[i],e["on"+i]=null;e.xEvents=null}}p.listeners={add:function(t,n,o){t.xEvents||(t.xEvents=function(n){e(t,n)}),t.xEvents[n]||(t.xEvents[n]=[],t.xEvents[n].stack=[],t.xEvents[n].locked=!1,t["on"+n]=t.xEvents),t.xEvents[n].locked?t.xEvents[n].stack.push([!1,o]):t.xEvents[n].indexOf(o)<0&&t.xEvents[n].push(o)},list:function(e,t){var n,o;if(t)n=e.xEvents&&e.xEvents[t]?e.xEvents[t].slice(0):[];else if(n={},e.xEvents)for(o in e.xEvents)e.xEvents[o]instanceof Array&&e.xEvents[o].length>0&&(n[o]=e.xEvents[o].slice(0));return n},remove:function(e,t,n){var o,i,s;if(e.xEvents)if(t)e.xEvents[t]&&(e.xEvents[t].locked?n?e.xEvents[t].stack.push([!0,n]):e.xEvents[t].stack.push(null):n?(s=e.xEvents[t].indexOf(n),-1!==s&&e.xEvents[t].splice(s,1)):e.xEvents[t].splice(0,e.xEvents[t].length),0===e.xEvents[t].length&&(delete e.xEvents[t],e["on"+t]=null));else if(!e.xEvents.removeMark){for(o in e.xEvents)e.xEvents[o].locked?i=!0:(delete e.xEvents[o],e["on"+o]=null);i?e.xEvents.removeMark=!0:e.xEvents=null}}}}(),!function(){p.names={},"animation"in document.documentElement.style?(p.names.aniEvt="animationend",p.names.aniStyle="animation"):(p.names.aniEvt="webkitAnimationEnd",p.names.aniStyle="webkitAnimation"),"transition"in document.documentElement.style?(p.names.transEvt="transitionend",p.names.transStyle="transition"):(p.names.transEvt="webkitTransitionEnd",p.names.transStyle="webkitTransition"),"transform"in document.documentElement.style?p.names.transform="transform":p.names.transform="webkitTransform"}(),!function(){function e(e){0===this.scrollTop?this.scrollTop=1:this.scrollTop+this.clientHeight===this.scrollHeight&&(this.scrollTop-=1)}function t(e){e.target===this&&(this.scrollTo?this.scrollTo(0,0):this.scrollLeft=this.scrollTop=0)}p.scrollReload=function(e,t){var o,i,s,l,a;p.fixIosScrolling(e),a=n(e,function(n){function r(t){t.target!==e&&(l=!0,c())}function c(){window.removeEventListener("scroll",r,!0)}if("start"===n.type){if(0===a.pointers.length&&(e.classList.contains("iosScrollFix")&&1===e.scrollTop||!e.classList.contains("iosScrollFix")&&0===e.scrollTop))return o=n.y,window.addEventListener("scroll",r,!0),!0}else{if(l)return l=!1,!0;var d;if(n.y>o+5)i||(i=!0,c()),n.domEvent.preventDefault(),s||(s=document.createElement("div"),s.className="reloadHint",s.appendChild(p.makeSvg("refresh")),e.appendChild(s)),d=s.offsetHeight||s.clientHeight,n.y-o<2*d?(s.style.top=n.y-o-d+"px",s.classList.remove("pin"),s.style.opacity=(n.y-o)/d/2,s.style[p.names.transform]="rotate("+360*s.style.opacity+"deg)"):(s.style.top=d+"px",s.style.opacity=1,s.classList.add("pin"),s.style[p.names.transform]="");else{if(n.y<o&&!i)return!0;s&&(e.removeChild(s),s=void 0)}"end"!==n.type&&"cancel"!==n.type||(s&&(e.removeChild(s),s.classList.contains("pin")&&("function"==typeof t?t():p.reloadPage()),s=void 0),i=!1)}})},p.fixIosScrolling=function(t){var n;"IOS"===browser.name&&(t.classList.add("iosScrollFix"),"none"==getComputedStyle(t).display?(n=t.style.display,t.style.display="block",t.scrollTop=1,t.style.display=n):t.scrollTop=1,t.addEventListener("scroll",e,!1))},p.getScrollHeight=function(e){return e.classList.contains("iosScrollFix")?e.scrollHeight-1:e.scrollHeight},"IOS"===browser.name&&window.addEventListener("touchmove",function(e){for(var t=e.target;t!=document.body;){if(t.classList.contains("iosScrollFix"))return;t=t.parentNode}e.preventDefault()},!1),window.addEventListener("scroll",t,!1),document.documentElement.addEventListener("scroll",t,!1),document.body.addEventListener("scroll",t,!1),document.getElementById("page").addEventListener("scroll",t,!1),document.getElementById("popup").addEventListener("scroll",t,!1)}(),!function(){function e(){n.length>1?(n.shift(),"function"==typeof n[0]?(n[0](),e()):t(n[0])):o.style.display=""}function t(e){var t,n,o;s.src=e.img,"right"in e&&(s.style.right=e.right),"left"in e&&(s.style.left=e.left),"top"in e&&(s.style.top=e.top),"bottom"in e&&(s.style.bottom=e.bottom),"width"in e&&(s.style.width=e.width),"height"in e&&(s.style.height=e.height);for(o=0;o<i.childNodes.length;o++)t=i.childNodes[o],e.rows[o]?(t.style.height=e.rows[o],t.className="unflexable"):(t.style.height="auto",t.className="flexable");for(t=i.childNodes[1],o=0;o<t.childNodes.length;o++)n=t.childNodes[o],e.cells[o]?(n.style.width=e.cells[o],n.className="unflexable"):(n.style.width="auto",n.className="flexable")}var n,o=document.getElementById("helper"),i=o.firstChild,s=o.lastChild;o.addEventListener("click",e),p.showHelper=function(e){n=e instanceof Array?e:[e],t(n[0]),o.style.display="block"}}(),!function(){function e(e,t){return o&&"function"==typeof s[o].onunload&&s[o].onunload()||"function"==typeof s[e].onload&&s[e].onload(t)}function t(e){o&&(d.classList.remove(o),delete s[o].backParam),i=void 0,o=e,d.classList.add(o),f.data=s[e].title,s[e].back?(h.lastChild.data=s[s[e].back].title,h.style.visibility="visible"):h.style.visibility="hidden"}function n(n,l){var u=o;return e(n,l)?!0:(c(d.querySelector(":scope>.content>."+n),d.querySelector(":scope>.content>."+o),n===s[o].back||n===i,function(){var e;a=!1,t(n),"function"==typeof s[u].onunloadend&&s[u].onunloadend(),"function"==typeof s[o].onloadend&&s[o].onloadend(),"function"==typeof r&&(e=r,r=void 0,e())}),void(a=n))}var o,i,a,r,d=document.getElementById("popup"),u=d.querySelector(":scope>.header>.close"),f=d.querySelector(":scope>.header>.title").firstChild,h=d.querySelector(":scope>.header>.back");p.openPopup=function(e,t){if(window.frameElement&&window.frameElement.kernel&&"function"==typeof window.frameElement.kernel.openPopup)window.frameElement.kernel.openPopup(e,t);else{var n=s[e];n?l(n,e,!1,function(){"function"==typeof n.open?n.open(t):p.showPopup(e,t)}):p.hint("popup config not found: "+e)}},p.showPopup=function(i,l){if(a)r=function(){p.showPopup(i,l)};else{var c;if(d.classList.contains("in")){if(o!==i)return n(i,l);"function"==typeof s[i].onload&&s[i].onload(l)||"function"==typeof s[i].onloadend&&s[i].onloadend()}else{if(e(i,l))return!0;c=d.querySelector(":scope>.content>."+i),c.style.right=0,c.style.visibility="visible",d.classList.add("in"),a=i,"function"==typeof p.popupEvents.onshow&&p.popupEvents.onshow({type:"show",id:i}),t(i),p.hideReadable()}}},p.closePopup=function(e){var t;a?r=function(){p.closePopup(e)}:(t=p.getCurrentPopup(),t&&(!e||t===e||e instanceof Array&&e.indexOf(t)>=0)&&("function"==typeof s[t].onunload&&s[t].onunload()||(d.classList.remove("in"),d.classList.add("out"),a=!0,delete s[t].backParam,"function"==typeof p.popupEvents.onhide&&p.popupEvents.onhide({type:"hide",id:t}))))},p.getCurrentPopup=function(){return d.classList.contains("in")?o:void 0},p.setPopupBackParam=function(e){d.classList.contains("in")&&(s[o].backParam=e)},p.setPopupBack=function(e,t){t?t in s&&(e?(s[t].back=e,o===t&&(h.lastChild.data=s[e].title)):(delete s[t].back,h.style.visibility="hidden")):d.classList.contains("in")&&(e?(h.lastChild.data=s[e].title,i=e,h.style.visibility=""):h.style.visibility="hidden")},p.setPopupTitle=function(e,t){t?t in s&&(s[t].title=e,o===t&&(f.data=e)):d.classList.contains("in")&&(f.data=e)},p.popupEvents={},u.appendChild(p.makeSvg("close")),u.addEventListener("click",function(){p.closePopup()},!1),h.insertBefore(p.makeSvg("chevron-left"),h.firstChild),h.addEventListener("click",function(e){p.openPopup(i?i:s[o].back,s[o].backParam)},!1),d.addEventListener(p.names.aniEvt,function(e){var t,n;e.target===this&&(a=!1,this.classList.contains("out")?(this.classList.remove("out"),"function"==typeof p.popupEvents.onhideend&&p.popupEvents.onhideend({type:"hideend",id:o}),t=d.querySelector(":scope>.content>."+o),t.style.right=t.style.visibility="","function"==typeof s[o].onunloadend&&s[o].onunloadend(),d.classList.remove(o),o=void 0):("function"==typeof s[o].onloadend&&s[o].onloadend(),"function"==typeof p.popupEvents.onshowend&&p.popupEvents.onshowend({type:"showend",id:o})),"function"==typeof r&&(n=r,r=void 0,n()))},!1)}(),!function(){var e,t=document.getElementById("readable"),n=document.querySelector("#readable>.close"),o=document.querySelector("#readable>.content");p.fixIosScrolling(o),p.showReadable=function(n,i){"string"==typeof n?o.innerHTML=n:o.appendChild(n),o.classList.remove("foreign"),t.className="in",e=i},p.hideReadable=function(){"in"===t.className&&(t.className="out","function"==typeof e&&e())},p.isReadableShowing=function(){return"in"===t.className},p.showForeign=function(e,t){p.showReadable('<iframe frameborder="no" scrolling="auto" sandbox="allow-same-origin allow-forms allow-scripts" src="'+e+'"></iframe>',t),o.classList.add("foreign")},p.clearPopup=function(){p.isReadableShowing()&&p.hideReadable(),p.closePopup()},n.appendChild(p.makeSvg("close")),n.addEventListener("click",p.hideReadable,!1),t.addEventListener(p.names.aniEvt,function(e){if(e.target===this&&this.classList.contains("out")){for(;o.childNodes.length>0;)o.removeChild(o.firstChild);this.className=""}},!1)}(),!function(){function n(){"function"==typeof f&&f(C.current,this)}function o(){""===E.style.visibility&&""===v.style.visibility&&""===x.style.visibility&&""===q.style.visibility&&document.body.classList.remove("mask")}function i(e,t,n){"visible"===E.style.visibility?y.push([e,t,n]):(w.className=e,"htmlDialog"===e?"string"==typeof t?b.innerHTML=t:b.appendChild(t):b.textContent=t,window.addEventListener("resize",s,!1),s(),document.body.classList.add("mask"),E.style.visibility="visible",u=n)}function s(){w.style.width=w.style.height="",w.style.bottom=w.style.right="auto",w.style.width=w.offsetWidth+"px",w.style.height=w.offsetHeight+"px",w.style.bottom=w.style.right=""}function l(){P.style.width=m.w+"px",P.style.height=m.h+"px",P.style.left=m.l+"px",P.style.top=m.t+"px"}function a(){m.ww=window.innerWidth,m.wh=window.innerHeight,m.wr=m.ww/m.wh,m.ow=P.naturalWidth,m.oh=P.naturalHeight,m.r=m.ow/m.oh,m.ow>m.ww||m.oh>m.wh?m.r>m.wr?(m.z=m.mz=m.ww/m.ow,m.l=0,m.w=m.ww,m.h=m.w/m.r,m.t=(m.wh-m.h)/2):(m.z=m.mz=m.wh/m.oh,m.t=0,m.h=m.wh,m.w=m.h*m.r,m.l=(m.ww-m.w)/2):(m.z=m.mz=1,m.w=m.ow,m.h=m.oh,m.l=(m.ww-m.w)/2,m.t=(m.wh-m.h)/2),l()}function r(e){function t(e){var t=Math.max(Math.min(e.zoom*i,1),m.mz);t!==m.z&&(m.w=m.ow*t,m.h=m.oh*t,m.l=m.w>m.ww?Math.min(Math.max(n+(m.l-n)*t/m.z,m.ww-m.w),0):(m.ww-m.w)/2,m.t=m.h>m.wh?Math.min(Math.max(o+(m.t-o)*t/m.z,m.wh-m.h),0):(m.wh-m.h)/2,m.z=t,l())}var n=e.x,o=e.y,i=m.z;this.onzoomstart=null,this.onzoomchange=t,this.onzoomend=function(e){t.call(this,e),this.onzoomchange=this.zoomend=null,this.onzoomstart=r}}function c(e){function t(e){m.w>m.ww&&(m.l=Math.min(Math.max(i+e.x-n,m.ww-m.w),0)),m.h>m.wh&&(m.t=Math.min(Math.max(s+e.y-o,m.wh-m.h),0)),l()}var n=e.x,o=e.y,i=m.l,s=m.t;I.ondragmove=t,I.ondragend=function(e){t.call(this,e),this.ondragmove=this.ondragend=null,this.ondragstart=c}}var d,u,f,h=0,y=[],m={},v=document.getElementById("loading"),g=document.getElementById("hint"),E=document.getElementById("dialog"),w=E.querySelector("div"),b=w.querySelector(".content"),k=w.querySelector(".close"),x=document.getElementById("sliderView"),L=x.querySelector(".close"),S=x.querySelector(".actions"),C=e(x.querySelector(".content")),q=document.getElementById("photoView"),N=q.querySelector(".close"),P=q.querySelector("img"),I=t(q);I.onzoomstart=r,I.ondragstart=c,p.showPhotoView=function(e){P.src=e},p.hidePhotoView=function(){P.src="about:blank"},P.addEventListener("load",function(){q.style.visibility="visible",document.body.classList.add("mask"),window.addEventListener("resize",a),a()}),P.addEventListener("error",function(){q.style.visibility="",window.removeEventListener("resize",a),o()}),p.showSliderView=function(e,t,o,i){var s,l;for(s=0;s<e.length;s++)l=document.createElement("div"),l.style.backgroundImage="url("+e[s]+")",l.className="item",C.add(l);for(t&&C.slideTo(t,!0),f=i;S.childNodes.length;)S.removeChild(S.firstChild);if(o&&o.length){for(s=0;s<o.length;s++)l=document.createElement("a"),l.href="javascript:;",l.appendChild(document.createTextNode(o[s])),l.addEventListener("click",n.bind(s)),S.appendChild(l);S.style.display=""}else S.style.display="none"},p.hideSliderView=function(){C.clear()},p.alert=function(e,t){i("alert",e,t)},p.confirm=function(e,t){i("confirm",e,t)},p.htmlDialog=function(e,t){i("htmlDialog",e,t)},p.closeDialog=function(e){var t;for(window.removeEventListener("resize",s,!1),E.style.visibility="",o(),"function"==typeof u&&u(e);b.childNodes.length;)b.removeChild(b.lastChild);u=void 0,y.length&&(t=y.shift(),p[t.shift()].apply(p,t))},p.showLoading=function(e){v.querySelector("div").lastChild.data=e?e:"加载中...",0===h&&(v.style.visibility="visible",document.body.classList.add("mask")),h++},p.hideLoading=function(){h>0&&(h--,0===h&&(v.style.visibility="",o(),"function"==typeof p.dialogEvents.onloaded&&p.dialogEvents.onloaded({type:"loaded"})))},p.isLoading=function(){return h>0},p.hint=function(e,t){document.querySelector("#hint>.text").firstChild.data=e,d?clearTimeout(d):g.style.opacity=1,d=setTimeout(function(){g.style.opacity="",d=void 0},t?t:5e3)},p.dialogEvents={},C.onchange=function(){var e,t="";if(this.children.length){if(this.children.length>1)for(e=0;e<this.children.length;e++)t+=e===this.current?"●":"○";document.getElementById("sliderView").style.visibility="visible",document.body.classList.add("mask")}else x.style.visibility="",o();document.querySelector("#sliderView>.nav").firstChild.data=t},k.appendChild(p.makeSvg("close")),k.addEventListener("click",p.closeDialog,!1),w.querySelector(".yes").addEventListener("click",p.closeDialog,!1),w.querySelector(".no").addEventListener("click",function(){p.closeDialog()},!1),L.appendChild(k.firstChild.cloneNode(!0)),N.appendChild(k.firstChild.cloneNode(!0)),L.addEventListener("click",p.hideSliderView,!1),N.addEventListener("click",p.hidePhotoView,!1)}(),!function(){function e(){var t,s,a=p.location.id,h=i[a];p.lastLocation.id&&(t=a.replace(/-.*$/,""),s=p.lastLocation.id.replace(/-.*$/,""),t!==s&&(t in m&&(m[t].className="selected","object"==typeof y[t]&&p.setSvgPath(m[t].firstChild,y[t].selected,!0)),s in m&&(m[s].className="","object"==typeof y[s]&&p.setSvgPath(m[s].firstChild,y[s].normal,!0))),p.clearPopup()),"function"==typeof f&&f(),l(h,a,!0,function(t){if(d)u=!0;else{var s,l,f,h,y=i[a].alias?i[a].alias:a;if(a!==r){for(v.classList.add(a),v.querySelector(":scope>.header>.title").firstChild.data=i[a].title,window.frameElement&&window.frameElement.kernel&&"function"==typeof window.frameElement.kernel.getCurrentPopup&&"page"===window.frameElement.kernel.getCurrentPopup()&&window.frameElement.kernel.setPopupTitle(i[a].title);w.childNodes.length;)w.removeChild(w.firstChild);for(;E.childNodes.length;)E.removeChild(E.firstChild);i[a].onrightmenuclick?("function"==typeof i[a].onrightmenuclick?w.href="javascript:;":w.href=i[a].onrightmenuclick,i[a].rightMenuDomContent&&w.appendChild(i[a].rightMenuDomContent),w.style.display=""):w.style.display="none",i[a].onleftmenuclick?("function"==typeof i[a].onleftmenuclick?E.href="javascript:;":E.href=i[a].onleftmenuclick,i[a].leftMenuDomContent&&E.appendChild(i[a].leftMenuDomContent),E.style.display="",g.style.display="none"):E.style.display="none",o(p.getDefaultBack()),s=v.querySelector(":scope>.content>."+y),r?(v.classList.remove(r),l=r,f=i[l].alias?i[l].alias:l,r=a,y===f?n(!0):(h=p.isGoingback(l,a),d=!0,c(s,v.querySelector(":scope>.content>."+f),h,function(){d=!1,"function"==typeof i[f].onunloadend&&i[f].onunloadend(!h),"function"==typeof i[y].onloadend&&i[a].onloadend(!h),u&&(u=!1,s.style.visibility="visible",e())}),"function"==typeof i[f].onunload&&i[f].onunload(),"function"==typeof i[y].onload&&i[y].onload(!h||t))):(r=a,s.style.right=0,s.style.visibility="visible",n(!0))}else n()}})}function t(e,t){var n=i[r].alias?i[i[r].alias]:i[r];(!e||"string"==typeof e&&e===p.location.id||e.indexOf(p.location.id)>=0)&&(t||p.clearPopup(),"function"==typeof n.onunload&&n.onunload(!0),"function"==typeof n.onunloadend&&n.onunloadend(!0),"function"==typeof n.onload&&n.onload(!0),"function"==typeof n.onloadend&&n.onloadend(!0))}function n(e){var t=i[r].alias?i[i[r].alias]:i[r];"function"==typeof t.onload&&t.onload(e),"function"==typeof t.onloadend&&t.onloadend()}function o(e){if(e&&e.id){var t=i[e.id].title;t||(t="返回"),g.lastChild.data=t,g.href=p.buildHash(e),g.style.display=""}else g.href="#!",g.style.display="none"}function s(){var t=p.parseHash(location.hash);p.isSameLocation(t,p.location)||(p.lastLocation=p.location,p.location=t,!i[p.location.id].back||p.lastLocation.id!==i[p.location.id].back&&i[p.lastLocation.id].alias!==i[p.location.id].back?i[p.lastLocation.id].backLoc&&(p.location.id===i[p.lastLocation.id].back||i[p.location.id].alias&&i[p.location.id].alias===i[p.lastLocation.id].back)&&(delete i[p.lastLocation.id].backLoc,delete a[p.lastLocation.id],sessionStorage.setItem("kernelHistory",JSON.stringify(a))):(a[p.location.id]=i[p.location.id].backLoc=p.lastLocation,sessionStorage.setItem("kernelHistory",JSON.stringify(a))),e())}var a,r,d,u,f,y,m,v=document.getElementById("page"),g=v.querySelector(":scope>.header>.back"),E=v.querySelector(":scope>.header>.leftMenuBtn"),w=v.querySelector(":scope>.header>.rightMenuBtn");try{sessionStorage.setItem(0,0),sessionStorage.removeItem(0)}catch(b){Storage.prototype.setItem=function(){}}p.init=function(t,n,o){var l,r=v.querySelector(":scope>.navMenu");if(!p.location){h=t,y=n,f=o,p.location=p.parseHash(location.hash),"clean"===p.location.args.ui&&document.body.classList.add("clean"),p.lastLocation={id:void 0,args:{}},a=sessionStorage.getItem("kernelHistory"),a=a?JSON.parse(a):{};for(l in a)l in i&&(i[l].backLoc=a[l]);for(window.addEventListener("hashchange",s,!1),m={};r.childNodes.length;)r.removeChild(r.childNodes[0]);for(l in y)l in i&&(m[l]=r.appendChild(document.createElement("a")),m[l].href="#!"+l,RegExp("^"+l+"(?:-|$)").test(p.location.id)?(m[l].className="selected",m[l].appendChild(p.makeSvg("object"==typeof y[l]?y[l].selected:y[l],!0))):m[l].appendChild(p.makeSvg("object"==typeof y[l]?y[l].normal:y[l],!0)),m[l].appendChild(document.createTextNode(i[l].title)));window.addEventListener("contextmenu","Firefox"===browser.name?p.stopEvent:p.cancelEvent,!1),window.addEventListener("dragstart",p.cancelEvent,!1),document.body.classList.remove("loading"),e(),"autopopup"in p.location.args&&p.openPopup(p.location.args.autopopup,p.location.args.autopopuparg?JSON.parse(p.location.args.autopopuparg):void 0)}},p.reloadPage=function(e,n){function o(s){p.listeners.remove(this,s.type,o),p.isSameLocation(i,p.location)&&t(e,n)}var i;p.isLoading()?(i=p.location,p.listeners.add(p.dialogEvents,"loaded",o)):t(e,n)},g.insertBefore(p.makeSvg("chevron-left"),g.firstChild),w.addEventListener("click",function(e){"function"==typeof i[r].onrightmenuclick&&i[r].onrightmenuclick()},!1),E.addEventListener("click",function(e){"function"==typeof i[r].onleftmenuclick&&i[r].onleftmenuclick()},!1)}(),p});