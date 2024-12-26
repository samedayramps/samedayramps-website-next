"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()

  // Handle scroll to contact form after navigation
  useEffect(() => {
    if (pathname === '/' && window.location.hash === '#contact') {
      const section = document.querySelectorAll('section')[3]
      section?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pathname])

  const handleGetQuote = () => {
    // If we're on the homepage, scroll to the form section
    if (pathname === '/') {
      const section = document.querySelectorAll('section')[3]
      section?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    
    // If we're on another page, navigate to homepage with hash
    router.push('/#contact')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link 
          href="/" 
          className={cn(
            "flex items-center gap-3 transition-opacity hover:opacity-90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "rounded-md"
          )}
        >
          <Image 
            src="/logo.svg" 
            alt="Same Day Ramps logo"
            width={40}
            height={40}
            className="h-8 w-auto"
            priority
          />
          <span className="font-semibold hidden sm:inline-block">
            Same Day Ramps
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Button 
            onClick={handleGetQuote}
            variant="default"
            size="sm" 
            className="sm:size-default font-semibold"
          >
            Get a Quote
          </Button>
        </div>
      </div>
    </header>
  )
} 