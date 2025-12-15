import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { DynamicThemeProvider } from "@/components/dynamic-theme-provider";
import { MouseTracker } from "@/components/MouseTracker";
import ShaderBackground from "@/components/background/ShaderBackground";
import { DynamicVignette } from "@/components/ui/dynamic-vignette";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cody Avila | Technical Product Manager",
  description: "Bridging the gap between engineering and product strategy.",
};

// Viewport configuration for iOS Safari - extends content to cover safe areas
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover', // This is critical for iOS to allow content behind the notch/status bar
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <DynamicThemeProvider>
            <div className="lum-background" />
            <ShaderBackground />
            <div className="noise-overlay" />
            <DynamicVignette />
            <MouseTracker />
            <Header />
            {children}
            <Footer />
          </DynamicThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
