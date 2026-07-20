import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../../components/common/AppIcon';
import SiteLayout from '../../layouts/SiteLayout';

/* Global Pricing Data - This can be managed from the Global Pricing page in admin */
const GLOBAL_PRICING_DATA = [
  {
    id: 'basic',
    title: 'Basic',
    subtitle: 'Small Coaching Centres',
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: 'Everything you need to digitise a small institute and get up and running in hours.',
    features: [
      'Up to 50 Students',
      'Course Management',
      'Basic Attendance',
      'Email Support',
      'Basic Analytics',
    ],
    missing: ['Custom Branding', 'Priority Support', 'API Access'],
    primary: false,
    cta: 'Get Started',
  },
  {
    id: 'pro',
    title: 'Pro',
    subtitle: 'Growing Schools',
    monthlyPrice: 199,
    yearlyPrice: 159,
    description: 'The complete stack for schools that want to scale without operational friction.',
    features: [
      'Unlimited Students',
      'Multi-Teacher Management',
      'White-label Portal',
      'AI Progress Insights',
      'Advanced Analytics',
      'Priority Support',
      'API Access',
    ],
    missing: [],
    primary: true,
    badge: 'Most Popular',
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    subtitle: 'Large Institutions',
    monthlyPrice: 499,
    yearlyPrice: 399,
    description: 'Complete solution for large educational groups with custom requirements.',
    features: [
      'Unlimited Students',
      'Multi-Branch Management',
      'Advanced Attendance Systems',
      '24/7 Phone Support',
      'Custom Analytics',
      'White Label Solution',
      'API Access',
      'Dedicated Account Manager',
      'Custom Integrations',
    ],
    missing: [],
    primary: false,
    cta: 'Contact Sales',
  },
];

