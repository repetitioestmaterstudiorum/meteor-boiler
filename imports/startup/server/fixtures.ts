import { addGroup, getGroupByName } from '/imports/api/collections/groups/groups.model';
import { addUsersToRoles, createRole } from '/imports/api/collections/roles/roles.model';
import { findTasks, addTask } from '/imports/api/collections/tasks/tasks.model';
import {
	addUserByEmail,
	addUserToGroup,
	getUserByEmail,
} from '/imports/api/collections/users/users.model';
import { log } from '/imports/utils/logger';

// ---

Meteor.startup(async () => {
	// Create roles
	const ADMIN_ROLE = 'admin';
	const USER_ROLE = 'user';

	createRole(ADMIN_ROLE);
	createRole(USER_ROLE);

	// Create an admin user if they don't already exist
	const ADMIN_EMAIL_SEED = 'admin@app.com';
	const ADMIN_PASSWORD_SEED = 'password';

	if (!(await getUserByEmail(ADMIN_EMAIL_SEED))) {
		log.info(`Seeding user ${ADMIN_EMAIL_SEED}...`);

		await addUserByEmail(ADMIN_EMAIL_SEED, ADMIN_PASSWORD_SEED);

		const user = await getUserByEmail(ADMIN_EMAIL_SEED);
		if (!user) throw new Error(`User not seeded: ${ADMIN_EMAIL_SEED}`);

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
	const DEMO_EMAIL_SEED = 'demo@app.com';
	const DEMO_PASSWORD_SEED = 'password';

	if (!(await getUserByEmail(DEMO_EMAIL_SEED))) {
		log.info(`Seeding user ${DEMO_EMAIL_SEED}...`);

		await addUserByEmail(DEMO_EMAIL_SEED, DEMO_PASSWORD_SEED);

		const user = await getUserByEmail(DEMO_EMAIL_SEED);
		if (!user) throw new Error(`User not seeded: ${DEMO_EMAIL_SEED}`);

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
