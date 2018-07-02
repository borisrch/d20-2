!function(e){var t={};function a(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=t,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(o,n,function(t){return e[t]}.bind(null,n));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=9)}([function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={playerHealth:0,playerArmour:0,playerDamage:0,playerRunic:0,playerMana:0,playerHitChanceModifier:0,monsterHealth:0,monsterArmour:0,monsterDamage:0,monsterRage:0,monsterName:null}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.DEV=!0},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.log=function(e,t){var a=function(e){switch(e){case"mb":return"log log-monster-basic animated slideInDown";case"ms":return"log log-monster-spell animated bounceIn";case"miss":return"log log-miss animated slideInDown";case"miss-player":return"log log-player-miss animated slideInDown";case"info":return"log log-info animated slideInDown";case"victory":return"log log-victory animated bounceInDown";case"defeat":return"log log-defeat animated bounceInDown";case"pb":return"log log-player-basic animated slideInDown";case"ps-scorch":return"log log-player-spell animated tada";case"ps-thunder":return"log log-player-spell animated flash";default:console.log("Error in styleHandler")}}(t),o=$(".list").children().length,n=$("<li>"+e+"</li>").addClass(a);o<7?$("ul.list").prepend(n):($(".list li").last().remove(),$("ul.list").prepend(n))}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.alzursThunderCondition={turns:0}},function(e,t,a){"use strict";a.r(t);var o,n,r,l,i,s=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},u=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),d=function(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)},c=(o=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],n=function(){function e(t){var a=t.targetModal,o=t.triggers,n=void 0===o?[]:o,r=t.onShow,l=void 0===r?function(){}:r,i=t.onClose,u=void 0===i?function(){}:i,c=t.openTrigger,f=void 0===c?"data-micromodal-trigger":c,m=t.closeTrigger,p=void 0===m?"data-micromodal-close":m,g=t.disableScroll,h=void 0!==g&&g,y=t.disableFocus,b=void 0!==y&&y,v=t.awaitCloseAnimation,k=void 0!==v&&v,w=t.debugMode,M=void 0!==w&&w;s(this,e),this.modal=document.getElementById(a),this.config={debugMode:M,disableScroll:h,openTrigger:f,closeTrigger:p,onShow:l,onClose:u,awaitCloseAnimation:k,disableFocus:b},n.length>0&&this.registerTriggers.apply(this,d(n)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}return u(e,[{key:"registerTriggers",value:function(){for(var e=this,t=arguments.length,a=Array(t),o=0;o<t;o++)a[o]=arguments[o];a.forEach(function(t){t.addEventListener("click",function(){return e.showModal()})})}},{key:"showModal",value:function(){this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add("is-open"),this.setFocusToFirstNode(),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.onShow(this.modal)}},{key:"closeModal",value:function(){var e=this.modal;this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement.focus(),this.config.onClose(this.modal),this.config.awaitCloseAnimation?this.modal.addEventListener("animationend",function t(){e.classList.remove("is-open"),e.removeEventListener("animationend",t,!1)},!1):e.classList.remove("is-open")}},{key:"scrollBehaviour",value:function(e){if(this.config.disableScroll){var t=document.querySelector("body");switch(e){case"enable":Object.assign(t.style,{overflow:"initial",height:"initial"});break;case"disable":Object.assign(t.style,{overflow:"hidden",height:"100vh"})}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}},{key:"onClick",value:function(e){e.target.hasAttribute(this.config.closeTrigger)&&(this.closeModal(),e.preventDefault())}},{key:"onKeydown",value:function(e){27===e.keyCode&&this.closeModal(e),9===e.keyCode&&this.maintainFocus(e)}},{key:"getFocusableNodes",value:function(){var e=this.modal.querySelectorAll(o);return Object.keys(e).map(function(t){return e[t]})}},{key:"setFocusToFirstNode",value:function(){if(!this.config.disableFocus){var e=this.getFocusableNodes();e.length&&e[0].focus()}}},{key:"maintainFocus",value:function(e){var t=this.getFocusableNodes();if(this.modal.contains(document.activeElement)){var a=t.indexOf(document.activeElement);e.shiftKey&&0===a&&(t[t.length-1].focus(),e.preventDefault()),e.shiftKey||a!==t.length-1||(t[0].focus(),e.preventDefault())}else t[0].focus()}}]),e}(),r=null,l=function(e){if(!document.getElementById(e))return console.warn("MicroModal v0.3.1: ❗Seems like you have missed %c'"+e+"'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'+e+'"></div>'),!1},i=function(e,t){if(function(e){if(e.length<=0)console.warn("MicroModal v0.3.1: ❗Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>')}(e),!t)return!0;for(var a in t)l(a);return!0},{init:function(e){var t=Object.assign({},{openTrigger:"data-micromodal-trigger"},e),a=[].concat(d(document.querySelectorAll("["+t.openTrigger+"]"))),o=function(e,t){var a=[];return e.forEach(function(e){var o=e.attributes[t].value;void 0===a[o]&&(a[o]=[]),a[o].push(e)}),a}(a,t.openTrigger);if(!0!==t.debugMode||!1!==i(a,o))for(var r in o){var l=o[r];t.targetModal=r,t.triggers=[].concat(d(l)),new n(t)}},show:function(e,t){var a=t||{};a.targetModal=e,!0===a.debugMode&&!1===l(e)||(r=new n(a)).showModal()},close:function(){r.closeModal()}});t.default=c},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.selectWeapon=void 0;var o,n=a(0),r=(o=n)&&o.__esModule?o:{default:o};t.selectWeapon=function(e){switch(e){case"oak-wand":r.default.playerRunic=2;default:r.default.playerRunic=2}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.manaCheck=void 0;var o,n=a(0),r=(o=n)&&o.__esModule?o:{default:o},l=a(2),i=a(1);t.manaCheck=function(e,t){i.DEV&&console.log("mana: "+r.default.playerMana+" cost: "+e),r.default.playerMana<e?(0,l.log)("Not enough PP to cast.","info"):t()}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.disable=function(){$(".basic-attack").prop("disabled",!0),$(".q").prop("disabled",!0),$(".w").prop("disabled",!0),$(".e").prop("disabled",!0),$(".r").prop("disabled",!0)},t.enable=function(){$(".basic-attack").prop("disabled",!1),$(".q").prop("disabled",!1),$(".w").prop("disabled",!1),$(".e").prop("disabled",!1),$(".r").prop("disabled",!1)}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getRandomInt=t.pureAttack=t.attack=t.bonus=t.roll=void 0;var o=a(1),n=a(3),r=t.roll=function(e){var t=Math.floor(e);return Math.floor(Math.random()*(t-1+1))+1};t.bonus=function(e,t){for(var a=0,o=0;o<e;o++)a+=r(t);return a},t.attack=function(e,t,a,l,i){var s=0;n.alzursThunderCondition.turns>0&&(s+=r(4),n.alzursThunderCondition.turns--),o.DEV&&(console.log("@Attack"),console.log("Damage: "+e+" HitChance: "+t+" DamageMod "+a+" Multiplier: "+l+" Armour: "+i),console.log("Extra Spell Damage: "+s));var u=0;if(r(20)+t>=i){for(var d=0;d<l;d++)u+=r(e);return(u+=a)+s}return null},t.pureAttack=function(e,t,a,n,l){o.DEV&&(console.log("@PureAttack"),console.log("Damage: "+e+" HitChance: "+t+" DamageMod "+a+" Multiplier: "+n+" Armour: "+l));var i=0;if(r(20)+t>=l){for(var s=0;s<n;s++)i+=r(e);return i+=a}return null},t.getRandomInt=function(e){return Math.floor(Math.random()*Math.floor(e))}},function(e,t,a){"use strict";var o=a(8),n=a(2),r=a(7),l=a(1),i=c(a(0)),s=a(6),u=a(3),d=a(5);c(a(4));function c(e){return e&&e.__esModule?e:{default:e}}l.DEV&&(0,n.log)("BUILD ALPHA 0.2.24 - Equipment","info");i.default.playerHealth;var f=i.default.playerArmour,m=(i.default.playerDamage,i.default.playerRunic,i.default.playerMana,i.default.monsterHealth,i.default.monsterArmour,i.default.monsterDamage,i.default.monsterRage,i.default.monsterName,{name:"Wormface, the Goblin",monsterArmour:15,monsterDamage:4,monsterRage:0,names:["Wormface","Grubhead","Fartbreath","Poopnose","Wormhair"],turn:function(){var e=(0,o.roll)(100);l.DEV&&(console.log("@GoblinTurn"),console.log("Goblin Abilty Chance "+e)),e>75?this.goblinSpit():this.basicAttack()},basicAttack:function(){var e=(0,o.pureAttack)(i.default.monsterDamage,0,0,1,f);null!=e?(g(e),(0,n.log)("Goblin hits for "+e+" damage!","mb")):(0,n.log)("Goblin missed.","miss"),y(e)},goblinSpit:function(){var e=(0,o.pureAttack)(i.default.monsterDamage,1,0,1,f);null!=e?(g(e),(0,n.log)("Goblin uses <i>Goblin Spit</i> for "+e+" damage!","ms")):(0,n.log)("Goblin missed.","miss"),y(e)}}),p=function(e){l.DEV&&console.log("@monsterHealthHelper result:"+e),i.default.monsterHealth-e<0?(i.default.monsterHealth=0,(0,n.log)("You have slain "+i.default.monsterName+"!","victory")):i.default.monsterHealth=i.default.monsterHealth-e},g=function(e){i.default.playerHealth-e<=0?(i.default.playerHealth=0,(0,n.log)("You died to "+b.name+"!","ms")):i.default.playerHealth=i.default.playerHealth-e},h=function(e){e&&$(".monster-health").addClass("animated jello"),i.default.playerMana+25>=100?i.default.playerMana=100:(i.default.playerMana=i.default.playerMana+25,$(".player-mana").addClass("colour-mana-add")),k(),(0,r.disable)(),setTimeout(function(){$(".monster-health").removeClass("animated jello")},500),setTimeout(function(){$(".player-mana").removeClass("colour-mana-add")},1e3),setTimeout(function(){b.turn(),setTimeout(function(){(0,r.enable)()},200)},1500)},y=function(e){e&&$(".player-health").addClass("animated jello"),k(),setTimeout(function(){$(".player-health").removeClass("animated jello")},500)},b=m,v=function(){i.default.playerHealth=100,i.default.playerDamage=10,i.default.playerArmour=8,i.default.playerRunic=2,i.default.playerMana=100,$(".q").addClass("spell spell-dragon-breath"),$(".qi").addClass("ra ra-dragon-breath icon"),$(".w").addClass("spell spell-lightning-trio"),$(".wi").addClass("ra ra-lightning-trio icon"),$(".e").addClass("spell spell-frostfire"),$(".ei").addClass("ra ra-frostfire icon"),$(".r").addClass("spell spell-fire-shield"),$(".ri").addClass("ra ra-fire-shield icon"),D.setContent('<span class="modal-title">Select Weapon</span>'),D.addFooterBtn("Oak Wand","equipment-icon",function(){(0,d.selectWeapon)("oak-wand"),k(),D.close()}),document.getElementById("basic-attack").addEventListener("click",function(){var e;null!=(e=(0,o.attack)(i.default.playerDamage,i.default.playerHitChanceModifier,0,1,i.default.monsterArmour))?((0,n.log)("You hit for "+e+" damage!","pb"),p(e)):(0,n.log)("You missed.","miss-player"),h(e)}),document.getElementById("q").addEventListener("click",function(){(0,s.manaCheck)(75,E)}),document.getElementById("w").addEventListener("click",function(){(0,s.manaCheck)(100,A)}),document.getElementById("equipment-weapon").addEventListener("click",function(){D.open()})},k=function(){$(".player-health").text(i.default.playerHealth),$(".player-damage").text(i.default.playerDamage),$(".player-armour").text(i.default.playerArmour),$(".player-runic").text(i.default.playerRunic),$(".player-mana").text(i.default.playerMana),$(".monster-health").text(i.default.monsterHealth),$(".monster-armour").text(i.default.monsterArmour),$(".monster-damage").text(i.default.monsterDamage),$(".monster-rage").text(i.default.monsterRage),$(".monster-label").text(i.default.monsterName)},w=function(){$(".player-damage-tip").prop("title","Damage attribute affects basic attack and spell damage."),tippy(".player-damage-tip");$(".player-armour-tip").prop("title","Armour class represents how hard it is for opponents to land an attack or spell on you."),tippy(".player-armour-tip");$(".player-runic-tip").prop("title","Runic attribute improves spells and their effects."),tippy(".player-runic-tip");$(".player-mana-tip").prop("title","PP represents the cost for casting spells. 25 PP is recharged per turn."),tippy(".player-mana-tip");$(".monster-rage-tip").prop("title","Rage is aquired over time, and allows Monsters to have additional spells and effects."),tippy(".monster-rage-tip")},M=function(){var e='<span class="ra ra-sword colour-damage-tip"></span>',t="<b>Basic Attack</b> - Deal 1d"+i.default.playerDamage+" "+e+" .";$(".basic-attack").prop("title",t),tippy(".basic-attack");$(".q").prop("title",'<b>Scorch (75 PP)</b> - Ignore 1d2 <span class="ra ra-shield colour-ac"></span> and deal 1d10 <span class="ra ra-sword colour-damage-tip"></span>. Ignore an additional 1d2 <span class="ra ra-shield colour-ac"></span> per <span class="ra ra-crystals colour-runic-tip"></span> level.'),tippy(".q");$(".w").prop("title",'<b>Alzur\'s Thunder (100 PP)</b> - Deal 2d4 <span class="ra ra-sword colour-damage-tip"></span> and apply <i>Shocked</i>. Shock deals bonus 1d4 <span class="ra ra-sword colour-damage-tip"></span> for <span class="ra ra-crystals colour-runic-tip"></span> turns.'),tippy(".w")},C=function(){i.default.monsterArmour=4,i.default.monsterDamage=4,i.default.monsterHealth=20,i.default.monsterRage=69,i.default.monsterName=m.name},E=function(){i.default.playerMana=i.default.playerMana-75;var e=(0,o.roll)(2),t=(0,o.bonus)(i.default.playerRunic,2),a=e+t;l.DEV&&(console.log("Scorch base AC-ignore roll: "+e),console.log("Scorch bonus AC-ignore roll: "+t));var r=(0,o.attack)(10,0,0,1,i.default.monsterArmour-a);null!=r?((0,n.log)("You <i>Scorch</i> for "+r+" damage!","ps-scorch"),p(r)):(0,n.log)("You missed Scorch!","miss-player"),h(r)},A=function(){i.default.playerMana=i.default.playerMana-100,l.DEV&&(console.log("@AlzursThunder"),console.log("Extra turns: "+u.alzursThunderCondition.turns));var e=(0,o.attack)(4,0,0,2,i.default.monsterArmour);u.alzursThunderCondition.turns=i.default.playerRunic,null!=e?((0,n.log)("You summon <i>Alzur's Thunder</i> for "+e+" damage!","ps-thunder"),p(e)):(0,n.log)("You missed Alzur's Thunder!","miss-player"),h(e)},D=new tingle.modal({footer:!0,stickyFooter:!1,closeMethods:["button","escape"],closeLabel:"Close",cssClass:["custom-class-1","custom-class-2"],onOpen:function(){},onClose:function(){},beforeClose:function(){return!0}});$(".character-selection").hide(),function(e){switch(w(),C(),e){case"warrior":case"ranger":break;case"mage":v(),M();break;default:console.log("Error in init")}k()}("mage");for(var T=0;T<100;T++);}]);