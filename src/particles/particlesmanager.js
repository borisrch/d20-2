/* eslint-disable class-methods-use-this */
import 'particles.js/particles';
import path from 'path';

// Particles library setup.
const particlesJS = window.particlesJS;
const el = document.getElementById('particles-js');
const els = document.getElementById('particles-monster-spell-js');
const mel = document.getElementById('particles-monster-js');
const pel = document.getElementById('particles-player-js');
const mbel = document.getElementById('particles-monster-bonus-js');

// const particlesJSONPath = [
//   '',
// ];

class ParticlesManager {
  constructor() {
    this.particlesJS = particlesJS;
    /*  Refactor into array which processes each particle.json file.
        atm, everytime a particle is used a new xhr is made. preload is better. */
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.href = '/src/particles/thunder.json';
    preload.as = 'fetch';
    preload.crossOrigin = 'anonymous';
    document.body.appendChild(preload);
  }

  /* Used for Player spell particles */
  showParticles(zpath) {
    el.style.display = '';
    particlesJS.load('particles-js', zpath, () => {
      setTimeout(() => {
        el.classList.add('animated', 'fadeOut');
        setTimeout(() => {
          el.style.display = 'none';
          particlesJS.load('particles-js', 'src/particles/noop.json', () => {
            el.classList.remove('animated', 'fadeOut');
            // Clear pJSDom cache. A new instance is generated each particles load.
            this.clearParticles();
          });
        }, 1000);
      }, 1000);
    });
  }

  showMonsterSpellParticles(zpath) {
    els.style.display = '';
    particlesJS.load('particles-monster-spell-js', zpath, () => {
      setTimeout(() => {
        els.classList.add('animated', 'fadeOut');
        setTimeout(() => {
          els.style.display = 'none';
          particlesJS.load('particles-monster-spell-js', 'src/particles/noop.json', () => {
            els.classList.remove('animated', 'fadeOut');
            this.clearParticles();
          });
        }, 1000);
      }, 1000);
    });
  }

  /* Show mob effect particles eg. buffs/debuffs */
  showMonsterParticles(zpath) {
    mel.style.display = '';
    particlesJS.load('particles-monster-js', zpath);
  }

  /* Hide mob effect particles */
  hideMonsterParticles() {
    mel.classList.add('animated', 'fadeOut');
    setTimeout(() => {
      mel.style.display = 'none';
      mel.classList.remove('animated', 'fadeOut');
      particlesJS.load('particles-monster-js', 'src/particles/noop.json', () => {
        this.clearParticles();
      });
    }, 1000);
  }

  /* eg. heal */
  chainMonsterParticles(zpath) {
    this.showMonsterParticles(zpath);
    setTimeout(() => {
      this.hideMonsterParticles(zpath);
    }, 2000);
  }

  showMonsterBonusParticles(zpath) {
    particlesJS.load('particles-monster-bonus-js', zpath);
  }

  hideMonsterBonusParticles() {
    mbel.classList.add('animated', 'fadeOut');
    setTimeout(() => {
      mbel.classList.remove('animated', 'fadeOut');
      particlesJS.load('particles-monster-js', 'src/particles/noop.json');
    }, 900);
  }

  showPlayerParticles(zpath) {
    pel.style.display = '';
    particlesJS.load('particles-player-js', zpath);
  }

  hidePlayerParticles() {
    pel.classList.add('animated', 'fadeOut');
    setTimeout(() => {
      pel.style.display = 'none';
      pel.classList.remove('animated', 'fadeOut');
      particlesJS.load('particles-player-js', 'src/particles/noop.json', () => {
        this.clearParticles();
      });
    }, 900);
  }

  clearParticles() {
    window["pJSDom"] = [];
  }

  /* Player Spells */
  showScorch() {
    this.showParticles(path.resolve(__dirname, 'src', 'particles', 'scorch.json'));
  }

  showThunder() {
    this.showParticles(path.resolve(__dirname, 'src', 'particles', 'thunder.json'));
  }

  showDeathfire() {
    this.showParticles(path.resolve(__dirname, 'src', 'particles', 'deathfire.json'));
  }

  showRunicEchoes() {
    this.showParticles(path.resolve(__dirname, 'src', 'particles', 'runicechoes.json'));
  }

  /* Mob Spells */
  showGoblinSpit() {
    this.showMonsterSpellParticles(path.resolve(__dirname, 'src', 'particles', 'goblinspit.json'));
  }

  showEntTrip() {
    this.showMonsterSpellParticles(path.resolve(__dirname, 'src', 'particles', 'enttrip.json'));
  }

  showMobHeal() {
    this.chainMonsterParticles(path.resolve(__dirname, 'src', 'particles', 'heal.json'));
  }

  showSkeletonFrighten() {
    this.showMonsterSpellParticles(path.resolve(__dirname, 'src', 'particles', 'skeletonfrighten.json'));
  }

  showCaretakerSpell() {
    this.showMonsterSpellParticles(path.resolve(__dirname, 'src', 'particles', 'caretakerspell.json'));
  }

  showCaretakerLastrite() {
    this.showMonsterSpellParticles(path.resolve(__dirname, 'src', 'particles', 'caretakerlastrite.json'));
  }

  /* Conditions/Buffs */
  showDwarfTank() {
    this.showMonsterParticles(path.resolve(__dirname, 'src', 'particles', 'dwarftank.json'));
  }

  showShocked() {
    this.showMonsterParticles(path.resolve(__dirname, 'src', 'particles', 'shocked.json'));
  }

  showDisadvantaged() {
    this.showPlayerParticles(path.resolve(__dirname, 'src', 'particles', 'shocked.json'));
  }

  showPotionActive() {
    this.showPlayerParticles(path.resolve(__dirname, 'src', 'particles', 'potionactive.json'));
  }

  /* Bonus Effects */
  showCaretaker() {
    this.showMonsterBonusParticles(path.resolve(__dirname, 'src', 'particles', 'caretaker.json'));
  }
}

export default ParticlesManager;
