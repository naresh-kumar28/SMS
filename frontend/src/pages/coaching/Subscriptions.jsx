import { useState, useMemo } from 'react';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../components/common/DashboardPrimitives';

const subscriptionStats = [
  { icon: 'card_membership', label: 'Active Plans', value: '5', change: '+1', helper: 'Current', tone: 'blue' },
  { icon: 'group', label: 'Subscribers', value: '1,156', change: '+89', helper: 'Active', tone: 'emerald' },
  { icon: 'payments', label: 'MRR', value: '₹85K', change: '+₹12K', helper: 'Monthly', tone: 'rose' },
  { icon: 'calendar_today', label: 'Yearly', value: '₹9.8L', change: '+₹1.2L', helper: 'ARR', tone: 'amber' },
  { icon: 'swap_horiz', label: 'Churn', value: '2.5%', change: '-0.5%', helper: 'Rate', tone: 'purple' },
  { icon: 'trending_up', label: 'LTV', value: '₹12K', change: '+₹2K', helper: 'Average', tone: 'green' },
];

const plans = [
  { id: 1, name: 'NEET Monthly', duration: '1 month', price: 2500, students: 450, features: ['All video lectures', 'Study materials', 'Mock tests'], status: 'active' },
  { id: 2, name: 'NEET Yearly', duration: '12 months', price: 25000, students: 320, features: ['All video lectures', 'Study materials', 'Mock tests', 'Live classes'], status: 'active' },
  { id: 3, name: 'JEE Complete', duration: '12 months', price: 35000, students: 280, features: ['All video lectures', 'Study materials', 'Mock tests', 'Live classes', 'Doubt solving'], status: 'active' },
  { id: 4, name: 'Coding Pro', duration: '3 months', price: 15000, students: 106, features: ['Video courses', 'Projects', 'Certificate'], status: 'active' },
  { id: 5, name: 'Trial', duration: '7 days', price: 0, students: 54, features: ['Limited videos', 'Sample tests'], status: 'active' },
];

export default function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlans = useMemo(() => {
    return plans.filter(plan => 
      plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getStatusTone = (status) => {
    switch(status) {
      case 'active': return 'emerald';
      case 'inactive': return 'slate';
      default: return 'slate';
    }
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return 'Free';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <DashboardPage
      eyebrow="Monetization"
      title="Subscriptions"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Create Plan
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="settings" size={16} />
            Settings
          </button>
        </>
      }
    >
      <MetricGrid>
        {subscriptionStats.map((stat, index) => (
          <MetricCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            helper={stat.helper}
            tone={stat.tone}
          />
        ))}
      </MetricGrid>

      <SectionCard title="Pricing Plans" description="Manage subscription plans">
        <div className="mb-6">
          <div className="relative max-w-md">
            <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900">{plan.name}</h3>
                <StatusBadge tone={getStatusTone(plan.status)}>
                  {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                </StatusBadge>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary">{formatCurrency(plan.price)}</span>
                <span className="text-sm text-slate-500">/{plan.duration}</span>
              </div>
              <div className="mb-4 text-sm text-slate-600">
                <span className="font-medium">{plan.students}</span> subscribers
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                    <AppIcon name="check" size={16} className="text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:shadow-lg transition-all">
                  View Users
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}