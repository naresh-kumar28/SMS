import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../../components/common/AppIcon';
import SiteLayout from '../../layouts/SiteLayout';

/* Data */
const CATEGORIES = ['All', 'Administration', 'Academics', 'Finance', 'Communication'];

const SERVICES = [
  {
    icon: 'school',
    title: 'School Management',
    tag: 'Administration',
    desc: 'Centralise every administrative operation — schedules, facility coordination, staff oversight, and notice management — from a single control panel.',
    highlights: ['Role-based access', 'Multi-branch support', 'Audit logs'],
  },
  {
    icon: 'sports_kabaddi',
    title: 'Coaching Management',
    tag: 'Academics',
    desc: 'Tailored workflows for specialised training centres: batch scheduling, progress tracking, and coach performance dashboards in one place.',
    highlights: ['Batch management', 'Progress reports', 'Coach analytics'],
  },
  {
    icon: 'how_to_reg',
    title: 'Attendance',
    tag: 'Administration',
    desc: 'Real-time presence monitoring via biometric integration, QR codes, and automated SMS/email alerts routed to parents and faculty.',
    highlights: ['Biometric & QR', 'Instant alerts', 'Monthly reports'],
  },
  {
    icon: 'dashboard_customize',
    title: 'Student Dashboard',
    tag: 'Academics',
    desc: 'Personalised portals for students to access grades, resources, assignments, and direct communication channels in one unified interface.',
    highlights: ['Grade tracking', 'Assignment hub', 'Resource library'],
  },
  {
    icon: 'bar_chart',
    title: 'Performance Analytics',
    tag: 'Academics',
    desc: 'Advanced data visualisations that surface institutional growth trends and individual student trajectories across every semester.',
    highlights: ['Custom reports', 'Trend analysis', 'Export to PDF/CSV'],
  },
  {
    icon: 'forum',
    title: 'Communication Hub',
    tag: 'Communication',
    desc: 'In-app messaging, broadcast notices, and parent-teacher channels that keep every stakeholder informed and engaged in real time.',
    highlights: ['Broadcast notices', 'Parent-teacher chat', 'Read receipts'],
  },
];

const CAPABILITIES = [
  'Cloud-based, zero-infrastructure setup',
  'Multi-school and multi-branch management',
  'Role-based access for all user types',
  'Real-time data sync across devices',
  'Automated reporting and scheduled exports',
  'Open API for third-party integrations',
  '99.9 % uptime SLA with 24/7 support',
  'GDPR-compliant data handling',
];

/* 
   Sub-components
 */
const ServiceCard = ({ icon, title, tag, desc, highlights }) => (
  <div className="group glass-panel rounded-2xl border border-outline-variant/50 p-7 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
    {/* Icon + Tag row */}
    <div className="flex items-start justify-between">
      <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-200">
        <AppIcon name={icon} size={22} className="text-primary" />
      </div>
      <span className="text-[11px] font-semibold text-primary bg-primary/8 border border-primary/15 px-2.5 py-1 rounded-lg font-label tracking-wide">
        {tag}
      </span>
    </div>

    {/* Text */}
    <div className="flex-1">
      <h3 className="text-lg font-extrabold font-headline text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant font-body leading-relaxed">{desc}</p>
    </div>

    {/* Highlights */}
    <ul className="flex flex-col gap-1.5">
      {highlights.map((h) => (
        <li key={h} className="flex items-center gap-2 text-xs text-on-surface-variant font-body">
          <AppIcon name="check_circle" size={14} className="text-primary shrink-0" />
          {h}
        </li>
      ))}
    </ul>

    {/* Link */}
    <Link to="/contact" className="flex items-center gap-1.5 text-primary text-sm font-semibold group/btn pt-2 border-t border-outline-variant/40 w-fit font-label">
      Learn more
      <AppIcon
        name="arrow_forward"
        size={14}
        className="transition-transform duration-150 group-hover/btn:translate-x-1"
      />
    </Link>
  </div>
);

/* 
   Page
 */
