import { MDXRemote } from 'next-mdx-remote/rsc';
import { JellyButton } from '@/components/ui/jelly-button';
import { GlassCard } from '@/components/ui/glass-card';
import { KineticText } from '@/components/ui/kinetic-text';
import { ComponentPreview, ComponentShowcase, TryMeButton } from '@/components/ui/component-preview';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/mdx-table';
import { SpringCompare, SpringSlider, DurationVsSpring, GlassDensityCompare, HoverScaleCompare } from '@/components/ui/spring-demos';
import { SoundCompare, SoundPalette, WaveformVisualizer } from '@/components/ui/sound-demos';
import { ShaderGradient, NoiseDemo, ColorMixDemo, FBMDemo } from '@/components/ui/shader-demos';
import { ContrastChecker, MotionPreference, FocusDemo, ColorBlindnessDemo, ThemeSwitchDemo } from '@/components/ui/accessibility-demos';
import { Callout, Grid, GridItem, Steps, Step, CaptionedImage } from '@/components/ui/mdx-layout';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

const components = {
  // Interactive components
  JellyButton,
  GlassCard,
  KineticText,
  
  // Preview wrappers for "try me" demos
  ComponentPreview,
  ComponentShowcase,
  TryMeButton,
  
  // Spring/animation demos
  SpringCompare,
  SpringSlider,
  DurationVsSpring,
  GlassDensityCompare,
  HoverScaleCompare,
  
  // Sound demos
  SoundCompare,
  SoundPalette,
  WaveformVisualizer,
  
  // Shader demos
  ShaderGradient,
  NoiseDemo,
  ColorMixDemo,
  FBMDemo,
  
  // Accessibility demos
  ContrastChecker,
  MotionPreference,
  FocusDemo,
  ColorBlindnessDemo,
  ThemeSwitchDemo,
  
  // Layout components
  Callout,
  Grid,
  GridItem,
  Steps,
  Step,
  CaptionedImage,
  
  // Custom table components (override default markdown tables)
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};

export function CustomMDX({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [
              rehypePrettyCode,
              {
                theme: 'github-dark',
                keepBackground: true,
              },
            ],
          ],
        },
      }}
    />
  );
}
