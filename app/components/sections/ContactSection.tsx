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
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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
    const N = window.innerWidth < 768 ? 130 : 250
    const motes: Mote[] = Array.from({ length: N }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.18 + Math.random() * 0.46,
      speed: 0.004 + Math.random() * 0.01,
      alpha: 0.07 + Math.random() * 0.28,
      size: 0.5 + Math.random() * 1.9,
    }))
    function draw() {
      t += 0.006
      const W = cv.width, H = cv.height
      const cx = W / 2, cy = H / 2
      const maxR = Math.min(W, H) * 0.5
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H)
      const coreG = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.14)
      coreG.addColorStop(0, `rgba(255,255,255,${(0.32 + 0.14 * Math.sin(t * 1.4)).toFixed(2)})`)
      coreG.addColorStop(0.4, 'rgba(245,158,11,0.12)')
      coreG.addColorStop(1, 'transparent')
      ctx.fillStyle = coreG; ctx.fillRect(0, 0, W, H)
      const outerG = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
      outerG.addColorStop(0, 'rgba(245,158,11,0.05)')
      outerG.addColorStop(1, 'transparent')
      ctx.fillStyle = outerG; ctx.fillRect(0, 0, W, H)
      for (const m of motes) {
        m.radius -= 0.00035
        m.angle += m.speed * (1 + (0.42 - m.radius) * 3.5)
        if (m.radius < 0.015) {
          m.radius = 0.36 + Math.random() * 0.12
          m.angle = Math.random() * Math.PI * 2
          m.speed = 0.004 + Math.random() * 0.01
        }
        const x = cx + Math.cos(m.angle) * m.radius * maxR
        const y = cy + Math.sin(m.angle) * m.radius * maxR
        const proximity = 1 - m.radius / 0.48
        const rr = Math.round(175 + proximity * 80)
        const gg = Math.round(158 + proximity * 52)
        const bb = Math.round(215 - proximity * 175)
        ctx.beginPath()
        ctx.arc(x, y, m.size * (0.5 + proximity * 0.55), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${(m.alpha * (0.5 + proximity * 0.5)).toFixed(2)})`
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
        <p className="section-label mb-3">Let&apos;s connect</p>

        <h2 className={`text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Let&apos;s build<br />
          <span className="gradient-text">something.</span>
        </h2>

        <p className={`text-white/30 text-lg md:text-xl font-light max-w-xs mx-auto mb-12 leading-relaxed transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Open to engineering roles, AI product work, and freelance. English & Spanish.
        </p>

        <div className="space-y-3">
          {links.map((l, i) => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-600 group hover:scale-[1.015] ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionDelay: `${(i + 2) * 90}ms`,
                background: `${l.color}06`,
                borderColor: `${l.color}1a`,
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-base transition-transform group-hover:scale-110"
                style={{ background: `${l.color}12`, color: l.color }}>
                {l.icon}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] mb-0.5" style={{ color: `${l.color}70` }}>{l.desc}</p>
                <p className="text-white/60 text-sm font-semibold truncate group-hover:text-white transition-colors">{l.label}</p>
              </div>
              <span className="text-white/12 group-hover:text-white/45 transition-colors text-xl">›</span>
            </a>
          ))}
        </div>

        <p className={`mt-12 text-white/12 text-xs tracking-widest transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          © 2026 Juan Fernandez · New York, NY
        </p>
      </div>
    </section>
  )
}
