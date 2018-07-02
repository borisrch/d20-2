!function(e){var a={};function t(r){if(a[r])return a[r].exports;var l=a[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,t),l.l=!0,l.exports}t.m=e,t.c=a,t.d=function(e,a,r){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var l in e)t.d(r,l,function(a){return e[a]}.bind(null,l));return r},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=6)}([function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.DEV=!0},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={playerHealth:0,playerArmour:0,playerDamage:0,playerRunic:0,playerMana:0,playerHitChanceModifier:0,monsterHealth:0,monsterArmour:0,monsterDamage:0,monsterRage:0,monsterName:null}},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.log=function(e,a){var t=function(e){switch(e){case"mb":return"log log-monster-basic animated slideInDown";case"ms":return"log log-monster-spell animated bounceIn";case"miss":return"log log-miss animated slideInDown";case"miss-player":return"log log-player-miss animated slideInDown";case"info":return"log log-info animated slideInDown";case"pb":return"log log-player-basic animated slideInDown";case"ps-scorch":return"log log-player-spell animated tada";default:console.log("Error in styleHandler")}}(a),r=$(".list").children().length,l=$("<li>"+e+"</li>").addClass(t);r<7?$("ul.list").prepend(l):($(".list li").last().remove(),$("ul.list").prepend(l))}},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.manaCheck=void 0;var r,l=t(1),o=(r=l)&&r.__esModule?r:{default:r},n=t(2),s=t(0);a.manaCheck=function(e,a){s.DEV&&console.log("mana: "+o.default.playerMana+" cost: "+e),o.default.playerMana<e?(0,n.log)("Not enough PP to cast.","info"):a()}},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.disable=function(){$(".basic-attack").prop("disabled",!0),$(".q").prop("disabled",!0),$(".w").prop("disabled",!0),$(".e").prop("disabled",!0),$(".r").prop("disabled",!0)},a.enable=function(){$(".basic-attack").prop("disabled",!1),$(".q").prop("disabled",!1),$(".w").prop("disabled",!1),$(".e").prop("disabled",!1),$(".r").prop("disabled",!1)}},function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.getRandomInt=a.attack=a.bonus=a.roll=void 0;var r=t(0),l=a.roll=function(e){var a=Math.floor(e);return Math.floor(Math.random()*(a-1+1))+1};a.bonus=function(e,a){for(var t=0,r=0;r<e;r++)t+=l(a);return t},a.attack=function(e,a,t,o,n){r.DEV&&console.log("pDamage: "+e+" pHitChance: "+a+" pDamageMod "+t+" pMultiplier: "+o+" monsterArmour: "+n);var s=0;if(l(20)+a>=n){for(var i=0;i<o;i++)s+=l(e);return s+=t}return null},a.getRandomInt=function(e){return Math.floor(Math.random()*Math.floor(e))}},function(e,a,t){"use strict";var r,l=t(5),o=t(2),n=t(4),s=t(0),i=t(1),u=(r=i)&&r.__esModule?r:{default:r},d=t(3);s.DEV&&(0,o.log)("BUILD ALPHA 0.2.23 - AlzursThunder","info");u.default.playerHealth;var p=u.default.playerArmour,c=(u.default.playerDamage,u.default.playerRunic,u.default.playerMana,u.default.monsterHealth,u.default.monsterArmour,u.default.monsterDamage,u.default.monsterRage,u.default.monsterName,{name:"Goblin",monsterArmour:15,monsterDamage:4,monsterRage:0,names:["Wormface","Grubhead","Fartbreath","Poopnose","Wormhair"],turn:function(){var e=(0,l.roll)(100);s.DEV&&console.log("Goblin Abilty Chance "+e),e>75?this.goblinSpit():this.basicAttack()},basicAttack:function(){var e=(0,l.attack)(this.monsterDamage,0,0,1,p);null!=e?(f(e),(0,o.log)("Goblin hits for "+e+" damage!","mb")):(0,o.log)("Goblin missed.","miss"),y(e)},goblinSpit:function(){var e=(0,l.attack)(this.monsterDamage,1,0,1,p);null!=e?(f(e),(0,o.log)("Goblin uses <i>Goblin Spit</i> for "+e+" damage!","ms")):(0,o.log)("Goblin missed.","miss"),y(e)}}),m=function(e){s.DEV&&console.log("@monsterHealthHelper result:"+e),u.default.monsterHealth-e<0?(u.default.monsterHealth=0,(0,o.log)("You have slain Goblin!","pb")):u.default.monsterHealth=u.default.monsterHealth-e},f=function(e){u.default.playerHealth-e<=0?(u.default.playerHealth=0,(0,o.log)("You died to "+h.name+"!","ms")):u.default.playerHealth=u.default.playerHealth-e},g=function(e){e&&$(".monster-health").addClass("animated jello"),u.default.playerMana+25>=100?u.default.playerMana=100:(u.default.playerMana=u.default.playerMana+25,$(".player-mana").addClass("colour-mana-add")),v(),(0,n.disable)(),setTimeout(function(){$(".monster-health").removeClass("animated jello")},500),setTimeout(function(){$(".player-mana").removeClass("colour-mana-add")},1e3),setTimeout(function(){h.turn(),(0,n.enable)()},1500)},y=function(e){e&&$(".player-health").addClass("animated jello"),v(),setTimeout(function(){$(".player-health").removeClass("animated jello")},500)},h=c,b=function(){u.default.playerHealth=100,u.default.playerDamage=10,u.default.playerArmour=8,u.default.playerRunic=2,u.default.playerMana=100,$(".q").addClass("spell spell-dragon-breath"),$(".qi").addClass("ra ra-dragon-breath icon"),$(".w").addClass("spell spell-lightning-trio"),$(".wi").addClass("ra ra-lightning-trio icon"),$(".e").addClass("spell spell-frostfire"),$(".ei").addClass("ra ra-frostfire icon"),$(".r").addClass("spell spell-fire-shield"),$(".ri").addClass("ra ra-fire-shield icon"),document.getElementById("basic-attack").addEventListener("click",function(){var e;null!=(e=(0,l.attack)(u.default.playerDamage,u.default.playerHitChanceModifier,0,1,u.default.monsterArmour))?((0,o.log)("You hit for "+e+" damage!","pb"),m(e)):(0,o.log)("You missed.","miss-player"),g(e)}),document.getElementById("q").addEventListener("click",function(){(0,d.manaCheck)(75,C)})},v=function(){$(".player-health").text(u.default.playerHealth),$(".player-damage").text(u.default.playerDamage),$(".player-armour").text(u.default.playerArmour),$(".player-runic").text(u.default.playerRunic),$(".player-mana").text(u.default.playerMana),$(".monster-health").text(u.default.monsterHealth),$(".monster-armour").text(u.default.monsterArmour),$(".monster-damage").text(u.default.monsterDamage),$(".monster-rage").text(u.default.monsterRage)},M=function(){$(".player-damage-tip").prop("title","Damage attribute affects basic attack and spell damage."),tippy(".player-damage-tip");$(".player-armour-tip").prop("title","Armour class represents how hard it is for opponents to land an attack or spell on you."),tippy(".player-armour-tip");$(".player-runic-tip").prop("title","Runic attribute improves spells and their effects."),tippy(".player-runic-tip");$(".player-mana-tip").prop("title","PP represents the cost for casting spells. 25 PP is recharged per turn."),tippy(".player-mana-tip");$(".monster-rage-tip").prop("title","Rage is aquired over time, and allows Monsters to have additional spells and effects."),tippy(".monster-rage-tip")},D=function(){var e='<span class="ra ra-sword colour-damage-tip"></span>',a="<b>Basic Attack</b> - Deal 1d"+u.default.playerDamage+" "+e+" .";$(".basic-attack").prop("title",a),tippy(".basic-attack");$(".q").prop("title",'<b>Scorch (75 PP)</b> - Ignore 1d2 <span class="ra ra-shield colour-ac"></span> and deal 1d10 <span class="ra ra-sword colour-damage-tip"></span>. Ignore an additional 1d2 <span class="ra ra-shield colour-ac"></span> per <span class="ra ra-crystals colour-runic-tip"></span> level.'),tippy(".q");$(".w").prop("title",'<b>Alzur\'s Thunder (100 PP)</b> - Deal 1d8 <span class="ra ra-sword colour-damage-tip"></span> and apply <i>Shocked</i>. Shock deals bonus 1d4 <span class="ra ra-sword colour-damage-tip"></span> for <span class="ra ra-crystals colour-runic-tip"></span> turns.'),tippy(".w")},k=function(){u.default.monsterArmour=10,u.default.monsterDamage=8,u.default.monsterHealth=20,u.default.monsterRage=69},C=function(){u.default.playerMana=u.default.playerMana-75;var e=(0,l.roll)(2),a=(0,l.bonus)(u.default.playerRunic,2),t=e+a;s.DEV&&(console.log("Scorch base AC-ignore roll: "+e),console.log("Scorch bonus AC-ignore roll: "+a));var r=(0,l.attack)(10,0,0,1,u.default.monsterArmour-t);null!=r?((0,o.log)("You <i>Scorch</i> for "+r+" damage!","ps-scorch"),m(r)):(0,o.log)("You missed Scorch!","miss-player"),g(r)};$(".character-selection").hide(),function(e){switch(M(),k(),e){case"warrior":case"ranger":break;case"mage":b(),D();break;default:console.log("Error in init")}v()}("mage");for(var A=0;A<100;A++);}]);