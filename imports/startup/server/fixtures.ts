import { createRole } from '/imports/api/collections/roles/roles.model';
import { findTasks, insertTask } from '/imports/api/collections/tasks/tasks.model';
import { findOneUser } from '/imports/api/collections/users/users.model';
import { insertUser } from '/imports/api/collections/users/users.model';

// ---

// create roles
const ADMIN_ROLE = 'admin';
const USER_ROLE = 'user';

createRole(ADMIN_ROLE);
createRole(USER_ROLE);

// create an admin user if they don't already exist
const ADMIN_USERNAME_SEED = 'admin';
const ADMIN_PASSWORD_SEED = 'password';

// create a regular user
const REGULAR_USERNAME_SEED = 'user';
const REGULAR_PASSWORD_SEED = 'password';

if (!Accounts.findUserByUsername(REGULAR_USERNAME_SEED)) {
	await insertUser(REGULAR_USERNAME_SEED, REGULAR_PASSWORD_SEED);

	const user = await findOneUser({ username: REGULAR_USERNAME_SEED });
	if (!user) throw new Error(`User not found: ${REGULAR_USERNAME_SEED}`);

	// add tasks for the regular user
	if (findTasks({}).count() === 0) {
		[
			'First Task',
			'Second Task',
			'Third Task',
			'Fourth Task',
			'Fifth Task',
			'Sixth Task',
			'Seventh Task',
		].forEach(text => insertTask(user._id, text));
	}
}
