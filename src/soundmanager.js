import { Howler } from 'howler';
import Stats from './stats';


export class SoundManager {

  constructor() {
    
    this.globalVolume = 0.5;
    this.setDefault();

    if (Stats.playerClass == 'mage') {
      this.setMage();
    }
  }

  setDefault() {
    const basic = new Howl({
      src: ['res/audio/spells/basic-attack.wav'],
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

    this.basic = basic;
  }

  setMage() {

    const qSound = new Howl({
      src: ['res/audio/spells/scorch.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    const wSound = new Howl({
      src: ['res/audio/spells/alzurs-thunder.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    const eSound = new Howl({
      src: ['res/audio/spells/deathfire-grasp.wav'],
      preload: true,
      volume: this.globalVolume,
    });
    const rSound = new Howl({
      src: ['res/audio/spells/runic-echoes.wav'],
      preload: true,
      volume: this.globalVolume,
    });

    this.q = qSound; 
    this.w = wSound;
    this.e = eSound;
    this.r = rSound;

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


  playGoblin() {
    this.goblin.play();
  }

  playChicken() {
    this.chicken.play();
  }

}