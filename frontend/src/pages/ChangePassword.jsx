import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiLock } from 'react-icons/fi'
import { profileApi } from '../services/api'
import { getApiErrorMessage } from '../utils/errors'

function ChangePassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ old_password: '', new_password: '', confirm_password: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (form.new_password.length < 6) return setError('New password must be at least 6 characters.')
    if (form.new_password !== form.confirm_password) return setError('New password and confirmation do not match.')
    setSaving(true)
    try {
      const { data } = await profileApi.changePassword({ old_password: form.old_password, new_password: form.new_password })
      setSuccess(data?.message || 'Password changed successfully.')
      setForm({ old_password: '', new_password: '', confirm_password: '' })
      setTimeout(() => navigate('/dashboard/profile'), 900)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to change password.'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div><Link to="/dashboard/profile" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"><FiArrowLeft /> Back to profile</Link><h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Change Password</h1><p className="mt-1 text-slate-600 dark:text-slate-400">Choose a strong, unique password for your account.</p></div>
      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200">Use at least 6 characters and do not reuse an old password.</div>
        {[['old_password', 'Current password'], ['new_password', 'New password'], ['confirm_password', 'Confirm new password']].map(([key, label]) => <label key={key} className="block text-sm font-bold text-slate-700 dark:text-slate-200">{label}<input required type="password" autoComplete={key === 'old_password' ? 'current-password' : 'new-password'} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" /></label>)}
        {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}{success ? <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p> : null}
        <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-white hover:bg-indigo-500"><FiLock /> {saving ? 'Updating...' : 'Change password'}</button>
      </form>
    </div>
  )
}

export default ChangePassword
