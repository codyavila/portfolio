import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
  Theme,
} from "@material/material-color-utilities";

export interface MaterialThemeColors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
}

export const generateTheme = (sourceColor: string, isDark: boolean): MaterialThemeColors => {
  const argb = argbFromHex(sourceColor);
  const theme = themeFromSourceColor(argb);
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;

  return {
    primary: hexFromArgb(scheme.primary),
    onPrimary: hexFromArgb(scheme.onPrimary),
    primaryContainer: hexFromArgb(scheme.primaryContainer),
    onPrimaryContainer: hexFromArgb(scheme.onPrimaryContainer),
    secondary: hexFromArgb(scheme.secondary),
    onSecondary: hexFromArgb(scheme.onSecondary),
    secondaryContainer: hexFromArgb(scheme.secondaryContainer),
    onSecondaryContainer: hexFromArgb(scheme.onSecondaryContainer),
    tertiary: hexFromArgb(scheme.tertiary),
    onTertiary: hexFromArgb(scheme.onTertiary),
    tertiaryContainer: hexFromArgb(scheme.tertiaryContainer),
    onTertiaryContainer: hexFromArgb(scheme.onTertiaryContainer),
    error: hexFromArgb(scheme.error),
    onError: hexFromArgb(scheme.onError),
    errorContainer: hexFromArgb(scheme.errorContainer),
    onErrorContainer: hexFromArgb(scheme.onErrorContainer),
    background: hexFromArgb(scheme.background),
    onBackground: hexFromArgb(scheme.onBackground),
    surface: hexFromArgb(scheme.surface),
    onSurface: hexFromArgb(scheme.onSurface),
    surfaceVariant: hexFromArgb(scheme.surfaceVariant),
    onSurfaceVariant: hexFromArgb(scheme.onSurfaceVariant),
    outline: hexFromArgb(scheme.outline),
    outlineVariant: hexFromArgb(scheme.outlineVariant),
    shadow: hexFromArgb(scheme.shadow),
    scrim: hexFromArgb(scheme.scrim),
    inverseSurface: hexFromArgb(scheme.inverseSurface),
    inverseOnSurface: hexFromArgb(scheme.inverseOnSurface),
    inversePrimary: hexFromArgb(scheme.inversePrimary),
  };
};

export const applyThemeToDom = (theme: MaterialThemeColors) => {
  const root = document.documentElement;
  
  // Map Material tokens to CSS variables
  Object.entries(theme).forEach(([key, value]) => {
    // Convert camelCase to kebab-case for CSS variables
    const cssVarName = `--md-sys-color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });

  // Map to Project Luminous variables
  // We map the dynamic colors to the existing variables to preserve the layout
  // while injecting the new color scheme.
  
  // Primary Neon -> Primary
  root.style.setProperty("--neon-primary-start", theme.primary);
  root.style.setProperty("--neon-primary-end", theme.primaryContainer);
  
  // Secondary Neon -> Secondary
  root.style.setProperty("--neon-secondary-start", theme.secondary);
  root.style.setProperty("--neon-secondary-end", theme.secondaryContainer);
  
  // Backgrounds
  root.style.setProperty("--color-void", theme.background);
  root.style.setProperty("--color-deep-space", theme.surface);
  
  // Text
  root.style.setProperty("--text-primary", theme.onSurface);
  root.style.setProperty("--text-secondary", theme.onSurfaceVariant);
  root.style.setProperty("--text-disabled", theme.outline);

  // Glass System - Adjusting opacity based on surface color
  // We use the surface color but with transparency
  const surfaceRgb = hexToRgb(theme.surface);
  if (surfaceRgb) {
      root.style.setProperty("--glass-1-fill", `rgba(${surfaceRgb.r}, ${surfaceRgb.g}, ${surfaceRgb.b}, 0.03)`);
      root.style.setProperty("--glass-2-fill", `rgba(${surfaceRgb.r}, ${surfaceRgb.g}, ${surfaceRgb.b}, 0.06)`);
      root.style.setProperty("--glass-3-fill", `rgba(${surfaceRgb.r}, ${surfaceRgb.g}, ${surfaceRgb.b}, 0.09)`);
      root.style.setProperty("--glass-4-fill", `rgba(${surfaceRgb.r}, ${surfaceRgb.g}, ${surfaceRgb.b}, 0.12)`);
  }
};

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
