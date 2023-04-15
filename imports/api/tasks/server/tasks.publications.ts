import { Meteor } from 'meteor/meteor'
import { findTasks } from '/imports/api/tasks/tasks.model'

// ---

Meteor.publish('tasks', function publishTasks() {
	if (!this.userId) {
		return this.ready()
	}

	return findTasks({ userId: this.userId })
})
