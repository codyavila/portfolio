"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Volume2, Play, Square } from "lucide-react";

/**
 * SoundCompare — Compare different sound characteristics
 */

interface SoundButtonProps {
  label: string;
  description: string;
  playSound: () => void;
  color: string;
}

function SoundButton({ label, description, playSound, color }: SoundButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(true);
    playSound();
    setTimeout(() => setIsPlaying(false), 200);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "p-4 rounded-xl text-left transition-colors",
        "bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10",
        "hover:bg-zinc-200 dark:hover:bg-white/10"
      )}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className={cn("w-10 h-10 rounded-lg flex items-center justify-center", color)}
          animate={{ scale: isPlaying ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <Volume2 className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white text-sm">{label}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
        </div>
      </div>
    </motion.button>
  );
}

export function SoundCompare() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  };

  // Harsh unfiltered beep (bad example)
  const playHarsh = () => {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "square";
    osc.frequency.value = 800;
    gain.gain.value = 0.15;
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.stop(ctx.currentTime + 0.15);
  };

  // Filtered warm tone (good example)
  const playFiltered = () => {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.value = 500;
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);
    
    filter.type = "lowpass";
    filter.frequency.value = 1200;
    filter.Q.value = 0.5;
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  };

  // With noise layer (premium example)
  const playWithNoise = () => {
    const ctx = getContext();
    const now = ctx.currentTime;
    
    // Tone
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.value = 550;
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.1);
    
    filter.type = "lowpass";
    filter.frequency.value = 1500;
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    // Noise burst
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 1000;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.06, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
    noise.start(now);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <SoundButton
        label="Harsh (Bad)"
        description="Unfiltered square wave"
        playSound={playHarsh}
        color="bg-red-500"
      />
      <SoundButton
        label="Filtered (Better)"
        description="Low-pass filtered sine"
        playSound={playFiltered}
        color="bg-amber-500"
      />
      <SoundButton
        label="Layered (Best)"
        description="Filtered + noise texture"
        playSound={playWithNoise}
        color="bg-emerald-500"
      />
    </div>
  );
}

/**
 * SoundPalette — Different UI sounds demo
 */
export function SoundPalette() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  };

  const playClick = useCallback(() => {
    const ctx = getContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.frequency.value = 500;
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.1);
    filter.type = "lowpass";
    filter.frequency.value = 1500;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }, []);

  const playToggleOn = useCallback(() => {
    const ctx = getContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.frequency.value = 400;
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
    filter.type = "lowpass";
    filter.frequency.value = 2000;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }, []);

  const playToggleOff = useCallback(() => {
    const ctx = getContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.frequency.value = 600;
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.12);
    filter.type = "lowpass";
    filter.frequency.value = 1500;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }, []);

  const playSuccess = useCallback(() => {
    const ctx = getContext();
    const now = ctx.currentTime;
    
    // Two-note chord
    [523.25, 659.25].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      
      osc.frequency.value = freq;
      filter.type = "lowpass";
      filter.frequency.value = 2000;
      gain.gain.setValueAtTime(0.06, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3 + i * 0.05);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + 0.3 + i * 0.05);
    });
  }, []);

  const playError = useCallback(() => {
    const ctx = getContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.value = 180;
    filter.type = "lowpass";
    filter.frequency.value = 400;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {/* eslint-disable-next-line react-hooks/refs */}
      {[
        { label: "Click", icon: "👆", play: playClick, color: "bg-zinc-600" },
        { label: "Toggle On", icon: "✓", play: playToggleOn, color: "bg-emerald-500" },
        { label: "Toggle Off", icon: "✗", play: playToggleOff, color: "bg-zinc-500" },
        { label: "Success", icon: "🎉", play: playSuccess, color: "bg-cyan-500" },
        { label: "Error", icon: "⚠", play: playError, color: "bg-red-500" },
      ].map((sound) => (
        <motion.button
          key={sound.label}
          onClick={sound.play}
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm text-white",
            sound.color
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="mr-1.5">{sound.icon}</span>
          {sound.label}
        </motion.button>
      ))}
    </div>
  );
}

/**
 * WaveformVisualizer — Shows what different waveforms look like
 */
export function WaveformVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [waveform, setWaveform] = useState<"sine" | "square" | "sawtooth" | "triangle">("sine");
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const draw = () => {
      const canvas = canvasRef.current;
      const analyser = analyserRef.current;
      if (!canvas || !analyser) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "rgba(15, 17, 22, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00ff99";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      oscillatorRef.current?.stop();
      oscillatorRef.current = null;
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
      }

      const ctx = audioContextRef.current;
      const analyser = analyserRef.current!;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = waveform;
      osc.frequency.value = 220;
      gain.gain.value = 0.3;
      
      osc.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);
      
      osc.start();
      oscillatorRef.current = osc;
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (oscillatorRef.current && isPlaying) {
      oscillatorRef.current.type = waveform;
    }
  }, [waveform, isPlaying]);

  useEffect(() => {
    return () => {
      oscillatorRef.current?.stop();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const waveforms: Array<{ type: "sine" | "square" | "sawtooth" | "triangle"; label: string }> = [
    { type: "sine", label: "Sine" },
    { type: "square", label: "Square" },
    { type: "sawtooth", label: "Sawtooth" },
    { type: "triangle", label: "Triangle" },
  ];

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <canvas
          ref={canvasRef}
          width={400}
          height={120}
          className="w-full h-[120px] bg-zinc-900"
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
            <p className="text-sm text-zinc-400">Click play to visualize</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className={cn(
            "p-2 rounded-lg transition-colors",
            isPlaying
              ? "bg-red-500 text-white"
              : "bg-emerald-500 text-white"
          )}
        >
          {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <div className="flex gap-1.5 flex-1">
          {waveforms.map((w) => (
            <button
              key={w.type}
              onClick={() => setWaveform(w.type)}
              className={cn(
                "flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                waveform === w.type
                  ? "bg-emerald-500 text-white"
                  : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400"
              )}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
