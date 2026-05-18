'use client'

import { useEffect, useRef, useState } from 'react'

const links = [
  {
    label: 'juan.fernandez@pursuit.org',
    href: 'mailto:juan.fernandez@pursuit.org',
    icon: '✉',
    color: '#f59e0b',
    desc: 'Primary',
  },
  {
    label: 'jc38703@gmail.com',
    href: 'mailto:jc38703@gmail.com',
    icon: '✉',
    color: '#60a5fa',
    desc: 'Personal',
  },
  {
    label: 'linkedin.com/in/juan-fernandez-336977172',
    href: 'https://linkedin.com/in/juan-fernandez-336977172',
    icon: '→',
    color: '#4ade80',
    desc: 'LinkedIn',
  },
  {
    label: 'github.com/Tatopapi3',
    href: 'https://github.com/Tatopapi3',
    icon: '→',
    color: '#a855f7',
    desc: 'GitHub',
  },
]

export default function ContactSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 50%, #f59e0b0d 0%, #a855f70a 60%, transparent 80%)' }} />

      <div className="relative z-10 max-w-3xl w-full">
        <p className="section-label mb-2">Let's connect</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Get in Touch</h2>
        <p className={`text-white/50 text-lg leading-relaxed mb-12 max-w-xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Open to full-stack engineering roles, AI product opportunities, and freelance projects.
          Fluent in English and Spanish.
        </p>

        <div className="space-y-3">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-700 group hover:scale-[1.02] ${
                visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{
                transitionDelay: `${i * 80}ms`,
                background: `${l.color}08`,
                borderColor: `${l.color}25`,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold transition-all group-hover:scale-110"
                style={{ background: `${l.color}18`, color: l.color }}>
                {l.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: `${l.color}99` }}>{l.desc}</p>
                <p className="text-white/75 text-sm font-semibold truncate group-hover:text-white transition-colors">{l.label}</p>
              </div>
              <span className="text-white/20 group-hover:text-white/60 transition-colors text-lg">›</span>
            </a>
          ))}
        </div>

        <p className={`mt-12 text-white/20 text-xs text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          © 2026 Juan Fernandez · New York, NY · Built with Next.js & Claude
        </p>
      </div>
    </section>
  )
}
