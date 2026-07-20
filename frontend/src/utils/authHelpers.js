/**
 * Formats the user role for display in profile pages.
 * Returns strings like "Manage", "Partner", "School-Student", "Coaching-Teacher", etc.
 */
export const formatUserRole = (user, roleInfo) => {
  // Prioritize roleInfo from deterministic login response
  if (roleInfo) {
    if (roleInfo.is_manager) return 'Manage';
    
    if (roleInfo.role === 'PARTNER') return 'Partner';

    if (roleInfo.institution_type && roleInfo.role) {
      const type = roleInfo.institution_type.charAt(0) + roleInfo.institution_type.slice(1).toLowerCase();
      const role = roleInfo.role.charAt(0) + roleInfo.role.slice(1).toLowerCase();
      return `${type}-${role}`;
    }
    
    if (roleInfo.role) {
      return roleInfo.role.charAt(0) + roleInfo.role.slice(1).toLowerCase();
    }
  }

  // Fallback to legacy user object structure
  if (!user) return 'User';

  if (user.is_superuser) return 'Manage';
  
  if (user.partner) return 'Partner';

  const institution = user.institution;
  if (institution && institution.type && institution.role) {
    const type = institution.type.charAt(0) + institution.type.slice(1).toLowerCase();
    const role = institution.role.charAt(0) + institution.role.slice(1).toLowerCase();
    return `${type}-${role}`;
  }

  return 'User';
};
