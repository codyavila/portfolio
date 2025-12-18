"use client";

/**
 * Sound Player - "The Resonant Hum"
 * 
 * Main interface for playing bioluminescent UI sounds.
 * Features:
 * - Glass resonance synthesis
 * - Water droplet sounds with pitch variation
 * - Scroll friction with velocity-based filtering
 * - Generative drone integration
 */

import { SynthesisEngine } from './synthesis-engine';
import { GenerativeDrone, getDrone } from './drone';
import { 
  SOUND_PRESETS, 
  TICK_SCALE, 
  NAV_NOTES, 
  type SoundPreset, 
  type LayerConfig,
  type SoundPresetName 
} from './sound-presets';

// ============================================================================
// Types
// ============================================================================

interface PlayOptions {
  /** Override the base frequency */
  frequency?: number;
  /** Stereo pan override (-1 to 1) */
  pan?: number;
  /** Volume multiplier (0 to 1) */
  volume?: number;
  /** Pitch variation in semitones (overrides preset) */
  pitchVariation?: number;
}

interface ScrollState {
  source: AudioBufferSourceNode | null;
  filter: BiquadFilterNode | null;
  gain: GainNode | null;
  isScrolling: boolean;
  lastVelocity: number;
}

// ============================================================================
// Sound Player Class
// ============================================================================

export class SoundPlayer {
  private engine: SynthesisEngine | null = null;
  private ctx: AudioContext | null = null;
  private drone: GenerativeDrone | null = null;
  private initialized = false;
  
  // Throttling
  private lastTickTime = 0;
  private tickThrottleMs = 40;
  private lastSliderTickTime = 0;
  private sliderTickThrottleMs = 65;
  private lastHoverTime = 0;
  private hoverThrottleMs = 80;
  
  // Scroll state
  private scrollState: ScrollState = {
    source: null,
    filter: null,
    gain: null,
    isScrolling: false,
    lastVelocity: 0,
  };
  private scrollFadeTimeout: ReturnType<typeof setTimeout> | null = null;

  // ==========================================================================
  // Initialization
  // ==========================================================================

  init(): void {
    if (this.initialized) return;

    try {
      const AudioContextClass = window.AudioContext || 
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      
      if (!AudioContextClass) {
        console.warn('Web Audio API not supported');
        return;
      }

      this.ctx = new AudioContextClass();
      this.engine = new SynthesisEngine(this.ctx);
      this.drone = getDrone(this.engine);
      this.initialized = true;
    } catch (error) {
      console.warn('Failed to initialize audio:', error);
    }
  }

