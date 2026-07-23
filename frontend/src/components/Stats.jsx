const stats = [
  { value: '100K+', label: 'Secrets Shared' },
  { value: '10K+', label: 'Users' },
  { value: '99.9%', label: 'Secure Delivery' },
  { value: '256-bit', label: 'Encryption' },
]

function Stats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{item.value}</p>
          <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-400">{item.label}</p>
        </div>
      ))}
    </section>
  )
}

export default Stats
