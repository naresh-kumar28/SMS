import { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
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
import { useMemberships } from '../../hooks/api/useInstitutions';
import { useAuth } from '../../hooks/api/useAuth';

export default function TeacherManagement() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  const { data: teachersData = [], isLoading } = useMemberships(institutionId, 'TEACHER');

  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Format API data to match frontend requirements
  const teachers = useMemo(() => {
    return teachersData.map(membership => ({
      id: membership.id,
      name: `${membership.user.first_name} ${membership.user.last_name}`.trim() || membership.user.email,
      empNo: `EMP${membership.id.toString().padStart(3, '0')}`, // Mocked Employee Number
      subject: 'General', // Replace with actual subject info if available
      qualification: 'B.Ed', // Replace with actual qualification
      phone: membership.user.phone || 'N/A',
      email: membership.user.email,
      classes: 'Class 10-A', // Mocked assigned classes
      status: membership.is_active ? 'active' : 'inactive',
      joinDate: membership.joined_at,
      slug: membership.id.toString(), // Mocked slug
    }));
  }, [teachersData]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           teacher.empNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = subjectFilter === 'all' || teacher.subject === subjectFilter;
      const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [teachers, searchTerm, subjectFilter, statusFilter]);

  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTeachers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTeachers, currentPage, itemsPerPage]);

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'General', label: 'General' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'English', label: 'English' },
    { value: 'History', label: 'History' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Computer Science', label: 'Computer Science' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'on_leave', label: 'On Leave' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const teacherStats = [
    { icon: 'how_to_reg', label: 'Total Teachers', value: teachers.length.toString(), change: '+0', helper: 'This month', tone: 'blue' },
    { icon: 'school', label: 'Subject Coverage', value: '100%', change: 'None', helper: 'Full coverage', tone: 'emerald' },
    { icon: 'check_circle', label: 'Active', value: teachers.filter(t => t.status === 'active').length.toString(), change: '0', helper: 'Currently teaching', tone: 'green' },
  ];

  return (
    <DashboardPage
      eyebrow="Faculty desk"
      title="Teacher Management"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="person_add" size={16} />
            Add Teacher
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="upload" size={16} />
            Import CSV
          </button>
        </>
      }
    >
      <MetricGrid>
        {teacherStats.map((stat, index) => (
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

      <SectionCard title="All Teachers" description="Complete faculty list with subject assignments">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, employee ID, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={subjectFilter} onChange={setSubjectFilter} options={subjectOptions} className="min-w-[160px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[140px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Emp No</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Teacher Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Subject</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Qualification</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Classes</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    Loading teachers...
                  </td>
                </tr>
              ) : paginatedTeachers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No teachers found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-sm font-medium text-slate-600">{teacher.empNo}</td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{teacher.name}</p>
                      <p className="text-xs text-slate-500 md:hidden">{teacher.email}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden md:table-cell">{teacher.subject}</td>
                    <td className="py-3 px-3 text-sm text-slate-600 hidden lg:table-cell">{teacher.qualification}</td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden md:table-cell">{teacher.classes}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={teacher.status === 'active' ? 'emerald' : teacher.status === 'on_leave' ? 'amber' : 'slate'}>
                        {teacher.status === 'on_leave' ? 'On Leave' : teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Link 
                          to={`/dashboard/school-teacher/dashboard`}
                          target="_blank"
                          className="p-2 rounded hover:bg-slate-100 transition-colors text-blue-600 hover:text-blue-700"
                          title="View Dashboard (New Tab)"
                        >
                          <AppIcon name="open_in_new" size={14} />
                        </Link>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors hidden sm:block"><AppIcon name="edit" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredTeachers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredTeachers.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredTeachers.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
