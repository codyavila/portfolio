"use client";

/**
 * Sound Presets - "Glass & Water"
 * 
 * Bioluminescent UI sound definitions.
 * Organic, wet, resonant sounds - like tapping underwater crystals.
 * 
 * The Material: "Imagine hitting a thick pane of glass with a felt mallet.
 *               It doesn't 'click'; it 'thuds' and then rings slightly."
 * 
 * The Medium: "The sounds should feel like they are traveling through 
 *             a liquid medium."
 */

import type { ADSREnvelope, ReverbConfig } from './synthesis-engine';

// ============================================================================
// Preset Types
// ============================================================================

export type SoundPresetName =
  // Core interactions
  | 'hover'           // The Breath - faint shimmer
  | 'click'           // The Droplet - water/glass tap
  | 'clickSecondary'  // Lower pitched for cancel/back
  // State changes
  | 'toggle'          // Glass toggle switch
  | 'success'         // Ascending glass chimes
  | 'error'           // Gentle dissonance
  | 'warning'         // Soft attention
  // Navigation
  | 'navigate'        // Smooth glass transition
  | 'open'            // Rising underwater bloom
  | 'close'           // Settling descent
  // Selection
  | 'select'          // Crystalline selection
  | 'deselect'        // Soft release
  // Scroll/Slider
  | 'tick'            // Musical scroll tick
  | 'sliderTick'      // Satisfying slider click
  | 'scrollStop'      // Thud when hitting bounds
  // Notifications
  | 'notification'    // Prism chime
  | 'chime'           // Glass kalimba
  // Theme
  | 'lightMode'       // Ascending prismatic
  | 'darkMode'        // Descending depths
  // Special
  | 'home'            // Welcoming arrival
  | 'ambient';        // Background pad

export interface LayerConfig {
  type: 'oscillator' | 'fm' | 'harmonic' | 'noise' | 'glass' | 'droplet' | 'shimmer' | 'chime';
  // Standard oscillator
  oscillator?: {
    type: OscillatorType;
    frequency: number | { start: number; end: number };
    detune?: number;
    unison?: number;
    unisonSpread?: number;
  };
  // FM synthesis
  fm?: {
    carrierFreq: number;
    modulatorFreq: number;
    modulationIndex: number;
    carrierType?: OscillatorType;
    modulationEnvelope?: Partial<ADSREnvelope>;
  };
  // Harmonic series
  harmonic?: {
    fundamental: number;
    harmonics: number[];
    harmonicSpread?: number;
  };
  // Noise
  noise?: {
    type: 'white' | 'pink' | 'brown';
    bandpass?: { frequency: number; Q: number };
  };
  // Glass resonance
  glass?: {
    frequency: number;
    modes: number;
    brightness?: number;
    density?: number;
  };
  // Water droplet
  droplet?: {
    pitch: number;      // Semitones from A4
    size?: number;      // 0-1
    ripples?: number;
  };
  // Shimmer (hover)
  shimmer?: {
    startFreq: number;
    endFreq: number;
  };
  // Chime
  chimeConfig?: {
    frequency: number;
  };
  // Common properties
  gain: number;
  envelope: ADSREnvelope;
  filter?: {
    type: BiquadFilterType;
    frequency: number | { start: number; end: number };
    Q?: number;
    gain?: number;
  };
  pan?: number;
  delay?: number;
  pitchBend?: number;
}

export interface SoundPreset {
  name: SoundPresetName;
  duration: number;
  layers: LayerConfig[];
  reverb?: ReverbConfig;
  masterGain?: number;
  /** Pitch randomization range in semitones (±) */
  pitchVariation?: number;
  haptic?: number | number[];
}

// ============================================================================
// Musical Constants - Tuned for F# Major 9 (the drone key)
// ============================================================================

const NOTE = {
  // Octave 2
  'F#2': 92.50, 'G#2': 103.83, 'A#2': 116.54,
  // Octave 3
  'C#3': 138.59, 'D#3': 155.56, 'F#3': 185.00, 'G#3': 207.65, 'A#3': 233.08,
  // Octave 4
  'C#4': 277.18, 'D#4': 311.13, 'E#4': 329.63, 'F#4': 369.99, 'G#4': 415.30, 'A#4': 466.16,
  // Octave 5
  'C#5': 554.37, 'D#5': 622.25, 'E#5': 659.25, 'F#5': 739.99, 'G#5': 830.61, 'A#5': 932.33,
  // Octave 6
  'C#6': 1108.73, 'F#6': 1479.98, 'G#6': 1661.22,
  // Standard reference
  A4: 440.00,
};

