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
    <header 
      className={cn(
        // Base styles
        "sticky top-0 z-50 w-full",
        "border-b border-primary/10",
        "bg-primary/95 text-primary-foreground",
        // Backdrop blur with fallback
        "backdrop-blur-md",
        "supports-[backdrop-filter]:bg-primary/80"
      )}
    >
      <div className="container px-4 mx-auto">
        <nav 
          className={cn(
            "flex items-center justify-between",
            "h-16 md:h-20",
            "gap-4"
          )}
        >
          {/* Logo */}
          <Link 
            href="/" 
            className={cn(
              "flex items-center shrink-0",
              "transition-opacity duration-200",
              "hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-ring focus-visible:ring-offset-2",
              "rounded-md"
            )}
          >
            <Image 
              src="/logo.svg" 
              alt="Same Day Ramps logo"
              width={48}
              height={48}
              className={cn(
                "h-8 w-auto sm:h-10",
                "transition-transform duration-200",
                "hover:scale-105"
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div 
            className={cn(
              "hidden md:flex items-center",
              "gap-1 lg:gap-2"
            )}
          >
            <button 
              onClick={() => handleNavClick('features-section')}
              className={cn(
                "px-3 py-2 rounded-md",
                "text-sm font-medium",
                "transition-colors duration-200",
                "hover:bg-primary-foreground/10",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick('faq-section')}
              className={cn(
                "px-3 py-2 rounded-md",
                "text-sm font-medium",
                "transition-colors duration-200",
                "hover:bg-primary-foreground/10",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              FAQ
            </button>
            <Link 
              href="/resources"
              className={cn(
                "px-3 py-2 rounded-md",
                "text-sm font-medium",
                "transition-colors duration-200",
                "hover:bg-primary-foreground/10",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              Resources
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center">
            <Button 
              onClick={handleGetQuote}
              variant="secondary"
              className={cn(
                "font-semibold text-base",
                "px-4 h-10 md:h-11",
                "whitespace-nowrap",
                "bg-accent hover:bg-accent/90",
                "text-accent-foreground",
                "shadow-sm",
                "transition-all duration-200",
                "hover:shadow-md hover:scale-105",
                "active:scale-100"
              )}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "!h-14 !w-14",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring focus-visible:ring-offset-2",
                    "active:scale-90",
                    "transition-all duration-200",
                    "[&_svg]:!h-8 [&_svg]:!w-8"
                  )}
                >
                  <Menu strokeWidth={2} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className={cn(
                  "w-full sm:max-w-sm",
                  "p-0",
                  "border-l border-primary/10"
                )}
              >
                <SheetHeader className="p-6 border-b border-primary/10">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-6 space-y-6">
                  <div className="space-y-1.5">
                    <button 
                      onClick={() => handleNavClick('features-section')}
                      className={cn(
                        "flex w-full items-center",
                        "px-4 py-3 rounded-md",
                        "text-lg font-medium",
                        "transition-colors duration-200",
                        "hover:bg-primary/10",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-ring"
                      )}
                    >
                      Features
                    </button>
                    <button 
                      onClick={() => handleNavClick('faq-section')}
                      className={cn(
                        "flex w-full items-center",
                        "px-4 py-3 rounded-md",
                        "text-lg font-medium",
                        "transition-colors duration-200",
                        "hover:bg-primary/10",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-ring"
                      )}
                    >
                      FAQ
                    </button>
                    <Link 
                      href="/resources"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex w-full items-center",
                        "px-4 py-3 rounded-md",
                        "text-lg font-medium",
                        "transition-colors duration-200",
                        "hover:bg-primary/10",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-ring"
                      )}
                    >
                      Resources
                    </Link>
                  </div>
                  <Button 
                    onClick={handleGetQuote}
                    className={cn(
                      "w-full h-14",
                      "text-lg font-semibold",
                      "bg-accent hover:bg-accent/90",
                      "text-accent-foreground",
                      "shadow-sm",
                      "transition-all duration-200",
                      "hover:shadow-md",
                      "active:scale-95"
                    )}
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