  async resume(): Promise<void> {
    if (this.ctx?.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  get isReady(): boolean {
    return this.initialized && this.ctx?.state === 'running';
  }

  // ==========================================================================
  // Core Playback
  // ==========================================================================

  play(presetName: SoundPresetName, options: PlayOptions = {}): void {
    if (!this.engine || !this.ctx) {
      this.init();
      if (!this.engine || !this.ctx) return;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const preset = SOUND_PRESETS[presetName];
    if (!preset) {
      console.warn(`Sound preset "${presetName}" not found`);
      return;
    }

    this.playPreset(preset, options);
  }

  private playPreset(preset: SoundPreset, options: PlayOptions): void {
    if (!this.engine || !this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Calculate pitch variation
    const pitchVariation = options.pitchVariation ?? preset.pitchVariation ?? 0;
    const pitchOffset = pitchVariation > 0 
      ? (Math.random() - 0.5) * 2 * pitchVariation 
      : 0;
    const pitchMultiplier = Math.pow(2, pitchOffset / 12);
    
    const masterGain = this.engine.createGain(
      (preset.masterGain ?? 1) * (options.volume ?? 1)
    );
    
    // Create reverb send if preset uses reverb
    let reverbSend: { input: GainNode; output: GainNode } | null = null;
    if (preset.reverb) {
      reverbSend = this.engine.createReverbSend(preset.reverb);
      reverbSend.output.connect(this.engine.output);
    }

    // Play each layer
    preset.layers.forEach(layer => {
      this.playLayer(
        layer, 
        preset.duration, 
        now, 
        masterGain, 
        reverbSend?.input ?? masterGain, 
        options,
        pitchMultiplier
      );
    });

    masterGain.connect(this.engine.output);
  }

  private playLayer(
    layer: LayerConfig,
    duration: number,
    startTime: number,
    masterGain: GainNode,
    reverbInput: GainNode,
    options: PlayOptions,
    pitchMultiplier: number
  ): void {
    if (!this.engine || !this.ctx) return;

    const layerStart = startTime + (layer.delay ?? 0);
    const layerDuration = duration - (layer.delay ?? 0);

    // Create layer gain
    const layerGain = this.engine.createGain(0);
    
    // Apply envelope
    this.engine.applyADSR(
      layerGain.gain,
      layer.envelope,
      layer.gain,
      layerStart,
      layerDuration
    );

    // Create stereo panner
    let outputNode: AudioNode = layerGain;
    if (layer.pan !== undefined || options.pan !== undefined) {
      const panner = this.engine.createStereoPanner({ 
        pan: options.pan ?? layer.pan ?? 0 
      });
      layerGain.connect(panner);
      outputNode = panner;
    }

    // Create filter if specified
    let filterNode: BiquadFilterNode | null = null;
    if (layer.filter) {
      filterNode = this.engine.createFilter({
        type: layer.filter.type,
        frequency: typeof layer.filter.frequency === 'number' 
          ? layer.filter.frequency * pitchMultiplier
          : layer.filter.frequency.start * pitchMultiplier,
        Q: layer.filter.Q,
        gain: layer.filter.gain,
      });

      // Animate filter frequency if it's a sweep
      if (typeof layer.filter.frequency === 'object') {
        this.engine.scheduleFrequencySweep(
          filterNode.frequency,
          layer.filter.frequency.start * pitchMultiplier,
          layer.filter.frequency.end * pitchMultiplier,
          layerStart,
          layerDuration * 0.85
        );
      }
    }

    // Connect to output chain
    outputNode.connect(reverbInput);
    outputNode.connect(masterGain);

    // Create sound source based on layer type
    switch (layer.type) {
      case 'oscillator':
        this.createOscillatorLayer(layer, layerStart, layerDuration, layerGain, filterNode, options, pitchMultiplier);
        break;
      case 'fm':
        this.createFMLayer(layer, layerStart, layerDuration, layerGain, filterNode, pitchMultiplier);
        break;
      case 'harmonic':
        this.createHarmonicLayer(layer, layerStart, layerDuration, layerGain, filterNode, pitchMultiplier);
        break;
      case 'noise':
        this.createNoiseLayer(layer, layerStart, layerDuration, layerGain, filterNode);
        break;
      case 'glass':
        this.createGlassLayer(layer, layerStart, layerDuration, layerGain, filterNode, pitchMultiplier);
        break;
      case 'droplet':
        this.createDropletLayer(layer, layerStart, layerDuration, layerGain, filterNode, pitchMultiplier);
        break;
      case 'shimmer':
        this.createShimmerLayer(layer, layerStart, layerDuration, layerGain, filterNode, pitchMultiplier);
        break;
      case 'chime':
        this.createChimeLayer(layer, layerStart, layerDuration, layerGain, filterNode, pitchMultiplier);
        break;
    }
  }

  // ==========================================================================
  // Layer Creators
  // ==========================================================================

  private createOscillatorLayer(
    layer: LayerConfig,
    startTime: number,
    duration: number,
    outputGain: GainNode,
    filter: BiquadFilterNode | null,
    options: PlayOptions,
    pitchMultiplier: number
  ): void {
    if (!this.engine || !this.ctx || !layer.oscillator) return;

    const oscConfig = layer.oscillator;
    const baseFreq = (options.frequency ?? (
      typeof oscConfig.frequency === 'number' 
        ? oscConfig.frequency 
        : oscConfig.frequency.start
    )) * pitchMultiplier;

    const voiceCount = oscConfig.unison ?? 1;
    const voices = this.engine.createUnisonOscillators(
      baseFreq,
      oscConfig.type,
      voiceCount,
      oscConfig.unisonSpread ?? 0
    );

    // Apply frequency sweep if specified
    if (typeof oscConfig.frequency === 'object') {
      const freqObj = oscConfig.frequency as { start: number; end: number };
      voices.forEach(osc => {
        this.engine!.scheduleFrequencySweep(
          osc.frequency,
          freqObj.start * pitchMultiplier,
          freqObj.end * pitchMultiplier,
          startTime,
          duration * 0.9
        );
      });
    }

    const voiceGain = this.engine.createGain(1 / Math.sqrt(voiceCount));
    
    voices.forEach(osc => {
      if (filter) {
        osc.connect(filter);
        filter.connect(voiceGain);
      } else {
        osc.connect(voiceGain);
      }
      osc.start(startTime);
      osc.stop(startTime + duration + 0.5);
    });

    voiceGain.connect(outputGain);
  }

  private createFMLayer(
    layer: LayerConfig,
    startTime: number,
    duration: number,
    outputGain: GainNode,
    filter: BiquadFilterNode | null,
    pitchMultiplier: number
  ): void {
    if (!this.engine || !layer.fm) return;

    const fmConfig = {
      ...layer.fm,
      carrierFreq: layer.fm.carrierFreq * pitchMultiplier,
      modulatorFreq: layer.fm.modulatorFreq * pitchMultiplier,
    };

    const { carrier, modulator, modGain } = this.engine.createFMPair(fmConfig);

    if (filter) {
      carrier.connect(filter);
      filter.connect(outputGain);
    } else {
      carrier.connect(outputGain);
    }

    carrier.start(startTime);
    modulator.start(startTime);
    carrier.stop(startTime + duration + 0.5);
    modulator.stop(startTime + duration + 0.5);
  }

  private createHarmonicLayer(
    layer: LayerConfig,
    startTime: number,
    duration: number,
    outputGain: GainNode,
    filter: BiquadFilterNode | null,
    pitchMultiplier: number
  ): void {
    if (!this.engine || !layer.harmonic) return;

    const config = {
      ...layer.harmonic,
      fundamental: layer.harmonic.fundamental * pitchMultiplier,
    };

    const { oscs, gains } = this.engine.createHarmonicSeries(config);

    oscs.forEach((osc, i) => {
      if (filter) {
        gains[i].connect(filter);
        filter.connect(outputGain);
      } else {
        gains[i].connect(outputGain);
      }
      osc.start(startTime);
      osc.stop(startTime + duration + 0.5);
    });
  }

  private createNoiseLayer(
    layer: LayerConfig,
    startTime: number,
    duration: number,
    outputGain: GainNode,
    filter: BiquadFilterNode | null
  ): void {
    if (!this.engine || !layer.noise) return;

    const { source, filter: noiseFilter } = this.engine.createNoise({
      type: layer.noise.type,
      duration: duration + 0.5,
      bandpass: layer.noise.bandpass,
    });

    if (noiseFilter) {
      source.connect(noiseFilter);
      if (filter) {
        noiseFilter.connect(filter);
        filter.connect(outputGain);
      } else {
        noiseFilter.connect(outputGain);
      }
    } else if (filter) {
      source.connect(filter);
      filter.connect(outputGain);
    } else {
      source.connect(outputGain);
    }

    source.start(startTime);
    source.stop(startTime + duration + 0.5);
  }

  private createGlassLayer(
    layer: LayerConfig,
    startTime: number,
    duration: number,
    outputGain: GainNode,
    filter: BiquadFilterNode | null,
    pitchMultiplier: number
  ): void {
    if (!this.engine || !this.ctx || !layer.glass) return;

    const config = {
      ...layer.glass,
      frequency: layer.glass.frequency * pitchMultiplier,
      decay: duration,
    };

    const { nodes, gains, masterGain } = this.engine.createGlassResonance(config);

    // Apply resonant envelope to master
    this.engine.applyResonantEnvelope(
      masterGain.gain,
      layer.gain,
      startTime,
      duration,
      0.7
    );

    if (filter) {
      masterGain.connect(filter);
      filter.connect(outputGain);
    } else {
      masterGain.connect(outputGain);
    }

    // Apply individual decay to each mode
    nodes.forEach((osc, i) => {
      const modeDecay = duration * Math.pow(0.75, i * 0.4);
      this.engine!.applyResonantEnvelope(
        gains[i].gain,
        gains[i].gain.value,
        startTime,
        modeDecay,
        0.5
      );
      osc.start(startTime);
      osc.stop(startTime + duration + 1);
    });
  }

  private createDropletLayer(
    layer: LayerConfig,
    startTime: number,
    duration: number,
    outputGain: GainNode,
    filter: BiquadFilterNode | null,
    pitchMultiplier: number
  ): void {
    if (!this.engine || !this.ctx || !layer.droplet) return;

    // Apply pitch multiplier to the droplet pitch offset
    const adjustedPitch = layer.droplet.pitch + Math.log2(pitchMultiplier) * 12;

    const { primary, sub, filter: dropletFilter, primaryGain, subGain, output } = 
      this.engine.createWaterDroplet({
        ...layer.droplet,
        pitch: adjustedPitch,
      });

    // Droplet envelope - quick attack, pitch drop
    const now = startTime;
    const attackTime = 0.001;
    const decayTime = duration * 0.8;

    // Primary tone with pitch drop
    primaryGain.gain.setValueAtTime(0.001, now);
    primaryGain.gain.exponentialRampToValueAtTime(layer.gain, now + attackTime);
    primaryGain.gain.exponentialRampToValueAtTime(0.001, now + decayTime);

    // Sub tone
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.exponentialRampToValueAtTime(layer.gain * 0.4, now + attackTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + decayTime * 0.6);

    // Pitch drop on primary
    const baseFreq = 440 * Math.pow(2, adjustedPitch / 12);
    primary.frequency.setValueAtTime(baseFreq, now);
    primary.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + decayTime);

    // Filter Q decay (splash to settle)
    dropletFilter.Q.setValueAtTime(dropletFilter.Q.value, now);
    dropletFilter.Q.linearRampToValueAtTime(1, now + decayTime);

    if (filter) {
      output.connect(filter);
      filter.connect(outputGain);
    } else {
      output.connect(outputGain);
    }

    primary.start(startTime);
    sub.start(startTime);
    primary.stop(startTime + duration + 0.3);
    sub.stop(startTime + duration + 0.3);
  }

  private createShimmerLayer(
    layer: LayerConfig,
    startTime: number,
    duration: number,
    outputGain: GainNode,
    filter: BiquadFilterNode | null,
    pitchMultiplier: number
  ): void {
    if (!this.engine || !this.ctx || !layer.shimmer) return;

    const startFreq = layer.shimmer.startFreq * pitchMultiplier;
    const endFreq = layer.shimmer.endFreq * pitchMultiplier;

    const { osc, lfo, gain, filter: shimmerFilter } = this.engine.createShimmer(
      startFreq,
      endFreq,
      duration
    );

    // Apply envelope
    this.engine.applyADSR(
      gain.gain,
      layer.envelope,
      layer.gain,
      startTime,
      duration
    );

    // Frequency sweep
    this.engine.scheduleFrequencySweep(
      osc.frequency,
      startFreq,
      endFreq,
      startTime,
      duration * 0.9
    );

    if (filter) {
      gain.connect(filter);
      filter.connect(outputGain);
    } else {
      gain.connect(outputGain);
    }

    osc.start(startTime);
    lfo.start(startTime);
    osc.stop(startTime + duration + 0.2);
    lfo.stop(startTime + duration + 0.2);
  }

  private createChimeLayer(
    layer: LayerConfig,
    startTime: number,
    duration: number,
    outputGain: GainNode,
    filter: BiquadFilterNode | null,
    pitchMultiplier: number
  ): void {
    if (!this.engine || !this.ctx || !layer.chimeConfig) return;

    const frequency = layer.chimeConfig.frequency * pitchMultiplier;

    const { fundamental, harmonics, gains, masterGain } = this.engine.createChime(frequency);

    // Apply bell envelope to master
    this.engine.applyResonantEnvelope(
      masterGain.gain,
      layer.gain,
      startTime,
      duration,
      0.8
    );

    // Individual harmonic decay
    gains.forEach((gain, i) => {
      const harmonicDecay = duration * Math.pow(0.7, i * 0.5);
      this.engine!.applyResonantEnvelope(
        gain.gain,
        gain.gain.value,
        startTime,
        harmonicDecay,
        0.6
      );
    });

    if (filter) {
      masterGain.connect(filter);
      filter.connect(outputGain);
    } else {
      masterGain.connect(outputGain);
    }

    fundamental.start(startTime);
    harmonics.forEach(h => h.start(startTime));
    
    fundamental.stop(startTime + duration + 1);
    harmonics.forEach(h => h.stop(startTime + duration + 1));
  }

  // ==========================================================================
  // Specialized Play Methods
  // ==========================================================================

  /** Play tick with value-mapped pitch */
  playTick(value: number, min: number, max: number): void {
    const now = Date.now();
    if (now - this.lastTickTime < this.tickThrottleMs) return;
    this.lastTickTime = now;

    const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
    const noteIndex = Math.floor(normalized * (TICK_SCALE.length - 1));
    const frequency = TICK_SCALE[noteIndex];

    this.play('tick', { frequency, volume: 0.7 });
  }

  /** 
   * Play satisfying slider tick with value-mapped pitch 
   * Quieter and less frequent than other sounds - for time travel slider
   */
  playSliderTick(value: number, min: number, max: number): void {
    const now = Date.now();
    if (now - this.lastSliderTickTime < this.sliderTickThrottleMs) return;
    this.lastSliderTickTime = now;

    // Map to a wider pitch range for more dramatic pitch change
    const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
    // Use full scale range for more noticeable pitch variation
    const noteIndex = Math.floor(normalized * (TICK_SCALE.length - 1));
    const frequency = TICK_SCALE[noteIndex];
    
    // Additional pitch multiplier for more dramatic range (0.7x to 1.4x)
    const pitchMultiplier = 0.7 + normalized * 0.7;

    this.play('sliderTick', { frequency: frequency * pitchMultiplier, volume: 0.35 });
  }

  /** Play navigation note for menu index */
  playNavNote(index: number): void {
    const frequency = NAV_NOTES[index % NAV_NOTES.length];
    this.play('hover', { frequency, volume: 0.6 });
  }

  /** Play hover with throttling */
  playHover(): void {
    const now = Date.now();
    if (now - this.lastHoverTime < this.hoverThrottleMs) return;
    this.lastHoverTime = now;
    
    this.play('hover');
  }

  /** Play click with optional secondary variant */
  playClick(secondary: boolean = false): void {
    this.play(secondary ? 'clickSecondary' : 'click');
  }

  /** Play scroll stop thud */
  playScrollStop(): void {
    this.play('scrollStop');
  }

  // ==========================================================================
  // Scroll Friction System
  // "Like sliding your hand over a smooth, velvet surface"
  // ==========================================================================

  /**
   * Update scroll state - call on each scroll event
   * @param velocity Scroll velocity (pixels per second, roughly)
   */
  updateScroll(velocity: number): void {
    if (!this.engine || !this.ctx) {
      this.init();
      if (!this.engine || !this.ctx) return;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const absVelocity = Math.abs(velocity);
    
    // Start scroll sound if not already scrolling
    if (!this.scrollState.isScrolling && absVelocity > 50) {
      this.startScrollSound();
    }

    if (this.scrollState.isScrolling && this.scrollState.filter && this.scrollState.gain) {
      // Map velocity to filter frequency
      // "The faster you scroll, the brighter (higher frequency)"
      const minFreq = 400;
      const maxFreq = 3500;
      const velocityNorm = Math.min(absVelocity / 2000, 1);
      const targetFreq = minFreq + (maxFreq - minFreq) * Math.pow(velocityNorm, 0.6);
      
      // Smooth filter movement
      const now = this.ctx.currentTime;
      this.scrollState.filter.frequency.setTargetAtTime(targetFreq, now, 0.05);
      
      // Volume based on velocity
      const targetGain = 0.02 + velocityNorm * 0.04;
      this.scrollState.gain.gain.setTargetAtTime(targetGain, now, 0.03);
      
      this.scrollState.lastVelocity = absVelocity;
    }

    // Reset fade timeout
    if (this.scrollFadeTimeout) {
      clearTimeout(this.scrollFadeTimeout);
    }
    
    this.scrollFadeTimeout = setTimeout(() => {
      this.stopScrollSound();
    }, 100);
  }

  private startScrollSound(): void {
    if (!this.engine || !this.ctx || this.scrollState.isScrolling) return;

    const { source, filter, gain } = this.engine.createFrictionNoise(10);
    
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.engine.output);
    
    // Fade in
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 0.05);
    
    source.start();
    
    this.scrollState = {
      source,
      filter,
      gain,
      isScrolling: true,
      lastVelocity: 0,
    };
  }

  private stopScrollSound(): void {
    if (!this.ctx || !this.scrollState.isScrolling) return;

    const { source, gain } = this.scrollState;
    
    if (gain && source) {
      // Fade out
      const now = this.ctx.currentTime;
      gain.gain.setTargetAtTime(0, now, 0.08);
      
      // Stop after fade
      setTimeout(() => {
        try {
          source.stop();
          source.disconnect();
        } catch {}
      }, 200);
    }

    this.scrollState = {
      source: null,
      filter: null,
      gain: null,
      isScrolling: false,
      lastVelocity: 0,
    };
  }

  // ==========================================================================
  // Drone Control
  // ==========================================================================

  /** Start the generative drone */
  startDrone(options?: { volume?: number; fadeIn?: number }): void {
    if (!this.engine || !this.ctx) {
      this.init();
      if (!this.engine || !this.ctx) return;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.drone) {
      this.drone = getDrone(this.engine);
    }

    this.drone.start(options);
  }

  /** Stop the drone */
  stopDrone(fadeOut?: number): void {
    this.drone?.stop(fadeOut);
  }

  /** Signal activity to drone (mouse movement, etc.) */
  signalActivity(): void {
    this.drone?.signalActivity();
  }

  /** Signal busy state (loading) */
  signalBusy(): void {
    this.drone?.signalBusy();
  }

  /** Signal busy complete */
  signalBusyComplete(): void {
    this.drone?.signalBusyComplete();
  }

  /** Set drone volume */
  setDroneVolume(volume: number): void {
    this.drone?.setVolume(volume);
  }

  // ==========================================================================
  // Cleanup
  // ==========================================================================

  dispose(): void {
    this.stopScrollSound();
    
    if (this.drone) {
      this.drone.stop(0.2);
      this.drone = null;
    }
    
    if (this.engine) {
      this.engine.dispose();
      this.engine = null;
    }
    
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    
    this.initialized = false;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let playerInstance: SoundPlayer | null = null;

export function getSoundPlayer(): SoundPlayer {
  if (!playerInstance) {
    playerInstance = new SoundPlayer();
  }
  return playerInstance;
}
