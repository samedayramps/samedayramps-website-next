import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Background } from "@/components/ui/background";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Same Day Ramps - Wheelchair Ramp Rentals",
  description: "Quick and reliable wheelchair ramp rentals for your accessibility needs",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body 
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          "min-h-[100dvh]",
          "overflow-hidden",
          "touch-manipulation",
          "bg-background",
          "font-sans"
        )}
        suppressHydrationWarning
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
      </body>
    </html>
  );
}
