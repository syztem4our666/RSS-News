import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsCardSkeletonProps {
  count?: number;
}

export default function NewsCardSkeleton({ count = 1 }: NewsCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count).fill(0).map((_, index) => (
        <Card key={index} className="flex flex-col h-full rounded-2xl overflow-hidden">
          <CardHeader className="p-4 space-y-2">
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent className="flex-grow p-4 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter className="p-4">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}