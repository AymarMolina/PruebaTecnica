import { useEffect, useRef, useState } from 'react'

export function useInView(options = { threshold: 0 }, initial = false) {
  const ref = useRef(null)
  const [inView, setInView] = useState(initial)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options)
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}
