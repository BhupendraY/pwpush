import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiCopy, FiEye, FiEyeOff, FiShield } from 'react-icons/fi'
import { secretApi } from '../services/api'
import useClipboard from '../hooks/useClipboard'
import { getApiErrorMessage } from '../utils/errors'

function ViewSecret() {
  const { token = '' } = useParams()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [secretData, setSecretData] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const { copied, copy } = useClipboard()

  const requiresPassword = useMemo(() => {
    return String(error).toLowerCase().includes('password')
  }, [error])

  const handleUnlock = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await secretApi.viewByToken(token, { password: password || null })
      setSecretData(data)
      setRevealed(false)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to open secret'))
      setSecretData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!secretData?.secret) return
    await copy(secretData.secret)
  }

  return (
    <div className="mx-auto grid min-h-[84vh] w-full max-w-3xl place-items-center px-4 py-10">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">Your Secret Link</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Open once and copy securely.</p>

        <form onSubmit={handleUnlock} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {requiresPassword ? 'This secret is password protected' : 'Password (optional)'}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password if required"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </label>

          {error ? <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 font-semibold text-white"
          >
            <FiShield /> {loading ? 'Unlocking...' : 'Unlock'}
          </button>
        </form>

        {secretData ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              className="mb-3 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
            >
              {revealed ? <FiEyeOff /> : <FiEye />} {revealed ? 'Hide' : 'Reveal'}
            </button>

            <div className={`rounded-xl border border-slate-200 bg-white p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${revealed ? '' : 'blur-sm'}`}>
              {secretData.secret}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span>Views Remaining: {secretData.views_remaining ?? '-'}</span>
              <span>Expiry: {secretData.expires_at || '-'}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
              >
                <FiCopy /> {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ViewSecret
