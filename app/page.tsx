import Hero from "@/components/home/Hero";
import WhatIDo from "@/components/home/WhatIDo";
import FeaturedWork from "@/components/home/FeaturedWork";
import Currently from "@/components/home/Currently";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  return (
    <>
      <Hero />
      <WhatIDo />
      <FeaturedWork projects={featuredProjects} />
      <Currently />
    </>
  );
}
