# Juan Fernandez — Portfolio

**Live: [juanfernandez-portfolio.vercel.app](https://juanfernandez-portfolio.vercel.app)**

Personal developer portfolio for Juan Fernandez — AI developer & technical recruiter based in NYC.

## Cycle builds

Four standalone projects. Each row links to the real code repo and live app;
the "Case study" column links to a one-page problem/solution/features writeup
for that cycle, kept in this repo.

| Cycle | Project | What it does | Live | Case study |
|---|---|---|---|---|
| 1 | [VibePath](https://github.com/Tatopapi3/VibePath) | AI app builder paired with a coding curriculum | [Live](https://vibepath-olive.vercel.app) | [cycle-1/](cycle-1/README.md) |
| 2 | [Clean Hour](https://github.com/Tatopapi3/clean-hour) | Real-time grid carbon intensity + pricing across 3 US grids | [Live](https://clean-hour.vercel.app) | — |
| 3 | [TalentFlow](https://github.com/Tatopapi3/talentflow-agent) | Advisory AI agent that pre-screens resumes against a job description | — | — |
| 4 | [Property-OS](https://github.com/MITRAKER/PROPERTY-OS) | Real-estate command center — CSV leads to a ranked morning briefing | [Live](https://property-os-morning-briefing.property-os.workers.dev) | — |

## Pages

- **`/`** — main landing page. The hero is a fullscreen cinematic "train stops" experience: switching between 4 stops crossfades the background video *and* swaps the headline/subtext, walking through the career arc one stop at a time — **Where It Started** (technical recruiting) → **Hackathon Season** (Amplif.ai + SnowAngel wins) → **Building in Production** (shipped projects) → **What's Next**. Below the hero: a projects deep-dive, an about section, and a contact CTA.
- **`/lab`** — an alternate, more editorial experience: full-page scroll sections (Hero, About, Projects, Skills, Experience, Contact) with a different visual language (Instrument Serif + Almarai type, film-grain texture, scroll-triggered reveals).

## Projects showcased

- **Amplif.ai** — hyperlocal NYC neighbor-connection platform, winner of 2 consecutive hackathons
- **SnowAngel** — accessibility-first snow removal marketplace, hackathon winner
- **Property-OS** — real-estate command center turning CSV leads into a ranked morning briefing (Cloudflare Workers, D1, Leaflet, NYC Open Data)
- **VibePath** — AI app builder paired with a structured coding curriculum (Next.js, Claude API, Supabase)
- **Clean Hour** — real-time grid carbon intensity + electricity pricing across 3 US grids (Next.js, EIA Open Data, PWA)
- **TalentFlow** — advisory AI agent that pre-screens resumes against a job description, citing evidence for every match (Python, Claude API, Strands Agents)
- **Moundvisit AI** — AI baseball mechanics coaching (Next.js, Claude API, Supabase, Vercel)

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — scroll-triggered animation and page transitions
- [GSAP](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling
- [Three.js](https://threejs.org/) + [Vanta](https://www.vantajs.com/) — animated background effects
- [lucide-react](https://lucide.dev/) for icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the main page, or
[http://localhost:3000/lab](http://localhost:3000/lab) for the alternate experience.

## Deployment

Deployed on [Vercel](https://vercel.com/), auto-deploying from `main`.
