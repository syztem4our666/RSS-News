'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';
import { useSearchParams } from 'next/navigation';

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  source: string;
  content: string;
  category: string;
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastNewsElementRef = useCallback((node: HTMLDivElement) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    }, { rootMargin: "200px" });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Fetching news data
  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await fetch(`/api/news?page=${page}`);
        const data = await response.json();
        setNews(prevNews => {
          const newNews = [...prevNews, ...data];
          return newNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        });
        setHasMore(data.length > 0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    }

    fetchNews();
  }, [page]);

  const categories = searchParams.get('category')?.split(',') || [];
  const search = searchParams.get('search') || '';


  let filteredNews = news;

  if (categories.length > 0) {
    filteredNews = filteredNews.filter(item => categories.includes(item.category));
  }

  if (search) {
    filteredNews = filteredNews.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item, index) => (
          <div
            key={item.link} 
            ref={index === filteredNews.length - 1 ? lastNewsElementRef : null}
          >
            <NewsCard article={item} />
          </div>
        ))}
      </div>
      {filteredNews.length === 0 && !loading && (
        <p className="text-center text-muted-foreground">No news articles found matching your criteria.</p>
      )}
      {loading && <NewsCardSkeleton count={3} />}
    </div>
  );
}
