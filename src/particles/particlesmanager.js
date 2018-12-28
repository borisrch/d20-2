import 'particles.js/particles';

// Particles library setup.
const particlesJS = window.particlesJS;
const el = document.getElementById('particles-js');
const els = document.getElementById('particles-monster-spell-js');
const mel = document.getElementById('particles-monster-js');
const pel = document.getElementById('particles-player-js');
const path = 'src/particles/';

class ParticlesManager {
  constructor() {
    this.particlesJS = particlesJS;
  }
  /* Used for Player spell particles */
  showParticles(zpath) {
    el.style.display = '';
    particlesJS.load('particles-js', zpath, function() {
      setTimeout(() => {
        el.classList.add('animated', 'fadeOut');
        setTimeout(() => {
          el.style.display = 'none';
          particlesJS.load('particles-js', 'src/particles/noop.json', function() {});
          el.classList.remove('animated', 'fadeOut');
        }, 1000);
      }, 1250);
    });
  }
  showMonsterSpellParticles(zpath) {
    els.style.display = '';
    particlesJS.load('particles-monster-spell-js', zpath, function() {
      setTimeout(() => {
        els.classList.add('animated', 'fadeOut');
        setTimeout(() => {
          els.style.display = 'none';
          particlesJS.load('particles-monster-spell-js', 'src/particles/noop.json', function() {});
          els.classList.remove('animated', 'fadeOut');
        }, 1000);
      }, 1000);
    });
  }

  /* Show mob effect particles eg. buffs/debuffs */
  showMonsterParticles(zpath) {
    particlesJS.load('particles-monster-js', zpath, function() {});
  }
  /* Hide mob effect particles */
  hideMonsterParticles() {
    mel.classList.add('animated', 'fadeOut');
    setTimeout(() => {
      mel.classList.remove('animated', 'fadeOut');
      particlesJS.load('particles-monster-js', 'src/particles/noop.json', function() {});
    }, 1000);
  }
  /* eg. heal */
  chainMonsterParticles(zpath) {
    this.showMonsterParticles(zpath);
    setTimeout(() => {
      this.hideMonsterParticles(zpath);
    }, 2000);
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
    this.showMonsterSpellParticles(`${path}goblinspit.json`);
  }

  showEntTrip() {
    this.showMonsterSpellParticles(`${path}enttrip.json`);
  }

  showMobHeal() {
    this.chainMonsterParticles(`${path}heal.json`);
  }

  showSkeletonFrighten() {
    this.showMonsterSpellParticles(`${path}skeletonfrighten.json`);
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
