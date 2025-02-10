'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'windows', label: 'Windows' },
  { value: 'linux', label: 'Linux' },
  { value: 'hacking', label: 'Hacking' },
  { value: 'cve', label: 'CVE' },
  { value: 'cve-exploits', label: 'CVE Exploits' },
] as const;

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const currentCategories = searchParams.get('category')?.split(',') || [];


  const toggleCategory = (category: string) => {
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category) 
      : [...currentCategories, category]; 


    const params = new URLSearchParams(searchParams);
    if (updatedCategories.length > 0) {
      params.set('category', updatedCategories.join(','));
    } else {
      params.delete('category');
    }


    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <Button
          key={category.value}
          variant={
            currentCategories.includes(category.value) ? 'default' : 'outline'
          }
          onClick={() => toggleCategory(category.value)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
