!function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.DEV=!0},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.log=function(e,t){var r=function(e){switch(e){case"mb":return"log log-monster-basic animated slideInDown";case"ms":return"log log-monster-spell animated bounceIn";case"miss":return"log log-miss animated slideInDown";case"miss-player":return"log log-player-miss animated slideInDown";case"pb":return"log log-player-basic animated slideInDown";default:console.log("Error in styleHandler")}}(t),a=$(".list").children().length,n=$("<li>"+e+"</li>").addClass(r);a<8?$("ul.list").prepend(n):($(".list li").last().remove(),$("ul.list").prepend(n))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.attack=t.roll=void 0;var a=r(0),n=t.roll=function(e){var t=Math.floor(e);return Math.floor(Math.random()*(t-1+1))+1};t.attack=function(e,t,r,o,i){a.DEV&&console.log("pDamage "+e+"pHitChance "+t+"pDamageMod "+r+"pMultiplier "+o+"monsterArmour "+i);var l=0;if(n(20)+t>=i){for(var s=0;s<o;s++)l+=n(e);return l+=r}return null}},function(e,t,r){"use strict";var a=r(2),n=r(1),o=r(0);o.DEV&&(0,n.log)("BUILD ALPHA 0.2.8","pb");var i=0,l=0,s=0,c=0,p=0,u=0,d=0,m=0,f=0,g={monsterArmour:15,monsterDamage:4,monsterRage:0,monsterTurnAttack:function(){var e=(0,a.roll)(100);o.DEV&&console.log("Goblin Abilty Chance "+e),e>75?this.goblinSpit():this.basicAttack()},basicAttack:function(){var e=(0,a.attack)(this.monsterDamage,0,0,1,l);null!=e?(0,n.log)("Goblin hits for "+e+" damage!","mb"):(0,n.log)("Goblin missed.","miss")},goblinSpit:function(){var e=(0,a.attack)(this.monsterDamage,1,0,1,l);null!=e?(0,n.log)("Goblin uses <i>Goblin Spit</i> for "+e+" damage!","ms"):(0,n.log)("Goblin missed.","miss")}},b=function(){i=100,s=10,l=8,c=2,p=100,$(".q").addClass("spell spell-dragon-breath"),$(".qi").addClass("ra ra-dragon-breath icon"),$(".w").addClass("spell spell-lightning-trio"),$(".wi").addClass("ra ra-lightning-trio icon"),$(".e").addClass("spell spell-frostfire"),$(".ei").addClass("ra ra-frostfire icon"),$(".r").addClass("spell spell-fire-shield"),$(".ri").addClass("ra ra-fire-shield icon"),document.getElementById("basic-attack").addEventListener("click",function(){var e;null!=(e=(0,a.attack)(s,0,0,1,g.monsterArmour))?(u-e<0?(u=0,(0,n.log)("You have slain Goblin!","pb")):(u-=e,(0,n.log)("You hit for "+e+" damage!","pb")),y()):(0,n.log)("You missed.","miss-player")})},y=function(){$(".player-health").text(i),$(".player-damage").text(s),$(".player-armour").text(l),$(".player-runic").text(c),$(".player-mana").text(p),$(".monster-health").text(u),$(".monster-armour").text(d),$(".monster-damage").text(m),$(".monster-rage").text(f)},h=function(){$(".player-damage-tip").prop("title","Damage attribute affects basic attack and spell damage."),tippy(".player-damage-tip");$(".player-armour-tip").prop("title","Armour class represents how hard it is for opponents to land an attack or spell on you."),tippy(".player-armour-tip");$(".player-runic-tip").prop("title","Runic attribute improves spells and their effects."),tippy(".player-runic-tip");$(".player-mana-tip").prop("title","PP represents the cost for casting spells. 25 PP is recharged per turn."),tippy(".player-mana-tip");$(".monster-rage-tip").prop("title","Rage is aquired over time, and allows Monsters to have additional spells and effects."),tippy(".monster-rage-tip")},v=function(){var e="<b>Basic Attack:</b> Deal 1d"+s+" damage.";$(".basic-attack").prop("title",e),tippy(".basic-attack");$(".q").prop("title","<b>Scorch (50 PP)</b>: Ignore 1d2 AC and deal 1d10 damage. Ignore an additional 1d2 AC per Runic level."),tippy(".q")},k=function(){d=0,m=8,u=20,f=69};console.log(g),$(".character-selection").hide(),function(e){switch(h(),k(),e){case"warrior":case"ranger":break;case"mage":b(),v();break;default:console.log("Error in init")}y()}("mage")}]);