import { Task, TaskMeta, TasksCollection } from '/imports/api/collections/tasks/tasks.collection';
import { findOneUser } from '/imports/api/collections/users/users.model';
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

export async function insertTask(userId: TaskMeta['userId'], text: TaskMeta['text']) {
	const groupId = (await findOneUser({ _id: userId }, { fields: { groupId: 1 } }))?.groupId;

	return await insert(TasksCollection, {
		...(groupId ? { groupId } : {}),
		userId,
		text,
		isChecked: false,
	});
}

export async function updateTask(
	selector: MeteorMongoSelector<Task>,
	userId: TaskMeta['userId'],
	modifier: UpdateModifier<Task>
) {
	return await update(TasksCollection, selector, modifier, userId);
}

export async function removeTask(selector: MeteorMongoSelector<Task>, userId: TaskMeta['userId']) {
	return await remove(TasksCollection, selector, userId);
}

export function findTasks(selector: MeteorMongoSelector<Task>, options: FindOptions = {}) {
	return find(TasksCollection, selector, options);
}

export async function findOneTask(selector: MeteorMongoSelector<Task>, options: FindOptions = {}) {
	return await findOne(TasksCollection, selector, options);
}
