"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Volume2, Play, Square, Sparkles, Bell, Home, Sun, Moon, Check, X, ChevronRight, Zap } from "lucide-react";
import { useSoundSystem } from "@/hooks/useSoundSystem";

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
  const { playClick, playToggle, playSuccess } = useSoundSystem();
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
        label="OS-Quality (Best)"
        description="Multi-layer + reverb"
        playSound={playClick}
        color="bg-emerald-500"
      />
    </div>
  );
}

/**
 * SoundPalette — Different UI sounds demo using the new sound engine
 */
export function SoundPalette() {
  const { 
    playClick, 
    playToggle, 
    playSuccess, 
    playError, 
    playHover,
    playOpen,
    playClose,
    playNavigate,
    playSelect,
    playThud,
    playChime,
    playNotification,
    playLightMode,
    playDarkMode,
    playHome,
  } = useSoundSystem();

  const sounds = [
    // Primary interactions
    { label: "Click", icon: Zap, play: () => playClick(), color: "bg-zinc-600", description: "Tactile button press" },
    { label: "Hover", icon: Sparkles, play: playHover, color: "bg-violet-500", description: "Soft interaction hint" },
    { label: "Select", icon: Check, play: playSelect, color: "bg-cyan-500", description: "Confirm selection" },
    { label: "Toggle", icon: Check, play: playToggle, color: "bg-emerald-500", description: "Switch state change" },
    
    // Navigation
    { label: "Navigate", icon: ChevronRight, play: playNavigate, color: "bg-blue-500", description: "Page transition" },
    { label: "Open", icon: ChevronRight, play: playOpen, color: "bg-indigo-500", description: "Expand/reveal" },
    { label: "Close", icon: X, play: playClose, color: "bg-slate-500", description: "Collapse/dismiss" },
    { label: "Home", icon: Home, play: playHome, color: "bg-amber-500", description: "Return home" },
    
    // Feedback
    { label: "Success", icon: Sparkles, play: playSuccess, color: "bg-green-500", description: "Action completed" },
    { label: "Error", icon: X, play: playError, color: "bg-red-500", description: "Something went wrong" },
    { label: "Notification", icon: Bell, play: playNotification, color: "bg-pink-500", description: "New alert" },
    { label: "Chime", icon: Bell, play: playChime, color: "bg-purple-500", description: "Attention getter" },
    
    // Theme
    { label: "Light Mode", icon: Sun, play: playLightMode, color: "bg-yellow-500", description: "Switch to light" },
    { label: "Dark Mode", icon: Moon, play: playDarkMode, color: "bg-slate-700", description: "Switch to dark" },
    
    // Effects
    { label: "Thud", icon: Zap, play: playThud, color: "bg-orange-600", description: "Heavy impact" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {sounds.map((sound) => {
        const Icon = sound.icon;
        return (
          <motion.button
            key={sound.label}
            onClick={sound.play}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-xl",
              "bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10",
              "hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", sound.color)}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-center">
              <p className="font-medium text-sm text-zinc-900 dark:text-white">{sound.label}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">{sound.description}</p>
            </div>
          </motion.button>
        );
      })}
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
