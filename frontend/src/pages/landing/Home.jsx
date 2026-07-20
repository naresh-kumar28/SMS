import React from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../../components/common/AppIcon';
import SiteLayout from '../../layouts/SiteLayout';

/* ─────────────────────────────────────────
   Inline micro-data  (no extra files needed)
───────────────────────────────────────── */
const FEATURES = [
  {
    icon: 'group',
    label: 'Student Dashboard',
    desc: 'Personalised portal for every learner — grades, homework, and extracurricular achievements tracked in one place.',
    wide: true,
    accent: false,
  },
  {
    icon: 'payments',
    label: 'Fee Tracking',
    desc: 'Automated billing, smart reminders, and online payment integration for zero-friction operations.',
    wide: false,
    accent: true,
  },
  {
    icon: 'how_to_reg',
    label: 'Attendance',
    desc: 'Biometric and QR-based check-ins with instant SMS notifications delivered straight to parents.',
    wide: false,
    accent: false,
  },
  {
    icon: 'analytics',
    label: 'Performance Analytics',
    desc: 'Advanced visualisations that reveal institutional trends and individual student progress across every semester.',
    wide: true,
    accent: false,
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Onboard Staff',
    desc: 'Bulk-import teacher and administrator profiles with granular role permissions in minutes.',
    icon: 'manage_accounts',
  },
  {
    number: '02',
    title: 'Setup Classes',
    desc: 'Define your curriculum, sections, and fully automated timetables without writing a single line of code.',
    icon: 'school',
  },
  {
    number: '03',
    title: 'Go Live',
    desc: 'Launch the student app and start collecting real-time operational data from day one.',
    icon: 'rocket_launch',
  },
];

