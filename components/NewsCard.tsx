import { formatDistanceToNow } from 'date-fns';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NewsCardProps {
  article: {
    title: string;
    pubDate: string;
    link: string;
    source: string;
    content: string;
    category: string;
  };
}

export default function NewsCard({ article }: NewsCardProps) {
  const formattedDate = formatDistanceToNow(new Date(article.pubDate), {
    addSuffix: true,
  });

  const shareUrl = encodeURIComponent(article.link);
  const shareTitle = encodeURIComponent(article.title);

  const socialShareButtons = [
    {
      platform: 'Twitter',
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    },
    {
      platform: 'LinkedIn',
      icon: <FaLinkedin />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`,
    },
  ];

  return (
    <Card className="flex flex-col h-full rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 bg-gradient-to-br from-secondary to-muted dark:bg-black dark:from-black dark:to-black mb-4">
      <CardHeader className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-2 z-10">
          <Badge variant="outline" className="bg-secondary/80 dark:bg-gray-800/80 backdrop-blur-sm">
            {article.category}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-extrabold tracking-tight 
          bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 
          bg-clip-text text-transparent drop-shadow-md">
          {article.title}
        </CardTitle>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/50 dark:to-black/80"></div>
      </CardHeader>
      <CardContent className="flex-grow p-4 relative z-10">
        <p className="text-sm text-muted-foreground mb-2">
          {formattedDate} • {article.source}
        </p>
        <p className="text-sm line-clamp-3">{article.content}</p>
      </CardContent>
      <CardFooter className="p-4 flex flex-wrap justify-between items-center relative z-10">
        <Button
          asChild
          variant="default"
          className="bg-primary/80 hover:bg-primary backdrop-blur-sm"
        >
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </Button>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          {socialShareButtons.map(({ platform, icon, url }) => (
            <TooltipProvider key={platform}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="bg-secondary/80 dark:bg-gray-800/80 backdrop-blur-sm"
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {icon}
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on {platform}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
