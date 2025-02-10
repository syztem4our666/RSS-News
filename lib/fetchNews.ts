import Parser from 'rss-parser';

const parser = new Parser();

const RSS_FEEDS = [
  // 🔹 Cybersecurity
  { url: 'https://feeds.feedburner.com/TheHackersNews', name: 'The Hacker News', category: 'cybersecurity' },
  { url: 'https://www.bleepingcomputer.com/feed/', name: 'BleepingComputer', category: 'cybersecurity' },
  { url: 'https://www.schneier.com/feed/', name: 'Schneier on Security', category: 'cybersecurity' },
  { url: 'https://www.infosecurity-magazine.com/rss/news/', name: 'Infosecurity Magazine', category: 'cybersecurity' },
  { url: 'https://www.csoonline.com/feed/', name: 'CSO Online', category: 'cybersecurity' },
  { url: 'https://www.theregister.com/security/headlines.atom', name: 'The Register Security', category: 'cybersecurity' },
  { url: 'https://www.zdnet.com/topic/security/rss.xml', name: 'ZDNet Security', category: 'cybersecurity' },

  // 🔹 Linux
  { url: 'https://www.cyberciti.com/feed/', name: 'nixCraft', category: 'linux' },
  { url: 'https://tecmint.com/feed', name: 'Tecmint', category: 'linux' },
  { url: 'https://itsfoss.com/feed', name: 'FOSS', category: 'linux' },
  { url: 'http://www.linux-magazine.com/rss/feed/lmi_news', name: 'Linux Magazine', category: 'linux' },
  { url: 'https://www.linuxtoday.com/rss', name: 'Linux Today', category: 'linux' },

  // 🔹 Windows
  { url: 'https://www.ghacks.net/feed/', name: 'gHacks', category: 'windows' },
  { url: 'https://www.windowscentral.com/rss', name: 'Windows Central', category: 'windows' },
  { url: 'https://www.windowslatest.com/feed/', name: 'Windows Latest', category: 'windows' },
  // 🔹 Hacking
  { url: 'https://www.hackread.com/feed/', name: 'HackRead', category: 'hacking' },

  // 🔹 CVE 
  { url: 'https://cvefeed.io/rssfeed/latest.xml', name: 'CveFeed', category: 'cve' },
  { url: 'https://sploitus.com/rss', name: 'Sploitus', category: 'cve-exploits' },
];

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  source: string;
  content: string;
  category: string;
}


const feedCache: { [url: string]: { items: NewsItem[]; timestamp: number } } = {};


const CACHE_DURATION = 5 * 60 * 1000;

const fetchFeedItems = async (feed: { url: string; name: string; category: string }): Promise<NewsItem[]> => {
  const now = Date.now();


  if (feedCache[feed.url] && now - feedCache[feed.url].timestamp < CACHE_DURATION) {
    return feedCache[feed.url].items;
  }

  try {
    const feedContent = await parser.parseURL(feed.url);
    const items = feedContent.items.map((item) => ({
      title: item.title || 'No Title',
      pubDate: item.pubDate || '',
      link: item.link || '',
      source: feed.name,
      content: item.contentSnippet || item.content || 'No description available',
      category: feed.category,
    }));


    feedCache[feed.url] = { items, timestamp: now };

    return items;
  } catch (error) {
    console.error(`Error fetching ${feed.name}:`, (error as any).message);
    return [];
  }
};

export async function fetchNews(page: number = 1, pageSize: number = 15): Promise<NewsItem[]> {
  const startTime = Date.now();

  const feedResults = await Promise.allSettled(RSS_FEEDS.map(fetchFeedItems));

  const allNews = feedResults
    .filter(result => result.status === 'fulfilled')
    .map(result => (result as PromiseFulfilledResult<NewsItem[]>).value)
    .flat();


  const sortedNews = allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());


  const startIndex = (page - 1) * pageSize;
  const paginatedNews = sortedNews.slice(startIndex, startIndex + pageSize);

  console.log(`Fetch news took: ${Date.now() - startTime}ms`);

  return paginatedNews;
}