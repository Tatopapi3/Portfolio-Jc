declare module 'vanta/dist/vanta.waves.min' {
  const WAVES: (opts: Record<string, unknown>) => { destroy: () => void }
  export default WAVES
}
