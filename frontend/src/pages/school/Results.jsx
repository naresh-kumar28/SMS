import { useState, useMemo } from 'react';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import Pagination from '../../components/common/Pagination';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../components/common/DashboardPrimitives';

const resultStats = [
  { icon: 'assignment', label: 'Total Exams', value: '24', change: '+4', helper: 'This term', tone: 'blue' },
  { icon: 'check_circle', label: 'Published', value: '18', change: '+2', helper: 'Released', tone: 'emerald' },
  { icon: 'pending', label: 'Pending', value: '6', change: '-', helper: 'To release', tone: 'amber' },
  { icon: 'trending_up', label: 'Avg Score', value: '72%', change: '+5%', helper: 'School', tone: 'purple' },
  { icon: 'star', label: 'Top Score', value: '98%', change: '+2%', helper: 'Highest', tone: 'rose' },
  { icon: 'school', label: 'Class Avg', value: '68%', change: '+3%', helper: 'Improvement', tone: 'green' },
];

const results = [
  { id: 1, examName: 'Mathematics - Mid Term', class: 'Class 10-A', subject: 'Mathematics', examDate: '2024-01-20', publishedDate: '2024-01-25', status: 'published', totalStudents: 45, avgScore: 74, highestScore: 98, passRate: 91 },
  { id: 2, examName: 'Science - Mid Term', class: 'Class 10-A', subject: 'Science', examDate: '2024-01-18', publishedDate: '2024-01-23', status: 'published', totalStudents: 45, avgScore: 68, highestScore: 95, passRate: 87 },
  { id: 3, examName: 'English - Mid Term', class: 'Class 10-A', subject: 'English', examDate: '2024-01-22', publishedDate: '2024-01-28', status: 'published', totalStudents: 45, avgScore: 76, highestScore: 97, passRate: 93 },
  { id: 4, examName: 'Physics - Unit Test', class: 'Class 12-A', subject: 'Physics', examDate: '2024-01-25', publishedDate: '-', status: 'pending', totalStudents: 38, avgScore: 0, highestScore: 0, passRate: 0 },
  { id: 5, examName: 'Chemistry - Unit Test', class: 'Class 12-A', subject: 'Chemistry', examDate: '2024-01-24', publishedDate: '-', status: 'pending', totalStudents: 38, avgScore: 0, highestScore: 0, passRate: 0 },
  { id: 6, examName: 'History - Mid Term', class: 'Class 9-A', subject: 'History', examDate: '2024-01-19', publishedDate: '2024-01-24', status: 'published', totalStudents: 42, avgScore: 71, highestScore: 92, passRate: 85 },
  { id: 7, examName: 'Geography - Mid Term', class: 'Class 9-A', subject: 'Geography', examDate: '2024-01-21', publishedDate: '2024-01-26', status: 'published', totalStudents: 42, avgScore: 73, highestScore: 94, passRate: 88 },
  { id: 8, examName: 'Computer - Final', class: 'Class 11-A', subject: 'Computer', examDate: '2024-01-28', publishedDate: '-', status: 'pending', totalStudents: 35, avgScore: 0, highestScore: 0, passRate: 0 },
  { id: 9, examName: 'Mathematics - Quarterly', class: 'Class 10-B', subject: 'Mathematics', examDate: '2024-01-15', publishedDate: '2024-01-20', status: 'published', totalStudents: 40, avgScore: 69, highestScore: 91, passRate: 83 },
  { id: 10, examName: 'Biology - Unit Test', class: 'Class 12-A', subject: 'Biology', examDate: '2024-01-26', publishedDate: '-', status: 'draft', totalStudents: 38, avgScore: 0, highestScore: 0, passRate: 0 },
];

export default function Results() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredResults = useMemo(() => {
    return results.filter(result => {
      const matchesSearch = result.examName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       result.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = classFilter === 'all' || result.class === classFilter;
      const matchesStatus = statusFilter === 'all' || result.status === statusFilter;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [searchTerm, classFilter, statusFilter]);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResults.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResults, currentPage, itemsPerPage]);

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'Class 10-A', label: 'Class 10-A' },
    { value: 'Class 10-B', label: 'Class 10-B' },
    { value: 'Class 9-A', label: 'Class 9-A' },
    { value: 'Class 12-A', label: 'Class 12-A' },
    { value: 'Class 11-A', label: 'Class 11-A' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'pending', label: 'Pending' },
    { value: 'draft', label: 'Draft' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'published': return 'emerald';
      case 'pending': return 'amber';
      case 'draft': return 'slate';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Academic records"
      title="Results Management"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Add Result
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="upload" size={16} />
            Upload Marks
          </button>
        </>
      }
    >
      <MetricGrid>
        {resultStats.map((stat, index) => (
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

      <SectionCard title="Exam Results" description="Student performance across exams">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={classFilter} onChange={setClassFilter} options={classOptions} className="min-w-[140px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Exam Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Class</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Subject</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Exam Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Students</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Avg Score</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Top Score</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Pass Rate</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedResults.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-slate-500">
                    No results found.
                  </td>
                </tr>
              ) : (
                paginatedResults.map((result) => (
                  <tr key={result.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{result.examName}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{result.class}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{result.subject}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{result.examDate}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{result.totalStudents}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">
                      {result.avgScore > 0 ? `${result.avgScore}%` : '-'}
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">
                      {result.highestScore > 0 ? `${result.highestScore}%` : '-'}
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">
                      {result.passRate > 0 ? `${result.passRate}%` : '-'}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(result.status)}>
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="View Details"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="Edit"><AppIcon name="edit" size={14} className="text-slate-600" /></button>
                        {result.status === 'pending' && (
                          <button className="p-2 rounded hover:bg-emerald-100 transition-colors" title="Publish"><AppIcon name="publish" size={14} className="text-emerald-600" /></button>
                        )}
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredResults.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredResults.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredResults.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}