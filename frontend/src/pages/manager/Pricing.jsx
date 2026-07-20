import { useState, useMemo, useEffect } from 'react';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import Pagination from '../../components/common/Pagination';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';
import toast from 'react-hot-toast';

const pricingStats = [
  { label: 'Total Plans', value: '12', change: '+2', helper: 'Active pricing plans', tone: 'blue' },
  { label: 'Custom Plans', value: '5', change: '+1', helper: 'Custom created', tone: 'purple' },
  { label: 'Revenue', value: '₹8.7L', change: '+18%', helper: 'This month', tone: 'emerald' },
  { label: 'Active Schools', value: '84', change: '+6', helper: 'Using plans', tone: 'amber' },
  { label: 'Avg Plan Value', value: '₹10.3K', change: '+5%', helper: 'Per school', tone: 'rose' },
  { label: 'Pending', value: '3', change: '-2', helper: 'Custom plan', tone: 'orange' },
];

const pricingPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    type: 'standard',
    price: '5,000',
    duration: 'monthly',
    features: ['Up to 100 students', 'Basic support', 'Standard features'],
    schools: 25,
    status: 'active',
    createdBy: 'Admin',
    createdAt: '2023-01-15',
    revenue: '1.25L'
  },
  {
    id: 2,
    name: 'Premium Plan',
    type: 'standard',
    price: '10,000',
    duration: 'monthly',
    features: ['Up to 500 students', 'Priority support', 'Advanced features', 'Custom branding'],
    schools: 35,
    status: 'active',
    createdBy: 'Admin',
    createdAt: '2023-01-15',
    revenue: '3.5L'
  },
  {
    id: 3,
    name: 'Enterprise Plan',
    type: 'standard',
    price: '25,000',
    duration: 'monthly',
    features: ['Unlimited students', '24/7 support', 'All features', 'Custom integrations', 'Dedicated manager'],
    schools: 15,
    status: 'active',
    createdBy: 'Admin',
    createdAt: '2023-01-15',
    revenue: '3.75L'
  },
  {
    id: 4,
    name: 'Summer Special',
    type: 'custom',
    price: '3,000',
    duration: 'one-time',
    features: ['Summer camp access', 'Basic materials', '3 months duration'],
    schools: 5,
    status: 'active',
    createdBy: 'Rajesh Kumar',
    createdAt: '2024-02-10',
    revenue: '15K'
  },
  {
    id: 5,
    name: 'Teacher Package',
    type: 'custom',
    price: '8,000',
    duration: 'quarterly',
    features: ['Training modules', 'Certification', 'Ongoing support'],
    schools: 3,
    status: 'active',
    createdBy: 'Sarah Williams',
    createdAt: '2024-01-20',
    revenue: '24K'
  },
];

