'use client'

import { useEffect, useRef } from 'react'

// Simplified continent outlines [lat, lon]
const CONTINENTS: [number, number][][] = [
  // Continental United States (lats negated so north renders above equator)
  [[-48.5,-124.7],[-46.2,-124.0],[-42.0,-124.5],[-37.8,-122.5],
   [-34.4,-120.5],[-32.7,-117.2],[-32.5,-114.7],[-32.0,-111.0],
   [-31.7,-106.5],[-29.7,-104.0],[-26.0,-97.4],[-27.8,-97.1],
   [-29.4,-94.7],[-29.9,-93.8],[-29.7,-92.5],[-29.2,-89.4],
   [-30.2,-88.0],[-30.5,-87.8],[-30.3,-86.5],[-29.5,-85.5],
   [-29.5,-83.0],[-28.0,-82.8],[-26.9,-82.2],[-25.8,-80.2],
   [-27.5,-80.3],[-29.1,-80.7],[-30.4,-81.4],[-31.5,-81.1],
   [-32.1,-80.8],[-33.8,-78.5],[-35.2,-75.5],[-36.6,-76.0],
   [-37.0,-76.0],[-38.0,-75.4],[-38.5,-75.1],[-39.5,-74.3],
   [-40.7,-74.0],[-41.3,-72.1],[-41.5,-71.3],[-42.4,-70.9],
   [-43.9,-69.6],[-44.8,-67.0],[-47.4,-67.4],[-47.0,-69.2],
   [-45.0,-73.3],[-44.0,-76.8],[-43.6,-76.5],[-43.2,-79.1],
   [-42.9,-79.0],[-42.7,-82.0],[-42.0,-83.1],[-41.7,-83.3],
   [-41.7,-86.5],[-42.5,-87.5],[-42.6,-90.4],[-43.5,-91.2],
   [-46.7,-92.1],[-49.0,-95.2],[-49.0,-104.0],[-49.0,-111.0],
   [-49.0,-116.5],[-48.9,-123.2],[-48.5,-124.7]],
  // Canada
  [[-47.4,-67.4],[-50,-64],[-52,-55],[-56,-60],[-60,-64],[-63,-78],
   [-65,-84],[-68,-90],[-70,-80],[-72,-78],[-72,-95],[-72,-112],
   [-72,-142],[-60,-142],[-54,-132],[-50,-126],[-49,-123],
   [-49,-95],[-49,-70],[-48,-69],[-47.4,-67.4]],
  // South America (lats negated)
  [[-12,-73],[-8,-60],[-5,-52],[0,-50],[5,-35],[8,-35],
   [23,-43],[33,-52],[38,-57],[42,-63],[55,-65],
   [55,-68],[50,-75],[42,-73],[30,-71],[18,-70],
   [5,-80],[0,-80],[-8,-77],[-12,-73]],
  // Europe (lats negated)
  [[-71,26],[-60,5],[-51,2],[-48,0],[-43,-9],[-38,-9],[-36,-6],
   [-36,0],[-36,15],[-37,25],[-42,28],[-48,37],[-55,22],
   [-58,12],[-60,5],[-65,14],[-70,26],[-71,26]],
  // Africa (lats negated)
  [[-37,-5],[-37,10],[-31,32],[-22,37],[-12,44],[-10,44],
   [0,42],[10,40],[25,35],[35,27],[34,18],
   [30,17],[15,12],[5,9],[0,9],[-5,-5],[-5,-8],
   [-14,-17],[-20,-17],[-27,-13],[-37,-5]],
  // Asia (lats negated)
  [[-72,30],[-72,100],[-72,141],[-62,165],[-55,162],
   [-45,142],[-35,128],[-22,118],[-20,110],[-10,104],
   [-5,102],[-10,80],[-8,77],[-22,68],[-24,57],
   [-12,44],[-22,38],[-30,32],[-37,37],[-42,50],
   [-45,60],[-55,65],[-60,60],[-65,75],[-72,80],[-72,30]],
  // Australia (lats negated — was southern hemisphere, now northern half of globe)
  [[15,129],[22,114],[32,115],[35,117],
   [38,140],[39,147],[38,148],[32,152],
   [25,153],[16,146],[12,136],[15,129]],
  // Greenland (lats negated)
  [[-60,-45],[-65,-52],[-70,-53],[-76,-65],[-83,-30],[-83,-20],
   [-78,-18],[-70,-22],[-60,-45]],
]

