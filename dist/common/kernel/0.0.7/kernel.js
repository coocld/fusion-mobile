"use strict";define("common/kernel/kernel",["common/touchslider/touchslider","common/touchguesture/touchguesture","common/pointerevents/pointerevents","common/svgicos/svgicos","site/pages/pages","site/popups/popups"],function(e,t,n,o,i,s){function a(e,t,n){var o,i=document.querySelector("#"+t+">.content>."+n);2===e.loaded&&"function"==typeof e.ondestory&&e.ondestory(),i.parentNode.removeChild(i),e.css&&"string"!=typeof e.css&&(document.head.removeChild(e.css),"stylesheet/less"===e.css.type&&(less.sheets.splice(less.sheets.indexOf(e.css),1),less.refresh()),e.css=e.css.getAttribute("href").replace(RegExp("^"+require.toUrl(t+"/"+n)+"/"),"")),e.js&&(o=t+"/"+n+"/"+e.js,require.defined(o)&&require([o],function(t){require.undef(o),t&&(e.__proto__=Object.prototype)})),e.loaded=0}function l(e,t,n,o){function s(i){var s;d.querySelector(":scope>.content").insertAdjacentHTML("beforeEnd",'<div class="'+t+'">'+i+"</div>"),u(d.querySelector(":scope>.content>."+t)),"js"in e?(v.showLoading(),s=h+e.js,require.data.debug?require([s],l):require([s],l,function(o){a(e,p,t),o.requireType&&"scripterror"!==o.requireType&&"nodefine"!==o.requireType||o.xhr&&404!==o.xhr.status?c(s,o.message,n):r(n),v.hideLoading()})):(e.loaded=2,o(!0))}function l(t){t&&(e.__proto__=t),e.loaded=2,o(!0),v.hideLoading()}var d,p,h,f,y,m;n&&e.alias&&(t=e.alias,e=i[e.alias]),2===e.loaded?o():1!==e.loaded&&(e.loaded=1,n?(d=document.getElementById("page"),p="page"):(d=document.getElementById("popup"),p="popup"),h=p+"/"+t+"/",f=require.toUrl(h),"string"==typeof e.css&&(e.css=v.appendCss(f+e.css)),"html"in e?(v.showLoading(),y=f+e.html,m=new XMLHttpRequest,m.open("get",y,!0),m.onreadystatechange=function(){4===this.readyState&&(200===this.status?(delete e.html,s(this.responseText)):(a(e,p,t),require.data.debug||404!==this.status?c(y,this.status,n):r(n)),v.hideLoading())},m.send("")):s(""))}function c(e,t,n){v.alert("加载"+e+"时发生了一个错误: "+t,n?function(){history.back()}:void 0)}function r(e){e?location.reload():v.confirm("网站已经更新, 使用该功能需要先重新加载. 是否立即刷新本页?",function(e){e&&location.reload()})}function d(e,t,n,o){function i(e){this.removeEventListener(e.type,i,!1),o()}e.style.visibility="visible",n?(t.classList.add("panelTransR1"),e.classList.add("panelTransR2")):(t.classList.add("panelTransL1"),e.classList.add("panelTransL2")),"function"==typeof o&&u(e,i)}function u(e,t){"function"!=typeof t&&(t=p),e.addEventListener(v.names.aniEvt,t,!1)}function p(e){e.target===this&&(this.style.right=this.className.match(/ panelTrans[LR]1/)?this.style.visibility="":0,this.className=this.className.replace(/ panelTrans[LR][12]/,""))}function h(e,t){for(;i[e].back;)if(e=i[e].back,e===t)return!0}function f(e){e.preventDefault()}function y(e){e.stopPropagation()}var m,v={appendCss:function(e){var t=document.createElement("link");return/\.less$/.test(e)?"object"==typeof less?(t.rel="stylesheet/less",t.href=e,less.sheets.push(t),less.refresh()):(t.rel="stylesheet",t.href=e.replace(/less$/,"css")):(t.rel="stylesheet",t.href=e),document.head.appendChild(t),t},makeSvg:function(e,t){var n="http://www.w3.org/2000/svg",o=document.createElementNS(n,"svg");return o.appendChild(document.createElementNS(n,"path")).setAttribute("transform","scale(1,-1)"),e&&v.setSvgPath(o,e,t),o},setSvgPath:function(e,t,n){var i,s=v.makeSvg();s.style.position="absolute",s.style.bottom=s.style.right="100%",s.firstChild.setAttribute("d",o[t]),document.body.appendChild(s),i=s.firstChild.getBBox(),document.body.removeChild(s),n&&(i.width>i.height?(i.y-=(i.width-i.height)/2,i.height=i.width):(i.x-=(i.height-i.width)/2,i.width=i.height)),e.firstChild.setAttribute("d",o[t]),e.setAttribute("viewBox",i.x+" "+(-i.y-i.height)+" "+i.width+" "+i.height)},buildHash:function(e){var t,n="#!"+encodeURIComponent(e.id);for(t in e.args)n+=void 0===e.args[t]?"&"+encodeURIComponent(t):"&"+encodeURIComponent(t)+"="+encodeURIComponent(e.args[t]);return n},parseHash:function(e){var t,n,o,s={id:m,args:{}};if(e=e.substr(1).replace(/[#\?].*$/,""),o=e.match(/[^=&]+(=[^&]*)?/g)){"!"===o[0].charAt(0)&&(n=o[0].substr(1),n in i&&(s.id=decodeURIComponent(n)));for(t=1;o.length>t;t++)n=o[t].match(/^([^=]+)(=)?(.+)?$/),n&&(s.args[decodeURIComponent(n[1])]=n[2]?decodeURIComponent(n[3]||""):void 0)}return s},getDefaultBack:function(e){var t,n,o;if(e||(e=v.location),i[e.id])if("object"===v.dataType(i[e.id].backLoc))o=i[e.id].backLoc;else if(i[e.id].back&&i[i[e.id].back]&&(o={id:i[e.id].back,args:{}},n=i[i[e.id].back].alias?i[i[i[e.id].back].alias]:i[i[e.id].back],n.args))for(t=0;n.args.length>t;t++)n.args[t]in e.args&&(o.args[n.args[t]]=e.args[n.args[t]]);return o},isSameLocation:function(e,t){var n;if(e.id===t.id&&Object.keys(e.args).length===Object.keys(t.args).length){for(n in e.args)if(!(n in t.args)||e.args[n]!==t.args[n])return!1;return!0}return!1},isGoingback:function(e,t){return!!h(e,t)||!h(t,e)&&(i[e].alias?!!h(i[e].alias,t)||!h(t,i[e].alias)&&t===m:i[t].alias?!!h(e,i[t].alias)||!h(i[t].alias,e)&&i[e]===m:t===m)},dataType:function(e){var t=typeof e;return"string"===t||"number"===t||"function"===t||"undefined"===t?t:(t=Object.prototype.toString.call(e).replace(/^\[object |\]$/g,"").toLowerCase(),"date"===t||"array"===t||"regexp"===t||"error"===t||"null"===t?t:"object")}};return!function(){function e(e,t){var n,o,i;for(e.xEvents[t.type].locked=!0,n=0;e.xEvents[t.type].length>n;n++)e.xEvents[t.type][n].call(e,t);for(e.xEvents[t.type].locked=!1;e.xEvents[t.type].stack.length;)e.xEvents[t.type].stack[0]?(o=e.xEvents[t.type].indexOf(e.xEvents[t.type].stack[0][1]),e.xEvents[t.type].stack[0][0]?o!==-1&&e.xEvents[t.type].splice(o,1):o===-1&&e.xEvents[t.type].push(e.xEvents[t.type].stack[0][1])):e.xEvents[t.type].splice(0,e.xEvents[t.type].length),e.xEvents[t.type].stack.shift();if(e.xEvents[t.type].length||(delete e.xEvents[t.type],e["on"+t.type]=null),e.xEvents.removeMark){delete e.xEvents.removeMark;for(i in e.xEvents)delete e.xEvents[i],e["on"+i]=null;e.xEvents=null}}v.listeners={add:function(t,n,o){t.xEvents||(t.xEvents=function(n){e(t,n)}),t.xEvents[n]||(t.xEvents[n]=[],t.xEvents[n].stack=[],t.xEvents[n].locked=!1,t["on"+n]=t.xEvents),t.xEvents[n].locked?t.xEvents[n].stack.push([!1,o]):t.xEvents[n].indexOf(o)<0&&t.xEvents[n].push(o)},list:function(e,t){var n,o;if(t)n=e.xEvents&&e.xEvents[t]?e.xEvents[t].slice(0):[];else if(n={},e.xEvents)for(o in e.xEvents)"array"===v.dataType(e.xEvents[o])&&e.xEvents[o].length&&(n[o]=e.xEvents[o].slice(0));return n},remove:function(e,t,n){var o,i,s;if(e.xEvents)if(t)e.xEvents[t]&&(e.xEvents[t].locked?e.xEvents[t].stack.push(n?[!0,n]:null):n?(s=e.xEvents[t].indexOf(n),s!==-1&&e.xEvents[t].splice(s,1)):e.xEvents[t].splice(0,e.xEvents[t].length),0===e.xEvents[t].length&&(delete e.xEvents[t],e["on"+t]=null));else if(!e.xEvents.removeMark){for(o in e.xEvents)e.xEvents[o].locked?i=!0:(delete e.xEvents[o],e["on"+o]=null);i?e.xEvents.removeMark=!0:e.xEvents=null}}}}(),!function(){v.names={},"animation"in document.documentElement.style?(v.names.aniEvt="animationend",v.names.aniStyle="animation"):(v.names.aniEvt="webkitAnimationEnd",v.names.aniStyle="webkitAnimation"),"transition"in document.documentElement.style?(v.names.transEvt="transitionend",v.names.transStyle="transition"):(v.names.transEvt="webkitTransitionEnd",v.names.transStyle="webkitTransition"),v.names.transform="transform"in document.documentElement.style?"transform":"webkitTransform"}(),!function(){function e(){0===this.scrollTop?this.scrollTop=1:this.scrollTop+this.clientHeight===this.scrollHeight&&(this.scrollTop-=1)}function t(e){e.target===this&&(this.scrollTo?this.scrollTo(0,0):this.scrollLeft=this.scrollTop=0)}v.scrollReload=function(e,t){var o,i,s,a,l;v.fixIosScrolling(e),l=n(e,function(n){function c(t){t.target!==e&&(a=!0,r())}function r(){window.removeEventListener("scroll",c,!0)}if("start"===n.type){if(0===l.pointers.length&&(e.classList.contains("iosScrollFix")&&1===e.scrollTop||!e.classList.contains("iosScrollFix")&&0===e.scrollTop))return o=n.y,window.addEventListener("scroll",c,!0),!0}else{if(a)return a=!1,!0;var d;if(n.y>o+5)i||(i=!0,r()),n.domEvent.preventDefault(),s||(s=document.createElement("div"),s.className="reloadHint",s.appendChild(v.makeSvg("refresh")),e.appendChild(s)),d=s.offsetHeight||s.clientHeight,2*d>n.y-o?(s.style.top=n.y-o-d+"px",s.classList.remove("pin"),s.style.opacity=(n.y-o)/d/2,s.style[v.names.transform]="rotate("+360*s.style.opacity+"deg)"):(s.style.top=d+"px",s.style.opacity=1,s.classList.add("pin"),s.style[v.names.transform]="");else{if(o>n.y&&!i)return!0;s&&(e.removeChild(s),s=void 0)}"end"!==n.type&&"cancel"!==n.type||(s&&(e.removeChild(s),s.classList.contains("pin")&&("function"==typeof t?t():v.reloadPage()),s=void 0),i=!1)}})},v.fixIosScrolling=function(t){var n,o;"IOS"===browser.name&&(t.style.webkitOverflowScrolling="touch",t.addEventListener("touchmove",y),o=getComputedStyle(t),"auto"===o.overflowY&&(t.classList.add("iosScrollFix"),"none"===o.display?(n=t.style.display,t.style.display="block",t.scrollTop=1,t.style.display=n):t.scrollTop=1,t.addEventListener("scroll",e)))},v.getScrollHeight=function(e){return e.classList.contains("iosScrollFix")?e.scrollHeight-1:e.scrollHeight},"IOS"===browser.name&&window.addEventListener("touchmove",function(e){e.preventDefault()}),window.addEventListener("scroll",t,!1),document.documentElement.addEventListener("scroll",t,!1),document.body.addEventListener("scroll",t,!1),document.getElementById("page").addEventListener("scroll",t,!1),document.getElementById("popup").addEventListener("scroll",t,!1)}(),!function(){function e(){n.length>1?(n.shift(),"function"==typeof n[0]?(n[0](),e()):t(n[0])):o.style.display=""}function t(e){var t,n,o;s.src=e.img,"right"in e&&(s.style.right=e.right),"left"in e&&(s.style.left=e.left),"top"in e&&(s.style.top=e.top),"bottom"in e&&(s.style.bottom=e.bottom),"width"in e&&(s.style.width=e.width),"height"in e&&(s.style.height=e.height);for(o=0;i.childNodes.length>o;o++)t=i.childNodes[o],e.rows[o]?(t.style.height=e.rows[o],t.className="unflexable"):(t.style.height="auto",t.className="flexable");for(t=i.childNodes[1],o=0;t.childNodes.length>o;o++)n=t.childNodes[o],e.cells[o]?(n.style.width=e.cells[o],n.className="unflexable"):(n.style.width="auto",n.className="flexable")}var n,o=document.getElementById("helper"),i=o.firstChild,s=o.lastChild;o.addEventListener("click",e),v.showHelper=function(e){n="array"===v.dataType(e)?e:[e],t(n[0]),o.style.display="block"}}(),!function(){function e(e,t){return o&&"function"==typeof s[o].onunload&&s[o].onunload()||"function"==typeof s[e].onload&&s[e].onload(t)}function t(e){o&&(u.classList.remove(o),delete s[o].backParam),i=void 0,o=e,u.classList.add(o),h.data=s[e].title,s[e].back?(f.lastChild.data=s[s[e].back].title,f.style.visibility="visible"):f.style.visibility="hidden"}function n(n,a){var l=o;return!!e(n,a)||(d(u.querySelector(":scope>.content>."+n),u.querySelector(":scope>.content>."+o),n===s[o].back||n===i,function(){var e;c=!1,t(n),"function"==typeof s[l].onunloadend&&s[l].onunloadend(),"function"==typeof s[o].onloadend&&s[o].onloadend(),"function"==typeof r&&(e=r,r=void 0,e())}),void(c=n))}var o,i,c,r,u=document.getElementById("popup"),p=u.querySelector(":scope>.header>.close"),h=u.querySelector(":scope>.header>.title").firstChild,f=u.querySelector(":scope>.header>.back");v.openPopup=function(e,t){if(window.frameElement&&window.frameElement.kernel&&"function"==typeof window.frameElement.kernel.openPopup)window.frameElement.kernel.openPopup(e,t);else{var n=s[e];n?l(n,e,!1,function(){"function"==typeof n.open?n.open(t):v.showPopup(e,t)}):v.hint("popup config not found: "+e)}},v.showPopup=function(i,a){if(c)r=function(){v.showPopup(i,a)};else{var l;if(u.classList.contains("in")){if(o!==i)return n(i,a);"function"==typeof s[i].onload&&s[i].onload(a)||"function"==typeof s[i].onloadend&&s[i].onloadend()}else{if(e(i,a))return!0;l=u.querySelector(":scope>.content>."+i),l.style.right=0,l.style.visibility="visible",u.classList.add("in"),c=i,"function"==typeof v.popupEvents.onshow&&v.popupEvents.onshow({type:"show",id:i}),t(i),v.hideReadable()}}},v.closePopup=function(e){var t;c?r=function(){v.closePopup(e)}:(t=v.getCurrentPopup(),!t||e&&t!==e&&("array"!==v.dataType(e)||e.indexOf(t)<0)||"function"==typeof s[t].onunload&&s[t].onunload()||(u.classList.remove("in"),u.classList.add("out"),c=!0,delete s[t].backParam,"function"==typeof v.popupEvents.onhide&&v.popupEvents.onhide({type:"hide",id:t})))},v.getCurrentPopup=function(){if(u.classList.contains("in"))return o},v.setPopupBackParam=function(e){u.classList.contains("in")&&(s[o].backParam=e)},v.setPopupBack=function(e,t){t?t in s&&(e?(s[t].back=e,o===t&&(f.lastChild.data=s[e].title)):(delete s[t].back,f.style.visibility="hidden")):u.classList.contains("in")&&(e?(f.lastChild.data=s[e].title,i=e,f.style.visibility=""):f.style.visibility="hidden")},v.setPopupTitle=function(e,t){t?t in s&&(s[t].title=e,o===t&&(h.data=e)):u.classList.contains("in")&&(h.data=e)},v.destoryPopup=function(e){var t=s[e];t&&a(t,"popup",e)},v.popupEvents={},p.appendChild(v.makeSvg("close")),p.addEventListener("click",function(){v.closePopup()},!1),f.insertBefore(v.makeSvg("chevron-left"),f.firstChild),f.addEventListener("click",function(){v.openPopup(i?i:s[o].back,s[o].backParam)},!1),u.addEventListener(v.names.aniEvt,function(e){var t,n;e.target===this&&(c=!1,this.classList.contains("out")?(this.classList.remove("out"),"function"==typeof v.popupEvents.onhideend&&v.popupEvents.onhideend({type:"hideend",id:o}),t=u.querySelector(":scope>.content>."+o),t.style.right=t.style.visibility="","function"==typeof s[o].onunloadend&&s[o].onunloadend(),u.classList.remove(o),o=void 0):("function"==typeof s[o].onloadend&&s[o].onloadend(),"function"==typeof v.popupEvents.onshowend&&v.popupEvents.onshowend({type:"showend",id:o})),"function"==typeof r&&(n=r,r=void 0,n()))},!1)}(),!function(){var e,t=document.getElementById("readable"),n=document.querySelector("#readable>.close"),o=document.querySelector("#readable>.content");v.fixIosScrolling(o),v.showReadable=function(n,i){"string"==typeof n?o.innerHTML=n:o.appendChild(n),o.classList.remove("foreign"),t.className="in",e=i},v.hideReadable=function(){"in"===t.className&&(t.className="out","function"==typeof e&&e())},v.isReadableShowing=function(){return"in"===t.className},v.showForeign=function(e,t){v.showReadable('<iframe frameborder="no" scrolling="auto" sandbox="allow-same-origin allow-forms allow-scripts" src="'+e+'"></iframe>',t),o.classList.add("foreign")},v.clearPopup=function(){v.isReadableShowing()&&v.hideReadable(),v.closePopup()},n.appendChild(v.makeSvg("close")),n.addEventListener("click",v.hideReadable,!1),t.addEventListener(v.names.aniEvt,function(e){if(e.target===this&&this.classList.contains("out")){for(;o.childNodes.length>0;)o.removeChild(o.firstChild);this.className=""}},!1)}(),!function(){function n(){""===m.style.visibility&&""===f.style.visibility&&""===b.style.visibility&&""===x.style.visibility&&document.body.classList.remove("mask")}function o(e,t,n){"visible"===m.style.visibility?p.push([e,t,n]):(g.className=e,"htmlDialog"===e?"string"==typeof t?w.innerHTML=t:w.appendChild(t):w.textContent=t,window.addEventListener("resize",i,!1),i(),document.body.classList.add("mask"),m.style.visibility="visible",d=n)}function i(){g.style.width=g.style.height="",g.style.bottom=g.style.right="auto",g.style.width=g.offsetWidth+"px",g.style.height=g.offsetHeight+"px",g.style.bottom=g.style.right=""}function s(){C.style.width=h.w+"px",C.style.height=h.h+"px",C.style.left=h.l+"px",C.style.top=h.t+"px"}function a(){h.ww=window.innerWidth,h.wh=window.innerHeight,h.wr=h.ww/h.wh,h.ow=C.naturalWidth,h.oh=C.naturalHeight,h.r=h.ow/h.oh,h.ow>h.ww||h.oh>h.wh?h.r>h.wr?(h.z=h.mz=h.ww/h.ow,h.l=0,h.w=h.ww,h.h=h.w/h.r,h.t=(h.wh-h.h)/2):(h.z=h.mz=h.wh/h.oh,h.t=0,h.h=h.wh,h.w=h.h*h.r,h.l=(h.ww-h.w)/2):(h.z=h.mz=1,h.w=h.ow,h.h=h.oh,h.l=(h.ww-h.w)/2,h.t=(h.wh-h.h)/2),s()}function l(e){function t(e){var t=Math.max(Math.min(e.zoom*i,1),h.mz);t!==h.z&&(h.w=h.ow*t,h.h=h.oh*t,h.l=h.w>h.ww?Math.min(Math.max(n+(h.l-n)*t/h.z,h.ww-h.w),0):(h.ww-h.w)/2,h.t=h.h>h.wh?Math.min(Math.max(o+(h.t-o)*t/h.z,h.wh-h.h),0):(h.wh-h.h)/2,h.z=t,s())}var n=e.x,o=e.y,i=h.z;this.onzoomstart=null,this.onzoomchange=t,this.onzoomend=function(e){t.call(this,e),this.onzoomchange=this.zoomend=null,this.onzoomstart=l}}function c(e){function t(e){h.w>h.ww&&(h.l=Math.min(Math.max(i+e.x-n,h.ww-h.w),0)),h.h>h.wh&&(h.t=Math.min(Math.max(a+e.y-o,h.wh-h.h),0)),s()}var n=e.x,o=e.y,i=h.l,a=h.t;N.ondragmove=t,N.ondragend=function(e){t.call(this,e),this.ondragmove=this.ondragend=null,this.ondragstart=c}}var r,d,u=0,p=[],h={},f=document.getElementById("loading"),y=document.getElementById("hint"),m=document.getElementById("dialog"),g=m.querySelector("div"),w=g.querySelector(".content"),E=g.querySelector(".close"),b=document.getElementById("sliderView"),k=b.querySelector(".close"),L=e(b.querySelector(".content")),x=document.getElementById("photoView"),S=x.querySelector(".close"),C=x.querySelector("img"),q=x.querySelector(".actions"),N=t(x);N.onzoomstart=l,N.ondragstart=c,v.showPhotoView=function(e,t,n){var o,i;for(C.src=e;q.childNodes.length;)q.removeChild(q.firstChild);if("function"==typeof n&&t&&t.length){for(o=0;t.length>o;o++)i=document.createElement("a"),i.href="javascript:;",i.appendChild(document.createTextNode(t[o])),i.addEventListener("click",n.bind(v,o)),q.appendChild(i);q.style.display=""}else q.style.display="none"},v.hidePhotoView=function(){C.src="about:blank"},C.addEventListener("load",function(){x.style.visibility="visible",document.body.classList.add("mask"),window.addEventListener("resize",a),a()}),C.addEventListener("error",function(){x.style.visibility="",window.removeEventListener("resize",a),n()}),v.showSliderView=function(e,t){var n,o;for(n=0;e.length>n;n++)o=document.createElement("div"),o.style.backgroundImage="url("+e[n]+")",o.className="item",L.add(o);t&&L.slideTo(t,!0)},v.hideSliderView=function(){L.clear()},v.alert=function(e,t){o("alert",e,t)},v.confirm=function(e,t){o("confirm",e,t)},v.htmlDialog=function(e,t){o("htmlDialog",e,t)},v.closeDialog=function(e){var t;for(window.removeEventListener("resize",i,!1),m.style.visibility="",n(),"function"==typeof d&&d(e);w.childNodes.length;)w.removeChild(w.lastChild);d=void 0,p.length&&(t=p.shift(),v[t.shift()].apply(v,t))},v.showLoading=function(e){f.querySelector("div").lastChild.data=e?e:"加载中...",0===u&&(f.style.visibility="visible",document.body.classList.add("mask")),u++},v.hideLoading=function(){u>0&&(u--,0===u&&(f.style.visibility="",n(),"function"==typeof v.dialogEvents.onloaded&&v.dialogEvents.onloaded({type:"loaded"})))},v.isLoading=function(){return u>0},v.hint=function(e,t){document.querySelector("#hint>.text").firstChild.data=e,r?clearTimeout(r):y.style.opacity=1,r=setTimeout(function(){y.style.opacity="",r=void 0},t?t:5e3)},v.dialogEvents={},L.onchange=function(){var e,t="";if(this.children.length){if(this.children.length>1)for(e=0;this.children.length>e;e++)t+=e===this.current?"●":"○";document.getElementById("sliderView").style.visibility="visible",document.body.classList.add("mask")}else b.style.visibility="",n();document.querySelector("#sliderView>.nav").firstChild.data=t},E.appendChild(v.makeSvg("close")),E.addEventListener("click",v.closeDialog,!1),g.querySelector(".yes").addEventListener("click",v.closeDialog,!1),g.querySelector(".no").addEventListener("click",function(){v.closeDialog()},!1),k.appendChild(E.firstChild.cloneNode(!0)),S.appendChild(E.firstChild.cloneNode(!0)),k.addEventListener("click",v.hideSliderView,!1),S.addEventListener("click",v.hidePhotoView,!1)}(),!function(){function e(){var t,s,a=v.location.id,c=i[a];v.lastLocation.id&&(t=a.replace(/-.*$/,""),s=v.lastLocation.id.replace(/-.*$/,""),t!==s&&(t in w&&(w[t].className="selected","object"==typeof g[t]&&v.setSvgPath(w[t].firstChild,g[t].selected,!0)),s in w&&(w[s].className="","object"==typeof g[s]&&v.setSvgPath(w[s].firstChild,g[s].normal,!0))),v.clearPopup()),"function"==typeof h&&h(),l(c,a,!0,function(t){if(u)p=!0;else{var s,l,c,h,f=i[a].alias?i[a].alias:a;if(a!==r){for(E.classList.add(a),E.querySelector(":scope>.header>.title").firstChild.data=i[a].title,window.frameElement&&window.frameElement.kernel&&"function"==typeof window.frameElement.kernel.getCurrentPopup&&"page"===window.frameElement.kernel.getCurrentPopup()&&window.frameElement.kernel.setPopupTitle(i[a].title);L.childNodes.length;)L.removeChild(L.firstChild);for(;k.childNodes.length;)k.removeChild(k.firstChild);i[a].onrightmenuclick?(L.href="function"==typeof i[a].onrightmenuclick?"javascript:;":i[a].onrightmenuclick,i[a].rightMenuDomContent&&L.appendChild(i[a].rightMenuDomContent),L.style.display=""):L.style.display="none",i[a].onleftmenuclick?(k.href="function"==typeof i[a].onleftmenuclick?"javascript:;":i[a].onleftmenuclick,i[a].leftMenuDomContent&&k.appendChild(i[a].leftMenuDomContent),k.style.display="",b.style.display="none"):k.style.display="none",o(v.getDefaultBack()),s=E.querySelector(":scope>.content>."+f),r?(E.classList.remove(r),l=r,c=i[l].alias?i[l].alias:l,r=a,f===c?n(!0):(h=v.isGoingback(l,a),u=!0,d(s,E.querySelector(":scope>.content>."+c),h,function(){u=!1,"function"==typeof i[c].onunloadend&&i[c].onunloadend(!h),"function"==typeof i[f].onloadend&&i[a].onloadend(!h),p&&(p=!1,s.style.visibility="visible",e())}),"function"==typeof i[c].onunload&&i[c].onunload(),"function"==typeof i[f].onload&&i[f].onload(!h||t))):(r=a,s.style.right=0,s.style.visibility="visible",n(!0))}else n()}})}function t(e,t){var n=i[r].alias?i[i[r].alias]:i[r];e&&("string"!=typeof e||e!==v.location.id)&&e.indexOf(v.location.id)<0||(t||v.clearPopup(),"function"==typeof n.onunload&&n.onunload(!0),"function"==typeof n.onunloadend&&n.onunloadend(!0),"function"==typeof n.onload&&n.onload(!0),"function"==typeof n.onloadend&&n.onloadend(!0))}function n(e){var t=i[r].alias?i[i[r].alias]:i[r];"function"==typeof t.onload&&t.onload(e),"function"==typeof t.onloadend&&t.onloadend()}function o(e){if(e&&e.id){var t=i[e.id].title;t||(t="返回"),b.lastChild.data=t,b.href=v.buildHash(e),b.style.display=""}else b.href="#!",b.style.display="none"}function s(){var t=v.parseHash(location.hash);v.isSameLocation(t,v.location)||(v.lastLocation=v.location,v.location=t,!i[v.location.id].back||v.lastLocation.id!==i[v.location.id].back&&i[v.lastLocation.id].alias!==i[v.location.id].back?i[v.lastLocation.id].backLoc&&(v.location.id===i[v.lastLocation.id].back||i[v.location.id].alias&&i[v.location.id].alias===i[v.lastLocation.id].back)&&(delete i[v.lastLocation.id].backLoc,delete c[v.lastLocation.id],sessionStorage.setItem("kernelHistory",JSON.stringify(c))):(c[v.location.id]=i[v.location.id].backLoc=v.lastLocation,sessionStorage.setItem("kernelHistory",JSON.stringify(c))),e())}var c,r,u,p,h,g,w,E=document.getElementById("page"),b=E.querySelector(":scope>.header>.back"),k=E.querySelector(":scope>.header>.leftMenuBtn"),L=E.querySelector(":scope>.header>.rightMenuBtn");try{sessionStorage.setItem(0,0),sessionStorage.removeItem(0)}catch(x){Storage.prototype.setItem=function(){}}v.init=function(t,n,o){var a,l=E.querySelector(":scope>.navMenu");if(!v.location){m=t,g=n,h=o,v.location=v.parseHash(location.hash),"clean"===v.location.args.ui&&document.body.classList.add("clean"),v.lastLocation={id:void 0,args:{}},c=sessionStorage.getItem("kernelHistory"),c=c?JSON.parse(c):{};for(a in c)a in i&&(i[a].backLoc=c[a]);for(window.addEventListener("hashchange",s,!1),w={};l.childNodes.length;)l.removeChild(l.childNodes[0]);for(a in g)a in i&&(w[a]=l.appendChild(document.createElement("a")),w[a].href="#!"+a,RegExp("^"+a+"(?:-|$)").test(v.location.id)?(w[a].className="selected",w[a].appendChild(v.makeSvg("object"==typeof g[a]?g[a].selected:g[a],!0))):w[a].appendChild(v.makeSvg("object"==typeof g[a]?g[a].normal:g[a],!0)),w[a].appendChild(document.createTextNode(i[a].title)));window.addEventListener("contextmenu","Firefox"===browser.name?y:f,!1),window.addEventListener("dragstart",f,!1),document.body.classList.remove("loading"),e(),"autopopup"in v.location.args&&v.openPopup(v.location.args.autopopup,v.location.args.autopopuparg?JSON.parse(v.location.args.autopopuparg):void 0)}},v.reloadPage=function(e,n){function o(s){v.listeners.remove(this,s.type,o),v.isSameLocation(i,v.location)&&t(e,n)}var i;v.isLoading()?(i=v.location,v.listeners.add(v.dialogEvents,"loaded",o)):t(e,n)},v.destoryPage=function(e){var t=i[e];t&&a(t,"page",e)},b.insertBefore(v.makeSvg("chevron-left"),b.firstChild),L.addEventListener("click",function(){"function"==typeof i[r].onrightmenuclick&&i[r].onrightmenuclick()},!1),k.addEventListener("click",function(){"function"==typeof i[r].onleftmenuclick&&i[r].onleftmenuclick()},!1)}(),v});