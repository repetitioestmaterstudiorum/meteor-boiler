import { TasksCollection } from '/imports/api/tasks/tasks.collection'

// ---

export async function requireUser() {
	const user = await Meteor.userAsync()
	if (!user) {
		throw new Meteor.Error('Not authorized.')
	}
	return user
}

export async function requireTaskUserOwnership({
	taskId,
	userId,
}: {
	taskId: string
	userId: string
}) {
	const task = await TasksCollection.findOneAsync({ _id: taskId, userId })
	if (!task) {
		throw new Meteor.Error('Access denied.')
	}
}
