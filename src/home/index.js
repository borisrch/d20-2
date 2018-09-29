import tingle from 'tingle.js';
import 'pretty-checkbox/dist/pretty-checkbox.css';
import '../../css/tingle.min.css';
import {
  Howl,
  Howler
} from 'howler';

// import platform from '../../res/platform/background-4.png';
// import cloud from '../../res/platform/cloud-3.png';

const settings = [
  {
    label: 'Enable High Contrast Mode',
    id: 'settings-highcontrast',
    default: false,
  },
  {
    label: 'Mute Background Music',
    id: 'settings-mutemusic',
    default: false,
  }
];


const backgroundMusic = new Howl({
  src: ['res/audio/home.mp3'],
  preload: true,
  autoplay: true,
  loop: true,
  volume: 0.5,
});


const setWeaponInterface = function () {
  const el = document.getElementById('settings-interface');

  settings.forEach((setting) => {
    const label = document.createElement('div');
    label.className = 'settings-label';
    label.innerText = setting.label;

    const outer = document.createElement('div');
    outer.classList.add('pretty', 'p-switch', 'p-slim');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = setting.id;
    checkbox.checked = setting.default;

    const state = document.createElement('div');
    state.classList.add('state', 'p-primary');

    const labelInner = document.createElement('label');

    state.appendChild(labelInner);
    outer.appendChild(checkbox);
    outer.appendChild(state);

    el.appendChild(label);
    el.appendChild(outer);

  });

  // Add listener

  // Add localStorage update

}

const buildSettingsInterface = function () {
  const settingsModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape'],
    closeLabel: "Close",
    beforeClose: function () {
      return true;
    }
  });
  settingsModal.setContent('<div class="settings-interface" id="settings-interface"></div>');
  setWeaponInterface();

  const settings = document.getElementById('settings');
  settings.addEventListener('click', () => {
    settingsModal.open();
  });

  const disable_music = document.getElementById('settings-mutemusic');
  disable_music.addEventListener('click', () => {
    if (disable_music.checked) {
      backgroundMusic.mute(true);
    }
    else {
      backgroundMusic.mute(false);
    }
  });

  const contrast_css = document.createElement('style');
  document.body.appendChild(contrast_css);

  const enable_highcontrast = document.getElementById('settings-highcontrast');
  enable_highcontrast.addEventListener('click', () => {
    if (enable_highcontrast.checked) {
      contrast_css.textContent = ` .home-interface {
        filter: contrast(200%);
      }`;
    } else {
      contrast_css.textContent = ``;
    }
  });
}

buildSettingsInterface();
backgroundMusic.play();