import { Meteor } from 'meteor/meteor'
import { findTasks } from '/imports/api/collections/tasks/tasks.model'
import { requireUser } from '/imports/utils/method-utils'

// ---

Meteor.publish('tasks', async function () {
	const user = await requireUser()

	return findTasks({ userId: user._id })
})
