"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { type VariantProps, cva } from "class-variance-authority";
import { ChevronLeft } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants/faq";

export interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

const faqVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold"
    },
    questionSpacing: {
      tight: "py-1",
      base: "py-1.5",
      relaxed: "py-2"
    },
    answerSpacing: {
      tight: "-mt-1",
      base: "mt-0",
      relaxed: "mt-1"
    }
  },
  defaultVariants: {
    size: "base",
    weight: "medium",
    questionSpacing: "base",
    answerSpacing: "base"
  }
});

interface FAQListProps extends VariantProps<typeof faqVariants> {
  items?: readonly FAQItem[];
  defaultOpen?: boolean;
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
  containerClassName?: string;
  activeColor?: string;
  inactiveColor?: string;
  hoverColor?: string;
  backButtonLabel?: string;
}

export function FAQList({ 
  items = FAQ_ITEMS,
  defaultOpen = false,
  className,
  questionClassName,
  answerClassName,
  containerClassName,
  activeColor = "text-primary",
  inactiveColor = "text-foreground",
  hoverColor = "text-primary/80",
  backButtonLabel = "Back to Questions",
  size,
  weight,
  questionSpacing,
  answerSpacing,
}: FAQListProps) {
  const [expandedItem, setExpandedItem] = useState<string | undefined>(
    defaultOpen ? "item-0" : undefined
  );
  const [isLandscape, setIsLandscape] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check window orientation
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const setContentRef = (index: number) => (el: HTMLDivElement | null) => {
    contentRefs.current[index] = el;
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Find the currently expanded item
    const currentExpandedItem = expandedItem;
    
    // Trigger the same sequence as clicking the expanded item
    if (currentExpandedItem) {
      const accordionItem = document.querySelector(
        `[data-state="open"][data-accordion-item="${currentExpandedItem}"]`
      );
      
      if (accordionItem) {
        // Simulate clicking the expanded item to trigger the same animation
        const trigger = accordionItem.querySelector('[data-accordion-trigger]');
        (trigger as HTMLElement)?.click();
      } else {
        // Fallback if we can't find the element
        setExpandedItem(undefined);
      }
    }
  };

  const baseClasses = faqVariants({ size, weight, questionSpacing, answerSpacing });

  return (
    <LayoutGroup>
      <div className={cn(
        "relative w-full",
        containerClassName
      )}>
        <Accordion
          type="single"
          collapsible
          className={cn(
            "w-full landscape:text-sm",
            baseClasses,
            className
          )}
          value={expandedItem}
          onValueChange={setExpandedItem}
        >
          <AnimatePresence
            initial={false}
            mode="wait"
          >
            {items.map((faq, index) => {
              const itemValue = `item-${index}`;
              const isExpanded = expandedItem === itemValue;
              
              if (isLandscape && expandedItem && !isExpanded) {
                return null;
              }

              return (
                <motion.div
                  key={itemValue}
                  layoutId={itemValue}
                  initial={isLandscape ? { opacity: 0, y: 20 } : false}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      y: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }
                  }}
                  exit={isLandscape ? {
                    opacity: 0,
                    y: -20,
                    transition: { 
                      y: { type: "spring", stiffness: 500, damping: 40 },
                      opacity: { duration: 0.15 }
                    }
                  } : {
                    opacity: 0,
                    transition: { duration: 0.15 }
                  }}
                  className="w-full"
                >
                  <AccordionItem
                    value={itemValue}
                    data-accordion-item={itemValue}
                    className={cn(
                      "group cursor-pointer",
                      "border-b border-border/40",
                      isExpanded && "border-transparent"
                    )}
                  >
                    <AccordionTrigger 
                      data-accordion-trigger
                      className={cn(
                        "hover:no-underline",
                        "flex items-center py-2",
                        inactiveColor,
                        `group-hover:${hoverColor}`,
                        isExpanded && activeColor,
                        questionClassName
                      )}
                    >
                      <span className={cn(
                        "text-left",
                        inactiveColor,
                        isExpanded && activeColor
                      )}>
                        <span className="text-base landscape:text-base xl:text-lg">
                          {faq.question}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent 
                      ref={setContentRef(index)}
                      className={cn(
                        "text-muted-foreground pt-0 pb-2",
                        answerClassName
                      )}
                    >
                      <div className="space-y-2">
                        <p className="text-base landscape:text-base xl:text-lg text-muted-foreground">
                          {faq.answer}
                        </p>
                        {isLandscape && isExpanded && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={handleBackClick}
                            className={cn(
                              "flex items-center gap-2 text-sm font-medium",
                              "hover:text-primary cursor-pointer",
                              "mt-2 relative z-30"
                            )}
                          >
                            <ChevronLeft className="w-4 h-4" />
                            {backButtonLabel}
                          </motion.div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Accordion>
      </div>
    </LayoutGroup>
  );
}