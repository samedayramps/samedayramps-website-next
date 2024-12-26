'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Settings, Shield, Users, DollarSign, Wrench, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CategoryNavProps {
  categories: {
    title: string;
    articles: Array<{
      title: string;
      slug: string;
      description: string;
    }>;
  }[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState<string>("I Need a Ramp");

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case "I Need a Ramp":
        return <BookOpen className="w-5 h-5" />;
      case "How Can I Pay For It?":
        return <DollarSign className="w-5 h-5" />;
      case "How Do I Install It?":
        return <Wrench className="w-5 h-5" />;
      case "Who Can Help Me?":
        return <Users className="w-5 h-5" />;
      case "What Are The Requirements?":
        return <Shield className="w-5 h-5" />;
      case "Which Ramp Is Right For Me?":
        return <Settings className="w-5 h-5" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  // Filter articles based on category
  const filteredArticles = categories
    .filter(category => category.title === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filters - Horizontal scroll on mobile */}
      <div className="relative mb-8">
        <div className="flex overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:gap-2">
          {categories.map((category) => (
            <Button
              key={category.title}
              variant={activeCategory === category.title ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.title)}
              className="flex-shrink-0 mr-2 sm:mr-0 whitespace-nowrap"
            >
              {category.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Articles Grid - Stack on mobile, grid on desktop */}
      <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
        {filteredArticles.map((category) => (
          <div key={category.title} className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              {getCategoryIcon(category.title)}
              {category.title}
            </div>
            <div className="grid gap-3">
              {category.articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/kb/${article.slug}`}
                  className={cn(
                    "p-4 rounded-lg",
                    "bg-card hover:bg-muted",
                    "transition-colors duration-200",
                    "flex items-start gap-3"
                  )}
                >
                  <div className="shrink-0 mt-1">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 