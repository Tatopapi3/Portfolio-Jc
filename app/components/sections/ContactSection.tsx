'use client'

import { useEffect, useRef, useState } from 'react'

const links = [
  { label:'juan.fernandez@pursuit.org', href:'mailto:juan.fernandez@pursuit.org', icon:'✉', color:'#f59e0b', desc:'Primary' },
  { label:'jc38703@gmail.com',           href:'mailto:jc38703@gmail.com',           icon:'✉', color:'#60a5fa', desc:'Personal' },
  { label:'linkedin.com/in/juan-fernandez-336977172', href:'https://linkedin.com/in/juan-fernandez-336977172', icon:'↗', color:'#4ade80', desc:'LinkedIn' },
  { label:'github.com/Tatopapi3',         href:'https://github.com/Tatopapi3',       icon:'↗', color:'#a855f7', desc:'GitHub' },
]

export default function ContactSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true) }, { threshold:0.2 })
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
    type M = { angle:number;radius:number;speed:number;a:number;r:number }
    const N = window.innerWidth<768 ? 120:240
    const motes: M[] = Array.from({length:N}, ()=>({
      angle:Math.random()*Math.PI*2, radius:.18+Math.random()*.44,
      speed:.004+Math.random()*.009, a:.06+Math.random()*.26, r:.5+Math.random()*1.8
    }))
    function draw() {
      t+=.006; const W=cv.width, H=cv.height, cx=W/2, cy=H/2, maxR=Math.min(W,H)*.5
      ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H)
      const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,maxR*.14)
      cg.addColorStop(0,`rgba(255,255,255,${(.3+.13*Math.sin(t*1.3)).toFixed(2)})`)
      cg.addColorStop(.4,'rgba(245,158,11,0.10)'); cg.addColorStop(1,'transparent')
      ctx.fillStyle=cg; ctx.fillRect(0,0,W,H)
      for (const m of motes) {
        m.radius-=.00032; m.angle+=m.speed*(1+(0.4-m.radius)*3.8)
        if(m.radius<.015){m.radius=.34+Math.random()*.12;m.angle=Math.random()*Math.PI*2;m.speed=.004+Math.random()*.009}
        const x=cx+Math.cos(m.angle)*m.radius*maxR, y=cy+Math.sin(m.angle)*m.radius*maxR
        const pr=1-m.radius/.46
        ctx.beginPath(); ctx.arc(x,y,m.r*(.5+pr*.55),0,Math.PI*2)
        ctx.fillStyle=`rgba(${Math.round(175+pr*80)},${Math.round(158+pr*52)},${Math.round(215-pr*175)},${(m.a*(.5+pr*.5)).toFixed(2)})`
        ctx.fill()
      }
      animId=requestAnimationFrame(draw)
    }
    draw()
    return ()=>cancelAnimationFrame(animId)
  }, [])

  return (
    <section id="contact" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <p className="section-label mb-4">Let&apos;s connect</p>

        {/* BIG closing statement */}
        <h2 className={`text-display block mb-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ lineHeight:0.92 }}>
          <span className="text-white">Let&apos;s build</span>
          <br />
          <span className="gradient-text">something.</span>
        </h2>

        {/* Thin sub-statement */}
        <p className={`mt-6 mb-12 transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ fontSize:'clamp(1rem,2vw,1.4rem)', fontWeight:300, color:'rgba(255,255,255,0.22)', lineHeight:1.55, maxWidth:'22ch', margin:'1.5rem auto 3rem' }}>
          Open to engineering roles,<br />AI product work, and freelance.
        </p>

        <div className="space-y-3">
          {links.map((l, i) => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 group hover:scale-[1.015] ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay:`${(i+2)*90}ms`, background:`${l.color}05`, borderColor:`${l.color}18` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm transition-transform group-hover:scale-110"
                style={{ background:`${l.color}10`, color:l.color }}>
                {l.icon}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{ color:`${l.color}65` }}>{l.desc}</p>
                <p className="text-white/55 text-sm font-medium truncate group-hover:text-white transition-colors">{l.label}</p>
              </div>
              <span className="text-white/10 group-hover:text-white/40 transition-colors text-lg">›</span>
            </a>
          ))}
        </div>

        <p className={`mt-12 text-[10px] tracking-[0.25em] text-white/10 transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          © 2026 JUAN FERNANDEZ · NEW YORK, NY
        </p>
      </div>
    </section>
  )
}
