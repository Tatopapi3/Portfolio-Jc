'use client'

import { useEffect, useRef, useState } from 'react'

const items = [
  {
    role: 'AI Copilot Fellow',
    company: 'Pursuit',
    period: 'Mar 2025 – Present',
    color: '#f59e0b',
    tagline: 'Less than 5%\nget in.\nI did.',
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
    tagline: '6 years watching\nengineers.\nNow I code.',
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
    tagline: '15 hires.\n7 months.\n90% accepted.',
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
    tagline: 'AI before\nit was\neverywhere.',
    bullets: [
      'Clients: ITX and Thirty Madison',
      'Reduced sourcing time 15% through AI-assisted Boolean methods',
    ],
  },
]

const FOG = 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(251,191,36,0.18) 0%, rgba(245,158,11,0.07) 42%, transparent 74%)'

export default function ExperienceSection({ isDark = true }: { isDark?: boolean }) {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setVisible(true);setActive(0)} }, { threshold:0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cv: HTMLCanvasElement = canvas
    const ctx = cv.getContext('2d')!
    let animId: number
    const resize = () => { cv.width=cv.offsetWidth; cv.height=cv.offsetHeight }
    resize()
    type M = { x:number;y:number;speed:number;a:number;r:number }
    const motes: M[] = Array.from({length:90}, ()=>({
      x:Math.random()*.12, y:Math.random(),
      speed:.0007+Math.random()*.0013, a:.05+Math.random()*.2, r:.8+Math.random()*2,
    }))
    function draw() {
      const W=cv.width, H=cv.height
      ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H)
      for (const m of motes) {
        m.y+=m.speed; if(m.y>1){m.y=0;m.x=Math.random()*.12}
        m.x+=(Math.random()-.5)*.0005
        ctx.beginPath(); ctx.arc(m.x*W,m.y*H,m.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(245,158,11,${m.a.toFixed(2)})`; ctx.fill()
      }
      animId=requestAnimationFrame(draw)
    }
    draw()
    return ()=>cancelAnimationFrame(animId)
  }, [])

  const item = items[active]
  const c = {
    label:    isDark ? '#f59e0b' : '#b45309',
    headline: isDark ? '#fff'    : '#1a0a00',
    period:   isDark ? 'rgba(255,255,255,0.20)' : 'rgba(26,10,0,0.32)',
    role:     isDark ? 'rgba(255,255,255,0.40)' : 'rgba(26,10,0,0.52)',
    tagline:  isDark ? '#fff'    : '#1a0a00',
    bullet:   isDark ? 'rgba(255,255,255,0.35)' : 'rgba(26,10,0,0.50)',
    tabActive:isDark ? '#fff'    : '#1a0a00',
    tabInact: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(26,10,0,0.32)',
    tabActiveBg: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    eduName:  isDark ? '#fff'    : '#1a0a00',
    eduSub:   isDark ? 'rgba(245,196,100,0.45)' : 'rgba(120,60,0,0.55)',
    eduDate:  isDark ? 'rgba(255,255,255,0.18)' : 'rgba(26,10,0,0.28)',
    divider:  isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)',
  }

  return (
    <section id="experience" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
        style={{ transition:'filter 1200ms ease', filter: isDark ? 'none' : 'invert(1) hue-rotate(180deg) sepia(0.15) brightness(0.92)' }} />
      <div className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background:`radial-gradient(ellipse 55% 55% at 78% 45%, ${item.color}0d 0%, transparent 70%)` }} />
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms]"
        style={{ opacity: isDark ? 0 : 1, background: FOG, zIndex: 2 }} />

      <div className="relative z-10 max-w-5xl w-full">
        <p className="section-label mb-4" style={{ color: c.label }}>Where I&apos;ve been</p>
        <h2 className="text-headline mb-12" style={{ color: c.headline }}>Experience</h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex md:flex-col gap-1 flex-shrink-0">
            {items.map((it, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="flex items-center gap-3 px-4 py-3.5 text-left rounded-xl transition-all"
                style={{ background: active===i ? c.tabActiveBg : 'transparent' }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0 transition-all"
                  style={{ background:it.color, boxShadow:active===i ? `0 0 10px ${it.color}` : 'none', opacity: active===i ? 1 : 0.18, transform: active===i ? 'scale(1.25)' : 'scale(1)' }} />
                <span className="text-sm font-semibold tracking-wide transition-colors whitespace-nowrap"
                  style={{ color: active===i ? c.tabActive : c.tabInact }}>
                  {it.company}
                </span>
              </button>
            ))}
          </div>

          <div key={active} className="flex-1 rounded-2xl p-8 md:p-10 border animate-fade-up"
            style={{ background:`linear-gradient(135deg, ${item.color}0a 0%, ${isDark ? 'rgba(255,255,255,0.012)' : 'rgba(0,0,0,0.012)'} 100%)`, borderColor:`${item.color}20` }}>
            <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-5" style={{ color: c.period }}>{item.period}</p>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: c.role }}>{item.role}</p>
            <p className="text-xs font-semibold mb-8" style={{ color:item.color, letterSpacing:'0.12em' }}>{item.company}</p>
            <h3 className="text-statement font-light whitespace-pre-line mb-10 leading-snug" style={{ color: c.tagline }}>{item.tagline}</h3>
            <ul className="space-y-3">
              {item.bullets.map((b, i) => (
                <li key={i} className={`flex gap-3 leading-relaxed transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ fontSize:'clamp(0.8rem,1.3vw,0.92rem)', transitionDelay:`${i*80}ms`, color: c.bullet }}>
                  <span style={{ color:item.color }} className="flex-shrink-0 mt-0.5">›</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7 pt-7 flex flex-wrap gap-8" style={{ borderTop: `1px solid ${c.divider}` }}>
          {[['AI Copilot Fellow','Pursuit — New York, NY','Mar 2025 – Present'],
            ['CS / IT Coursework','Queensborough Community College','']].map(([role,school,period])=>(
            <div key={role}>
              <p className="text-sm font-bold mb-0.5" style={{ color: c.eduName }}>{role}</p>
              <p className="text-xs" style={{ color: c.eduSub }}>{school}</p>
              {period && <p className="text-xs mt-0.5" style={{ color: c.eduDate }}>{period}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
