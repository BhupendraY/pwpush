import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="mx-auto grid min-h-[70vh] w-full max-w-xl place-items-center px-4 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">404</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900 dark:text-slate-100">Page Not Found</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
