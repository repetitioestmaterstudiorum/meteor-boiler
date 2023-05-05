import { addGroup, getGroupByName } from '/imports/api/collections/groups/groups.model';
import { addUsersToRoles, createRole } from '/imports/api/collections/roles/roles.model';
import { findTasks, addTask } from '/imports/api/collections/tasks/tasks.model';
import { addUserToGroup, getUserByUsername } from '/imports/api/collections/users/users.model';
import { addUser } from '/imports/api/collections/users/users.model';

// ---

Meteor.startup(async () => {
	// Create roles
	const ADMIN_ROLE = 'admin';
	const USER_ROLE = 'user';

	createRole(ADMIN_ROLE);
	createRole(USER_ROLE);

	// Create an admin user if they don't already exist
	const ADMIN_USERNAME_SEED = 'admin';
	const ADMIN_PASSWORD_SEED = 'password';

	if (!Accounts.findUserByUsername(ADMIN_USERNAME_SEED)) {
		await addUser(ADMIN_USERNAME_SEED, ADMIN_PASSWORD_SEED);

		const user = await getUserByUsername(ADMIN_USERNAME_SEED);
		if (!user) throw new Error(`User not seeded: ${ADMIN_USERNAME_SEED}`);

		// Add the admin role to the admin user
		addUsersToRoles(user._id, [ADMIN_ROLE]);

		// Add tasks for the admin user
		if (findTasks({ userId: user._id }).count() === 0) {
			[
				'Admin Task 1',
				'Admin Task 2',
				'Admin Task 3',
				'Admin Task 4',
				'Admin Task 5',
			].forEach(text => addTask(user._id, text));
		}
	}

	// Create a regular user
	const REGULAR_USERNAME_SEED = 'user';
	const REGULAR_PASSWORD_SEED = 'password';

	if (!Accounts.findUserByUsername(REGULAR_USERNAME_SEED)) {
		await addUser(REGULAR_USERNAME_SEED, REGULAR_PASSWORD_SEED);

		const user = await getUserByUsername(REGULAR_USERNAME_SEED);
		if (!user) throw new Error(`User not seeded: ${REGULAR_USERNAME_SEED}`);

		// Add the user role to the regular user
		addUsersToRoles(user._id, [USER_ROLE]);

		// Create a group
		const GROUP_NAME_SEED = 'Productive Inc';

		if (!(await getGroupByName(GROUP_NAME_SEED))) {
			await addGroup(GROUP_NAME_SEED);
		}

		// Add the user to the group
		const group = await getGroupByName(GROUP_NAME_SEED);
		if (!group) throw new Error(`Group not seeded: ${GROUP_NAME_SEED}`);

		const groupAddResult = await addUserToGroup(user._id, group._id);
		if (!groupAddResult) throw new Error(`User not added to group: ${user._id} ${group._id}`);

		// Add tasks for the regular user
		if (findTasks({ userId: user._id }).count() === 0) {
			['User Task 1', 'User Task 2', 'User Task 3', 'User Task 4', 'User Task 5'].forEach(
				text => addTask(user._id, text)
			);
		}
	}
});
