import React, { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  SectionCard,
} from '../../components/common/DashboardPrimitives';
import { usePricingPlans } from '../../hooks/api/useLanding';
import { DashboardSkeleton } from '../../components/common/Skeleton';

/* Global Pricing Management Component */
const GlobalPricing = () => {
  const { data: serverPlans, isLoading } = usePricingPlans();
  
  // Transform server plans to UI format
  const plans = serverPlans ? serverPlans.map(p => ({
    id: p.id,
    title: p.name,
    subtitle: '',
    monthlyPrice: p.price,
    yearlyPrice: p.price,
    description: p.description,
    features: p.features ? p.features.split('\n') : [],
    missing: [],
    primary: p.is_featured,
    cta: p.is_featured ? 'Most Popular' : 'Get Started',
  })) : [];

  const [editingPlan, setEditingPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showAddPlan, setShowAddPlan] = useState(false);

  const handleEditPlan = (plan) => {
    setEditingPlan({ ...plan });
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      setEditingPlan(null);
    }
  };

  const handleDeletePlan = (planId) => {
    setPlans(plans.filter(p => p.id !== planId));
  };

  const handleAddPlan = () => {
    const newPlan = {
      id: `plan_${Date.now()}`,
      title: 'New Plan',
      subtitle: 'New Plan Description',
      monthlyPrice: 99,
      yearlyPrice: 79,
      description: 'Description for new plan',
      features: ['Feature 1', 'Feature 2'],
      missing: [],
      primary: false,
      cta: 'Get Started',
    };
    setPlans([...plans, newPlan]);
    setShowAddPlan(false);
  };

  const updatePlanField = (field, value) => {
    setEditingPlan({ ...editingPlan, [field]: value });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...editingPlan.features];
    newFeatures[index] = value;
    setEditingPlan({ ...editingPlan, features: newFeatures });
  };

  const addFeature = () => {
    setEditingPlan({ ...editingPlan, features: [...editingPlan.features, 'New Feature'] });
  };

  const removeFeature = (index) => {
    const newFeatures = editingPlan.features.filter((_, i) => i !== index);
    setEditingPlan({ ...editingPlan, features: newFeatures });
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <DashboardPage
      eyebrow="Monetization Strategy"
      title="Global Pricing Management"
      actions={
        <>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            <AppIcon name="sync" size={16} className="text-primary" />
            {billingCycle === 'monthly' ? 'Switch to Yearly' : 'Switch to Monthly'}
          </button>
          <button
            onClick={() => setShowAddPlan(true)}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
          >
            <AppIcon name="add" size={16} />
            Add New Plan
          </button>
        </>
      }
    >
      <div className="space-y-8">
        {/* Add New Plan Modal */}
        {showAddPlan && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-surface rounded-2xl p-8 max-w-md w-full border border-outline-variant/20 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <AppIcon name="payments" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Create New Plan</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">This will create a new pricing plan with default settings that you can then customise to your needs.</p>
              <div className="flex gap-4">
                <button
                  onClick={handleAddPlan}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Confirm & Create
                </button>
                <button
                  onClick={() => setShowAddPlan(false)}
                  className="flex-1 px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold hover:bg-surface-container-highest transition-all border border-outline-variant/40"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-surface rounded-2xl border transition-all duration-300 ${
                plan.primary 
                  ? 'border-primary shadow-[0_20px_50px_rgba(0,82,255,0.15)] ring-1 ring-primary/20' 
                  : 'border-outline-variant/20 shadow-sm'
              } p-8 relative flex flex-col h-full`}
            >
              {plan.primary && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg">
                    {plan.cta || 'Recommended'}
                  </span>
                </div>
              )}

              {editingPlan?.id === plan.id ? (
                /* Edit Mode */
                <div className="space-y-5">
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-on-surface mb-1">Edit Plan</h4>
                    <p className="text-xs text-on-surface-variant">Update the details for the {plan.title} plan.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 ml-1">Plan Title</label>
                      <input
                        type="text"
                        value={editingPlan.title}
                        onChange={(e) => updatePlanField('title', e.target.value)}
                        className="w-full px-4 py-2.5 border border-outline-variant/40 bg-white text-on-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 ml-1">Subtitle</label>
                      <input
                        type="text"
                        value={editingPlan.subtitle}
                        onChange={(e) => updatePlanField('subtitle', e.target.value)}
                        className="w-full px-4 py-2.5 border border-outline-variant/40 bg-white text-on-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm ml-0"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 ml-1">Monthly</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-bold">$</span>
                          <input
                            type="number"
                            value={editingPlan.monthlyPrice}
                            onChange={(e) => updatePlanField('monthlyPrice', parseInt(e.target.value))}
                            className="w-full pl-7 pr-3 py-2.5 border border-outline-variant/40 bg-white text-on-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 ml-1">Yearly</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-bold">$</span>
                          <input
                            type="number"
                            value={editingPlan.yearlyPrice}
                            onChange={(e) => updatePlanField('yearlyPrice', parseInt(e.target.value))}
                            className="w-full pl-7 pr-3 py-2.5 border border-outline-variant/40 bg-white text-on-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 ml-1">Features</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {editingPlan.features.map((feature, index) => (
                          <div key={index} className="flex gap-2 group">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-outline-variant/20 bg-white text-on-surface rounded-lg text-xs"
                            />
                            <button
                              onClick={() => removeFeature(index)}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <AppIcon name="delete" size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={addFeature}
                        className="mt-3 w-full px-3 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 border border-slate-200 text-xs font-bold"
                      >
                        <AppIcon name="add" size={14} />
                        Add Feature
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={handleSavePlan}
                      className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingPlan(null)}
                      className="px-4 py-2.5 bg-white text-on-surface-variant rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex flex-col h-full">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-on-surface mb-2 font-headline">{plan.title}</h3>
                    <p className="text-on-surface-variant text-sm font-medium">{plan.subtitle}</p>
                  </div>
                  
                  <div className="text-center mb-8 bg-slate-50/50 rounded-2xl py-6 border border-slate-100">
                    <div className="text-5xl font-black text-on-surface font-headline tracking-tighter">
                      <span className="text-2xl font-bold text-on-surface-variant mr-1">$</span>
                      {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </div>
                    <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-2">
                       per {billingCycle === 'monthly' ? 'month' : 'month, billed annually'}
                    </div>
                  </div>

                  <p className="text-on-surface-variant text-sm mb-8 text-center leading-relaxed font-medium">{plan.description}</p>

                  <div className="space-y-3.5 mb-10 flex-1">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <AppIcon name="check" size={12} className="text-primary font-bold" />
                        </div>
                        <span className="text-sm text-on-surface font-medium">{feature}</span>
                      </div>
                    ))}
                    {plan.missing.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 opacity-40">
                        <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                          <AppIcon name="close" size={12} className="text-slate-400" />
                        </div>
                        <span className="text-sm text-on-surface-variant line-through">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className="flex-1 px-4 py-3 bg-white border border-slate-200 text-on-surface rounded-xl font-bold text-sm hover:bg-slate-50 hover:shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <AppIcon name="edit" size={16} className="text-primary" />
                      Configure
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="p-3 bg-white border border-rose-100 text-rose-500 rounded-xl hover:bg-rose-50 transition-all shadow-sm"
                      title="Delete Plan"
                    >
                      <AppIcon name="delete" size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardPage>
  );
};

export default GlobalPricing;

