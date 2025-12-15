import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
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
  
  // NOTE: We intentionally do NOT override the void/background colors here.
  // The Project Luminous void colors (#08040C, #120E1A) are carefully crafted
  // purple-tinted darks that should not be replaced by Material's generated colors.
  
  // Text - only override in light mode, dark mode uses Luminous defaults
  // root.style.setProperty("--text-primary", theme.onSurface);
  // root.style.setProperty("--text-secondary", theme.onSurfaceVariant);
  // root.style.setProperty("--text-disabled", theme.outline);

  // Glass System - Use white-based transparency for Luminous glass materials
  // We keep the Luminous glass system intact rather than using surface colors
};
