import { useState } from 'react'

function useClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = async (value) => {
    if (!value) return false
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
      return true
    } catch {
      setCopied(false)
      return false
    }
  }

  return { copied, copy }
}

export default useClipboard
