import 'particles.js/particles';

// Particles library setup.
const particlesJS = window.particlesJS;
const el = document.getElementById('particles-js');
const mel = document.getElementById('particles-monster-js');
const pel = document.getElementById('particles-player-js');
const path = 'src/particles/';

class ParticlesManager {
  constructor() {
    this.particlesJS = particlesJS;
  }

  showParticles(zpath) {
    particlesJS.load('particles-js', zpath, function() {
      setTimeout(() => {
        el.classList.add('animated', 'fadeOut');
        setTimeout(() => {
          el.classList.remove('animated', 'fadeOut');
          particlesJS.load('particles-js', 'src/particles/noop.json', function() {});
        }, 1000);
      }, 1000);
    });
  }

  showMonsterParticles(zpath) {
    particlesJS.load('particles-monster-js', zpath, function() {});
  }

  hideMonsterParticles() {
    mel.classList.add('animated', 'fadeOut');
    setTimeout(() => {
      mel.classList.remove('animated', 'fadeOut');
      particlesJS.load('particles-monster-js', 'src/particles/noop.json', function() {});
    }, 1000);
  }

  showPlayerParticles(zpath) {
    particlesJS.load('particles-player-js', zpath, function() {});
  }

  hidePlayerParticles() {
    pel.classList.add('animated', 'fadeOut');
    setTimeout(() => {
      pel.classList.remove('animated', 'fadeOut');
      particlesJS.load('particles-player-js', 'src/particles/noop.json', function() {});
    }, 1000);
  }

  /* Spells */
  showScorch() {
    this.showParticles(`${path}scorch.json`);
  }

  showThunder() {
    this.showParticles(`${path}thunder.json`);
  }

  showDeathfire() {
    this.showParticles(`${path}deathfire.json`);
  }

  showRunicEchoes() {
    this.showParticles(`${path}runicechoes.json`);
  }

  /* Mob Spells */
  showGoblinSpit() {
    this.showParticles(`${path}goblinspit.json`);
  }

  /* Conditions/Buffs */
  showDwarfTank() {
    this.showMonsterParticles(`${path}dwarftank.json`);
  }

  showShocked() {
    this.showMonsterParticles(`${path}shocked.json`);
  }

  showDisadvantaged() {
    this.showPlayerParticles(`${path}shocked.json`);
  }

  showPotionActive() {
    this.showPlayerParticles(`${path}potionactive.json`);
  }
}

export default ParticlesManager;
