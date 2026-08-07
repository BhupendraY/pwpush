import { useEffect, useState } from 'react'
import { FiCheck, FiCopy, FiLink } from 'react-icons/fi'
import { secretApi } from '../services/api'
import useClipboard from '../hooks/useClipboard'
import { getApiErrorMessage } from '../utils/errors'

const statusClasses = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
  Expired: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200',
  Deleted: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200',
}

function MySecrets() {
  const [secrets, setSecrets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { copied, copy } = useClipboard()

  useEffect(() => {
    async function loadSecrets() {
      try {
        const { data } = await secretApi.list()
        setSecrets(Array.isArray(data?.data) ? data.data : [])
      } catch (err) {
        setError(getApiErrorMessage(err, 'Unable to load your secrets.'))
      } finally {
        setLoading(false)
      }
    }

    loadSecrets()
  }, [])

  const copyUrl = (item) => copy(item.share_url || `${window.location.origin}/s/${item.token}`)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">SECRET LIBRARY</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">My Secrets</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">All the secure links you have created.</p>
        </div>
        <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200">
          {secrets.length} total secret{secrets.length === 1 ? '' : 's'}
        </div>
      </div>

      {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-950/30">{error}</p> : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
              <tr><th className="px-4 py-3">Secret link</th><th className="px-4 py-3">Views left</th><th className="px-4 py-3">Created</th><th className="px-4 py-3">Expires</th><th className="px-4 py-3">Status</th></tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan="5" className="px-4 py-8 text-center text-slate-500">Loading your secrets...</td></tr> : null}
              {!loading && secrets.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-3"><button type="button" onClick={() => copyUrl(item)} className="inline-flex items-center gap-2 !bg-transparent !p-0 font-mono text-xs !text-indigo-600 hover:!text-indigo-500 dark:!text-indigo-300"><FiLink />{item.token}<FiCopy />{copied ? <FiCheck /> : null}</button></td>
                  <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">{item.views_remaining}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.created_at ? new Date(item.created_at).toLocaleString() : '-'}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.expires_at ? new Date(item.expires_at).toLocaleString() : '-'}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClasses[item.status] || statusClasses.Active}`}>{item.status}</span></td>
                </tr>
              ))}
              {!loading && !secrets.length ? <tr><td colSpan="5" className="px-4 py-10 text-center text-slate-500">You have not created a secret yet.</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MySecrets
