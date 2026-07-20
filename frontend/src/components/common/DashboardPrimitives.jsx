import AppIcon from './AppIcon';



const badgeTones = {
  amber: 'bg-amber-100 text-amber-700',
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  rose: 'bg-rose-100 text-rose-700',
  slate: 'bg-slate-100 text-slate-700',
};

export function DashboardPage({ eyebrow, title, description, actions, children }) {
  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">{eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-['Manrope'] font-extrabold text-on-surface tracking-tight">{title}</h2>
          <p className="text-on-surface-variant mt-1 font-medium text-sm">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {actions}
        </div>
      </div>

      {children}
    </section>
  );
}

export function MetricGrid({ children }) {
  return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{children}</div>;
}

export function MetricCard({ icon, label, value, change, helper, tone = 'blue' }) {
  const borderColors = {
    blue: 'border-blue-200',
    emerald: 'border-emerald-200',
    amber: 'border-amber-200',
    rose: 'border-rose-200',
    purple: 'border-purple-200',
    green: 'border-green-200',
  };

  const textColors = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    rose: 'text-rose-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
  };

  const borderColor = borderColors[tone] || borderColors.blue;
  const textColor = textColors[tone] || textColors.blue;

  return (
    <div className={`border-l-4 ${borderColor} bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-2">
        <AppIcon name={icon} size={16} className={textColor} />
        <span className={`text-xs font-medium ${textColor}`}>{change}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-sm text-slate-600 font-medium">{label}</p>
      <p className="text-xs text-slate-400 mt-1">{helper}</p>
    </div>
  );
}

export function SectionCard({ title, description, actions, className = '', children }) {
  return (
    <section className={`glass-card p-8 rounded-3xl shadow-sm border border-slate-100 ${className}`.trim()}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-lg font-bold text-on-surface">{title}</h4>
          <p className="text-xs text-on-surface-variant font-medium">{description}</p>
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

export function StatusBadge({ tone = 'slate', children }) {
  const toneClass = badgeTones[tone] ?? badgeTones.slate;

  return (
    <span className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${toneClass}`}>
      {children}
    </span>
  );
}
