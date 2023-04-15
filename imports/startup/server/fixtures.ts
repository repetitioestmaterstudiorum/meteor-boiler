import { findTasks, insertTask } from '/imports/api/tasks/tasks.model'

// ---

const SEED_USERNAME = 'meteorite'
const SEED_PASSWORD = 'password'

if (!Accounts.findUserByUsername(SEED_USERNAME)) {
	Accounts.createUser({
		username: SEED_USERNAME,
		password: SEED_PASSWORD,
	})
}

const user = Accounts.findUserByUsername(SEED_USERNAME)
if (!user) {
	throw new Error('No user found but should be seeded.')
}

if (findTasks({}).count() === 0) {
	;[
		'First Task',
		'Second Task',
		'Third Task',
		'Fourth Task',
		'Fifth Task',
		'Sixth Task',
		'Seventh Task',
	].forEach(text => insertTask({ text, user }))
}
