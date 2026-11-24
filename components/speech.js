'use client';
// Browser Text-to-Speech and Speech Recognition

export function speak(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  // Hindi / Sanskrit (Devanagari) text is read with a Hindi voice, everything else with an Indian English voice.
  const devanagari = /[ऀ-ॿ]/.test(text);
  const voice = devanagari
    ? voices.find((v) => v.lang === 'hi-IN') || voices.find((v) => v.lang?.startsWith('hi'))
    : voices.find((v) => v.lang === 'en-IN') || voices.find((v) => v.lang?.startsWith('en'));
  if (voice) { u.voice = voice; u.lang = voice.lang; } else { u.lang = devanagari ? 'hi-IN' : 'en-IN'; }
  u.rate = 0.92;
  window.speechSynthesis.speak(u);
  return true;
}

export function getRecognizer() {
  if (typeof window === 'undefined') return null;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  const r = new SR();
  r.lang = 'en-IN';
  r.interimResults = false;
  r.maxAlternatives = 1;
  return r;
}
