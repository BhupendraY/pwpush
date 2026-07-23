import { useEffect, useMemo, useState } from 'react'
import { secretApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { user } = useAuth()
  const [secrets, setSecrets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        const { data } = await secretApi.list()
        setSecrets(Array.isArray(data) ? data : [])
      } catch {
        setError('Unable to load secrets right now.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const stats = useMemo(() => {
    const total = secrets.length
    const now = new Date()

    const active = secrets.filter((item) => {
      const expiresAt = item.expires_at ? new Date(item.expires_at) : null
      return !item.is_deleted && (!expiresAt || expiresAt > now)
    }).length

    const expired = secrets.filter((item) => {
      if (!item.expires_at) return false
      return new Date(item.expires_at) <= now
    }).length

    const deleted = secrets.filter((item) => item.is_deleted).length

    return { total, active, expired, deleted }
  }, [secrets])

  const handleDelete = async (id) => {
    if (!id) return
    try {
      await secretApi.remove(id)
      setSecrets((prev) => prev.filter((item) => item.id !== id))
    } catch {
      setError('Unable to delete secret.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Welcome back, {user?.name || user?.email}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total Secrets', stats.total],
          ['Active', stats.active],
          ['Expired', stats.expired],
          ['Deleted', stats.deleted],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black text-indigo-600 dark:text-indigo-300">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-slate-100">Recent Secrets</h2>
        </div>

        {error ? <p className="px-4 py-3 text-sm text-rose-600">{error}</p> : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">Token</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Expires</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-slate-500">Loading secrets...</td>
                </tr>
              ) : secrets.length ? (
                secrets.slice(0, 8).map((item) => (
                  <tr key={item.id || item.token} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-300">{item.token || '-'}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.views_remaining ?? '-'}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.expires_at || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
                        {item.is_deleted ? 'Deleted' : 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-slate-500">No secrets found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
