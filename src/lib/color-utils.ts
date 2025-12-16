// Helper to parse hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

// Helper to convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Linear interpolation between two values
function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

// Interpolate between two hex colors
export function interpolateColor(color1: string, color2: string, factor: number): string {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  const r = lerp(r1, r2, factor);
  const g = lerp(g1, g2, factor);
  const b = lerp(b1, b2, factor);

  return rgbToHex(r, g, b);
}

// Get the color for a specific time based on a schedule
export interface ColorSchedule {
  [hour: number]: string; // 0-24
}

export function getColorForTime(schedule: ColorSchedule, time: number): string {
  // Find the start and end keyframes
  const hours = Object.keys(schedule).map(Number).sort((a, b) => a - b);
  
  // Handle wrapping (time 23.9 -> 0)
  // We assume the schedule covers 0-24 or we wrap around
  
  let startHour = hours[hours.length - 1];
  let endHour = hours[0];
  
  for (let i = 0; i < hours.length - 1; i++) {
    if (time >= hours[i] && time < hours[i + 1]) {
      startHour = hours[i];
      endHour = hours[i + 1];
      break;
    }
  }
  
  // If time is after the last keyframe, wrap to the first
  if (time >= hours[hours.length - 1]) {
    startHour = hours[hours.length - 1];
    endHour = hours[0] + 24; // Wrap around
  }

  const duration = endHour - startHour;
  const progress = (time - startHour) / duration;
  
  // Get colors (handle wrap for end color)
  const startColor = schedule[startHour];
  const endColor = schedule[endHour % 24] || schedule[0]; // Fallback to 0 if 24 not explicitly set but usually we map 24->0 logic
  
  return interpolateColor(startColor, endColor, progress);
}

// Helper to calculate contrast color (black or white)
export function getContrastColor(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}
