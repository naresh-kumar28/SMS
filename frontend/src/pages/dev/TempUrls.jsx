import React, { useState, useEffect } from 'react';
import AppIcon from '../../components/common/AppIcon';

const URL_GROUPS = [
  {
    title: 'Landing & Public Pages',
    icon: 'public',
    links: [
      { id: 'home', name: 'Home Page', path: '/' },
      { id: 'about', name: 'About Us', path: '/about' },
      { id: 'services', name: 'Services', path: '/services' },
      { id: 'pricing', name: 'Pricing Page', path: '/pricing' },
      { id: 'contact', name: 'Contact Us', path: '/contact' },
    ],
  },
  {
    title: 'Auth Pages',
    icon: 'login',
    links: [
      {
        name: 'Manager Auth',
        subLinks: [
          { id: 'auth-manager-login', name: 'Login', path: '/auth/manager/login' },
          { id: 'auth-manager-signup', name: 'Signup', path: '/auth/manager/signup' },
        ]
      },
      {
        name: 'Partner Auth',
        subLinks: [
          { id: 'auth-partner-login', name: 'Login', path: '/auth/partner/login' },
          { id: 'auth-partner-register', name: 'Register', path: '/auth/partner/register' },
        ]
      },
      {
        name: 'Institution Auth',
        subLinks: [
          { id: 'auth-inst-login', name: 'Login', path: '/auth/institution/login' },
          { id: 'auth-inst-reg', name: 'Register', path: '/auth/institution/register' },
        ]
      },
      {
        name: 'Teacher Auth',
        subLinks: [
          { id: 'auth-teacher-login', name: 'Login', path: '/auth/teacher/login' },
          { id: 'auth-teacher-signup', name: 'Signup', path: '/auth/teacher/signup' },
        ]
      },
      {
        name: 'Student Auth',
        subLinks: [
          { id: 'auth-student-login', name: 'Login', path: '/auth/student/login' },
          { id: 'auth-student-signup', name: 'Signup', path: '/auth/student/signup' },
        ]
      }

    ],
  },
  {
    title: 'Platform Management (Manager)',
    icon: 'admin_panel_settings',
    links: [
      { id: 'dash-manager', name: 'Dashboard Overview', path: '/dashboard/manager/overview' },
      { id: 'manager-schools', name: 'Schools Management', path: '/dashboard/manager/schools' },
      { id: 'manager-coaching', name: 'Coaching Management', path: '/dashboard/manager/coaching' },
      { id: 'manager-partners', name: 'Partners Management', path: '/dashboard/manager/partners' },
      { id: 'manager-pricing', name: 'Plan Pricing', path: '/dashboard/manager/pricing' },
      { id: 'manager-users', name: 'User Management', path: '/dashboard/manager/users' },
      { id: 'manager-activity', name: 'System Activity', path: '/dashboard/manager/activity' },
      { id: 'prof-manager', name: 'Manager Profile', path: '/dashboard/manager/profile' },
      { id: 'manager-settings', name: 'System Settings', path: '/dashboard/manager/settings' },
      {
        name: 'Manager Auth',
        subLinks: [
          { id: 'auth-manager-login', name: 'Login', path: '/auth/manager/login' },
          { id: 'auth-manager-signup', name: 'Signup', path: '/auth/manager/signup' },
        ]
      }
    ],
  },
  {
    title: 'Partner Network',
    icon: 'handshake',
    links: [
      { id: 'dash-partner', name: 'Partner Dashboard', path: '/dashboard/partner/overview' },
      { id: 'partner-schools', name: 'Referred Schools', path: '/dashboard/partner/schools' },
      { id: 'partner-coaching', name: 'Referred Coaching', path: '/dashboard/partner/coaching' },
      { id: 'partner-pricing', name: 'Commission Plans', path: '/dashboard/partner/pricing' },
      { id: 'partner-students', name: 'Student Referrals', path: '/dashboard/partner/students' },
      { id: 'prof-partner', name: 'Partner Profile', path: '/dashboard/partner/profile' },
      {
        name: 'Partner Auth',
        subLinks: [
          { id: 'auth-partner-login', name: 'Login', path: '/auth/partner/login' },
          { id: 'auth-partner-register', name: 'Register', path: '/auth/partner/register' },
        ]
      }
    ],
  },
  {
    title: 'School Panel',
    icon: 'school',
    links: [
      { id: 'school-admin', name: 'Admin Dashboard', path: '/dashboard/school/overview' },
      { id: 'school-students', name: 'Student Registry', path: '/dashboard/school/students' },
      { id: 'school-teachers', name: 'Teacher Registry', path: '/dashboard/school/teachers' },
      { id: 'school-classes', name: 'Class Management', path: '/dashboard/school/classes' },
      { id: 'school-attendance', name: 'Attendance Tracker', path: '/dashboard/school/attendance' },
      { id: 'school-fees', name: 'Fee Management', path: '/dashboard/school/fees' },
      { id: 'school-reports', name: 'Academic Reports', path: '/dashboard/school/reports' },
      { id: 'prof-school', name: 'School Profile', path: '/dashboard/school/profile' },
      {
        name: 'School Auth',
        subLinks: [
          { id: 'auth-inst-login', name: 'Login', path: '/auth/institution/login' },
          { id: 'auth-inst-reg', name: 'Register', path: '/auth/institution/register' },
        ]
      },
      {
        name: 'School Teacher Module',
        subLinks: [
          { id: 'school-teacher-dash', name: 'Dashboard', path: '/dashboard/school-teacher/dashboard' },
          { id: 'school-teacher-classes', name: 'My Classes', path: '/dashboard/school-teacher/my-classes' },
          { id: 'school-teacher-students', name: 'My Students', path: '/dashboard/school-teacher/my-students' },
          { id: 'school-teacher-attendance', name: 'Attendance', path: '/dashboard/school-teacher/attendance' },
          { id: 'prof-teacher-school', name: 'Teacher Profile', path: '/dashboard/school-teacher/profile' },
          {
            name: 'Teacher Auth',
            subLinks: [
              { id: 'auth-teacher-school-login', name: 'Login', path: '/auth/teacher/login' },
              { id: 'auth-teacher-school-signup', name: 'Signup', path: '/auth/teacher/signup' },
            ]
          }
        ]
      },
      {
        name: 'School Student Module',
        subLinks: [
          { id: 'school-student-dash', name: 'Dashboard', path: '/dashboard/school-student/dashboard' },
          { id: 'school-student-profile', name: 'Student Profile', path: '/dashboard/school-student/profile' },
          { id: 'school-student-fees', name: 'My Fees', path: '/dashboard/school-student/fees' },
          { id: 'school-student-timetable', name: 'Timetable', path: '/dashboard/school-student/timetable' },
          {
            name: 'Student Auth',
            subLinks: [
              { id: 'auth-student-school-login', name: 'Login', path: '/auth/student/login' },
              { id: 'auth-student-school-signup', name: 'Signup', path: '/auth/student/signup' },
            ]
          }
        ]
      }
    ],
  },
  {
    title: 'Coaching Panel',
    icon: 'auto_stories',
    links: [
      { id: 'coaching-admin', name: 'Admin Dashboard', path: '/dashboard/coaching/overview' },
      { id: 'coaching-courses', name: 'Course Catalog', path: '/dashboard/coaching/courses' },
      { id: 'coaching-batches', name: 'Batch Management', path: '/dashboard/coaching/batches' },
      { id: 'coaching-students', name: 'Student List', path: '/dashboard/coaching/students' },
      { id: 'coaching-teachers', name: 'Faculty List', path: '/dashboard/coaching/teachers' },
      { id: 'coaching-payments', name: 'Payment Records', path: '/dashboard/coaching/payments' },
      { id: 'prof-coaching', name: 'Coaching Profile', path: '/dashboard/coaching/profile' },
      {
        name: 'Coaching Teacher Module',
        subLinks: [
          { id: 'coach-teacher-dash', name: 'Dashboard', path: '/dashboard/coaching-teacher/dashboard' },
          { id: 'coach-teacher-courses', name: 'My Courses', path: '/dashboard/coaching-teacher/courses' },
          { id: 'coach-teacher-prof', name: 'Teacher Profile', path: '/dashboard/coaching-teacher/profile' },
          { id: 'coach-teacher-schedule', name: 'My Schedule', path: '/dashboard/coaching-teacher/schedule' },
          {
            name: 'Teacher Auth',
            subLinks: [
              { id: 'auth-teacher-coach-login', name: 'Login', path: '/auth/teacher/login' },
              { id: 'auth-teacher-coach-signup', name: 'Signup', path: '/auth/teacher/signup' },
            ]
          }
        ]
      },
      {
        name: 'Coaching Student Module',
        subLinks: [
          { id: 'coach-student-dash', name: 'Dashboard', path: '/dashboard/coaching-student/dashboard' },
          { id: 'coach-student-courses', name: 'My Courses', path: '/dashboard/coaching-student/courses' },
          { id: 'coach-student-prof', name: 'Student Profile', path: '/dashboard/coaching-student/profile' },
          { id: 'coach-student-payments', name: 'My Payments', path: '/dashboard/coaching-student/payments' },
          {
            name: 'Student Auth',
            subLinks: [
              { id: 'auth-student-coach-login', name: 'Login', path: '/auth/student/login' },
              { id: 'auth-student-coach-signup', name: 'Signup', path: '/auth/student/signup' },
            ]
          }
        ]
      }
    ],
  },
];

