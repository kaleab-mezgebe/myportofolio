// Sound Synthesizer disabled/removed as per configuration
class SoundSynthesizer {
  constructor() {
    this.enabled = false;
  }
  init() {}
  toggleSound() { return false; }
  playClick() {}
  playBeep() {}
  playChime() {}
  playSuccess() {}
}

export const soundFx = new SoundSynthesizer();
