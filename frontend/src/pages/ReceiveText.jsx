import { useRef, useState } from 'react'
import { FiCheck, FiCopy, FiDownload, FiMessageSquare, FiTrash2 } from 'react-icons/fi'
import { textShareApi } from '../services/api'
import useClipboard from '../hooks/useClipboard'
import { getApiErrorMessage } from '../utils/errors'

function ReceiveText() {
  const [digits, setDigits] = useState(['', '', '', ''])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputs = useRef([])
  const { copied, copy } = useClipboard()
  const code = digits.join('')

  const updateDigit = (index, value) => {
    const values = value.replace(/\D/g, '')
    if (values.length > 1) {
      const next = [...digits]
      values.slice(0, 4 - index).split('').forEach((digit, offset) => { next[index + offset] = digit })
      setDigits(next)
      inputs.current[Math.min(index + values.length, 3)]?.focus()
      return
    }
    const next = [...digits]
    next[index] = values
    setDigits(next)
    if (values && index < 3) inputs.current[index + 1]?.focus()
  }

  const receive = async (event) => {
    event.preventDefault()
    if (code.length !== 4) return
    setLoading(true)
    setError('')
    try {
      const { data } = await textShareApi.receive(code)
      setContent(data.content)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to receive text.'))
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setDigits(['', '', '', ''])
    setContent('')
    setError('')
    inputs.current[0]?.focus()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-7 py-2">
      <div className="text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-600/15 text-2xl text-violet-500"><FiDownload /></div><h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">Receive Text</h1><p className="mx-auto mt-2 max-w-md text-slate-500 dark:text-slate-400">Enter the 4-digit code shared with you to retrieve text securely.</p></div>
      <form onSubmit={receive} className="rounded-3xl border border-slate-300 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 sm:p-8"><div className="flex justify-center gap-3 sm:gap-4">{digits.map((digit, index) => <input key={index} ref={(element) => { inputs.current[index] = element }} inputMode="numeric" maxLength="4" value={digit} onChange={(e) => updateDigit(index, e.target.value)} onKeyDown={(e) => { if (e.key === 'Backspace' && !digits[index] && index) inputs.current[index - 1]?.focus() }} className="h-16 w-14 rounded-2xl border-2 border-slate-300 bg-white text-center text-3xl font-black text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-white" aria-label={`Code digit ${index + 1}`} />)}</div><div className="mt-6 grid gap-3 sm:grid-cols-[auto_1fr]"><button type="button" onClick={clear} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-transparent px-5 py-3 font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"><FiTrash2 /> Clear</button><button disabled={code.length !== 4 || loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"><FiDownload /> {loading ? 'Receiving...' : 'Receive'}</button></div>{error ? <p className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-950/30">{error}</p> : null}{content ? <div className="mt-5"><p className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-600 dark:text-emerald-400"><FiCheck /> Text received successfully</p><div className="rounded-2xl border border-slate-300 bg-white p-5 whitespace-pre-wrap break-words text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">{content}</div><button type="button" onClick={() => copy(content)} className="mt-4 inline-flex items-center gap-2 bg-transparent p-0 text-sm font-bold text-slate-700 hover:text-violet-600 dark:text-slate-200"><FiCopy /> {copied ? 'Copied' : 'Copy Text'}</button></div> : null}</form>
    </div>
  )
}

export default ReceiveText
