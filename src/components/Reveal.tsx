'use client'
import { useEffect, useRef, useState } from "react"

export default function Reveal({ children, delay = "" }: { children: React.ReactNode, delay?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect() // Stop observing once visible
      }
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`${isVisible ? `animate-fade-up ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  )
}