"use strict";define(["module","common/kernel/kernel","common/touchslider/touchslider"],function(e,o,t){function n(e,o){for(var t="",n=0;n<o;n++)t+=n===e?"●":"○";return t}var l=e.id.replace(/^[^\/]+\/|\/[^\/]+/g,""),r=document.querySelector("#page>.content>."+l),a=t(r.querySelector(".banner"));o.scrollReload(r),a.onchange=function(){r.querySelector(".nav").firstChild.data=n(this.current,this.children.length)};var g,c,i=[{img:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",href:"https://www.google.com/intl/en/about/",bg:"white"},{img:"https://assets.onestore.ms/cdnfiles/onestorerolling-1604-13000/shell/v3/images/logo/microsoft.png",href:"https://blogs.microsoft.com/",bg:"white"},{img:"http://www.apple.com/ac/globalnav/2.0/en_US/images/ac-globalnav/globalnav/apple/image_large.svg",href:"https://support.apple.com/",bg:"rgba(0,0,0,0.8)"}];for(g=0;g<i.length;g++)(c=document.createElement("a")).className="item",c.href="javascript:;",c.style.backgroundImage="url("+i[g].img+")",c.style.backgroundColor=i[g].bg,function(e,t){e.addEventListener("click",function(e){o.showForeign(t)},!1)}(c,i[g].href),a.add(c);return a.onchange(),{onload:function(e){a.startPlay(1e4)},onunload:function(){a.stopPlay()}}});