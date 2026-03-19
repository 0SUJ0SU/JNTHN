import WorkHero from "@/components/work/WorkHero";
import WorkExperience from "@/components/work/WorkExperience";

export const metadata = {
  title: "Work — JNTHN",
  description:
    "Career, education, and projects. The work of Jonathan Sugondo.",
};

export default function WorkPage() {
  return (
    <main id="main-content">
      <WorkHero />
      <WorkExperience />
    </main>
  );
}
