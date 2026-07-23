import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getApiErrorMessage } from '../utils/errors'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Password and confirm password must match')
      return
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      })
      navigate('/dashboard')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to create account'))
    }
  }

  return (
    <div className="mx-auto grid min-h-[80vh] w-full max-w-md place-items-center px-4">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Create Account</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Start sharing secrets securely.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'mobile', label: 'Mobile', type: 'text' },
            { key: 'password', label: 'Password', type: 'password' },
            { key: 'confirmPassword', label: 'Confirm Password', type: 'password' },
          ].map((field) => (
            <label key={field.key} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {field.label}
              <input
                type={field.type}
                required
                value={form[field.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
          ))}

          {error ? <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110"
          >
            {loading ? 'Please wait...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