type TreeSpec = { x: number; h: number; kind: number }
function makeTrees(W: number): TreeSpec[] {
  const out: TreeSpec[] = []
  for (let i = 0; i < 12; i++)
    out.push({ x: (i / 12) * W * 0.30 + W * 0.005, h: 50 + (i * 19 + 37) % 70, kind: (i * 7) % 3 })
  for (let i = 0; i < 12; i++)
    out.push({ x: W * 0.695 + (i / 12) * W * 0.295, h: 46 + (i * 23 + 53) % 72, kind: (i * 11) % 3 })
  return out
}

export default function HeroSection({
  isDark, setIsDark,
}: {
  isDark: boolean
  setIsDark: (fn: (v: boolean) => boolean) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el: HTMLCanvasElement = canvas
    const ctx = el.getContext('2d')!
    let animId: number
    let t = 0
    const DEG = Math.PI / 180

    let trees: TreeSpec[] = []
    const resize = () => {
      el.width = window.innerWidth
      el.height = window.innerHeight
      trees = makeTrees(el.width)
    }
    resize()
    window.addEventListener('resize', resize)

    type Jet = { x: number; y: number; vx: number; vy: number; life: number; max: number }
    const jets: Jet[] = []
    type Fly = { x: number; y: number; vx: number; vy: number; phase: number; bright: number }
    const flies: Fly[] = Array.from({ length: 35 }, () => ({
      x: Math.random(), y: 0.72 + Math.random() * 0.26,
      vx: (Math.random() - 0.5) * 0.00012, vy: (Math.random() - 0.5) * 0.00008,
      phase: Math.random() * Math.PI * 2, bright: 0.15 + Math.random() * 0.3,
    }))

    function draw() {
      t += 0.005
      const W = el.width, H = el.height
      const cx = W / 2, cy = H * 0.35
      const R = Math.min(W, H) * 0.24
      const FOV = Math.max(W, H) * 0.9
      const waterY = cy + R * 1.14

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, waterY)
      sky.addColorStop(0, 'rgba(2,3,12,1)')
      sky.addColorStop(1, 'rgba(4,8,22,1)')
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, waterY)

      // Horizon purple glow
      const hor = ctx.createRadialGradient(cx, waterY, 0, cx, waterY, W * 0.6)
      hor.addColorStop(0, 'rgba(35,25,75,0.14)'); hor.addColorStop(1, 'transparent')
      ctx.fillStyle = hor; ctx.fillRect(0, 0, W, waterY)

      // Fountain warm lamp glow
      const lamp = ctx.createRadialGradient(cx, waterY + R * 0.3, 0, cx, waterY + R * 0.3, R * 1.7)
      lamp.addColorStop(0, 'rgba(195,158,50,0.11)'); lamp.addColorStop(1, 'transparent')
      ctx.fillStyle = lamp; ctx.fillRect(0, 0, W, H)

      // ── Globe rotation ─────────────────────────────────────
      const cosY = Math.cos(t * 0.32 - 2.86), sinY = Math.sin(t * 0.32 - 2.86)

      function project(x3: number, y3: number, z3: number) {
        const rx = x3 * cosY + z3 * sinY
        const rz = -x3 * sinY + z3 * cosY
        const sc = FOV / (FOV + rz)
        return { sx: cx + rx * sc, sy: cy + y3 * sc, depth: (rz + R) / (2 * R) }
      }

      function latLon(lat: number, lon: number, r: number) {
        const lr = lat * DEG, lo = lon * DEG
        return project(r * Math.cos(lr) * Math.cos(lo), r * Math.sin(lr), r * Math.cos(lr) * Math.sin(lo))
      }

      // Draw one segment + water reflection
      function seg(
        a: ReturnType<typeof project>, b: ReturnType<typeof project>,
        baseA: number, baseW: number, continent = false
      ) {
        const d = (a.depth + b.depth) / 2
        const alpha = Math.min(baseA + d * (continent ? 0.82 : 0.55), 0.95)
        const lw = baseW + d * (continent ? 1.4 : 0.8)
        ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy)
        ctx.strokeStyle = continent
          ? `rgba(220,214,232,${alpha.toFixed(2)})`
          : `rgba(208,208,222,${alpha.toFixed(2)})`
        ctx.lineWidth = lw; ctx.stroke()

        // Reflect
        if (a.sy < waterY || b.sy < waterY) {
          const wx = (sx: number, sy: number) => sx + Math.sin(sx * 0.04 + t * 2.3) * 3.5 + Math.sin(sy * 0.06 + t * 1.0) * 1.5
          const wy = (sy: number) => waterY + (waterY - sy) + Math.sin(sy * 0.05 + t * 1.7) * 2
          const rax = wx(a.sx, a.sy), ray = wy(a.sy)
          const rbx = wx(b.sx, b.sy), rby = wy(b.sy)
          if (ray > waterY && rby > waterY) {
            ctx.beginPath(); ctx.moveTo(rax, ray); ctx.lineTo(rbx, rby)
            ctx.strokeStyle = continent
              ? `rgba(120,175,240,${(alpha * 0.28).toFixed(2)})`
              : `rgba(100,160,230,${(alpha * 0.20).toFixed(2)})`
            ctx.lineWidth = lw * 0.5; ctx.stroke()
          }
        }
      }

      // ── Latitude lines ────────────────────────────────────
      for (let lat = -80; lat <= 80; lat += 20) {
        const y3 = R * Math.sin(lat * DEG), rL = R * Math.cos(lat * DEG)
        const pts = []
        for (let lon = 0; lon <= 360; lon += 5)
          pts.push(project(rL * Math.cos(lon * DEG), y3, rL * Math.sin(lon * DEG)))
        const len = pts.length - 1
        for (let i = 0; i < len; i++) seg(pts[i], pts[(i+1)%pts.length], lat === 0 ? 0.08 : 0.02, lat === 0 ? 0.6 : 0.25)
      }

      // ── Longitude lines ───────────────────────────────────
      for (let lon = 0; lon < 360; lon += 20) {
        const pts = []
        for (let lat = -90; lat <= 90; lat += 4) {
          const y3 = R * Math.sin(lat * DEG), rL = R * Math.cos(lat * DEG)
          pts.push(project(rL * Math.cos(lon * DEG), y3, rL * Math.sin(lon * DEG)))
        }
        for (let i = 0; i < pts.length - 1; i++) seg(pts[i], pts[i+1], 0.02, 0.25)
      }

      // ── Continent outlines (slightly raised at R*1.005) ──
      for (const cont of CONTINENTS) {
        const pts = cont.map(([la, lo]) => latLon(la, lo, R * 1.006))
        const avgDepth = pts.reduce((s, p) => s + p.depth, 0) / pts.length

        // Subtle fill — metallic continent sheen
        ctx.beginPath()
        pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy) })
        ctx.closePath()
        ctx.fillStyle = `rgba(215,210,230,${(avgDepth * 0.11).toFixed(2)})`
        ctx.fill()

        // Outline with reflection
        const len = pts.length
        for (let i = 0; i < len; i++) seg(pts[i], pts[(i+1) % len], 0.06, 0.6, true)
      }

      // ── Orbital rings ─────────────────────────────────────
      const ringDefs = [
        { tx: 28*DEG, tz:  12*DEG, r: R*1.17, sp:  0.18 },
        { tx: 62*DEG, tz: -18*DEG, r: R*1.23, sp: -0.10 },
        { tx: 84*DEG, tz:  30*DEG, r: R*1.12, sp:  0.22 },
      ]
      for (const rd of ringDefs) {
        const rt = t * rd.sp
        const cosX=Math.cos(rd.tx),sinX=Math.sin(rd.tx),cosZ=Math.cos(rd.tz),sinZ=Math.sin(rd.tz)
        const cosRt=Math.cos(rt),sinRt=Math.sin(rt)
        const pts = []
        for (let a = 0; a <= 360; a += 3) {
          const rad = a * DEG
          let x=rd.r*Math.cos(rad), y=0, z=rd.r*Math.sin(rad)
          const y2=y*cosX-z*sinX, z2=y*sinX+z*cosX
          const x3=x*cosZ-y2*sinZ, y3=x*sinZ+y2*cosZ
          const xr=x3*cosRt+z2*sinRt, zr=-x3*sinRt+z2*cosRt
          pts.push(project(xr, y3, zr))
        }
        for (let i = 0; i < pts.length; i++) {
          const a=pts[i], b=pts[(i+1)%pts.length], d=(a.depth+b.depth)/2
          ctx.beginPath(); ctx.moveTo(a.sx,a.sy); ctx.lineTo(b.sx,b.sy)
          ctx.strokeStyle=`rgba(225,220,238,${(0.04+d*0.92).toFixed(2)})`
          ctx.lineWidth=0.5+d*1.6; ctx.stroke()
          // Ring reflection
          if (a.sy < waterY || b.sy < waterY) {
            const wx=(sx:number)=>sx+Math.sin(sx*0.04+t*2.3)*3.5
            const wy=(sy:number)=>waterY+(waterY-sy)+Math.sin(sy*0.05+t*1.7)*2
            const rax=wx(a.sx),ray=wy(a.sy),rbx=wx(b.sx),rby=wy(b.sy)
            if (ray>waterY&&rby>waterY){
              ctx.beginPath();ctx.moveTo(rax,ray);ctx.lineTo(rbx,rby)
              ctx.strokeStyle=`rgba(120,180,248,${(0.04+d*0.92*0.28).toFixed(2)})`
              ctx.lineWidth=(0.5+d*1.6)*0.5;ctx.stroke()
            }
          }
        }
      }

      // ── NYC Landmarks (SoL + ESB + Yankee Stadium) ───────────
      {
        const nyPt = latLon(-40.7, -74.0, R * 1.015)
        const d = nyPt.depth
        if (d > 0.32 && nyPt.sy < waterY - 4) {
          const nx = nyPt.sx, ny = nyPt.sy
          const hs = R * 0.26 * (0.55 + d * 0.45)
          const alpha = Math.min((d - 0.32) / 0.22, 1) * 0.88
          const baseY = ny + hs * 0.06

          // Ambient amber glow
          const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, hs * 1.4)
          glow.addColorStop(0, `rgba(245,158,11,${(alpha * 0.16).toFixed(2)})`)
          glow.addColorStop(1, 'transparent')
          ctx.fillStyle = glow
          ctx.fillRect(nx - hs * 1.4, ny - hs * 1.4, hs * 2.8, hs * 2.8)

          const fill  = `rgba(238,228,205,${alpha.toFixed(2)})`
          const bright= `rgba(255,248,230,${alpha.toFixed(2)})`

          // ── EMPIRE STATE BUILDING (center) ───────────────────
          {
            const ex = nx + hs * 0.28
            const eH = hs * 1.08
            ctx.fillStyle = fill
            // Art Deco setbacks: [cumulative height fraction, half-width fraction]
            const steps: [number,number][] = [
              [0.00, 0.155],[0.18, 0.155],
              [0.18, 0.112],[0.38, 0.112],
              [0.38, 0.082],[0.58, 0.082],
              [0.58, 0.056],[0.72, 0.056],
              [0.72, 0.038],[0.83, 0.038],
              [0.83, 0.026],[0.90, 0.026],
            ]
            for (let i = 0; i < steps.length; i += 2) {
              const [y0, w0] = steps[i], [y1] = steps[i+1]
              ctx.fillRect(ex - eH*w0, baseY - eH*y1, eH*w0*2, eH*(y1-y0))
            }
            // Mooring mast
            ctx.fillRect(ex - eH*0.013, baseY - eH*0.96, eH*0.026, eH*0.06)
            // Spire
            ctx.beginPath()
            ctx.moveTo(ex - eH*0.009, baseY - eH*0.96)
            ctx.lineTo(ex, baseY - eH*1.08)
            ctx.lineTo(ex + eH*0.009, baseY - eH*0.96)
            ctx.closePath(); ctx.fill()
          }

          // ── STATUE OF LIBERTY (left) ──────────────────────────
          {
            const sx = nx - hs * 0.38
            const sH = hs * 0.86
            ctx.fillStyle = fill
            // Star-fort base (wide flat)
            ctx.fillRect(sx - sH*0.28, baseY - sH*0.05, sH*0.56, sH*0.05)
            // Pedestal tier 1
            ctx.fillRect(sx - sH*0.22, baseY - sH*0.17, sH*0.44, sH*0.12)
            // Pedestal tier 2
            ctx.fillRect(sx - sH*0.15, baseY - sH*0.35, sH*0.30, sH*0.18)
            // Statue robe (flowing, tapered)
            ctx.beginPath()
            ctx.moveTo(sx - sH*0.15, baseY - sH*0.35)
            ctx.lineTo(sx - sH*0.13, baseY - sH*0.44)
            ctx.lineTo(sx - sH*0.075, baseY - sH*0.62)
            ctx.lineTo(sx - sH*0.052, baseY - sH*0.70)
            ctx.lineTo(sx + sH*0.052, baseY - sH*0.70)
            ctx.lineTo(sx + sH*0.075, baseY - sH*0.62)
            ctx.lineTo(sx + sH*0.13,  baseY - sH*0.44)
            ctx.lineTo(sx + sH*0.15,  baseY - sH*0.35)
            ctx.closePath(); ctx.fill()
            // Head
            ctx.beginPath()
            ctx.arc(sx, baseY - sH*0.76, sH*0.058, 0, Math.PI*2)
            ctx.fill()
            // Crown — 7 radiating rays
            ctx.strokeStyle = bright
            ctx.lineWidth = Math.max(1.0, sH*0.022)
            for (let k = -3; k <= 3; k++) {
              const ang = (k * 21 - 90) * Math.PI / 180
              ctx.beginPath()
              ctx.moveTo(sx + Math.cos(ang)*sH*0.065, baseY - sH*0.76 + Math.sin(ang)*sH*0.065)
              ctx.lineTo(sx + Math.cos(ang)*sH*0.125, baseY - sH*0.76 + Math.sin(ang)*sH*0.125)
              ctx.stroke()
            }
            // Raised torch arm (right side, angled up)
            ctx.strokeStyle = fill
            ctx.lineWidth = Math.max(1.5, sH*0.042)
            ctx.beginPath()
            ctx.moveTo(sx + sH*0.052, baseY - sH*0.68)
            ctx.lineTo(sx + sH*0.21,  baseY - sH*0.90)
            ctx.stroke()
            // Torch handle
            ctx.fillStyle = fill
            ctx.fillRect(sx + sH*0.195, baseY - sH*0.925, sH*0.028, sH*0.06)
            // Torch flame
            const flame = ctx.createRadialGradient(sx+sH*0.21, baseY-sH*1.00, 0, sx+sH*0.21, baseY-sH*1.00, sH*0.055)
            flame.addColorStop(0,   `rgba(255,220,40,${alpha.toFixed(2)})`)
            flame.addColorStop(0.5, `rgba(245,140,20,${(alpha*0.7).toFixed(2)})`)
            flame.addColorStop(1,   'transparent')
            ctx.fillStyle = flame
            ctx.fillRect(sx+sH*0.155, baseY-sH*1.055, sH*0.11, sH*0.11)
            ctx.fillStyle = fill
          }

        }
      }

      // ── Water surface ─────────────────────────────────────
      const water = ctx.createLinearGradient(0, waterY, 0, H)
      water.addColorStop(0, 'rgba(4,10,28,0.90)'); water.addColorStop(1, 'rgba(2,5,16,0.97)')
      ctx.fillStyle = water; ctx.fillRect(0, waterY, W, H - waterY)

      for (let wy = waterY + 2; wy < H; wy += 5) {
        const a = 0.012 + 0.015 * Math.sin(wy * 0.12 + t * 1.8)
        ctx.fillStyle = wy < waterY + R * 0.9 ? `rgba(115,185,255,${a.toFixed(3)})` : `rgba(55,95,155,${(a*0.4).toFixed(3)})`
        ctx.fillRect(0, wy, W, 2)
      }
      // Surface edge glow
      const edge = ctx.createLinearGradient(0, waterY-2, 0, waterY+20)
      edge.addColorStop(0,'rgba(130,200,255,0.24)'); edge.addColorStop(1,'transparent')
      ctx.fillStyle=edge; ctx.fillRect(0,waterY-2,W,22)

      // ── Water jets ────────────────────────────────────────
      if (Math.random()<0.3) {
        const a=Math.random()*Math.PI*2
        jets.push({x:cx+R*0.6*Math.cos(a),y:waterY,vx:Math.cos(a)*(0.28+Math.random()*.42),vy:-(1.6+Math.random()*2.6),life:0,max:45+Math.random()*35})
      }
      for (let i=jets.length-1;i>=0;i--){
        const j=jets[i]; j.life++;j.x+=j.vx;j.y+=j.vy;j.vy+=0.07
        const pr=j.life/j.max
        ctx.beginPath();ctx.arc(j.x,j.y,Math.max(0.4,(1-pr)*2),0,Math.PI*2)
        ctx.fillStyle=`rgba(170,215,255,${((1-pr)*.55).toFixed(2)})`;ctx.fill()
        if(j.life>=j.max)jets.splice(i,1)
      }

      // ── Tree silhouettes ──────────────────────────────────
      ctx.fillStyle = 'rgba(1,3,7,0.98)'
      for (const tr of trees) {
        const { x: bx, h, kind } = tr
        if (kind === 0) {
          const crownR = h * 0.40
          ctx.fillRect(bx - h*.045, H - h*.32, h*.09, h*.32)
          ctx.beginPath(); ctx.arc(bx, H - h*.32 - crownR*.6, crownR, 0, Math.PI*2); ctx.fill()
        } else if (kind === 1) {
          for (let lv=0;lv<3;lv++){
            const lh=h*(0.42-lv*.08),lw=h*(0.32-lv*.06),ly=H-h*(0.18+lv*.25)
            ctx.beginPath();ctx.moveTo(bx,ly-lh);ctx.lineTo(bx-lw,ly);ctx.lineTo(bx+lw,ly);ctx.closePath();ctx.fill()
          }
          ctx.fillRect(bx-h*.04,H-h*.18,h*.08,h*.18)
        } else {
          ctx.beginPath()
          ctx.moveTo(bx,H-h)
          ctx.bezierCurveTo(bx+h*.35,H-h*.85,bx+h*.45,H-h*.45,bx+h*.3,H-h*.08)
          ctx.lineTo(bx-h*.3,H-h*.08)
          ctx.bezierCurveTo(bx-h*.45,H-h*.45,bx-h*.35,H-h*.85,bx,H-h)
          ctx.fill()
        }
      }

      // ── Fireflies ─────────────────────────────────────────
      for (const f of flies) {
        f.x=(f.x+f.vx+1)%1; f.y=(f.y+f.vy+1)%1
        const alpha=f.bright*(0.4+0.6*Math.sin(t*2.8+f.phase))
        const fx=f.x*W, fy=f.y*H
        if (fy>waterY+15) {
          ctx.beginPath();ctx.arc(fx,fy,1.1,0,Math.PI*2)
          ctx.fillStyle=`rgba(200,240,155,${(alpha*.55).toFixed(2)})`;ctx.fill()
          const gf=ctx.createRadialGradient(fx,fy,0,fx,fy,5)
          gf.addColorStop(0,`rgba(180,230,120,${(alpha*.16).toFixed(2)})`);gf.addColorStop(1,'transparent')
          ctx.fillStyle=gf;ctx.beginPath();ctx.arc(fx,fy,5,0,Math.PI*2);ctx.fill()
        }
      }

      // ── "FLUSHING MEADOWS · QUEENS, NY" in the pool ──────
      ctx.save()
      ctx.font=`600 ${Math.max(9,Math.round(H*.011))}px var(--font-outfit,system-ui)`
      ctx.textAlign='center'; ctx.letterSpacing='0.28em'
      ctx.fillStyle=`rgba(95,160,215,${(0.10+0.04*Math.sin(t*.5)).toFixed(2)})`
      ctx.fillText('FLUSHING MEADOWS · QUEENS, NY', cx, waterY + R*.55)
      ctx.restore()

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const warm = !isDark

  return (
    <section className="snap-section flex items-center justify-center">
      {/* Canvas: invert+hue-rotate in light mode to flip dark→light while preserving colors */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
        style={{ transition: 'filter 1200ms ease', filter: warm ? 'invert(1) hue-rotate(180deg) sepia(0.15) brightness(0.92)' : 'none' }} />

      {/* Subtle warm atmospheric glow on top — not opaque */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms]"
        style={{
          opacity: warm ? 1 : 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 44%, rgba(251,191,36,0.22) 0%, rgba(245,158,11,0.10) 38%, transparent 72%)',
          zIndex: 2,
        }}
      />

      <nav className="absolute top-7 left-0 right-0 flex items-center justify-between px-8 z-20">
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold transition-colors duration-700"
          style={{ color: warm ? 'rgba(100,60,5,0.55)' : 'rgba(255,255,255,0.22)' }}>JF</span>

        <div className="flex items-center gap-7">
          <div className="flex gap-7 text-[10px] font-bold tracking-[0.22em] uppercase">
            {['Projects','Skills','Experience','Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="transition-colors duration-700 hover:opacity-80"
                style={{ color: warm ? 'rgba(100,60,5,0.4)' : 'rgba(255,255,255,0.17)' }}>
                {l}
              </a>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(d => !d)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700 hover:scale-110"
            style={{
              background: warm ? 'rgba(120,70,5,0.12)' : 'rgba(255,255,255,0.06)',
              border: warm ? '1px solid rgba(120,70,5,0.18)' : '1px solid rgba(255,255,255,0.10)',
            }}
            title={isDark ? 'Switch to warm' : 'Switch to dark'}
          >
            <span className="text-[13px] transition-all duration-500" style={{ filter: 'none' }}>
              {isDark ? '☀' : '🌙'}
            </span>
          </button>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center gap-7 text-center px-6 max-w-5xl w-full"
        style={{ marginTop: '-10vh' }}>
        <div className="animate-float">
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden relative"
            style={{ boxShadow: warm
              ? '0 0 50px 18px rgba(195,120,20,0.22), 0 0 90px 30px rgba(180,100,10,0.10)'
              : '0 0 50px 18px rgba(195,158,50,0.18), 0 0 100px 36px rgba(180,100,30,0.08)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.png" alt="Juan Fernandez"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 45%' }} />
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 30px rgba(195,155,45,0.10)' }} />
          </div>
        </div>

        <div>
          <p className="section-label mb-7" style={{ color: warm ? '#b45309' : undefined }}>
            Pursuit AI Copilot Fellow
          </p>
          <h1 className="text-display block mb-5" style={{ lineHeight: 0.92 }}>
            <span className="block animate-fade-up"
              style={{ animationDelay:'300ms', opacity:0, animationFillMode:'forwards' }}>
              <span className={`block ${isDark ? 'gradient-text' : 'chrome-text'}`}>
                AI Builder.
              </span>
            </span>
            <span className="block font-thin animate-fade-up transition-colors duration-700"
              style={{ fontSize:'0.44em', letterSpacing:'0.04em', marginTop:'0.45em',
                color: warm ? 'rgba(100,60,5,0.45)' : 'rgba(255,255,255,0.22)',
                animationDelay:'700ms', opacity:0, animationFillMode:'forwards' }}>
              6 years of recruiting experience.
            </span>
          </h1>
          <p className="max-w-xs mx-auto mb-9 animate-fade-up transition-colors duration-700"
            style={{ fontSize:'clamp(0.82rem,1.4vw,1rem)', lineHeight:1.75, fontWeight:300,
              color: warm ? 'rgba(100,60,5,0.38)' : 'rgba(255,255,255,0.17)',
              animationDelay:'1700ms', opacity:0, animationFillMode:'forwards' }}>
            Full-stack AI engineer.<br />Building products that didn&apos;t exist yesterday.
          </p>
          <div className="flex gap-3 justify-center animate-fade-up"
            style={{ animationDelay:'1900ms', opacity:0, animationFillMode:'forwards' }}>
            <a href="#projects"
              className="px-8 py-3.5 rounded-full font-black text-sm transition-all duration-700 tracking-wide"
              style={{
                background: warm ? '#1a0f00' : '#fff',
                color: warm ? '#f5e0b0' : '#000',
              }}>
              See My Work →
            </a>
            <a href="#contact"
              className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-700"
              style={{
                border: warm ? '1px solid rgba(100,60,5,0.18)' : '1px solid rgba(255,255,255,0.07)',
                color: warm ? 'rgba(100,60,5,0.45)' : 'rgba(255,255,255,0.22)',
              }}>
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-15">
        <span className="text-[9px] tracking-[0.4em] transition-colors duration-700"
          style={{ color: warm ? '#5a3500' : '#fff' }}>SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-current to-transparent" />
      </div>
    </section>
  )
}
