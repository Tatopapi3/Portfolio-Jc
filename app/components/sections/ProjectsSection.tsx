'use client'

import { useRef, useEffect, useState } from 'react'

const projects = [
  {
    name: 'MoundVisit AI',
    year: '2026',
    type: 'Personal Project',
    headline: 'Elite coaching for every athlete,\nnot just the ones who\ncan afford it.',
    desc: 'AI baseball mechanics. Frame-by-frame analysis, Hall of Fame comparisons, drill prescriptions.',
    tech: ['Next.js', 'Claude API', 'Supabase', 'Vercel'],
    badge: '⚾ Live',
    accent: '#3b82f6',
    link: 'https://mound-visit-ai.vercel.app',
  },
  {
    name: 'Amplif.ai',
    year: '2026',
    type: '🏆 Hackathon Winner #2',
    headline: 'Your block.\nYour people.\nConnected by AI.',
    desc: 'Hyperlocal NYC platform — skill swaps, direct messaging, block party coordination.',
    tech: ['React', 'Node.js', 'AI Matching', 'PostgreSQL'],
    badge: '🏆 Won',
    accent: '#f59e0b',
  },
  {
    name: 'SnowAngel',
    year: '2026',
    type: '🏆 Hackathon Winner #1',
    headline: 'No neighbor\nleft shoveling\nalone.',
    desc: 'Accessibility-first snow removal marketplace connecting elderly & disabled neighbors with local helpers.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express'],
    badge: '🏆 Won',
    accent: '#a855f7',
  },
  {
    name: 'The Next Chapter',
    year: '2026',
    type: 'First Paid Client',
    headline: 'First client.\nFull production.\nShipped on time.',
    desc: 'Complete website for a senior transition specialist, built with AI-assisted development.',
    tech: ['HTML', 'CSS', 'JS', 'Netlify'],
    badge: '💼 Client',
    accent: '#10b981',
  },
]

export default function ProjectsSection() {
  const [active, setActive] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el: HTMLCanvasElement = canvas
    const ctx = el.getContext('2d')!
    let animId: number, t = 0
    const resize = () => { el.width=el.offsetWidth; el.height=el.offsetHeight }
    resize()
    type Dot = {x:number;y:number;vx:number;vy:number;a:number;r:number;h:number}
    const N = window.innerWidth<768?150:300
    const dots: Dot[] = Array.from({length:N}, ()=>({
      x:Math.random()*el.width, y:Math.random()*el.height,
      vx:(Math.random()-.5)*.2, vy:(Math.random()-.5)*.2,
      a:.05+Math.random()*.2, r:.4+Math.random()*1.5, h:Math.random()
    }))
    function draw() {
      t+=.005; const W=el.width, H=el.height
      ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H)
      const cx=W/2, cy=H/2, cosR=Math.cos(t*.035), sinR=Math.sin(t*.035)
      for (const d of dots) {
        d.x+=d.vx; d.y+=d.vy
        if(d.x<0)d.x+=W; if(d.x>W)d.x-=W; if(d.y<0)d.y+=H; if(d.y>H)d.y-=H
        const dx=d.x-cx, dy=d.y-cy
        d.x=d.x*.999+(cx+dx*cosR-dy*sinR)*.001
        d.y=d.y*.999+(cy+dx*sinR+dy*cosR)*.001
        const a=d.a*(0.7+.3*Math.sin(t*2.2+d.h*10))
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2)
        ctx.fillStyle=d.h>.75?`rgba(245,158,11,${a.toFixed(2)})`:`rgba(190,185,225,${a.toFixed(2)})`
        ctx.fill()
      }
      animId=requestAnimationFrame(draw)
    }
    draw()
    return ()=>cancelAnimationFrame(animId)
  }, [])

  const p = projects[active]

  return (
    <section id="projects" className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background:`radial-gradient(ellipse 50% 55% at 72% 50%, ${p.accent}12 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-6xl w-full">
        <p className="section-label mb-4">What I&apos;ve shipped</p>
        <h2 className="text-headline text-white mb-12">Projects</h2>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 flex-shrink-0">
            {projects.map((pr, i) => (
              <button key={pr.name} onClick={() => setActive(i)}
                className={`text-left px-4 py-3.5 rounded-xl transition-all border ${
                  active===i ? 'text-white border-white/10 bg-white/6' : 'text-white/22 border-transparent hover:text-white/50 hover:bg-white/3'
                }`}>
                <span className="inline-block w-1.5 h-1.5 rounded-full mr-2.5 mb-0.5 align-middle transition-all"
                  style={{
                    background: active===i ? pr.accent : '#2a2a2a',
                    boxShadow: active===i ? `0 0 8px ${pr.accent}` : 'none'
                  }} />
                <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{pr.name}</span>
              </button>
            ))}
          </div>

          {/* Card */}
          <div key={active} className="flex-1 rounded-2xl p-8 md:p-10 border animate-fade-up"
            style={{
              background: `linear-gradient(135deg, ${p.accent}0c 0%, rgba(255,255,255,0.015) 100%)`,
              borderColor: `${p.accent}25`,
            }}>
            <div className="flex items-start justify-between mb-8">
              <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase font-bold">{p.type} · {p.year}</p>
              <span className="text-[10px] font-bold px-3 py-1.5 rounded-full border"
                style={{ background:`${p.accent}12`, borderColor:`${p.accent}28`, color:p.accent }}>
                {p.badge}
              </span>
            </div>

            {/* Project name — small label style */}
            <p className="text-white/35 text-xs font-bold tracking-[0.22em] uppercase mb-3">{p.name}</p>

            {/* Headline — THE cinematic statement */}
            <h3 className="text-statement font-light text-white mb-8 whitespace-pre-line leading-snug">
              {p.headline}
            </h3>

            <p className="text-white/30 text-sm leading-relaxed mb-7 max-w-md font-light">{p.desc}</p>

            <div className="flex flex-wrap gap-2 mb-7">
              {p.tech.map(t => (
                <span key={t} className="text-[11px] px-3 py-1.5 rounded-lg bg-white/3 border border-white/6 text-white/35 font-medium">{t}</span>
              ))}
            </div>

            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide hover:opacity-60 transition-opacity"
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
