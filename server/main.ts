import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { TasksCollection } from '/imports/db/TasksCollection'
import { insertTask } from '/imports/api/tasksMethods'
import '/imports/api/tasksMethods'
import '/imports/api/tasksPublications'

// ---

const SEED_USERNAME = 'meteorite'
const SEED_PASSWORD = 'password'

Meteor.startup(() => {
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

	if (TasksCollection.find().count() === 0) {
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
})
