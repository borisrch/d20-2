!function(e){var a={};function r(l){if(a[l])return a[l].exports;var n=a[l]={i:l,l:!1,exports:{}};return e[l].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,a,l){r.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:l})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,a){if(1&a&&(e=r(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(r.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var n in e)r.d(l,n,function(a){return e[a]}.bind(null,n));return l},r.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(a,"a",a),a},r.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},r.p="",r(r.s=38)}({38:function(e,a,r){"use strict";(0,r(39).buildClassPanel)()},39:function(e,a,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.buildClassPanel=void 0;var l=r(40),n=function(e){var a=document.createElement("div");a.className="class-panel",a.id=e.id;var r=document.createElement("img");r.src=e.src,r.className="class-background";var l=document.createElement("div");l.className="class-title",l.innerText=e.title;var n=document.createElement("div");n.className="class-spells",e.spells.forEach(function(e){var a=document.createElement("div");a.className=e.button,a.id=e.name;var r=document.createElement("span");r.className=e.icon,a.appendChild(r),n.appendChild(a)});var t=document.createElement("div");t.className="class-description",t.innerText=e.desc;var s=document.createElement("div");s.className="stat-group",e.stats.forEach(function(e){var a=document.createElement("span");a.classList.add("stat-icon","ra");var r=document.createElement("div");r.className="bar";var l=document.createElement("div");l.classList.add("fill"),"ac"==e.icon?(a.classList.add("ra-shield","colour-ac"),l.classList.add("fill-ac")):"damage"==e.icon?(a.classList.add("ra-sword","colour-damage-tip"),l.classList.add("fill-damage")):"runic"==e.icon&&(a.classList.add("ra-crystals","colour-runic-tip"),l.classList.add("fill-runic")),l.setAttribute("style","width: "+e.fill+"%"),s.appendChild(a),r.appendChild(l),s.appendChild(r)}),a.appendChild(r),a.appendChild(l),a.appendChild(n),a.appendChild(t),a.appendChild(s),document.getElementById("class-container").appendChild(a)};a.buildClassPanel=function(){var e=document.getElementById("character-selection"),a=document.createElement("div");a.id="class-container",a.className="class-container",e.appendChild(a),n(l.wizard),n(l.ranger)}},40:function(e,a,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.wizard={id:"wizard",src:"res/platform/bg.png",title:"wizard",desc:"Wizards are offensive casters that excel through their powerful spells.",spells:[{button:"class-spell spell-dragon-breath",icon:"ra ra-dragon-breath icon",id:"scorch"},{button:"class-spell spell-lightning-trio",icon:"ra ra-lightning-trio icon",id:"alzur-thunder"},{button:"class-spell spell-frostfire",icon:"ra ra-frostfire icon",id:"malevolence"},{button:"class-spell spell-fire-shield",icon:"ra ra-fire-shield icon",id:"runic-echoes"}],stats:[{icon:"ac",fill:50},{icon:"damage",fill:25},{icon:"runic",fill:75}]},a.ranger={id:"ranger",src:"res/platform/bg.png",title:"ranger",desc:"Rangers are offensive casters that excel through their powerful spells.",spells:[{button:"class-spell spell-archer",icon:"ra ra-archer icon",name:"snipe"},{button:"class-spell spell-arrow-flights",icon:"ra ra-arrow-flights icon",name:"rapid-fire"},{button:"class-spell spell-chemical-arrow",icon:"ra ra-chemical-arrow icon",name:"snapshot"},{button:"class-spell spell-supersonic-arrow",icon:"ra ra-supersonic-arrow icon",name:"auriel-arrow"}],stats:[{icon:"ac",fill:50},{icon:"damage",fill:75},{icon:"runic",fill:25}]},a.knight={id:"knight",src:"res/platform/bg.png",title:"ranger",desc:"Rangers are offensive casters that excel through their powerful spells.",spells:[{button:"class-spell spell-archer",icon:"ra ra-archer icon",name:"snipe"},{button:"class-spell spell-arrow-flights",icon:"ra ra-arrow-flights icon",name:"rapid-fire"},{button:"class-spell spell-chemical-arrow",icon:"ra ra-chemical-arrow icon",name:"snapshot"},{button:"class-spell spell-supersonic-arrow",icon:"ra ra-supersonic-arrow icon",name:"auriel-arrow"}],stats:[{icon:"ac",fill:50},{icon:"damage",fill:75},{icon:"runic",fill:25}]}}});
//# sourceMappingURL=menu.bundle.js.map