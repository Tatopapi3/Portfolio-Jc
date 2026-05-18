'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/* Animate a string word-by-word with blur-in */
function WordReveal({ text, className = '', delay = 0, thin = false }:
  { text: string; className?: string; delay?: number; thin?: boolean }) {
  const [go, setGo] = useState(false)
  useEffect(() => { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t) }, [delay])
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.22em]">
          <span
            className={`inline-block animate-word-in ${thin ? 'font-thin' : ''} ${className}`}
            style={{ opacity: 0, animationDelay: go ? `${i * 95}ms` : '99999ms', animationFillMode: 'forwards' }}
          >
            {w}
          </span>
        </span>
      ))}
    </>
  )
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el: HTMLCanvasElement = canvas
    const ctx = el.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => { el.width = window.innerWidth; el.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    type P = { ox: number; oy: number; oz: number }
    let pts: P[] = []

    function init() {
      pts = []
      const N = window.innerWidth < 768 ? 500 : 1000
      const R = Math.min(el.width, el.height) * 0.26
      for (let i = 0; i < N; i++) {
        const th = Math.acos(2 * Math.random() - 1), ph = Math.random() * Math.PI * 2
        const r = R * (0.88 + Math.random() * 0.12)
        pts.push({ ox: r*Math.sin(th)*Math.cos(ph), oy: r*Math.sin(th)*Math.sin(ph), oz: r*Math.cos(th) })
      }
    }
    init()

    function draw() {
      t += 0.0025
      const W = el.width, H = el.height, cx = W/2, cy = H/2
      const R = Math.min(W,H)*0.26, FOV = Math.max(W,H)*0.75
      ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H)
      const g1 = ctx.createRadialGradient(cx,cy,0,cx,cy,R*.7)
      g1.addColorStop(0,'rgba(245,158,11,0.10)'); g1.addColorStop(1,'transparent')
      ctx.fillStyle=g1; ctx.fillRect(0,0,W,H)
      const g2 = ctx.createRadialGradient(cx,cy,0,cx,cy,R*2.2)
      g2.addColorStop(0,'rgba(239,68,68,0.04)'); g2.addColorStop(1,'transparent')
      ctx.fillStyle=g2; ctx.fillRect(0,0,W,H)
      const cosY=Math.cos(t),sinY=Math.sin(t),cosX=Math.cos(t*.22+.4),sinX=Math.sin(t*.22+.4)
      const proj: {sx:number;sy:number;depth:number;z:number}[] = []
      for (const p of pts) {
        const x1=p.ox*cosY+p.oz*sinY, z1=-p.ox*sinY+p.oz*cosY
        const y2=p.oy*cosX-z1*sinX, z2=p.oy*sinX+z1*cosX
        const sc=FOV/(FOV+z2+R)
        proj.push({sx:cx+x1*sc,sy:cy+y2*sc,depth:(z2+R)/(2*R),z:z2})
      }
      proj.sort((a,b)=>a.z-b.z)
      for (const p of proj) {
        const a=0.08+p.depth*.92, sz=0.3+p.depth*2.4
        const rr=Math.round(175+p.depth*80), gg=Math.round(150+p.depth*55), bb=Math.round(210-p.depth*160)
        ctx.beginPath(); ctx.arc(p.sx,p.sy,Math.max(.3,sz),0,Math.PI*2)
        ctx.fillStyle=`rgba(${rr},${gg},${bb},${a.toFixed(2)})`; ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="snap-section flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <nav className="absolute top-7 left-0 right-0 flex items-center justify-between px-8 z-20">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-bold">JF</span>
        <div className="flex gap-7 text-white/20 text-[10px] font-bold tracking-[0.22em] uppercase">
          {['Projects','Skills','Experience','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white/60 transition-colors">{l}</a>
          ))}
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center gap-10 text-center px-6 max-w-5xl w-full">
        {/* Photo */}
        <div className="animate-float">
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden relative"
            style={{ boxShadow: '0 0 70px 25px rgba(245,158,11,0.18), 0 0 140px 50px rgba(239,68,68,0.07)' }}>
            <Image src="/avatar.jpg" alt="Juan Fernandez" fill className="object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement; img.style.display='none'
                const p = img.parentElement
                if (p) {
                  p.style.background='radial-gradient(circle at 40% 35%, #3d1800, #080300)'
                  p.innerHTML='<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:52px;font-weight:900;color:#f59e0b;letter-spacing:-4px">JF</div>'
                }
              }} />
            <div className="absolute inset-0 rounded-full" style={{ boxShadow:'inset 0 0 40px rgba(245,158,11,0.08)' }} />
          </div>
        </div>

        {/* THE statement */}
        <div>
          <p className="section-label mb-8">New York · Pursuit AI Copilot Fellow</p>

          <h1 className="text-display block mb-6" style={{ lineHeight: 0.92 }}>
            {/* "6 years" — thin/ghost */}
            <span className="block text-white/25 font-thin" style={{ fontSize: '0.55em', letterSpacing: '0.05em', marginBottom: '0.3em' }}>
              <WordReveal text="6 years recruiting engineers." delay={200} />
            </span>
            {/* "Now I am one." — black gradient, full impact */}
            <span className="block gradient-text" style={{ lineHeight: 0.92 }}>
              <WordReveal text="Now I" delay={700} />
              <br />
              <WordReveal text="am one." delay={1050} />
            </span>
          </h1>

          <p className="text-white/22 max-w-sm mx-auto mb-10 animate-fade-up"
            style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.1rem)', lineHeight: 1.7, fontWeight: 300,
              animationDelay: '1600ms', opacity: 0, animationFillMode: 'forwards' }}>
            Full-stack AI engineer. Building products that didn&apos;t exist yesterday.
          </p>

          <div className="flex gap-3 justify-center animate-fade-up"
            style={{ animationDelay:'1800ms', opacity:0, animationFillMode:'forwards' }}>
            <a href="#projects"
              className="bg-white text-black px-8 py-3.5 rounded-full font-black text-sm hover:bg-amber-400 transition-colors tracking-wide">
              See My Work →
            </a>
            <a href="#contact"
              className="border border-white/8 text-white/30 hover:text-white/60 hover:border-white/18 px-8 py-3.5 rounded-full text-sm font-medium transition-all">
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-18">
        <span className="text-[9px] text-white tracking-[0.4em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
