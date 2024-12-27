import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { VideoPlayer } from "@/components/ui/video-player";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { ExternalLeadForm } from "@/components/lead-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { HOME_PAGE } from "@/constants/content";
import { FeaturesGrid } from "@/components/features-grid";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section isFirstSection>
        <Container size="small" className="flex flex-col h-full">
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Text Content */}
            <div className="text-center space-y-4 sm:space-y-6">
              <h1 className="text-[min(8vw,3.5rem)] font-bold whitespace-nowrap tracking-tight">
                {HOME_PAGE.hero.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-prose mx-auto">
                {HOME_PAGE.hero.subtitle}
              </p>
            </div>

            {/* Video Player */}
            <div className="w-full mt-6 sm:mt-8 md:mt-12 max-w-[min(85%,500px)]">
              <VideoPlayer 
                src={HOME_PAGE.hero.videoUrl}
                title={HOME_PAGE.hero.videoTitle}
              />
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="mt-auto pt-4 sm:pt-8">
            <ScrollIndicator 
              text={HOME_PAGE.navigation.learnMore.text}
              targetSectionIndex={HOME_PAGE.navigation.learnMore.targetSectionIndex}
            />
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section>
        <Container size="small" className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center py-4 sm:py-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
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
                <FeaturesGrid />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section>
        <Container size="small" className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center py-4 sm:py-8">
            <div className="space-y-8">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {HOME_PAGE.faq.title}
                  </h2>
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
                        <h3 className="text-base md:text-lg font-medium text-left">
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
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section>
        <Container size="small" className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center py-4 sm:py-8">
            <div className="space-y-8">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {HOME_PAGE.contact.title}
                  </h2>
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
          </div>
        </Container>
      </Section>
    </>
  );
}