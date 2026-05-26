'use client'

import { useEffect, useRef } from 'react'
import { motion, type Transition } from 'framer-motion'
import { Brain, DollarSign, MessageCircle, Trophy, Mail } from 'lucide-react'

/* ─── Inline brand icons (not in this lucide-react build) ──────────────── */
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
  </svg>
)

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

/* ─── Project data ──────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    icon:      <Brain size={20} className="text-cyan-400" />,
    iconLarge: <Brain size={32} className="text-cyan-400" />,
    iconColor: 'text-cyan-400/60',
    title:     'Moundvisit AI',
    desc:      'AI baseball mechanics coaching for developing pitchers',
    descHero:  'Baseball mechanics coaching powered by AI',
    tag:       'Next.js · Claude API · Supabase',
    tags:      ['Next.js', 'Claude API', 'Supabase', 'Vercel'],
  },
  {
    icon:      <DollarSign size={20} className="text-emerald-400" />,
    iconLarge: <DollarSign size={32} className="text-emerald-400" />,
    iconColor: 'text-emerald-400/60',
    title:     'NegotiateIQ',
    desc:      'Salary negotiation coach powered by multi-source RAG',
    descHero:  'AI salary negotiation coach with multi-source RAG',
    tag:       'FastAPI · Claude API · Supabase',
    tags:      ['FastAPI', 'Claude API', 'Supabase', 'Streamlit'],
  },
  {
    icon:      <MessageCircle size={20} className="text-purple-400" />,
    iconLarge: <MessageCircle size={32} className="text-purple-400" />,
    iconColor: 'text-purple-400/60',
    title:     'HyeoTalk',
    desc:      'AI-powered Korean language learning platform',
    descHero:  'AI-powered Korean language learning platform',
    tag:       'Next.js · React Native · Claude API',
    tags:      ['Next.js', 'React Native', 'Claude API', 'Expo'],
  },
  {
    icon:      <Trophy size={20} className="text-yellow-400" />,
    iconLarge: <Trophy size={32} className="text-yellow-400" />,
    iconColor: 'text-yellow-400/60',
    title:     'Amplif.ai',
    desc:      'Hyperlocal NYC community platform — won 2 consecutive hackathons',
    descHero:  'Hyperlocal NYC neighbor-connection platform · Hackathon winner',
    tag:       'Claude API · RAG · Won 2×',
    tags:      ['Claude API', 'RAG', 'Next.js'],
  },
] as const

/* ─── Animation helpers ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  whileInView:{ opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay } as Transition,
  viewport:   { once: true, margin: '-100px' },
})

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const rafRef      = useRef<number>(0)
  const fadingOutRef= useRef(false)

  /* ── Video fade system ─────────────────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const cancelFade = () => {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0 }
    }

    const startFade = (to: number, onDone?: () => void) => {
      cancelFade()
      const from = parseFloat(video.style.opacity ?? '0')
      const start = performance.now()
      const duration = 500
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        video.style.opacity = String(from + (to - from) * p)
        if (p < 1) rafRef.current = requestAnimationFrame(tick)
        else { rafRef.current = 0; onDone?.() }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    video.style.opacity = '0'

    const onCanPlay = () => {
      if (!fadingOutRef.current) startFade(1)
    }

    const onTimeUpdate = () => {
      if (!fadingOutRef.current &&
          !isNaN(video.duration) && video.duration > 0 &&
          video.currentTime >= video.duration - 0.55) {
        fadingOutRef.current = true
        startFade(0)
      }
    }

    const onEnded = () => {
      video.style.opacity = '0'
      cancelFade()
      fadingOutRef.current = false
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        startFade(1)
      }, 100)
    }

    video.addEventListener('canplay',    onCanPlay)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended',      onEnded)

    if (video.readyState >= 3) onCanPlay()

    return () => {
      video.removeEventListener('canplay',    onCanPlay)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended',      onEnded)
      cancelFade()
    }
  }, [])

  return (
    <>
      {/* ── Styles injected once ─────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .liquid-glass {
          background: rgba(255,255,255,0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.45)  0%,
            rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0)    40%,
            rgba(255,255,255,0)    60%,
            rgba(255,255,255,0.15) 80%,
            rgba(255,255,255,0.45) 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .liquid-glass-strong {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.15);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass-strong::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.55)  0%,
            rgba(255,255,255,0.2)  20%,
            rgba(255,255,255,0)    40%,
            rgba(255,255,255,0)    60%,
            rgba(255,255,255,0.2)  80%,
            rgba(255,255,255,0.55) 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      {/* ── Sticky video background (spans all sections) ─────────────────── */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0 }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col">
        {/* Scrim */}
        <div className="absolute inset-0 z-0" style={{ background: 'rgba(0,0,0,0.22)' }} />

        {/* ── Navigation ───────────────────────────────────────────────── */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
            <span
              className="text-white text-xl"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
            >
              JF
            </span>

            <div className="hidden md:flex items-center gap-8">
              {['About', 'Projects', 'Contact'].map(link => (
                <a
                  key={link}
                  href="#"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>

            <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm hover:bg-white/5 transition-colors">
              Let&apos;s Talk
            </button>
          </div>
        </nav>

        {/* ── Hero content ─────────────────────────────────────────────── */}
        <div
          className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center"
          style={{ transform: 'translateY(-10%)' }}
        >
          {/* Badge */}
          <div className="liquid-glass rounded-full px-4 py-2 mb-8">
            <span className="text-white/80 text-sm">
              AI Developer &amp; Technical Recruiter · NYC
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            Where Your Mind<br />
            Meets the Impossible
          </h1>

          {/* Subheading */}
          <p className="text-white/70 text-base max-w-lg mb-10 font-light">
            Building AI-powered products at the intersection of recruiting
            expertise and hands-on development.
          </p>

          {/* Project cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full mb-10">
            {PROJECTS.map(p => (
              <div
                key={p.title}
                className="liquid-glass rounded-2xl p-5 text-left hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="mb-2">{p.icon}</div>
                <p className="text-white font-semibold text-sm">{p.title}</p>
                <p className="text-white/60 text-xs mt-1">{p.descHero}</p>
                <p className={`${p.iconColor} text-xs mt-2`}>{p.tag}</p>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <button
            className="liquid-glass rounded-full px-10 py-4 text-white font-medium text-base hover:bg-white/10 transition-colors"
            onClick={() => { window.location.href = 'mailto:juan.fernandez@pursuit.org' }}
          >
            Let&apos;s Build Something →
          </button>
        </div>

        {/* Social footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-6">
          {[
            { Icon: GithubIcon,   href: 'https://github.com/Tatopapi3' },
            { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/juan-fernandez-336977172/' },
            { Icon: Mail,         href: 'mailto:juan.fernandez@pursuit.org' },
          ].map(({ Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full p-4 text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 flex justify-center pb-8">
          <span className="text-white/40 text-xs animate-bounce">Scroll to explore ↓</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — PROJECTS DEEP DIVE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 z-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-8 py-24">
          <motion.p
            {...fadeUp(0)}
            className="text-white/50 text-sm tracking-widest uppercase mb-4"
          >
            // Selected Work
          </motion.p>

          <motion.h2
            {...fadeUp(0.15)}
            className="text-6xl text-white mb-16"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            What I&apos;m Building
          </motion.h2>

          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp(i * 0.15)}
              className="liquid-glass rounded-2xl p-8 mb-6 flex items-start gap-6 hover:bg-white/5 transition-all cursor-pointer"
            >
              {/* Large icon */}
              <div className="liquid-glass rounded-2xl p-4 shrink-0">
                {p.iconLarge}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p
                  className="text-white text-2xl font-semibold"
                  style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
                >
                  {p.title}
                </p>
                <p className="text-white/70 text-base mt-1">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tags.map(tag => (
                    <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-xs text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-white/40 hover:text-white text-sm mt-4 transition-colors w-fit cursor-pointer">
                  View Project →
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — ABOUT
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0 bg-black/70" />

        <div className="relative z-10 max-w-2xl mx-auto px-8 py-24 text-center w-full">
          <motion.p
            {...fadeUp(0)}
            className="text-white/50 text-sm tracking-widest uppercase mb-4"
          >
            // About
          </motion.p>

          <motion.h2
            {...fadeUp(0.15)}
            className="text-6xl text-white mb-8"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            The Intersection
          </motion.h2>

          <motion.p
            {...fadeUp(0.30)}
            className="text-white/70 text-lg leading-relaxed mb-12 font-light"
          >
            6 years placing software engineers and AI practitioners at
            high-growth startups. Now building the tools I always wished
            existed. Technical recruiter by day, AI developer by night.
          </motion.p>

          <motion.div
            {...fadeUp(0.45)}
            className="grid grid-cols-2 gap-6"
          >
            <div className="liquid-glass rounded-2xl p-6 text-center">
              <p
                className="text-5xl text-white"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
              >
                6
              </p>
              <p className="text-white/50 text-sm mt-1">Years in Tech Recruiting</p>
            </div>
            <div className="liquid-glass rounded-2xl p-6 text-center">
              <p
                className="text-5xl text-white"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
              >
                4
              </p>
              <p className="text-white/50 text-sm mt-1">AI Projects in Production</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-xl mx-auto px-8 text-center flex flex-col items-center">
          <motion.h2
            {...fadeUp(0)}
            className="text-7xl text-white mb-6"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            Let&apos;s Build Something
          </motion.h2>

          <motion.p
            {...fadeUp(0.15)}
            className="text-white/50 text-base mb-12"
          >
            Open to AI developer roles, freelance projects, and
            collaborations that push what&apos;s possible.
          </motion.p>

          <motion.div
            {...fadeUp(0.30)}
            className="flex gap-4 mb-12"
          >
            <button
              className="liquid-glass-strong rounded-full px-8 py-4 text-white font-medium hover:bg-white/10 transition-colors"
              onClick={() => { window.location.href = 'mailto:juan.fernandez@pursuit.org' }}
            >
              Get In Touch →
            </button>
            <button className="liquid-glass rounded-full px-8 py-4 text-white/70 hover:text-white hover:bg-white/5 transition-colors">
              View Resume
            </button>
          </motion.div>

          <motion.div
            {...fadeUp(0.45)}
            className="flex gap-4"
          >
            {[
              { Icon: GithubIcon,   href: 'https://github.com/Tatopapi3' },
              { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/juan-fernandez-336977172/' },
              { Icon: Mail,         href: 'mailto:juan.fernandez@pursuit.org' },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full p-4 text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
