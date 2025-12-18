/**
 * Audio Module - "The Resonant Hum"
 * 
 * Bioluminescent audio synthesis system for UI sounds.
 * 
 * Sonic Identity: "Glass & Water"
 * - Sounds like tapping underwater crystals or heavy glass
 * - Heavy use of reverb tails
 * - Peaceful, futuristic aquarium aesthetic
 * 
 * References: Nintendo Switch UI, PS5 Ambient menu, Annihilation soundtrack
 * 
 * Architecture:
 * - SynthesisEngine: Underwater acoustic primitives (glass resonance, droplets, shimmer)
 * - SoundPresets: Bioluminescent sound definitions  
 * - SoundPlayer: High-level playback with scroll physics
 * - GenerativeDrone: F# Major 9 sub-bass pad with dynamic layering
 * 
 * Usage:
 * ```tsx
 * import { useSoundSystem } from '@/hooks/useSoundSystem';
 * 
 * function MyComponent() {
 *   const { 
 *     playHover,      // The Breath - soft shimmer
 *     playClick,      // The Droplet - water/glass tap
 *     updateScroll,   // The Friction - velvet scroll
 *     playNotification // The Prism - glass chime
 *   } = useSoundSystem();
 *   
 *   return (
 *     <button 
 *       onMouseEnter={playHover}
 *       onClick={() => playClick()}
 *     >
 *       Click me
 *     </button>
 *   );
 * }
 * ```
 */

// Core synthesis engine
export { SynthesisEngine } from './synthesis-engine';
export type { 
  ADSREnvelope, 
  OscillatorConfig, 
  FilterConfig, 
  FMConfig, 
  HarmonicConfig, 
  ReverbConfig, 
  StereoConfig, 
  NoiseConfig,
  GlassResonanceConfig,
  DropletConfig,
} from './synthesis-engine';

// Sound presets
export { SOUND_PRESETS, TICK_SCALE, NAV_NOTES, DRONE_CONFIG } from './sound-presets';
export type { SoundPresetName, SoundPreset, LayerConfig } from './sound-presets';

// Sound player
export { SoundPlayer, getSoundPlayer } from './sound-player';

// Generative drone
export { GenerativeDrone, getDrone, disposeDrone } from './drone';
export type { DroneState, DroneOptions } from './drone';
