import { Badge } from "@/components/ui/badge";

interface HeroProps {
  width?: string;
  badgeText?: string;
  title?: string;
  description?: string;
}

const Hero = ({
  width = "max-w-full",
  badgeText = "RSS News",

  description = "Latest updates and news about CVE's, Cybersecurity, Windows, Linux, and Hacking.",
}: HeroProps) => {
  return (
    <section className="relative py-2 md:py-4">
      <div className={`container flex items-center justify-start ${width}`}>
        <div className="magicpattern absolute inset-0 -z-10 opacity-100" />
        <div className="flex items-center gap-4 w-full text-left">
          <img src="icon.png" alt="logo" className="h-6 md:h-8" />
          <div className="flex flex-col md:flex-row justify-start items-start w-full">
            <div className="flex flex-col items-start mb-2">
              <Badge variant="outline" className="mb-1">
                {badgeText}
              </Badge>
              <h3 className="text-lg md:text-xl font-semibold mb-1">
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground max-w-xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
