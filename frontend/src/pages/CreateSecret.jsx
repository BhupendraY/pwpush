import { useState } from 'react'
import { FiCopy, FiLink } from 'react-icons/fi'
import { secretApi } from '../services/api'
import useClipboard from '../hooks/useClipboard'
import { getApiErrorMessage } from '../utils/errors'

function CreateSecret() {
  const [form, setForm] = useState({
    secret: '',
    views: 1,
    expire_hours: 24,
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const { copied, copy } = useClipboard()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const payload = {
        secret: form.secret,
        views: Number(form.views),
        expire_hours: Number(form.expire_hours),
        password: form.password || null,
      }

      const { data } = await secretApi.create(payload)
      const token = data.token
      setResult({
        ...data,
        fullUrl: `${window.location.origin}/s/${token}`,
      })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to create secret'))
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result?.fullUrl) return
    await copy(result.fullUrl)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Create Secret</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Generate secure one-time share links.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Secret
          <textarea
            required
            rows="6"
            value={form.secret}
            onChange={(e) => setForm((prev) => ({ ...prev, secret: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Views
            <input
              type="number"
              min="1"
              max="100"
              value={form.views}
              onChange={(e) => setForm((prev) => ({ ...prev, views: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </label>

          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Expiry (hours)
            <input
              type="number"
              min="1"
              max="720"
              value={form.expire_hours}
              onChange={(e) => setForm((prev) => ({ ...prev, expire_hours: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </label>

          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Password (optional)
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
        </div>

        {error ? <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-indigo-600/30"
        >
          <FiLink /> {loading ? 'Creating...' : 'Create'}
        </button>
      </form>

      {result ? (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-900/20">
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Generated URL</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input readOnly value={result.fullUrl} className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-sm dark:border-indigo-700 dark:bg-slate-900" />
            <button type="button" onClick={handleCopy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white">
              <FiCopy /> {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CreateSecret