const STATS = [
  { value: '500+', label: 'Schools onboarded' },
  { value: '1.2 M', label: 'Students managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '4.9 ★', label: 'Average rating' },
];

const TESTIMONIALS = [
  {
    quote:
      'Skoolnet cut our fee-collection time by 70 %. The automated reminders alone saved my team hours every week.',
    name: 'Priya Sharma',
    role: 'Principal, Delhi Public School',
    initials: 'PS',
  },
  {
    quote:
      'The attendance module integrated seamlessly with our existing biometric hardware. Setup was done in a single afternoon.',
    name: 'Arjun Mehta',
    role: 'IT Head, Orchid International',
    initials: 'AM',
  },
  {
    quote:
      'Parents love the real-time updates and students are more engaged now that everything is in one dashboard.',
    name: 'Sunita Rao',
    role: 'Admin Director, Sunrise Academy',
    initials: 'SR',
  },
];

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
const Home = () => {
  return (
    <SiteLayout>
      <div className="pb-20 -mt-16 overflow-x-hidden">

        {/* ── Hero ─────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-20 relative">
          {/* Soft ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-0 w-[320px] h-[320px] bg-primary/4 rounded-full blur-[100px]"
          />

          <div className="relative z-10 max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/8 border border-primary/15 mb-7">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-wide font-label uppercase">
                School Management Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tight leading-[1.06] text-on-surface mb-6">
              Manage Your School{' '}
              <br className="hidden md:block" />
              <span className="hero-gradient-text">Smartly with Skoolnet</span>
            </h1>

            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-10 font-body leading-relaxed">
              Transform your institution into a high-performance digital ecosystem. Streamline
              attendance, automate fee collection, and empower students with real-time insights.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/pricing"
                id="hero-get-started"
                className="btn-primary px-8 py-3 text-base inline-flex items-center gap-2"
              >
                <AppIcon name="rocket_launch" size={18} />
                Get Started Free
              </Link>
              <Link
                to="/contact"
                id="hero-book-demo"
                className="btn-secondary px-8 py-3 text-base inline-flex items-center gap-2"
              >
                <AppIcon name="calendar_today" size={18} />
                Book a Demo
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats bar ────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/30 rounded-2xl overflow-hidden border border-outline-variant/40 shadow-sm">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white flex flex-col items-center justify-center py-8 px-4 text-center"
              >
                <span className="text-3xl md:text-4xl font-black font-headline text-primary mb-1">
                  {s.value}
                </span>
                <span className="text-sm text-on-surface-variant font-body">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Dashboard Preview ─────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24">
          <div className="relative rounded-2xl overflow-hidden border border-outline-variant/40 shadow-[0_32px_80px_rgba(0,0,0,0.08)]">
            {/* Top bar chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-surface-container border-b border-outline-variant/40">
              <span className="w-3 h-3 rounded-full bg-outline-variant/60" />
              <span className="w-3 h-3 rounded-full bg-outline-variant/40" />
              <span className="w-3 h-3 rounded-full bg-outline-variant/30" />
              <span className="ml-3 text-xs text-on-surface-variant font-label">app.skoolnet.io/dashboard</span>
            </div>
            <img
              alt="Skoolnet admin dashboard preview"
              className="w-full aspect-video object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg-yCQS5scIYOtw0DzQ_FZgglvcXNBt3OgD2vckthmpgQMnSDbMtqR5TyueL_LrYlf-y0LQRulSgoDlSso_wxgwDZ4cV5Xq6xuaBA9fuRRJUFLJJGcp10Kb9Y8codeqQCNkM5W3oCkcOXH7LuCjlqQ1XgVttiC2oYWfhn6a_qJVXoszsL2QCenLYU_jTQ9VBENOr-L-oM50OFLMNBfrdHJ9rHS4XrEwkSyiRlCazd9xMuccW3OrheHtIpmCwKO-GF52Mvq81foVRRDU"
            />
          </div>
        </section>

        {/* ── Features Bento Grid ───────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24">
          {/* Section header */}
          <div className="mb-12">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">
              Platform Features
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-on-surface">
              The Complete School Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className={[
                  'group rounded-2xl border p-8 flex flex-col transition-all duration-200',
                  f.wide ? 'md:col-span-2' : '',
                  f.accent
                    ? 'bg-primary border-primary text-white shadow-[0_12px_40px_rgba(0,82,255,0.18)] hover:shadow-[0_20px_60px_rgba(0,82,255,0.24)] hover:-translate-y-0.5'
                    : 'glass-panel border-outline-variant/50 hover:shadow-lg hover:-translate-y-0.5',
                ].join(' ')}
              >
                <div
                  className={[
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-6',
                    f.accent ? 'bg-white/20' : 'bg-primary/10',
                  ].join(' ')}
                >
                  <AppIcon
                    name={f.icon}
                    size={24}
                    className={f.accent ? 'text-white' : 'text-primary'}
                  />
                </div>
                <h3
                  className={[
                    'text-xl font-extrabold font-headline mb-3',
                    f.accent ? 'text-white' : 'text-on-surface',
                  ].join(' ')}
                >
                  {f.label}
                </h3>
                <p
                  className={[
                    'text-base leading-relaxed font-body',
                    f.accent ? 'text-white/80' : 'text-on-surface-variant',
                  ].join(' ')}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ──────────────────────── */}
        <section className="bg-surface-container-low/60 border-y border-outline-variant/30 py-24 mb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">
                Getting Started
              </p>
              <h2 className="text-3xl md:text-4xl font-black font-headline text-on-surface">
                Three Steps to Digital Excellence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* connector line */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-outline-variant"
              />

              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className="group relative z-10 glass-panel rounded-2xl p-8 text-center border border-outline-variant/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Step badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/8 border border-primary/15 mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-200">
                    <span className="text-lg font-black text-primary group-hover:text-white transition-colors duration-200 font-headline">
                      {step.number}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold font-headline text-on-surface mb-3">
                    {step.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24">
          <div className="mb-12">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">
              What Schools Say
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-on-surface">
              Trusted by Educators Everywhere
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="glass-panel rounded-2xl border border-outline-variant/50 p-7 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <AppIcon key={i} name="star" size={16} className="text-primary" />
                  ))}
                </div>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed flex-1">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-outline-variant/40">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary font-label">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface font-headline">{t.name}</p>
                    <p className="text-xs text-on-surface-variant font-body">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="rounded-2xl bg-primary relative overflow-hidden px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_24px_80px_rgba(0,82,255,0.22)]">
            {/* Background decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"
            />

            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black font-headline text-white mb-3 leading-tight">
                Ready to modernise your school?
              </h2>
              <p className="text-white/75 font-body text-base max-w-md">
                Join 500+ schools already running on Skoolnet. Setup takes less than a day.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 justify-center">
              <Link
                to="/pricing"
                id="cta-get-started"
                className="px-8 py-3 bg-white text-primary font-bold rounded-xl text-base hover:bg-surface-container transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <AppIcon name="rocket_launch" size={18} />
                Get Started Free
              </Link>
              <Link
                to="/contact"
                id="cta-contact"
                className="px-8 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-xl text-base hover:bg-white/20 transition-colors inline-flex items-center gap-2"
              >
                <AppIcon name="call" size={18} />
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
};

export default Home;