// Pentatonic scale for pitch variation (F# pentatonic)
const PENTATONIC = [NOTE['F#4'], NOTE['G#4'], NOTE['A#4'], NOTE['C#5'], NOTE['D#5']];

// Quick envelope presets - optimized for glass/water textures
const ENV = {
  // Glass tap - instant attack, resonant decay
  glass: { attack: 0.001, decay: 0.35, sustain: 0.05, release: 0.4 },
  // Water droplet - instant attack, quick decay with ring
  droplet: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.15 },
  // Shimmer breath - soft fade in/out
  breath: { attack: 0.03, decay: 0.05, sustain: 0.15, release: 0.08 },
  // Bell-like ring
  bell: { attack: 0.001, decay: 0.5, sustain: 0.08, release: 0.6 },
  // Pad ambient
  pad: { attack: 0.4, decay: 0.6, sustain: 0.35, release: 1.0 },
  // Thud impact
  thud: { attack: 0.002, decay: 0.15, sustain: 0, release: 0.1 },
  // Snap transient
  snap: { attack: 0.001, decay: 0.025, sustain: 0, release: 0.02 },
};

// ============================================================================
// Sound Presets - "The Resonant Hum"
// ============================================================================

export const SOUND_PRESETS: Record<SoundPresetName, SoundPreset> = {
  // ---------------------------------------------------------------------------
  // HOVER - "The Breath"
  // "A very quiet, high-frequency 'shimmer' or 'air intake' breath"
  // "Like the sound of a lightsaber idling, but much softer"
  // Technical: Sine wave sweeping 200Hz to 400Hz with heavy reverb, 0.1s
  // ---------------------------------------------------------------------------
  hover: {
    name: 'hover',
    duration: 0.12,
    layers: [
      // Primary shimmer - the sweep
      {
        type: 'shimmer',
        shimmer: {
          startFreq: 220,
          endFreq: 380,
        },
        gain: 0.18,
        envelope: { attack: 0.012, decay: 0.06, sustain: 0.06, release: 0.05 },
        filter: {
          type: 'lowpass',
          frequency: { start: 2200, end: 1600 },
          Q: 0.6,
        },
      },
      // High harmonic whisper
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 580, end: 720 },
          detune: 4,
        },
        gain: 0.1,
        envelope: { attack: 0.008, decay: 0.05, sustain: 0.03, release: 0.04 },
        filter: { type: 'lowpass', frequency: 1800 },
        pan: 0.1,
      },
    ],
    reverb: { decay: 1.4, wetDry: 0.2, underwater: true },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: 5,
  },

  // ---------------------------------------------------------------------------
  // CLICK - "The Droplet"
  // "Water Droplet hitting a pool, or finger tapping a wine glass"
  // Pitch: High for primary, lower for cancel. Slight randomize ±2 semitones
  // ---------------------------------------------------------------------------
  click: {
    name: 'click',
    duration: 0.22,
    layers: [
      // Water droplet primary tone
      {
        type: 'droplet',
        droplet: {
          pitch: 4,    // Slightly lower for warmth
          size: 0.6,
          ripples: 2,
        },
        gain: 0.14,
        envelope: { attack: 0.002, decay: 0.07, sustain: 0, release: 0.12 },
      },
      // Glass resonance ring
      {
        type: 'glass',
        glass: {
          frequency: NOTE['C#5'],
          modes: 4,
          brightness: 0.5,
          density: 0.45,
        },
        gain: 0.1,
        envelope: { attack: 0.002, decay: 0.18, sustain: 0.02, release: 0.1 },
      },
      // Punchy sub body - more weight
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 180, end: 80 },
        },
        gain: 0.12,
        envelope: { attack: 0.002, decay: 0.06, sustain: 0, release: 0.04 },
        filter: { type: 'lowpass', frequency: 250 },
      },
    ],
    reverb: { decay: 1.2, wetDry: 0.15, highCut: 3200, underwater: true },
    masterGain: 0.5,
    pitchVariation: 2,
    haptic: 12,
  },

  // ---------------------------------------------------------------------------
  // CLICK SECONDARY - Lower pitch for cancel/back
  // ---------------------------------------------------------------------------
  clickSecondary: {
    name: 'clickSecondary',
    duration: 0.18,
    layers: [
      {
        type: 'droplet',
        droplet: {
          pitch: -3,   // Lower pitch for cancel
          size: 0.65,
          ripples: 2,
        },
        gain: 0.14,
        envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.08 },
      },
      {
        type: 'glass',
        glass: {
          frequency: NOTE['G#3'],
          modes: 4,
          brightness: 0.45,
          density: 0.5,
        },
        gain: 0.08,
        envelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.06 },
      },
    ],
    reverb: { decay: 1.0, wetDry: 0.18, underwater: true },
    masterGain: 0.5,
    pitchVariation: 2,
    haptic: 10,
  },

  // ---------------------------------------------------------------------------
  // TOGGLE - Glass switch with satisfying clunk
  // ---------------------------------------------------------------------------
  toggle: {
    name: 'toggle',
    duration: 0.28,
    layers: [
      // Glass impact
      {
        type: 'glass',
        glass: {
          frequency: NOTE['A#4'],
          modes: 5,
          brightness: 0.42,
          density: 0.55,
        },
        gain: 0.11,
        envelope: { attack: 0.003, decay: 0.22, sustain: 0.02, release: 0.25 },
      },
      // Mechanical "clunk" body - felt mallet
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 280, end: 120 },
        },
        gain: 0.16,
        envelope: { attack: 0.004, decay: 0.05, sustain: 0, release: 0.04 },
        filter: { type: 'lowpass', frequency: 400 },
      },
      // Settling resonance
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['F#4'],
          unison: 2,
          unisonSpread: 4,
        },
        gain: 0.05,
        envelope: { attack: 0.015, decay: 0.16, sustain: 0.04, release: 0.1 },
        filter: { type: 'lowpass', frequency: 1600 },
        delay: 0.035,
      },
    ],
    reverb: { decay: 1.0, wetDry: 0.12 },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: [10, 25, 12],
  },

  // ---------------------------------------------------------------------------
  // SUCCESS - Ascending glass chime arpeggio
  // Like Nintendo Switch startup - clean, distinct, echoing
  // ---------------------------------------------------------------------------
  success: {
    name: 'success',
    duration: 0.75,
    layers: [
      // First note - F#4
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['F#4'] },
        gain: 0.1,
        envelope: { attack: 0.003, decay: 0.3, sustain: 0.04, release: 0.18 },
        filter: { type: 'lowpass', frequency: 3500 },
        pan: -0.15,
      },
      // Second note - A#4
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['A#4'] },
        gain: 0.095,
        envelope: { attack: 0.003, decay: 0.26, sustain: 0.035, release: 0.15 },
        filter: { type: 'lowpass', frequency: 3800 },
        delay: 0.1,
        pan: 0,
      },
      // Third note - C#5
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['C#5'] },
        gain: 0.09,
        envelope: { attack: 0.003, decay: 0.24, sustain: 0.03, release: 0.12 },
        filter: { type: 'lowpass', frequency: 4000 },
        delay: 0.2,
        pan: 0.15,
      },
      // Final note - F#5 (octave resolution)
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['F#5'] },
        gain: 0.1,
        envelope: { attack: 0.003, decay: 0.35, sustain: 0.05, release: 0.2 },
        filter: { type: 'lowpass', frequency: 4200 },
        delay: 0.3,
        pan: 0,
      },
      // Subtle shimmer tail
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['F#6'],
          unison: 2,
          unisonSpread: 6,
        },
        gain: 0.02,
        envelope: { attack: 0.2, decay: 0.25, sustain: 0.04, release: 0.12 },
        filter: { type: 'lowpass', frequency: 4500 },
        delay: 0.38,
      },
    ],
    reverb: { decay: 1.8, wetDry: 0.22, highCut: 4000 },
    masterGain: 0.5,
    pitchVariation: 1,
    haptic: [8, 35, 8, 35, 12],
  },

  // ---------------------------------------------------------------------------
  // ERROR - Gentle dissonance (not harsh)
  // Minor second interval - tension without alarm
  // ---------------------------------------------------------------------------
  error: {
    name: 'error',
    duration: 0.32,
    layers: [
      // First tone
      {
        type: 'glass',
        glass: {
          frequency: NOTE['D#4'],
          modes: 4,
          brightness: 0.35,
          density: 0.6,
        },
        gain: 0.14,
        envelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.08 },
      },
      // Minor second dissonance
      {
        type: 'glass',
        glass: {
          frequency: NOTE['D#4'] * 1.059, // Minor 2nd up
          modes: 3,
          brightness: 0.28,
        },
        gain: 0.1,
        envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.06 },
      },
      // Second pulse
      {
        type: 'glass',
        glass: {
          frequency: NOTE['D#4'] * 0.95,
          modes: 3,
          brightness: 0.22,
        },
        gain: 0.08,
        envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.05 },
        delay: 0.12,
      },
    ],
    reverb: { decay: 0.8, wetDry: 0.12, highCut: 3000 },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: [18, 45, 18],
  },

  // ---------------------------------------------------------------------------
  // WARNING - Soft attention getter
  // ---------------------------------------------------------------------------
  warning: {
    name: 'warning',
    duration: 0.28,
    layers: [
      {
        type: 'glass',
        glass: {
          frequency: NOTE['A#4'],
          modes: 4,
          brightness: 0.45,
        },
        gain: 0.12,
        envelope: { attack: 0.002, decay: 0.14, sustain: 0.05, release: 0.08 },
      },
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['F#3'],
        },
        gain: 0.08,
        envelope: { attack: 0.003, decay: 0.1, sustain: 0.03, release: 0.06 },
      },
    ],
    reverb: { decay: 1.0, wetDry: 0.15 },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: [12, 28, 12],
  },

  // ---------------------------------------------------------------------------
  // NAVIGATE - Smooth underwater transition
  // ---------------------------------------------------------------------------
  navigate: {
    name: 'navigate',
    duration: 0.16,
    layers: [
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 420, end: 240 },
          unison: 2,
          unisonSpread: 5,
        },
        gain: 0.1,
        envelope: { attack: 0.006, decay: 0.1, sustain: 0, release: 0.05 },
        filter: {
          type: 'lowpass',
          frequency: { start: 2000, end: 600 },
          Q: 1.2,
        },
      },
      // Glass accent for cohesion
      {
        type: 'glass',
        glass: {
          frequency: NOTE['C#5'],
          modes: 3,
          brightness: 0.35,
        },
        gain: 0.06,
        envelope: { attack: 0.003, decay: 0.09, sustain: 0, release: 0.05 },
      },
      // Water swoosh - subtler
      {
        type: 'noise',
        noise: {
          type: 'pink',
          bandpass: { frequency: 1000, Q: 0.5 },
        },
        gain: 0.035,
        envelope: { attack: 0.005, decay: 0.07, sustain: 0, release: 0.04 },
      },
    ],
    reverb: { decay: 0.5, wetDry: 0.1, underwater: true },
    masterGain: 0.5,
    pitchVariation: 2,
    haptic: [6, 18, 10],
  },

  // ---------------------------------------------------------------------------
  // OPEN - Rising underwater bloom
  // ---------------------------------------------------------------------------
  open: {
    name: 'open',
    duration: 0.22,
    layers: [
      // Rising sweep
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 280, end: 520 },
        },
        gain: 0.11,
        envelope: { attack: 0.01, decay: 0.12, sustain: 0.04, release: 0.07 },
        filter: {
          type: 'lowpass',
          frequency: { start: 1000, end: 2400 },
          Q: 0.9,
        },
      },
      // Glass arrival
      {
        type: 'glass',
        glass: {
          frequency: NOTE['F#5'],
          modes: 4,
          brightness: 0.5,
        },
        gain: 0.08,
        envelope: { attack: 0.003, decay: 0.14, sustain: 0, release: 0.08 },
        delay: 0.08,
      },
      // Air bubble pop - much softer
      {
        type: 'noise',
        noise: { type: 'pink', bandpass: { frequency: 2000, Q: 1.2 } },
        gain: 0.02,
        envelope: { attack: 0.003, decay: 0.02, sustain: 0, release: 0.018 },
      },
    ],
    reverb: { decay: 1.0, wetDry: 0.14, underwater: true },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: [5, 12, 8],
  },

  // ---------------------------------------------------------------------------
  // CLOSE - Settling descent
  // ---------------------------------------------------------------------------
  close: {
    name: 'close',
    duration: 0.16,
    layers: [
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 480, end: 180 },
        },
        gain: 0.09,
        envelope: { attack: 0.006, decay: 0.1, sustain: 0, release: 0.05 },
        filter: {
          type: 'lowpass',
          frequency: { start: 2000, end: 400 },
          Q: 0.6,
        },
      },
      // Glass settle
      {
        type: 'glass',
        glass: {
          frequency: NOTE['F#4'],
          modes: 3,
          brightness: 0.32,
        },
        gain: 0.06,
        envelope: { attack: 0.003, decay: 0.1, sustain: 0, release: 0.06 },
        delay: 0.02,
      },
      // Soft thud settle
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 120, end: 50 },
        },
        gain: 0.1,
        envelope: { attack: 0.003, decay: 0.1, sustain: 0, release: 0.07 },
        delay: 0.04,
      },
    ],
    reverb: { decay: 0.4, wetDry: 0.08 },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: [8, 12, 5],
  },

  // ---------------------------------------------------------------------------
  // SELECT - Crystalline selection
  // ---------------------------------------------------------------------------
  select: {
    name: 'select',
    duration: 0.28,
    layers: [
      // Perfect fifth dyad - crystalline
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['F#4'] },
        gain: 0.09,
        envelope: { attack: 0.003, decay: 0.18, sustain: 0.03, release: 0.12 },
        filter: { type: 'lowpass', frequency: 3500 },
        pan: -0.1,
      },
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['C#5'] },
        gain: 0.08,
        envelope: { attack: 0.003, decay: 0.16, sustain: 0.025, release: 0.1 },
        filter: { type: 'lowpass', frequency: 3800 },
        pan: 0.1,
      },
      // Droplet accent
      {
        type: 'droplet',
        droplet: { pitch: 3, size: 0.4 },
        gain: 0.06,
        envelope: { attack: 0.002, decay: 0.06, sustain: 0, release: 0.09 },
      },
    ],
    reverb: { decay: 1.0, wetDry: 0.14 },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: 12,
  },

  // ---------------------------------------------------------------------------
  // DESELECT - Soft release
  // ---------------------------------------------------------------------------
  deselect: {
    name: 'deselect',
    duration: 0.14,
    layers: [
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: NOTE['C#5'], end: NOTE['F#4'] },
        },
        gain: 0.18,
        envelope: { attack: 0.006, decay: 0.08, sustain: 0, release: 0.04 },
        filter: { type: 'lowpass', frequency: 1800 },
      },
      // Subtle glass settle
      {
        type: 'glass',
        glass: {
          frequency: NOTE['F#4'],
          modes: 2,
          brightness: 0.3,
        },
        gain: 0.12,
        envelope: { attack: 0.003, decay: 0.07, sustain: 0, release: 0.04 },
      },
    ],
    reverb: { decay: 0.4, wetDry: 0.06 },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: 6,
  },

  // ---------------------------------------------------------------------------
  // TICK - Musical scroll tick
  // Pitch maps to scroll position
  // ---------------------------------------------------------------------------
  tick: {
    name: 'tick',
    duration: 0.07,
    layers: [
      {
        type: 'droplet',
        droplet: {
          pitch: 0,  // Will be overridden by playTick
          size: 0.32,
        },
        gain: 0.2,
        envelope: { attack: 0.002, decay: 0.035, sustain: 0, release: 0.03 },
      },
      // Tiny glass ping
      {
        type: 'glass',
        glass: {
          frequency: NOTE['F#5'], // Will be overridden
          modes: 3,
          brightness: 0.55,
        },
        gain: 0.12,
        envelope: { attack: 0.002, decay: 0.045, sustain: 0, release: 0.025 },
      },
    ],
    reverb: { decay: 0.25, wetDry: 0.06 },
    masterGain: 0.5,
    pitchVariation: 0.5,
    haptic: 4,
  },

  // ---------------------------------------------------------------------------
  // SLIDER TICK - Satisfying tactile click for time travel slider
  // Quieter than other sounds, pitch follows slider position, glassy character
  // ---------------------------------------------------------------------------
  sliderTick: {
    name: 'sliderTick',
    duration: 0.12,
    layers: [
      // Soft transient - felt tap
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 1400, end: 800 },
        },
        gain: 0.15,
        envelope: { attack: 0.002, decay: 0.012, sustain: 0, release: 0.008 },
        filter: { type: 'bandpass', frequency: 1200, Q: 2 },
      },
      // Body - physical weight
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 160, end: 70 },
        },
        gain: 0.2,
        envelope: { attack: 0.002, decay: 0.02, sustain: 0, release: 0.012 },
        filter: { type: 'lowpass', frequency: 250 },
      },
      // Primary glass resonance - warmer
      {
        type: 'glass',
        glass: {
          frequency: NOTE['F#5'],
          modes: 4,
          brightness: 0.55,
          density: 0.3,
        },
        gain: 0.18,
        envelope: { attack: 0.003, decay: 0.07, sustain: 0.015, release: 0.05 },
      },
      // Subtle overtone
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['C#6'],
          detune: 5,
        },
        gain: 0.06,
        envelope: { attack: 0.003, decay: 0.04, sustain: 0, release: 0.03 },
        filter: { type: 'lowpass', frequency: 2800 },
      },
    ],
    reverb: { decay: 0.4, wetDry: 0.1 },
    masterGain: 0.5,
    pitchVariation: 0.3,
    haptic: 5,
  },

  // ---------------------------------------------------------------------------
  // SCROLL STOP - "When you hit the bottom, a soft 'thud'"
  // Bass kick indicating boundary
  // ---------------------------------------------------------------------------
  scrollStop: {
    name: 'scrollStop',
    duration: 0.22,
    layers: [
      // Sub impact - punchy
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 80, end: 35 },
        },
        gain: 0.24,
        envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.06 },
        filter: { type: 'lowpass', frequency: 130 },
      },
      // Heavy glass floor
      {
        type: 'glass',
        glass: {
          frequency: NOTE['F#2'],
          modes: 2,
          brightness: 0.2,
          density: 0.8,
        },
        gain: 0.15,
        envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1 },
      },
      // Mid body thud
      {
        type: 'oscillator',
        oscillator: {
          type: 'triangle',
          frequency: { start: 170, end: 75 },
        },
        gain: 0.1,
        envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.04 },
        filter: { type: 'lowpass', frequency: 320 },
      },
      // Impact texture
      {
        type: 'noise',
        noise: { type: 'brown', bandpass: { frequency: 200, Q: 0.9 } },
        gain: 0.08,
        envelope: { attack: 0.001, decay: 0.03, sustain: 0, release: 0.02 },
      },
    ],
    reverb: { decay: 0.5, wetDry: 0.12, lowCut: 50 },
    masterGain: 0.5,
    pitchVariation: 1,
    haptic: 35,
  },

  // ---------------------------------------------------------------------------
  // NOTIFICATION - "The Prism"
  // "Glass Chime or Kalimba note... like BOTW ambient sounds"
  // "Spatial audio - feel like it's coming from behind the screen"
  // ---------------------------------------------------------------------------
  notification: {
    name: 'notification',
    duration: 0.65,
    layers: [
      // Primary chime
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['A#4'] },
        gain: 0.14,
        envelope: { attack: 0.001, decay: 0.4, sustain: 0.06, release: 0.2 },
        pan: -0.08,
      },
      // Octave shimmer
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['A#5'] },
        gain: 0.08,
        envelope: { attack: 0.001, decay: 0.3, sustain: 0.04, release: 0.15 },
        delay: 0.06,
        pan: 0.08,
      },
      // Sub warmth
      {
        type: 'oscillator',
        oscillator: { type: 'sine', frequency: NOTE['A#3'] },
        gain: 0.06,
        envelope: { attack: 0.01, decay: 0.35, sustain: 0.08, release: 0.15 },
      },
    ],
    reverb: { decay: 2.4, wetDry: 0.35, highCut: 4500, underwater: true },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: [10, 35, 10],
  },

  // ---------------------------------------------------------------------------
  // CHIME - Extended glass bell
  // ---------------------------------------------------------------------------
  chime: {
    name: 'chime',
    duration: 0.9,
    layers: [
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['F#5'] },
        gain: 0.14,
        envelope: { attack: 0.001, decay: 0.6, sustain: 0.06, release: 0.25 },
      },
      {
        type: 'glass',
        glass: {
          frequency: NOTE['F#5'],
          modes: 8,
          brightness: 0.65,
          density: 0.35,
        },
        gain: 0.08,
        envelope: { attack: 0.001, decay: 0.5, sustain: 0.04, release: 0.28 },
      },
      // High shimmer
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['F#6'],
          unison: 2,
          unisonSpread: 6,
        },
        gain: 0.03,
        envelope: { attack: 0.001, decay: 0.35, sustain: 0.04, release: 0.2 },
      },
    ],
    reverb: { decay: 2.5, wetDry: 0.35, highCut: 5000 },
    masterGain: 0.5,
    pitchVariation: 2,
    haptic: [8, 25, 6],
  },

  // ---------------------------------------------------------------------------
  // LIGHT MODE - Ascending prismatic (sunrise)
  // ---------------------------------------------------------------------------
  lightMode: {
    name: 'lightMode',
    duration: 0.55,
    layers: [
      // Ascending F# major
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['F#4'] },
        gain: 0.1,
        envelope: { attack: 0.001, decay: 0.16, sustain: 0.06, release: 0.1 },
        filter: { type: 'lowpass', frequency: { start: 2200, end: 4200 } },
        pan: -0.2,
      },
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['A#4'] },
        gain: 0.09,
        envelope: { attack: 0.001, decay: 0.14, sustain: 0.05, release: 0.08 },
        filter: { type: 'lowpass', frequency: { start: 2700, end: 4700 } },
        delay: 0.1,
        pan: 0,
      },
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['C#5'] },
        gain: 0.095,
        envelope: { attack: 0.001, decay: 0.18, sustain: 0.06, release: 0.1 },
        filter: { type: 'lowpass', frequency: { start: 3200, end: 5200 } },
        delay: 0.2,
        pan: 0.2,
      },
      // Bright shimmer
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['F#6'],
          unison: 2,
          unisonSpread: 10,
        },
        gain: 0.025,
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.04, release: 0.1 },
        delay: 0.25,
      },
    ],
    reverb: { decay: 1.8, wetDry: 0.22 },
    masterGain: 0.5,
    pitchVariation: 1,
    haptic: [6, 25, 10, 25, 6],
  },

  // ---------------------------------------------------------------------------
  // DARK MODE - Descending depths (twilight)
  // ---------------------------------------------------------------------------
  darkMode: {
    name: 'darkMode',
    duration: 0.6,
    layers: [
      // Descending
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['C#5'] },
        gain: 0.1,
        envelope: { attack: 0.001, decay: 0.18, sustain: 0.06, release: 0.1 },
        filter: { type: 'lowpass', frequency: { start: 3700, end: 1700 } },
        pan: 0.15,
      },
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['A#4'] },
        gain: 0.09,
        envelope: { attack: 0.001, decay: 0.16, sustain: 0.05, release: 0.08 },
        filter: { type: 'lowpass', frequency: { start: 3200, end: 1300 } },
        delay: 0.12,
        pan: 0,
      },
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['F#4'] },
        gain: 0.095,
        envelope: { attack: 0.001, decay: 0.2, sustain: 0.06, release: 0.12 },
        filter: { type: 'lowpass', frequency: { start: 2700, end: 900 } },
        delay: 0.24,
        pan: -0.15,
      },
      // Deep sub settle
      {
        type: 'oscillator',
        oscillator: { type: 'sine', frequency: NOTE['F#2'] },
        gain: 0.07,
        envelope: { attack: 0.15, decay: 0.25, sustain: 0.08, release: 0.14 },
        delay: 0.3,
      },
    ],
    reverb: { decay: 2.2, wetDry: 0.28, highCut: 3000, underwater: true },
    masterGain: 0.5,
    pitchVariation: 1,
    haptic: [6, 25, 10, 25, 6],
  },

  // ---------------------------------------------------------------------------
  // HOME - Welcoming arrival
  // ---------------------------------------------------------------------------
  home: {
    name: 'home',
    duration: 0.38,
    layers: [
      // Bounce up
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: { start: 320, end: NOTE['F#4'] },
          unison: 2,
          unisonSpread: 4,
        },
        gain: 0.12,
        envelope: { attack: 0.004, decay: 0.1, sustain: 0, release: 0.05 },
        filter: {
          type: 'lowpass',
          frequency: { start: 1400, end: 3000 },
        },
      },
      // Settle chime
      {
        type: 'chime',
        chimeConfig: { frequency: NOTE['F#5'] },
        gain: 0.1,
        envelope: { attack: 0.001, decay: 0.16, sustain: 0.05, release: 0.08 },
        delay: 0.1,
      },
    ],
    reverb: { decay: 1.2, wetDry: 0.18 },
    masterGain: 0.5,
    pitchVariation: 1.5,
    haptic: [10, 35, 8],
  },

  // ---------------------------------------------------------------------------
  // AMBIENT - Background pad for transitions
  // F# Major 9 chord (the drone foundation)
  // ---------------------------------------------------------------------------
  ambient: {
    name: 'ambient',
    duration: 3.0,
    layers: [
      // F# root
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['F#3'],
          unison: 3,
          unisonSpread: 6,
        },
        gain: 0.03,
        envelope: { attack: 0.35, decay: 0.55, sustain: 0.32, release: 0.9 },
        filter: { type: 'lowpass', frequency: 850 },
        pan: -0.3,
      },
      // A# (major 3rd)
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['A#3'],
          unison: 3,
          unisonSpread: 6,
        },
        gain: 0.025,
        envelope: { attack: 0.35, decay: 0.55, sustain: 0.32, release: 0.9 },
        filter: { type: 'lowpass', frequency: 1050 },
        pan: 0,
      },
      // C# (5th)
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['C#4'],
          unison: 3,
          unisonSpread: 6,
        },
        gain: 0.025,
        envelope: { attack: 0.35, decay: 0.55, sustain: 0.32, release: 0.9 },
        filter: { type: 'lowpass', frequency: 1250 },
        pan: 0.3,
      },
      // E# (major 7th)
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['E#4'],
          unison: 2,
          unisonSpread: 8,
        },
        gain: 0.02,
        envelope: { attack: 0.35, decay: 0.55, sustain: 0.32, release: 0.9 },
        filter: { type: 'lowpass', frequency: 1450 },
        pan: 0.15,
      },
      // G# (9th)
      {
        type: 'oscillator',
        oscillator: {
          type: 'sine',
          frequency: NOTE['G#4'],
          unison: 2,
          unisonSpread: 8,
        },
        gain: 0.016,
        envelope: { attack: 0.35, decay: 0.55, sustain: 0.32, release: 0.9 },
        filter: { type: 'lowpass', frequency: 1650 },
        pan: -0.15,
      },
    ],
    reverb: { decay: 3.5, wetDry: 0.45, highCut: 2500, underwater: true },
    masterGain: 0.5,
    pitchVariation: 0.5,
  },
};

