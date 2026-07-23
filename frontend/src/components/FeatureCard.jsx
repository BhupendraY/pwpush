function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700 dark:hover:shadow-none">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-600/30">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </article>
  )
}

export default FeatureCard
