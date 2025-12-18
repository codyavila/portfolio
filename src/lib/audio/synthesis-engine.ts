"use client";

/**
 * Synthesis Engine - "The Resonant Hum"
 * 
 * Bioluminescent audio synthesis for the Luminous UI.
 * Sounds like tapping underwater crystals or heavy glass.
 * Heavy use of reverb tails. Peaceful, futuristic aquarium aesthetic.
 * 
 * References: Nintendo Switch UI, PS5 Ambient menu, Annihilation soundtrack
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface ADSREnvelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export interface OscillatorConfig {
  type: OscillatorType;
  frequency: number;
  detune?: number;
  gain?: number;
}

export interface FilterConfig {
  type: BiquadFilterType;
  frequency: number;
  Q?: number;
  gain?: number;
}

export interface FMConfig {
  carrierFreq: number;
  modulatorFreq: number;
  modulationIndex: number;
  carrierType?: OscillatorType;
  modulatorType?: OscillatorType;
}

export interface HarmonicConfig {
  fundamental: number;
  harmonics: number[];
  harmonicSpread?: number;
}

export interface ReverbConfig {
  decay: number;
  wetDry: number;
  preDelay?: number;
  highCut?: number;
  lowCut?: number;
  /** Extra dampening for underwater feel */
  underwater?: boolean;
}

export interface StereoConfig {
  pan: number;
  width?: number;
}

export interface NoiseConfig {
  type: 'white' | 'pink' | 'brown';
  duration: number;
  bandpass?: { frequency: number; Q: number };
}

/** Glass resonance configuration */
export interface GlassResonanceConfig {
  /** Primary resonant frequency */
  frequency: number;
  /** Number of resonant modes (partials) */
  modes: number;
  /** Decay time in seconds */
  decay: number;
  /** Brightness (0-1, affects high frequency content) */
  brightness?: number;
  /** Material density (affects inharmonicity) */
  density?: number;
}

/** Water droplet configuration */
export interface DropletConfig {
  /** Pitch (semitones from A4, can be negative) */
  pitch: number;
  /** Size affects depth and duration (0-1) */
  size?: number;
  /** Ripple count */
  ripples?: number;
}

// ============================================================================
// Synthesis Engine Class
// ============================================================================

export class SynthesisEngine {
  private ctx: AudioContext;
  private masterGain: GainNode;
  private compressor: DynamicsCompressorNode;
  private limiter: DynamicsCompressorNode;
  private convolver: ConvolverNode | null = null;
  private impulseBuffer: AudioBuffer | null = null;
  
  // Underwater simulation - the "liquid medium"
  private underwaterFilter: BiquadFilterNode;
  private bassBoost: BiquadFilterNode;
  
  // Shared reverb bus - prevents reverb buildup from multiple connections
  private reverbBus: GainNode;
  private reverbPreDelay: DelayNode;
  private reverbHighCut: BiquadFilterNode;
  private reverbLowCut: BiquadFilterNode;
  private reverbWetGain: GainNode;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    
    // Master chain with underwater characteristics
    // "The sounds should feel like they are traveling through a liquid medium"
    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = 0.45;
    
    // Underwater low-pass filter - rolls off high frequencies
    // High frequencies are "slightly rolled off (dampened)"
    this.underwaterFilter = ctx.createBiquadFilter();
    this.underwaterFilter.type = 'lowpass';
    this.underwaterFilter.frequency.value = 5000;
    this.underwaterFilter.Q.value = 0.4;
    
    // "Bass frequencies travel deeply"
    this.bassBoost = ctx.createBiquadFilter();
    this.bassBoost.type = 'lowshelf';
    this.bassBoost.frequency.value = 200;
    this.bassBoost.gain.value = 3;
    
    // Gentle compression - transparent for organic sounds
    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -20;
    this.compressor.knee.value = 25;
    this.compressor.ratio.value = 2.5;
    this.compressor.attack.value = 0.01;
    this.compressor.release.value = 0.3;
    
    // Soft limiter to prevent clipping
    this.limiter = ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -1.5;
    this.limiter.knee.value = 5;
    this.limiter.ratio.value = 10;
    this.limiter.attack.value = 0.002;
    this.limiter.release.value = 0.15;
    
