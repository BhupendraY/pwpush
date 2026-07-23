import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full border border-slate-300 bg-white/80 p-2 text-slate-700 transition hover:scale-105 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  )
}

export default ThemeToggle
