import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

const pricingPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    description: 'Essential features for small schools',
    price: '₹5,000',
    period: 'per month',
    features: [
      'Up to 200 students',
      'Basic attendance',
      'Fee management',
      'Email support',
    ],
    status: 'active',
    schools: 2,
  },
  {
    id: 2,
    name: 'Standard Plan',
    description: 'Complete solution for growing institutions',
    price: '₹12,000',
    period: 'per month',
    features: [
      'Up to 500 students',
      'Advanced attendance',
      'Fee management & reports',
      'SMS notifications',
      'Priority support',
    ],
    status: 'active',
    schools: 2,
  },
  {
    id: 3,
    name: 'Premium Plan',
    description: 'Enterprise features for large institutions',
    price: '₹25,000',
    period: 'per month',
    features: [
      'Unlimited students',
      'Complete LMS',
      'Custom reports',
      'API access',
      'Dedicated support',
    ],
    status: 'active',
    schools: 1,
  },
];

const studentPricing = [
  { range: '1-100 students', pricePerStudent: '₹50' },
  { range: '101-300 students', pricePerStudent: '₹40' },
  { range: '301-500 students', pricePerStudent: '₹30' },
  { range: '501+ students', pricePerStudent: '₹25' },
];

export default function PartnerPricing() {
  const [activeTab, setActiveTab] = useState('plans');

  return (
    <DashboardPage
      eyebrow="Partner Management"
      title="Pricing"
      actions={
        <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
          <AppIcon name="add" size={16} />
          Create New Plan
        </button>
      }
    >
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('plans')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'plans'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Pricing Plans
        </button>
        <button
          onClick={() => setActiveTab('student')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'student'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Student-based Pricing
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'text-primary border-b-2 border-primary'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Pricing History
        </button>
      </div>

      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{plan.name}</h3>
                  <p className="text-sm text-slate-500">{plan.description}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700">
                  {plan.status}
                </span>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-sm text-slate-500"> {plan.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                    <AppIcon name="check_circle" size={16} className="text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-3">
                  Used by <span className="font-semibold text-slate-900">{plan.schools} schools</span>
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all">
                    Edit Plan
                  </button>
                  <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all">
                    <AppIcon name="visibility" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'student' && (
        <SectionCard title="Student-based Pricing" description="Dynamic pricing based on student count">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Student Range</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Price per Student</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentPricing.map((tier, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-medium text-sm text-slate-900">{tier.range}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{tier.pricePerStudent}</p>
                    </td>
                    <td className="py-3 px-3">
                      <button className="p-2 rounded hover:bg-slate-100 transition-colors">
                        <AppIcon name="edit" size={14} className="text-slate-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-start gap-3">
              <AppIcon name="info" size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-blue-900">Tiered Pricing Benefit</p>
                <p className="text-xs text-blue-700 mt-1">
                  As your schools grow, the per-student cost decreases. This incentivizes partners to add more students to their network.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {activeTab === 'history' && (
        <SectionCard title="Pricing History" description="Recent changes to your pricing plans">
          <div className="space-y-4">
            {[
              { date: '2024-03-15', action: 'Updated Premium Plan', details: 'Added API access feature', user: 'Partner Admin' },
              { date: '2024-03-01', action: 'Created Basic Plan', details: 'New entry-level plan for small schools', user: 'Partner Admin' },
              { date: '2024-02-20', action: 'Price adjustment', details: 'Standard Plan: ₹10,000 → ₹12,000', user: 'Partner Admin' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <AppIcon name="edit" size={20} className="text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-900">{item.action}</p>
                  <p className="text-xs text-slate-500">{item.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">{item.date}</p>
                  <p className="text-xs text-slate-400">{item.user}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </DashboardPage>
  );
}