    // Connect master chain: source -> underwater -> bass -> compressor -> limiter -> output
    this.masterGain.connect(this.underwaterFilter);
    this.underwaterFilter.connect(this.bassBoost);
    this.bassBoost.connect(this.compressor);
    this.compressor.connect(this.limiter);
    this.limiter.connect(ctx.destination);
    
    // Create shared reverb bus (connected once after impulse is generated)
    this.reverbBus = ctx.createGain();
    this.reverbBus.gain.value = 1;
    
    this.reverbPreDelay = ctx.createDelay(1);
    this.reverbPreDelay.delayTime.value = 0.018;
    
    this.reverbLowCut = ctx.createBiquadFilter();
    this.reverbLowCut.type = 'highpass';
    this.reverbLowCut.frequency.value = 60;
    this.reverbLowCut.Q.value = 0.4;
    
    this.reverbHighCut = ctx.createBiquadFilter();
    this.reverbHighCut.type = 'lowpass';
    this.reverbHighCut.frequency.value = 3500;
    this.reverbHighCut.Q.value = 0.4;
    
    this.reverbWetGain = ctx.createGain();
    this.reverbWetGain.gain.value = 1;
    
    // Generate lush, cavernous impulse response
    // "Heavy use of reverb tails"
    this.generateCavernousImpulse();
  }

  get context(): AudioContext {
    return this.ctx;
  }

  get output(): GainNode {
    return this.masterGain;
  }

  get currentTime(): number {
    return this.ctx.currentTime;
  }

  // ==========================================================================
  // Cavernous/Underwater Impulse Response
  // "navigating a peaceful, futuristic aquarium"
  // ==========================================================================

  private generateCavernousImpulse(duration: number = 3.5, decay: number = 2.2): void {
    const sampleRate = this.ctx.sampleRate;
    const length = sampleRate * duration;
    const impulse = this.ctx.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        
        // Multi-stage decay simulating underwater/glass acoustics
        // Fast initial decay (the impact) + long smooth tail (the resonance)
        const fastDecay = Math.exp(-t * 10) * 0.25;
        const slowDecay = Math.exp(-t * decay) * 0.75;
        const envelope = fastDecay + slowDecay;
        
        // Early reflections - simulating glass/crystal surfaces
        // "hitting a thick pane of glass with a felt mallet"
        let early = 0;
        if (t < 0.1) {
          const reflections = [
            { time: 0.004, amp: 0.9, spread: 0.002 },
            { time: 0.011, amp: 0.6, spread: 0.003 },
            { time: 0.021, amp: 0.4, spread: 0.004 },
            { time: 0.035, amp: 0.3, spread: 0.005 },
            { time: 0.048, amp: 0.22, spread: 0.006 },
            { time: 0.065, amp: 0.15, spread: 0.007 },
            { time: 0.085, amp: 0.1, spread: 0.008 },
          ];
          
          reflections.forEach(({ time, amp, spread }) => {
            // Smeared/soft reflections (not sharp clicks)
            const dist = Math.abs(t - time);
            if (dist < spread) {
              const smear = Math.cos((dist / spread) * Math.PI * 0.5);
              // Alternate channels for spatial depth
              const stereoFlip = channel === 0 ? 1 : -0.85;
              early += amp * smear * stereoFlip;
            }
          });
        }
        
        // Diffuse underwater tail with filtered noise
        const noise = (Math.random() * 2 - 1);
        
        // Heavy high-frequency damping over time (underwater physics)
        const hfDamping = Math.exp(-t * 5);
        
        // Low-frequency rumble layer (underwater depth sensation)
        const lowRumble = Math.sin(t * 25 + channel * 0.3) * 
                          Math.exp(-t * 2.5) * 0.08;
        
        // Combine: early reflections + diffuse tail + rumble
        channelData[i] = (
          early * 0.35 + 
          noise * envelope * hfDamping * 0.4 +
          lowRumble
        ) * 0.7;
      }
    }
    
    this.impulseBuffer = impulse;
    this.convolver = this.ctx.createConvolver();
    this.convolver.buffer = this.impulseBuffer;
    
    // Connect the shared reverb bus ONCE here
    // reverbBus -> preDelay -> lowCut -> convolver -> highCut -> wetGain -> masterGain
    this.reverbBus.connect(this.reverbPreDelay);
    this.reverbPreDelay.connect(this.reverbLowCut);
    this.reverbLowCut.connect(this.convolver);
    this.convolver.connect(this.reverbHighCut);
    this.reverbHighCut.connect(this.reverbWetGain);
    this.reverbWetGain.connect(this.masterGain);
  }

  // ==========================================================================
  // ADSR Envelope Generator
  // ==========================================================================

  applyADSR(
    param: AudioParam,
    envelope: ADSREnvelope,
    peakValue: number,
    startTime: number,
    duration: number
  ): void {
    const { attack, decay, sustain, release } = envelope;
    const sustainLevel = peakValue * sustain;
    
    param.setValueAtTime(0.0001, startTime);
    param.exponentialRampToValueAtTime(peakValue, startTime + attack);
    param.exponentialRampToValueAtTime(
      Math.max(sustainLevel, 0.0001),
      startTime + attack + decay
    );
    
    const sustainEnd = startTime + duration - release;
    if (sustainEnd > startTime + attack + decay) {
      param.setValueAtTime(Math.max(sustainLevel, 0.0001), sustainEnd);
    }
    
    param.exponentialRampToValueAtTime(0.0001, startTime + duration);
  }

  /** 
   * Resonant envelope for glass/water sounds
   * Uses setTargetAtTime for natural, organic decay
   */
  applyResonantEnvelope(
    param: AudioParam,
    peakValue: number,
    startTime: number,
    decayTime: number,
    resonance: number = 0.6
  ): void {
    const attack = 0.001 + resonance * 0.008;
    
    param.setValueAtTime(0.0001, startTime);
    param.exponentialRampToValueAtTime(peakValue, startTime + attack);
    
    // Natural exponential decay using time constant
    // This creates the "ringing" quality of glass
    param.setTargetAtTime(0.0001, startTime + attack, decayTime / 4);
  }

  applyPercussiveEnvelope(
    param: AudioParam,
    attack: number,
    decay: number,
    peakValue: number,
    startTime: number
  ): void {
    param.setValueAtTime(0.0001, startTime);
    param.exponentialRampToValueAtTime(peakValue, startTime + attack);
    param.exponentialRampToValueAtTime(0.0001, startTime + attack + decay);
  }

  // ==========================================================================
  // Glass Resonance Synthesis
  // "hitting a thick pane of glass with a felt mallet"
  // ==========================================================================

  createGlassResonance(config: GlassResonanceConfig): {
    nodes: OscillatorNode[];
    gains: GainNode[];
    masterGain: GainNode;
  } {
    const { frequency, modes, decay, brightness = 0.5, density = 0.4 } = config;
    const nodes: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    const masterGain = this.ctx.createGain();
    masterGain.gain.value = 0;
    
    // Glass has slightly inharmonic partials (not perfect integer multiples)
    // This creates the characteristic "ring" vs a pure tone
    const inharmonicity = 0.008 + density * 0.025;
    
    for (let i = 0; i < modes; i++) {
      const n = i + 1;
      // Calculate partial frequency with glass-like inharmonicity
      const partialFreq = frequency * n * Math.sqrt(1 + inharmonicity * n * n);
      
      // Amplitude falls off with partial number, modified by brightness
      const amplitude = Math.pow(0.55, i * (1.1 - brightness * 0.4)) / modes;
      
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = partialFreq;
      // Subtle organic detuning
      osc.detune.value = (Math.random() - 0.5) * 4;
      
      const gain = this.ctx.createGain();
      gain.gain.value = amplitude;
      
      osc.connect(gain);
      gain.connect(masterGain);
      
      nodes.push(osc);
      gains.push(gain);
    }
    
    return { nodes, gains, masterGain };
  }

  // ==========================================================================
  // Water Droplet Synthesis
  // "A Water Droplet hitting a pool, or a finger tapping a wine glass"
  // ==========================================================================

  createWaterDroplet(config: DropletConfig): {
    primary: OscillatorNode;
    sub: OscillatorNode;
    filter: BiquadFilterNode;
    primaryGain: GainNode;
    subGain: GainNode;
    output: GainNode;
  } {
    const { pitch, size = 0.5 } = config;
    
    // Base frequency from pitch (semitones from A4)
    const baseFreq = 440 * Math.pow(2, pitch / 12);
    
    // Primary droplet tone - the "plip"
    const primary = this.ctx.createOscillator();
    primary.type = 'sine';
    primary.frequency.value = baseFreq;
    
    // Sub tone for body/depth - the ripple
    const sub = this.ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = baseFreq * 0.5;
    
    // Resonant bandpass for liquid quality
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = baseFreq * 1.2;
    filter.Q.value = 6 + size * 12;
    
    const primaryGain = this.ctx.createGain();
    primaryGain.gain.value = 0;
    
    const subGain = this.ctx.createGain();
    subGain.gain.value = 0;
    
    const output = this.ctx.createGain();
    output.gain.value = 1;
    
    primary.connect(filter);
    filter.connect(primaryGain);
    primaryGain.connect(output);
    
    sub.connect(subGain);
    subGain.connect(output);
    
    return { primary, sub, filter, primaryGain, subGain, output };
  }

  // ==========================================================================
  // Shimmer/Breath Synthesis
  // "a faint aural glow... like a lightsaber idling, but much softer"
  // ==========================================================================

  createShimmer(
    startFreq: number = 200,
    endFreq: number = 400,
    duration: number = 0.1
  ): {
    osc: OscillatorNode;
    lfo: OscillatorNode;
    gain: GainNode;
    lfoGain: GainNode;
    filter: BiquadFilterNode;
  } {
    // Main sine sweep
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = startFreq;
    
    // Subtle amplitude modulation for shimmer texture
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 18; // Shimmer rate
    
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.25;
    
    const gain = this.ctx.createGain();
    gain.gain.value = 0;
    
    // High-shelf for ethereal quality
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highshelf';
    filter.frequency.value = 3000;
    filter.gain.value = -4;
    
    osc.connect(filter);
    filter.connect(gain);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    
    return { osc, lfo, gain, lfoGain, filter };
  }

  // ==========================================================================
  // Friction/Scroll Noise
  // "Like sliding your hand over a smooth, velvet surface or fine sand"
  // ==========================================================================

  createFrictionNoise(duration: number = 2): {
    source: AudioBufferSourceNode;
    filter: BiquadFilterNode;
    gain: GainNode;
  } {
    const sampleRate = this.ctx.sampleRate;
    const length = Math.ceil(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Pink noise for smooth, textural quality
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;
      
      data[i] = pink * 0.11;
    }
    
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    
    // Dynamic low-pass filter - frequency controlled by scroll velocity
    // "The faster you scroll, the brighter (higher frequency)"
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 0.8;
    
    const gain = this.ctx.createGain();
    gain.gain.value = 0;
    
    source.connect(filter);
    filter.connect(gain);
    
    return { source, filter, gain };
  }

  // ==========================================================================
  // Chime/Prism Synthesis (Notifications)
  // "Glass Chime or Kalimba note... like BOTW ambient sounds"
  // ==========================================================================

  createChime(frequency: number): {
    fundamental: OscillatorNode;
    harmonics: OscillatorNode[];
    gains: GainNode[];
    masterGain: GainNode;
  } {
    const masterGain = this.ctx.createGain();
    masterGain.gain.value = 0;
    
    // Kalimba/glass chime harmonic structure
    // Slightly inharmonic for crystalline quality
    const harmonicRatios = [1, 2.92, 5.4, 8.2, 11.8];
    const harmonicAmps = [1, 0.4, 0.18, 0.08, 0.03];
    
    const fundamental = this.ctx.createOscillator();
    fundamental.type = 'sine';
    fundamental.frequency.value = frequency;
    
    const fundGain = this.ctx.createGain();
    fundGain.gain.value = harmonicAmps[0];
    fundamental.connect(fundGain);
    fundGain.connect(masterGain);
    
    const harmonics: OscillatorNode[] = [];
    const gains: GainNode[] = [fundGain];
    
    for (let i = 1; i < harmonicRatios.length; i++) {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = frequency * harmonicRatios[i];
      // Slight random detuning for organic shimmer
      osc.detune.value = (Math.random() - 0.5) * 6;
      
      const gain = this.ctx.createGain();
      gain.gain.value = harmonicAmps[i];
      
      osc.connect(gain);
      gain.connect(masterGain);
      
      harmonics.push(osc);
      gains.push(gain);
    }
    
    return { fundamental, harmonics, gains, masterGain };
  }

  // ==========================================================================
  // Thud/Impact for scroll end
  // "When you hit the bottom, a soft 'thud' (bass kick)"
  // ==========================================================================

  createThud(depth: number = 0.5): {
    osc: OscillatorNode;
    noise: AudioBufferSourceNode;
    oscGain: GainNode;
    noiseGain: GainNode;
    filter: BiquadFilterNode;
    output: GainNode;
  } {
    // Deep sine for sub thud
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 50 + depth * 30;
    
    // Noise burst for impact texture
    const noiseLength = Math.ceil(this.ctx.sampleRate * 0.1);
    const noiseBuffer = this.ctx.createBuffer(1, noiseLength, this.ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    
    // Brown noise for deep rumble
    let lastOut = 0;
    for (let i = 0; i < noiseLength; i++) {
      const white = Math.random() * 2 - 1;
      noiseData[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = noiseData[i];
      noiseData[i] *= 3;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    
    const oscGain = this.ctx.createGain();
    oscGain.gain.value = 0;
    
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.value = 0;
    
    // Low-pass for muffled thud
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 150;
    filter.Q.value = 1;
    
    const output = this.ctx.createGain();
    output.gain.value = 1;
    
    osc.connect(oscGain);
    noise.connect(noiseGain);
    oscGain.connect(filter);
    noiseGain.connect(filter);
    filter.connect(output);
    
    return { osc, noise, oscGain, noiseGain, filter, output };
  }

  // ==========================================================================
  // Standard Oscillator Creation
  // ==========================================================================

  createOscillator(config: OscillatorConfig): OscillatorNode {
    const osc = this.ctx.createOscillator();
    osc.type = config.type;
    osc.frequency.value = config.frequency;
    if (config.detune) osc.detune.value = config.detune;
    return osc;
  }

  createUnisonOscillators(
    baseFreq: number,
    type: OscillatorType,
    voices: number,
    detuneSpread: number
  ): OscillatorNode[] {
    const oscs: OscillatorNode[] = [];
    const detuneStep = voices > 1 ? detuneSpread / (voices - 1) : 0;
    
    for (let i = 0; i < voices; i++) {
      const detune = -detuneSpread / 2 + detuneStep * i;
      oscs.push(this.createOscillator({
        type,
        frequency: baseFreq,
        detune
      }));
    }
    
    return oscs;
  }

  // ==========================================================================
  // FM Synthesis
  // ==========================================================================

  createFMPair(config: FMConfig): { 
    carrier: OscillatorNode; 
    modulator: OscillatorNode; 
    modGain: GainNode 
  } {
    const carrier = this.ctx.createOscillator();
    carrier.type = config.carrierType || 'sine';
    carrier.frequency.value = config.carrierFreq;
    
    const modulator = this.ctx.createOscillator();
    modulator.type = config.modulatorType || 'sine';
    modulator.frequency.value = config.modulatorFreq;
    
    const modGain = this.ctx.createGain();
    modGain.gain.value = config.modulationIndex * config.modulatorFreq;
    
    modulator.connect(modGain);
    modGain.connect(carrier.frequency);
    
    return { carrier, modulator, modGain };
  }

  // ==========================================================================
  // Harmonic Series
  // ==========================================================================

  createHarmonicSeries(config: HarmonicConfig): { 
    oscs: OscillatorNode[]; 
    gains: GainNode[] 
  } {
    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    
    config.harmonics.forEach((amplitude, index) => {
      const harmonic = index + 1;
      const freq = config.fundamental * harmonic;
      const spread = config.harmonicSpread || 0;
      const detune = (Math.random() - 0.5) * spread * harmonic;
      
      const osc = this.createOscillator({
        type: 'sine',
        frequency: freq,
        detune
      });
      
      const gain = this.ctx.createGain();
      gain.gain.value = amplitude;
      
      osc.connect(gain);
      oscs.push(osc);
      gains.push(gain);
    });
    
    return { oscs, gains };
  }

  // ==========================================================================
  // Filter Creation
  // ==========================================================================

  createFilter(config: FilterConfig): BiquadFilterNode {
    const filter = this.ctx.createBiquadFilter();
    filter.type = config.type;
    filter.frequency.value = config.frequency;
    if (config.Q !== undefined) filter.Q.value = config.Q;
    if (config.gain !== undefined) filter.gain.value = config.gain;
    return filter;
  }

  // ==========================================================================
  // Reverb / Spatial Effects
  // ==========================================================================

  createReverbSend(config: ReverbConfig): { input: GainNode; output: GainNode } {
    const input = this.ctx.createGain();
    const output = this.ctx.createGain();
    const dry = this.ctx.createGain();
    const wet = this.ctx.createGain();
    
    dry.gain.value = 1 - config.wetDry;
    wet.gain.value = config.wetDry;
    
    // Dry path: input -> dry gain -> output
    input.connect(dry);
    dry.connect(output);
    
    // Wet path: input -> wet gain -> shared reverb bus (already connected to convolver)
    // This prevents multiple connections to the convolver causing reverb buildup
    if (this.convolver) {
      input.connect(wet);
      wet.connect(this.reverbBus);
    }
    
    return { input, output };
  }

  /**
   * Creates spatial depth effect
   * "Sound shouldn't feel like it's from the speakers; 
   *  it should feel like it's coming from behind the screen"
   */
  createSpatialDepth(): {
    input: GainNode;
    output: GainNode;
    setDepth: (depth: number) => void;
  } {
    const input = this.ctx.createGain();
    const output = this.ctx.createGain();
    
    // Subtle delays for depth perception
    const leftDelay = this.ctx.createDelay(0.1);
    const rightDelay = this.ctx.createDelay(0.1);
    leftDelay.delayTime.value = 0.00025;
    rightDelay.delayTime.value = 0.00045;
    
    // Cross-feed for "behind screen" effect
    const crossFeed = this.ctx.createGain();
    crossFeed.gain.value = 0.12;
    
    // Low-pass simulates distance
    const depthFilter = this.createFilter({
      type: 'lowpass',
      frequency: 9000,
      Q: 0.4
    });
    
    const splitter = this.ctx.createChannelSplitter(2);
    const merger = this.ctx.createChannelMerger(2);
    
    input.connect(depthFilter);
    depthFilter.connect(splitter);
    
    splitter.connect(leftDelay, 0);
    splitter.connect(rightDelay, 1);
    
    leftDelay.connect(merger, 0, 0);
    rightDelay.connect(merger, 0, 1);
    
    // Cross-feed
    leftDelay.connect(crossFeed);
    rightDelay.connect(crossFeed);
    crossFeed.connect(merger, 0, 0);
    crossFeed.connect(merger, 0, 1);
    
    merger.connect(output);
    
    return {
      input,
      output,
      setDepth: (depth: number) => {
        depthFilter.frequency.value = 12000 - depth * 7000;
        crossFeed.gain.value = 0.08 + depth * 0.2;
      }
    };
  }

  // ==========================================================================
  // Gain & Panner Creation
  // ==========================================================================

  createGain(value: number = 1): GainNode {
    const gain = this.ctx.createGain();
    gain.gain.value = value;
    return gain;
  }

  createStereoPanner(config: StereoConfig): StereoPannerNode {
    const panner = this.ctx.createStereoPanner();
    panner.pan.value = config.pan;
    return panner;
  }

  // ==========================================================================
  // Noise Generation
  // ==========================================================================

  createNoise(config: NoiseConfig): {
    source: AudioBufferSourceNode;
    filter: BiquadFilterNode | null;
  } {
    const sampleRate = this.ctx.sampleRate;
    const length = Math.ceil(sampleRate * config.duration);
    const buffer = this.ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    
    if (config.type === 'white') {
      for (let i = 0; i < length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (config.type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else { // brown
      let lastOut = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }
    }
    
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    
    let filter: BiquadFilterNode | null = null;
    if (config.bandpass) {
      filter = this.createFilter({
        type: 'bandpass',
        frequency: config.bandpass.frequency,
        Q: config.bandpass.Q
      });
    }
    
    return { source, filter };
  }

  // ==========================================================================
  // Parameter Scheduling
  // ==========================================================================

  scheduleFrequencySweep(
    param: AudioParam,
    startFreq: number,
    endFreq: number,
    startTime: number,
    duration: number
  ): void {
    param.setValueAtTime(startFreq, startTime);
    param.exponentialRampToValueAtTime(
      Math.max(endFreq, 0.001),
      startTime + duration
    );
  }

  scheduleLinearRamp(
    param: AudioParam,
    startValue: number,
    endValue: number,
    startTime: number,
    duration: number
  ): void {
    param.setValueAtTime(startValue, startTime);
    param.linearRampToValueAtTime(endValue, startTime + duration);
  }

  // ==========================================================================
  // Cleanup
  // ==========================================================================

  dispose(): void {
    this.convolver?.disconnect();
    this.masterGain.disconnect();
    this.compressor.disconnect();
    this.limiter.disconnect();
    this.underwaterFilter.disconnect();
    this.bassBoost.disconnect();
  }
}
