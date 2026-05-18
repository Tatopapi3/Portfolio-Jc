'use client'

import { useEffect, useRef, useState } from 'react'

const skills = [
  { name: 'React / Next.js', level: 85, color: '#60a5fa' },
  { name: 'Anthropic Claude API', level: 90, color: '#f59e0b' },
  { name: 'Node.js', level: 80, color: '#4ade80' },
  { name: 'TypeScript', level: 78, color: '#818cf8' },
  { name: 'Python', level: 72, color: '#fb923c' },
  { name: 'PostgreSQL / Supabase', level: 80, color: '#34d399' },
  { name: 'OpenAI APIs', level: 85, color: '#a78bfa' },
  { name: 'Tailwind CSS', level: 90, color: '#38bdf8' },
]

const tools = ['GitHub', 'Vercel', 'Figma', 'Supabase', 'VS Code', 'Canva', 'Greenhouse', 'Loxo']

export default function SkillsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 30% 50%, #6366f115, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl w-full">
        <p className="section-label mb-2">What I use</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-10">Skills</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skill bars */}
          <div className="space-y-5">
            {skills.map((s, i) => (
              <div key={s.name} style={{ transitionDelay: `${i * 60}ms` }}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-white/80 text-sm font-semibold">{s.name}</span>
                  <span className="text-white/35 text-xs font-mono">{s.level}%</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: visible ? `${s.level}%` : '0%',
                      background: s.color,
                      transitionDelay: `${i * 60 + 200}ms`,
                      boxShadow: `0 0 8px ${s.color}80`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tool chips + context */}
          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Dev Tools</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tools.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/65 text-sm">
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { label: 'AI & ML', tags: ['Anthropic Claude API', 'OpenAI APIs', 'TensorFlow', 'Hugging Face', 'Pinecone'] },
                { label: 'Recruiting Domain', tags: ['Labor market analysis', 'ATS systems', 'AI adoption in hiring', 'Boolean search'] },
              ].map(g => (
                <div key={g.label}>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{g.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.tags.map(t => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-amber-500/8 border border-amber-500/18 text-amber-300/75 text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
