import { useState, useEffect } from 'react'

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function resize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', resize)

    resize()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return windowSize
}
