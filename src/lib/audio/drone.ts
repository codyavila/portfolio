"use client";

/**
 * Generative Drone - "The Resonant Hum"
 * 
 * A constant, barely audible sub-bass pad playing F# Major 9.
 * Dynamically layers based on user activity.
 * 
 * States:
 * - Idle: Just the sub-bass pad
 * - Active: Fade in sparkles (arpeggiated high notes)
 * - Busy: Pitch bends up (tension), releases when done
 */

import { SynthesisEngine } from './synthesis-engine';
import { DRONE_CONFIG } from './sound-presets';

// ============================================================================
// Types
// ============================================================================

export type DroneState = 'idle' | 'active' | 'busy';

export interface DroneOptions {
  /** Initial volume (0-1) */
  volume?: number;
  /** Fade in time in seconds */
  fadeIn?: number;
  /** Enable sparkle layer */
  enableSparkles?: boolean;
}

// ============================================================================
// Generative Drone Class
// ============================================================================

export class GenerativeDrone {
  private engine: SynthesisEngine;
  private ctx: AudioContext;
  
  // Oscillator layers
  private padOscillators: OscillatorNode[] = [];
  private padGains: GainNode[] = [];
  private sparkleOscillators: OscillatorNode[] = [];
  private sparkleGains: GainNode[] = [];
  
  // Master controls
  private masterGain: GainNode;
  private sparkleGain: GainNode;
  private filter: BiquadFilterNode;
  
  // State
  private state: DroneState = 'idle';
  private isRunning = false;
  private sparkleIndex = 0;
  private sparkleInterval: ReturnType<typeof setInterval> | null = null;
  private activityDecayTimeout: ReturnType<typeof setTimeout> | null = null;
  
  // Animation
  private animationFrame: number | null = null;
  private targetSparkleVolume = 0;
  private currentSparkleVolume = 0;
  
  constructor(engine: SynthesisEngine) {
    this.engine = engine;
    this.ctx = engine.context;
    
    // Master gain for the entire drone
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;
    
    // Sparkle layer gain
    this.sparkleGain = this.ctx.createGain();
    this.sparkleGain.gain.value = 0;
    
    // Low-pass filter for underwater warmth
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 800;
    this.filter.Q.value = 0.4;
    
    // Connect chain
    this.sparkleGain.connect(this.masterGain);
    this.masterGain.connect(this.filter);
    this.filter.connect(engine.output);
  }

  // ==========================================================================
  // Lifecycle
  // ==========================================================================

