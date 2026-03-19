import ExperienceList from '@/components/work/ExperienceList'

export default function WorkExperience() {
  return (
    <section
      className="px-6 py-24 md:px-8 md:py-32 lg:px-12 lg:py-40"
      aria-label="Experience"
    >
      <div className="mx-auto max-w-7xl">
        <span className="mb-12 block font-mono text-xs tracking-wider text-gold md:mb-16">
          [EXPERIENCE]
        </span>

        <ExperienceList />
      </div>
    </section>
  )
}
