import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import AppIcon from "../../components/common/AppIcon";
import Dropdown from "../../components/common/Dropdown";
import Pagination from "../../components/common/Pagination";
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from "../../components/common/DashboardPrimitives";

const teacherStats = [
  {
    icon: "group",
    label: "Total Teachers",
    value: "24",
    change: "+3",
    helper: "This month",
    tone: "blue",
  },
  {
    icon: "school",
    label: "Active Courses",
    value: "8",
    change: "+2",
    helper: "Assigned",
    tone: "emerald",
  },
  {
    icon: "check_circle",
    label: "Verified",
    value: "22",
    change: "+2",
    helper: "Approved",
    tone: "rose",
  },
  {
    icon: "pending",
    label: "Pending",
    value: "2",
    change: "-",
    helper: "Approval",
    tone: "amber",
  },
  {
    icon: "star",
    label: "Avg Rating",
    value: "4.6",
    change: "+0.1",
    helper: "Reviews",
    tone: "purple",
  },
  {
    icon: "event",
    label: "Classes Today",
    value: "12",
    change: "+3",
    helper: "Scheduled",
    tone: "green",
  },
];

const teachers = [
  {
    id: 1,
    name: "Dr. Amit Kumar",
    subject: "Physics",
    phone: "+91 98765 43210",
    email: "amit@email.com",
    qualification: "M.Sc Physics, B.Ed",
    experience: "8 years",
    courses: 2,
    status: "active",
    rating: 4.8,
    students: 280,
    slug: "amit-kumar",
  },
  {
    id: 2,
    name: "Ms. Priya Sharma",
    subject: "Chemistry",
    phone: "+91 98765 43211",
    email: "priya@email.com",
    qualification: "M.Sc Chemistry, B.Ed",
    experience: "5 years",
    courses: 2,
    status: "active",
    rating: 4.6,
    students: 245,
    slug: "priya-sharma",
  },
  {
    id: 3,
    name: "Mr. Rahul Verma",
    subject: "Mathematics",
    phone: "+91 98765 43212",
    email: "rahul@email.com",
    qualification: "M.Sc Maths, B.Ed",
    experience: "6 years",
    courses: 3,
    status: "active",
    rating: 4.5,
    students: 320,
    slug: "rahul-verma",
  },
  {
    id: 4,
    name: "Ms. Sneha Gupta",
    subject: "Biology",
    phone: "+91 98765 43213",
    email: "sneha@email.com",
    qualification: "M.Sc Botany, B.Ed",
    experience: "4 years",
    courses: 2,
    status: "active",
    rating: 4.7,
    students: 180,
    slug: "sneha-gupta",
  },
  {
    id: 5,
    name: "Mr. Kunal Patel",
    subject: "English",
    phone: "+91 98765 43214",
    email: "kunal@email.com",
    qualification: "MA English, B.Ed",
    experience: "7 years",
    courses: 1,
    status: "active",
    rating: 4.4,
    students: 150,
    slug: "kunal-patel",
  },
  {
    id: 6,
    name: "Ms. Ananya Reddy",
    subject: "Computer",
    phone: "+91 98765 43215",
    email: "ananya@email.com",
    qualification: "M.Tech CS, B.Ed",
    experience: "3 years",
    courses: 2,
    status: "inactive",
    rating: 4.3,
    students: 0,
    slug: "ananya-reddy",
  },
  {
    id: 7,
    name: "Mr. Vikram Joshi",
    subject: "Physics",
    phone: "+91 98765 43216",
    email: "vikram@email.com",
    qualification: "M.Sc Physics, B.Ed",
    experience: "10 years",
    courses: 2,
    status: "active",
    rating: 4.9,
    students: 350,
    slug: "vikram-joshi",
  },
  {
    id: 8,
    name: "Ms. Meera Nair",
    subject: "Chemistry",
    phone: "+91 98765 43217",
    email: "meera@email.com",
    qualification: "M.Sc Chemistry, B.Ed",
    experience: "5 years",
    courses: 1,
    status: "active",
    rating: 4.5,
    students: 200,
    slug: "meera-nair",
  },
];

export default function CoachingTeachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject =
        subjectFilter === "all" || teacher.subject === subjectFilter;
      const matchesStatus =
        statusFilter === "all" || teacher.status === statusFilter;
      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [searchTerm, subjectFilter, statusFilter]);

  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTeachers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTeachers, currentPage]);

  const subjectOptions = [
    { value: "all", label: "All Subjects" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Biology", label: "Biology" },
    { value: "English", label: "English" },
    { value: "Computer", label: "Computer" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const getStatusTone = (status) => {
    switch (status) {
      case "active":
        return "emerald";
      case "inactive":
        return "slate";
      default:
        return "slate";
    }
  };

  return (
    <DashboardPage
      eyebrow="Faculty management"
      title="Teachers"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
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

      <SectionCard
        title="All Teachers"
        description="Manage faculty and instructors"
      >
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon
                name="search"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown
              value={subjectFilter}
              onChange={setSubjectFilter}
              options={subjectOptions}
              className="min-w-[140px]"
            />
            <Dropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              className="min-w-[130px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">
                  Teacher
                </th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">
                  Subject
                </th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">
                  Qualification
                </th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">
                  Experience
                </th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">
                  Courses
                </th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">
                  Students
                </th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">
                  Rating
                </th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">
                  Status
                </th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedTeachers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500">
                    No teachers found.
                  </td>
                </tr>
              ) : (
                paginatedTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">
                        {teacher.name}
                      </p>
                      <p className="text-xs text-slate-500 md:hidden">
                        {teacher.email}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden md:table-cell">
                      {teacher.subject}
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600 hidden lg:table-cell">
                      {teacher.qualification}
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600 hidden md:table-cell">
                      {teacher.experience}
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden sm:table-cell">
                      {teacher.courses}
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden sm:table-cell">
                      {teacher.students}
                    </td>
                    <td className="py-3 px-3 hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        <AppIcon
                          name="star"
                          size={14}
                          className="text-amber-500"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          {teacher.rating}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(teacher.status)}>
                        {teacher.status.charAt(0).toUpperCase() +
                          teacher.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/dashboard/coaching-teacher/dashboard`}
                          target="_blank"
                          className="p-2 rounded hover:bg-slate-100 transition-colors text-blue-600 hover:text-blue-700"
                          title="View Dashboard (New Tab)"
                        >
                          <AppIcon name="open_in_new" size={14} />
                        </Link>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors">
                          <AppIcon
                            name="visibility"
                            size={14}
                            className="text-slate-600"
                          />
                        </button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors">
                          <AppIcon
                            name="edit"
                            size={14}
                            className="text-slate-600"
                          />
                        </button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors">
                          <AppIcon
                            name="more_vert"
                            size={14}
                            className="text-slate-600"
                          />
                        </button>
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
