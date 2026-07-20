import { useState, useMemo } from 'react';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import Pagination from '../../components/common/Pagination';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

import { usePartnerStudents } from '../../hooks/api/usePartners';
import { useInstitutionsList } from '../../hooks/api/useInstitutions';

const studentStats = [
  { label: 'Total Students', value: '1,247', change: '+156', helper: 'Across all schools', tone: 'blue' },
  { label: 'Active Students', value: '1,198', change: '+142', helper: 'Currently enrolled', tone: 'emerald' },
  { label: 'New This Month', value: '45', change: '+12', helper: 'New enrollments', tone: 'purple' },
  { label: 'Inactive', value: '49', change: '-8', helper: 'Temporarily paused', tone: 'amber' },
];

export default function PartnerStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: studentsData = [], isLoading: isLoadingStudents } = usePartnerStudents();
  const { data: institutions = [], isLoading: isLoadingInstitutions } = useInstitutionsList();

  const filteredStudents = useMemo(() => {
    return studentsData.filter(student => {
      const studentName = (student.user?.full_name || student.user?.email || '').toLowerCase();
      const institutionName = (student.institution?.name || '').toLowerCase();
      
      const matchesSearch = studentName.includes(searchTerm.toLowerCase());
      
      // Use ID for filtering instead of name if we are using the dropdown values
      const matchesSchool = schoolFilter === 'all' || student.institution?.id.toString() === schoolFilter;
      
      return matchesSearch && matchesSchool;
    });
  }, [studentsData, searchTerm, schoolFilter]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const schoolOptions = useMemo(() => {
    const options = [{ value: 'all', label: 'All Institutions' }];
    institutions.forEach(inst => {
      options.push({ value: inst.id.toString(), label: inst.name || 'Unnamed Institution' });
    });
    return options;
  }, [institutions]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <DashboardPage
      eyebrow="Partner Dashboard"
      title="Students"
    >
      <MetricGrid>
        {studentStats.map((stat, index) => {
          const icons = {
            'Total Students': 'group',
            'Active Students': 'check_circle',
            'New This Month': 'person_add',
            'Inactive': 'person',
          };
          return (
            <MetricCard
              key={index}
              icon={icons[stat.label] || 'analytics'}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              helper={stat.helper}
              tone={stat.tone}
            />
          );
        })}
      </MetricGrid>

      <SectionCard title="All Students" description="Students from your schools and coaching centers">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <Dropdown
            value={schoolFilter}
            onChange={setSchoolFilter}
            options={schoolOptions}
            className="min-w-40"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Student</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">School/Center</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Class</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Parent</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-2 pl-7 pr-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{student.user?.full_name || student.user?.email || 'N/A'}</p>
                      <p className="text-xs text-slate-500">{student.phone_number || 'No Phone'}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-sm text-slate-700">{student.institution?.name || 'N/A'}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-sm text-slate-600">{student.enrollment_no || 'N/A'}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-sm text-slate-600">
                        {student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'N/A'}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <div className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
                        student.user?.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <span className="capitalize">{student.user?.is_active ? 'active' : 'inactive'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors">
                          <AppIcon name="visibility" size={14} className="text-slate-600" />
                        </button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors">
                          <AppIcon name="message" size={14} className="text-slate-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={filteredStudents.length}
          className="mt-4"
        />
      </SectionCard>
    </DashboardPage>
  );
}