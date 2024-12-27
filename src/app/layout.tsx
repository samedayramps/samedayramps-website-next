import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Background } from "@/components/ui/background";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Same Day Ramps - Wheelchair Ramp Rentals",
  description: "Quick and reliable wheelchair ramp rentals for your accessibility needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-[100dvh] overflow-hidden"
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="samedayramps-theme"
        >
          <Background />
          <Header />
          <main 
            className={cn(
              "h-[calc(100dvh-64px)]",
              "w-full",
              "overflow-y-auto",
              "snap-y snap-mandatory",
              "scroll-smooth",
              "overscroll-none",
              "touch-pan-y",
              "-webkit-overflow-scrolling-touch"
            )}
          >
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
