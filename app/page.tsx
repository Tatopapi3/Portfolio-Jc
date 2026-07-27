'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Transition } from 'framer-motion'
import { Brain, Trophy, Snowflake, Building2, Wand2, Zap, FileSearch, Mail, Menu, X } from 'lucide-react'

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
    icon:      <Trophy size={20} className="text-yellow-400" />,
    iconLarge: <Trophy size={32} className="text-yellow-400" />,
    iconColor: 'text-yellow-400/60',
    title:     'Amplif.ai',
    desc:      'Hyperlocal NYC community platform — won 2 consecutive hackathons',
    descHero:  'Hyperlocal NYC neighbor-connection platform · Hackathon winner',
    tag:       'Claude API · RAG · Won 2×',
    tags:      ['Claude API', 'RAG', 'Next.js'],
    link:      'https://home-block-amplified.lovable.app',
  },
  {
    icon:      <Snowflake size={20} className="text-sky-300" />,
    iconLarge: <Snowflake size={32} className="text-sky-300" />,
    iconColor: 'text-sky-300/60',
    title:     'SnowAngel',
    desc:      'Accessibility-first snow removal marketplace — hackathon winner',
    descHero:  'Connecting elderly & disabled neighbors with local snow-removal help',
    tag:       'React · Node.js · Won',
    tags:      ['React', 'TypeScript', 'Node.js', 'Express'],
    link:      'https://github.com/Tatopapi3/Snow-Angel',
  },
  {
    icon:      <Building2 size={20} className="text-orange-400" />,
    iconLarge: <Building2 size={32} className="text-orange-400" />,
    iconColor: 'text-orange-400/60',
    title:     'Property-OS',
    desc:      'Real-estate command center — CSV leads to a ranked morning briefing',
    descHero:  'AI-ranked property leads and a live real-estate workspace',
    tag:       'Cloudflare Workers · D1 · Leaflet',
    tags:      ['Cloudflare Workers', 'D1', 'Leaflet', 'NYC Open Data'],
    link:      'https://property-os-morning-briefing.property-os.workers.dev',
  },
  {
    icon:      <Wand2 size={20} className="text-violet-400" />,
    iconLarge: <Wand2 size={32} className="text-violet-400" />,
    iconColor: 'text-violet-400/60',
    title:     'VibePath',
    desc:      'AI app builder paired with a structured coding curriculum',
    descHero:  'Generate apps with AI, then learn the fundamentals behind them',
    tag:       'Next.js · Claude API · Supabase',
    tags:      ['Next.js', 'Claude API', 'Supabase'],
    link:      'https://vibepath-olive.vercel.app',
  },
  {
    icon:      <Zap size={20} className="text-green-400" />,
    iconLarge: <Zap size={32} className="text-green-400" />,
    iconColor: 'text-green-400/60',
    title:     'Clean Hour',
    desc:      'Real-time grid carbon intensity + pricing across 3 US grids',
    descHero:  'Tells you when clean energy is actually worth it, by the hour',
    tag:       'Next.js · EIA API · PWA',
    tags:      ['Next.js', 'EIA Open Data', 'PWA'],
    link:      'https://clean-hour.vercel.app',
  },
  {
    icon:      <FileSearch size={20} className="text-rose-400" />,
    iconLarge: <FileSearch size={32} className="text-rose-400" />,
    iconColor: 'text-rose-400/60',
    title:     'TalentFlow',
    desc:      'Advisory AI agent that pre-screens resumes against a job description',
    descHero:  'Cites evidence for every match — never auto-rejects a candidate',
    tag:       'Python · Claude API · Strands',
    tags:      ['Python', 'Claude API', 'Strands Agents'],
    link:      'https://github.com/Tatopapi3/talentflow-agent',
  },
  {
    icon:      <Brain size={20} className="text-cyan-400" />,
    iconLarge: <Brain size={32} className="text-cyan-400" />,
    iconColor: 'text-cyan-400/60',
    title:     'Moundvisit AI',
    desc:      'AI baseball mechanics coaching for developing pitchers',
    descHero:  'Baseball mechanics coaching powered by AI',
    tag:       'Next.js · Claude API · Supabase',
    tags:      ['Next.js', 'Claude API', 'Supabase', 'Vercel'],
    link:      'https://mound-visit-ai.vercel.app',
  },
] as const

/* ─── Hero "train stops" — each swaps the background video AND the headline/
   subtext, telling the career arc one stop at a time ─────────────────────── */
const STOPS = [
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    title: 'Where It Started',
    subtitle: '6 years placing software engineers and AI practitioners at high-growth startups — technical recruiter by day, always building something on the side.',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    title: 'Hackathon Season',
    subtitle: 'Amplif.ai and SnowAngel — two consecutive hackathon wins, built under pressure with strangers who became a team overnight.',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    title: 'Building in Production',
    subtitle: 'VibePath, Clean Hour, TalentFlow, Property-OS, Moundvisit AI — five real, shipped products, not portfolio filler.',
  },
  {
    video: 'https://videos.pexels.com/video-files/3029469/3029469-hd_1920_1080_24fps.mp4',
    title: "What's Next",
    subtitle: "Open to AI developer roles, freelance projects, and collaborations that push what's possible.",
  },
] as const

const OVERLAY_PNG = 'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png'

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Experiments', href: '/experiments' },
]
const STATS = ['6 Years in Tech Recruiting', '7 Projects Shipped', '2× Hackathon Winner', 'NYC-Based']

