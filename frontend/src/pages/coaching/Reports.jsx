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

const reportStats = [
  { icon: 'assessment', label: 'Reports Generated', value: '84', change: '+12', helper: 'This month', tone: 'blue' },
  { icon: 'visibility', label: 'Views', value: '1,256', change: '+234', helper: 'Total', tone: 'emerald' },
  { icon: 'download', label: 'Downloads', value: '428', change: '+56', helper: 'PDF/Excel', tone: 'amber' },
  { icon: 'trending_up', label: 'Most Viewed', value: 'Revenue', change: '320', helper: 'Views', tone: 'rose' },
  { icon: 'payments', label: 'Revenue', value: '₹4.2L', change: '+₹0.8L', helper: 'This month', tone: 'purple' },
  { icon: 'group', label: 'Students', value: '1,284', change: '+72', helper: 'Enrolled', tone: 'green' },
];

const reports = [
  { id: 1, name: 'Revenue Report - January 2024', type: 'Finance', format: 'PDF', generatedDate: '2024-01-25', generatedBy: 'System', size: '2.4 MB', views: 320, downloads: 145, status: 'available' },
  { id: 2, name: 'Student Enrollment Report', type: 'Admissions', format: 'Excel', generatedDate: '2024-01-24', generatedBy: 'Admin', size: '1.2 MB', views: 180, downloads: 85, status: 'available' },
  { id: 3, name: 'Course Performance Report', type: 'Academic', format: 'PDF', generatedDate: '2024-01-23', generatedBy: 'System', size: '3.1 MB', views: 145, downloads: 78, status: 'available' },
  { id: 4, name: 'Teacher Performance', type: 'Staff', format: 'Excel', generatedDate: '2024-01-22', generatedBy: 'HR', size: '0.8 MB', views: 95, downloads: 55, status: 'available' },
  { id: 5, name: 'Monthly Test Analytics', type: 'Academic', format: 'PDF', generatedDate: '2024-01-21', generatedBy: 'System', size: '4.5 MB', views: 210, downloads: 92, status: 'available' },
  { id: 6, name: 'Content Usage Report', type: 'Content', format: 'PDF', generatedDate: '2024-01-20', generatedBy: 'System', size: '1.5 MB', views: 85, downloads: 42, status: 'available' },
];

export default function CoachingReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || report.type === typeFilter;
      const matchesFormat = formatFilter === 'all' || report.format === formatFilter;
      return matchesSearch && matchesType && matchesFormat;
    });
  }, [searchTerm, typeFilter, formatFilter]);

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Admissions', label: 'Admissions' },
    { value: 'Academic', label: 'Academic' },
    { value: 'Staff', label: 'Staff' },
    { value: 'Content', label: 'Content' },
  ];

  const formatOptions = [
    { value: 'all', label: 'All Formats' },
    { value: 'PDF', label: 'PDF' },
    { value: 'Excel', label: 'Excel' },
  ];

  const getFormatTone = (format) => {
    switch(format) {
      case 'PDF': return 'rose';
      case 'Excel': return 'emerald';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Analytics"
      title="Reports"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Generate Report
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="schedule" size={16} />
            Schedule
          </button>
        </>
      }
    >
      <MetricGrid>
        {reportStats.map((stat, index) => (
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

      <SectionCard title="Available Reports" description="Generate and download coaching reports">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={typeFilter} onChange={setTypeFilter} options={typeOptions} className="min-w-[140px]" />
            <Dropdown value={formatFilter} onChange={setFormatFilter} options={formatOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Report Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Format</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Generated</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">By</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Size</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Views</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Downloads</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500">
                    No reports found.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{report.name}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{report.type}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getFormatTone(report.format)}>
                        {report.format}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{report.generatedDate}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{report.generatedBy}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{report.size}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{report.views}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{report.downloads}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="Preview"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-blue-100 transition-colors" title="Download"><AppIcon name="download" size={14} className="text-blue-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="Share"><AppIcon name="share" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}