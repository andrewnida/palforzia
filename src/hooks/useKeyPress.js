import { useState, useEffect, useCallback } from 'react'

export const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    },
    [targetKey]
  )

  const upHandler = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    },
    [targetKey]
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [upHandler, downHandler])

  return keyPressed
}
