'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useInView, type Transition } from 'framer-motion'
import { Brain, DollarSign, MessageCircle, Trophy, Check, ArrowRight } from 'lucide-react'

/* ─── Constants ─────────────────────────────────────────────────────────── */
const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'

/* ─── Projects ───────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    num: '01', year: '2026',
    title: 'Moundvisit AI',
    Icon: Brain, iconClass: 'text-cyan-400',
    items: [
      'Baseball mechanics coaching powered by AI',
      'Smartphone video upload and analysis',
      'Covers pitching, hitting, fielding and catching',
    ],
  },
  {
    num: '02', year: '2026',
    title: 'NegotiateIQ',
    Icon: DollarSign, iconClass: 'text-emerald-400',
    items: [
      'AI salary negotiation coach',
      'Multi-source RAG over job descriptions',
      'Powered by Claude API and FastAPI',
    ],
  },
  {
    num: '03', year: '2026',
    title: 'HyeoTalk',
    Icon: MessageCircle, iconClass: 'text-purple-400',
    items: [
      'AI-powered Korean language learning',
      'AI conversation partner and grammar explainer',
      'Competing with Duolingo',
    ],
  },
  {
    num: '04', year: '2026',
    title: 'Amplif.ai',
    Icon: Trophy, iconClass: 'text-yellow-400',
    items: [
      'Hyperlocal NYC neighbor-connection platform',
      'Connects people by skills, hobbies and music taste',
      'Won 2 consecutive hackathons',
    ],
  },
] as const

/* ═══════════════════════════════════════════════════════════════════════════
   WORDSPULLUP
═══════════════════════════════════════════════════════════════════════════ */
interface WordsPullUpProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

