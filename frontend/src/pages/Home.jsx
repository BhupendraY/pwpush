import {
  FiClock,
  FiCode,
  FiDatabase,
  FiEye,
  FiKey,
  FiLock,
  FiShield,
  FiSmartphone,
  FiTrash2,
  FiZap,
} from 'react-icons/fi'
import CTA from '../components/CTA'
import FeatureCard from '../components/FeatureCard'
import Hero from '../components/Hero'
import Stats from '../components/Stats'

const features = [
  { icon: FiShield, title: 'Secure Encryption', description: 'Strong encrypted transit and encrypted payload handling.' },
  { icon: FiEye, title: 'One Time Access', description: 'Secrets are delivered once and never leaked in plain text.' },
  { icon: FiClock, title: 'Expiration Timer', description: 'Configure expiry in hours and auto-expire stale links.' },
  { icon: FiKey, title: 'Password Protected', description: 'Add an extra unlock password for high sensitivity data.' },
  { icon: FiLock, title: 'AES Encryption', description: 'Cryptographically secure at-rest data protection.' },
  { icon: FiTrash2, title: 'Burn After Reading', description: 'Automatic deletion after final allowed access.' },
  { icon: FiDatabase, title: 'Dashboard', description: 'Track totals, active links, expired links and usage history.' },
  { icon: FiCode, title: 'REST API', description: 'Simple API integrations for apps, tools and automations.' },
  { icon: FiSmartphone, title: 'Responsive', description: 'Built mobile-first for desktop, tablet and phone.' },
  { icon: FiZap, title: 'Fast Delivery', description: 'Optimized UI and API flow for low-latency sharing.' },
]

const reasons = [
  'Military Grade Encryption',
  'No Data Leakage',
  'Self Hosted Ready',
  'Fast',
  'Easy',
  'Private',
]

const testimonials = [
  {
    name: 'Aman Gupta',
    role: 'DevOps Lead',
    text: 'SecurePush replaced insecure chat-based credential sharing for our engineering team.',
  },
  {
    name: 'Neha Verma',
    role: 'Security Analyst',
    text: 'One-time links and auto burn made audits significantly easier and safer.',
  },
  {
    name: 'Chris D',
    role: 'Platform Engineer',
    text: 'Simple UI, strong defaults, and easy API integration. Exactly what we needed.',
  },
]

function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-4 py-8 lg:px-8">
      <Hero />

      <Stats />

      <section id="features" className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Core Features</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Built for modern secret distribution workflows.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section id="about" className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">How It Works</h2>
          <ol className="mt-6 space-y-4">
            {['Create Secret', 'Generate Secure Link', 'Share Link', 'Recipient Opens', 'Secret Self Destructs'].map((step, idx) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-indigo-600 text-xs font-bold text-white">{idx + 1}</span>
                <p className="font-medium text-slate-700 dark:text-slate-200">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Why Choose Us</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                {reason}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-center text-3xl font-black tracking-tight text-slate-900 dark:text-white">Testimonials</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-slate-600 dark:text-slate-300">"{item.text}"</p>
              <p className="mt-4 font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <CTA />
    </div>
  )
}

export default Home
