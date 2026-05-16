import VantaHero from './components/VantaHero'

const projects = [
  {
    name: 'MoundVisit AI',
    year: '2026',
    type: 'Personal Project',
    desc: 'AI-powered baseball mechanics coaching app. Uploads smartphone video for frame-by-frame analysis, compares mechanics to MLB legends, prescribes targeted drills — democratizing elite coaching for underserved athletes.',
    tech: ['Next.js', 'Anthropic Claude API', 'Supabase', 'Vercel'],
    badge: '⚾ Live',
    badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    link: 'https://mound-visit-ai.vercel.app',
  },
  {
    name: 'Amplif.ai',
    year: '2026',
    type: '🏆 Hackathon Winner #2 — Pursuit',
    desc: 'Hyperlocal NYC neighborhood platform using AI to connect neighbors block by block. Features AI matching by skills & hobbies, skill swaps, direct messaging, and community block party coordination.',
    tech: ['React', 'Node.js', 'AI Matching', 'PostgreSQL'],
    badge: '🏆 Won',
    badgeColor: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  },
  {
    name: 'SnowAngel',
    year: '2026',
    type: '🏆 Hackathon Winner #1 — Pursuit',
    desc: 'Accessibility-first snow removal marketplace connecting elderly and disabled neighbors with local helpers. Features a "Vibe Check" filter, glassmorphism UI, animated snowfall, and a friendly Yeti mascot.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express'],
    badge: '🏆 Won',
    badgeColor: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  },
  {
    name: 'The Next Chapter Concierge',
    year: '2026',
    type: 'Freelance Client',
    desc: 'Full production website for a senior transition specialist business. First paid client project built with AI-assisted development workflows — delivered on time and in production.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    badge: '💼 Client',
    badgeColor: 'bg-green-500/15 text-green-400 border-green-500/25',
  },
]

const experience = [
  {
    role: 'AI Copilot Fellow',
    company: 'Pursuit',
    location: 'New York, NY',
    period: 'Mar 2025 – Present',
    bullets: [
      'Highly selective (<5% acceptance) full-stack software engineering program focused on building real-world AI applications.',
      'Mastered JavaScript, React, Node.js, Python, PostgreSQL, REST APIs, and AI integration patterns.',
      'Built and shipped multiple AI-powered products and won 2 internal hackathons.',
    ],
  },
  {
    role: 'Talent Partner',
    company: 'LNplus2 — Technical Recruiting',
    location: '',
    period: 'May 2018 – 2025',
    bullets: [
      'Placed 50+ software engineers and AI practitioners at high-growth startups including Rent the Runway and Splice.',
      'Used AI-driven sourcing tools to increase candidate response rates by 30%, reducing time-to-hire by 25%.',
      'Conducted technical assessments across ML, full-stack, and DevOps roles over six years.',
    ],
  },
  {
    role: 'Technical Recruiter',
    company: 'Arcadia (Renewable Energy)',
    location: '',
    period: 'Apr 2021 – Nov 2021',
    bullets: [
      'Built a team of 15 technologists in 7 months, achieving a 90% offer acceptance rate.',
      'Sourced via GitHub and StackOverflow for a mission-driven clean energy company.',
    ],
  },
  {
    role: 'Technical Recruiter',
    company: 'Chameleon Collective',
    location: '',
    period: 'Aug 2020 – Apr 2021',
    bullets: [
      'Optimized recruiting processes for emerging tech roles across clients including ITX and Thirty Madison.',
      'Reduced sourcing time by 15% through advanced Boolean and AI-assisted methods.',
    ],
  },
]

const skillGroups = [
  {
    label: 'Languages & Frameworks',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL', 'REST APIs', 'Tailwind CSS'],
  },
  {
    label: 'AI & ML Tools',
    skills: ['Anthropic Claude API', 'OpenAI APIs', 'TensorFlow', 'Hugging Face', 'Pinecone (vector DB)'],
  },
  {
    label: 'Dev Tools',
    skills: ['GitHub', 'VS Code', 'Vercel', 'Supabase', 'Figma', 'Canva'],
  },
  {
    label: 'Domain Knowledge',
    skills: ['Labor market analysis', 'AI adoption in hiring', 'ATS systems (Greenhouse, Loxo)', 'Candidate behavior patterns'],
  },
]

export default function Home() {
  return (
    <main className="bg-[#050a14] text-white min-h-screen">

      {/* Hero */}
      <VantaHero />

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
        <p className="section-label">What I've built</p>
        <h2 className="text-4xl font-bold mb-12">Projects</h2>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div
              key={p.name}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 flex flex-col hover:bg-white/[0.07] hover:border-white/[0.14] transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-white font-bold text-lg">{p.name}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{p.type} · {p.year}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${p.badgeColor}`}>
                  {p.badge}
                </span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {t}
                  </span>
                ))}
              </div>

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors"
                >
                  Visit site →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <p className="section-label">Career</p>
        <h2 className="text-4xl font-bold mb-12">Experience</h2>

        <div className="space-y-8">
          {experience.map((e) => (
            <div key={e.role + e.company} className="flex gap-6">
              <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <div className="w-px flex-1 bg-white/[0.06] mt-2" />
              </div>
              <div className="pb-8 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-white font-bold">{e.role}</h3>
                  <span className="text-blue-400 text-sm font-medium">{e.company}</span>
                </div>
                <p className="text-slate-500 text-xs mb-3">{e.period}{e.location ? ` · ${e.location}` : ''}</p>
                <ul className="space-y-1.5">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="text-slate-400 text-sm leading-relaxed flex gap-2">
                      <span className="text-blue-500 mt-1.5 flex-shrink-0">›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <p className="section-label mb-6">Education</p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-white font-semibold">AI Copilot Fellow</span>
              <span className="text-blue-400 text-sm">Pursuit — New York, NY</span>
              <span className="text-slate-500 text-xs ml-auto">Mar 2025 – Present</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-white font-semibold">Computer Science / IT Coursework</span>
              <span className="text-blue-400 text-sm">Queensborough Community College</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <p className="section-label">Toolkit</p>
        <h2 className="text-4xl font-bold mb-12">Skills</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillGroups.map((g) => (
            <div key={g.label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <p className="section-label">Let's talk</p>
        <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl">
          Open to full-stack engineering roles, AI product opportunities, and freelance projects. Fluent in English and Spanish.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:juan.fernandez@pursuit.org"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            ✉ juan.fernandez@pursuit.org
          </a>
          <a
            href="mailto:jc38703@gmail.com"
            className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-slate-300 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
          >
            ✉ jc38703@gmail.com
          </a>
          <a
            href="https://github.com/Tatopapi3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-slate-300 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
          >
            GitHub →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-slate-600 text-sm">
        <p>© 2026 Juan Fernandez · New York, NY · Built with Next.js</p>
      </footer>

    </main>
  )
}
