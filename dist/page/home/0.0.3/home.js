"use strict";define("page/home/home",["module","common/kernel/kernel","common/touchslider/touchslider"],function(e,t,n){function i(e,t){var n,i="●",o="○",s="";for(n=0;t>n;n++)s+=n===e?i:o;return s}function o(e,n){e.addEventListener("click",function(e){t.showForeign(n)},!1)}var s,l,r,a=e.id.replace(/^[^\/]+\/|\/[^\/]+/g,""),c=document.querySelector("#page>.content>."+a),d=n(c.querySelector(".banner"));for(t.scrollReload(c),d.onchange=function(){c.querySelector(".nav").firstChild.data=i(this.current,this.children.length)},r=[{img:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",href:"https://www.google.com/intl/en/about/",bg:"white"},{img:"https://assets.onestore.ms/cdnfiles/onestorerolling-1604-13000/shell/v3/images/logo/microsoft.png",href:"https://blogs.microsoft.com/",bg:"white"},{img:"http://www.apple.com/ac/globalnav/2.0/en_US/images/ac-globalnav/globalnav/apple/image_large.svg",href:"https://support.apple.com/",bg:"rgba(0,0,0,0.8)"}],s=0;s<r.length;s++)l=document.createElement("a"),l.className="item",l.href="javascript:;",l.style.backgroundImage="url("+r[s].img+")",l.style.backgroundColor=r[s].bg,o(l,r[s].href),d.add(l);return d.onchange(),{onload:function(e){d.startPlay(1e4)},onunload:function(){d.stopPlay()}}});