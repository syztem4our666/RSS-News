import { Suspense } from 'react';
import NewsFeed from '@/components/NewsFeed';
import NewsCardSkeleton from '@/components/NewsCardSkeleton';
import { ThemeToggle } from '@/components/ThemeToggle';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import { Hero } from '@/components/Hero';

export const revalidate = 3600;

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-10 py-10">
        {/* Hero Section */}
        <Hero />

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
          <div className="w-full md:w-1/2">
            <SearchBar />
          </div>
          <ThemeToggle />
        </div>

        {/* Category Filter Section */}
        <div className="my-4">
          <CategoryFilter />
        </div>

        {/* News Feed Section */}
        <div className="space-y-4"> {/* Ensures space between news cards */}
          <Suspense fallback={<NewsCardSkeleton count={6} />}>
            <NewsFeed />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
