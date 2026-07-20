import { useState, useMemo, useEffect } from "react";
import AppIcon from "../../components/common/AppIcon";
import Dropdown from "../../components/common/Dropdown";
import Pagination from "../../components/common/Pagination";
import Modal from "../../components/common/Modal";
import InitialsAvatar from "../../components/common/InitialsAvatar";
import ActionMenu from "../../components/common/ActionMenu";
import {
  DashboardPage,
  MetricCard,
  SectionCard,
} from "../../components/common/DashboardPrimitives";

import { getUsers } from "../../api/auth/manager";
import toast from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // UI States
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        // Map backend UserSerializer to frontend format
        const formattedUsers = data.map((u) => {
          // Determine main role and institution
          let mainRole = 'User';
          let instName = 'Skoolnet Platform';
          let instType = 'platform';

          if (u.is_superuser || u.is_manager) {
            mainRole = 'Platform Manager';
          } else if (u.is_partner) {
            mainRole = 'Partner';
            instName = u.partner?.company_name || 'Partner Org';
          } else if (u.institution) {
            mainRole = u.institution.role;
            instName = u.institution.name;
            instType = u.institution.type;
          }

          return {
            id: u.id,
            name: u.full_name || u.first_name || u.username,
            email: u.email,
            phone: u.phone || 'N/A',
            role: mainRole,
            institution: instName,
            institutionType: instType.toLowerCase(),
            status: u.is_verified ? 'active' : 'pending',
            joinDate: new Date(u.created_at).toLocaleDateString(),
            lastLogin: u.updated_at,
            avatar: u.profile_picture || null,
          };
        });
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const userStats = useMemo(() => {
    const activeUsers = users.filter((u) => u.status === "active").length;
    const platformAdmins = users.filter((u) => u.role === "Platform Manager").length;
    const schoolAdmins = users.filter((u) => u.role === "ADMIN" && u.institutionType === "school").length;
    const coachingUsers = users.filter((u) => u.institutionType === "coaching").length;
    const partners = users.filter((u) => u.role === "Partner").length;
    const pendingUsers = users.filter((u) => u.status === "pending").length;

    return [
      {
        label: "Total Users",
        value: users.length.toString(),
        change: `+${users.filter(u => new Date(u.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length} new`,
        helper: `${activeUsers} Active accounts`,
        tone: "blue",
      },
      {
        label: "Platform Admins",
        value: platformAdmins.toString(),
        change: "Full access",
        helper: "Managers & Admins",
        tone: "purple",
      },
      {
        label: "School Admins",
        value: schoolAdmins.toString(),
        change: "Management",
        helper: "Institution heads",
        tone: "emerald",
      },
      {
        label: "Coaching",
        value: coachingUsers.toString(),
        change: "Management",
        helper: "All coaching users",
        tone: "amber",
      },
      {
        label: "Partners",
        value: partners.toString(),
        change: "0",
        helper: "Partner accounts",
        tone: "rose",
      },
      {
        label: "Pending",
        value: pendingUsers.toString(),
        change: "Awaiting",
        helper: "Needs approval",
        tone: "orange",
      },
    ];
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.institution.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesInstitution =
        institutionFilter === "all" ||
        user.institutionType === institutionFilter;

      return (
        matchesSearch && matchesStatus && matchesRole && matchesInstitution
      );
    });
  }, [users, searchTerm, statusFilter, roleFilter, institutionFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
  ];

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "Platform Manager", label: "Platform Manager" },
    { value: "School Admin", label: "School Admin" },
    { value: "Coaching", label: "Coaching" },
    { value: "Support Staff", label: "Support Staff" },
  ];

  const institutionOptions = [
    { value: "all", label: "All Types" },
    { value: "school", label: "Schools" },
    { value: "coaching", label: "Coaching" },
    { value: "platform", label: "Platform" },
  ];

  const formatLastLogin = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (hours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const getRoleColor = (role) => {
    const colors = {
      "Platform Manager": "text-purple-600 bg-purple-50",
      "School Admin": "text-emerald-600 bg-emerald-50",
      "Coaching Owner": "text-amber-600 bg-amber-50",
      "Support Staff": "text-rose-600 bg-rose-50",
    };
    return colors[role] || "text-slate-600 bg-slate-50";
  };

  const getInstitutionIcon = (type) => {
    const icons = {
      school: "school",
      coaching: "rocket_launch",
      platform: "dashboard",
    };
    return icons[type] || "school";
  };

  return (
    <DashboardPage
      eyebrow="Access Control"
      title="User Management"
      actions={
        <>
          <button
            type="button"
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
          >
            <AppIcon name="add" size={16} />
            Add User
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            <AppIcon name="download" size={16} className="text-primary" />
            Export Data
          </button>
        </>
      }
    >
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {userStats.map((stat, index) => {
          const icons = {
            "Total Users": "groups",
            "Platform Admins": "shield_check",
            "School Admins": "school",
            Coaching: "rocket_launch",
            "Support Staff": "support_agent",
            Pending: "pending",
          };
          return (
            <MetricCard
              key={index}
              icon={icons[stat.label] || "groups"}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              helper={stat.helper}
              tone={stat.tone}
            />
          );
        })}
      </div>

      <SectionCard
        title="All Users"
        description="Complete list of platform users with their roles and institutions"
      >
        <div className="mb-4 md:mb-6 space-y-3 md:space-y-0 md:flex md:flex-row md:gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon
                name="search"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 md:py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              className="min-w-24 md:min-w-40"
            />
            <Dropdown
              value={roleFilter}
              onChange={setRoleFilter}
              options={roleOptions}
              className="min-w-24 md:min-w-40"
            />
            <Dropdown
              value={institutionFilter}
              onChange={setInstitutionFilter}
              options={institutionOptions}
              className="min-w-24 md:min-w-40"
            />
          </div>
        </div>
        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <table className="w-full min-w-[700px]">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap w-[25%]">
                  User
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap w-[25%]">
                  Contact
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap w-[20%]">
                  Role & Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap w-[25%]">
                  Institution
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap w-[5%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <InitialsAvatar
                          src={user.avatar}
                          name={user.name}
                          className="w-10 h-10 border-2 border-white shadow-sm shrink-0 text-sm"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-slate-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            Joined: {user.joinDate}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            Last active: {formatLastLogin(user.lastLogin)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="min-w-0">
                        <p className="text-sm text-slate-900 truncate max-w-50">
                          {user.email}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1.5">
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap ${getRoleColor(user.role)}`}
                        >
                          <AppIcon name="shield_check" size={12} />
                          {user.role}
                        </div>
                        <div
                          className={`inline-flex items-center uppercase gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
                            user.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <AppIcon
                            name={
                              user.status === "active"
                                ? "check_circle"
                                : "pending"
                            }
                            size={12}
                          />
                          {user.status}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <AppIcon
                          name={getInstitutionIcon(user.institutionType)}
                          size={16}
                          className="text-slate-600 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900 truncate max-w-45">
                            {user.institution}
                          </p>
                          <p className="text-xs text-slate-500 capitalize truncate">
                            {user.institutionType}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 relative">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="cursor-pointer p-1.5 md:p-1 rounded hover:bg-slate-100 transition-colors"
                          title="View Profile"
                        >
                          <AppIcon
                            name="visibility"
                            size={16}
                            className="text-slate-600"
                          />
                        </button>
                        <button 
                          className="cursor-pointer p-1.5 md:p-1 rounded hover:bg-slate-100 transition-colors"
                          title="Edit User"
                        >
                          <AppIcon
                            name="edit"
                            size={16}
                            className="text-slate-600"
                          />
                        </button>
                        
                        <div className="relative">
                          <ActionMenu 
                            actions={[
                              {
                                label: "Reset Password",
                                icon: "lock_reset",
                                onClick: () => {
                                  setConfirmAction({
                                    title: "Reset Password",
                                    message: `Are you sure you want to send a password reset link to ${user.name}?`,
                                    action: () => toast.success("Password reset link sent!"),
                                  });
                                }
                              },
                              {
                                label: "Change Status",
                                icon: "toggle_on",
                                onClick: () => {
                                  setConfirmAction({
                                    title: "Change Status",
                                    message: `Are you sure you want to change the status of ${user.name}?`,
                                    action: () => toast.success("Status changed successfully!"),
                                  });
                                }
                              },
                              { divider: true },
                              {
                                label: "Delete User",
                                icon: "delete",
                                isDestructive: true,
                                onClick: () => {
                                  setConfirmAction({
                                    title: "Delete User",
                                    message: `Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`,
                                    action: () => toast.success("User deleted successfully!"),
                                    isDestructive: true,
                                  });
                                }
                              }
                            ]}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredUsers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredUsers.length}
            className="mt-4"
          />
        )}
      </SectionCard>
      </>
      )}
      {/* User Profile Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Profile"
        maxWidth="max-w-2xl"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <InitialsAvatar
                src={selectedUser.avatar}
                name={selectedUser.name}
                className="w-20 h-20 shadow-sm border-2 border-white text-2xl"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedUser.name}</h3>
                <p className="text-slate-500">{selectedUser.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={getRoleColor(selectedUser.role) + " px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider"}>
                    {selectedUser.role}
                  </span>
                  <span className={`inline-flex items-center uppercase gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                    selectedUser.status === "active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Contact Info</p>
                <p className="text-sm text-slate-900 font-medium flex items-center gap-2">
                  <AppIcon name="phone" size={16} className="text-slate-400" />
                  {selectedUser.phone}
                </p>
                <p className="text-sm text-slate-900 font-medium flex items-center gap-2 mt-2">
                  <AppIcon name="mail" size={16} className="text-slate-400" />
                  {selectedUser.email}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Organization</p>
                <p className="text-sm text-slate-900 font-medium flex items-center gap-2">
                  <AppIcon name={getInstitutionIcon(selectedUser.institutionType)} size={16} className="text-slate-400" />
                  {selectedUser.institution}
                </p>
                <p className="text-sm text-slate-500 capitalize ml-6 mt-0.5">
                  Type: {selectedUser.institutionType}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs text-slate-500">Joined Date</p>
                <p className="text-sm font-medium text-slate-900 mt-0.5">{selectedUser.joinDate}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Last Login</p>
                <p className="text-sm font-medium text-slate-900 mt-0.5">{formatLastLogin(selectedUser.lastLogin)}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        title={confirmAction?.title}
        footer={
          <>
            <button
              onClick={() => setConfirmAction(null)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                confirmAction?.action();
                setConfirmAction(null);
              }}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm ${
                confirmAction?.isDestructive 
                  ? "bg-rose-600 hover:bg-rose-700 hover:shadow-rose-600/20" 
                  : "bg-primary hover:bg-primary/90 hover:shadow-primary/20"
              }`}
            >
              Confirm
            </button>
          </>
        }
      >
        <p className="text-slate-600">{confirmAction?.message}</p>
      </Modal>

    </DashboardPage>
  );
}
