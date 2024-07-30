import {useCallback, useEffect} from 'react'

function useEscapeKey(onClose: () => void) {
  const handleEscPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keyup', handleEscPress)

    return () => {
      document.removeEventListener('keyup', handleEscPress)
    }
  }, [handleEscPress])
}

export default useEscapeKey
