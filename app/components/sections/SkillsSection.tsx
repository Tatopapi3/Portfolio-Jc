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

export default function SkillsSection() {
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

  return (
    <section id="skills" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 50% 60% at 28% 50%, #6366f10a, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl w-full">
        <p className="section-label mb-4">What I use</p>

        {/* Big headline with weight contrast */}
        <div className="mb-12">
          <h2 className="text-headline text-white">Skills</h2>
          <p className={`text-statement mt-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ color:'rgba(255,255,255,0.22)', fontWeight:300, maxWidth:'26ch' }}>
            The tools that turn<br />ideas into shipped products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Skill bars */}
          <div className="space-y-6">
            {skills.map((s, i) => (
              <div key={s.name} style={{ transitionDelay:`${i*50}ms` }}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
                <div className="flex justify-between mb-2.5">
                  <span className="text-white/65 font-semibold"
                    style={{ fontSize:'clamp(0.8rem,1.3vw,0.95rem)', letterSpacing:'0.01em' }}>
                    {s.name}
                  </span>
                  <span className="text-white/18 text-xs font-mono mt-0.5">{s.level}%</span>
                </div>
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: visible ? `${s.level}%` : '0%',
                      background: s.color,
                      transitionDelay: `${i*50+200}ms`,
                      boxShadow: `0 0 10px ${s.color}55`,
                    }} />
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Dev Tools</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {tools.map(t => (
                <span key={t} className="px-3.5 py-2 rounded-xl bg-white/3 border border-white/6 text-white/45 font-medium"
                  style={{ fontSize:'clamp(0.75rem,1.2vw,0.88rem)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              {[
                { label:'AI & Machine Learning', tags:['Anthropic Claude API','OpenAI APIs'] },
                { label:'Recruiting & Domain',   tags:['Labor market analysis','ATS systems','AI adoption in hiring','Boolean search'] },
              ].map(g => (
                <div key={g.label}>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">{g.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.tags.map(t => (
                      <span key={t} className="px-3.5 py-2 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-300/45"
                        style={{ fontSize:'clamp(0.75rem,1.2vw,0.88rem)' }}>
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
