import React from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../../components/common/AppIcon';
import SiteLayout from '../../layouts/SiteLayout';

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const TEAM = [
  {
    name: 'Danish Farhan',
    role: 'Founder & Lead Engineer',
    stack: 'React · Node · System Design',
    initials: 'DF',
    color: 'bg-primary/10 text-primary',
    img: null,
  },
  {
    name: 'Arjun Mehta',
    role: 'Backend Architect',
    stack: 'Django REST Framework · MySQL · Redis',
    initials: 'AM',
    color: 'bg-emerald-50 text-emerald-600',
    img: null,
  },
  {
    name: 'Sana Qureshi',
    role: 'Frontend Engineer',
    stack: 'React · Tailwind · Figma',
    initials: 'SQ',
    color: 'bg-violet-50 text-violet-600',
    img: null,
  },
  {
    name: 'Ravi Sharma',
    role: 'DevOps & Infrastructure',
    stack: 'Docker · AWS · CI/CD',
    initials: 'RS',
    color: 'bg-amber-50 text-amber-600',
    img: null,
  },
];

const VALUES = [
  {
    icon: 'code',
    title: 'Code-first Thinking',
    desc: 'Every product decision starts with the engineering. We build for reliability, maintainability, and real-world scale — not just demos.',
  },
  {
    icon: 'school',
    title: 'Education is the Mission',
    desc: 'We build Skoolnet because we believe good software changes how institutions operate and how students learn. That context shapes every line of code.',
  },
  {
    icon: 'speed',
    title: 'Ship Iteratively',
    desc: 'We prefer working software over perfect plans. We ship fast, gather feedback, and iterate — keeping teachers and admins at the centre of every release.',
  },
  {
    icon: 'lock',
    title: 'Privacy by Design',
    desc: 'Student data is sacred. We enforce FERPA-compliant handling, role-scoped access, and end-to-end encryption across every layer of the stack.',
  },
];

const STACK = [
  { label: 'React + Vite', icon: 'web', desc: 'Frontend SPA' },
  { label: 'Django REST Framework', icon: 'terminal', desc: 'REST API' },
  { label: 'MySQL', icon: 'storage', desc: 'Primary database' },
  { label: 'Redis', icon: 'bolt', desc: 'Caching & queues' },
  { label: 'Docker + AWS', icon: 'cloud', desc: 'Infrastructure' },
  { label: 'GitHub Actions', icon: 'autorenew', desc: 'CI / CD pipelines' },
];

const TIMELINE = [
  {
    year: '2023',
    title: 'Problem Identified',
    desc: 'A small dev team noticed that school management at their alma mater still ran on spreadsheets and paper registers. They decided to fix it.',
  },
  {
    year: '2024 Q1',
    title: 'First Commit',
    desc: 'Skoolnet v0.1 was a single-module attendance tracker. Ugly, fast, and used by the first pilot school within two weeks of the first commit.',
  },
  {
    year: '2024 Q3',
    title: 'Platform Expanded',
    desc: 'Fee management, student portals, and analytics shipped in rapid succession. 50 schools were live by Q3, all driven by direct user feedback loops.',
  },
  {
    year: '2025',
    title: 'Scaling',
    desc: 'Crossed 500 schools and 1.2 M students managed. Infrastructure migrated to AWS with multi-region support and a 99.9 % SLA.',
  },
];

