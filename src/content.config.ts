import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const BlogPosts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      category: z.string().trim(),
      author: z.string().trim(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()),
      image: image(),
      publishDate: z.string().transform((str) => new Date(str)),
    }),
});

export const collections = {
  blog: BlogPosts,
};
