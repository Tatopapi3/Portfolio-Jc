'use client'

import { useEffect, useRef } from 'react'

interface Props { onSwitch: () => void }

export default function HeroLight({ onSwitch }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let animId: number
    let renderer: import('three').WebGLRenderer | null = null

    async function init() {
      const THREE = await import('three')
      if (!el) return

      const W = el.clientWidth, H = el.clientHeight

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0xf4f4f8, 1)
      el.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
      camera.position.z = 3.8

      // Fibonacci sphere distribution — evenly spaced particles
      const N = 4500
      const positions = new Float32Array(N * 3)
      const golden = Math.PI * (1 + Math.sqrt(5))
      for (let i = 0; i < N; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / N)
        const theta = golden * i
        positions[i * 3]     = Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = Math.cos(phi)
        positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta)
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const mat = new THREE.PointsMaterial({
        color: 0x6366f1,
        size: 0.013,
        transparent: true,
        opacity: 0.65,
        sizeAttenuation: true,
      })

      const sphere = new THREE.Points(geo, mat)
      scene.add(sphere)

      // Subtle ambient fog
      scene.fog = new THREE.FogExp2(0xf4f4f8, 0.18)

      const handleResize = () => {
        if (!el || !renderer) return
        const W = el.clientWidth, H = el.clientHeight
        camera.aspect = W / H
        camera.updateProjectionMatrix()
        renderer.setSize(W, H)
      }
      window.addEventListener('resize', handleResize)

      let t = 0
      function animate() {
        animId = requestAnimationFrame(animate)
        t += 0.005
        sphere.rotation.y = t * 0.4
        sphere.rotation.x = Math.sin(t * 0.15) * 0.2
        renderer!.render(scene, camera)
      }
      animate()

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', handleResize)
        renderer?.dispose()
        if (el.contains(renderer!.domElement)) el.removeChild(renderer!.domElement)
      }
    }

    let cleanup: (() => void) | undefined
    init().then(fn => { cleanup = fn })
    return () => { cleanup?.(); cancelAnimationFrame(animId) }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[#f4f4f8]">
      <div ref={mountRef} className="absolute inset-0" />

      {/* Style toggle */}
      <button
        onClick={onSwitch}
        className="absolute top-5 right-6 z-20 text-xs font-semibold px-3 py-1.5 rounded-full bg-black/8 hover:bg-black/14 border border-black/10 text-slate-500 hover:text-slate-800 transition-all"
      >
        ◑ Dark mode
      </button>

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <span className="font-bold text-slate-800 text-sm tracking-widest uppercase">JF</span>
        <div className="flex items-center gap-6 text-sm text-slate-500 mr-28">
          {['#projects','#experience','#skills','#contact'].map(h => (
            <a key={h} href={h} className="hover:text-slate-900 transition-colors capitalize">{h.slice(1)}</a>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 mb-4">
          AI Builder · Technical Recruiter · New York, NY
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-slate-900">
          Juan<br />
          <span style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Fernandez
          </span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          AI builder and technical recruiter with 6 years placing engineers at high-growth startups.
          Now shipping AI-powered products through Pursuit&apos;s AI Copilot program.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-indigo-200">
            View Projects
          </a>
          <a href="#contact" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm">
            Get in Touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f4f8] to-transparent z-10" />
    </div>
  )
}
