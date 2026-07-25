# Juan Fernandez — Portfolio

**Live: [juanfernandez-portfolio.vercel.app](https://juanfernandez-portfolio.vercel.app)**

Personal developer portfolio for Juan Fernandez — AI developer & technical recruiter based in NYC.

## Cycle builds

Four standalone projects, one per Pursuit fellowship cycle. Each row links to
the real code repo and live app; the "Case study" column links to a one-page
problem/solution/features writeup for that cycle, kept in this repo.

| Cycle | Project | What it does | Live | Case study |
|---|---|---|---|---|
| 1 | [VibePath](https://github.com/Tatopapi3/VibePath) | Closes the "AI can generate it" vs. "I actually understand it" gap — builds an app from a prompt, then teaches the concepts behind it | [Live](https://vibepath-olive.vercel.app) | [cycle-1/](cycle-1/README.md) |
| 2 | [Clean Hour](https://github.com/Tatopapi3/clean-hour) | Shows when clean energy is actually worth it — combines real-time grid carbon intensity with live electricity pricing across CA, TX, and NY | [Live](https://clean-hour.vercel.app) | [cycle-2/](cycle-2/README.md) |
| 3 | [TalentFlow](https://github.com/Tatopapi3/talentflow-agent) | Advisory resume-screening agent with a mandatory human checkpoint before any reject — cites evidence, never auto-rejects a candidate | — (runs locally) | [cycle-3/](cycle-3/README.md) |
| 4 | [Property-OS](https://github.com/MITRAKER/PROPERTY-OS) | Real-estate command center — turns a messy CSV lead list into a ranked, evidence-backed "who to contact today" briefing | [Live](https://property-os-morning-briefing.property-os.workers.dev) | [cycle-4/](cycle-4/README.md) |

## Pages

- **`/`** — main landing page. The hero is a fullscreen cinematic "train stops" experience: switching between 4 stops crossfades the background video *and* swaps the headline/subtext, walking through the career arc one stop at a time — **Where It Started** (technical recruiting) → **Hackathon Season** (Amplif.ai + SnowAngel wins) → **Building in Production** (shipped projects) → **What's Next**. Below the hero: a projects deep-dive, an about section, and a contact CTA.
- **`/lab`** — an alternate, more editorial experience: full-page scroll sections (Hero, About, Projects, Skills, Experience, Contact) with a different visual language (Instrument Serif + Almarai type, film-grain texture, scroll-triggered reveals).
- **`/experiments`** — a gallery of earlier hero prototypes kept around rather than deleted: a dark/light toggle (canvas blob animation vs. a Three.js particle sphere), a hand-rolled canvas aurora animation, and a mouse-reactive Three.js particle orb.

## Other projects showcased

The site's Projects section also features work outside the four cycle
builds above:

- **Amplif.ai** — hyperlocal NYC neighbor-connection platform, winner of 2 consecutive hackathons
- **SnowAngel** — accessibility-first snow removal marketplace, hackathon winner
- **Moundvisit AI** — AI baseball mechanics coaching for developing pitchers (Next.js, Claude API, Supabase, Vercel)

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — scroll-triggered animation and page transitions
- [Three.js](https://threejs.org/) — the particle-sphere and particle-orb effects on `/experiments`
- [lucide-react](https://lucide.dev/) for icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the main page,
[http://localhost:3000/lab](http://localhost:3000/lab) for the alternate experience, or
[http://localhost:3000/experiments](http://localhost:3000/experiments) for the hero prototypes.

## Deployment

Deployed on [Vercel](https://vercel.com/), auto-deploying from `main`.
