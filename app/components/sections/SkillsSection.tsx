'use client'

import { useEffect, useRef, useState } from 'react'

const skills = [
  { name: 'React / Next.js',       level: 85, color: '#60a5fa' },
  { name: 'Anthropic Claude API',   level: 90, color: '#f59e0b' },
  { name: 'Node.js',                level: 80, color: '#4ade80' },
  { name: 'TypeScript',             level: 78, color: '#818cf8' },
  { name: 'Python',                 level: 72, color: '#fb923c' },
  { name: 'PostgreSQL / Supabase',  level: 80, color: '#34d399' },
  { name: 'OpenAI APIs',            level: 85, color: '#a78bfa' },
  { name: 'Tailwind CSS',           level: 90, color: '#38bdf8' },
]

const tools = ['GitHub', 'Vercel', 'Figma', 'Supabase', 'VS Code', 'Canva', 'Greenhouse', 'Loxo']

export default function SkillsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.35 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Constellation canvas — particles slowly organizing into structure
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cv: HTMLCanvasElement = canvas
    const ctx = cv.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight }
    resize()

    type Star = { x: number; y: number; vx: number; vy: number; size: number; twinkle: number }
    const N = window.innerWidth < 768 ? 120 : 220
    const stars: Star[] = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      size: 0.4 + Math.random() * 1.4,
      twinkle: Math.random() * Math.PI * 2,
    }))

    function draw() {
      t += 0.008
      const W = cv.width, H = cv.height
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      for (const s of stars) {
        s.x = (s.x + s.vx + 1) % 1
        s.y = (s.y + s.vy + 1) % 1
        const alpha = 0.12 + 0.18 * Math.sin(t * 1.8 + s.twinkle)
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,210,255,${alpha.toFixed(2)})`
        ctx.fill()
      }

      // Draw faint constellation lines between nearby stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = (stars[i].x - stars[j].x) * W
          const dy = (stars[i].y - stars[j].y) * H
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.04
            ctx.beginPath()
            ctx.moveTo(stars[i].x * W, stars[i].y * H)
            ctx.lineTo(stars[j].x * W, stars[j].y * H)
            ctx.strokeStyle = `rgba(180,190,255,${alpha.toFixed(3)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section id="skills" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Cool indigo glow — chaos organizing */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 28% 50%, #6366f10e, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl w-full">
        <p className="section-label mb-2">What I use</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-10">Skills</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skill bars */}
          <div className="space-y-5">
            {skills.map((s, i) => (
              <div key={s.name} style={{ transitionDelay: `${i * 55}ms` }}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-white/75 text-sm font-semibold">{s.name}</span>
                  <span className="text-white/25 text-xs font-mono">{s.level}%</span>
                </div>
                <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: visible ? `${s.level}%` : '0%',
                      background: s.color,
                      transitionDelay: `${i * 55 + 200}ms`,
                      boxShadow: `0 0 10px ${s.color}70`,
                    }} />
                </div>
              </div>
            ))}
          </div>

          {/* Tools + domains */}
          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-4">Dev Tools</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tools.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 text-white/55 text-sm">{t}</span>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { label: 'AI & ML', tags: ['Anthropic Claude API', 'OpenAI APIs', 'TensorFlow', 'Hugging Face', 'Pinecone'] },
                { label: 'Recruiting Domain', tags: ['Labor market analysis', 'ATS systems', 'AI adoption in hiring', 'Boolean search'] },
              ].map(g => (
                <div key={g.label}>
                  <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-2">{g.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.tags.map(t => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-amber-500/7 border border-amber-500/15 text-amber-300/65 text-sm">{t}</span>
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