function WordsPullUp({ text, className = '', delay = 0, duration = 0.8 }: WordsPullUpProps) {
  const words = text.split(' ')
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  }
  const word = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration, ease: [0.16, 1, 0.3, 1] } as Transition,
    },
  }
  return (
    <motion.span variants={container} initial="hidden" animate="visible" className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={word} className="inline-block">{w}</motion.span>
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </motion.span>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL CHARACTER REVEAL
═══════════════════════════════════════════════════════════════════════════ */
interface ScrollRevealProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

function ScrollReveal({ text, className = '', style }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.25'] })
  const [progress, setProgress] = useState(0)

  useEffect(() => scrollYProgress.on('change', setProgress), [scrollYProgress])

  const chars = text.split('')
  const win = Math.ceil(chars.length * 0.07)

  return (
    <div ref={ref} className={className} style={style} aria-label={text}>
      {chars.map((ch, i) => {
        const start = i / chars.length
        const end = Math.min((i + win) / chars.length, 1)
        const opacity =
          progress <= start ? 0.15
          : progress >= end ? 1
          : 0.15 + 0.85 * ((progress - start) / (end - start))
        return (
          <span key={i} style={{ opacity }}>{ch === ' ' ? ' ' : ch}</span>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-5"
      style={{ zIndex: 50, fontFamily: "'Almarai', sans-serif" }}
    >
      <span className="text-[#DEDBC8] text-sm font-medium tracking-wide">
        Juan Fernandez
      </span>

      <div className="hidden md:flex items-center gap-7">
        {[
          { label: 'About',      id: 'about'      },
          { label: 'Projects',   id: 'projects'   },
          { label: 'Skills',     id: 'skills'      },
          { label: 'Experience', id: 'experience' },
          { label: 'Contact',    id: 'contact'    },
        ].map(({ label, id }) => (
          <button
            key={label}
            onClick={() => scrollTo(id)}
            className="text-[#DEDBC8]/40 hover:text-[#DEDBC8] text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer"
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={() => scrollTo('contact')}
        className="border border-[#DEDBC8]/20 hover:border-[#DEDBC8]/60 text-[#DEDBC8] text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-colors cursor-pointer"
      >
        Contact
      </button>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-end" style={{ zIndex: 10 }}>
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 grid grid-cols-12 items-end w-full px-6 pb-8 gap-4">

        {/* Left 8 cols — giant name */}
        <div className="col-span-12 md:col-span-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 } as Transition}
            className="mb-5"
          >
            <span
              className="border border-[#DEDBC8]/20 text-[#DEDBC8]/50 text-[10px] tracking-[0.35em] uppercase px-3 py-1.5"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              AI Development
            </span>
          </motion.div>

          <div
            className="text-[#DEDBC8] leading-[0.88] tracking-tight"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '20vw',
            }}
          >
            <WordsPullUp text="Juan Fernandez" delay={0.45} duration={0.9} />
          </div>
        </div>

        {/* Right 4 cols — description + button */}
        <div
          className="col-span-12 md:col-span-4 flex flex-col gap-4 pb-4"
          style={{ fontFamily: "'Almarai', sans-serif" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' } as Transition}
            className="text-[#DEDBC8]/70 text-sm font-light leading-relaxed"
          >
            an AI developer &amp; technical recruiter. I have skills in AI
            development, technical recruiting, and building products that
            solve real problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' } as Transition}
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 bg-[#DEDBC8] rounded-full pl-5 pr-1 py-1 hover:gap-3 transition-all duration-300 cursor-pointer"
            >
              <span className="text-black font-medium text-sm">View My Work</span>
              <span className="bg-black rounded-full w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                <ArrowRight size={16} className="text-[#DEDBC8]" />
              </span>
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════════════════ */
function About() {
  const headingRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative bg-[#101010] lab-bg-noise px-6 sm:px-10 py-28" style={{ zIndex: 10 }}>
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 } as Transition}
            className="text-[#DEDBC8]/30 text-[10px] tracking-[0.35em] uppercase mb-12"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            // About
          </motion.p>
        </div>

        <ScrollReveal
          text="Over the last 6 years, I have worked as a technical recruiter placing software engineers and AI practitioners at high-growth startups through LN Talent Partners. Now I build AI-powered products informed by ground-level visibility into what engineers and companies actually need."
          className="text-[#DEDBC8] leading-tight"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
          }}
        />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════════════════════ */
interface ProjectCardProps {
  num: string
  year: string
  title: string
  Icon: React.ElementType
  iconClass: string
  items: readonly string[]
  index: number
}

function ProjectCard({ num, year, title, Icon, iconClass, items, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 } as Transition}
      className="bg-[#212121] lab-bg-noise p-8 flex flex-col gap-6 cursor-pointer group hover:bg-[#272727] transition-colors duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="text-[#DEDBC8]/20 text-xs tracking-[0.25em] font-light"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            {num}
          </span>
          <span
            className="text-[#DEDBC8]/20 text-xs tracking-[0.15em] font-light"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            {year}
          </span>
        </div>
        <Icon size={20} className={iconClass} />
      </div>

      <h3
        className="text-[#DEDBC8] leading-tight"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
        }}
      >
        {title}
      </h3>

      <ul className="flex flex-col gap-3 flex-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check size={13} className="text-[#DEDBC8]/50 mt-0.5 shrink-0" strokeWidth={2.5} />
            <span
              className="text-[#DEDBC8]/55 text-sm font-light leading-snug"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      <p
        className="text-[#DEDBC8]/30 group-hover:text-[#DEDBC8]/70 text-xs tracking-[0.15em] uppercase transition-colors duration-300 pt-2 border-t border-[#DEDBC8]/8"
        style={{ fontFamily: "'Almarai', sans-serif" }}
      >
        View Project →
      </p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════════════════════════════════ */
function Projects() {
  const headingRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headingRef, { once: true, margin: '-60px' })
  const card1Ref = useRef<HTMLDivElement>(null)
  const card1InView = useInView(card1Ref, { once: true, margin: '-60px' })

  return (
    <section id="projects" className="relative bg-[#101010] px-6 sm:px-10 py-24" style={{ zIndex: 10 }}>
      <div ref={headingRef} className="max-w-5xl mx-auto mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 } as Transition}
          className="text-[#DEDBC8]/30 text-[10px] tracking-[0.35em] uppercase mb-3"
          style={{ fontFamily: "'Almarai', sans-serif" }}
        >
          // Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 } as Transition}
          className="text-[#DEDBC8] leading-tight tracking-tight"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          }}
        >
          What I&apos;m Building
        </motion.h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 — video */}
        <motion.div
          ref={card1Ref}
          initial={{ opacity: 0, y: 40 }}
          animate={card1InView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' } as Transition}
          className="relative overflow-hidden md:col-span-2 min-h-[340px] sm:min-h-[420px] cursor-pointer group"
        >
          <video
            src={BG_VIDEO}
            autoPlay muted loop playsInline
            crossOrigin="anonymous"
            onError={(e) => console.error('Card video failed:', e)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <p
              className="text-[#DEDBC8] leading-tight"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              }}
            >
              Building at the frontier.
            </p>
          </div>
        </motion.div>

        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.title}
            num={p.num}
            year={p.year}
            title={p.title}
            Icon={p.Icon}
            iconClass={p.iconClass}
            items={p.items}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════════════════════════ */
function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const skills = [
    'AI Development', 'Claude API', 'Next.js', 'React', 'TypeScript',
    'FastAPI', 'Python', 'Supabase', 'RAG Pipelines', 'Technical Recruiting',
    'LLM Prompt Engineering', 'React Native',
  ]

  return (
    <section
      id="skills"
      className="relative bg-[#101010] lab-bg-noise px-6 sm:px-10 py-24 border-t border-[#DEDBC8]/5"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 } as Transition}
          className="text-[#DEDBC8]/30 text-[10px] tracking-[0.35em] uppercase mb-12"
          style={{ fontFamily: "'Almarai', sans-serif" }}
        >
          // Skills
        </motion.p>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.05 } as Transition}
              className="border border-[#DEDBC8]/15 text-[#DEDBC8]/50 text-xs tracking-[0.1em] uppercase px-4 py-2 hover:border-[#DEDBC8]/40 hover:text-[#DEDBC8]/80 transition-colors cursor-default"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPERIENCE
═══════════════════════════════════════════════════════════════════════════ */
function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const roles = [
    { year: '2025–Now', title: 'AI Developer',         company: 'Independent'        },
    { year: '2019–Now', title: 'Technical Recruiter',  company: 'LN Talent Partners' },
    { year: '2026',     title: 'Hackathon Winner × 2', company: 'Amplif.ai · NYC'    },
  ]

  return (
    <section
      id="experience"
      className="relative bg-[#101010] px-6 sm:px-10 py-24 border-t border-[#DEDBC8]/5"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 } as Transition}
          className="text-[#DEDBC8]/30 text-[10px] tracking-[0.35em] uppercase mb-12"
          style={{ fontFamily: "'Almarai', sans-serif" }}
        >
          // Experience
        </motion.p>
        <div className="flex flex-col divide-y divide-[#DEDBC8]/8">
          {roles.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.12 } as Transition}
              className="flex items-center justify-between py-7 gap-4"
            >
              <span
                className="text-[#DEDBC8]/25 text-xs tracking-widest w-20 shrink-0"
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                {r.year}
              </span>
              <span
                className="text-[#DEDBC8] flex-1"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
                }}
              >
                {r.title}
              </span>
              <span
                className="text-[#DEDBC8]/35 text-xs tracking-wide text-right"
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                {r.company}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════════════════ */
function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      className="relative bg-black px-6 sm:px-10 py-32 border-t border-[#DEDBC8]/5"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 } as Transition}
          className="text-[#DEDBC8]/30 text-[10px] tracking-[0.35em] uppercase mb-10"
          style={{ fontFamily: "'Almarai', sans-serif" }}
        >
          // Contact
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 } as Transition}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-12"
        >
          <div>
            <h2
              className="text-[#DEDBC8] leading-[0.95] tracking-tight mb-6"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(3rem, 7vw, 6rem)',
              }}
            >
              Let&apos;s Build<br />Something
            </h2>
            <p
              className="text-[#DEDBC8]/40 text-sm font-light max-w-sm leading-relaxed"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              Open to AI developer roles, freelance projects, and
              collaborations. Based in NYC, building remotely.
            </p>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <a
              href="mailto:juan.fernandez@pursuit.org"
              className="bg-[#DEDBC8] text-[#101010] font-bold text-xs tracking-[0.2em] uppercase px-9 py-4 hover:bg-[#DEDBC8]/90 transition-colors text-center"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              Get In Touch
            </a>
            <div className="flex gap-3 justify-end">
              {[
                { label: 'GitHub',   href: 'https://github.com/Tatopapi3' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-fernandez-336977172/' },
                { label: 'Email',    href: 'mailto:juan.fernandez@pursuit.org' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#DEDBC8]/15 hover:border-[#DEDBC8]/50 text-[#DEDBC8]/40 hover:text-[#DEDBC8] text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 transition-colors"
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 } as Transition}
          className="mt-24 pt-8 border-t border-[#DEDBC8]/8 flex items-center justify-between"
        >
          <span
            className="text-[#DEDBC8]/20 text-sm"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            Juan Fernandez
          </span>
          <span
            className="text-[#DEDBC8]/20 text-xs tracking-widest"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            NYC · 2026
          </span>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function LabPage() {
  // Override globals.css scroll-snap and height so normal scrolling works
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prev = {
      htmlSnap:     html.style.scrollSnapType,
      htmlOverflow: html.style.overflowY,
      htmlHeight:   html.style.height,
      bodyHeight:   body.style.height,
    }
    html.style.scrollSnapType = 'none'
    html.style.overflowY      = 'auto'
    html.style.height         = 'auto'
    body.style.height         = 'auto'
    return () => {
      html.style.scrollSnapType = prev.htmlSnap
      html.style.overflowY      = prev.htmlOverflow
      html.style.height         = prev.htmlHeight
      body.style.height         = prev.bodyHeight
    }
  }, [])

  return (
    <>
      {/* Load fonts scoped to this page */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>

      {/* Film grain */}
      <div className="lab-noise-overlay" />

      {/* Fixed background video — visible only through hero (other sections have solid bg) */}
      <video
        src={BG_VIDEO}
        autoPlay muted loop playsInline
        crossOrigin="anonymous"
        onError={(e) => console.error('BG video failed:', e)}
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  )
}
