import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Background } from "@/components/ui/background";
import { cn } from "@/lib/utils";
import Script from "next/script";

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
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body 
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased h-full overflow-hidden"
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
              "h-[calc(100vh-64px)]",
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
