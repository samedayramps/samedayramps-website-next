import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { BackToTop } from "@/components/ui/back-to-top";
import { CategoryNav } from "@/components/kb/category-nav";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { categories } from "./categories";

export default function KnowledgeBasePage() {
  return (
    <Section className="bg-background">
      <Container className="flex flex-col h-full max-w-5xl">
        <div className="flex-1 flex flex-col py-12">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/resources">Resources</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbPage>Knowledge Base</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">
              Find Your Wheelchair Ramp Solution
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Get the information you need to make the right choice for your mobility needs
            </p>
          </div>

          <CategoryNav categories={categories} />
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center pb-8">
          <BackToTop />
        </div>
      </Container>
    </Section>
  );
} 