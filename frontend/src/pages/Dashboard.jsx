import { useEffect, useState } from 'react'
import { dashboardApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { user } = useAuth()
  const [secrets, setSecrets] = useState([])
  const [stats, setStats] = useState({ total: 0, active: 0, expired: 0, deleted: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        const { data } = await dashboardApi.get()
        setSecrets(Array.isArray(data?.recent_secrets) ? data.recent_secrets : [])
        setStats(data?.stats || { total: 0, active: 0, expired: 0, deleted: 0 })
      } catch {
        setError('Unable to load secrets right now.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

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
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-slate-500">Loading secrets...</td>
                </tr>
              ) : secrets.length ? (
                secrets.slice(0, 8).map((item) => (
                  <tr key={item.id || item.token} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-300">{item.token || '-'}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.views_remaining ?? '-'}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {item.expires_at ? new Date(item.expires_at).toLocaleString() : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
                        {item.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-slate-500">No secrets found yet.</td>
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
