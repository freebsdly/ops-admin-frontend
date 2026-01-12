/**
 * Role definitions for RBAC (Role-Based Access Control)
 */

export type UserRole = 'admin' | 'manager' | 'operator' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 4,
  manager: 3,
  operator: 2,
  viewer: 1,
};

/**
 * Check if a role has permission to access resources of another role
 */
export function hasRolePermission(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Get all roles that have at least the specified permission level
 */
export function getRolesWithPermission(minRole: UserRole): UserRole[] {
  const minLevel = ROLE_HIERARCHY[minRole];
  return (Object.keys(ROLE_HIERARCHY) as UserRole[]).filter(
    role => ROLE_HIERARCHY[role] >= minLevel
  );
}

/**
 * Role descriptions for display purposes
 */
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: 'Administrator',
  manager: 'Manager',
  operator: 'Operator',
  viewer: 'Viewer',
};