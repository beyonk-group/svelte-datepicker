var SvelteCalendar=function(){"use strict";function t(t,e){var n=arguments;if(null==t)throw new TypeError("Cannot convert first argument to object");for(var r=Object(t),o=1;o<arguments.length;o++){var i=n[o];if(null!=i)for(var s=Object.keys(Object(i)),a=0,c=s.length;a<c;a++){var h=s[a],l=Object.getOwnPropertyDescriptor(i,h);void 0!==l&&l.enumerable&&(r[h]=i[h])}}return r}var e=function(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:t})};function n(){}function r(t,e){for(var n in e)t[n]=e[n];return t}function o(t,e){for(var n in e)t[n]=1;return t}function i(t,e){return 0===e&&t(),function(){--e||t()}}function s(t){t()}function a(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n)}function h(t){t.parentNode.removeChild(t)}function l(t,e){for(;t.firstChild;)e.appendChild(t.firstChild)}function u(t,e){for(var n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(){return document.createDocumentFragment()}function d(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function g(t,e,n,r){t.addEventListener(e,n,r)}function v(t,e,n,r){t.removeEventListener(e,n,r)}function p(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function y(t,e){t.data=""+e}function b(t,e,n){t.style.setProperty(e,n)}function _(t,e,n){t.classList[n?"add":"remove"](e)}function M(){return Object.create(null)}function k(t){t._lock=!0,w(t._beforecreate),w(t._oncreate),w(t._aftercreate),t._lock=!1}function D(t,e){t._handlers=M(),t._slots=M(),t._bind=e._bind,t._staged={},t.options=e,t.root=e.root||t,t.store=e.store||t.root.store,e.root||(t._beforecreate=[],t._oncreate=[],t._aftercreate=[])}function w(t){for(;t&&t.length;)t.shift()()}var O={destroy:function(t){this.destroy=n,this.fire("destroy"),this.set=n,this._fragment.d(!1!==t),this._fragment=null,this._state={}},get:function(){return this._state},fire:function(t,e){var n=t in this._handlers&&this._handlers[t].slice();if(n)for(var r=0;r<n.length;r+=1){var o=n[r];if(!o.__calling)try{o.__calling=!0,o.call(this,e)}finally{o.__calling=!1}}},on:function(t,e){var n=this._handlers[t]||(this._handlers[t]=[]);return n.push(e),{cancel:function(){var t=n.indexOf(e);~t&&n.splice(t,1)}}},set:function(t){this._set(r({},t)),this.root._lock||k(this.root)},_recompute:n,_set:function(t){var e=this._state,n={},o=!1;for(var i in t=r(this._staged,t),this._staged={},t)this._differs(t[i],e[i])&&(n[i]=o=!0);o&&(this._state=r(r({},e),t),this._recompute(n,this._state),this._bind&&this._bind(n,this._state),this._fragment&&(this.fire("state",{changed:n,current:this._state,previous:e}),this._fragment.p(n,this._state),this.fire("update",{changed:n,current:this._state,previous:e})))},_stage:function(t){r(this._staged,t)},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:function(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}},S=[{name:"January",abbrev:"Jan"},{name:"February",abbrev:"Feb"},{name:"March",abbrev:"Mar"},{name:"April",abbrev:"Apr"},{name:"May",abbrev:"May"},{name:"June",abbrev:"Jun"},{name:"July",abbrev:"Jul"},{name:"August",abbrev:"Aug"},{name:"September",abbrev:"Sep"},{name:"October",abbrev:"Oct"},{name:"November",abbrev:"Nov"},{name:"December",abbrev:"Dec"}],x=[{name:"Sunday",abbrev:"Sun"},{name:"Monday",abbrev:"Mon"},{name:"Tuesday",abbrev:"Tue"},{name:"Wednesday",abbrev:"Wed"},{name:"Thursday",abbrev:"Thu"},{name:"Friday",abbrev:"Fri"},{name:"Saturday",abbrev:"Sat"}],N=function(t,e,n){var r=new Date(e,t,1);r.setDate(r.getDate()-r.getDay());for(var o=11==t?0:t+1,i=[];r.getMonth()!=o||0!=r.getDay()||6!=i.length;)0==r.getDay()&&i.unshift({days:[]}),i[0].days.push(Object.assign({},{partOfMonth:r.getMonth()==t,date:new Date(r)},n(r))),r.setDate(r.getDate()+1);return i.reverse(),{month:t,year:e,weeks:i}},C=function(t,e){var n=new Date;return n.setHours(0,0,0,0),function(r){return{selectable:r>=t&&r<=e,isToday:r.getTime()==n.getTime()}}};var T=function(t,e,n){return t.replace(new RegExp("#{"+e+"}","g"),n)},Y=function(t,e,n){if(t=t.toString(),void 0===e)return t;if(t.length==e)return t;if(n=void 0!==n&&n,t.length<e)for(;e-t.length>0;)t="0"+t;else t.length>e&&(t=n?t.substring(t.length-e):t.substring(0,e));return t},j={daysOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthsOfYear:["January","February","March","April","May","June","July","August","September","October","November","December"]},I=[{key:"d",method:function(t){return Y(t.getDate(),2)}},{key:"D",method:function(t){return Y(j.daysOfWeek[t.getDay()],3)}},{key:"j",method:function(t){return t.getDate()}},{key:"l",method:function(t){return j.daysOfWeek[t.getDay()]}},{key:"F",method:function(t){return j.monthsOfYear[t.getMonth()]}},{key:"m",method:function(t){return Y(t.getMonth()+1,2)}},{key:"M",method:function(t){return Y(j.monthsOfYear[t.getMonth()],3)}},{key:"n",method:function(t){return t.getMonth()+1}},{key:"Y",method:function(t){return t.getFullYear()}},{key:"y",method:function(t){return Y(t.getFullYear(),2,!0)}}],F=[{key:"a",method:function(t){return t.getHours()>11?"pm":"am"}},{key:"A",method:function(t){return t.getHours()>11?"PM":"AM"}},{key:"g",method:function(t){return t.getHours()%12||12}},{key:"G",method:function(t){return t.getHours()}},{key:"h",method:function(t){return Y(t.getHours()%12||12,2)}},{key:"H",method:function(t){return Y(t.getHours(),2)}},{key:"i",method:function(t){return Y(t.getMinutes(),2)}},{key:"s",method:function(t){return Y(t.getSeconds(),2)}}],H=function(t,e){return void 0===e&&(e="#{m}/#{d}/#{Y}"),I.forEach(function(n){-1!=e.indexOf("#{"+n.key+"}")&&(e=T(e,n.key,n.method(t)))}),F.forEach(function(n){-1!=e.indexOf("#{"+n.key+"}")&&(e=T(e,n.key,n.method(t)))}),e},E={left:37,up:38,right:39,down:40,pgup:33,pgdown:34,enter:13,escape:27,tab:9},L=Object.keys(E).map(function(t){return E[t]});function A(t,e){return t.getDate()==e.getDate()&&t.getMonth()==e.getMonth()&&t.getFullYear()==e.getFullYear()}function W(t){var e=this._svelte,n=e.component,r=e.ctx;n.fire("dateSelected",r.day.date)}function V(t,e,n){var r=Object.create(t);return r.day=e[n],r}function J(t,e){var n,r,o,i,s=e.day.date.getDate();return{c:function(){n=d("div"),r=d("button"),o=m(s),i=m("\r\n    "),r.className="day--label svelte-a1dw5x",_(r,"selected",!0===A(e.day.date,e.selected)),n._svelte={component:t,ctx:e},g(n,"click",W),n.className="day svelte-a1dw5x",_(n,"outside-month",!e.day.partOfMonth),_(n,"is-today",e.day.isToday)},m:function(t,e){c(t,n,e),a(n,r),a(r,o),a(n,i)},p:function(t,i){e=i,t.days&&s!==(s=e.day.date.getDate())&&y(o,s),(t.days||t.selected)&&_(r,"selected",!0===A(e.day.date,e.selected)),n._svelte.ctx=e,t.days&&(_(n,"outside-month",!e.day.partOfMonth),_(n,"is-today",e.day.isToday))},d:function(t){t&&h(n),v(n,"click",W)}}}function P(t){D(this,t),this._state=r({},t.data),this._intro=!!t.intro,this._fragment=function(t,e){for(var n,r,o=e.days,i=[],a=0;a<o.length;a+=1)i[a]=J(t,V(e,o,a));return{c:function(){n=d("div");for(var t=0;t<i.length;t+=1)i[t].c();n.className="week svelte-a1dw5x"},m:function(t,e){c(t,n,e);for(var o=0;o<i.length;o+=1)i[o].m(n,null);r=!0},p:function(e,r){if(e.days||e.selected){o=r.days;for(var s=0;s<o.length;s+=1){var a=V(r,o,s);i[s]?i[s].p(e,a):(i[s]=J(t,a),i[s].c(),i[s].m(n,null))}for(;s<i.length;s+=1)i[s].d(1);i.length=o.length}},i:function(t,e){r||this.m(t,e)},o:s,d:function(t){t&&h(n),u(i,t)}}}(this,this._state),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor)),this._intro=!0}function X(t,e,n){var r=Object.create(t);return r.week=e[n],r}function B(t,e){var n,r={days:e.week.days,selected:e.selected},o=new P({root:t.root,store:t.store,data:r});return o.on("dateSelected",function(e){t.fire("dateSelected",e)}),{c:function(){o._fragment.c()},m:function(t,e){o._mount(t,e),n=!0},p:function(t,e){var n={};t.visibleMonth&&(n.days=e.week.days),t.selected&&(n.selected=e.selected),o._set(n)},i:function(t,e){n||this.m(t,e)},o:function(t){n&&(o&&o._fragment.o(t),n=!1)},d:function(t){o.destroy(t)}}}function z(t){D(this,t),this._state=r({monthDict:S},t.data),this._intro=!!t.intro,this._fragment=function(t,e){for(var n,r,o=e.visibleMonth.weeks,s=[],a=0;a<o.length;a+=1)s[a]=B(t,X(e,o,a));function l(t,e,n){s[t]&&s[t].o(function(){e&&(s[t].d(e),s[t]=null),n&&n()})}return{c:function(){n=d("div");for(var t=0;t<s.length;t+=1)s[t].c();n.className="month-container svelte-m2exrs"},m:function(t,e){c(t,n,e);for(var o=0;o<s.length;o+=1)s[o].i(n,null);r=!0},p:function(e,r){if(e.visibleMonth||e.selected){o=r.visibleMonth.weeks;for(var i=0;i<o.length;i+=1){var a=X(r,o,i);s[i]?s[i].p(e,a):(s[i]=B(t,a),s[i].c()),s[i].i(n,null)}for(;i<s.length;i+=1)l(i,1)}},i:function(t,e){r||this.m(t,e)},o:function(t){if(r){for(var e=i(t,(s=s.filter(Boolean)).length),n=0;n<s.length;n+=1)l(n,0,e);r=!1}},d:function(t){t&&h(n),u(s,t)}}}(this,this._state),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),k(this)),this._intro=!0}r(P.prototype,O),r(z.prototype,O);function K(t){var e=this._svelte,n=e.component,r=e.ctx;n.monthSelected(t,r.index)}function R(t,e,n){var r=Object.create(t);return r.monthDefinition=e[n],r.index=n,r}function G(t,e){var n,r,o,i,s=e.monthDefinition.abbrev;return{c:function(){n=d("div"),r=d("span"),o=m(s),i=m("\r\n      "),r.className="svelte-nk6n96",n._svelte={component:t,ctx:e},g(n,"click",K),n.className="month-selector--month svelte-nk6n96",_(n,"selected",e.index==e.month)},m:function(t,e){c(t,n,e),a(n,r),a(r,o),a(n,i)},p:function(t,r){e=r,t.monthDict&&s!==(s=e.monthDefinition.abbrev)&&y(o,s),n._svelte.ctx=e,t.month&&_(n,"selected",e.index==e.month)},d:function(t){t&&h(n),v(n,"click",K)}}}function q(t){D(this,t),this._state=r({monthDict:S,monthSelectorOpen:!1},t.data),this._intro=!!t.intro,this._fragment=function(t,e){var n,r,o,i,l,f,p,b,M,k,D,w,O,S=e.monthDict[e.month].name;function x(e){t.fire("incrementMonth",-1)}function N(e){t.toggleMonthSelectorOpen()}function C(e){t.fire("incrementMonth",1)}for(var T=e.monthDict,Y=[],j=0;j<T.length;j+=1)Y[j]=G(t,R(e,T,j));return{c:function(){n=d("div"),r=d("div"),(o=d("div")).innerHTML='<i class="arrow left svelte-nk6n96"></i>',i=m("\r\n    "),l=d("div"),f=m(S),p=m(" "),b=m(e.year),M=m(" \r\n    "),(k=d("div")).innerHTML='<i class="arrow right svelte-nk6n96"></i>',D=m("\r\n  "),w=d("div");for(var t=0;t<Y.length;t+=1)Y[t].c();g(o,"click",x),o.className="control svelte-nk6n96",_(o,"enabled",e.canDecrementMonth),g(l,"click",N),l.className="label svelte-nk6n96",g(k,"click",C),k.className="control svelte-nk6n96",_(k,"enabled",e.canIncrementMonth),r.className="heading-section svelte-nk6n96",w.className="month-selector svelte-nk6n96",_(w,"open",e.monthSelectorOpen),n.className="title"},m:function(t,e){c(t,n,e),a(n,r),a(r,o),a(r,i),a(r,l),a(l,f),a(l,p),a(l,b),a(r,M),a(r,k),a(n,D),a(n,w);for(var s=0;s<Y.length;s+=1)Y[s].m(w,null);O=!0},p:function(e,n){if(e.canDecrementMonth&&_(o,"enabled",n.canDecrementMonth),(e.monthDict||e.month)&&S!==(S=n.monthDict[n.month].name)&&y(f,S),e.year&&y(b,n.year),e.canIncrementMonth&&_(k,"enabled",n.canIncrementMonth),e.month||e.monthDict){T=n.monthDict;for(var r=0;r<T.length;r+=1){var i=R(n,T,r);Y[r]?Y[r].p(e,i):(Y[r]=G(t,i),Y[r].c(),Y[r].m(w,null))}for(;r<Y.length;r+=1)Y[r].d(1);Y.length=T.length}e.monthSelectorOpen&&_(w,"open",n.monthSelectorOpen)},i:function(t,e){O||this.m(t,e)},o:s,d:function(t){t&&h(n),v(o,"click",x),v(l,"click",N),v(k,"click",C),u(Y,t)}}}(this,this._state),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor)),this._intro=!0}function Q(t){if(this.get().open){var e=t.target;do{if(e==this.refs.popover)return}while(e=e.parentNode);this.close()}}r(q.prototype,O),r(q.prototype,{toggleMonthSelectorOpen:function(){var t=this.get().monthSelectorOpen;t=!t,this.set({monthSelectorOpen:t})},monthSelected:function(t,e){t.stopPropagation(),this.fire("monthSelected",e),this.toggleMonthSelectorOpen()}});var U={getDistanceToEdges:function(){var t=this.get().open;t||this.set({open:!0});var e=this.get(),n=e.translateX,r=e.translateY,o=this.refs.contentsWrapper,i=(o.offsetWidth,o.offsetHeight,o.getBoundingClientRect());return t||this.set({open:!1}),{top:i.top+-1*r,bottom:window.innerHeight-i.bottom+r,left:i.left+-1*n,right:document.body.clientWidth-i.right+n}},getTranslate:function(){var t,e=this.get().w,n=this.getDistanceToEdges();return t=e<480?n.bottom:n.top<0?Math.abs(n.top):n.bottom<0?n.bottom:0,{translateX:n.left<0?Math.abs(n.left):n.right<0?n.right:0,translateY:t}},open:function(){this.set(Object.assign({},{open:!0},this.getTranslate())),this.fire("opened")},close:function(){var t=this;this.set({shrink:!0}),function(t,e,n){t.addEventListener(e,function r(){n.apply(this,arguments),t.removeEventListener(e,r)})}(this.refs.contentsAnimated,"animationend",function(){t.set({shrink:!1,open:!1}),t.fire("closed")})}};function Z(){document.removeEventListener("click",Q)}function $(t){var e=this;D(this,t),this.refs={},this._state=r({open:!1,shrink:!1,translateY:0,translateX:0},t.data),this._state.w=window.innerWidth,this._intro=!!t.intro,this._handlers.destroy=[Z],this._slotted=t.slots||{},this._fragment=function(t,e){var n,r,o,i,u,f,p,y=t._slotted.trigger,M=t._slotted.contents;function k(e){t.set({w:this.innerWidth})}function D(e){t.open()}return window.addEventListener("resize",k),{c:function(){n=d("div"),r=d("div"),o=m("\r\n  "),i=d("div"),u=d("div"),f=d("div"),g(r,"click",D),r.className="trigger",f.className="contents-inner svelte-1d67j1i",u.className="contents svelte-1d67j1i",i.className="contents-wrapper svelte-1d67j1i",b(i,"transform","translate(-50%,-50%) translate("+e.translateX+"px, "+e.translateY+"px)"),_(i,"visible",e.open),_(i,"shrink",e.shrink),n.className="popover svelte-1d67j1i"},m:function(e,s){c(e,n,s),a(n,r),y&&a(r,y),t.refs.triggerContainer=r,a(n,o),a(n,i),a(i,u),a(u,f),M&&a(f,M),t.refs.contentsAnimated=u,t.refs.contentsWrapper=i,t.refs.popover=n,p=!0},p:function(t,e){(t.translateX||t.translateY)&&b(i,"transform","translate(-50%,-50%) translate("+e.translateX+"px, "+e.translateY+"px)"),t.open&&_(i,"visible",e.open),t.shrink&&_(i,"shrink",e.shrink)},i:function(t,e){p||this.m(t,e)},o:s,d:function(e){window.removeEventListener("resize",k),e&&h(n),y&&l(r,y),v(r,"click",D),t.refs.triggerContainer===r&&(t.refs.triggerContainer=null),M&&l(f,M),t.refs.contentsAnimated===u&&(t.refs.contentsAnimated=null),t.refs.contentsWrapper===i&&(t.refs.contentsWrapper=null),t.refs.popover===n&&(t.refs.popover=null)}}}(this,this._state),this.root._oncreate.push(function(){(function(){document.addEventListener("click",Q.bind(this));var t=this.get().trigger;t&&this.refs.triggerContainer.appendChild(t.parentNode.removeChild(t))}).call(e),e.fire("update",{changed:o({},e._state),current:e._state})}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),k(this)),this._intro=!0}function tt(t){return function(t,e){t.setHours(0,0,0,0),e.setHours(0,0,0,0);for(var n=new Date(e.getFullYear(),e.getMonth()+1,1),r=[],o=new Date(t.getFullYear(),t.getMonth(),1),i=C(t,e);o<n;)r.push(N(o.getMonth(),o.getFullYear(),i)),o.setMonth(o.getMonth()+1);return r}(t.start,t.end)}r($.prototype,O),r($.prototype,U),(new Date).setHours(0,0,0,0);var et={changeMonth:function(t){this.set({month:t})},incrementMonth:function(t,e){var n=this.get(),r=n.canIncrementMonth,o=n.canDecrementMonth,i=n.month,s=n.year;if((1!=t||r)&&(-1!=t||o)){var a=new Date(s,i,1);a.setMonth(a.getMonth()+t),i=a.getMonth(),s=a.getFullYear();var c=new Date(s,i,e||1);this.set({selected:c,month:i,year:s})}},incrementDay:function(t){var e=this.get(),n=e.selected,r=(e.visibleMonth,e.firstVisibleDate),o=e.lastVisibleDate;return(n=new Date(n)).setDate(n.getDate()+t),t>0&&n>o?this.incrementMonth(1,n.getDate()):t<0&&n<r?this.incrementMonth(-1,n.getDate()):void this.set({selected:n})},handleKeyPress:function(t){if(-1!=L.indexOf(t.keyCode))switch(t.preventDefault(),t.keyCode){case E.left:this.incrementDay(-1);break;case E.up:this.incrementDay(-7);break;case E.right:this.incrementDay(1);break;case E.down:this.incrementDay(7);break;case E.pgup:this.incrementMonth(-1);break;case E.pgdown:this.incrementMonth(1);break;case E.escape:case E.enter:var e=this.get().selected;this.registerSelection(e)}},registerSelection:function(t){var e=this.get(),n=e.trigger,r=e.formattedSelected;this.refs.popover.close(),this.set({selected:t,dateChosen:!0}),this.assignValueToTrigger(n,r)},assignValueToTrigger:function(t,e){t&&this.get().assignmentHandler(t,e)},registerOpen:function(){var t=this.get().selected,e=this.handleKeyPress.bind(this);this.set({keydownListener:e,month:t.getMonth(),year:t.getFullYear()}),document.addEventListener("keydown",e)},registerClose:function(){var t=this.get().keydownListener;document.removeEventListener("keydown",t)}};function nt(t,e,n){var r=Object.create(t);return r.day=e[n],r}function rt(t,e){var n,r;return{c:function(){n=d("button"),r=m(e.formattedSelected),n.className="calendar-button svelte-app904"},m:function(t,e){c(t,n,e),a(n,r)},p:function(t,e){t.formattedSelected&&y(r,e.formattedSelected)},d:function(t){t&&h(n)}}}function ot(t,e){var n,r,o=e.day.abbrev;return{c:function(){n=d("span"),r=m(o),n.className="svelte-app904"},m:function(t,e){c(t,n,e),a(n,r)},p:function(t,e){t.dayDict&&o!==(o=e.day.abbrev)&&y(r,o)},d:function(t){t&&h(n)}}}function it(t){var e,n=this;D(this,t),this.refs={},this._state=r({today:e=new Date,dayDict:x,format:"#{m}/#{d}/#{Y}",start:new Date(1987,9,29),end:new Date(2020,9,29),selected:e,dateChosen:!1,month:e.getMonth(),year:e.getFullYear(),trigger:null,assignmentHandler:function(t,e){t.innerHTML=e}},t.data),this._recompute({start:1,end:1,month:1,year:1,months:1,monthIndex:1,visibleMonth:1,selected:1,format:1},this._state),this._intro=!!t.intro,this._slotted=t.slots||{},this._fragment=function(t,e){var n,r,o,s,g,v,y,b,M,k=t._slotted.default,D={},w=!e.trigger&&rt(0,e),O={month:e.month,year:e.year,canIncrementMonth:e.canIncrementMonth,canDecrementMonth:e.canDecrementMonth},S=new q({root:t.root,store:t.store,data:O});S.on("monthSelected",function(e){t.changeMonth(e)}),S.on("incrementMonth",function(e){t.incrementMonth(e)});for(var x=e.dayDict,N=[],C=0;C<x.length;C+=1)N[C]=ot(0,nt(e,x,C));var T={visibleMonth:e.visibleMonth,selected:e.selected},Y=new z({root:t.root,store:t.store,data:T});Y.on("dateSelected",function(e){t.registerSelection(e)});var j={trigger:e.trigger};void 0!==e.isOpen&&(j.open=e.isOpen,D.open=!0),void 0!==e.isClosing&&(j.shrink=e.isClosing,D.shrink=!0);var I=new $({root:t.root,store:t.store,slots:{default:f(),contents:f(),trigger:f()},data:j,_bind:function(e,n){var r={};!D.open&&e.open&&(r.isOpen=n.open),!D.shrink&&e.shrink&&(r.isClosing=n.shrink),t._set(r),D={}}});return t.root._beforecreate.push(function(){I._bind({open:1,shrink:1},I.get())}),I.on("opened",function(e){t.registerOpen(e)}),I.on("closed",function(e){t.registerClose(e)}),t.refs.popover=I,{c:function(){n=d("div"),r=d("div"),k||w&&w.c(),o=m("\r\n    "),s=d("div"),g=d("div"),S._fragment.c(),v=m("\r\n        "),y=d("div");for(var t=0;t<N.length;t+=1)N[t].c();b=m("\r\n        "),Y._fragment.c(),I._fragment.c(),p(r,"slot","trigger"),r.className="svelte-app904",y.className="legend svelte-app904",g.className="calendar svelte-app904",p(s,"slot","contents"),s.className="svelte-app904",n.className="datepicker svelte-app904",_(n,"open",e.isOpen),_(n,"closing",e.isClosing)},m:function(t,e){c(t,n,e),a(I._slotted.trigger,r),k?a(r,k):w&&w.m(r,null),a(I._slotted.default,o),a(I._slotted.contents,s),a(s,g),S._mount(g,null),a(g,v),a(g,y);for(var i=0;i<N.length;i+=1)N[i].m(y,null);a(g,b),Y._mount(g,null),I._mount(n,null),M=!0},p:function(t,o){e=o,k||(e.trigger?w&&(w.d(1),w=null):w?w.p(t,e):((w=rt(0,e)).c(),w.m(r,null)));var i={};if(t.month&&(i.month=e.month),t.year&&(i.year=e.year),t.canIncrementMonth&&(i.canIncrementMonth=e.canIncrementMonth),t.canDecrementMonth&&(i.canDecrementMonth=e.canDecrementMonth),S._set(i),t.dayDict){x=e.dayDict;for(var s=0;s<x.length;s+=1){var a=nt(e,x,s);N[s]?N[s].p(t,a):(N[s]=ot(0,a),N[s].c(),N[s].m(y,null))}for(;s<N.length;s+=1)N[s].d(1);N.length=x.length}var c={};t.visibleMonth&&(c.visibleMonth=e.visibleMonth),t.selected&&(c.selected=e.selected),Y._set(c);var h={};t.trigger&&(h.trigger=e.trigger),!D.open&&t.isOpen&&(h.open=e.isOpen,D.open=void 0!==e.isOpen),!D.shrink&&t.isClosing&&(h.shrink=e.isClosing,D.shrink=void 0!==e.isClosing),I._set(h),D={},t.isOpen&&_(n,"open",e.isOpen),t.isClosing&&_(n,"closing",e.isClosing)},i:function(t,e){M||this.m(t,e)},o:function(t){M&&(t=i(t,3),S&&S._fragment.o(t),Y&&Y._fragment.o(t),I&&I._fragment.o(t),M=!1)},d:function(e){e?(h(n),w&&w.d()):l(r,k),S.destroy(),u(N,e),Y.destroy(),I.destroy(),t.refs.popover===I&&(t.refs.popover=null)}}}(this,this._state),this.root._oncreate.push(function(){(function(){var t=this.get().selected;this.set({month:t.getMonth(),year:t.getFullYear()})}).call(n),n.fire("update",{changed:o({},n._state),current:n._state})}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),k(this)),this._intro=!0}return r(it.prototype,O),r(it.prototype,et),it.prototype._recompute=function(t,e){(t.start||t.end)&&this._differs(e.months,e.months=tt(e))&&(t.months=!0),(t.month||t.year||t.months)&&this._differs(e.monthIndex,e.monthIndex=function(t){for(var e=t.month,n=t.year,r=t.months,o=0;o<r.length;++o)if(r[o].month==e&&r[o].year==n)return o;return 0}(e))&&(t.monthIndex=!0),(t.monthIndex||t.months)&&this._differs(e.visibleMonth,e.visibleMonth=function(t){var e=t.monthIndex;return t.months[e]}(e))&&(t.visibleMonth=!0),t.visibleMonth&&(this._differs(e.lastVisibleDate,e.lastVisibleDate=function(t){var e=t.visibleMonth;return e.weeks[e.weeks.length-1].days[6].date}(e))&&(t.lastVisibleDate=!0),this._differs(e.firstVisibleDate,e.firstVisibleDate=e.visibleMonth.weeks[0].days[0].date)&&(t.firstVisibleDate=!0)),(t.monthIndex||t.months)&&(this._differs(e.canIncrementMonth,e.canIncrementMonth=function(t){return t.monthIndex<t.months.length-1}(e))&&(t.canIncrementMonth=!0),this._differs(e.canDecrementMonth,e.canDecrementMonth=function(t){var e=t.monthIndex;return t.months,e>0}(e))&&(t.canDecrementMonth=!0)),(t.selected||t.format)&&this._differs(e.formattedSelected,e.formattedSelected=function(t){var e=t.selected,n=t.format;return H(e,n)}(e))&&(t.formattedSelected=!0)},e(),it}();
//# sourceMappingURL=bundle.js.map