const PricingCard = ({ plan, yearly }) => {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = yearly ? '/mo (billed yearly)' : '/Monthly';

  return (
    <div
      className={`relative glass-panel rounded-2xl border ${
        plan.primary
          ? 'border-primary/30 bg-primary/5'
          : 'border-outline-variant/50 bg-surface'
      } p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
    >
      {plan.primary && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full font-label uppercase tracking-wide">
            {plan.badge || 'Most Popular'}
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-2">{plan.title}</h3>
        <p className="text-sm text-on-surface-variant mb-6">{plan.subtitle}</p>
        
        <div className="mb-6">
          <div className="text-4xl font-bold text-on-surface">
            ${price}
            <span className="text-lg font-normal text-on-surface-variant">{period}</span>
          </div>
        </div>
      </div>

      <p className="text-on-surface-variant text-sm mb-8 text-center">{plan.description}</p>

      <div className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <AppIcon name="check_circle" size={16} className="text-primary shrink-0" />
            <span className="text-sm text-on-surface">{feature}</span>
          </div>
        ))}
        {plan.missing.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 opacity-50">
            <AppIcon name="close" size={16} className="text-on-surface-variant shrink-0" />
            <span className="text-sm text-on-surface-variant">{feature}</span>
          </div>
        ))}
      </div>

      <Link
        to={plan.cta === 'Contact Sales' ? '/contact' : '/dashboard'}
        className={[
          'w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 text-center',
          plan.primary
            ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
            : 'btn-secondary',
        ].join(' ')}
      >
        {plan.cta === 'Contact Sales' && <AppIcon name="headset" size={16} />}
        {plan.cta === 'Get Started' && <AppIcon name="rocket_launch" size={16} />}
        {plan.cta === 'Start Free Trial' && <AppIcon name="rocket_launch" size={16} />}
        {plan.cta}
      </Link>
    </div>
  );
};

const REASONS = [
  {
    icon: 'rocket_launch',
    title: 'Lightning Fast Setup',
    desc: 'Go live in under 24 hours with our guided onboarding and pre-built templates.',
  },
  {
    icon: 'shield_check',
    title: 'Bank-Level Security',
    desc: 'FERPA-compliant data handling with end-to-end encryption and regular security audits.',
  },
  {
    icon: 'trending_up',
    title: 'Smart Analytics',
    desc: 'AI-powered insights that help you identify trends and improve student outcomes.',
  },
  {
    icon: 'users',
    title: 'Dedicated Support',
    desc: '24/7 customer success team with personalized training and ongoing support.',
  },
];

const FAQ = [
  {
    q: 'Can I change plans anytime?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle, and we\'ll prorate any differences.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, debit cards, ACH transfers, and purchase orders for enterprise customers.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! All plans come with a 14-day free trial. No credit card required, and you can cancel anytime.',
  },
  {
    q: 'Do you offer custom plans?',
    a: 'Absolutely! Contact our sales team for custom pricing tailored to your institution\'s specific needs.',
  },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-panel rounded-xl border border-outline-variant/50 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
      >
        <span className="text-sm font-semibold text-on-surface font-headline">{q}</span>
        <AppIcon
          name={open ? 'expand_less' : 'expand_more'}
          size={20}
          className="text-on-surface-variant shrink-0 transition-transform duration-150"
        />
      </button>
      {open && (
        <div className="px-6 pb-4 border-t border-outline-variant/40">
          <p className="text-sm text-on-surface-variant font-body leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  return (
    <SiteLayout>
      <div className="pb-24 -mt-16 overflow-x-hidden">

        {/* ── Hero ──────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 md:px-8 pt-16 pb-16 text-center relative">
          {/* Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/6 rounded-full blur-[100px]"
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/8 border border-primary/15 mb-7">
              <AppIcon name="payments" size={13} className="text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide font-label uppercase">
                Simple, Transparent Pricing
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black font-headline tracking-tight leading-[1.06] text-on-surface mb-5">
              The Future of Education,{' '}
              <span className="hero-gradient-text">Precisely Scaled.</span>
            </h1>

            <p className="text-on-surface-variant text-lg max-w-xl mx-auto font-body leading-relaxed mb-10">
              From boutique coaching centres to national institutions — find the plan that fits
              exactly where you are today, and scales to where you want to be.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-4 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5">
              <span
                className={[
                  'text-sm font-semibold font-label transition-colors',
                  !yearly ? 'text-on-surface' : 'text-on-surface-variant',
                ].join(' ')}
              >
                Monthly
              </span>
              <button
                id="billing-toggle"
                onClick={() => setYearly((y) => !y)}
                aria-pressed={yearly}
                className={[
                  'relative w-12 h-6 rounded-xl transition-colors duration-200 shrink-0',
                  yearly ? 'bg-primary' : 'bg-outline-variant',
                ].join(' ')}
              >
                <div
                  className={[
                    'absolute top-1 w-4 h-4 bg-white rounded-lg shadow-sm transition-all duration-200',
                    yearly ? 'left-7' : 'left-1',
                  ].join(' ')}
                />
              </button>
              <div className="flex items-center gap-2">
                <span
                  className={[
                    'text-sm font-semibold font-label transition-colors',
                    yearly ? 'text-on-surface' : 'text-on-surface-variant',
                  ].join(' ')}
                >
                  Yearly
                </span>
                <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-0.5 rounded-lg border border-primary/15 uppercase tracking-wide font-label">
                  Save 20%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing Cards ─────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {GLOBAL_PRICING_DATA.map((plan) => (
              <PricingCard key={plan.id} plan={plan} yearly={yearly} />
            ))}
          </div>

          <p className="text-center text-xs text-on-surface-variant font-body mt-6">
            All plans include a 14-day free trial · No credit card required · Cancel anytime
          </p>
        </section>

        {/* ── Why Skoolnet ──────────────────────── */}
        <section className="bg-surface-container-low/60 border-y border-outline-variant/30 py-20 mb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col lg:flex-row gap-14 items-start">
              {/* Left sticky column */}
              <div className="lg:w-72 shrink-0 lg:sticky lg:top-28">
                <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">
                  Why Skoolnet
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold font-headline text-on-surface mb-4 leading-snug">
                  Why Professionals Choose Skoolnet
                </h2>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8">
                  Beyond management, we provide the architectural foundation for meaningful learning
                  outcomes at scale.
                </p>

                {/* Testimonial */}
                <div className="glass-panel rounded-2xl border border-outline-variant/50 p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <AppIcon key={i} name="star" size={14} className="text-primary" />
                    ))}
                  </div>
                  <p className="text-sm italic text-on-surface font-body leading-relaxed mb-5">
                    "The administrative automation saved us 40+ hours a month. It's not a tool — it's a team member."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/40">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary font-label">SJ</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface font-headline">Sarah Jenkins</p>
                      <p className="text-xs text-on-surface-variant font-body">Director, Alpine Global School</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — features grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {REASONS.map((r) => (
                  <div
                    key={r.title}
                    className="group glass-panel rounded-2xl border border-outline-variant/50 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-200">
                      <AppIcon
                        name={r.icon}
                        size={20}
                        className="text-primary group-hover:text-white transition-colors duration-200"
                      />
                    </div>
                    <h4 className="font-headline text-base font-extrabold text-on-surface mb-2">{r.title}</h4>
                    <p className="text-sm text-on-surface-variant font-body leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 md:px-8 mb-24">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase font-label mb-2">
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold font-headline text-on-surface">
              Common Questions
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="rounded-2xl bg-primary relative overflow-hidden px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_24px_80px_rgba(0,82,255,0.22)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl"
            />

            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black font-headline text-white mb-2 leading-tight">
                Still have questions? Let's talk.
              </h2>
              <p className="text-white/75 font-body text-base max-w-md">
                Our team will help you pick the right plan and get your school live in under 24 hours.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 justify-center">
              <Link
                to="/dashboard"
                id="pricing-cta-trial"
                className="px-8 py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-surface-container transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <AppIcon name="rocket_launch" size={16} />
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                id="pricing-cta-sales"
                className="px-8 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-xl text-sm hover:bg-white/20 transition-colors inline-flex items-center gap-2"
              >
                <AppIcon name="call" size={16} />
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
};

export default Pricing;