const getAllLinks = (groups) => {
  let all = [];
  groups.forEach(g => {
    g.links.forEach(l => {
      if (l.id) all.push(l);
      if (l.subLinks) {
        l.subLinks.forEach(sl => {
          if (sl.id) all.push(sl);
        });
      }
    });
  });
  return all;
};

export default function TempUrls() {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('skoolnet_dev_tasks');
    return saved ? JSON.parse(saved) : {};
  });

  const [expandedGroups, setExpandedGroups] = useState(() => {
    // Default all groups to expanded
    const initialState = {};
    URL_GROUPS.forEach((_, idx) => { initialState[idx] = true; });
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('skoolnet_dev_tasks', JSON.stringify(completed));
  }, [completed]);

  const toggleTask = (id) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleGroup = (idx) => {
    setExpandedGroups(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const resetTasks = () => {
    if (window.confirm('Are you sure you want to reset all tasks? This cannot be undone.')) {
      setCompleted({});
      localStorage.removeItem('skoolnet_dev_tasks');
    }
  };

  const allLinks = getAllLinks(URL_GROUPS);
  const progress = Math.round(
    (Object.values(completed).filter(Boolean).length / allLinks.length) * 100
  );

  const LinkRow = ({ link, isSub = false }) => {
    if (!link.id && link.subLinks) {
      return (
        <div className={`mt-4 mb-2 first:mt-0 ${isSub ? 'ml-6' : ''}`}>
          <div className="flex items-center gap-2 mb-2 px-2">
            <AppIcon name="folder_open" className="text-slate-400" size={14} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{link.name}</span>
          </div>
          <div className="space-y-1 ml-4 border-l-2 border-slate-100 pl-4">
            {link.subLinks.map((sl, idx) => (
              <LinkRow key={sl.id || idx} link={sl} isSub={true} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`flex items-center gap-4 p-3 rounded-xl transition-all border ${completed[link.id]
          ? 'bg-emerald-50/50 border-emerald-100 opacity-75'
          : 'hover:bg-primary/5 border-transparent hover:border-primary/10'
          }`}
      >
        <button
          onClick={() => toggleTask(link.id)}
          className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all ${completed[link.id]
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'border-slate-300 bg-white hover:border-primary text-transparent'
            }`}
        >
          <AppIcon name="check" size={14} strokeWidth={3} />
        </button>

        <a
          href={link.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex justify-between items-center group"
        >
          <span className={`text-sm font-medium transition-colors ${completed[link.id] ? 'text-slate-500 line-through' : 'text-slate-700 group-hover:text-primary'
            }`}>
            {link.name}
          </span>
          <div className="flex items-center gap-2">
            <code className={`text-[10px] px-2 py-1 rounded-md transition-colors ${completed[link.id] ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary'
              }`}>
              {link.path}
            </code>
            <AppIcon
              name="open_in_new_tab"
              size={14}
              className={`transition-colors ${completed[link.id] ? 'text-slate-300' : 'text-slate-300 group-hover:text-primary'
                }`}
            />
          </div>
        </a>
      </div>
    );
  };

  const getGroupStats = (group) => {
    const groupLinks = [];
    group.links.forEach(l => {
      if (l.id) groupLinks.push(l);
      if (l.subLinks) l.subLinks.forEach(sl => { if (sl.id) groupLinks.push(sl); });
    });
    const done = groupLinks.filter(l => completed[l.id]).length;
    return { done, total: groupLinks.length };
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <div className="inline-block p-2 px-4 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Development Environment</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Internal URL Directory</h1>
          <p className="text-slate-600 font-medium">Panel-wise module tracking and navigation.</p>

          <div className="mt-6 max-w-xs mx-auto">
            <div className="flex justify-between items-center mb-1 text-xs font-bold text-slate-500 uppercase tracking-tighter">
              <span>Overall Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <button
              onClick={resetTasks}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
            >
              <AppIcon name="rotate_ccw" size={14} />
              Reset All Tasks
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {URL_GROUPS.map((group, idx) => {
            const { done, total } = getGroupStats(group);
            const isExpanded = expandedGroups[idx];

            return (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all">
                <div
                  className="p-4 bg-slate-50/80 border-b border-slate-200 flex justify-between items-center cursor-pointer select-none"
                  onClick={() => toggleGroup(idx)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isExpanded ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'
                      }`}>
                      <AppIcon
                        name={isExpanded ? 'expand_more' : 'chevron_right'}
                        size={20}
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-800 flex items-center gap-2">
                        <AppIcon name={group.icon} className="text-primary/60" size={18} />
                        {group.title}
                        {done === total && total > 0 && (
                          <AppIcon name="check_circle" className="text-emerald-500" size={16} />
                        )}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {done} / {total} Completed
                    </span>
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100 p-6' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="space-y-2">
                    {group.links.map((link, lIdx) => (
                      <LinkRow key={link.id || lIdx} link={link} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        <footer className="mt-12 text-center text-slate-400 text-xs py-10 border-t border-slate-100">
          <p>Skoolnet Web Application Platform &bull; Dev Mode v1.1 &bull; Built for danske farhan</p>
        </footer>
      </div>
    </div>
  );
}
