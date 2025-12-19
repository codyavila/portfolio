"use client";

import { useState, useCallback, useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { PortalCard } from '@/components/ui/portal-card';
import { Copy, Check, RotateCcw, Grip, MousePointer, ArrowRight, Settings2, Code2, PlayCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Preset spring configurations
const presets = {
  'Jelly': { 
    stiffness: 400, damping: 15, mass: 0.6,
    description: 'Playful and bouncy'
  },
  'Liquid': { 
    stiffness: 300, damping: 20, mass: 0.8,
    description: 'Smooth and fluid'
  },
  'Bouncy': { 
    stiffness: 500, damping: 10, mass: 0.5,
    description: 'Maximum bounce'
  },
  'Smooth': { 
    stiffness: 200, damping: 25, mass: 1,
    description: 'Elegant, no overshoot'
  },
  'Snappy': { 
    stiffness: 600, damping: 30, mass: 0.4,
    description: 'Quick response'
  },
  'Wobbly': { 
    stiffness: 180, damping: 12, mass: 1.2,
    description: 'Slow wobble'
  },
} as const;

type PresetName = keyof typeof presets;
type DemoMode = 'drag' | 'click' | 'hover';

export function AnimationPlayground() {
  const [stiffness, setStiffness] = useState(400);
  const [damping, setDamping] = useState(15);
  const [mass, setMass] = useState(0.6);
  const [activePreset, setActivePreset] = useState<PresetName | null>('Jelly');
  const [copied, setCopied] = useState(false);
  const [demoMode, setDemoMode] = useState<DemoMode>('drag');
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Motion values for the interactive demo
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  
  const springConfig = useMemo(() => ({ stiffness, damping, mass }), [stiffness, damping, mass]);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springRotate = useSpring(rotate, springConfig);

  // Dynamic 3D tilt based on position
  const tiltX = useTransform(springY, [-200, 200], [15, -15]);
  const tiltY = useTransform(springX, [-200, 200], [-15, 15]);
  
  // Combine spring rotation with tilt
  const combinedRotateX = useTransform([springRotate, tiltX], ([r, t]) => (demoMode === 'drag' ? t : 0));
  const combinedRotateY = useTransform([springRotate, tiltY], ([r, t]) => (demoMode === 'drag' ? t : 0));
  const combinedRotateZ = springRotate;

  // Connection line transforms - ALWAYS call these hooks (not conditionally)
  const lineHeight = useTransform(
    [springX, springY],
    ([latestX, latestY]) => Math.sqrt((latestX as number) ** 2 + (latestY as number) ** 2)
  );
  const lineRotate = useTransform(
    [springX, springY],
    ([latestX, latestY]) => {
      const xVal = latestX as number;
      const yVal = latestY as number;
      return Math.atan2(-yVal, -xVal) * (180 / Math.PI) - 90;
    }
  );
  
  // Dynamic opacity for the line based on length (fade out when close to center)
  const lineOpacity = useTransform(lineHeight, [0, 50], [0, 0.6]);
  
  // Dynamic text based on distance
  const isFar = useTransform(lineHeight, (h) => h > 100);
  const [showReleaseText, setShowReleaseText] = useState(false);
  
  useMemo(() => {
    return isFar.on('change', (v) => setShowReleaseText(v));
  }, [isFar]);

  const handlePresetSelect = useCallback((name: PresetName) => {
    const preset = presets[name];
    setStiffness(preset.stiffness);
    setDamping(preset.damping);
    setMass(preset.mass);
    setActivePreset(name);
  }, []);

  const handleSliderChange = useCallback((setter: (v: number) => void, value: number) => {
    setter(value);
    setActivePreset(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    x.set(0);
    y.set(0);
    rotate.set(0);
  }, [x, y, rotate]);

  const handleClickDemo = useCallback(() => {
    scale.set(0.8);
    rotate.set(-5);
    setTimeout(() => {
      scale.set(1);
      rotate.set(0);
    }, 50);
  }, [scale, rotate]);

  const handleHoverStart = useCallback(() => {
    scale.set(1.15);
    rotate.set(3);
  }, [scale, rotate]);

  const handleHoverEnd = useCallback(() => {
    scale.set(1);
    rotate.set(0);
  }, [scale, rotate]);

  const resetToDefault = useCallback(() => {
    handlePresetSelect('Jelly');
  }, [handlePresetSelect]);

  const copyConfig = () => {
    const code = `const springConfig = { stiffness: ${stiffness}, damping: ${damping}, mass: ${mass} };`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate animation characteristics
  const frequency = Math.sqrt(stiffness / mass) / (2 * Math.PI);
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const settleTime = dampingRatio < 1 ? (4 / (dampingRatio * Math.sqrt(stiffness / mass))) : (4 * mass / damping);
  
  const getCharacter = () => {
    if (dampingRatio >= 1) return { label: 'No Bounce', color: 'text-yellow-500' };
    if (dampingRatio >= 0.7) return { label: 'Subtle', color: 'text-blue-400' };
    if (dampingRatio >= 0.4) return { label: 'Balanced', color: 'text-green-400' };
    return { label: 'Bouncy', color: 'text-[var(--neon-primary-end)]' };
  };
  
  const character = getCharacter();

  return (
    <main className="container mx-auto px-6 pt-20 pb-12 max-w-7xl flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Left Sidebar - Controls */}
      <div className="w-full md:w-[320px] flex flex-col gap-4 shrink-0">
        {/* Back + Header */}
        <div className="flex items-center gap-3">
          <Link 
            href="/projects" 
            className="p-2 rounded-lg bg-[var(--glass-1-fill)] border border-[var(--glass-1-border)] hover:border-[var(--glass-2-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-lg font-bold text-[var(--text-primary)]">Spring Physics</h1>
            <button onClick={resetToDefault} className="p-2 rounded-lg hover:bg-[var(--glass-1-fill)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Presets */}
        <PortalCard className="p-4" glow="none">
          <div className="flex items-center gap-2 mb-3 text-[var(--text-secondary)]">
            <Settings2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Presets</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(presets) as PresetName[]).map((name) => (
              <button
                key={name}
                onClick={() => handlePresetSelect(name)}
                className={cn(
                  "px-3 py-2 rounded-lg text-left transition-all border",
                  activePreset === name
                    ? "bg-[var(--chip-secondary-bg)] border-[var(--chip-secondary-border)] text-[var(--chip-secondary-text)]"
                    : "bg-[var(--glass-1-fill)] border-transparent hover:border-[var(--glass-2-border)] text-[var(--text-secondary)]"
                )}
              >
                <div className="text-sm font-medium">{name}</div>
                <div className="text-[10px] opacity-70 truncate">{presets[name].description}</div>
              </button>
            ))}
          </div>
        </PortalCard>

        {/* Sliders */}
        <PortalCard className="p-4 flex-1" glow="none">
          <div className="flex items-center justify-between mb-4 text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Parameters</span>
            </div>
            {activePreset === null && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--neon-accent-end)]/10 text-[var(--neon-accent-end)]">Custom</span>
            )}
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'Stiffness', value: stiffness, set: setStiffness, min: 50, max: 1000, step: 10, color: 'var(--neon-primary-end)' },
              { label: 'Damping', value: damping, set: setDamping, min: 1, max: 100, step: 1, color: 'var(--neon-secondary-end)' },
              { label: 'Mass', value: mass, set: setMass, min: 0.1, max: 3, step: 0.1, color: 'var(--neon-accent-end)' }
            ].map((slider) => (
              <div key={slider.label}>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">{slider.label}</label>
                  <span className="text-xs font-mono text-[var(--text-primary)]">{slider.value.toFixed(slider.step < 1 ? 1 : 0)}</span>
                </div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={slider.value}
                  onChange={(e) => handleSliderChange(slider.set, Number(e.target.value))}
                  className="w-full h-1.5 bg-[var(--glass-2-border)] rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: slider.color }}
                />
              </div>
            ))}
          </div>

          {/* Physics Stats */}
          <div className="mt-6 pt-4 border-t border-[var(--glass-1-border)] grid grid-cols-3 gap-2">
            {[
              { label: 'Freq', value: `${frequency.toFixed(1)}Hz` },
              { label: 'Settle', value: `${(settleTime * 1000).toFixed(0)}ms` },
              { label: 'Feel', value: character.label, color: character.color }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[10px] text-[var(--text-tertiary)] uppercase">{stat.label}</div>
                <div className={cn("text-xs font-mono font-medium", stat.color || "text-[var(--text-primary)]")}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </PortalCard>

        {/* Code Export */}
        <PortalCard className="p-3" glow="none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Config</span>
            </div>
            <button
              onClick={copyConfig}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium transition-all",
                copied
                  ? "bg-green-500/10 text-green-500"
                  : "bg-[var(--glass-2-fill)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </PortalCard>
      </div>

      {/* Right Side - Preview */}
      <div className="flex-1 flex flex-col gap-4 min-h-[500px]">
        {/* Mode Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-[var(--glass-1-fill)] border border-[var(--glass-1-border)] w-fit mx-auto md:mx-0">
          {[
            { mode: 'drag' as const, icon: Grip, label: 'Drag' },
            { mode: 'click' as const, icon: MousePointer, label: 'Click' },
            { mode: 'hover' as const, icon: ArrowRight, label: 'Hover' },
          ].map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setDemoMode(mode)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                demoMode === mode
                  ? "bg-[var(--glass-2-fill)] text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              <Icon className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <PortalCard className="flex-1 relative overflow-hidden" glow="cyber-lime" interactive={false} enableTilt={false}>
          <div 
            ref={constraintsRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Grid background */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle, var(--text-primary) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            
            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-px h-full bg-[var(--text-tertiary)]" />
              <div className="h-px w-full bg-[var(--text-tertiary)]" />
            </div>

            {/* Center Anchor Point */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-[var(--text-tertiary)]/30" />
              <div className="absolute w-8 h-8 rounded-full border border-[var(--text-tertiary)]/10" />
            </div>

            {/* Ghost Handle */}
            <motion.div
              drag={demoMode === 'drag'}
              dragConstraints={constraintsRef}
              dragElastic={0.2}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              onClick={demoMode === 'click' ? handleClickDemo : undefined}
              onHoverStart={demoMode === 'hover' ? handleHoverStart : undefined}
              onHoverEnd={demoMode === 'hover' ? handleHoverEnd : undefined}
              style={{ x, y }}
              className={cn(
                "absolute z-20 w-32 h-32 rounded-3xl touch-none",
                demoMode === 'drag' && "cursor-grab active:cursor-grabbing",
                demoMode === 'click' && "cursor-pointer",
                demoMode === 'hover' && "cursor-default"
              )}
            />

            {/* Visual Element */}
            <motion.div
              style={{ 
                x: springX, 
                y: springY, 
                scale: springScale,
                rotateX: combinedRotateX,
                rotateY: combinedRotateY,
                rotateZ: combinedRotateZ,
              }}
              className="relative z-10 select-none pointer-events-none perspective-1000"
            >
              <motion.div 
                className="w-32 h-32 rounded-3xl flex flex-col items-center justify-center gap-2 shadow-2xl border border-white/10 backdrop-blur-sm transition-colors duration-300"
                style={{
                  background: `linear-gradient(135deg, var(--neon-primary-start), var(--neon-primary-end))`,
                  boxShadow: `0 20px 40px -12px var(--neon-primary-end)`,
                }}
              >
                <PlayCircle className="w-10 h-10 text-white/90" />
                <span className="text-[10px] font-medium text-white/80 uppercase tracking-wider">
                  {demoMode === 'drag' && showReleaseText ? 'Release!' : demoMode}
                </span>
              </motion.div>
              
              {/* Connection line - always rendered but only visible in drag mode */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-0.5 bg-[var(--neon-primary-end)] origin-top pointer-events-none"
                style={{
                  height: lineHeight,
                  rotate: lineRotate,
                  opacity: demoMode === 'drag' ? lineOpacity : 0,
                }}
              />
            </motion.div>
          </div>
        </PortalCard>
      </div>
    </main>
  );
}
