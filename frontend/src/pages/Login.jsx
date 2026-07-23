import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getApiErrorMessage } from '../utils/errors'

function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      await login({ email: form.email, password: form.password })
      navigate(location.state?.from?.pathname || '/dashboard')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Invalid email or password'))
    }
  }

  return (
    <div className="mx-auto grid min-h-[80vh] w-full max-w-md place-items-center px-4">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Login</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Access your secure dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </label>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm((prev) => ({ ...prev, remember: e.target.checked }))}
              />
              Remember Me
            </label>
            <button type="button" className="text-indigo-600 hover:underline">Forgot Password</button>
          </div>

          {error ? <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110"
          >
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
