import Hero from '@/components/home/Hero'
import WhatIDo from '@/components/home/WhatIDo'
import FeaturedWork from '@/components/home/FeaturedWork'
import Currently from '@/components/home/Currently'
import BlogIntro from '@/components/home/BlogIntro'
import LatestPosts from '@/components/home/LatestPosts'
import { getFeaturedProjects } from '@/lib/projects'
import { getLatestPosts } from '@/lib/posts'

export default function HomePage() {
  const featuredProjects = getFeaturedProjects()
  const latestPosts = getLatestPosts(3)

  return (
    <>
      <Hero />
      <WhatIDo />
      <FeaturedWork projects={featuredProjects} />
      <Currently />
      <BlogIntro />
      <LatestPosts posts={latestPosts} />
    </>
  )
}
