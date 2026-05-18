'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function WordReveal({ text, className = '', delay = 0, thin = false }:
  { text: string; className?: string; delay?: number; thin?: boolean }) {
  const [go, setGo] = useState(false)
  useEffect(() => { const id = setTimeout(() => setGo(true), delay); return () => clearTimeout(id) }, [delay])
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.22em]">
          <span className={`inline-block animate-word-in ${thin ? 'font-thin' : ''} ${className}`}
            style={{ opacity: 0, animationDelay: go ? `${i * 95}ms` : '99999ms', animationFillMode: 'forwards' }}>
            {w}
          </span>
        </span>
      ))}
    </>
  )
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el: HTMLCanvasElement = canvas
    const ctx = el.getContext('2d')!
    let animId: number
    let t = 0
    const DEG = Math.PI / 180

    const resize = () => { el.width = window.innerWidth; el.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    // Water jet particles
    type Jet = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }
    const jets: Jet[] = []

    function spawnJets(cx: number, baseY: number, R: number) {
      if (Math.random() > 0.35) return
      const angle = Math.random() * Math.PI * 2
      const jx = cx + R * 0.62 * Math.cos(angle)
      jets.push({
        x: jx, y: baseY,
        vx: Math.cos(angle) * (0.25 + Math.random() * 0.45),
        vy: -(1.8 + Math.random() * 2.8),
        life: 0, maxLife: 45 + Math.random() * 35,
      })
    }

    function draw() {
      t += 0.005
      const W = el.width, H = el.height
      const cx = W / 2, cy = H / 2 - H * 0.04
      const R = Math.min(W, H) * 0.27
      const FOV = Math.max(W, H) * 0.9
      const baseY = cy + R * 1.05

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      // Warm glow from fountain base
      const g1 = ctx.createRadialGradient(cx, baseY + R * 0.4, 0, cx, baseY + R * 0.4, R * 1.5)
      g1.addColorStop(0, 'rgba(190, 155, 60, 0.09)')
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H)

      // Ambient steel glow
      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6)
      g2.addColorStop(0, 'rgba(210, 205, 230, 0.05)')
      g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H)

      // Globe Y-axis rotation
      const cosY = Math.cos(t * 0.35), sinY = Math.sin(t * 0.35)

      function project(x3: number, y3: number, z3: number) {
        const rx = x3 * cosY + z3 * sinY
        const rz = -x3 * sinY + z3 * cosY
        const sc = FOV / (FOV + rz)
        return { sx: cx + rx * sc, sy: cy + y3 * sc, depth: (rz + R) / (2 * R) }
      }

      function drawLine(pts: ReturnType<typeof project>[], closed = false, equator = false) {
        const len = pts.length - (closed ? 0 : 1)
        for (let i = 0; i < len; i++) {
          const a = pts[i], b = pts[(i + 1) % pts.length]
          const d = (a.depth + b.depth) / 2
          const alpha = equator ? 0.06 + d * 0.85 : 0.03 + d * 0.52
          ctx.beginPath()
          ctx.moveTo(a.sx, a.sy)
          ctx.lineTo(b.sx, b.sy)
          ctx.strokeStyle = `rgba(205,205,220,${alpha.toFixed(2)})`
          ctx.lineWidth = equator ? 0.5 + d * 1.2 : 0.3 + d * 0.7
          ctx.stroke()
        }
      }

      // ── Latitude lines ───────────────────────────────────────
      for (let lat = -80; lat <= 80; lat += 20) {
        const y3 = R * Math.sin(lat * DEG)
        const rLat = R * Math.cos(lat * DEG)
        const pts = []
        for (let lon = 0; lon <= 360; lon += 5)
          pts.push(project(rLat * Math.cos(lon * DEG), y3, rLat * Math.sin(lon * DEG)))
        drawLine(pts, true, lat === 0)
      }

      // ── Longitude lines ──────────────────────────────────────
      for (let lon = 0; lon < 360; lon += 20) {
        const pts = []
        for (let lat = -90; lat <= 90; lat += 4) {
          const y3 = R * Math.sin(lat * DEG)
          const rLat = R * Math.cos(lat * DEG)
          pts.push(project(rLat * Math.cos(lon * DEG), y3, rLat * Math.sin(lon * DEG)))
        }
        drawLine(pts)
      }

      // ── Orbital rings — the Unisphere signature ──────────────
      // Three rings at Sputnik / Gagarin / Apollo inclinations
      const rings = [
        { tiltX: 28 * DEG, tiltZ:  12 * DEG, r: R * 1.16, sp:  0.18 },
        { tiltX: 62 * DEG, tiltZ: -18 * DEG, r: R * 1.22, sp: -0.10 },
        { tiltX: 84 * DEG, tiltZ:  30 * DEG, r: R * 1.11, sp:  0.22 },
      ]

      for (const ring of rings) {
        const rt = t * ring.sp
        const cosX = Math.cos(ring.tiltX), sinX = Math.sin(ring.tiltX)
        const cosZ = Math.cos(ring.tiltZ), sinZ = Math.sin(ring.tiltZ)
        const cosRt = Math.cos(rt), sinRt = Math.sin(rt)

        const pts = []
        for (let a = 0; a <= 360; a += 3) {
          const rad = a * DEG
          // Ring in XZ plane
          let x = ring.r * Math.cos(rad), y = 0, z = ring.r * Math.sin(rad)
          // Tilt X
          const y2 = y * cosX - z * sinX, z2 = y * sinX + z * cosX
          // Tilt Z
          const x3 = x * cosZ - y2 * sinZ, y3 = x * sinZ + y2 * cosZ
          // Slow independent ring rotation (around Y, separate from globe)
          const xr = x3 * cosRt + z2 * sinRt, zr = -x3 * sinRt + z2 * cosRt
          pts.push(project(xr, y3, zr))
        }

        // Draw ring brighter than globe lines
        const len = pts.length
        for (let i = 0; i < len; i++) {
          const a = pts[i], b = pts[(i + 1) % len]
          const d = (a.depth + b.depth) / 2
          ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy)
          ctx.strokeStyle = `rgba(220,215,235,${(0.05 + d * 0.9).toFixed(2)})`
          ctx.lineWidth = 0.6 + d * 1.4
          ctx.stroke()
        }
      }

      // ── Water jets ───────────────────────────────────────────
      spawnJets(cx, baseY, R)
      for (let i = jets.length - 1; i >= 0; i--) {
        const j = jets[i]
        j.life++; j.x += j.vx; j.y += j.vy; j.vy += 0.07
        const prog = j.life / j.maxLife
        const alpha = (1 - prog) * 0.55
        ctx.beginPath()
        ctx.arc(j.x, j.y, Math.max(0.4, (1 - prog) * 2.2), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(170,210,255,${alpha.toFixed(2)})`
        ctx.fill()
        if (j.life >= j.maxLife) jets.splice(i, 1)
      }

      // ── Support pillars (bottom of Unisphere) ────────────────
      ctx.strokeStyle = 'rgba(180,180,200,0.18)'
      ctx.lineWidth = 0.8
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2 + t * 0.05
        const px = cx + Math.cos(angle) * R * 0.35
        ctx.beginPath()
        ctx.moveTo(px, baseY)
        ctx.lineTo(cx + Math.cos(angle) * R * 0.22, baseY + R * 0.28)
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="snap-section flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <nav className="absolute top-7 left-0 right-0 flex items-center justify-between px-8 z-20">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-bold">JF</span>
        <div className="flex gap-7 text-white/20 text-[10px] font-bold tracking-[0.22em] uppercase">
          {['Projects','Skills','Experience','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white/60 transition-colors">{l}</a>
          ))}
        </div>
      </nav>

      {/* Layout: photo left of center, text right — globe is the background */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6 max-w-5xl w-full"
        style={{ marginTop: '8vh' }}>

        {/* Photo — sits at the base of the globe */}
        <div className="animate-float" style={{ marginBottom: '-1rem' }}>
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden relative"
            style={{ boxShadow: '0 0 50px 18px rgba(245,158,11,0.16), 0 0 100px 36px rgba(180,155,50,0.07)' }}>
            <Image src="/avatar.jpg" alt="Juan Fernandez" fill className="object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement; img.style.display = 'none'
                const p = img.parentElement
                if (p) {
                  p.style.background = 'radial-gradient(circle at 40% 35%, #3d1800, #080300)'
                  p.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:900;color:#f59e0b;letter-spacing:-4px">JF</div>'
                }
              }} />
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 30px rgba(245,158,11,0.08)' }} />
          </div>
        </div>

        {/* Text — below the globe */}
        <div>
          <p className="section-label mb-7">Flushing Meadows, Queens · Pursuit AI Copilot Fellow</p>

          <h1 className="text-display block mb-5" style={{ lineHeight: 0.92 }}>
            <span className="block text-white/20 font-thin" style={{ fontSize: '0.52em', letterSpacing: '0.06em', marginBottom: '0.35em' }}>
              <WordReveal text="6 years recruiting engineers." delay={300} />
            </span>
            <span className="block gradient-text">
              <WordReveal text="Now I" delay={800} />
              <br />
              <WordReveal text="am one." delay={1100} />
            </span>
          </h1>

          <p className="text-white/20 max-w-sm mx-auto mb-9 animate-fade-up"
            style={{ fontSize: 'clamp(0.85rem,1.5vw,1.05rem)', lineHeight: 1.7, fontWeight: 300,
              animationDelay: '1700ms', opacity: 0, animationFillMode: 'forwards' }}>
            Full-stack AI engineer. Building products<br />that didn&apos;t exist yesterday.
          </p>

          <div className="flex gap-3 justify-center animate-fade-up"
            style={{ animationDelay: '1900ms', opacity: 0, animationFillMode: 'forwards' }}>
            <a href="#projects"
              className="bg-white text-black px-8 py-3.5 rounded-full font-black text-sm hover:bg-amber-400 transition-colors tracking-wide">
              See My Work →
            </a>
            <a href="#contact"
              className="border border-white/8 text-white/28 hover:text-white/60 hover:border-white/18 px-8 py-3.5 rounded-full text-sm font-medium transition-all">
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-18">
        <span className="text-[9px] text-white tracking-[0.4em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
