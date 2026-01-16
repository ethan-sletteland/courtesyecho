let audioContext = null;
let mediaStream = null;
let sourceNode = null;
let delayNode = null;
let gainNode = null;
let isListening = false;
let isToggling = false;

const statusEl = document.querySelector('.status');
const hintEl = document.querySelector('.hint');
const delaySlider = document.getElementById('delaySlider');
const delayDisplay = document.getElementById('delayDisplay');
const courtesyToggle = document.getElementById('courtesyToggle');
const incognitoToggle = document.getElementById('incognitoToggle');
const incognitoDismiss = document.getElementById('incognitoDismiss');
const themeToggle = document.getElementById('themeToggle');
const themeStorageKey = 'courtesy-theme';

const setTheme = (theme) => {
  document.body.classList.toggle('theme-light', theme === 'light');
  themeToggle.setAttribute('aria-pressed', theme === 'light');
  themeToggle.setAttribute(
    'aria-label',
    theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode',
  );
  localStorage.setItem(themeStorageKey, theme);
};

const storedTheme = localStorage.getItem(themeStorageKey);
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = storedTheme || (prefersLight ? 'light' : 'dark');
setTheme(initialTheme);

const setListeningState = (listening) => {
  statusEl.classList.toggle('listening', listening);
  statusEl.classList.toggle('paused', !listening);
  if (hintEl) {
    hintEl.textContent = listening ? 'tap to stop' : 'tap below for Courtesy Mode';
  }
};

// Update delay display when slider changes.
delaySlider.addEventListener('input', (e) => {
  const value = Number.parseFloat(e.target.value);
  delayDisplay.textContent = value.toFixed(1);
  if (delayNode) {
    delayNode.delayTime.value = value;
  }
});

const startListening = async () => {
  audioContext = new AudioContext();
  mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  sourceNode = audioContext.createMediaStreamSource(mediaStream);
  delayNode = audioContext.createDelay(5);
  gainNode = audioContext.createGain();
  delayNode.delayTime.value = Number.parseFloat(delaySlider.value);
  gainNode.gain.value = 0.8;
  sourceNode.connect(delayNode);
  delayNode.connect(gainNode);
  gainNode.connect(audioContext.destination);
  isListening = true;
  setListeningState(true);
};

const stopListening = async () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
    mediaStream = null;
  }
  if (sourceNode) {
    sourceNode.disconnect();
    sourceNode = null;
  }
  if (delayNode) {
    delayNode.disconnect();
    delayNode = null;
  }
  if (gainNode) {
    gainNode.disconnect();
    gainNode = null;
  }
  if (audioContext) {
    await audioContext.close();
    audioContext = null;
  }
  isListening = false;
  setListeningState(false);
};

// Toggle listening on body click.
courtesyToggle.addEventListener('click', async () => {
  if (isToggling) {
    return;
  }
  isToggling = true;
  try {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  } catch (error) {
    console.error('Audio toggle failed', error);
    await stopListening();
  } finally {
    isToggling = false;
  }
});

incognitoToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  document.body.classList.toggle('incognito');
});

incognitoDismiss.addEventListener('click', () => {
  document.body.classList.remove('incognito');
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
  setTheme(nextTheme);
});
