"use client";

/**
 * useSoundSystem Hook - "The Resonant Hum"
 * 
 * React hook for bioluminescent UI audio.
 * 
 * Features:
 * - The Breath (hover shimmer)
 * - The Droplet (glass/water clicks)
 * - The Friction (scroll noise)
 * - The Prism (notifications)
 * - The Drone (generative background)
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { getSoundPlayer, SoundPlayer } from "@/lib/audio/sound-player";
import type { SoundPresetName } from "@/lib/audio/sound-presets";

// ============================================================================
// Haptic Patterns (in milliseconds)
// Calibrated for glass/water aesthetic
// ============================================================================

const HAPTIC_PATTERNS: Record<string, number | number[]> = {
  // Subtle presence
  breath: 5,
  // Water droplet impact
  droplet: 12,
  dropletSecondary: 10,
  // Glass toggle
  toggle: [8, 22, 10],
  // Success chimes
  success: [6, 30, 6, 30, 10],
  // Navigation sweep
  navigate: [5, 15, 8],
  // Thud impact
  thud: 35,
  // Open/close gestures
  open: [4, 12, 8],
  close: [8, 12, 4],
  // Error/warning
  error: [16, 40, 16],
  warning: [12, 25, 12],
  // Theme switch
  themeSwitch: [6, 25, 8, 25, 6],
  // Home arrival
  home: [10, 35, 6],
  // Notification prism
  notification: [8, 30, 8],
  // Scroll stop
  scrollStop: 30,
  // Light interactions
  light: 4,
  // Selection
  select: 10,
};

// ============================================================================
// Storage Keys
// ============================================================================

const SOUND_MUTED_KEY = 'lum-sound-muted';
const DRONE_ENABLED_KEY = 'lum-drone-enabled';

// ============================================================================
// Hook
// ============================================================================

export function useSoundSystem() {
  const playerRef = useRef<SoundPlayer | null>(null);
  const hapticsEnabledRef = useRef(true);
  const droneEnabledRef = useRef<boolean>(
    typeof window !== 'undefined' 
      ? localStorage.getItem(DRONE_ENABLED_KEY) === 'true'
      : false
  );
  const mutedRef = useRef<boolean>(
    typeof window !== 'undefined' 
      ? localStorage.getItem(SOUND_MUTED_KEY) === 'true'
      : false
  );
  
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(SOUND_MUTED_KEY) === 'true';
    }
    return false;
  });

  const [isDroneEnabled, setIsDroneEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(DRONE_ENABLED_KEY) === 'true';
    }
    return false;
  });

  // Sync refs with state
  useEffect(() => {
    mutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    droneEnabledRef.current = isDroneEnabled;
  }, [isDroneEnabled]);

  // Initialize on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!playerRef.current) {
        playerRef.current = getSoundPlayer();
        playerRef.current.init();
      }
      playerRef.current?.resume();
      
      // Start drone if enabled
      if (droneEnabledRef.current && !mutedRef.current) {
        playerRef.current?.startDrone({ fadeIn: 5 });
      }
    };

    const events = ['click', 'keydown', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, initAudio, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, initAudio);
      });
    };
  }, []);

  // ==========================================================================
  // Haptic Feedback
  // ==========================================================================

  const supportsHaptics = useCallback(() => {
    if (typeof navigator === 'undefined') return false;
    if (!('vibrate' in navigator)) return false;
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    return !isIOS;
  }, []);

  const haptic = useCallback((pattern: number | number[]) => {
    if (hapticsEnabledRef.current && supportsHaptics()) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Silently fail
      }
    }
  }, [supportsHaptics]);

  const setHapticsEnabled = useCallback((enabled: boolean) => {
    hapticsEnabledRef.current = enabled;
  }, []);

  // ==========================================================================
  // Mute Control
  // ==========================================================================

  const toggleMute = useCallback(() => {
    const newMuted = !mutedRef.current;
    mutedRef.current = newMuted;
    setIsMuted(newMuted);
    localStorage.setItem(SOUND_MUTED_KEY, String(newMuted));
    
    // Handle drone
    if (newMuted) {
      playerRef.current?.stopDrone(1);
    } else if (droneEnabledRef.current) {
      playerRef.current?.startDrone({ fadeIn: 2 });
    }
  }, []);

  // ==========================================================================
  // Drone Control
  // ==========================================================================

  const toggleDrone = useCallback(() => {
    const newEnabled = !droneEnabledRef.current;
    droneEnabledRef.current = newEnabled;
    setIsDroneEnabled(newEnabled);
    localStorage.setItem(DRONE_ENABLED_KEY, String(newEnabled));
    
    if (!mutedRef.current) {
      if (newEnabled) {
        playerRef.current?.startDrone({ fadeIn: 2 });
      } else {
        playerRef.current?.stopDrone(1);
      }
    }
  }, []);

  const setDroneVolume = useCallback((volume: number) => {
    playerRef.current?.setDroneVolume(volume);
  }, []);

  // ==========================================================================
  // Generic Sound Playback
  // ==========================================================================

  const playSound = useCallback((
    preset: SoundPresetName, 
    hapticPattern?: number | number[]
  ) => {
    if (mutedRef.current) return;
    
    if (!playerRef.current) {
      playerRef.current = getSoundPlayer();
      playerRef.current.init();
    }
    
    playerRef.current.play(preset);
    
    if (hapticPattern) {
      haptic(hapticPattern);
    }
  }, [haptic]);

  // ==========================================================================
  // Core Interactions - "The Breath" and "The Droplet"
  // ==========================================================================

  /** 
   * The Breath - faint shimmer on hover 
   * "Like a lightsaber idling, but much softer"
   */
  const playHover = useCallback(() => {
    if (mutedRef.current) return;
    
    if (!playerRef.current) {
      playerRef.current = getSoundPlayer();
      playerRef.current.init();
    }
    
    playerRef.current.playHover();
    haptic(HAPTIC_PATTERNS.breath);
    
    // Signal activity to drone
    playerRef.current.signalActivity();
  }, [haptic]);

  /** 
   * The Droplet - water/glass tap
   * "Water Droplet hitting a pool, or finger tapping a wine glass"
   */
  const playClick = useCallback((secondary: boolean = false) => {
    if (mutedRef.current) return;
    
    if (!playerRef.current) {
      playerRef.current = getSoundPlayer();
      playerRef.current.init();
    }
    
    playerRef.current.playClick(secondary);
    haptic(secondary ? HAPTIC_PATTERNS.dropletSecondary : HAPTIC_PATTERNS.droplet);
    
    // Signal activity to drone
    playerRef.current.signalActivity();
  }, [haptic]);

  /** Secondary click for cancel/back actions */
  const playClickSecondary = useCallback(() => {
    playClick(true);
  }, [playClick]);

  // ==========================================================================
  // State Sounds
  // ==========================================================================

  const playToggle = useCallback(() => {
    playSound('toggle', HAPTIC_PATTERNS.toggle);
    playerRef.current?.signalActivity();
  }, [playSound]);

  const playSuccess = useCallback(() => {
    playSound('success', HAPTIC_PATTERNS.success);
  }, [playSound]);

  const playError = useCallback(() => {
    playSound('error', HAPTIC_PATTERNS.error);
  }, [playSound]);

  const playWarning = useCallback(() => {
    playSound('warning', HAPTIC_PATTERNS.warning);
  }, [playSound]);

  // ==========================================================================
  // Navigation
  // ==========================================================================

  const playNavigate = useCallback(() => {
    playSound('navigate', HAPTIC_PATTERNS.navigate);
    playerRef.current?.signalActivity();
  }, [playSound]);

  const playOpen = useCallback(() => {
    playSound('open', HAPTIC_PATTERNS.open);
    playerRef.current?.signalActivity();
  }, [playSound]);

  const playClose = useCallback(() => {
    playSound('close', HAPTIC_PATTERNS.close);
  }, [playSound]);

  // ==========================================================================
  // Selection
  // ==========================================================================

  const playSelect = useCallback(() => {
    playSound('select', HAPTIC_PATTERNS.select);
    playerRef.current?.signalActivity();
  }, [playSound]);

  const playDeselect = useCallback(() => {
    playSound('deselect', HAPTIC_PATTERNS.light);
  }, [playSound]);

  // ==========================================================================
  // Scroll & Slider - "The Friction"
  // ==========================================================================

  /** 
   * Update scroll friction sound
   * "Like sliding your hand over a smooth, velvet surface"
   */
  const updateScroll = useCallback((velocity: number) => {
    if (mutedRef.current) return;
    
    if (!playerRef.current) {
      playerRef.current = getSoundPlayer();
      playerRef.current.init();
    }
    
    playerRef.current.updateScroll(velocity);
  }, []);

  /** 
   * Play scroll stop thud
   * "When you hit the bottom, a soft 'thud'"
   */
  const playScrollStop = useCallback(() => {
    if (mutedRef.current) return;
    
    if (!playerRef.current) {
      playerRef.current = getSoundPlayer();
      playerRef.current.init();
    }
    
    playerRef.current.playScrollStop();
    haptic(HAPTIC_PATTERNS.scrollStop);
  }, [haptic]);

  /** Slider tick with pitch mapping */
  const playTick = useCallback((value: number, min: number, max: number) => {
    if (mutedRef.current) return;
    
    if (!playerRef.current) {
      playerRef.current = getSoundPlayer();
      playerRef.current.init();
    }
    
    playerRef.current.playTick(value, min, max);
    haptic(HAPTIC_PATTERNS.light);
    playerRef.current.signalActivity();
  }, [haptic]);

  /** 
   * Satisfying slider tick - more tactile and weighty
   * For time travel slider and other premium controls
   */
  const playSliderTick = useCallback((value: number, min: number, max: number) => {
    if (mutedRef.current) return;
    
    if (!playerRef.current) {
      playerRef.current = getSoundPlayer();
      playerRef.current.init();
    }
    
    playerRef.current.playSliderTick(value, min, max);
    haptic(HAPTIC_PATTERNS.medium);
    playerRef.current.signalActivity();
  }, [haptic]);

  /** Thud for impacts */
  const playThud = useCallback(() => {
    playSound('scrollStop', HAPTIC_PATTERNS.thud);
  }, [playSound]);

  // ==========================================================================
  // Notifications - "The Prism"
  // ==========================================================================

  /** 
   * The Prism - glass chime notification
   * "Glass Chime or Kalimba note... like BOTW ambient sounds"
   */
  const playNotification = useCallback(() => {
    playSound('notification', HAPTIC_PATTERNS.notification);
  }, [playSound]);

  const playChime = useCallback(() => {
    playSound('chime', HAPTIC_PATTERNS.notification);
  }, [playSound]);

  // ==========================================================================
  // Theme
  // ==========================================================================

  const playLightMode = useCallback(() => {
    playSound('lightMode', HAPTIC_PATTERNS.themeSwitch);
  }, [playSound]);

  const playDarkMode = useCallback(() => {
    playSound('darkMode', HAPTIC_PATTERNS.themeSwitch);
  }, [playSound]);

  // ==========================================================================
  // Special
  // ==========================================================================

  const playHome = useCallback(() => {
    playSound('home', HAPTIC_PATTERNS.home);
  }, [playSound]);

  const playAmbient = useCallback(() => {
    playSound('ambient');
  }, [playSound]);

  const playNavNote = useCallback((index: number) => {
    if (mutedRef.current) return;
    
    if (!playerRef.current) {
      playerRef.current = getSoundPlayer();
      playerRef.current.init();
    }
    
    playerRef.current.playNavNote(index);
    haptic(HAPTIC_PATTERNS.light);
    playerRef.current.signalActivity();
  }, [haptic]);

  // ==========================================================================
  // Loading States (Drone Integration)
  // ==========================================================================

  /** Signal loading started - drone pitch bends up */
  const signalLoading = useCallback(() => {
    playerRef.current?.signalBusy();
  }, []);

  /** Signal loading complete - drone releases tension */
  const signalLoadingComplete = useCallback(() => {
    playerRef.current?.signalBusyComplete();
  }, []);

  /** Signal user activity - drone sparkles */
  const signalActivity = useCallback(() => {
    playerRef.current?.signalActivity();
  }, []);

  // ==========================================================================
  // Return API
  // ==========================================================================

  return {
    // Core interactions
    playHover,          // The Breath
    playClick,          // The Droplet
    playClickSecondary, // Lower pitch click

    // State sounds
    playToggle,
    playSuccess,
    playError,
    playWarning,

    // Navigation
    playNavigate,
    playOpen,
    playClose,

    // Selection
    playSelect,
    playDeselect,

    // Scroll & Slider
    updateScroll,       // The Friction
    playScrollStop,     // Thud on bounds
    playTick,
    playSliderTick,     // Satisfying tactile click
    playThud,

    // Notifications
    playNotification,   // The Prism
    playChime,

    // Theme
    playLightMode,
    playDarkMode,

    // Special
    playHome,
    playAmbient,
    playNavNote,

    // Loading states
    signalLoading,
    signalLoadingComplete,
    signalActivity,

    // Generic
    playSound,

    // Controls
    isMuted,
    toggleMute,
    isDroneEnabled,
    toggleDrone,
    setDroneVolume,
    setHapticsEnabled,
    supportsHaptics,
  };
}
