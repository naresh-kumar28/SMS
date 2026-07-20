export default function PagePlaceholder({ eyebrow, title, description }) {
  return (
    <section className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
    </section>
  );
}
