import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { profileApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { getApiErrorMessage } from '../utils/errors'

function UpdateProfile() {
  const navigate = useNavigate()
  const { updateUser } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', mobile: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    profileApi.get().then(({ data }) => {
      const profile = data?.data || {}
      setForm({ name: profile.name || '', email: profile.email || '', mobile: profile.mobile || '' })
    }).catch((err) => setError(getApiErrorMessage(err, 'Unable to load profile.'))).finally(() => setLoading(false))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const { data } = await profileApi.update(form)
      updateUser(form)
      setSuccess(data?.message || 'Profile updated successfully.')
      setTimeout(() => navigate('/dashboard/profile'), 700)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to update profile.'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div><Link to="/dashboard/profile" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"><FiArrowLeft /> Back to profile</Link><h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Update Profile</h1><p className="mt-1 text-slate-600 dark:text-slate-400">Keep your contact information current.</p></div>
      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
        {loading ? <p className="text-slate-500">Loading profile...</p> : <><label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Full name<input required minLength="2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" /></label><label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" /></label><label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Mobile number<input required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" /></label></>}
        {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}{success ? <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p> : null}
        <button disabled={loading || saving} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-white hover:bg-indigo-500"><FiSave /> {saving ? 'Saving...' : 'Save changes'}</button>
      </form>
    </div>
  )
}

export default UpdateProfile
