import { Link } from 'react-router-dom'
import { FiArrowRight, FiShield } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

function Hero() {
  const { isAuthenticated } = useAuth()

  return (
    <section id="home" className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-900 px-6 py-16 text-white shadow-2xl shadow-indigo-900/30 lg:px-14">
      <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-100">
            <FiShield /> Enterprise Grade Secrecy
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Securely Share Passwords & Secrets
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-200">
            Generate secure one-time links for passwords, API keys, tokens, documents, and sensitive information.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={isAuthenticated ? '/dashboard/create-secret' : '/login'}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Create Secret <FiArrowRight />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
          <div className="grid gap-3 text-sm text-cyan-50">
            <div className="rounded-xl border border-white/20 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-wide text-cyan-200">Encrypted Payload</p>
              <p className="mt-2 font-mono text-cyan-100">U2VjdXJlUHVzaDphZXMyNTY6Y2lwaGVydGV4dA==</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-wide text-cyan-200">One Time URL</p>
              <p className="mt-2 font-mono text-cyan-100">https://securepush.app/s/abC123xYz9</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-wide text-cyan-200">Auto Burn Policy</p>
              <p className="mt-2 text-cyan-100">Link expires in 24h or after 1 view.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
