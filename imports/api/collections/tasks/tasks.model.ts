import { Task, TaskMeta, TasksCollection } from '/imports/api/collections/tasks/tasks.collection';
import { getUserById } from '/imports/api/collections/users/users.model';
import {
	insert,
	update,
	remove,
	find,
	findOne,
	MeteorMongoSelector,
	FindOptions,
	UpdateModifier,
} from '/imports/api/db/db.generic-methods';

// ---

export async function addTask(userId: string, text: string) {
	return await insertTask(userId, text);
}

export async function toggleIsChecked(taskId: string, userId: string) {
	const task = await requireTaskUserOwnership({ taskId, userId });

	return await updateTask({ _id: taskId }, userId, { $set: { isChecked: !task.isChecked } });
}

export async function getTasks(userId: string) {
	return await findTasks({ userId });
}

export async function deleteTask(taskId: string, userId: string) {
	await requireTaskUserOwnership({ taskId, userId });

	return await removeTask({ _id: taskId }, userId);
}

// helpers ---------------------------------------------------------------------

async function requireTaskUserOwnership({ taskId, userId }: { taskId: string; userId: string }) {
	const task = await TasksCollection.findOneAsync({ _id: taskId, userId });
	if (!task) {
		throw new Meteor.Error('Access denied.');
	}
	return task;
}

// CRUD ------------------------------------------------------------------------

async function insertTask(userId: TaskMeta['userId'], text: TaskMeta['text']) {
	const groupId = (await getUserById(userId, { fields: { groupId: 1 } }))?.groupId;

	return await insert(TasksCollection, {
		...(groupId ? { groupId } : {}),
		userId,
		text,
		isChecked: false,
	});
}

async function updateTask(
	selector: MeteorMongoSelector<Task>,
	userId: TaskMeta['userId'],
	modifier: UpdateModifier<Task>
) {
	return await update(TasksCollection, selector, modifier, userId);
}

async function removeTask(selector: MeteorMongoSelector<Task>, userId: TaskMeta['userId']) {
	return await remove(TasksCollection, selector, userId);
}

export function findTasks(selector: MeteorMongoSelector<Task>, options: FindOptions = {}) {
	return find(TasksCollection, selector, options);
}

async function findOneTask(selector: MeteorMongoSelector<Task>, options: FindOptions = {}) {
	return await findOne(TasksCollection, selector, options);
}
