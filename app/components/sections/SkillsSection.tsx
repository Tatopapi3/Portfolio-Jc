'use client'

import { useEffect, useRef, useState } from 'react'

const skills = [
  { name: 'Anthropic Claude API',   level: 90, color: '#f59e0b' },
  { name: 'React / Next.js',        level: 85, color: '#60a5fa' },
  { name: 'JavaScript',             level: 88, color: '#fbbf24' },
  { name: 'Node.js',                level: 80, color: '#4ade80' },
  { name: 'PostgreSQL / Supabase',  level: 80, color: '#34d399' },
  { name: 'SQL',                    level: 78, color: '#2dd4bf' },
  { name: 'TypeScript',             level: 78, color: '#818cf8' },
  { name: 'Python',                 level: 72, color: '#fb923c' },
  { name: 'Tailwind CSS',           level: 90, color: '#38bdf8' },
  { name: 'OpenAI APIs',            level: 85, color: '#a78bfa' },
]

const tools = ['GitHub', 'Vercel', 'Figma', 'Supabase', 'VS Code', 'Canva']

const FOG = 'radial-gradient(ellipse 50% 50% at 70% 34%, rgba(251,191,36,0.20) 0%, transparent 60%), radial-gradient(ellipse 55% 55% at 28% 68%, rgba(245,158,11,0.13) 0%, transparent 58%), radial-gradient(ellipse 95% 85% at 50% 50%, rgba(254,243,199,0.48) 0%, transparent 88%), #ede5d8'

export default function SkillsSection({ isDark = true }: { isDark?: boolean }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cv: HTMLCanvasElement = canvas
    const ctx = cv.getContext('2d')!
    let animId: number, t = 0
    const resize = () => { cv.width=cv.offsetWidth; cv.height=cv.offsetHeight }
    resize()
    type Star = { x:number;y:number;vx:number;vy:number;r:number;ph:number }
    const N = window.innerWidth<768 ? 90 : 180
    const stars: Star[] = Array.from({length:N}, ()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.0003, vy:(Math.random()-.5)*.0003,
      r:.4+Math.random()*1.2, ph:Math.random()*Math.PI*2
    }))
    function draw() {
      t+=.007; const W=cv.width, H=cv.height
      ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H)
      for (const s of stars) {
        s.x=(s.x+s.vx+1)%1; s.y=(s.y+s.vy+1)%1
        ctx.beginPath(); ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(200,210,255,${(0.08+.12*Math.sin(t*1.5+s.ph)).toFixed(2)})`;ctx.fill()
      }
      for (let i=0;i<stars.length;i++) for (let j=i+1;j<stars.length;j++) {
        const dx=(stars[i].x-stars[j].x)*W, dy=(stars[i].y-stars[j].y)*H
        const d=Math.sqrt(dx*dx+dy*dy)
        if (d<70) {
          ctx.beginPath(); ctx.moveTo(stars[i].x*W,stars[i].y*H); ctx.lineTo(stars[j].x*W,stars[j].y*H)
          ctx.strokeStyle=`rgba(160,175,255,${((1-d/70)*.035).toFixed(3)})`
          ctx.lineWidth=.5; ctx.stroke()
        }
      }
      animId=requestAnimationFrame(draw)
    }
    draw()
    return ()=>cancelAnimationFrame(animId)
  }, [])

  const c = {
    label:    isDark ? '#f59e0b' : '#b45309',
    headline: isDark ? '#fff'    : '#1a0a00',
    sub:      isDark ? 'rgba(255,255,255,0.22)' : 'rgba(26,10,0,0.36)',
    skillName:isDark ? 'rgba(255,255,255,0.65)' : 'rgba(26,10,0,0.72)',
    skillPct: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(26,10,0,0.28)',
    track:    isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)',
    catLabel: isDark ? 'rgba(255,255,255,0.20)' : 'rgba(26,10,0,0.35)',
    pill:     isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)',
    pillBord: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    pillText: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(26,10,0,0.55)',
    aiChip:   isDark ? 'rgba(251,191,36,0.05)'  : 'rgba(120,60,0,0.07)',
    aiChipB:  isDark ? 'rgba(245,158,11,0.10)'  : 'rgba(120,60,0,0.12)',
    aiChipT:  isDark ? 'rgba(252,211,77,0.45)'  : 'rgba(120,60,0,0.60)',
  }

  return (
    <section id="skills" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 50% 60% at 28% 50%, #6366f10a, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms]"
        style={{ opacity: isDark ? 0 : 1, background: FOG, backdropFilter: 'blur(48px) brightness(1.7) saturate(0.4)', WebkitBackdropFilter: 'blur(48px) brightness(1.7) saturate(0.4)', zIndex: 3 }} />

      <div className="relative z-10 max-w-5xl w-full">
        <p className="section-label mb-4" style={{ color: c.label }}>What I use</p>

        <div className="mb-12">
          <h2 className="text-headline" style={{ color: c.headline }}>Skills</h2>
          <p className={`text-statement mt-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ color: c.sub, fontWeight:300, maxWidth:'26ch' }}>
            The tools that turn<br />ideas into shipped products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            {skills.map((s, i) => (
              <div key={s.name} style={{ transitionDelay:`${i*50}ms` }}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
                <div className="flex justify-between mb-2.5">
                  <span className="font-semibold" style={{ fontSize:'clamp(0.8rem,1.3vw,0.95rem)', letterSpacing:'0.01em', color: c.skillName }}>{s.name}</span>
                  <span className="text-xs font-mono mt-0.5" style={{ color: c.skillPct }}>{s.level}%</span>
                </div>
                <div className="h-[2px] rounded-full overflow-hidden" style={{ background: c.track }}>
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: visible ? `${s.level}%` : '0%', background: s.color, transitionDelay: `${i*50+200}ms`, boxShadow: `0 0 10px ${s.color}55` }} />
                </div>
              </div>
            ))}
          </div>

          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: c.catLabel }}>Dev Tools</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {tools.map(t => (
                <span key={t} className="px-3.5 py-2 rounded-xl font-medium"
                  style={{ fontSize:'clamp(0.75rem,1.2vw,0.88rem)', background: c.pill, border: `1px solid ${c.pillBord}`, color: c.pillText }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              {[
                { label:'AI & Machine Learning', tags:['Anthropic Claude API','OpenAI APIs','TensorFlow','Hugging Face','Pinecone'] },
                { label:'Recruiting & Domain',   tags:['Labor market analysis','ATS systems','AI adoption in hiring','Boolean search'] },
              ].map(g => (
                <div key={g.label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: c.catLabel }}>{g.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.tags.map(t => (
                      <span key={t} className="px-3.5 py-2 rounded-xl"
                        style={{ fontSize:'clamp(0.75rem,1.2vw,0.88rem)', background: c.aiChip, border: `1px solid ${c.aiChipB}`, color: c.aiChipT }}>
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
