const ctx = () => {
  if (typeof window === 'undefined') return null;
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

const playTone = (freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.08) => {
  try {
    const ac = ctx();
    if (!ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime);
    gain.gain.setValueAtTime(vol, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + duration);
  } catch {}
};

export const sfx = {
  hover: () => playTone(1200, 0.08, 'sine', 0.04),
  click: () => playTone(800, 0.12, 'square', 0.05),
  navigate: () => {
    playTone(600, 0.1, 'sine', 0.06);
    setTimeout(() => playTone(900, 0.15, 'sine', 0.06), 80);
  },
  success: () => {
    playTone(523, 0.15, 'sine', 0.06);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.06), 120);
    setTimeout(() => playTone(784, 0.2, 'sine', 0.06), 240);
  },
  error: () => {
    playTone(300, 0.2, 'sawtooth', 0.05);
    setTimeout(() => playTone(200, 0.3, 'sawtooth', 0.05), 150);
  },
};
