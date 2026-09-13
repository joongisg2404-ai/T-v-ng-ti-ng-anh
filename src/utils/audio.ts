/**
 * Web Speech API and Audio helpers
 */

let activeUtterance: SpeechSynthesisUtterance | null = null;
let speechSafetyTimer: any = null;

export function speakWord(text: string, onStart?: () => void, onEnd?: () => void): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    if (onEnd) onEnd();
    return;
  }

  if (speechSafetyTimer) {
    clearTimeout(speechSafetyTimer);
    speechSafetyTimer = null;
  }

  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();
  } catch {
    // Ignore cancel errors
  }

  const cleanText = text.replace(/[\r\n]+/g, ' ').trim();
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  activeUtterance = utterance;
  utterance.lang = 'en-US';
  utterance.rate = 0.88; // clear, learner-friendly pace
  utterance.pitch = 1.0;

  // Try to pick an English voice if available
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
  if (enVoice) {
    utterance.voice = enVoice;
  }

  let ended = false;
  const handleFinished = () => {
    if (ended) return;
    ended = true;
    if (speechSafetyTimer) {
      clearTimeout(speechSafetyTimer);
      speechSafetyTimer = null;
    }
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  if (onStart) {
    utterance.onstart = () => {
      onStart();
    };
  }
  utterance.onend = handleFinished;
  utterance.onerror = (e) => {
    console.warn('Speech synthesis error:', e);
    handleFinished();
  };

  // Safety fallback timeout in case the browser drops onend
  const estimatedDuration = Math.max(2500, cleanText.split(/\s+/).length * 600);
  speechSafetyTimer = setTimeout(handleFinished, estimatedDuration + 1000);

  try {
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Failed to speak word:', err);
    handleFinished();
  }
}

export function stopSpeech(): void {
  if (speechSafetyTimer) {
    clearTimeout(speechSafetyTimer);
    speechSafetyTimer = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

export function playAudioFeedback(type: 'success' | 'click' | 'correct' | 'wrong'): void {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch {
    // Ignore audio context autoplay restrictions
  }
}

// Relaxing Ambient Lo-Fi / Acoustic Chord Progression Synthesizer for Song Lyrics
let ambientAudioCtx: AudioContext | null = null;
let ambientIntervalId: any = null;
let ambientIsPlaying = false;

export function startAmbientMelody(genre: string = 'acoustic'): void {
  stopAmbientMelody();
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ambientAudioCtx = new AudioContextClass();
    ambientIsPlaying = true;

    // Chord progressions in C Major / A Minor (relaxing)
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C major
      [220.00, 261.63, 329.63, 440.00], // A minor
      [174.61, 220.00, 261.63, 349.23], // F major
      [196.00, 246.94, 293.66, 392.00], // G major
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!ambientAudioCtx || !ambientIsPlaying) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, noteIdx) => {
        if (!ambientAudioCtx) return;
        const osc = ambientAudioCtx.createOscillator();
        const gain = ambientAudioCtx.createGain();
        const filter = ambientAudioCtx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(850, ambientAudioCtx.currentTime);

        osc.type = noteIdx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);

        const startTime = ambientAudioCtx.currentTime + noteIdx * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.025, startTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ambientAudioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 3.0);
      });
    };

    playChord();
    ambientIntervalId = setInterval(playChord, 3000);
  } catch (err) {
    console.warn('Ambient synthesizer unavailable:', err);
  }
}

export function stopAmbientMelody(): void {
  ambientIsPlaying = false;
  if (ambientIntervalId) {
    clearInterval(ambientIntervalId);
    ambientIntervalId = null;
  }
  if (ambientAudioCtx) {
    try {
      ambientAudioCtx.close();
    } catch {
      // Ignore
    }
    ambientAudioCtx = null;
  }
}
