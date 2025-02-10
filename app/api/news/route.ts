import { NextResponse } from 'next/server';
import { fetchNews } from '@/lib/fetchNews';

// Revalidate this API route every hour (ISR)
export const revalidate = 3600;

// Constants for pagination
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse and validate the 'page' and 'pageSize' parameters
  const page = parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10);
  const pageSize = parseInt(searchParams.get('pageSize') || `${DEFAULT_PAGE_SIZE}`, 10);

  if (isNaN(page) || page < 1) {
    return NextResponse.json(
      { error: 'Invalid page number' },
      { status: 400 }
    );
  }

  if (isNaN(pageSize) || pageSize < 1) {
    return NextResponse.json(
      { error: 'Invalid page size' },
      { status: 400 }
    );
  }

  try {
    // Fetch news with pagination and size
    const news = await fetchNews(page, pageSize);
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