export default function Pricing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const itemsPerPage = 10;

  const filteredPlans = useMemo(() => {
    return pricingPlans.filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plan.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || plan.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const paginatedPlans = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPlans.slice(startIndex, endIndex);
  }, [filteredPlans, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'standard', label: 'Standard' },
    { value: 'custom', label: 'Custom' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <DashboardPage
      eyebrow="Pricing Management"
      title="Pricing Plans"
      actions={
        <>
          <button 
            type="button" 
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2"
            onClick={() => {
              toast.success('Custom Plan modal opened');
            }}
          >
            <AppIcon name="add" size={16} />
            Add Custom Plan
          </button>
          <button type="button" className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} className="text-primary" />
            Export Plans
          </button>
        </>
      }
    >
      <MetricGrid>
        {pricingStats.map((stat, index) => {
          const icons = {
            'Total Plans': 'payments',
            'Custom Plans': 'star',
            'Revenue': 'trending_up',
            'Active Schools': 'groups',
            'Avg Plan Value': 'bar_chart_3',
            'Pending Requests': 'pending'
          };
          return (
            <MetricCard
              key={index}
              icon={icons[stat.label] || 'payments'}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              helper={stat.helper}
              tone={stat.tone}
            />
          );
        })}
      </MetricGrid>

      <SectionCard>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search pricing plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Dropdown
              value={typeFilter}
              onChange={setTypeFilter}
              options={typeOptions}
              className="min-w-35"
            />
            <Dropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              className="min-w-35"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.length === 0 ? (
            <div className="col-span-full py-16 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AppIcon name="payments" size={32} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No pricing plans found</h3>
              <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          ) : (
            paginatedPlans.map((plan) => (
              <div key={plan.id} className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:border-primary/30 ${
                plan.type === 'custom' 
                  ? 'border-purple-200 bg-linear-to-br from-purple-50/50 to-white hover:border-purple-300' 
                  : 'border-slate-200 bg-linear-to-br from-slate-50/50 to-white hover:border-slate-300'
              }`}>
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 ${
                  plan.type === 'custom' ? 'bg-purple-500' : 'bg-primary'
                } -translate-y-16 translate-x-16`} />
                
                <div className="relative p-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      plan.type === 'custom' 
                        ? 'bg-linear-to-br from-purple-500 to-purple-600' 
                        : 'bg-linear-to-br from-primary to-primary/80'
                    } border border-white/20 shadow-sm`}>
                      <AppIcon name={plan.type === 'custom' ? 'star' : 'payments'} size={20} className="text-white" />
                    </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[18px] text-slate-900 mb-1">{plan.name}</h3>
                      </div>
                  </div>

                  {/* Type */}
                  <div className="flex items-center justify-center mb-4 gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-semibold shrink-0 ${
                      plan.type === 'custom' 
                        ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      <AppIcon name={plan.type === 'custom' ? 'star' : 'payments'} size={12} />
                      <span className="capitalize">{plan.type}</span>
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-slate-900">₹ {plan.price}</span>
                      <span className="text-sm text-slate-500">/{plan.duration}</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <p className="text-lg font-bold text-slate-900">{plan.schools}</p>
                      <p className="text-xs text-slate-500">Schools</p>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <p className="text-lg font-bold text-slate-900">Rs.{plan.revenue}</p>
                      <p className="text-xs text-slate-500">Revenue</p>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="flex-1 mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Features</h4>
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            plan.type === 'custom' ? 'bg-purple-100' : 'bg-emerald-100'
                          }`}>
                            <AppIcon name="check" size={10} className={plan.type === 'custom' ? 'text-purple-600' : 'text-emerald-600'} />
                          </div>
                          <span className="text-sm text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Creator info */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>Created by {plan.createdBy}</span>
                    <span>{plan.createdAt}</span>
                  </div>
                  
                  {/* Apply and More Options buttons */}
                  <div className="flex gap-2">
                    <button className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      plan.type === 'custom'
                        ? 'bg-linear-to-r from-purple-500 to-purple-600 text-white border border-purple-400/20'
                        : 'bg-linear-to-r from-primary to-primary/80 text-white border border-primary-light/20'
                    }`}>
                      Apply Now
                    </button>
                    
                    <div className="relative">
                      <button 
                        className={`px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                          plan.type === 'custom'
                            ? 'border-purple-200 text-purple-700 hover:bg-purple-50'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                        onClick={() => setActiveDropdown(activeDropdown === plan.id ? null : plan.id)}
                      >
                        <AppIcon name="more_vert" size={16} />
                      </button>
                      
                      {activeDropdown === plan.id && (
                        <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-lg border border-slate-200 shadow-lg z-10">
                          <button 
                            onClick={() => {
                              setActiveDropdown(null);
                              toast.success(`Editing ${plan.name}...`);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                          >
                            <AppIcon name="edit" size={14} />
                            Edit Plan
                          </button>
                          <button 
                            onClick={() => {
                              setActiveDropdown(null);
                              toast.error(`${plan.name} deletion pending confirmation`);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                          >
                            <AppIcon name="delete" size={14} />
                            Delete Plan
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {filteredPlans.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredPlans.length}
            className="mt-6"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
