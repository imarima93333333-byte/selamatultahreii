/* =========================================================
   BIRTHDAY WEBSITE — script.js
   Handles: loading screen, screen navigation, the reusable
   letter component (pages 2-4), and page 5 falling effects.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. LOADING SCREEN -> COVER
     --------------------------------------------------------- */
  const loadingScreen = document.getElementById('loading-screen');
  const screens = {
    cover:   document.getElementById('page-cover'),
    letter:  document.getElementById('page-letter'),
    closing: document.getElementById('page-closing'),
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('is-active'));
    screens[name].classList.add('is-active');
  }

  // ~1 second loading, then fade out and reveal the cover
  window.setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    showScreen('cover');
    window.setTimeout(() => loadingScreen.remove(), 550);
  }, 1000);

  /* ---------------------------------------------------------
     2. LETTER CONTENT (single reusable component for pages 2-4)
     Text is kept EXACTLY as provided — do not edit.
     --------------------------------------------------------- */
  const letters = [
    {
      text: 'reiiiiii selamaaaaattttt ulangggg taunnnnn yahhhhhhh makasih udh nemenin ak 3 hari umur 18 tahunnya wkwkwks hepi naintin yak 🤭🤭🤭🤭😜😜😜',
      showBouquet: false,
    },
    {
      text: 'alafyusomat ketua grup plenger no sensor, semogah semua hal baik yg km mau dikabulin yaaaaa, terusss ak doain kamuuuu panjang umurnya dan sehat selalu yaa reiiii, semoga ipk kmh sem ini en sem berikutnya baik terusss n trs meningkatttt,',
      showBouquet: false,
    },
    {
      text: 'aiwisyualdebes ya reimutttt, may your days always happy and blessed— semoga hanya hal-hal baik yang datang ke kamuuu',
      showBouquet: true,
    },
  ];

  let letterIndex = 0;

  const btnOpen   = document.getElementById('btn-open');
  const btnNext   = document.getElementById('btn-next');
  const paperEl   = document.getElementById('paper');
  const letterTxt = document.getElementById('letter-text');
  const letterBouquet = document.getElementById('letter-bouquet');
  const dots = Array.from(document.querySelectorAll('.dot'));

  function renderLetter(index, { replay = true } = {}) {
    const data = letters[index];
    letterTxt.textContent = data.text;
    letterBouquet.hidden = !data.showBouquet;

    dots.forEach(d => d.classList.toggle('is-active', Number(d.dataset.i) === index));
    btnNext.textContent = index === letters.length - 1 ? 'Finish 🎀' : 'Next →';

    if (replay) {
      // restart the "paper rising out of the envelope" animation every time
      paperEl.classList.remove('is-out');
      // force reflow so the transition restarts cleanly
      void paperEl.offsetWidth;
      requestAnimationFrame(() => paperEl.classList.add('is-out'));
    }
  }

  btnOpen.addEventListener('click', () => {
    showScreen('letter');
    letterIndex = 0;
    renderLetter(letterIndex);
  });

  btnNext.addEventListener('click', () => {
    if (letterIndex < letters.length - 1) {
      letterIndex += 1;
      renderLetter(letterIndex);
    } else {
      showScreen('closing');
      startClosingEffects();
    }
  });

  /* ---------------------------------------------------------
     3. PAGE 5 — falling sakura / hearts + tap burst
     --------------------------------------------------------- */
  const fxLayer = document.getElementById('fx-layer');
  const fallSymbols = ['🌸', '💗', '🌸', '💕'];
  let fallTimer = null;

  function spawnFalling() {
    const el = document.createElement('span');
    el.className = 'fx-fall';
    el.textContent = fallSymbols[Math.floor(Math.random() * fallSymbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    const duration = 4 + Math.random() * 3; // 4-7s
    el.style.animationDuration = duration + 's';
    el.style.fontSize = (1 + Math.random() * 0.8) + 'rem';
    fxLayer.appendChild(el);
    window.setTimeout(() => el.remove(), duration * 1000 + 200);
  }

  function startClosingEffects() {
    if (fallTimer) return; // only start once
    fallTimer = window.setInterval(spawnFalling, 450);
  }

  // tap / click anywhere on the closing page -> little burst of flowers/hearts
  screens.closing.addEventListener('click', (e) => {
    const burstSymbols = ['🌸', '💗', '✨'];
    const count = 6;
    for (let i = 0; i < count; i += 1) {
      const el = document.createElement('span');
      el.className = 'fx-burst';
      el.textContent = burstSymbols[Math.floor(Math.random() * burstSymbols.length)];
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const distance = 40 + Math.random() * 40;
      el.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
      el.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      fxLayer.appendChild(el);
      window.setTimeout(() => el.remove(), 950);
    }
  });
});
