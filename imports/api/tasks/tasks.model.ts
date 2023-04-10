import { Meteor } from 'meteor/meteor'
import { TasksCollection } from './tasks.collection'

// ---

export function insertTask({ text, user }: { text: string; user: Meteor.User }) {
	return TasksCollection.insert({
		text: text,
		userId: user._id,
		createdAt: new Date(),
	})
}

export function updateTask({ taskId, isChecked }: { taskId: string; isChecked: boolean }) {
	return TasksCollection.update(taskId, {
		$set: {
			isChecked,
		},
	})
}

export function removeTask({ taskId }: { taskId: string }) {
	return TasksCollection.remove(taskId)
}