const PROBLEM_VS_SOLUTION = [
  {
    problem: 'Fragmented data across disconnected platforms',
    solution: 'Unified ecosystem with real-time sync across all modules',
  },
  {
    problem: 'Manual, error-prone entry that drains staff time',
    solution: 'Intelligent automation for scheduling, grading, and reporting',
  },
  {
    problem: 'Clunky interfaces that discourage adoption',
    solution: 'Clean, developer-crafted UI for executive-level clarity',
  },
];

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const About = () => (
  <SiteLayout>
    <div className="pb-24 -mt-16 overflow-x-hidden">

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background band */}
        <div className="absolute inset-0 bg-linear-to-br from-surface-container-low/80 via-white to-white" aria-hidden="true" />
        {/* Ambient glows */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] bg-primary/7 rounded-full blur-[130px]" />
        <div aria-hidden="true" className="pointer-events-none absolute top-20 right-0 w-[320px] h-[320px] bg-primary/4 rounded-full blur-[100px]" />
        {/* Dot grid decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0052FF 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Left column ── */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/8 border border-primary/15 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="text-xs font-semibold text-primary tracking-wide font-label uppercase">
                  Built by Developers · For Education
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-[62px] font-black font-headline tracking-tight leading-[1.04] text-on-surface mb-6">
                The{' '}
                <span className="hero-gradient-text">Developer Team</span>
                <br className="hidden md:block" />
                Behind Skoolnet.
              </h1>

              {/* Sub-copy */}
              <p className="text-on-surface-variant text-lg font-body leading-relaxed mb-10 max-w-[480px]">
                We're a small, focused engineering team who felt the pain of broken school management
                first-hand. So we built the platform we always wished existed — from scratch, in public,
                with educators as co-authors every step of the way.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/pricing" id="about-get-started" className="btn-primary px-7 py-3 text-base inline-flex items-center gap-2">
                  <AppIcon name="rocket_launch" size={18} />
                  Get Started Free
                </Link>
                <a
                  id="about-github"
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary px-7 py-3 text-base inline-flex items-center gap-2"
                >
                  <AppIcon name="code" size={16} />
                  View on GitHub
                </a>
              </div>

              {/* Built-with strip */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs text-on-surface-variant font-body">Built with</span>
                {['React', 'Django REST Framework', 'MySQL', 'Docker', 'AWS'].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-semibold font-label px-3 py-1 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface-variant"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right column — stats row + image ── */}
            <div className="flex flex-col gap-4">

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden border border-outline-variant/40 shadow-[0_24px_70px_rgba(0,0,0,0.10)] w-full aspect-4/3">
                <img
                  alt="Skoolnet development team collaborating"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDybp3-13T3KhpAxOzTZGBHZxZ3DeL4flf-SnfaVeiGjWnJJDSg0yHEQbmSK_lGK7S2YnI7LVV8DoCqHppt1eJLhRsi-7TBCSiD9_8HwwWYN7Fvo-cSRJyThJL2sXYj-47pLBDWEU34QDTR7Q98lgvW6EW-Ed-LHu8L9YAnEaudiCWn18UexItrYGbM8LlQtN8N1_RAcfbC-aTZ3hkmW7KcEtxi6-E9T3f4yw-8xELZVwsEp9IH1H5lL-AEPF4bh_FUfMWRbT_M0p0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                {/* Inline "active development" badge — no overflow */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-white/60 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-xs font-semibold text-on-surface font-label">Active development</span>
                </div>
              </div>

              {/* 3-col mini stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: 'commit', bg: 'bg-primary/8', ic: 'text-primary', value: '2,400+', label: 'Git commits' },
                  { icon: 'school', bg: 'bg-emerald-50', ic: 'text-emerald-600', value: '500+', label: 'Schools live' },
                  { icon: 'group', bg: 'bg-violet-50', ic: 'text-violet-600', value: '1.2M', label: 'Students' },
                ].map((s) => (
                  <div key={s.label} className="glass-panel rounded-xl border border-outline-variant/50 px-3 py-4 flex flex-col items-center text-center gap-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.bg}`}>
                      <AppIcon name={s.icon} size={17} className={s.ic} />
                    </div>
                    <p className="text-base font-black text-on-surface font-headline leading-none">{s.value}</p>
                    <p className="text-[11px] text-on-surface-variant font-body leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>



            </div>

          </div>
        </div>
      </section>

      {/* ── Mission + Vision ──────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-panel rounded-2xl border border-outline-variant/50 p-8">
            <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
              <AppIcon name="rocket_launch" size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-extrabold font-headline text-on-surface mb-3">Our Mission</h2>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              To empower educational institutions with developer-grade digital tools that simplify
              complexity — allowing educators to focus entirely on the growth and success of their
              students, not on broken admin software.
            </p>
          </div>
          <div className="glass-panel rounded-2xl border border-outline-variant/50 p-8">
            <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
              <AppIcon name="visibility" size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-extrabold font-headline text-on-surface mb-3">Our Vision</h2>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              A world where every school — from a 50-student coaching centre to a 50,000-student
              university — runs on software that is as reliable as the engineers who build it and as
              intuitive as the educators who use it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Problem vs Solution ───────────────── */}
      <section className="bg-surface-container-low/60 border-y border-outline-variant/30 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">Why We Exist</p>
            <h2 className="text-3xl font-extrabold font-headline text-on-surface">The Shift in Management</h2>
          </div>

          <div className="rounded-2xl overflow-hidden border border-outline-variant/40 shadow-sm grid grid-cols-1 lg:grid-cols-2">
            {/* Problem */}
            <div className="bg-white p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-outline-variant/40">
              <div className="flex items-center gap-2 mb-7">
                <div className="w-8 h-8 rounded-lg bg-error/8 flex items-center justify-center">
                  <AppIcon name="cancel" size={16} className="text-error" />
                </div>
                <span className="text-xs font-black text-error uppercase tracking-widest font-label">
                  The Legacy Problem
                </span>
              </div>
              <ul className="flex flex-col gap-5">
                {PROBLEM_VS_SOLUTION.map((item) => (
                  <li key={item.problem} className="flex items-start gap-3">
                    <AppIcon name="remove_circle" size={16} className="text-error/50 shrink-0 mt-0.5" />
                    <span className="text-sm text-on-surface-variant font-body leading-snug">{item.problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-primary/4 p-8 md:p-10">
              <div className="flex items-center gap-2 mb-7">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <AppIcon name="check_circle" size={16} className="text-primary" />
                </div>
                <span className="text-xs font-black text-primary uppercase tracking-widest font-label">
                  The Skoolnet Solution
                </span>
              </div>
              <ul className="flex flex-col gap-5">
                {PROBLEM_VS_SOLUTION.map((item) => (
                  <li key={item.solution} className="flex items-start gap-3">
                    <AppIcon name="check_circle" size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-on-surface font-semibold font-body leading-snug">{item.solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
        <div className="mb-10">
          <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">Engineering</p>
          <h2 className="text-3xl font-extrabold font-headline text-on-surface">Built on a Modern Stack</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {STACK.map((s) => (
            <div
              key={s.label}
              className="glass-panel rounded-xl border border-outline-variant/50 p-5 flex flex-col items-center text-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                <AppIcon name={s.icon} size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-extrabold font-headline text-on-surface">{s.label}</p>
                <p className="text-[11px] text-on-surface-variant font-body">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
        <div className="mb-12">
          <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">Our Story</p>
          <h2 className="text-3xl font-extrabold font-headline text-on-surface">From First Commit to 500 Schools</h2>
        </div>

        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-outline-variant/50" />

          {TIMELINE.map((item) => (
            <div key={item.year} className="relative flex gap-8 pb-10 last:pb-0">
              {/* Dot */}
              <div className="relative z-10 w-10 h-10 rounded-xl bg-white border-2 border-primary/30 flex items-center justify-center shrink-0 shadow-sm">
                <div className="w-3 h-3 rounded-lg bg-primary" />
              </div>
              {/* Content */}
              <div className="glass-panel rounded-xl border border-outline-variant/50 p-6 flex-1 hover:shadow-md transition-shadow duration-200">
                <span className="text-[11px] font-black text-primary tracking-widest uppercase font-label">{item.year}</span>
                <h4 className="text-base font-extrabold font-headline text-on-surface mt-1 mb-2">{item.title}</h4>
                <p className="text-sm text-on-surface-variant font-body leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
        <div className="mb-12">
          <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">The Team</p>
          <h2 className="text-3xl font-extrabold font-headline text-on-surface">The Engineers Behind Skoolnet</h2>
          <p className="text-on-surface-variant font-body text-sm mt-2">
            A focused group of developers who care deeply about education tech.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group glass-panel rounded-2xl border border-outline-variant/50 p-6 flex flex-col items-center text-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Avatar */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black font-headline ${member.color}`}>
                {member.initials}
              </div>
              <div>
                <h4 className="font-extrabold font-headline text-on-surface text-base">{member.name}</h4>
                <p className="text-xs text-primary font-semibold font-label uppercase tracking-wide mt-0.5">{member.role}</p>
                <p className="text-xs text-on-surface-variant font-body mt-2 leading-snug">{member.stack}</p>
              </div>
              <div className="pt-2 border-t border-outline-variant/40 w-full flex justify-center gap-3">
                <button className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-primary/8 flex items-center justify-center transition-colors">
                  <AppIcon name="code" size={14} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-primary/8 flex items-center justify-center transition-colors">
                  <AppIcon name="person" size={14} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ────────────────────────────── */}
      <section className="bg-surface-container-low/60 border-y border-outline-variant/30 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">What We Stand For</p>
            <h2 className="text-3xl font-extrabold font-headline text-on-surface">Our Engineering Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="group glass-panel rounded-2xl border border-outline-variant/50 p-7 flex gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-200">
                  <AppIcon name={v.icon} size={20} className="text-primary group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <h4 className="font-extrabold font-headline text-on-surface text-base mb-2">{v.title}</h4>
                  <p className="text-sm text-on-surface-variant font-body leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="rounded-2xl bg-primary relative overflow-hidden px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_24px_80px_rgba(0,82,255,0.22)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-white/5 rounded-full blur-2xl"
          />
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black font-headline text-white mb-2">Want to contribute or partner?</h2>
            <p className="text-white/75 font-body text-base max-w-md">
              We're always open to passionate devs, educators, and schools who want to help shape the future of education tech.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 justify-center">
            <Link to="/pricing" id="about-cta-started" className="px-8 py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-surface-container transition-colors shadow-sm inline-flex items-center gap-2">
              <AppIcon name="rocket_launch" size={16} />
              Get Started Free
            </Link>
            <Link to="/contact" id="about-cta-contact" className="px-8 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-xl text-sm hover:bg-white/20 transition-colors inline-flex items-center gap-2">
              <AppIcon name="mail" size={16} />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  </SiteLayout>
);

export default About;
