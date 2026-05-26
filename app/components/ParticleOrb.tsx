'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Props {
  isDark: boolean
}

export default function ParticleOrb({ isDark }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const isDarkRef = useRef(isDark)

  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene ────────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 3.2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Particles ────────────────────────────────────────────────────────────────
    const N = 14000
    const positions = new Float32Array(N * 3)
    const sizes     = new Float32Array(N)
    const opacities = new Float32Array(N)

    // Fibonacci sphere — perfectly even distribution
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < N; i++) {
      const t = i / N
      const inclination = Math.acos(1 - 2 * t)
      const azimuth = goldenAngle * i

      let x = Math.sin(inclination) * Math.cos(azimuth)
      let y = Math.cos(inclination)
      let z = Math.sin(inclination) * Math.sin(azimuth)

      // Elongate slightly — more head-like silhouette
      y *= 1.22
      x *= 0.87

      // Organic jitter
      const jitter = 0.95 + Math.random() * 0.10
      positions[i * 3]     = x * jitter
      positions[i * 3 + 1] = y * jitter
      positions[i * 3 + 2] = z * jitter

      // Larger particles at crown and chin for edge glow
      sizes[i] = 0.8 + Math.random() * 1.2
      opacities[i] = 0.06 + Math.random() * 0.18
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1))

    const vertexShader = /* glsl */`
      attribute float aSize;
      attribute float aOpacity;
      varying float vOpacity;

      void main() {
        vOpacity = aOpacity;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (320.0 / -mv.z);
        gl_Position  = projectionMatrix * mv;
      }
    `

    const fragmentShader = /* glsl */`
      varying float vOpacity;
      uniform vec3 uColor;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv);
        if (r > 0.5) discard;
        // Sharp gaussian — individual dots, not blobs
        float alpha = exp(-r * r * 18.0) * vOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { uColor: { value: new THREE.Color('#ffffff') } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    // Position orb on the right side of the viewport
    particles.position.x = 1.4
    particles.position.y = -0.1
    particles.scale.setScalar(0.01)
    scene.add(particles)

    // ── Mouse ────────────────────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0
    let currentX = 0, currentY = 0

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouse)

    // ── Resize ───────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animate ──────────────────────────────────────────────────────────────────
    let animId: number
    const clock = new THREE.Clock()
    let introProgress = 0

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Intro bloom
      if (introProgress < 1) {
        introProgress = Math.min(1, introProgress + 0.006)
        const ease = 1 - Math.pow(1 - introProgress, 4) // expo-out
        particles.scale.setScalar(ease)
      }

      // Smooth mouse follow
      currentX += (mouseX - currentX) * 0.035
      currentY += (mouseY - currentY) * 0.035

      particles.rotation.y = currentX * 0.45 + t * 0.055
      particles.rotation.x = currentY * 0.28

      // Breathing
      if (introProgress >= 1) {
        const breathe = 1 + Math.sin(t * 0.55) * 0.016
        particles.scale.setScalar(breathe)
      }

      // Color sync with isDark
      const target = isDarkRef.current ? '#ffffff' : '#312e81'
      ;(material.uniforms.uColor.value as THREE.Color).lerp(new THREE.Color(target), 0.05)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" style={{ pointerEvents: 'none' }} />
}
