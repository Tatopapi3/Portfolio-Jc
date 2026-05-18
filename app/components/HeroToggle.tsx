'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const HeroDark  = dynamic(() => import('./HeroDark'),  { ssr: false })
const HeroLight = dynamic(() => import('./HeroLight'), { ssr: false })

export default function HeroToggle() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  return mode === 'dark'
    ? <HeroDark  onSwitch={() => setMode('light')} />
    : <HeroLight onSwitch={() => setMode('dark')}  />
}
