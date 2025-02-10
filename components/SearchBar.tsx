'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch] = useDebounce(search, 300);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      } else {
        params.delete('search');
      }
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }, [debouncedSearch, router, searchParams]);

  return (
    <Input
      type="search"
      placeholder="Search articles..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full max-w-sm"
    />
  );
}