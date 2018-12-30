import { Howl, Howler } from 'howler';
import Stats from './stats';

class SoundManager {
  constructor() {
    this.globalVolume = 0.5;
    this.setDefault();

    if (Stats.playerClass === 'mage') {
      this.setMage();
    }
  }

  setDefault() {
    this.basic = new Howl({
      src: ['res/audio/spells/basic-attack.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.miss = new Howl({
      src: ['res/audio/interaction/miss.ogg'],
      preload: true,
      volume: this.globalVolume,
    });
    this.goblin = new Howl({
      src: ['res/audio/mob/goblin.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.chicken = new Howl({
      src: ['res/audio/mob/chicken.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.dwarf = new Howl({
      src: ['res/audio/mob/dwarf.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.dwarfTank = new Howl({
      src: ['res/audio/mob/dwarf-tank.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.ent = new Howl({
      src: ['res/audio/mob/ent.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.entTrip = new Howl({
      src: ['res/audio/mob/ent-trip.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.entHeal = new Howl({
      src: ['res/audio/mob/ent-heal.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.skeleton = new Howl({
      src: ['res/audio/mob/skeleton.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.skeletonFrighten = new Howl({
      src: ['res/audio/mob/skeleton-frighten.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.caretakerSpell = new Howl({
      src: ['res/audio/mob/caretaker-spell.ogg'],
      preload: true,
      volume: this.globalVolume,
    });
    this.caretakerLastrite = new Howl({
      src: ['res/audio/mob/caretaker-lastrite.ogg'],
      preload: true,
      volume: this.globalVolume,
    }); 
  }

  setMage() {
    this.q = new Howl({
      src: ['res/audio/spells/scorch.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.w = new Howl({
      src: ['res/audio/spells/alzurs-thunder.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.e = new Howl({
      src: ['res/audio/spells/deathfire-grasp.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    this.r = new Howl({
      src: ['res/audio/spells/runic-echoes.wav'],
      preload: true,
      volume: this.globalVolume,
    });
  }

  playQSound() {
    this.q.play();
  }

  playWSound() {
    this.w.play();
  }

  playESound() {
    this.e.play();
  }

  playRSound() {
    this.r.play();
  }

  playBasic() {
    this.basic.play();
  }

  playMiss() {
    this.miss.play();
  }

  playGoblin() {
    this.goblin.play();
  }

  playChicken() {
    this.chicken.play();
  }

  playDwarf() {
    this.dwarf.play();
  }

  playDwarfTank() {
    this.dwarfTank.play();
  }

  playEnt() {
    this.ent.play();
  }

  playEntTrip() {
    this.entTrip.play();
  }

  playEntHeal() {
    this.entHeal.play();
  }

  playSkeleton() {
    this.skeleton.play();
  }

  playSkeletonFrighten() {
    this.skeletonFrighten.play();
  }

  playCaretakerSpell() {
    this.caretakerSpell.play();
  }

  playCaretakerLastrite() {
    this.caretakerLastrite.play();
  }
}

export default SoundManager;
