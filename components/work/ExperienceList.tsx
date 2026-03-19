import experienceData from '@/content/experience.json'
import type { ExperienceEntry as ExperienceEntryType } from '@/types/content'
import ExperienceEntry from './ExperienceEntry'

const typedExperience = experienceData as ExperienceEntryType[]

export default function ExperienceList() {
  return (
    <div className="flex flex-col gap-24 md:gap-32 lg:gap-40">
      {typedExperience.map((entry, index) => (
        <ExperienceEntry
          key={`${entry.company}-${entry.startDate}`}
          entry={entry}
          index={index}
          alignRight={index % 2 !== 0}
        />
      ))}
    </div>
  )
}
