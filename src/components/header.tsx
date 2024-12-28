"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // Handle scroll to contact form after navigation
  useEffect(() => {
    if (pathname === '/' && window.location.hash === '#contact') {
      const section = document.querySelectorAll('section')[3]
      section?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pathname])

  const handleGetQuote = () => {
    setIsOpen(false)
    // If we're on the homepage, scroll to the form section
    if (pathname === '/') {
      const section = document.querySelectorAll('section')[3]
      section?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    
    // If we're on another page, navigate to homepage with hash
    router.push('/#contact')
  }

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false)
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <div className="w-full px-4">
        <nav className="flex h-16 items-center justify-between max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link 
            href="/" 
            className={cn(
              "flex items-center transition-opacity hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus:ring-ring",
              "rounded-md"
            )}
          >
            <Image 
              src="/logo.svg" 
              alt="Same Day Ramps logo"
              width={48}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden landscape:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('features-section')}
              className="text-sm font-medium hover:text-primary-foreground/80 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick('faq-section')}
              className="text-sm font-medium hover:text-primary-foreground/80 transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden landscape:flex items-center">
            <Button 
              onClick={handleGetQuote}
              variant="default"
              className="font-semibold text-base px-4 h-10 whitespace-nowrap"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="landscape:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-6 space-y-6">
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleNavClick('features-section')}
                      className="block w-full text-left text-lg font-medium hover:text-primary"
                    >
                      Features
                    </button>
                    <button 
                      onClick={() => handleNavClick('faq-section')}
                      className="block w-full text-left text-lg font-medium hover:text-primary"
                    >
                      FAQ
                    </button>
                  </div>
                  <Button 
                    onClick={handleGetQuote}
                    className="w-full h-11 text-base font-medium"
                  >
                    Get a Quote
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
} 