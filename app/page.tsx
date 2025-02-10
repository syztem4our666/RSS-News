'use client';

import { Suspense } from 'react';
import NewsFeed from '@/components/NewsFeed';
import NewsCardSkeleton from '@/components/NewsCardSkeleton';
import { ThemeToggle } from '@/components/ThemeToggle';
import CategoryFilter from '@/components/CategoryFilter';
import { Hero } from '@/components/Hero';
import SearchBar from '@/components/SearchBar'; 

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-10 py-10">
        <Hero />
        <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
          <Suspense fallback={<div>Loading categories...</div>}>
            <CategoryFilter />
          </Suspense>
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchBar />
          </Suspense>
          <ThemeToggle />
        </div>

        <div className="space-y-4">
          <Suspense fallback={<NewsCardSkeleton count={6} />}>
            <NewsFeed />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
