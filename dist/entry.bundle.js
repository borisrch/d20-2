!function(e){var a={};function t(o){if(a[o])return a[o].exports;var n=a[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=a,t.d=function(e,a,o){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var n in e)t.d(o,n,function(a){return e[a]}.bind(null,n));return o},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=9)}([function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={playerHealth:0,playerArmour:0,playerDamage:0,playerRunic:0,playerMana:0,playerHitChanceModifier:0,playerLevel:0,playerClass:"null",playerMaxMana:100,monsterHealth:0,monsterArmour:0,monsterDamage:0,monsterRage:0,monsterName:null}},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.alzursThunderCondition={turns:0},a.deathfireGraspCondition={active:!1},a.runicEchoesCondition={active:!1,bonusArmour:0},a.sapphireAmuletCondition={active:!1}},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.DEV=!0},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.log=function(e,a){var t=function(e){switch(e){case"mb":return"log log-monster-basic animated slideInDown";case"ms":return"log log-monster-spell animated bounceIn";case"miss":return"log log-miss animated slideInDown";case"miss-player":return"log log-player-miss animated slideInDown";case"info":return"log log-info animated slideInDown";case"victory":return"log log-victory animated bounceInDown";case"defeat":return"log log-defeat animated bounceInDown";case"pb":return"log log-player-basic animated slideInDown";case"ps-scorch":return"log log-player-spell animated tada";case"ps-thunder":return"log log-player-spell animated flash";case"ps-grasp":return"log log-player-spell animated swing";case"ps-echoes":return"log log-player-spell animated slideInDown";default:console.log("Error in styleHandler")}}(a),o=$(".list").children().length,n=$("<li>"+e+"</li>").addClass(t);o<8?$("ul.list").prepend(n):($(".list li").last().remove(),$("ul.list").prepend(n))}},function(e,a,t){"use strict";t.r(a);var o,n,r,l,i,s=function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")},c=function(){function e(e,a){for(var t=0;t<a.length;t++){var o=a[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(a,t,o){return t&&e(a.prototype,t),o&&e(a,o),a}}(),u=function(e){if(Array.isArray(e)){for(var a=0,t=Array(e.length);a<e.length;a++)t[a]=e[a];return t}return Array.from(e)},d=(o=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],n=function(){function e(a){var t=a.targetModal,o=a.triggers,n=void 0===o?[]:o,r=a.onShow,l=void 0===r?function(){}:r,i=a.onClose,c=void 0===i?function(){}:i,d=a.openTrigger,p=void 0===d?"data-micromodal-trigger":d,m=a.closeTrigger,f=void 0===m?"data-micromodal-close":m,h=a.disableScroll,g=void 0!==h&&h,y=a.disableFocus,b=void 0!==y&&y,v=a.awaitCloseAnimation,k=void 0!==v&&v,C=a.debugMode,w=void 0!==C&&C;s(this,e),this.modal=document.getElementById(t),this.config={debugMode:w,disableScroll:g,openTrigger:p,closeTrigger:f,onShow:l,onClose:c,awaitCloseAnimation:k,disableFocus:b},n.length>0&&this.registerTriggers.apply(this,u(n)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}return c(e,[{key:"registerTriggers",value:function(){for(var e=this,a=arguments.length,t=Array(a),o=0;o<a;o++)t[o]=arguments[o];t.forEach(function(a){a.addEventListener("click",function(){return e.showModal()})})}},{key:"showModal",value:function(){this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add("is-open"),this.setFocusToFirstNode(),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.onShow(this.modal)}},{key:"closeModal",value:function(){var e=this.modal;this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement.focus(),this.config.onClose(this.modal),this.config.awaitCloseAnimation?this.modal.addEventListener("animationend",function a(){e.classList.remove("is-open"),e.removeEventListener("animationend",a,!1)},!1):e.classList.remove("is-open")}},{key:"scrollBehaviour",value:function(e){if(this.config.disableScroll){var a=document.querySelector("body");switch(e){case"enable":Object.assign(a.style,{overflow:"initial",height:"initial"});break;case"disable":Object.assign(a.style,{overflow:"hidden",height:"100vh"})}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}},{key:"onClick",value:function(e){e.target.hasAttribute(this.config.closeTrigger)&&(this.closeModal(),e.preventDefault())}},{key:"onKeydown",value:function(e){27===e.keyCode&&this.closeModal(e),9===e.keyCode&&this.maintainFocus(e)}},{key:"getFocusableNodes",value:function(){var e=this.modal.querySelectorAll(o);return Object.keys(e).map(function(a){return e[a]})}},{key:"setFocusToFirstNode",value:function(){if(!this.config.disableFocus){var e=this.getFocusableNodes();e.length&&e[0].focus()}}},{key:"maintainFocus",value:function(e){var a=this.getFocusableNodes();if(this.modal.contains(document.activeElement)){var t=a.indexOf(document.activeElement);e.shiftKey&&0===t&&(a[a.length-1].focus(),e.preventDefault()),e.shiftKey||t!==a.length-1||(a[0].focus(),e.preventDefault())}else a[0].focus()}}]),e}(),r=null,l=function(e){if(!document.getElementById(e))return console.warn("MicroModal v0.3.1: ❗Seems like you have missed %c'"+e+"'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'+e+'"></div>'),!1},i=function(e,a){if(function(e){if(e.length<=0)console.warn("MicroModal v0.3.1: ❗Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>')}(e),!a)return!0;for(var t in a)l(t);return!0},{init:function(e){var a=Object.assign({},{openTrigger:"data-micromodal-trigger"},e),t=[].concat(u(document.querySelectorAll("["+a.openTrigger+"]"))),o=function(e,a){var t=[];return e.forEach(function(e){var o=e.attributes[a].value;void 0===t[o]&&(t[o]=[]),t[o].push(e)}),t}(t,a.openTrigger);if(!0!==a.debugMode||!1!==i(t,o))for(var r in o){var l=o[r];a.targetModal=r,a.triggers=[].concat(u(l)),new n(a)}},show:function(e,a){var t=a||{};t.targetModal=e,!0===t.debugMode&&!1===l(e)||(r=new n(t)).showModal()},close:function(){r.closeModal()}});a.default=d},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.amulet_desc=a.selectAmulet=a.wand_desc=a.selectWeapon=void 0;var o,n=t(0),r=(o=n)&&o.__esModule?o:{default:o},l=t(1);a.selectWeapon=function(e){switch(e){case"Oak Wand":r.default.playerRunic=2,r.default.playerHitChanceModifier=0;break;case"Ebony Wand":r.default.playerRunic=3,r.default.playerHitChanceModifier=2;break;case"Elder Wand":r.default.playerRunic=4,r.default.playerHitChanceModifier=3;break;default:throw new Error("Error at selectWeapon")}};var i='<span class="ra ra-crystals colour-runic-tip"></span>',s="<h2>Equip Wand</h2> <b>Oak Wand</b>: +2 to "+i+" . <br>",c="<b>Ebony Wand</b>: +2 to hit chance,  +3 to "+i+" . <br>",u=(a.wand_desc=[s,s+c,s+c+'<b>Elder Wand</b>: +3 to hit chance,  +4 to <span class="ra ra-crystals colour-runic-tip"></span> . <br>'],a.selectAmulet=function(e){switch(e){case"None":l.sapphireAmuletCondition.active=!1;break;case"Sapphire Amulet":l.sapphireAmuletCondition.active=!0;break;case"Emerald Amulet":l.sapphireAmuletCondition.active=!1,r.default.playerArmour=r.default.playerArmour+2;break;case"Ruby Amulet":break;default:throw new Error("Error at selectAmulet")}},'<h2>Equip Amulet</h2> <b>Sapphire Amulet</b>: +25 to maximum <span class="ra ra-lightning-bolt colour-mana"></span>.<br>'),d='<b>Emerald Amulet</b>: +2 to <span class="ra ra-shield colour-ac"></span>.<br>';a.amulet_desc=[u,u+d,u+d+"<b>Ruby Amulet</b>: +15% lifesteal. <br>"]},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.manaCheck=void 0;var o,n=t(0),r=(o=n)&&o.__esModule?o:{default:o},l=t(3),i=t(2);a.manaCheck=function(e,a){i.DEV&&console.log("mana: "+r.default.playerMana+" cost: "+e),r.default.playerMana<e?(0,l.log)("Not enough PP to cast.","info"):a()}},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.disable=function(){$(".basic-attack").prop("disabled",!0),$(".q").prop("disabled",!0),$(".w").prop("disabled",!0),$(".e").prop("disabled",!0),$(".r").prop("disabled",!0)},a.enable=function(){$(".basic-attack").prop("disabled",!1),$(".q").prop("disabled",!1),$(".w").prop("disabled",!1),$(".e").prop("disabled",!1),$(".r").prop("disabled",!1)}},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.getRandomInt=a.pureAttack=a.attack=a.bonus=a.roll=void 0;var o=t(2),n=t(1),r=a.roll=function(e){var a=Math.floor(e);return Math.floor(Math.random()*(a-1+1))+1};a.bonus=function(e,a){for(var t=0,o=0;o<e;o++)t+=r(a);return t},a.attack=function(e,a,t,l,i){var s=0;n.alzursThunderCondition.turns>0&&(s+=r(4),n.alzursThunderCondition.turns--),o.DEV&&(console.log("@Attack"),console.log("Damage: "+e+" HitChance: "+a+" DamageMod "+t+" Multiplier: "+l+" Armour: "+i),console.log("Extra Spell Damage: "+s));var c=0;if(r(20)+a>=i){for(var u=0;u<l;u++)c+=r(e);return(c+=t)+s}return null},a.pureAttack=function(e,a,t,n,l){o.DEV&&(console.log("@PureAttack"),console.log("Damage: "+e+" HitChance: "+a+" DamageMod "+t+" Multiplier: "+n+" Armour: "+l));var i=0;if(r(20)+a>=l){for(var s=0;s<n;s++)i+=r(e);return i+=t}return null},a.getRandomInt=function(e){return Math.floor(Math.random()*Math.floor(e))}},function(e,a,t){"use strict";var o=t(8),n=t(3),r=t(7),l=t(2),i=d(t(0)),s=t(6),c=t(1),u=t(5);d(t(4));function d(e){return e&&e.__esModule?e:{default:e}}l.DEV&&(0,n.log)("BUILD ALPHA 0.2.26 - Amulet, Trinket, Wand","info");i.default.playerHealth,i.default.playerArmour,i.default.playerDamage,i.default.playerRunic,i.default.playerMana,i.default.monsterHealth,i.default.monsterArmour,i.default.monsterDamage,i.default.monsterRage,i.default.monsterName;var p=[{name:"Oak Wand",type:"weapon",desc:0},{name:"Sapphire Amulet",type:"amulet",desc:0},{name:"Magical Stick",type:"trinket",desc:0},{name:"Ebony Wand",type:"weapon",desc:1},{name:"Emerald Amulet",type:"amulet",desc:1},{name:"Cursed Locket",type:"trinket",desc:1},{name:"Elder Wand",type:"weapon",desc:2},{name:"Ruby Amulet",type:"amulet",desc:2},{name:"Ancient Coin",type:"trinket",desc:2},{name:"Null Sphere",type:"trinket",desc:3}],m={name:"Chicken",monsterHealth:10,monsterArmour:0,monsterDamage:2,monsterRage:0,src:"res/mobs/chicken.png",turn:function(){this.basicAttack()},basicAttack:function(){var e=(0,o.pureAttack)(i.default.monsterDamage,0,0,1,i.default.playerArmour);null!=e?(g(e),(0,n.log)("Chicken hits for "+e+" damage!","mb")):(0,n.log)("Chicken missed.","miss"),b(e)}},f={name:"Wormface, the Goblin",monsterHealth:20,monsterArmour:15,monsterDamage:4,monsterRage:0,src:"res/mobs/goblin.png",names:["Wormface","Grubhead","Fartbreath","Poopnose","Wormhair"],turn:function(){var e=(0,o.roll)(100);l.DEV&&(console.log("@GoblinTurn"),console.log("Goblin Abilty Chance "+e)),e>75?this.goblinSpit():this.basicAttack()},basicAttack:function(){var e=(0,o.pureAttack)(i.default.monsterDamage,0,0,1,i.default.playerArmour);null!=e?(g(e),(0,n.log)("Goblin hits for "+e+" damage!","mb")):(0,n.log)("Goblin missed.","miss"),b(e)},goblinSpit:function(){var e=(0,o.pureAttack)(i.default.monsterDamage,1,0,1,i.default.playerArmour);null!=e?(g(e),(0,n.log)("Goblin uses <i>Goblin Spit</i> for "+e+" damage!","ms")):(0,n.log)("Goblin missed.","miss"),b(e)}},h=function(e){l.DEV&&console.log("@monsterHealthHelper result:"+e),i.default.monsterHealth-e<=0?(i.default.monsterHealth=0,(0,n.log)("You have slain "+i.default.monsterName+"!","victory"),x()):i.default.monsterHealth=i.default.monsterHealth-e},g=function(e){i.default.playerHealth-e<=0?(i.default.playerHealth=0,(0,n.log)("You died to "+v.name+"!","ms")):i.default.playerHealth=i.default.playerHealth-e},y=function(e){e&&$(".monster-health").addClass("animated jello"),1==c.runicEchoesCondition.active&&$(".player-armour").addClass("colour-mana-add"),$(".player-graphic").addClass("poke-right"),$(".monster-graphic").addClass("monster-flail"),1==c.sapphireAmuletCondition.active?i.default.playerMaxMana=125:i.default.playerMaxMana=100,i.default.playerMana+25>=i.default.playerMaxMana?i.default.playerMana=i.default.playerMaxMana:(i.default.playerMana=i.default.playerMana+25,$(".player-mana").addClass("colour-mana-add")),C(),(0,r.disable)(),setTimeout(function(){$(".monster-health").removeClass("animated jello")},500),setTimeout(function(){$(".player-graphic").removeClass("poke-right"),$(".monster-graphic").removeClass("monster-flail")},500),setTimeout(function(){$(".player-mana").removeClass("colour-mana-add"),$(".player-armour").removeClass("colour-mana-add")},1e3),setTimeout(function(){v.turn(),setTimeout(function(){(0,r.enable)()},200)},1800)},b=function(e){e&&$(".player-health").addClass("animated jello"),1==c.runicEchoesCondition.active&&(i.default.playerArmour=i.default.playerArmour-c.runicEchoesCondition.bonusArmour,c.runicEchoesCondition.active=!1),$(".monster-graphic").addClass("poke-left"),$(".player-graphic").addClass("player-flail"),C(),setTimeout(function(){$(".player-health").removeClass("animated jello")},500),setTimeout(function(){$(".monster-graphic").removeClass("poke-left"),$(".player-graphic").removeClass("player-flail")},750)},v=void 0,k=function(){i.default.playerHealth=100,i.default.playerDamage=10,i.default.playerArmour=8,i.default.playerRunic=2,i.default.playerMana=100,$(".q").addClass("spell spell-dragon-breath"),$(".qi").addClass("ra ra-dragon-breath icon"),$(".w").addClass("spell spell-lightning-trio"),$(".wi").addClass("ra ra-lightning-trio icon"),$(".e").addClass("spell spell-frostfire"),$(".ei").addClass("ra ra-frostfire icon"),$(".r").addClass("spell spell-fire-shield"),$(".ri").addClass("ra ra-fire-shield icon"),H.setContent(u.wand_desc[0]),H.addFooterBtn("Oak Wand","spell-equipment wand-button",function(){(0,u.selectWeapon)("Oak Wand"),C(),H.close()}),S.setContent("<h2>Select Amulet</h2><p>You don't have any amulets yet."),S.addFooterBtn("None","spell-amulet",function(){(0,u.selectAmulet)("None"),C(),S.close()}),_.setContent("<h2>Select Trinket</h2><p>You don't have any trinkets yet."),_.addFooterBtn("None","spell-trinket",function(){C(),_.close()}),document.getElementById("equipment-weapon").addEventListener("click",function(){H.open()}),document.getElementById("equipment-amulet").addEventListener("click",function(){S.open()}),document.getElementById("equipment-trinket").addEventListener("click",function(){_.open()}),document.getElementById("basic-attack").addEventListener("click",function(){!function(){c.deathfireGraspCondition.active=!1;var e=(0,o.attack)(i.default.playerDamage,i.default.playerHitChanceModifier,0,1,i.default.monsterArmour);null!=e?((0,n.log)("You hit for "+e+" damage!","pb"),h(e)):(0,n.log)("You missed.","miss-player"),y(e)}()}),document.getElementById("q").addEventListener("click",function(){(0,s.manaCheck)(75,E)}),document.getElementById("w").addEventListener("click",function(){(0,s.manaCheck)(100,D)}),document.getElementById("e").addEventListener("click",function(){(0,s.manaCheck)(50,L)}),document.getElementById("r").addEventListener("click",function(){(0,s.manaCheck)(25,T)})},C=function(){$(".player-health").text(i.default.playerHealth),$(".player-damage").text(i.default.playerDamage),$(".player-armour").text(i.default.playerArmour),$(".player-runic").text(i.default.playerRunic),$(".player-mana").text(i.default.playerMana),$(".monster-health").text(i.default.monsterHealth),$(".monster-armour").text(i.default.monsterArmour),$(".monster-damage").text(i.default.monsterDamage),$(".monster-rage").text(i.default.monsterRage),$(".monster-label").text(i.default.monsterName)},w=function(){var e="title";$(".player-damage-tip").prop(e,"Damage attribute affects basic attack and spell damage."),tippy(".player-damage-tip");$(".player-armour-tip").prop(e,"Armour class represents how hard it is for opponents to land an attack or spell on you."),tippy(".player-armour-tip");$(".player-runic-tip").prop(e,"Runic attribute improves spells and their effects."),tippy(".player-runic-tip");$(".player-mana-tip").prop(e,"PP represents the cost for casting spells. 25 PP is recharged per turn."),tippy(".player-mana-tip");$(".monster-rage-tip").prop(e,"Rage is aquired over time, and allows Monsters to have additional spells and effects."),tippy(".monster-rage-tip");$("#equipment-weapon").prop(e,"Switch Weapon - Weapons affect your hit chance."),tippy("#equipment-weapon");$("#equipment-amulet").prop(e,'Switch Amulet - Amulets can affect <span class="ra ra-sword colour-damage-tip"></span> and <span class="ra ra-shield colour-ac"></span> .'),tippy("#equipment-amulet");$("#equipment-trinket").prop(e,"Switch Trinket - Trinkets affect all attributes."),tippy("#equipment-trinket")},A=function(){var e='<span class="ra ra-sword colour-damage-tip"></span>',a="<b>Basic Attack</b> - Deal 1d"+i.default.playerDamage+" "+e+" .";$(".basic-attack").prop("title",a),tippy(".basic-attack");$(".q").prop("title",'<b>Scorch (75 PP)</b> - Ignore 1d2 <span class="ra ra-shield colour-ac"></span> and deal 1d10 <span class="ra ra-sword colour-damage-tip"></span>. Ignore an additional 1d2 <span class="ra ra-shield colour-ac"></span> per <span class="ra ra-crystals colour-runic-tip"></span> level.'),tippy(".q");$(".w").prop("title",'<b>Alzur\'s Thunder (100 PP)</b> - Deal 2d4 <span class="ra ra-sword colour-damage-tip"></span> and apply <i>Shocked</i>. Shock deals bonus 1d4 <span class="ra ra-sword colour-damage-tip"></span> for <span class="ra ra-crystals colour-runic-tip"></span> turns.'),tippy(".w");$(".e").prop("title",'<b>Malevolence (50 PP)</b> - Deal 1d10 <span class="ra ra-sword colour-damage-tip"></span> . Consecutive Malevolence casts deal bonus 1d2 <span class="ra ra-sword colour-damage-tip"></span> per <span class="ra ra-crystals colour-runic-tip"></span> level.'),tippy(".e");$(".r").prop("title",'<b>Runic Echoes (25 PP)</b> - Increase <span class="ra ra-shield colour-ac"></span> by 1d2 per <span class="ra ra-crystals colour-runic-tip"></span> level for the next turn.'),tippy(".r")},M=function(){i.default.monsterArmour=m.monsterArmour,i.default.monsterDamage=m.monsterDamage,i.default.monsterHealth=m.monsterHealth,i.default.monsterRage=0,i.default.monsterName=m.name,v=m},E=function(){i.default.playerMana=i.default.playerMana-75,c.deathfireGraspCondition.active=!1;var e=(0,o.roll)(2),a=(0,o.bonus)(i.default.playerRunic,2),t=e+a;l.DEV&&(console.log("Scorch base AC-ignore roll: "+e),console.log("Scorch bonus AC-ignore roll: "+a));var r=(0,o.attack)(10,i.default.playerHitChanceModifier,0,1,i.default.monsterArmour-t);null!=r?((0,n.log)("You <i>Scorch</i> for "+r+" damage!","ps-scorch"),h(r)):(0,n.log)("You missed Scorch!","miss-player"),y(r)},D=function(){i.default.playerMana=i.default.playerMana-100,l.DEV&&(console.log("@AlzursThunder"),console.log("Extra turns: "+c.alzursThunderCondition.turns));var e=(0,o.attack)(4,i.default.playerHitChanceModifier,0,2,i.default.monsterArmour);c.alzursThunderCondition.turns=i.default.playerRunic,c.deathfireGraspCondition.active=!1,null!=e?((0,n.log)("You summon <i>Alzur's Thunder</i> for "+e+" damage!","ps-thunder"),h(e)):(0,n.log)("You missed Alzur's Thunder!","miss-player"),y(e)},L=function(){i.default.playerMana=i.default.playerMana-50,l.DEV&&(console.log("@DeathfireGrasp"),console.log("Active: "+c.deathfireGraspCondition.active));var e=void 0;if(1==c.deathfireGraspCondition.active){var a=(0,o.bonus)(i.default.playerRunic,2);e=(0,o.attack)(10,i.default.playerHitChanceModifier,a,1,i.default.monsterArmour)}else e=(0,o.attack)(10,i.default.playerHitChanceModifier,0,1,i.default.monsterArmour);c.deathfireGraspCondition.active=!0,null!=e?((0,n.log)("You invoke <i>Malevolence</i> for "+e+" damage!","ps-grasp"),h(e)):(0,n.log)("You missed Malevolence!","miss-player"),y(e)},T=function(){i.default.playerMana=i.default.playerMana-25;var e=(0,o.bonus)(i.default.playerRunic,2);c.runicEchoesCondition.active=!0,c.runicEchoesCondition.bonusArmour=e,i.default.playerArmour=i.default.playerArmour+e,(0,n.log)("You cast <i>Runic Echoes</i> and boost armour by "+e+"!","ps-echoes"),y()},H=new tingle.modal({footer:!0,stickyFooter:!1,closeMethods:["button","escape"],closeLabel:"Close",cssClass:["custom-class-1","custom-class-2"],onOpen:function(){},onClose:function(){},beforeClose:function(){return!0}}),S=new tingle.modal({footer:!0,stickyFooter:!1,closeMethods:["button","escape"],closeLabel:"Close",cssClass:["custom-class-1","custom-class-2"],onOpen:function(){},onClose:function(){},beforeClose:function(){return!0}}),_=new tingle.modal({footer:!0,stickyFooter:!1,closeMethods:["button","escape"],closeLabel:"Close",cssClass:["custom-class-1","custom-class-2"],onOpen:function(){},onClose:function(){},beforeClose:function(){return!0}}),x=function(){if(l.DEV&&console.log("@Advance"),i.default.playerLevel=i.default.playerLevel+1,i.default.playerLevel>10)throw new Error("playerLevel exceeds 10. No more monsters");var e=p[i.default.playerLevel];"weapon"===e.type&&(H.addFooterBtn(e.name,"spell-equipment wand-button",function(){(0,u.selectWeapon)(e.name),C(),H.close()}),H.setContent(u.wand_desc[e.desc]),(0,n.log)(i.default.monsterName+" dropped: "+e.name+"!","victory")),"amulet"===e.type&&(S.addFooterBtn(e.name,"spell-amulet wand-button",function(){(0,u.selectAmulet)(e.name),C(),S.close()}),S.setContent(u.amulet_desc[e.desc]),(0,n.log)(i.default.monsterName+" dropped: "+e.name+"!","victory")),e.type,v=P(i.default.playerLevel),i.default.monsterHealth=v.monsterHealth,i.default.monsterDamage=v.monsterDamage,i.default.monsterName=v.name,i.default.monsterRage=0,$("#monster-graphic").addClass("animated zoomOut"),$("#monster-graphic").attr("src",v.src),setTimeout(function(){$("#monster-graphic").removeClass("animated zoomOut")},750),C()},P=function(e){switch(e){case 0:return m;case 1:return f;default:return console.log("@Error at getNextMonster"),f}};$(".character-selection").hide(),function(e){switch(w(),M(),e){case"warrior":case"ranger":break;case"mage":i.default.playerClass="mage",k(),A();break;default:console.log("Error in init")}C()}("mage");for(var O=0;O<100;O++);}]);
//# sourceMappingURL=entry.bundle.js.map