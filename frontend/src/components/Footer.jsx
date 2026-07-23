import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id="contact" className="mt-6 border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">SecurePush</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            One-time secure link sharing for passwords, credentials and confidential notes.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="/#features">Features</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Community</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="https://github.com" target="_blank" rel="noreferrer">Github</a></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Signup</Link></li>
          </ul>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
        Copyright {new Date().getFullYear()} SecurePush. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
