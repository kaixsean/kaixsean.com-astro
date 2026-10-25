import rss from "@astrojs/rss";
import { latestPosts } from "@/utils/content";

export function GET(context) {
  return rss({
    title: "Kaixsean",
    description: "Kaixsean 的個人部落格，紀錄我的好奇與困惑。",
    site: context.site,
    customData: "<language>zh-tw</language>",
    items: latestPosts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