const Services = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All' ? SERVICES : SERVICES.filter((s) => s.tag === activeTab);

  return (
    <SiteLayout>
      <div className="pb-24 overflow-x-hidden">

        {/* ── Page Hero ──────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-20 relative">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/8 border border-primary/15 mb-7">
              <AppIcon name="category" size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide font-label uppercase">
                Platform Services
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black font-headline tracking-tight leading-[1.06] text-on-surface mb-5">
              Educational{' '}
              <span className="hero-gradient-text">Intelligence</span>{' '}
              Redefined.
            </h1>

            <p className="text-on-surface-variant text-lg max-w-xl font-body leading-relaxed mb-8">
              Deploy a comprehensive ecosystem built for modern institutions. Every module is
              purpose-built, deeply integrated, and ready to scale with your school from day one.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/pricing" id="services-get-started" className="btn-primary px-7 py-3 text-base inline-flex items-center gap-2">
                <AppIcon name="rocket_launch" size={18} />
                Get Started Free
              </Link>
              <Link to="/pricing" id="services-view-pricing" className="btn-secondary px-7 py-3 text-base inline-flex items-center gap-2">
                <AppIcon name="credit_card" size={18} />
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ── Featured: Fee Management ───────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
          <div className="rounded-2xl bg-primary overflow-hidden shadow-[0_24px_80px_rgba(0,82,255,0.20)] flex flex-col md:flex-row">
            {/* Text side */}
            <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/15 border border-white/20 mb-6 w-fit">
                <AppIcon name="star" size={13} className="text-white" />
                <span className="text-xs font-semibold text-white tracking-wide font-label uppercase">
                  Featured Service
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black font-headline text-white mb-4 leading-tight">
                Fee Management
              </h2>
              <p className="text-white/78 font-body text-base leading-relaxed mb-8 max-w-md">
                A secure financial gateway that handles automated invoicing, digital receipts,
                overdue reminders, and comprehensive reconciliation dashboards — all in one place.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {['Automated billing', 'Online payments', 'Overdue alerts', 'Reconciliation reports'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/85 text-sm font-body">
                    <AppIcon name="check_circle" size={14} className="text-white shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                id="fee-management-learn-more"
                className="px-7 py-3 bg-white text-primary rounded-xl font-bold text-sm hover:bg-surface-container transition-colors w-fit inline-flex items-center gap-2"
              >
                <AppIcon name="payments" size={16} />
                Explore Fee Management
              </Link>
            </div>
            {/* Image side */}
            <div className="md:w-[440px] min-h-[280px] relative overflow-hidden">
              <img
                alt="Fee Management dashboard preview"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0eZFYGnLJrQIsQDxAskyOnW-ao8KqRlsHHutKl49zhfB3uekre4mumPTrcU-mZZFqzGQk4DT8C67sS4FqE0119GX3iE4UjLIGq-lZpz1FWWFo-Dlw6T2lntIzru57vy1P4VIBz1oTiOQXBhU5K9zqRYDV4vp-DTJixZDf0SZlbFHdjawShmVBNl2kZFOrUs2426ogyCwse7u3o0v5lfCUIRPVV-Abn322DDR8ETRQcnvzz6gxdpOPQ60bDTyj4-mJNolRKjLzBeM"
              />
              {/* Fade blend */}
              <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-primary to-transparent" />
            </div>
          </div>
        </section>

        {/* ── Service Cards Grid ─────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">
                All Services
              </p>
              <h2 className="text-3xl font-extrabold font-headline text-on-surface">
                Everything Your School Needs
              </h2>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  id={`tab-${cat.toLowerCase()}`}
                  onClick={() => setActiveTab(cat)}
                  className={[
                    'px-4 py-1.5 rounded-xl text-sm font-semibold font-label transition-all duration-150',
                    activeTab === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container-low border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-high',
                  ].join(' ')}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </section>

        {/* ── Capabilities Strip ─────────────────── */}
        <section className="bg-surface-container-low/60 border-y border-outline-variant/30 py-20 mb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              {/* Left label */}
              <div className="md:w-72 shrink-0">
                <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">
                  Platform Capabilities
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold font-headline text-on-surface leading-snug">
                  Built for scale, designed for simplicity.
                </h2>
              </div>

              {/* Checklist grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CAPABILITIES.map((cap) => (
                  <div
                    key={cap}
                    className="flex items-start gap-3 glass-panel rounded-xl border border-outline-variant/50 px-5 py-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                      <AppIcon name="check" size={16} className="text-primary" />
                    </div>
                    <span className="text-sm text-on-surface font-body leading-snug">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="rounded-2xl border border-outline-variant/50 glass-panel px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black font-headline text-on-surface mb-2">
                Not sure which plan fits your school?
              </h2>
              <p className="text-on-surface-variant font-body text-base max-w-md">
                Our team will walk you through every module and help you build the right stack for
                your institution — completely free.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" id="services-cta-demo" className="btn-primary px-8 py-3 text-base inline-flex items-center gap-2">
                <AppIcon name="calendar_today" size={18} />
                Book a Free Demo
              </Link>
              <Link to="/contact" id="services-cta-contact" className="btn-secondary px-8 py-3 text-base inline-flex items-center gap-2">
                <AppIcon name="call" size={18} />
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
};

export default Services;
