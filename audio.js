// Web Audio API Sound Synthesizer & Web Speech API Reader
// Self-contained sound effects with zero external network dependencies

class SoundManager {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.speechEnabled = true;
    this.speechVoice = null;
    this.initSpeech();
  }

  ensureAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initSpeech() {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Prefer child-friendly, energetic English voices
        this.speechVoice = voices.find(v => 
          (v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Daniel') || v.name.includes('Google') || v.name.includes('Natural')))
        ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  speak(text, onComplete) {
    if (!this.speechEnabled || !('speechSynthesis' in window)) {
      if (onComplete) onComplete();
      return;
    }
    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.speechVoice) {
        utterance.voice = this.speechVoice;
      }
      utterance.rate = 0.95; // Friendly, clear pace for 5-year-olds
      utterance.pitch = 1.15; // Slightly cheerful, friendly pitch
      if (onComplete) {
        utterance.onend = onComplete;
        utterance.onerror = onComplete;
      }
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      if (onComplete) onComplete();
    }
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Play button click pop
  playPop() {
    if (!this.soundEnabled) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.08);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Cheering sound effect for correct answers
  // Combines a bright major fanfare (C5, E5, G5, C6) + celebratory crowd/sparkle shimmer
  playCheer() {
    if (!this.soundEnabled) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Victory fanfare notes: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50)
    const notes = [
      { f: 523.25, start: 0.00, dur: 0.12 },
      { f: 659.25, start: 0.10, dur: 0.12 },
      { f: 783.99, start: 0.20, dur: 0.15 },
      { f: 1046.50, start: 0.32, dur: 0.45 }
    ];

    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t + note.start);

      // Warm slight vibrato on final high note
      if (note.dur > 0.3) {
        osc.frequency.setValueAtTime(note.f, t + note.start);
        osc.frequency.exponentialRampToValueAtTime(note.f + 15, t + note.start + note.dur * 0.5);
      }

      gain.gain.setValueAtTime(0.001, t + note.start);
      gain.gain.linearRampToValueAtTime(0.22, t + note.start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.start + note.dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + note.start);
      osc.stop(t + note.start + note.dur);
    });

    // Synthesized cheering / crowd sparkle noise
    const bufferSize = this.ctx.sampleRate * 0.7;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.35));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, t + 0.15);
    filter.Q.setValueAtTime(2.5, t + 0.15);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, t + 0.15);
    noiseGain.gain.linearRampToValueAtTime(0.18, t + 0.28);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.75);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    noise.start(t + 0.15);
    noise.stop(t + 0.75);
  }

  // Encouraging, gentle sound effect for wrong answers
  // Playful warm "boing-chime" that encourages trying again
  playEncouraging() {
    if (!this.soundEnabled) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Gentle 2-note warm chime (G4 -> A4 gentle lift)
    const gentleNotes = [
      { f: 392.00, start: 0.0, dur: 0.2 },
      { f: 440.00, start: 0.18, dur: 0.35 }
    ];

    gentleNotes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, t + note.start);
      osc.frequency.exponentialRampToValueAtTime(note.f * 1.05, t + note.start + note.dur);

      gain.gain.setValueAtTime(0.001, t + note.start);
      gain.gain.linearRampToValueAtTime(0.15, t + note.start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.start + note.dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + note.start);
      osc.stop(t + note.start + note.dur);
    });

    // Gentle warm wobble
    const oscWobble = this.ctx.createOscillator();
    const gainWobble = this.ctx.createGain();
    oscWobble.type = 'triangle';
    oscWobble.frequency.setValueAtTime(260, t);
    oscWobble.frequency.exponentialRampToValueAtTime(320, t + 0.35);

    gainWobble.gain.setValueAtTime(0.1, t);
    gainWobble.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    oscWobble.connect(gainWobble);
    gainWobble.connect(this.ctx.destination);

    oscWobble.start(t);
    oscWobble.stop(t + 0.35);
  }

  // Grand Finale celebratory fanfare with triumphant horns and firework pops
  playGrandCelebration() {
    if (!this.soundEnabled) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Triumphant orchestral fanfare chords:
    // G4 -> C5 -> E5 -> G5 -> C6 sustained with shimmer
    const fanfareChords = [
      { notes: [392, 523], start: 0.0, dur: 0.2 },
      { notes: [440, 587], start: 0.22, dur: 0.2 },
      { notes: [523, 659], start: 0.44, dur: 0.25 },
      { notes: [523, 659, 784, 1046], start: 0.72, dur: 1.2 }
    ];

    fanfareChords.forEach(chord => {
      chord.notes.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + chord.start);

        gain.gain.setValueAtTime(0.001, t + chord.start);
        gain.gain.linearRampToValueAtTime(0.18 / chord.notes.length, t + chord.start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + chord.start + chord.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + chord.start);
        osc.stop(t + chord.start + chord.dur);
      });
    });

    // Synthesized celebratory applause & fireworks bursts
    [0.3, 0.7, 1.1, 1.5].forEach(fireworkDelay => {
      const bSize = this.ctx.sampleRate * 0.4;
      const b = this.ctx.createBuffer(1, bSize, this.ctx.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < bSize; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = b;

      const f = this.ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.setValueAtTime(1200 + Math.random() * 800, t + fireworkDelay);
      f.Q.setValueAtTime(3.0, t + fireworkDelay);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.15, t + fireworkDelay);
      g.gain.exponentialRampToValueAtTime(0.001, t + fireworkDelay + 0.4);

      noise.connect(f);
      f.connect(g);
      g.connect(this.ctx.destination);

      noise.start(t + fireworkDelay);
      noise.stop(t + fireworkDelay + 0.4);
    });
  }
}

export const soundManager = new SoundManager();
