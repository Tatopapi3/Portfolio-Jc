'use client'

import { useState } from 'react'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ContactSection from './components/sections/ContactSection'

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  return (
    <main>
      <HeroSection isDark={isDark} setIsDark={setIsDark} />
      <ProjectsSection isDark={isDark} />
      <SkillsSection isDark={isDark} />
      <ExperienceSection isDark={isDark} />
      <ContactSection isDark={isDark} />
    </main>
  )
}
