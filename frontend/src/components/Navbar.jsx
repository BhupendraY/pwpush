import { Link, NavLink } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30">
            <FiLock size={18} />
          </span>
          <span className="text-lg font-bold tracking-tight">SecurePush</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <a href="/#home" className="transition hover:text-indigo-600">Home</a>
          <a href="/#features" className="transition hover:text-indigo-600">Features</a>
          <a href="/#about" className="transition hover:text-indigo-600">About</a>
          <a href="/#contact" className="transition hover:text-indigo-600">Contact</a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className="hidden rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 md:inline-flex"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:brightness-110"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className="rounded-xl border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:border-indigo-600 dark:border-indigo-700 dark:text-indigo-200"
              >
                Dashboard
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
