import { Roles } from 'meteor/alanning:roles';

// ---

export function createRole(role: string) {
	Roles.createRole(role, { unlessExists: true });
}

export function addUsersToRoles(userId: string, roles: string[], scope: string | null = null) {
	Roles.addUsersToRoles(userId, roles, scope);
}

export function userIsInRole(userId: string, roles: string[]) {
	Roles.userIsInRole(userId, roles);
}

export function removeUsersFromRoles(userId: string, roles: string[]) {
	Roles.removeUsersFromRoles(userId, roles);
}

export function getRolesForUser(userId: string) {
	return Roles.getRolesForUser(userId);
}