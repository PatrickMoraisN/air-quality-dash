import { useEffect, useState } from 'react'

export function useMobile(breakpoint: number = 448): boolean[] {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)

    const handleResize = () => setIsMobile(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleResize)

    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [breakpoint])

  return [isMobile]
}
