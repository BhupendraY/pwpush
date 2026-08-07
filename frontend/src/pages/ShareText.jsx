import { useState } from 'react'
import { FiCheck, FiCopy, FiMessageSquare, FiPlus, FiSend, FiTrash2 } from 'react-icons/fi'
import { textShareApi } from '../services/api'
import useClipboard from '../hooks/useClipboard'
import { getApiErrorMessage } from '../utils/errors'

function ShareText() {
  const [content, setContent] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { copied, copy } = useClipboard()

  const share = async (event) => {
    event.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    setError('')
    try {
      const { data } = await textShareApi.create(content)
      setCode(data.code)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to generate a code.'))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setContent('')
    setCode('')
    setError('')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-7 py-2">
      <div className="text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-600/15 text-2xl text-violet-500"><FiMessageSquare /></div><h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">Share Text</h1><p className="mx-auto mt-2 max-w-md text-slate-500 dark:text-slate-400">Paste or type the text you want to share instantly with a 4-digit code.</p></div>
      {code ? <div className="rounded-3xl border border-violet-500/70 bg-slate-50 p-8 text-center shadow-lg dark:bg-slate-900/70"><div className="mx-auto inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400"><FiCheck /> CODE GENERATED</div><button type="button" onClick={() => copy(code)} className="mx-auto mt-8 flex items-center gap-3 rounded-xl bg-transparent p-0 text-4xl font-black tracking-[0.5em] text-violet-600 dark:text-violet-400" aria-label="Copy generated code">{code.split('').map((digit, index) => <span key={index} className="grid h-16 w-14 place-items-center rounded-xl border border-slate-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">{digit}</span>)}<FiCopy className="ml-1 text-xl" /></button><p className="mt-5 text-sm text-slate-500">{copied ? 'Code copied to clipboard' : 'Click the code to copy it'}</p><button type="button" onClick={reset} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-transparent px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"><FiPlus /> Share Another</button></div> : <form onSubmit={share} className="space-y-4"><div className="overflow-hidden rounded-3xl border border-slate-300 bg-slate-50 shadow-sm focus-within:border-violet-500 dark:border-slate-700 dark:bg-slate-900"><textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength="50000" placeholder="Paste your text here..." rows="11" className="w-full resize-none border-0 bg-transparent p-6 font-mono text-sm outline-none focus:ring-0 dark:text-slate-100" /><p className="border-t border-slate-200 px-5 py-3 text-right font-mono text-xs text-slate-400 dark:border-slate-800">{content.length.toLocaleString()} / 50,000</p></div>{error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}<div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setContent('')} disabled={!content} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-transparent px-5 py-3 font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"><FiTrash2 /> Clear</button><button disabled={!content.trim() || loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 font-bold text-white shadow-lg shadow-violet-600/25 hover:brightness-110"><FiSend /> {loading ? 'Generating...' : 'Share Text'}</button></div></form>}
    </div>
  )
}

export default ShareText
