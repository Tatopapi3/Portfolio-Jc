'use client'

import { useEffect, useRef, useState } from 'react'

const links = [
  { label: 'juan.fernandez@pursuit.org', href: 'mailto:juan.fernandez@pursuit.org', icon: '✉', color: '#f59e0b', desc: 'Primary' },
  { label: 'jc38703@gmail.com',           href: 'mailto:jc38703@gmail.com',           icon: '✉', color: '#60a5fa', desc: 'Personal' },
  { label: 'linkedin.com/in/juan-fernandez-336977172', href: 'https://linkedin.com/in/juan-fernandez-336977172', icon: '↗', color: '#4ade80', desc: 'LinkedIn' },
  { label: 'github.com/Tatopapi3',         href: 'https://github.com/Tatopapi3',       icon: '↗', color: '#a855f7', desc: 'GitHub' },
]

export default function ContactSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Convergence — all particles spiral back toward center (the mind closes)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cv: HTMLCanvasElement = canvas
    const ctx = cv.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight }
    resize()

    type Mote = { angle: number; radius: number; speed: number; alpha: number; size: number }
    const N = window.innerWidth < 768 ? 150 : 280
    const motes: Mote[] = Array.from({ length: N }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.2 + Math.random() * 0.48,
      speed: 0.004 + Math.random() * 0.01,
      alpha: 0.08 + Math.random() * 0.3,
      size: 0.5 + Math.random() * 2,
    }))

    function draw() {
      t += 0.006
      const W = cv.width, H = cv.height
      const cx = W / 2, cy = H / 2
      const maxR = Math.min(W, H) * 0.5

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      // Bright core
      const coreG = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.12)
      coreG.addColorStop(0, `rgba(255,255,255,${(0.35 + 0.15 * Math.sin(t * 1.5)).toFixed(2)})`)
      coreG.addColorStop(0.3, 'rgba(245,158,11,0.15)')
      coreG.addColorStop(1, 'transparent')
      ctx.fillStyle = coreG
      ctx.fillRect(0, 0, W, H)

      // Outer warmth
      const outerG = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
      outerG.addColorStop(0, 'rgba(245,158,11,0.06)')
      outerG.addColorStop(1, 'transparent')
      ctx.fillStyle = outerG
      ctx.fillRect(0, 0, W, H)

      for (const m of motes) {
        // Spiral inward
        m.radius -= 0.0004
        m.angle += m.speed * (1 + (0.45 - m.radius) * 3) // faster as it gets closer

        if (m.radius < 0.02) {
          // Respawn at edge
          m.radius = 0.38 + Math.random() * 0.12
          m.angle = Math.random() * Math.PI * 2
          m.speed = 0.004 + Math.random() * 0.01
        }

        const x = cx + Math.cos(m.angle) * m.radius * maxR
        const y = cy + Math.sin(m.angle) * m.radius * maxR

        // Warmer/brighter as closer to center
        const proximity = 1 - m.radius / 0.5
        const rr = Math.round(180 + proximity * 75)
        const gg = Math.round(160 + proximity * 55)
        const bb = Math.round(220 - proximity * 180)
        const a = m.alpha * (0.5 + proximity * 0.5)

        ctx.beginPath()
        ctx.arc(x, y, m.size * (0.5 + proximity * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${a.toFixed(2)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section id="contact" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <p className="section-label mb-2">Let's connect</p>
        <h2 className={`text-4xl md:text-5xl font-black text-white mb-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Get in Touch
        </h2>
        <p className={`text-white/40 text-lg leading-relaxed mb-10 max-w-sm mx-auto transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Open to engineering roles, AI product work, and freelance.
          Fluent in English and Spanish.
        </p>

        <div className="space-y-3">
          {links.map((l, i) => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-600 group hover:scale-[1.02] ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionDelay: `${(i + 2) * 80}ms`,
                background: `${l.color}07`,
                borderColor: `${l.color}20`,
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-base transition-transform group-hover:scale-110"
                style={{ background: `${l.color}15`, color: l.color }}>
                {l.icon}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: `${l.color}80` }}>{l.desc}</p>
                <p className="text-white/65 text-sm font-semibold truncate group-hover:text-white transition-colors">{l.label}</p>
              </div>
              <span className="text-white/15 group-hover:text-white/50 transition-colors">›</span>
            </a>
          ))}
        </div>

        <p className={`mt-12 text-white/15 text-xs transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          © 2026 Juan Fernandez · New York, NY · Built with Next.js & Claude
        </p>
      </div>
    </section>
  )
}
