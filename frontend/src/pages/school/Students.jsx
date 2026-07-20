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

export default function StudentManagement() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  const { data: studentsData = [], isLoading } = useMemberships(institutionId, 'STUDENT');

  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [feeFilter, setFeeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Format API data to match frontend requirements
  const students = useMemo(() => {
    return studentsData.map(membership => ({
      id: membership.id,
      name: `${membership.user.first_name} ${membership.user.last_name}`.trim() || membership.user.email,
      rollNo: membership.id.toString().padStart(3, '0'), // Replace with actual roll number if available
      class: 'Class 10-A', // Replace with actual class/batch info if available in membership
      father: 'N/A', // Replace with parent info if available
      phone: membership.user.phone || 'N/A',
      email: membership.user.email,
      feeStatus: 'paid', // Mocked for now
      status: membership.is_active ? 'active' : 'inactive',
      admissionDate: membership.joined_at,
      slug: membership.id.toString(), // Mocked slug
    }));
  }, [studentsData]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.father.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = classFilter === 'all' || student.class === classFilter;
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesFee = feeFilter === 'all' || student.feeStatus === feeFilter;
      return matchesSearch && matchesClass && matchesStatus && matchesFee;
    });
  }, [students, searchTerm, classFilter, statusFilter, feeFilter]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'Class 10-A', label: 'Class 10-A' },
    { value: 'Class 10-B', label: 'Class 10-B' },
    { value: 'Class 9-A', label: 'Class 9-A' },
    { value: 'Class 9-B', label: 'Class 9-B' },
    { value: 'Class 11-A', label: 'Class 11-A' },
    { value: 'Class 12-A', label: 'Class 12-A' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const feeOptions = [
    { value: 'all', label: 'All Fee Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
  ];

  const studentStats = [
    { icon: 'group', label: 'Total Students', value: students.length.toString(), change: '+0', helper: 'This session', tone: 'blue' },
    { icon: 'how_to_reg', label: 'New Admissions', value: '0', change: '0', helper: 'Pending', tone: 'amber' },
    { icon: 'school', label: 'Classes', value: '12', change: 'Stable', helper: 'Active', tone: 'emerald' },
    { icon: 'check_circle', label: 'Verified', value: '100%', change: '0', helper: 'Documents', tone: 'green' },
  ];

  return (
    <DashboardPage
      eyebrow="Student desk"
      title="Student Management"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="person_add" size={16} />
            Add Student
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="upload" size={16} />
            Import CSV
          </button>
        </>
      }
    >
      <MetricGrid>
        {studentStats.map((stat, index) => (
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

      <SectionCard title="All Students" description="Complete student records with fee and academic status">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, roll number, or parent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={classFilter} onChange={setClassFilter} options={classOptions} className="min-w-[140px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
            <Dropdown value={feeFilter} onChange={setFeeFilter} options={feeOptions} className="min-w-[140px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">ID</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Student Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Class</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Contact</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Fee Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    Loading students...
                  </td>
                </tr>
              ) : paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-sm font-medium text-slate-600">{student.rollNo}</td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500 md:hidden">{student.email}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden md:table-cell">{student.class}</td>
                    <td className="py-3 px-3 hidden lg:table-cell">
                      <p className="text-sm text-slate-900">{student.phone}</p>
                      <p className="text-xs text-slate-500">{student.email}</p>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={student.feeStatus === 'paid' ? 'emerald' : student.feeStatus === 'pending' ? 'amber' : 'rose'}>
                        {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={student.status === 'active' ? 'emerald' : 'slate'}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Link 
                          to={`/dashboard/school/student/${student.slug}/dashboard`}
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

        {filteredStudents.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredStudents.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredStudents.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
