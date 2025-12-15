"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Pentatonic scale for melodic variety (A minor pentatonic)
const PENTATONIC = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00];

// Warm, organic notes (lower register for body)
const WARM_NOTES = [329.63, 392.00, 440.00, 493.88, 523.25];

// Haptic patterns (in milliseconds) - [vibrate, pause, vibrate, ...]
// Designed to feel subtle and complement the sounds
const HAPTIC_PATTERNS: Record<string, number | number[]> = {
  // Light tap for hover/tick
  light: 8,
  // Soft click
  click: 15,
  // Satisfying toggle
  toggle: [10, 30, 15],
  // Success celebration
  success: [10, 40, 10, 40, 15],
  // Navigation whoosh
  navigate: [8, 20, 12],
  // Deep thud
  thud: 40,
  // Open/expand
  open: [5, 15, 10],
  // Close/collapse
  close: [10, 15, 5],
  // Error double-pulse
  error: [20, 50, 20],
  // Theme switch
  themeSwitch: [8, 30, 12, 30, 8],
  // Home bounce
  home: [12, 40, 8],
};

const SOUND_MUTED_KEY = 'lum-sound-muted';

export function useSoundSystem() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const lastTickTimeRef = useRef<number>(0);
  const tickIndexRef = useRef<number>(0);
  const hapticsEnabledRef = useRef<boolean>(true);
  const mutedRef = useRef<boolean>(() => {
    // Initialize from localStorage immediately
    if (typeof window !== 'undefined') {
      return localStorage.getItem(SOUND_MUTED_KEY) === 'true';
    }
    return false;
  });
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(SOUND_MUTED_KEY) === 'true';
    }
    return false;
  });

  // Sync ref with initial state
  useEffect(() => {
    mutedRef.current = isMuted;
  }, [isMuted]);

  // Check if device supports vibration (iOS Safari does NOT support this)
  const supportsHaptics = useCallback(() => {
    if (typeof navigator === "undefined") return false;
    if (!("vibrate" in navigator)) return false;
    
    // iOS detection - vibrate exists but does nothing
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    return !isIOS;
  }, []);

  // Trigger haptic feedback
  const haptic = useCallback((pattern: number | number[]) => {
    if (hapticsEnabledRef.current && supportsHaptics()) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Silently fail if vibration isn't available
      }
    }
  }, [supportsHaptics]);

  // Allow users to enable/disable haptics
  const setHapticsEnabled = useCallback((enabled: boolean) => {
    hapticsEnabledRef.current = enabled;
  }, []);

  // Toggle mute state
  const toggleMute = useCallback(() => {
    const newMuted = !mutedRef.current;
    mutedRef.current = newMuted;
    setIsMuted(newMuted);
    localStorage.setItem(SOUND_MUTED_KEY, String(newMuted));
  }, []);

  useEffect(() => {
    // Initialize AudioContext on user interaction to comply with browser policies
    const initAudio = () => {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
            
            // Create a compressor for smoother dynamics
            compressorRef.current = audioContextRef.current.createDynamicsCompressor();
            compressorRef.current.threshold.value = -24;
            compressorRef.current.knee.value = 30;
            compressorRef.current.ratio.value = 12;
            compressorRef.current.attack.value = 0.003;
            compressorRef.current.release.value = 0.25;
            
            gainNodeRef.current = audioContextRef.current.createGain();
            gainNodeRef.current.connect(compressorRef.current);
            compressorRef.current.connect(audioContextRef.current.destination);
            // Set global volume
            gainNodeRef.current.gain.value = 0.08;
        }
      }
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener("click", initAudio, { once: true });
    window.addEventListener("keydown", initAudio, { once: true });
    window.addEventListener("mousemove", initAudio, { once: true });

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Helper: Create filtered oscillator with warmth
  const createWarmOsc = useCallback((ctx: AudioContext, freq: number, detune: number = 0) => {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.detune.value = detune;
    
    // Soft low-pass filter removes harsh overtones
    filter.type = "lowpass";
    filter.frequency.value = 2000;
    filter.Q.value = 0.5;
    
    osc.connect(filter);
    filter.connect(gain);
    
    return { osc, filter, gain };
  }, []);

  // Helper: Create subtle noise burst for organic texture
  const createNoiseLayer = useCallback((ctx: AudioContext, duration: number, volume: number = 0.02) => {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Pink-ish noise (softer than white noise)
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.0990460;
      b1 = 0.96300 * b1 + white * 0.2965164;
      b2 = 0.57000 * b2 + white * 1.0526913;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.11;
    }
    
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 0.8;
    
    gain.gain.value = volume;
    
    source.connect(filter);
    filter.connect(gain);
    
    return { source, gain };
  }, []);

  // Helper: Create simple reverb tail using delay feedback
  const createReverbTail = useCallback((ctx: AudioContext, input: AudioNode, output: GainNode, wetAmount: number = 0.15) => {
    const delays = [0.03, 0.05, 0.08, 0.12];
    const gains = [0.4, 0.25, 0.15, 0.08];
    
    delays.forEach((delayTime, i) => {
      const delay = ctx.createDelay();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      delay.delayTime.value = delayTime;
      gain.gain.value = gains[i] * wetAmount;
      filter.type = "lowpass";
      filter.frequency.value = 2500 - (i * 400); // Darker as delay increases
      
      input.connect(delay);
      delay.connect(filter);
      filter.connect(gain);
      gain.connect(output);
    });
  }, []);

  // Soft, organic hover - gentle "bloom" with warmth
  const playHover = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.light);

    const ctx = audioContextRef.current;
    const note = WARM_NOTES[Math.floor(Math.random() * 3)];
    
    // Main tone with slight detuning for warmth
    const { osc: osc1, gain: gain1 } = createWarmOsc(ctx, note, -3);
    const { osc: osc2, gain: gain2 } = createWarmOsc(ctx, note, 3);
    
    // Soft attack, smooth decay
    [gain1, gain2].forEach((g) => {
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      g.connect(gainNodeRef.current!);
    });
    
    // Add subtle reverb tail
    createReverbTail(ctx, gain1, gainNodeRef.current!, 0.12);
    
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.2);
    osc2.stop(ctx.currentTime + 0.2);
  }, [createWarmOsc, createReverbTail, haptic]);

  // Refined click - soft "pop" with texture
  const playClick = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.click);

    const ctx = audioContextRef.current;
    
    // Soft body tone with filter sweep
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(380, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.1);
    
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
    filter.Q.value = 1;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(gainNodeRef.current);
    
    // Add noise texture for tactile feel
    const { source: noise, gain: noiseGain } = createNoiseLayer(ctx, 0.06, 0.015);
    noiseGain.gain.setValueAtTime(0.015, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    noiseGain.connect(gainNodeRef.current);
    
    osc.start();
    noise.start();
    osc.stop(ctx.currentTime + 0.12);
    noise.stop(ctx.currentTime + 0.06);
  }, [createNoiseLayer, haptic]);

  // Deep, satisfying thud with natural resonance
  const playThud = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.thud);

    const ctx = audioContextRef.current;
    
    // Deep sine with sub-bass
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(90, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
    
    filter.type = "lowpass";
    filter.frequency.value = 200;
    filter.Q.value = 2;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(gainNodeRef.current);
    
    // Add noise impact texture
    const { source: noise, gain: noiseGain } = createNoiseLayer(ctx, 0.1, 0.04);
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 400;
    noiseGain.disconnect();
    noise.disconnect();
    const noiseEnv = ctx.createGain();
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseEnv);
    noiseEnv.gain.setValueAtTime(0.04, ctx.currentTime);
    noiseEnv.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    noiseEnv.connect(gainNodeRef.current);
    
    osc.start();
    noise.start();
    osc.stop(ctx.currentTime + 0.35);
    noise.stop(ctx.currentTime + 0.1);
  }, [createNoiseLayer, haptic]);

  // Toggle switch - smooth mechanical "click-settle" with warmth
  const playToggle = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.toggle);

    const ctx = audioContextRef.current;
    
    // Mechanical click with filtered warmth
    const click = ctx.createOscillator();
    const clickFilter = ctx.createBiquadFilter();
    const clickGain = ctx.createGain();
    
    click.type = "sine";
    click.frequency.setValueAtTime(1200, ctx.currentTime);
    click.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);
    
    clickFilter.type = "lowpass";
    clickFilter.frequency.setValueAtTime(4000, ctx.currentTime);
    clickFilter.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.05);
    
    clickGain.gain.setValueAtTime(0, ctx.currentTime);
    clickGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.008);
    clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    
    click.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(gainNodeRef.current);
    
    // Soft settle tone
    const { osc: settle, gain: settleGain } = createWarmOsc(ctx, 440, 0);
    settleGain.gain.setValueAtTime(0, ctx.currentTime + 0.04);
    settleGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.06);
    settleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    settleGain.connect(gainNodeRef.current);
    
    // Add reverb to settle
    createReverbTail(ctx, settleGain, gainNodeRef.current!, 0.1);
    
    // Subtle noise texture
    const { source: noise, gain: noiseGain } = createNoiseLayer(ctx, 0.04, 0.008);
    noiseGain.connect(gainNodeRef.current);
    
    click.start();
    settle.start(ctx.currentTime + 0.04);
    noise.start();
    click.stop(ctx.currentTime + 0.06);
    settle.stop(ctx.currentTime + 0.2);
    noise.stop(ctx.currentTime + 0.04);
  }, [createWarmOsc, createNoiseLayer, createReverbTail, haptic]);

  // Success - warm, gentle arpeggio with shimmer
  const playSuccess = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.success);

    const ctx = audioContextRef.current;
    const notes = [392.00, 493.88, 587.33, 783.99]; // G4, B4, D5, G5 - major arpeggio
    
    notes.forEach((freq, i) => {
      const { osc, filter, gain } = createWarmOsc(ctx, freq, (Math.random() - 0.5) * 4);
      const startTime = ctx.currentTime + (i * 0.07);
      
      filter.frequency.setValueAtTime(3000, startTime);
      filter.frequency.exponentialRampToValueAtTime(1500, startTime + 0.3);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08 - (i * 0.012), startTime + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      
      gain.connect(gainNodeRef.current!);
      
      // Add reverb to last note
      if (i === notes.length - 1) {
        createReverbTail(ctx, gain, gainNodeRef.current!, 0.2);
      }
      
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }, [createWarmOsc, createReverbTail, haptic]);

  // Navigation - smooth filtered whoosh with resonance
  const playNavigate = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.navigate);

    const ctx = audioContextRef.current;
    
    // Filtered sweep
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.15);
    
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.12);
    filter.Q.value = 2;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(gainNodeRef.current);
    
    // Add subtle noise for air movement
    const { source: noise, gain: noiseGain } = createNoiseLayer(ctx, 0.1, 0.01);
    noiseGain.gain.setValueAtTime(0.01, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    noiseGain.connect(gainNodeRef.current);
    
    createReverbTail(ctx, gain, gainNodeRef.current!, 0.08);
    
    osc.start();
    noise.start();
    osc.stop(ctx.currentTime + 0.15);
    noise.stop(ctx.currentTime + 0.1);
  }, [createNoiseLayer, createReverbTail, haptic]);

  // Card select - warm dyad with gentle bloom
  const playSelect = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.click);

    const ctx = audioContextRef.current;
    
    // Warm fifth interval with detuning
    const notes = [293.66, 440.00]; // D4 + A4 (perfect fifth)
    
    notes.forEach((freq, i) => {
      const { osc, filter, gain } = createWarmOsc(ctx, freq, (i === 0 ? -2 : 2));
      
      filter.frequency.setValueAtTime(2500, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.25);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06 - (i * 0.015), ctx.currentTime + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      gain.connect(gainNodeRef.current!);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    });
    
    createReverbTail(ctx, gainNodeRef.current!, gainNodeRef.current!, 0.12);
  }, [createWarmOsc, createReverbTail, haptic]);

  // Slider tick - soft filtered tick with musical pitch
  const playTick = useCallback((value: number, min: number, max: number) => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    
    const now = Date.now();
    if (now - lastTickTimeRef.current < 40) return;
    lastTickTimeRef.current = now;
    haptic(HAPTIC_PATTERNS.light);

    const ctx = audioContextRef.current;
    
    const normalized = (value - min) / (max - min);
    const noteIndex = Math.floor(normalized * (PENTATONIC.length - 1));
    const freq = PENTATONIC[Math.min(noteIndex, PENTATONIC.length - 1)];
    
    const { osc, filter, gain } = createWarmOsc(ctx, freq, 0);
    
    filter.frequency.value = 2000;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    gain.connect(gainNodeRef.current);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
    
    tickIndexRef.current++;
  }, [createWarmOsc, haptic]);

  // Open/expand - gentle ascending sweep with airy texture
  const playOpen = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.open);

    const ctx = audioContextRef.current;
    
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.12);
    
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2500, ctx.currentTime + 0.1);
    filter.Q.value = 1.5;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(gainNodeRef.current);
    
    // Soft arrival tone
    const { osc: arrival, gain: arrivalGain } = createWarmOsc(ctx, 659.25, 0); // E5
    arrivalGain.gain.setValueAtTime(0, ctx.currentTime + 0.08);
    arrivalGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
    arrivalGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    arrivalGain.connect(gainNodeRef.current);
    
    createReverbTail(ctx, arrivalGain, gainNodeRef.current!, 0.15);
    
    osc.start();
    arrival.start(ctx.currentTime + 0.08);
    osc.stop(ctx.currentTime + 0.15);
    arrival.stop(ctx.currentTime + 0.25);
  }, [createWarmOsc, createReverbTail, haptic]);

  // Close/collapse - gentle descending sweep
  const playClose = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.close);

    const ctx = audioContextRef.current;
    
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(550, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12);
    
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    filter.Q.value = 1;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(gainNodeRef.current);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }, [haptic]);

  // Error - soft dissonant pulse (not harsh)
  const playError = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.error);

    const ctx = audioContextRef.current;
    
    // Two soft pulses with slight dissonance
    [0, 0.12].forEach((delay) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + delay + 0.08);
      
      filter.type = "lowpass";
      filter.frequency.value = 800;
      filter.Q.value = 1;
      
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.1);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(gainNodeRef.current!);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.1);
    });
  }, [haptic]);
  // Ambient bloom - soft pad for transitions
  const playAmbient = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;

    const ctx = audioContextRef.current;
    
    const notes = [261.63, 329.63, 392.00]; // C major triad
    
    notes.forEach((freq) => {
      const { osc, filter, gain } = createWarmOsc(ctx, freq, (Math.random() - 0.5) * 6);
      
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 1.0);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      
      gain.connect(gainNodeRef.current!);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    });
    
    createReverbTail(ctx, gainNodeRef.current!, gainNodeRef.current!, 0.2);
  }, [createWarmOsc, createReverbTail]);

  // Nav note - warm filtered note per navigation item
  const playNavNote = useCallback((index: number) => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.light);

    const ctx = audioContextRef.current;
    
    // Warmer navigation notes
    const navNotes = [392.00, 440.00, 493.88, 523.25, 587.33, 659.25];
    const freq = navNotes[index % navNotes.length];
    
    const { osc, filter, gain } = createWarmOsc(ctx, freq, (Math.random() - 0.5) * 3);
    
    filter.frequency.setValueAtTime(2500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    
    gain.connect(gainNodeRef.current);
    createReverbTail(ctx, gain, gainNodeRef.current!, 0.1);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  }, [createWarmOsc, createReverbTail, haptic]);

  // Light mode - warm ascending with gentle shimmer
  const playLightMode = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.themeSwitch);

    const ctx = audioContextRef.current;
    
    const notes = [392.00, 493.88, 587.33]; // G4, B4, D5 - ascending major
    
    notes.forEach((freq, i) => {
      const { osc, filter, gain } = createWarmOsc(ctx, freq, (i === 1 ? 3 : -3));
      const startTime = ctx.currentTime + (i * 0.08);
      
      filter.frequency.setValueAtTime(2000, startTime);
      filter.frequency.exponentialRampToValueAtTime(3500, startTime + 0.1);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
      
      gain.connect(gainNodeRef.current!);
      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
    
    createReverbTail(ctx, gainNodeRef.current!, gainNodeRef.current!, 0.15);
  }, [createWarmOsc, createReverbTail, haptic]);

  // Dark mode - cool descending with depth
  const playDarkMode = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.themeSwitch);

    const ctx = audioContextRef.current;
    
    const notes = [493.88, 392.00, 329.63]; // B4, G4, E4 - descending
    
    notes.forEach((freq, i) => {
      const { osc, filter, gain } = createWarmOsc(ctx, freq, (i === 1 ? -4 : 4));
      const startTime = ctx.currentTime + (i * 0.09);
      
      filter.frequency.setValueAtTime(2000, startTime);
      filter.frequency.exponentialRampToValueAtTime(800, startTime + 0.2);
      
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.97, startTime + 0.2);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.07, startTime + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      
      gain.connect(gainNodeRef.current!);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
    
    // Deep undertone
    const { osc: bass, gain: bassGain } = createWarmOsc(ctx, 164.81, 0); // E3
    bassGain.gain.setValueAtTime(0, ctx.currentTime + 0.18);
    bassGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.24);
    bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    bassGain.connect(gainNodeRef.current!);
    
    createReverbTail(ctx, bassGain, gainNodeRef.current!, 0.2);
    
    bass.start(ctx.currentTime + 0.18);
    bass.stop(ctx.currentTime + 0.5);
  }, [createWarmOsc, createReverbTail, haptic]);

  // Home - warm welcoming bounce with organic feel
  const playHome = useCallback(() => {
    if (!!mutedRef.current || !audioContextRef.current || !gainNodeRef.current) return;
    haptic(HAPTIC_PATTERNS.home);

    const ctx = audioContextRef.current;
    
    // First bounce - warm rise
    const { osc: bounce1, filter: filter1, gain: gain1 } = createWarmOsc(ctx, 350, -4);
    filter1.frequency.setValueAtTime(1500, ctx.currentTime);
    filter1.frequency.exponentialRampToValueAtTime(2500, ctx.currentTime + 0.06);
    bounce1.frequency.setValueAtTime(350, ctx.currentTime);
    bounce1.frequency.exponentialRampToValueAtTime(392.00, ctx.currentTime + 0.05); // G4
    gain1.gain.setValueAtTime(0, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    gain1.connect(gainNodeRef.current!);
    
    // Second bounce - settle higher
    const { osc: bounce2, filter: filter2, gain: gain2 } = createWarmOsc(ctx, 490, 4);
    filter2.frequency.setValueAtTime(2000, ctx.currentTime + 0.1);
    filter2.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.15);
    bounce2.frequency.setValueAtTime(490, ctx.currentTime + 0.1);
    bounce2.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.15); // C5
    gain2.gain.setValueAtTime(0, ctx.currentTime + 0.1);
    gain2.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    gain2.connect(gainNodeRef.current!);
    
    createReverbTail(ctx, gain2, gainNodeRef.current!, 0.15);
    
    bounce1.start();
    bounce2.start(ctx.currentTime + 0.1);
    bounce1.stop(ctx.currentTime + 0.15);
    bounce2.stop(ctx.currentTime + 0.25);
  }, [createWarmOsc, createReverbTail, haptic]);

  return { 
    playHover, 
    playClick, 
    playThud, 
    playToggle, 
    playSuccess, 
    playNavigate,
    playSelect,
    playTick,
    playOpen,
    playClose,
    playError,
    playAmbient,
    playNavNote,
    playLightMode,
    playDarkMode,
    playHome,
    // Haptics control
    setHapticsEnabled,
    supportsHaptics,
    // Sound mute control
    isMuted,
    toggleMute,
  };
}
