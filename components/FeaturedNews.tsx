'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface FeaturedArticle {
  title: string;
  pubDate: string;
  link: string;
  source: string;
}

export default function FeaturedNews() {
  const [featuredArticle, setFeaturedArticle] = useState<FeaturedArticle | null>(null);

  useEffect(() => {
    async function fetchFeaturedNews() {
      try {
        const response = await fetch('/api/featured-news');
        const data = await response.json();
        setFeaturedArticle(data);
      } catch (error) {
        console.error('Error fetching featured news:', error);
      }
    }

    fetchFeaturedNews();
  }, []);

  if (!featuredArticle) return null;

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>Featured Article</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold mb-2">{featuredArticle.title}</h3>
        <p className="text-sm mb-4">{formatDistanceToNow(new Date(featuredArticle.pubDate), { addSuffix: true })} • {featuredArticle.source}</p>
        <Button asChild variant="secondary">
          <a href={featuredArticle.link} target="_blank" rel="noopener noreferrer">Read Full Article</a>
        </Button>
      </CardContent>
    </Card>
  );
}