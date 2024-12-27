import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { VideoPlayer } from "@/components/ui/video-player";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { ExternalLeadForm } from "@/components/lead-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HOME_PAGE } from "@/constants/content";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section>
        <Container className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center">
            {/* Text Content */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {HOME_PAGE.hero.title}
              </h1>
              <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
                {HOME_PAGE.hero.subtitle}
              </p>
            </div>

            {/* Video Player */}
            <div className="w-full flex justify-center">
              <VideoPlayer 
                src={HOME_PAGE.hero.videoUrl}
                title={HOME_PAGE.hero.videoTitle}
              />
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <ScrollIndicator 
            text={HOME_PAGE.navigation.learnMore.text}
            targetSectionIndex={HOME_PAGE.navigation.learnMore.targetSectionIndex}
          />
        </Container>
      </Section>

      {/* Features Section */}
      <Section>
        <Container className="flex flex-col h-full max-w-3xl">
          <div className="flex-1 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">
                {HOME_PAGE.features.title}
              </h2>
              
              {/* Image */}
              <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
                <Image
                  src={HOME_PAGE.images.ramp1.src}
                  alt={HOME_PAGE.images.ramp1.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>

              {/* Features Grid */}
              <div className="grid gap-4 md:grid-cols-3">
                {HOME_PAGE.features.list.map((feature) => (
                  <div
                    key={feature.title}
                    className={cn(
                      "group p-4 rounded-lg",
                      "bg-background/50 backdrop-blur-sm",
                      "transition-all duration-200",
                      "hover:bg-background/80"
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        {feature.icon}
                        <h3 className="text-lg font-medium">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-base text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Next Section CTA */}
          <ScrollIndicator 
            text={HOME_PAGE.navigation.commonQuestions.text}
            targetSectionIndex={HOME_PAGE.navigation.commonQuestions.targetSectionIndex}
          />
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section>
        <Container className="flex flex-col h-full max-w-3xl">
          <div className="flex-1 flex flex-col justify-center">
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">{HOME_PAGE.faq.title}</h2>
              </div>

              {/* Image */}
              <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
                <Image
                  src={HOME_PAGE.images.ramp2.src}
                  alt={HOME_PAGE.images.ramp2.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>

              <Accordion type="single" collapsible className="w-full">
                {HOME_PAGE.faq.list.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <h3 className="text-lg font-medium text-left">
                        {faq.question}
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          
          {/* Next Section CTA */}
          <ScrollIndicator 
            text={HOME_PAGE.navigation.getQuote.text}
            targetSectionIndex={HOME_PAGE.navigation.getQuote.targetSectionIndex}
          />
        </Container>
      </Section>

      {/* Contact Section */}
      <Section>
        <Container className="flex flex-col h-full max-w-3xl">
          <div className="flex-1 flex flex-col justify-center">
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">{HOME_PAGE.contact.title}</h2>
                <p className="text-lg text-muted-foreground">
                  {HOME_PAGE.contact.subtitle}
                </p>
              </div>
              <ExternalLeadForm 
                apiKey={process.env.NEXT_PUBLIC_LEAD_API_KEY || ''}
                apiEndpoint={process.env.NEXT_PUBLIC_LEAD_API_ENDPOINT || ''}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}