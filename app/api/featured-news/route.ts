import { NextResponse } from 'next/server';
import { fetchNews } from '@/lib/fetchNews';

export async function GET() {
  try {
    const news = await fetchNews(1, 1);
    return NextResponse.json(news[0]);
  } catch (error) {
    console.error('Error fetching featured news:', error);
    return NextResponse.json({ error: 'Failed to fetch featured news' }, { status: 500 });
  }
}