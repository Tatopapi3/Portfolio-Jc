'use client'

import { useEffect, useRef, useState } from 'react'

const items = [
  {
    role: 'AI Copilot Fellow',
    company: 'Pursuit',
    period: 'Mar 2025 – Present',
    color: '#f59e0b',
    bullets: [
      '<5% acceptance — full-stack AI engineering program',
      'Built & shipped multiple AI products, won 2 hackathons',
      'Mastered React, Node.js, Python, PostgreSQL, AI integration',
    ],
  },
  {
    role: 'Talent Partner',
    company: 'LNplus2 — Technical Recruiting',
    period: 'May 2018 – 2025',
    color: '#60a5fa',
    bullets: [
      'Placed 50+ engineers at Rent the Runway, Splice & others',
      'AI-driven sourcing → +30% response rate, -25% time-to-hire',
      '6 years observing how AI reshaped role requirements',
    ],
  },
  {
    role: 'Technical Recruiter',
    company: 'Arcadia (Renewable Energy)',
    period: 'Apr – Nov 2021',
    color: '#4ade80',
    bullets: [
      'Built a 15-person tech team in 7 months',
      '90% offer acceptance rate sourcing via GitHub & StackOverflow',
    ],
  },
  {
    role: 'Technical Recruiter',
    company: 'Chameleon Collective',
    period: 'Aug 2020 – Apr 2021',
    color: '#a855f7',
    bullets: [
      'Clients: ITX and Thirty Madison',
      'Reduced sourcing time 15% via AI-assisted Boolean methods',
    ],
  },
]

export default function ExperienceSection() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); setActive(0) }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const item = items[active]

  return (
    <section id="experience" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 55% 55% at 75% 45%, ${item.color}12 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-5xl w-full">
        <p className="section-label mb-2">Where I've been</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-10">Experience</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Timeline nav */}
          <div className="flex md:flex-col gap-0 flex-shrink-0">
            {items.map((it, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all ${
                  active === i ? 'bg-white/8' : 'hover:bg-white/4'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all ${
                  active === i ? 'scale-125' : 'opacity-35'
                }`} style={{ background: it.color, boxShadow: active === i ? `0 0 10px ${it.color}` : 'none' }} />
                <span className={`text-sm font-semibold transition-colors ${active === i ? 'text-white' : 'text-white/35'}`}>
                  {it.company.split(' — ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div
            key={active}
            className={`flex-1 rounded-2xl p-8 border animate-fade-up transition-all`}
            style={{
              background: `linear-gradient(135deg, ${item.color}10 0%, rgba(255,255,255,0.02) 100%)`,
              borderColor: `${item.color}30`,
            }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-black text-white mb-1">{item.role}</h3>
              <p style={{ color: item.color }} className="font-semibold text-sm">{item.company}</p>
              <p className="text-white/35 text-xs mt-1">{item.period}</p>
            </div>

            <ul className="space-y-3">
              {item.bullets.map((b, i) => (
                <li
                  key={i}
                  className={`flex gap-3 text-white/65 text-base leading-relaxed transition-all duration-500 ${
                    visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span style={{ color: item.color }} className="flex-shrink-0 mt-1 text-lg">›</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Education strip */}
        <div className="mt-6 pt-6 border-t border-white/8 flex flex-wrap gap-6">
          {[
            ['AI Copilot Fellow', 'Pursuit — New York, NY', 'Mar 2025 – Present'],
            ['CS / IT Coursework', 'Queensborough Community College', ''],
          ].map(([role, school, period]) => (
            <div key={role}>
              <p className="text-white text-sm font-bold">{role}</p>
              <p className="text-amber-400/70 text-xs">{school}</p>
              {period && <p className="text-white/30 text-xs">{period}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
