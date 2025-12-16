import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Battery, Zap, Layers, Wind, Eye, Sparkles, MousePointer, Timer, Cpu, Gauge, Volume2, Music, Vibrate } from 'lucide-react';
import { KineticText } from '@/components/ui/kinetic-text';
import { JellyButton } from '@/components/ui/jelly-button';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = {
  title: 'Project Luminous: The Engineering Behind the Design',
  description: 'A technical deep dive into the physics, shaders, and lighting systems of my portfolio.',
};

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-24 relative">
      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 hidden md:block" />
      <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white flex items-center gap-3">
        {title}
      </h2>
      <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-950 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="text-xs font-mono text-zinc-400">{title}</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
      </div>
      <div className="p-6 overflow-x-auto">
        <pre className="text-sm font-mono text-zinc-300 leading-relaxed">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}

function DemoBox({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="my-8 p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden group">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-4">
        {children}
      </div>
      {label && (
        <div className="absolute bottom-3 right-4 text-xs font-mono text-zinc-400 opacity-50">
          {label}
        </div>
      )}
    </div>
  );
}

function Callout({ type = 'info', children }: { type?: 'info' | 'warning' | 'insight'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    insight: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400',
  };
  const icons = {
    info: <Eye className="w-5 h-5 shrink-0" />,
    warning: <Battery className="w-5 h-5 shrink-0" />,
    insight: <Sparkles className="w-5 h-5 shrink-0" />,
  };
  return (
    <div className={`my-6 p-4 rounded-xl border ${styles[type]} flex gap-3`}>
      {icons[type]}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050508]">
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <header className="mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-500/20">
            <Zap className="w-3 h-3" />
            <span>Engineering Deep Dive</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-zinc-900 dark:text-white tracking-tight leading-tight">
            <KineticText>Project Luminous</KineticText>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The web has become flat. We&apos;ve optimized the soul out of our interfaces in the name of &quot;clean design.&quot; 
            I wanted to build something that felt <span className="text-indigo-500 font-semibold">alive</span>.
          </p>
        </header>

        <Section title="The Problem: Inertia vs. Reality">
          <p>
            In the real world, nothing starts or stops instantly. Objects have mass. They resist movement, and they carry momentum. 
            Yet, most web animations use linear or simple cubic-bezier curves. They feel robotic.
          </p>
          <p>
            For this portfolio, I established a core rule: <strong className="text-zinc-900 dark:text-white">No Linear Easing.</strong> Every interaction must be governed by spring physics.
          </p>
          
          <Callout type="insight">
            <strong>Why springs over bezier curves?</strong> A bezier curve has a fixed duration—it will always take X milliseconds. 
            A spring has no duration. It simulates real physics: mass, tension, and friction. If you interrupt a spring mid-animation, 
            it naturally incorporates the new velocity. Bezier curves can&apos;t do this elegantly.
          </Callout>
          
          <p>
            Framer Motion exposes three key parameters for spring physics. Understanding them is crucial:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <div className="text-2xl font-bold text-indigo-500 mb-2">stiffness</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">How &quot;tight&quot; the spring is. Higher = faster movement to target. I use 400-500 for UI elements.</p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <div className="text-2xl font-bold text-cyan-500 mb-2">damping</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">How much the spring resists motion. Low = bouncy oscillation. High = quick settle. I use 15-30.</p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <div className="text-2xl font-bold text-emerald-500 mb-2">mass</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">How &quot;heavy&quot; the element feels. Higher mass = more momentum, slower to start/stop. Usually 1-2.</p>
            </div>
          </div>

          <CodeBlock 
            title="src/components/ui/jelly-button.tsx — Spring Config"
            code={`// The magnetic follow effect uses high stiffness for responsiveness
const springX = useSpring(mx, { stiffness: 500, damping: 30, mass: 1 });
const springY = useSpring(my, { stiffness: 500, damping: 30, mass: 1 });

// The gradient rotation is slower, more luxurious
const springRotation = useSpring(gradientRotation, { 
  stiffness: 100, // Much lower — feels like molasses
  damping: 20 
});`}
          />

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">The Squish: Volume Preservation</h3>
          <p>
            When you press a real button, it doesn&apos;t just get smaller—it <em>deforms</em>. The material compresses vertically 
            and bulges horizontally. This is called <strong className="text-zinc-900 dark:text-white">volume preservation</strong>, and it&apos;s the secret to making digital interactions feel physical.
          </p>

          <CodeBlock 
            title="src/components/ui/jelly-button.tsx — The Squish Effect"
            code={`<motion.button
  whileHover={{ 
    scale: 1.05,  // Gentle lift on hover
    rotate: 1,    // Subtle rotation adds playfulness
  }}
  whileTap={{ 
    // The magic: scale down overall, but stretch X and compress Y
    scale: 0.9,   // 90% of original size
    scaleX: 1.1,  // But 110% width (bulges out)
    scaleY: 0.85, // And 85% height (squishes down)
    rotate: -0.5, // Counter-rotate for bounce feel
  }}
  transition={{ 
    type: "spring", 
    stiffness: 400, 
    damping: 10  // Low damping = more bounce
  }}
>
  {children}
</motion.button>`}
          />

          <DemoBox label="Interactive Demo: Spring Physics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <GlassCard className="p-6 text-center cursor-pointer active:scale-95 transition-transform" glow="none">
                <div className="font-bold text-zinc-900 dark:text-white">Click Me</div>
                <div className="text-xs text-zinc-500 mt-2">CSS transition (linear)</div>
              </GlassCard>
              <JellyButton variant="primary" className="w-full justify-center">
                Squish Me
              </JellyButton>
              <GlassCard className="p-6 text-center" glow="none" enableTilt={true}>
                <div className="font-bold text-zinc-900 dark:text-white">Hover Me</div>
                <div className="text-xs text-zinc-500 mt-2">3D Tilt (spring)</div>
              </GlassCard>
            </div>
          </DemoBox>
        </Section>

        <Section title="Lighting: Bioluminescent Materials">
          <p>
            Dark mode often just means &quot;grey background.&quot; I wanted my interface to feel like it was made of 
            bioluminescent glass—objects that emit their own light rather than just reflecting it.
          </p>
          
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">The Z-Axis Problem</h3>
          <p>
            Traditional elevation systems (Material Design, etc.) use drop shadows to indicate depth. The problem? 
            Drop shadows imply an external light source shining <em>down</em> on the interface. In a dark UI, this makes no sense—where&apos;s the light coming from?
          </p>
          <p>
            Instead, I define depth through <strong className="text-zinc-900 dark:text-white">blur radius</strong>. The higher an element sits in the Z-axis, 
            the more it blurs the background beneath it. Objects closer to you are more &quot;in focus.&quot;
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            <div className="relative h-32 rounded-xl border border-white/10 flex flex-col items-center justify-center overflow-hidden bg-[#050508]">
              <span className="relative z-10 text-white font-bold text-sm">The Void</span>
              <div className="text-xs text-zinc-500 mt-1">Z: 0 | Blur: 0</div>
            </div>
            <div className="relative h-32 rounded-xl border border-white/10 flex flex-col items-center justify-center overflow-hidden bg-[#050508]">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[8px]" />
              <span className="relative z-10 text-white font-bold text-sm">Mist</span>
              <div className="relative z-10 text-xs text-zinc-500 mt-1">Z: 10 | Blur: 12px</div>
            </div>
            <div className="relative h-32 rounded-xl border border-white/10 flex flex-col items-center justify-center overflow-hidden bg-[#050508]">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[16px]" />
              <span className="relative z-10 text-white font-bold text-sm">Prism</span>
              <div className="relative z-10 text-xs text-zinc-500 mt-1">Z: 20 | Blur: 24px</div>
            </div>
            <div className="relative h-32 rounded-xl border border-white/10 flex flex-col items-center justify-center overflow-hidden bg-[#050508]">
              <div className="absolute inset-0 bg-white/15 backdrop-blur-[24px]" />
              <span className="relative z-10 text-white font-bold text-sm">Lume</span>
              <div className="relative z-10 text-xs text-zinc-500 mt-1">Z: 30 | Blur: 48px</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">Mouse-Tracking Spotlight</h3>
          <p>
            To make glass cards feel alive, I added a radial gradient spotlight that follows the cursor. 
            The trick is using <code className="text-indigo-400">useMotionValue</code> for raw tracking and <code className="text-indigo-400">useSpring</code> for smooth interpolation.
          </p>

          <CodeBlock 
            title="src/components/ui/glass-card.tsx — Spotlight System"
            code={`// Raw mouse position (updates every frame)
const glowX = useMotionValue(50);
const glowY = useMotionValue(50);

// Smoothed with spring physics (prevents jitter)
const springGlowX = useSpring(glowX, { stiffness: 500, damping: 30, mass: 1 });
const springGlowY = useSpring(glowY, { stiffness: 500, damping: 30, mass: 1 });

// Transform into a CSS radial-gradient string
const spotlightStyle = useTransform(
  [springGlowX, springGlowY],
  ([x, y]) => \`radial-gradient(
    350px circle at \${x}% \${y}%, 
    rgba(0, 255, 153, 0.25),  // Aurora green glow
    transparent 50%
  )\`
);

// On mouse move, update the raw values
const handleMouseMove = (event: React.MouseEvent) => {
  const rect = ref.current.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  glowX.set((x / rect.width) * 100);
  glowY.set((y / rect.height) * 100);
};`}
          />

          <Callout type="info">
            <strong>Why 350px circle?</strong> After testing, I found that a spotlight radius of ~350px feels &quot;arm&apos;s length&quot; on most screens. 
            Too small and it looks like a laser pointer. Too large and you lose the tracking effect.
          </Callout>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">The 3D Tilt Effect</h3>
          <p>
            The tilt effect uses the same mouse position, but maps it to CSS <code className="text-indigo-400">rotateX</code> and <code className="text-indigo-400">rotateY</code>. 
            The key insight: limit rotation to ±5 degrees. Any more and it feels like the card is fighting you.
          </p>

          <CodeBlock 
            title="src/components/ui/glass-card.tsx — 3D Tilt"
            code={`const handleMouseMove = (event: React.MouseEvent) => {
  const rect = ref.current.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Map mouse position to rotation
  // Center of card = 0 rotation
  // Edges = ±5 degrees (max tilt)
  const rotateY = ((x / rect.width) - 0.5) * 10;  // -5 to +5
  const rotateX = -((y / rect.height) - 0.5) * 10; // Inverted for natural feel
  
  tiltX.set(rotateX);
  tiltY.set(rotateY);
};

// Apply with spring physics
<motion.div
  style={{ 
    rotateX: springTiltX, 
    rotateY: springTiltY,
    transformStyle: "preserve-3d",
    perspective: "1000px",
  }}
/>`}
          />

          <DemoBox label="Interactive Demo: Glass Material">
            <GlassCard glow="aurora" className="p-8 max-w-sm w-full" enableTilt={true} enableSpotlight={true}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">Aurora Glass</h3>
                  <p className="text-xs text-zinc-500">Move your cursor around</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Notice how the spotlight follows your mouse and the card tilts in 3D. 
                Both effects use spring physics with identical configs for consistency.
              </p>
            </GlassCard>
          </DemoBox>
        </Section>

        <Section title="Kinetic Typography">
          <p>
            Why should text be static? I&apos;ve always loved the effect in racing games where speed lines 
            appear and the camera tilts forward as you accelerate. I wanted to bring that feeling to scroll.
          </p>
          
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">Hooking Into Scroll Velocity</h3>
          <p>
            The core insight: Framer Motion exposes <code className="text-indigo-400">useVelocity()</code>, which gives you the 
            rate of change of any motion value. Combined with <code className="text-indigo-400">useScroll()</code>, you get real-time 
            scroll speed—positive when scrolling down, negative when scrolling up.
          </p>

          <CodeBlock 
            title="src/hooks/useScrollVelocity.ts"
            code={`import { useScroll, useVelocity, useSpring } from "framer-motion";

export function useScrollVelocity() {
  const { scrollY } = useScroll();
  
  // Get raw velocity (can be -2000 to +2000 pixels/second)
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth it out to prevent jitter
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,   // High damping = less bounce
    stiffness: 400 // High stiffness = quick response
  });

  return smoothVelocity;
}`}
          />

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">Mapping Velocity to Skew</h3>
          <p>
            The <code className="text-indigo-400">useTransform()</code> hook maps one range to another. I take scroll velocity 
            (roughly -2000 to +2000) and map it to a skew angle (-10° to +10°). The text &quot;leans into&quot; the direction of scroll.
          </p>

          <CodeBlock 
            title="src/components/ui/kinetic-text.tsx"
            code={`interface KineticTextProps {
  children: React.ReactNode;
  velocityFactor?: number; // Multiplier for effect intensity
}

export function KineticText({ 
  children, 
  velocityFactor = 0.5 
}: KineticTextProps) {
  const velocity = useScrollVelocity();
  
  // Map velocity to skew angle
  // velocityFactor lets you dial the effect up or down
  const skewX = useTransform(
    velocity, 
    [-2000, 2000],  // Input range: scroll speed
    [-10 * velocityFactor, 10 * velocityFactor] // Output: skew degrees
  );

  return (
    <motion.span 
      className="will-change-transform origin-bottom"
      style={{ skewX }}
    >
      {children}
    </motion.span>
  );
}`}
          />

          <Callout type="insight">
            <strong>The origin-bottom trick:</strong> By setting <code>transform-origin: bottom</code>, the text pivots from its baseline. 
            This makes it look like the text is &quot;planted&quot; and leaning, rather than rotating around its center (which looks wrong).
          </Callout>

          <DemoBox label="Interactive Demo: Scroll Velocity">
            <div className="text-center py-8">
              <div className="text-sm text-zinc-500 mb-6 font-mono flex items-center justify-center gap-2">
                <MousePointer className="w-4 h-4" />
                SCROLL THE PAGE FAST TO SEE THE EFFECT
              </div>
              <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
                <KineticText velocityFactor={1.5}>MOMENTUM</KineticText>
              </div>
              <div className="mt-6 text-sm text-zinc-500">
                velocityFactor: 1.5 (exaggerated for demo)
              </div>
            </div>
          </DemoBox>
        </Section>

        <Section title="The Magnetic Button Effect">
          <p>
            One of my favorite micro-interactions: buttons that subtly follow your cursor before you click them. 
            It creates a sense of magnetism—like the button <em>wants</em> to be pressed.
          </p>

          <CodeBlock 
            title="src/components/ui/jelly-button.tsx — Magnetic Effect"
            code={`// Track raw mouse offset from button center
const mx = useMotionValue(0);
const my = useMotionValue(0);

// Smooth with springs
const springX = useSpring(mx, { stiffness: 500, damping: 30, mass: 1 });
const springY = useSpring(my, { stiffness: 500, damping: 30, mass: 1 });

const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Calculate offset from center, scaled down
  // The button moves max 8px in any direction
  const moveX = ((x / rect.width) - 0.5) * 16;
  const moveY = ((y / rect.height) - 0.5) * 16;
  
  mx.set(moveX);
  my.set(moveY);
};

// Apply to button position
<motion.button style={{ x: springX, y: springY }}>
  {children}
</motion.button>`}
          />

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">Gradient Rotation on Hover</h3>
          <p>
            The button&apos;s gradient also rotates to follow your cursor. This creates an almost holographic effect—the colors 
            shift based on your viewing angle, like a trading card under light.
          </p>

          <CodeBlock 
            title="Gradient follows cursor angle"
            code={`// Calculate angle from button center to cursor
const handleMouseMove = (event: React.MouseEvent) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // atan2 gives us the angle in radians, convert to degrees
  const angle = Math.atan2(
    y - rect.height / 2, 
    x - rect.width / 2
  ) * (180 / Math.PI);
  
  gradientRotation.set(angle + 90); // +90 to align with cursor
};

// Transform rotation into gradient string
const animatedGradient = useTransform(
  springRotation,
  (r) => \`linear-gradient(\${r}deg, #4F46E5, #06B6D4)\`
);`}
          />

          <DemoBox label="Interactive Demo: Magnetic Buttons">
            <div className="flex flex-wrap gap-4 justify-center">
              <JellyButton variant="primary">Primary</JellyButton>
              <JellyButton variant="secondary">Secondary</JellyButton>
              <JellyButton variant="cyber-lime">Accent</JellyButton>
            </div>
          </DemoBox>
        </Section>

        <Section title="The Sensory Layer: Sound Design">
          <p>
            Most portfolios are silent. I wanted mine to have a <em>voice</em>. Not in an annoying, auto-playing-music way—but 
            in a subtle, reactive way that reinforces the physical metaphor. If buttons squish like jelly, they should <em>sound</em> like glass.
          </p>
          
          <Callout type="warning">
            <strong>The cardinal rule of web audio:</strong> Never auto-play. Sound is opt-in. I initialize the AudioContext only 
            after the user&apos;s first interaction (click, keypress, or mouse move). This respects browser policies and user preference.
          </Callout>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">The Musical Key: C Major 7th</h3>
          <p>
            I chose <strong className="text-zinc-900 dark:text-white">C Major 7th</strong> as the harmonic foundation. It&apos;s dreamy and hopeful without being saccharine. 
            The notes are: C4 (261.63 Hz), E4 (329.63 Hz), G4 (392.00 Hz), B4 (493.88 Hz), and C5 (523.25 Hz).
          </p>
          <p>
            When you hover over an interactive element, the system plays a random note from this chord. Because they&apos;re all 
            harmonically related, any combination sounds pleasant—you can&apos;t &quot;break&quot; the soundscape.
          </p>

          <CodeBlock 
            title="src/hooks/useSoundSystem.ts — The Note Array"
            code={`// C Major 7th chord frequencies (Hz)
// These are mathematically related, so any combination sounds good
const NOTES = [
  261.63, // C4 - Root
  329.63, // E4 - Major 3rd (bright, happy)
  392.00, // G4 - Perfect 5th (stable)
  493.88, // B4 - Major 7th (dreamy, jazzy)
  523.25, // C5 - Octave (resolution)
];`}
          />

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">Synthesizing Sound in the Browser</h3>
          <p>
            I use the Web Audio API directly—no external libraries or audio files. This keeps the bundle tiny and gives me 
            complete control over the sound envelope. Each sound is a pure sine wave with carefully tuned attack and decay.
          </p>

          <CodeBlock 
            title="src/hooks/useSoundSystem.ts — Hover Sound"
            code={`const playHover = useCallback(() => {
  const ctx = audioContextRef.current;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Random note from C Major 7th
  const note = NOTES[Math.floor(Math.random() * NOTES.length)];
  
  osc.type = "sine"; // Pure, clean tone
  osc.frequency.setValueAtTime(note, ctx.currentTime);
  
  // ADSR Envelope (simplified: just Attack + Decay)
  // Attack: 0 → 0.1 volume in 50ms (fast rise)
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
  
  // Decay: 0.1 → 0.001 over 250ms (exponential fade)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(gainNodeRef.current); // Master volume control
  
  osc.start();
  osc.stop(ctx.currentTime + 0.3); // Cleanup after decay
}, []);`}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-3 text-indigo-500">
                <Music className="w-5 h-5" />
                <span className="font-bold">Hover Sound</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Random note from chord. Sine wave, 50ms attack, 250ms decay. Volume: 10%.</p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-3 text-cyan-500">
                <Volume2 className="w-5 h-5" />
                <span className="font-bold">Click Sound</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">&quot;Glass tap&quot; effect. High frequency (2kHz→500Hz sweep), 100ms total. Crisp and percussive.</p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-3 text-emerald-500">
                <Vibrate className="w-5 h-5" />
                <span className="font-bold">Thud Sound</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Sub-bass rumble (60Hz→30Hz). Used for drag-drop or heavy interactions. 400ms decay.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">The &quot;Glass Tap&quot; Click Sound</h3>
          <p>
            The click sound is designed to feel like tapping on glass—high frequency, sharp attack, fast decay. 
            I use a frequency sweep from 2000Hz down to 500Hz to give it a &quot;ping&quot; quality.
          </p>

          <CodeBlock 
            title="src/hooks/useSoundSystem.ts — Click Sound"
            code={`const playClick = useCallback(() => {
  const ctx = audioContextRef.current;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Glass Tap: High frequency sweep
  osc.type = "sine";
  osc.frequency.setValueAtTime(2000, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.1);
  
  // Ultra-fast attack (10ms), quick decay
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  osc.connect(gain);
  gain.connect(gainNodeRef.current);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}, []);`}
          />

          <Callout type="insight">
            <strong>Why exponentialRampToValueAtTime?</strong> Human hearing perceives volume logarithmically. An exponential 
            decay sounds &quot;natural&quot; (like a real instrument), while a linear decay sounds robotic and artificial.
          </Callout>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">Initialization: The Autoplay Problem</h3>
          <p>
            Browsers block AudioContext creation until user interaction. My solution: I attach listeners for 
            click, keydown, and mousemove (with <code className="text-indigo-400">{`{ once: true }`}</code>) that lazily initialize the audio system.
          </p>

          <CodeBlock 
            title="Lazy AudioContext Initialization"
            code={`useEffect(() => {
  const initAudio = () => {
    if (!audioContextRef.current) {
      // Create the audio context
      const AudioContextClass = window.AudioContext || 
        (window as any).webkitAudioContext; // Safari fallback
      
      audioContextRef.current = new AudioContextClass();
      
      // Master volume node (keeps everything subtle)
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = 0.05; // 5% max volume
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
    
    // Resume if suspended (browser policy)
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  };

  // Initialize on first interaction (any of these)
  window.addEventListener("click", initAudio, { once: true });
  window.addEventListener("keydown", initAudio, { once: true });
  window.addEventListener("mousemove", initAudio, { once: true });
}, []);`}
          />

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">Haptic Feedback (Mobile)</h3>
          <p>
            For touch devices, sound alone isn&apos;t enough. I layer in haptic feedback using the Vibration API. 
            The patterns are designed to feel like physical button clicks.
          </p>

          <CodeBlock 
            title="Haptic patterns (milliseconds)"
            code={`// Hover: Micro-tick (barely perceptible)
navigator.vibrate(5);

// Toggle switch: Double-tick pattern
navigator.vibrate([10, 30, 10]); // vibrate, pause, vibrate

// Error state: Heavy buzz (alarming)
navigator.vibrate([50, 20, 50]);

// Success: Ascending pattern (celebratory)
navigator.vibrate([10, 20, 15, 20, 20]);`}
          />

          <DemoBox label="Interactive Demo: Sound System">
            <div className="text-center space-y-4">
              <p className="text-sm text-zinc-500 mb-4">Click or hover the buttons to hear the sound system</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <JellyButton variant="primary">Play Hover</JellyButton>
                <JellyButton variant="secondary">Glass Tap</JellyButton>
              </div>
              <p className="text-xs text-zinc-400 mt-4">
                Note: Sound initializes on first interaction. Volume is set to 5% by default.
              </p>
            </div>
          </DemoBox>
        </Section>

        <Section title="Performance: The Cost of Beauty">
          <p>
            All these springs, blurs, and mouse listeners come at a cost. A single glass card runs: 
            backdrop-filter (GPU), mouse tracking (JS), spring physics (JS), and potentially 3D transforms (GPU). 
            Multiply by 20 cards and you have a problem.
          </p>
          
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">The Performance Budget</h3>
          <p>
            I established a simple rule: <strong className="text-zinc-900 dark:text-white">60fps or degrade</strong>. If we can&apos;t maintain 60fps, 
            we progressively disable features until we can. Here&apos;s the degradation ladder:
          </p>

          <div className="my-8 space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Gauge className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400">Level 0: Full Experience</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">All effects enabled. Shaders, springs, spotlights, everything.</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Timer className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <div className="font-bold text-amber-600 dark:text-amber-400">Level 1: Reduce Blur</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">backdrop-filter reduced from 24px to 8px. Still looks glassy, much cheaper.</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <div className="font-bold text-orange-600 dark:text-orange-400">Level 2: Disable Spotlights</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Mouse tracking disabled. Removes per-frame JS calculations.</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <Battery className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <div className="font-bold text-red-600 dark:text-red-400">Level 3: Static Mode</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">All springs become instant. Kinetic text disabled. Pure CSS.</div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">Respecting User Preferences</h3>
          <p>
            Beyond performance, we respect <code className="text-indigo-400">prefers-reduced-motion</code>. 
            If a user has this enabled (often for vestibular disorders), we disable all motion—not just reduce it.
          </p>

          <CodeBlock 
            title="Detecting reduced motion preference"
            code={`// In a custom hook
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Usage in components
const shouldAnimate = !prefersReducedMotion();

<motion.div
  animate={shouldAnimate ? { scale: 1.05 } : {}}
  transition={shouldAnimate ? { type: "spring" } : { duration: 0 }}
/>`}
          />

          <Callout type="warning">
            <strong>Touch device gotcha:</strong> On mobile, hover states can get &quot;stuck&quot; after a tap. I detect touch devices 
            with <code>window.matchMedia(&quot;(hover: none)&quot;)</code> and disable hover-dependent effects entirely.
          </Callout>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-3 mb-3 text-amber-500">
                <Battery className="w-5 h-5" />
                <h3 className="font-bold">Battery Saver Mode</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Using the Battery Status API, we detect low battery and automatically drop to Level 2 degradation. 
                Your laptop shouldn&apos;t die because of my portfolio.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-3 mb-3 text-emerald-500">
                <Wind className="w-5 h-5" />
                <h3 className="font-bold">Accessibility First</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                High contrast mode replaces all gradients with solid colors and adds visible focus rings. 
                The site is fully navigable via keyboard.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Lessons Learned">
          <p>
            Building this system taught me a lot about the intersection of design and engineering. Here are the key takeaways:
          </p>

          <div className="space-y-6 mt-8">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-indigo-500 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Springs are worth the complexity</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Yes, spring physics requires more code than <code>transition: 0.3s ease</code>. But the result is 
                  incomparably better. Once you train your eye to see spring motion, CSS easing looks robotic.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-indigo-500 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Blur is expensive—use it strategically</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  <code>backdrop-filter: blur()</code> looks incredible but tanks performance on complex layouts. 
                  I reserve high blur values (24px+) for single focal elements like modals, not grid cards.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-indigo-500 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Design systems need escape hatches</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  I built rigid rules (no linear easing, Z-axis via blur), but every component has an &quot;override&quot; prop. 
                  Dogma is useful until it isn&apos;t. Sometimes you need <code>transition: 0.1s linear</code> for a loading spinner.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-indigo-500 font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Test on real devices, not just DevTools</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Chrome DevTools throttling is optimistic. A &quot;mid-tier mobile&quot; simulation runs better than my 
                  actual 3-year-old Android. Always test on real hardware before shipping.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <hr className="border-zinc-200 dark:border-white/10 my-16" />

        <Section title="Deep Dive Articles">
          <p>
            Want to go even deeper? Each system has its own dedicated tutorial with more interactive examples:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Link href="/blog/framer-motion-spring-physics" className="block">
              <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform duration-150" glow="aurora">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Mastering Spring Physics</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Why spring animations feel better than duration-based ones, with interactive tuning tools.</p>
              </GlassCard>
            </Link>
            <Link href="/blog/glassmorphism-done-right" className="block">
              <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform duration-150" glow="aurora">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Glassmorphism Done Right</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">How to create beautiful glass effects without destroying performance or accessibility.</p>
              </GlassCard>
            </Link>
            <Link href="/blog/web-audio-api-sound-design" className="block">
              <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform duration-150" glow="aurora">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Sound Design for the Web</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Creating satisfying UI sounds that feel modern and refined—not annoying 8-bit bleeps.</p>
              </GlassCard>
            </Link>
            <Link href="/blog/webgl-shaders-beginners" className="block">
              <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform duration-150" glow="aurora">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">WebGL Shaders for Beginners</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Understanding fragment shaders, noise functions, and how to create animated backgrounds.</p>
              </GlassCard>
            </Link>
            <Link href="/blog/accessible-creative-design" className="block">
              <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform duration-150" glow="aurora">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Accessible Creative Design</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">How to build stunning, experimental interfaces without leaving anyone behind.</p>
              </GlassCard>
            </Link>
            <Link href="/blog/building-portfolio" className="block">
              <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform duration-150" glow="aurora">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Behind the Build</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">The messy, iterative, coffee-fueled story of how this portfolio came together.</p>
              </GlassCard>
            </Link>
          </div>
        </Section>

        <hr className="border-zinc-200 dark:border-white/10 my-16" />

        <footer className="text-center pb-12">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Project Luminous is open source</span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
            This design system is a living document. As I learn new techniques, I&apos;ll update the components and write about them here. 
            If you found this useful, feel free to steal—I mean, get inspired by—any of these patterns.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/blog">
              <JellyButton variant="primary">
                Read More Articles
              </JellyButton>
            </Link>
            <Link href="/">
              <JellyButton variant="secondary">
                See It In Action
              </JellyButton>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
