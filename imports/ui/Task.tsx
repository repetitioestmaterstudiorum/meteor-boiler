import React from 'react';
import type { TaskMeta } from '/imports/api/collections/tasks/tasks.collection';

// ---

export function Task({ task }: { task: TaskMeta }) {
	return (
		<li>
			<input
				type="checkbox"
				checked={!!task.isChecked}
				onClick={() => toggleChecked({ taskId: task._id })}
				readOnly
			/>
			<span>{task.text}</span>
			<button onClick={() => deleteTask({ taskId: task._id })}>Delete</button>
		</li>
	);
}

async function toggleChecked({ taskId }: { taskId: string }) {
	try {
		await Meteor.callAsync('tasks.toggleIsChecked', { taskId });
	} catch (error) {
		alert(error);
	}
}

async function deleteTask({ taskId }: { taskId: string }) {
	try {
		await Meteor.callAsync('tasks.remove', { taskId });
	} catch (error) {
		alert(error);
	}
}
