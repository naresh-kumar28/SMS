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
  { icon: 'assignment', label: 'Total Tests', value: '124', change: '+18', helper: 'This month', tone: 'blue' },
  { icon: 'check_circle', label: 'Completed', value: '98', change: '+12', helper: 'Tests', tone: 'emerald' },
  { icon: 'trending_up', label: 'Avg Score', value: '72%', change: '+5%', helper: 'School', tone: 'purple' },
  { icon: 'star', label: 'Top Score', value: '98%', change: '+2%', helper: 'Highest', tone: 'rose' },
  { icon: 'school', label: 'Pass Rate', value: '85%', change: '+3%', helper: 'Students', tone: 'amber' },
  { icon: 'analytics', label: 'Improvement', value: '+12%', change: '+2%', helper: 'MoM', tone: 'green' },
];

const results = [
  { id: 1, testName: 'NEET Mock Test 1', course: 'NEET Foundation', totalStudents: 450, attempted: 420, avgScore: 72, highestScore: 98, passRate: 85, date: '2024-01-25' },
  { id: 2, testName: 'JEE Mock Test 1', course: 'JEE Advanced', totalStudents: 320, attempted: 298, avgScore: 68, highestScore: 95, passRate: 78, date: '2024-01-24' },
  { id: 3, testName: 'Physics Chapter Test', course: 'NEET Foundation', totalStudents: 450, attempted: 410, avgScore: 75, highestScore: 100, passRate: 88, date: '2024-01-22' },
  { id: 4, testName: 'Chemistry Chapter Test', course: 'JEE Mains', totalStudents: 280, attempted: 255, avgScore: 65, highestScore: 92, passRate: 72, date: '2024-01-20' },
  { id: 5, testName: 'Math Weekly Test', course: 'Coding Bootcamp', totalStudents: 180, attempted: 165, avgScore: 78, highestScore: 95, passRate: 82, date: '2024-01-18' },
];

export default function CoachingResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredResults = useMemo(() => {
    return results.filter(result => {
      const matchesSearch = result.testName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = courseFilter === 'all' || result.course === courseFilter;
      return matchesSearch && matchesCourse;
    });
  }, [searchTerm, courseFilter]);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResults.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResults, currentPage]);

  const courseOptions = [
    { value: 'all', label: 'All Courses' },
    { value: 'NEET Foundation', label: 'NEET Foundation' },
    { value: 'JEE Advanced', label: 'JEE Advanced' },
    { value: 'JEE Mains', label: 'JEE Mains' },
    { value: 'Coding Bootcamp', label: 'Coding Bootcamp' },
  ];

  return (
    <DashboardPage
      eyebrow="Performance"
      title="Results"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Create Test
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} />
            Export
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

      <SectionCard title="Test Results" description="Student performance and test analytics">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={courseFilter} onChange={setCourseFilter} options={courseOptions} className="min-w-[150px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Test Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Course</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Attempted</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Avg Score</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Top Score</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Pass Rate</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedResults.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No results found.
                  </td>
                </tr>
              ) : (
                paginatedResults.map((result) => (
                  <tr key={result.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{result.testName}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{result.course}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">
                      <span className="text-emerald-600 font-medium">{result.attempted}</span>
                      <span className="text-slate-400">/{result.totalStudents}</span>
                    </td>
                    <td className="py-3 px-3 text-sm font-medium text-slate-900">{result.avgScore}%</td>
                    <td className="py-3 px-3 text-sm text-emerald-600 font-medium">{result.highestScore}%</td>
                    <td className="py-3 px-3 text-sm">
                      <StatusBadge tone={result.passRate >= 80 ? 'emerald' : result.passRate >= 60 ? 'amber' : 'rose'}>
                        {result.passRate}%
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{result.date}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="View Details"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="Download"><AppIcon name="download" size={14} className="text-slate-600" /></button>
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