// ============================================================================
// Pentatonic scale for tick sounds (F# pentatonic)
// Maps scroll position 0-1 to musical pitches
// ============================================================================

export const TICK_SCALE = [
  NOTE['F#3'], NOTE['G#3'], NOTE['A#3'], NOTE['C#4'], NOTE['D#4'],
  NOTE['F#4'], NOTE['G#4'], NOTE['A#4'], NOTE['C#5'], NOTE['D#5'],
  NOTE['F#5'],
];

// ============================================================================
// Navigation notes (for menu items) - F# major
// ============================================================================

export const NAV_NOTES = [
  NOTE['F#4'], NOTE['G#4'], NOTE['A#4'], NOTE['C#5'], NOTE['D#5'], NOTE['F#5'],
];

// ============================================================================
// Drone configuration
// ============================================================================

export const DRONE_CONFIG = {
  /** F# Major 9 chord frequencies */
  chord: [
    NOTE['F#2'],  // Root (sub-bass)
    NOTE['F#3'],  // Root octave
    NOTE['A#3'],  // Major 3rd
    NOTE['C#4'],  // Perfect 5th
    NOTE['E#4'],  // Major 7th
    NOTE['G#4'],  // 9th
  ],
  /** Sparkle arpeggio notes (for active state) */
  sparkles: [
    NOTE['F#5'], NOTE['G#5'], NOTE['A#5'], NOTE['C#6'], NOTE['F#6'],
  ],
  /** Base volume (barely audible) */
  baseVolume: 0.015,
  /** Active layer volume */
  activeVolume: 0.025,
};
