import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'
import { UserMeta } from '/imports/api/collections/users/users.collection'

// ---

export async function requireUser() {
	const user = await Meteor.userAsync()

	if (!user) {
		throw new Meteor.Error('Not authorized.')
	}

	return user as UserMeta
}

// TODO move this elsewhere
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
