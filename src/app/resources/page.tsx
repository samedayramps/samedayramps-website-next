import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { BackToTop } from "@/components/ui/back-to-top";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, DollarSign, FileText, HandHeart, HelpCircle, ShieldCheck } from "lucide-react";

export default function ResourcesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-background">
        <Container className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Get Help With Your Wheelchair Ramp
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find financial assistance, grants, and resources to help you get the wheelchair ramp you need
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="default" size="lg">
                  <Link href="#assistance" className="gap-2">
                    Financial Assistance <DollarSign className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#guide" className="gap-2">
                    Complete Guide <FileText className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                    "group p-4 bg-muted rounded-lg",
                    "hover:bg-muted/80 transition-all",
                    "flex items-start gap-3"
                  )}
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Financial Assistance Section */}
      <Section id="assistance" className="bg-muted">
        <Container className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
            <h2 className="text-3xl font-bold mb-8">Financial Assistance Programs</h2>
            
            <div className="grid gap-6">
              {assistancePrograms.map((program) => (
                <div
                  key={program.title}
                  className="bg-background rounded-lg p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{program.title}</h3>
                      <p className="text-muted-foreground">{program.subtitle}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p>{program.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Eligibility:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {program.eligibility.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4">
                      <Button asChild>
                        <Link href={program.link} className="gap-2">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Complete Guide Section */}
      <Section id="guide" className="bg-background">
        <Container className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
            <h2 className="text-3xl font-bold mb-8">Complete Guide to Getting Help</h2>
            
            <div className="grid gap-6">
              {guideSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="bg-muted rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                      {step.tips && (
                        <div className="bg-background rounded-lg p-4">
                          <h4 className="font-medium mb-2">Helpful Tips:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <BackToTop />
          </div>
        </Container>
      </Section>
    </>
  );
}

const quickLinks = [
  {
    title: "Free Ramp Programs",
    description: "Find organizations that provide free ramps to those in need",
    href: "#assistance",
    icon: <HandHeart className="w-6 h-6 text-primary" />,
  },
  {
    title: "Government Assistance",
    description: "Learn about Medicare, Medicaid, and other government programs",
    href: "#assistance",
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
  },
  {
    title: "Get Help Now",
    description: "Step-by-step guide to getting financial assistance",
    href: "#guide",
    icon: <HelpCircle className="w-6 h-6 text-primary" />,
  },
];

const assistancePrograms = [
  {
    title: "Texas Ramp Project",
    subtitle: "Free Ramp Building Program",
    description: "The Texas Ramp Project builds free wheelchair ramps for older adults and people with disabilities who cannot afford to buy one. Ramps are built by volunteers using donated materials.",
    icon: <HandHeart className="w-6 h-6 text-primary" />,
    eligibility: [
      "Texas resident",
      "Have a disability or mobility impairment",
      "Cannot afford to purchase a ramp",
      "Have a referral from a healthcare provider",
    ],
    link: "/kb/texas-ramp-project",
  },
  {
    title: "STAR+PLUS Medicaid Program",
    subtitle: "Home Modifications Benefit",
    description: "Texas Medicaid's STAR+PLUS program provides home modifications, including wheelchair ramps, to eligible members through their managed care organizations.",
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    eligibility: [
      "Texas Medicaid recipient",
      "Enrolled in STAR+PLUS program",
      "Meet medical necessity criteria",
      "Assessment by care coordinator required",
    ],
    link: "/kb/starplus-program",
  },
  {
    title: "VA Home Improvements",
    subtitle: "Veterans Assistance Program",
    description: "The Department of Veterans Affairs offers grants for home modifications, including wheelchair ramps, through various programs like SHA and HISA grants.",
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    eligibility: [
      "Service-connected disability",
      "Honorable discharge",
      "Meet specific disability criteria",
      "Home ownership requirements may apply",
    ],
    link: "/kb/veterans-assistance",
  },
];

const guideSteps = [
  {
    title: "Determine Your Needs",
    description: "Before seeking assistance, gather important information about your specific needs and situation.",
    tips: [
      "Get a written recommendation from your healthcare provider",
      "Take measurements and photos of your entrance",
      "Document your household income and expenses",
      "Collect medical documentation of your disability",
    ],
  },
  {
    title: "Explore All Options",
    description: "There are multiple programs and organizations that can help. Don't limit yourself to just one option.",
    tips: [
      "Contact local Area Agency on Aging",
      "Check with religious organizations and charities",
      "Research state-specific disability programs",
      "Look into crowd-funding options as a last resort",
    ],
  },
  {
    title: "Apply for Assistance",
    description: "Submit applications to multiple programs simultaneously to increase your chances of getting help quickly.",
    tips: [
      "Keep copies of all submitted documents",
      "Follow up regularly on your applications",
      "Ask about emergency assistance if needed",
      "Be prepared to provide additional documentation",
    ],
  },
  {
    title: "Consider Temporary Solutions",
    description: "While waiting for permanent assistance, explore temporary options to maintain your mobility and independence.",
    tips: [
      "Look into ramp rental programs",
      "Consider portable ramps as a short-term solution",
      "Ask about loaner programs in your area",
      "Connect with local disability advocacy groups",
    ],
  },
]; 