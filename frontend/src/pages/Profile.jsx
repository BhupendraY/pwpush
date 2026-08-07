import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiEdit2, FiLock, FiMail, FiPhone, FiShield, FiUser } from 'react-icons/fi'
import { profileApi } from '../services/api'
import { getApiErrorMessage } from '../utils/errors'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    profileApi.get().then(({ data }) => setProfile(data?.data || null)).catch((err) => setError(getApiErrorMessage(err, 'Unable to load profile.')))
  }, [])

  if (error) return <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p>
  if (!profile) return <p className="py-10 text-center text-slate-500">Loading profile...</p>

  const details = [
    [FiMail, 'Email address', profile.email], [FiPhone, 'Mobile number', profile.mobile || '-'],
    [FiShield, 'Account role', profile.role], [FiCalendar, 'Member since', profile.created_at ? new Date(profile.created_at).toLocaleDateString() : '-'],
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 p-6 text-white shadow-lg shadow-indigo-600/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 text-2xl"><FiUser /></div><div><p className="text-sm text-indigo-100">MY PROFILE</p><h1 className="text-2xl font-black">{profile.name}</h1><p className="text-sm text-indigo-100">{profile.is_active ? 'Active account' : 'Inactive account'}</p></div></div><Link to="edit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"><FiEdit2 /> Update profile</Link></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{details.map(([Icon, label, value]) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60"><Icon className="text-xl text-indigo-600 dark:text-indigo-300" /><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{value}</p></div></div>)}</div>
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold text-slate-900 dark:text-slate-100">Password & security</h2><p className="mt-1 text-sm text-slate-500">Keep your account secure by changing your password regularly.</p></div><Link to="change-password" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"><FiLock /> Change password</Link></div>
    </div>
  )
}

export default Profile
