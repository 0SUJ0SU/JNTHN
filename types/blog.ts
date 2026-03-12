type PostSlug = string & { readonly __brand: "PostSlug" };

type PostLanguage = "en" | "id";

interface BlogPostFrontmatter {
  title: string;
  date: string;
  lang: PostLanguage;
  published: boolean;
  excerpt?: string;
  description?: string;
  updated?: string;
}

interface BlogPost extends BlogPostFrontmatter {
  slug: PostSlug;
  content: string;
}

export type { PostSlug, PostLanguage, BlogPostFrontmatter, BlogPost };
