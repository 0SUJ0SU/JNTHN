type ProjectSlug = string & { readonly __brand: "ProjectSlug" };

type ProjectCategory = "professional" | "personal";

type ProjectStatus = "complete" | "in-progress";

interface ProjectFrontmatter {
  title: string;
  date: string;
  category: ProjectCategory;
  tech: string[];
  status: ProjectStatus;
  featured: boolean;
  excerpt: string;
  description: string;
}

interface Project extends ProjectFrontmatter {
  slug: ProjectSlug;
  content: string;
}

export type {
  ProjectSlug,
  ProjectCategory,
  ProjectStatus,
  ProjectFrontmatter,
  Project,
};
