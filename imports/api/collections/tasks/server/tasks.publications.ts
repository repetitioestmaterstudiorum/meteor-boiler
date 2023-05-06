import { Meteor } from 'meteor/meteor';
import { findTasks } from '/imports/api/collections/tasks/tasks.model';

// ---

Meteor.publish('tasks', async function () {
	if (!this.userId) return this.ready();

	return findTasks({ userId: this.userId });
});
