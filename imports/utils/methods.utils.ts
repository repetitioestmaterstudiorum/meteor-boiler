import { TasksCollection } from '/imports/api/tasks/tasks.collection'

// ---

export function requireUser() {
	const user = Meteor.user()
	if (!user) {
		throw new Meteor.Error('Not authorized.')
	}
	return user
}

export function requireTaskUserOwnership({ taskId, userId }: { taskId: string; userId: string }) {
	const task = TasksCollection.findOne({ _id: taskId, userId })
	if (!task) {
		throw new Meteor.Error('Access denied.')
	}
}
