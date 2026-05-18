'use client'

import { useRef, useEffect, useState } from 'react'

const projects = [
  {
    name: 'MoundVisit AI',
    year: '2026',
    type: 'Personal Project',
    desc: 'AI baseball mechanics coaching app. Frame-by-frame analysis, HOF comparisons, drill prescriptions — democratizing elite coaching for underserved athletes.',
    tech: ['Next.js', 'Claude API', 'Supabase', 'Vercel'],
    badge: '⚾ Live',
    accent: '#3b82f6',
    link: 'https://mound-visit-ai.vercel.app',
  },
  {
    name: 'Amplif.ai',
    year: '2026',
    type: '🏆 Hackathon Winner #2',
    desc: 'Hyperlocal NYC platform using AI to connect neighbors block by block — skill swaps, direct messaging, block party coordination.',
    tech: ['React', 'Node.js', 'AI Matching', 'PostgreSQL'],
    badge: '🏆 Won',
    accent: '#f59e0b',
  },
  {
    name: 'SnowAngel',
    year: '2026',
    type: '🏆 Hackathon Winner #1',
    desc: 'Accessibility-first snow removal marketplace. Elderly and disabled neighbors connect with local helpers. Glassmorphism UI + animated snowfall.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express'],
    badge: '🏆 Won',
    accent: '#a855f7',
  },
  {
    name: 'The Next Chapter',
    year: '2026',
    type: 'Freelance Client',
    desc: 'First paid client — full production website for a senior transition specialist, built with AI-assisted development workflows.',
    tech: ['HTML', 'CSS', 'JS', 'Netlify'],
    badge: '💼 Client',
    accent: '#10b981',
  },
]

export default function ProjectsSection() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setActive(0)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const p = projects[active]

  return (
    <section id="projects" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${p.accent}18 0%, transparent 70%)`
      }} />

      <div className="relative z-10 max-w-6xl w-full">
        <p className="section-label mb-2">What I've shipped</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-10">Projects</h2>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar selector */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 flex-shrink-0">
            {projects.map((pr, i) => (
              <button
                key={pr.name}
                onClick={() => setActive(i)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                  active === i
                    ? 'text-white border-white/20 bg-white/10'
                    : 'text-white/40 border-transparent hover:text-white/70 hover:bg-white/5'
                }`}
              >
                {pr.name}
              </button>
            ))}
          </div>

          {/* Active project card */}
          <div
            key={active}
            className="flex-1 rounded-2xl p-8 border animate-fade-up"
            style={{
              background: `linear-gradient(135deg, ${p.accent}12 0%, rgba(255,255,255,0.03) 100%)`,
              borderColor: `${p.accent}35`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-3xl font-black text-white mb-1">{p.name}</h3>
                <p className="text-white/40 text-sm">{p.type} · {p.year}</p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
                style={{ background: `${p.accent}18`, borderColor: `${p.accent}35`, color: p.accent }}>
                {p.badge}
              </span>
            </div>

            <p className="text-white/65 text-lg leading-relaxed mb-6">{p.desc}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map(t => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60">{t}</span>
              ))}
            </div>

            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-sm transition-colors"
                style={{ color: p.accent }}>
                Visit live site →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
