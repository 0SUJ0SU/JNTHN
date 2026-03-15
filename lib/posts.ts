import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost, PostSlug } from '@/types/blog'

const BLOG_DIRECTORY = path.join(process.cwd(), 'content/blog')

export function getAllPublishedPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(BLOG_DIRECTORY)
  const mdxFiles = fileNames.filter((name) => name.endsWith('.mdx'))

  const publishedPosts = mdxFiles
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '') as PostSlug
      const fullPath = path.join(BLOG_DIRECTORY, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data: frontmatter, content } = matter(fileContents)

      return {
        slug,
        content,
        ...frontmatter,
      } as BlogPost
    })
    .filter((post) => post.published)

  return publishedPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getLatestPosts(count: number): BlogPost[] {
  return getAllPublishedPosts().slice(0, count)
}
