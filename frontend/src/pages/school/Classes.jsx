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
import { useAcademics } from '../../hooks/api/useAcademics';
import { useAuth } from '../../hooks/api/useAuth';

export default function ClassManagement() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  const { useBatches } = useAcademics();
  const { data: batchesData = [], isLoading } = useBatches(institutionId);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const classes = useMemo(() => {
    return batchesData.map(batch => ({
      id: batch.id,
      name: batch.course?.name || 'Unknown Course',
      section: batch.name || 'N/A',
      classTeacher: 'Unassigned', // Backend doesn't have class teacher in Batch model yet
      students: batch.capacity, // Using capacity as students for now or if enrollments are returned
      subjects: 5, // Mocked
      status: batch.is_active ? 'active' : 'inactive',
      room: batch.timing || 'N/A', // Using timing as room for now
    }));
  }, [batchesData]);

  const filteredClasses = useMemo(() => {
    return classes.filter(cls => {
      const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cls.section.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || cls.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [classes, searchTerm, statusFilter]);

  const paginatedClasses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredClasses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredClasses, currentPage, itemsPerPage]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const classStats = [
    { icon: 'school', label: 'Total Classes/Courses', value: new Set(classes.map(c => c.name)).size.toString(), change: 'Stable', helper: 'Active', tone: 'blue' },
    { icon: 'group', label: 'Total Sections/Batches', value: classes.length.toString(), change: '+0', helper: 'From last year', tone: 'emerald' },
    { icon: 'people', label: 'Total Capacity', value: classes.reduce((sum, c) => sum + (c.students || 0), 0).toString(), change: '+0', helper: 'Capacity', tone: 'purple' },
  ];

  return (
    <DashboardPage
      eyebrow="Academic structure"
      title="Class Management"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Add Class
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="upload" size={16} />
            Import CSV
          </button>
        </>
      }
    >
      <MetricGrid>
        {classStats.map((stat, index) => (
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

      <SectionCard title="All Classes" description="Class and section management with assigned teachers">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by class, section, or teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[140px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Class</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">Section</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Class Teacher</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Capacity</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">Subjects</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Timing</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    Loading classes...
                  </td>
                </tr>
              ) : paginatedClasses.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No classes found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedClasses.map((cls) => (
                  <tr key={cls.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-sm font-semibold text-slate-900">{cls.name}</td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden sm:table-cell">{cls.section}</td>
                    <td className="py-3 px-3 text-sm">
                      <span className={cls.classTeacher === 'Unassigned' ? 'text-amber-600' : 'text-slate-900'}>
                        {cls.classTeacher}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden md:table-cell">{cls.students}</td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden sm:table-cell">{cls.subjects}</td>
                    <td className="py-3 px-3 text-sm text-slate-600 hidden md:table-cell">{cls.room}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={cls.status === 'active' ? 'emerald' : 'slate'}>
                        {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
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

        {filteredClasses.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredClasses.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredClasses.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
