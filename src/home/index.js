import tingle from 'tingle.js';
import 'pretty-checkbox/dist/pretty-checkbox.css';
import '../../css/tingle.min.css';
import {Howl, Howler} from 'howler';

// import platform from '../../res/platform/background-4.png';
// import cloud from '../../res/platform/cloud-3.png';

const settings = [
  {
    label: 'Enable Animations',
    id: 'settings-animations',
    default: true,
  },
  {
    label: 'Enable High Contrast Mode',
    id: 'settings-highcontrast',
    default: false,
  },
];

const runAudio = function() {
  const sound = new Howl({
    src: ['res/audio/home.mp3'],
    preload: true,
    autoplay: true,
    loop: true,
  });
  sound.play();
}

const setWeaponInterface = function() {
  const el = document.getElementById('settings-interface');

  settings.forEach((setting) => {
    const label = document.createElement('div');
    label.className = 'settings-label';
    label.innerText = setting.label;

    const outer = document.createElement('div');
    outer.classList.add('pretty', 'p-switch', 'p-fill');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = setting.id;

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

const buildSettingsInterface = function() {
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

  const _enable_animations = document.getElementById('settings-animations');
  _enable_animations.addEventListener('click', () => {
    console.log(_enable_animations.checked);
  });

  _enable_animations.checked = true;

}

buildSettingsInterface();
runAudio();