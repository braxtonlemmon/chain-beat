import {useCallback, useEffect} from 'react'

function useOutsideClick(
  onClose: () => void,
  ref: React.RefObject<HTMLElement>
) {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref?.current?.contains && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    },
    [onClose, ref]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])
}

export default useOutsideClick