  /**
   * Start the drone
   */
  start(options: DroneOptions = {}): void {
    if (this.isRunning) return;
    
    const { 
      volume = DRONE_CONFIG.baseVolume, 
      fadeIn = 3,
      enableSparkles = true 
    } = options;
    
    const now = this.ctx.currentTime;
    
    // Create pad oscillators (F# Major 9 chord)
    DRONE_CONFIG.chord.forEach((freq, i) => {
      // Main oscillator
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      // Slight detuning for organic warmth
      osc.detune.value = (Math.random() - 0.5) * 4;
      
      const gain = this.ctx.createGain();
      // Lower notes louder, higher notes softer
      const levelFactor = 1 - (i * 0.12);
      gain.gain.value = 0;
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      // Fade in each voice slightly staggered
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(
        volume * levelFactor,
        now + fadeIn + (i * 0.3)
      );
      
      osc.start(now);
      
      this.padOscillators.push(osc);
      this.padGains.push(gain);
    });
    
    // Create sparkle oscillators (inactive until active state)
    if (enableSparkles) {
      DRONE_CONFIG.sparkles.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const gain = this.ctx.createGain();
        gain.gain.value = 0;
        
        osc.connect(gain);
        gain.connect(this.sparkleGain);
        
        osc.start(now);
        
        this.sparkleOscillators.push(osc);
        this.sparkleGains.push(gain);
      });
    }
    
    // Fade in master
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(1, now + fadeIn);
    
    this.isRunning = true;
    this.state = 'idle';
    
    // Start animation loop for smooth transitions
    this.startAnimationLoop();
  }

  /**
   * Stop the drone
   */
  stop(fadeOut: number = 2): void {
    if (!this.isRunning) return;
    
    const now = this.ctx.currentTime;
    
    // Fade out
    this.masterGain.gain.linearRampToValueAtTime(0, now + fadeOut);
    
    // Schedule cleanup
    setTimeout(() => {
      this.cleanup();
    }, fadeOut * 1000 + 100);
  }

  private cleanup(): void {
    // Stop all oscillators
    this.padOscillators.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch {}
    });
    this.sparkleOscillators.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch {}
    });
    
    // Clear arrays
    this.padOscillators = [];
    this.padGains = [];
    this.sparkleOscillators = [];
    this.sparkleGains = [];
    
    // Clear intervals
    if (this.sparkleInterval) {
      clearInterval(this.sparkleInterval);
      this.sparkleInterval = null;
    }
    
    if (this.activityDecayTimeout) {
      clearTimeout(this.activityDecayTimeout);
      this.activityDecayTimeout = null;
    }
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    this.isRunning = false;
    this.state = 'idle';
  }

  // ==========================================================================
  // State Management
  // ==========================================================================

  /**
   * Signal activity (mouse movement, interaction)
   * Fades in sparkle layer
   */
  signalActivity(): void {
    if (!this.isRunning || this.state === 'busy') return;
    
    this.state = 'active';
    this.targetSparkleVolume = DRONE_CONFIG.activeVolume;
    
    // Start sparkle arpeggiation if not already running
    if (!this.sparkleInterval && this.sparkleOscillators.length > 0) {
      this.startSparkleArpeggio();
    }
    
    // Reset decay timeout
    if (this.activityDecayTimeout) {
      clearTimeout(this.activityDecayTimeout);
    }
    
    // Decay back to idle after 2 seconds of no activity
    this.activityDecayTimeout = setTimeout(() => {
      if (this.state === 'active') {
        this.state = 'idle';
        this.targetSparkleVolume = 0;
        this.stopSparkleArpeggio();
      }
    }, 2000);
  }

  /**
   * Signal busy state (loading, processing)
   * Pitch bends up for tension
   */
  signalBusy(): void {
    if (!this.isRunning) return;
    
    this.state = 'busy';
    const now = this.ctx.currentTime;
    
    // Pitch bend up slightly (tension)
    this.padOscillators.forEach(osc => {
      osc.detune.linearRampToValueAtTime(50, now + 0.5);
    });
    
    // Increase filter brightness
    this.filter.frequency.linearRampToValueAtTime(1200, now + 0.5);
  }

  /**
   * Signal busy complete (loading done)
   * Releases tension
   */
  signalBusyComplete(): void {
    if (!this.isRunning || this.state !== 'busy') return;
    
    const now = this.ctx.currentTime;
    
    // Release pitch bend
    this.padOscillators.forEach(osc => {
      osc.detune.linearRampToValueAtTime(
        (Math.random() - 0.5) * 4,
        now + 0.8
      );
    });
    
    // Return filter to normal
    this.filter.frequency.linearRampToValueAtTime(800, now + 0.8);
    
    this.state = 'idle';
    this.targetSparkleVolume = 0;
    this.stopSparkleArpeggio();
  }

  // ==========================================================================
  // Sparkle Arpeggio
  // ==========================================================================

  private startSparkleArpeggio(): void {
    if (this.sparkleOscillators.length === 0) return;
    
    // Arpeggiate through sparkle notes
    this.sparkleInterval = setInterval(() => {
      if (this.state !== 'active') return;
      
      // Fade current note out, next note in
      const currentGain = this.sparkleGains[this.sparkleIndex];
      const nextIndex = (this.sparkleIndex + 1) % this.sparkleGains.length;
      const nextGain = this.sparkleGains[nextIndex];
      
      const now = this.ctx.currentTime;
      
      // Fade out current
      currentGain.gain.linearRampToValueAtTime(0.001, now + 0.3);
      
      // Fade in next
      nextGain.gain.setValueAtTime(0.001, now);
      nextGain.gain.linearRampToValueAtTime(0.8, now + 0.15);
      nextGain.gain.linearRampToValueAtTime(0.3, now + 0.5);
      
      this.sparkleIndex = nextIndex;
    }, 400 + Math.random() * 200); // Slight timing variation
  }

  private stopSparkleArpeggio(): void {
    if (this.sparkleInterval) {
      clearInterval(this.sparkleInterval);
      this.sparkleInterval = null;
    }
    
    // Fade out all sparkle gains
    const now = this.ctx.currentTime;
    this.sparkleGains.forEach(gain => {
      gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
    });
  }

  // ==========================================================================
  // Animation Loop (smooth volume transitions)
  // ==========================================================================

  private startAnimationLoop(): void {
    const animate = () => {
      if (!this.isRunning) return;
      
      // Smooth interpolation for sparkle volume
      const delta = this.targetSparkleVolume - this.currentSparkleVolume;
      this.currentSparkleVolume += delta * 0.05;
      
      this.sparkleGain.gain.value = this.currentSparkleVolume;
      
      this.animationFrame = requestAnimationFrame(animate);
    };
    
    this.animationFrame = requestAnimationFrame(animate);
  }

  // ==========================================================================
  // Volume Control
  // ==========================================================================

  setVolume(volume: number, fadeTime: number = 0.5): void {
    if (!this.isRunning) return;
    
    const now = this.ctx.currentTime;
    
    this.padGains.forEach((gain, i) => {
      const levelFactor = 1 - (i * 0.12);
      gain.gain.linearRampToValueAtTime(
        volume * levelFactor,
        now + fadeTime
      );
    });
  }

  // ==========================================================================
  // Getters
  // ==========================================================================

  get currentState(): DroneState {
    return this.state;
  }

  get running(): boolean {
    return this.isRunning;
  }
}

// ============================================================================
// Singleton Factory
// ============================================================================

let droneInstance: GenerativeDrone | null = null;

export function getDrone(engine: SynthesisEngine): GenerativeDrone {
  if (!droneInstance) {
    droneInstance = new GenerativeDrone(engine);
  }
  return droneInstance;
}

export function disposeDrone(): void {
  if (droneInstance) {
    droneInstance.stop(0.5);
    droneInstance = null;
  }
}
