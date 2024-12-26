import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { BackToTop } from "@/components/ui/back-to-top";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ResourcesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-background">
        <Container className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">
                Resources
              </h1>
              <div className="flex justify-center gap-4">
                <Button asChild variant="default" size="sm">
                  <Link href="#latest">Articles</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="#kb">Knowledge Base</Link>
                </Button>
              </div>
            </div>

            {/* Featured Posts */}
            <div>
              <h2 className="text-xl font-semibold mb-6 text-center">Featured Resources</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className={cn(
                      "group p-6 bg-muted rounded-lg",
                      "transition-all duration-200",
                      "hover:shadow-lg hover:-translate-y-1"
                    )}
                  >
                    <article>
                      <span className="inline-block px-2.5 py-0.5 mb-3 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="flex justify-center pb-8">
            <ScrollIndicator 
              text="View All Articles"
              targetSectionIndex={1}
            />
          </div>
        </Container>
      </Section>

      {/* Blog Posts Section */}
      <Section className="bg-muted" id="latest">
        <Container className="flex flex-col h-full max-w-4xl">
          <div className="flex-1 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {blogPosts.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className={cn(
                      "group p-6 bg-background rounded-lg",
                      "transition-all duration-200",
                      "hover:shadow-lg hover:-translate-y-1"
                    )}
                  >
                    <article>
                      <div className="mb-4">
                        <span className="text-sm text-muted-foreground">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Next Section CTA */}
          <div className="flex justify-center pb-8">
            <ScrollIndicator 
              text="Knowledge Base"
              targetSectionIndex={2}
            />
          </div>
        </Container>
      </Section>

      {/* Knowledge Base Section */}
      <Section className="bg-background" id="kb">
        <Container className="flex flex-col h-full max-w-4xl">
          <div className="flex-1 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">Knowledge Base</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {categories.map((category) => (
                  <div key={category.title} className="p-6 bg-muted rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.articles.map((article) => (
                        <li key={article.slug}>
                          <Link 
                            href={`/kb/${article.slug}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="flex justify-center pb-8">
            <BackToTop />
          </div>
        </Container>
      </Section>
    </>
  );
}

const blogPosts = [
  {
    title: "Understanding ADA Ramp Requirements",
    slug: "ada-ramp-requirements",
    date: "March 15, 2024",
    excerpt: "A comprehensive guide to ADA compliance for wheelchair ramps, including slope requirements and safety features.",
  },
  {
    title: "Temporary vs Permanent Ramps",
    slug: "temporary-vs-permanent-ramps",
    date: "March 10, 2024",
    excerpt: "Compare the benefits and considerations of temporary and permanent wheelchair ramp solutions.",
  },
  {
    title: "Preparing Your Home for a Ramp Installation",
    slug: "preparing-for-ramp-installation",
    date: "March 5, 2024",
    excerpt: "Essential steps to take before your wheelchair ramp installation to ensure a smooth process.",
  },
  {
    title: "Insurance Coverage for Wheelchair Ramps",
    slug: "insurance-coverage-guide",
    date: "March 1, 2024",
    excerpt: "Learn about insurance options and coverage for wheelchair ramp rentals and installations.",
  },
];

const categories = [
  {
    title: "Installation & Setup",
    articles: [
      { title: "Installation Process Guide", slug: "installation-process" },
      { title: "Site Preparation Checklist", slug: "site-preparation" },
      { title: "Safety Guidelines", slug: "safety-guidelines" },
      { title: "Maintenance Tips", slug: "maintenance-tips" },
    ],
  },
  {
    title: "Regulations & Compliance",
    articles: [
      { title: "ADA Requirements", slug: "ada-requirements" },
      { title: "Building Codes", slug: "building-codes" },
      { title: "Permit Information", slug: "permit-info" },
      { title: "Safety Standards", slug: "safety-standards" },
    ],
  },
  {
    title: "Rental Information",
    articles: [
      { title: "Rental Terms Guide", slug: "rental-terms" },
      { title: "Pricing Structure", slug: "pricing" },
      { title: "Insurance Coverage", slug: "insurance" },
      { title: "Extension Policies", slug: "extensions" },
    ],
  },
  {
    title: "Technical Specifications",
    articles: [
      { title: "Ramp Types & Models", slug: "ramp-types" },
      { title: "Weight Capacity Guide", slug: "weight-capacity" },
      { title: "Material Specifications", slug: "materials" },
      { title: "Customization Options", slug: "customization" },
    ],
  },
];

const featuredPosts = [
  {
    title: "Complete Guide to ADA Compliance",
    slug: "ada-compliance-guide",
    category: "Compliance",
    excerpt: "Everything you need to know about making your property ADA compliant with wheelchair ramps.",
  },
  {
    title: "Choosing the Right Ramp",
    slug: "choosing-right-ramp",
    category: "Guides",
    excerpt: "Learn how to select the perfect wheelchair ramp for your specific needs and situation.",
  },
  {
    title: "Insurance & Funding Options",
    slug: "insurance-funding-guide",
    category: "Resources",
    excerpt: "Explore various payment options and insurance coverage for wheelchair ramp rentals.",
  },
]; 