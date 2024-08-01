import {useEffect, useState} from 'react'
import {CheckCircle, Copy} from 'react-feather'

type TCopyItem = {
  textToCopy: string
}

function CopyItem({textToCopy}: TCopyItem) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy)
    setHasCopied(true)
  }

  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false)
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  return (
    <>
      {hasCopied ? (
        <CheckCircle size={16} />
      ) : (
        <Copy
          size={16}
          cursor="pointer"
          onClick={() => copyToClipboard()}
          className="hover:text-primaryButton"
        />
      )}
    </>
  )
}

export default CopyItem