const goToEmail = () => { window.location.href = 'mailto:juan.fernandez@pursuit.org' }

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
  const [activeVideo, setActiveVideo] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // "Deep Woods" (index 2) is the one video where the hero content flips to a dark palette
  const isDark = activeVideo === 2
  const heroColor = isDark ? '#182C41' : '#ffffff'

  const switchVideo = (i: number) => {
    if (i === activeVideo || isTransitioning) return
    setActiveVideo(i)
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

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

        @keyframes train-bob {
          0%, 100% { transform: translateY(0) scale(1.03); }
          50%      { transform: translateY(-6px) scale(1.03); }
        }
        .overlay-bob { animation: train-bob 3s ease-in-out infinite; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — fullscreen cinematic, train-stop video crossfade
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Background videos — only the active stop's video is visible */}
        {STOPS.map((s, i) => (
          <video
            key={s.video}
            src={s.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: activeVideo === i ? 1 : 0 }}
          />
        ))}

        {/* Scrim */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Foreground parallax overlay */}
        <img
          src={OVERLAY_PNG}
          alt=""
          aria-hidden="true"
          className="overlay-bob absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Content layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* ── Navigation ───────────────────────────────────────────────── */}
          <nav className="px-6 sm:px-10 py-6">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              <span
                className="text-white text-xl sm:text-2xl"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
              >
                Juan Fernandez
              </span>

              {/* Desktop nav pill */}
              <div className="hidden md:flex liquid-glass rounded-full px-6 py-3 items-center gap-8">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-white/90 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={goToEmail}
                  className="bg-white text-black rounded-full px-5 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Get In Touch
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(o => !o)}
                aria-label="Toggle menu"
                className="md:hidden liquid-glass rounded-full p-3"
              >
                <div className="relative w-5 h-5">
                  <Menu
                    size={20}
                    className="absolute inset-0 text-white transition-all duration-300"
                    style={{
                      transform: mobileMenuOpen ? 'rotate(90deg) scale(0.75)' : 'rotate(0deg) scale(1)',
                      opacity:   mobileMenuOpen ? 0 : 1,
                    }}
                  />
                  <X
                    size={20}
                    className="absolute inset-0 text-white transition-all duration-300"
                    style={{
                      transform: mobileMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.75)',
                      opacity:   mobileMenuOpen ? 1 : 0,
                    }}
                  />
                </div>
              </button>
            </div>
          </nav>

          {/* ── Mobile menu overlay ──────────────────────────────────────── */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-8"
                onClick={() => setMobileMenuOpen(false)}
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="text-white text-3xl"
                    style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.1 + NAV_LINKS.length * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  onClick={(e) => { e.stopPropagation(); goToEmail() }}
                  className="bg-white text-black rounded-full px-8 py-3 font-medium mt-4"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Get In Touch
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Hero content ─────────────────────────────────────────────── */}
          <div
            className="flex-1 flex flex-col items-center justify-center px-6 text-center transition-colors duration-700"
            style={{ color: heroColor }}
          >
            {/* Badge */}
            <div className="liquid-glass rounded-full px-4 py-2 mb-8">
              <span className="text-sm" style={{ fontFamily: 'system-ui, sans-serif', color: heroColor, opacity: 0.85 }}>
                AI Developer &amp; Technical Recruiter · NYC
              </span>
            </div>

            {/* Heading + subtext — swap per stop */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <h1
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] tracking-tight mb-6 max-w-4xl"
                  style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
                >
                  {STOPS[activeVideo].title}
                </h1>

                <p
                  className="text-base max-w-xl mb-10 font-light leading-relaxed"
                  style={{ fontFamily: 'system-ui, sans-serif', color: heroColor, opacity: 0.75 }}
                >
                  {STOPS[activeVideo].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Primary CTA */}
            <button
              onClick={goToEmail}
              className="liquid-glass rounded-full px-10 py-4 font-medium text-base hover:bg-white/10 transition-colors mb-10"
              style={{ fontFamily: 'system-ui, sans-serif', color: heroColor }}
            >
              Let&apos;s Build Something →
            </button>

            {/* Train-stop switcher */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {STOPS.map((s, i) => {
                const active = activeVideo === i
                return (
                  <button
                    key={s.title}
                    onClick={() => switchVideo(i)}
                    className="text-xs sm:text-sm pb-1 border-b-2 transition-all duration-300"
                    style={{
                      fontFamily: 'system-ui, sans-serif',
                      color: heroColor,
                      opacity: active ? 1 : 0.5,
                      borderColor: active ? heroColor : 'transparent',
                      fontWeight: active ? 700 : 400,
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.opacity = '0.8' }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.opacity = '0.5' }}
                  >
                    {s.title}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Bottom stats ─────────────────────────────────────────────── */}
          <div className="pb-8 px-6 flex justify-center">
            <div
              className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center text-white/70 text-xs sm:text-sm"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {STATS.map((s, i) => (
                <span key={s} className="flex items-center gap-3 sm:gap-4">
                  {s}
                  {i < STATS.length - 1 && <span className="hidden sm:inline text-white/30">|</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — PROJECTS DEEP DIVE
      ══════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative min-h-screen bg-black">
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

                {'link' in p && p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-sm mt-4 transition-colors w-fit cursor-pointer inline-block"
                  >
                    {p.link.includes('github.com') ? 'View on GitHub →' : 'Visit live site →'}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — ABOUT
      ══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="relative min-h-screen bg-black flex items-center">
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
                7
              </p>
              <p className="text-white/50 text-sm mt-1">Projects Shipped</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative min-h-screen bg-black flex items-center justify-center">
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
              onClick={goToEmail}
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
