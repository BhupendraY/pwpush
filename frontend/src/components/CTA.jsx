import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function CTA() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-600 px-6 py-12 text-center text-white shadow-2xl shadow-indigo-600/30">
      <h2 className="text-3xl font-black tracking-tight">Ready to Share Secrets Securely?</h2>
      <p className="mx-auto mt-3 max-w-2xl text-indigo-100">
        Launch encrypted one-time links in seconds and reduce accidental data exposure.
      </p>
      <Link
        to={isAuthenticated ? '/dashboard/create-secret' : '/register'}
        className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50"
      >
        Create Secret
      </Link>
    </section>
  )
}

export default CTA
