import { Meteor } from 'meteor/meteor'
import { Task, TasksCollection } from './tasks.collection'
import {
	insert,
	update,
	remove,
	find,
	findOne,
	MeteorMongoSelector,
	FindOptions,
} from '/imports/api/db/db.generic-methods'

// ---

export async function insertTask({ text, user }: { text: string; user: Meteor.User }) {
	return await insert(
		TasksCollection,
		{
			text: text,
			userId: user._id,
			isChecked: false,
		},
		user._id
	)
}

export async function updateTask({
	taskId,
	isChecked,
	userId,
}: {
	taskId: string
	isChecked: boolean
	userId: string
}) {
	return await update(TasksCollection, { _id: taskId }, { isChecked }, userId)
}

export async function removeTask({ taskId, userId }: { taskId: string; userId: string }) {
	return await remove(TasksCollection, { _id: taskId }, userId)
}

export function findTasks(selector: MeteorMongoSelector<Task>, options: FindOptions = {}) {
	return find(TasksCollection, selector, options)
}

export async function findOneTask(selector: MeteorMongoSelector<Task>, options: FindOptions = {}) {
	return await findOne(TasksCollection, selector, options)
}
