'use client'

import { useEffect, useRef, useState } from 'react'

const items = [
  {
    role: 'AI Copilot Fellow',
    company: 'Pursuit',
    period: 'Mar 2025 – Present',
    color: '#f59e0b',
    tagline: 'Less than 5% get in. I did.',
    bullets: [
      'Full-stack AI engineering — React, Node.js, Python, PostgreSQL',
      'Built & shipped multiple AI products, won 2 hackathons',
      'Working on the hardest problems in the room',
    ],
  },
  {
    role: 'Talent Partner',
    company: 'LNplus2',
    period: 'May 2018 – 2025',
    color: '#60a5fa',
    tagline: '6 years watching engineers. Now I code.',
    bullets: [
      'Placed 50+ engineers at Rent the Runway, Splice & others',
      'AI-driven sourcing → +30% response rate, −25% time-to-hire',
      'Conducted technical assessments across ML, full-stack & DevOps',
    ],
  },
  {
    role: 'Technical Recruiter',
    company: 'Arcadia Energy',
    period: 'Apr – Nov 2021',
    color: '#4ade80',
    tagline: '15 hires in 7 months. 90% accepted.',
    bullets: [
      '15-person tech team built from zero in 7 months',
      'Sourced via GitHub & StackOverflow for clean energy mission',
    ],
  },
  {
    role: 'Technical Recruiter',
    company: 'Chameleon Collective',
    period: 'Aug 2020 – Apr 2021',
    color: '#a855f7',
    tagline: 'AI before it was everywhere.',
    bullets: [
      'Clients: ITX and Thirty Madison',
      'Reduced sourcing time 15% through AI-assisted Boolean methods',
    ],
  },
]

export default function ExperienceSection() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); setActive(0) }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cv: HTMLCanvasElement = canvas
    const ctx = cv.getContext('2d')!
    let animId: number
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight }
    resize()
    type Mote = { x: number; y: number; speed: number; alpha: number; size: number }
    const N = 100
    const motes: Mote[] = Array.from({ length: N }, () => ({
      x: Math.random() * 0.12, y: Math.random(),
      speed: 0.0007 + Math.random() * 0.0015,
      alpha: 0.05 + Math.random() * 0.22,
      size: 0.8 + Math.random() * 2.2,
    }))
    function draw() {
      const W = cv.width, H = cv.height
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H)
      for (const m of motes) {
        m.y += m.speed
        if (m.y > 1) { m.y = 0; m.x = Math.random() * 0.12 }
        m.x += (Math.random() - 0.5) * 0.0006
        ctx.beginPath()
        ctx.arc(m.x * W, m.y * H, m.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,158,11,${m.alpha.toFixed(2)})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  const item = items[active]

  return (
    <section id="experience" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 55% 55% at 78% 45%, ${item.color}0e 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-5xl w-full">
        <p className="section-label mb-3">Where I&apos;ve been</p>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tight leading-none">
          Experience
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Timeline nav */}
          <div className="flex md:flex-col gap-1 flex-shrink-0">
            {items.map((it, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3.5 text-left rounded-xl transition-all ${
                  active === i ? 'bg-white/6' : 'hover:bg-white/3'
                }`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all ${active === i ? 'scale-125' : 'opacity-20'}`}
                  style={{ background: it.color, boxShadow: active === i ? `0 0 10px ${it.color}` : 'none' }} />
                <span className={`text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${active === i ? 'text-white' : 'text-white/25'}`}>
                  {it.company}
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div key={active} className="flex-1 rounded-2xl p-8 md:p-10 border animate-fade-up"
            style={{
              background: `linear-gradient(135deg, ${item.color}0c 0%, rgba(255,255,255,0.016) 100%)`,
              borderColor: `${item.color}25`,
            }}>
            <p className="text-white/25 text-xs tracking-[0.2em] uppercase font-semibold mb-4">{item.period}</p>

            {/* Role — large */}
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-1">{item.role}</h3>
            <p className="text-sm font-semibold mb-4" style={{ color: item.color }}>{item.company}</p>

            {/* Cinematic tagline */}
            <p className="text-xl md:text-2xl font-light text-white/40 leading-snug mb-8 max-w-sm">
              {item.tagline}
            </p>

            <ul className="space-y-3.5">
              {item.bullets.map((b, i) => (
                <li key={i}
                  className={`flex gap-3 text-white/50 text-base leading-relaxed transition-all duration-500 ${
                    visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <span style={{ color: item.color }} className="flex-shrink-0 mt-0.5 text-lg">›</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Education */}
        <div className="mt-7 pt-7 border-t border-white/5 flex flex-wrap gap-8">
          {[
            ['AI Copilot Fellow', 'Pursuit — New York, NY', 'Mar 2025 – Present'],
            ['CS / IT Coursework', 'Queensborough Community College', ''],
          ].map(([role, school, period]) => (
            <div key={role}>
              <p className="text-white text-sm font-bold mb-0.5">{role}</p>
              <p className="text-amber-400/55 text-xs">{school}</p>
              {period && <p className="text-white/20 text-xs mt-0.5">{period}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
