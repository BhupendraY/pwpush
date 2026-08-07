import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FiDownload, FiHome, FiKey, FiList, FiLogOut, FiSend, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-6 md:grid-cols-[250px_1fr] lg:px-8">
      <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-wider text-slate-500">Welcome</p>
        <h2 className="mt-1 truncate text-lg font-bold text-slate-900 dark:text-slate-100">{user?.name || 'User'}</h2>

        <nav className="mt-5 space-y-2">
          <NavLink to="/dashboard" end className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`}><FiHome /> Dashboard</NavLink>
          <NavLink to="/dashboard/create-secret" className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`}><FiKey /> Create Secret</NavLink>
          <p className="px-3 pt-3 text-xs font-bold uppercase tracking-wider text-slate-400">Text transfer</p>
          <NavLink to="/dashboard/share-text" className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`}><FiSend /> Share Text</NavLink>
          <NavLink to="/dashboard/receive-text" className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`}><FiDownload /> Receive Text</NavLink>
          <NavLink to="/dashboard/my-secrets" className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`}><FiList /> My Secrets</NavLink>
          <NavLink to="/dashboard/profile" className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`}><FiUser /> My Profile</NavLink>
          <button type="button" onClick={handleLogout} className="dash-link w-full text-left"><FiLogOut /> Logout</button>
        </nav>
      </aside>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <Outlet />
      </section>
    </div>
  )
}

export default DashboardLayout
