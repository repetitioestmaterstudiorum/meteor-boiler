import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { requireUser } from '/imports/utils/method-utils';
import { addTask, deleteTask, toggleIsChecked } from '/imports/api/collections/tasks/tasks.model';

// ---

Meteor.methods({
	'tasks.insert': async ({ text }: { text: string }) => {
		check(text, String);
		const user = await requireUser();

		return await addTask(user._id, text);
	},

	'tasks.toggleIsChecked': async ({ taskId }: { taskId: string }) => {
		check(taskId, String);
		const user = await requireUser();

		return await toggleIsChecked(taskId, user._id);
	},

	'tasks.remove': async ({ taskId }: { taskId: string }) => {
		check(taskId, String);
		const user = await requireUser();

		return await deleteTask(taskId, user._id);
	},
});
