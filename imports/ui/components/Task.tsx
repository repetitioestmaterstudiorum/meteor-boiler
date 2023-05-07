import React from 'react';
import type { TaskMeta } from '/imports/api/collections/tasks/tasks.collection';
import Swal from 'sweetalert2';
import { getErrMsg } from '/imports/utils/error-utils';
import { log } from '/imports/utils/logger';

// ---

export function Task({ task }: { task: TaskMeta }) {
	return (
		<li className="flex items-center space-x-4">
			<label className="flex items-center space-x-2">
				<input
					type="checkbox"
					checked={!!task.isChecked}
					onClick={() => toggleChecked({ taskId: task._id })}
					readOnly
					className="checkbox"
				/>
				<span className="block font-medium text-gray-700">{task.text}</span>{' '}
			</label>

			<button
				onClick={() => deleteTask({ taskId: task._id })}
				className="btn btn-sm btn-error btn-outline"
			>
				Delete
			</button>
		</li>
	);
}

async function toggleChecked({ taskId }: { taskId: string }) {
	try {
		await Meteor.callAsync('tasks.toggleIsChecked', { taskId });
	} catch (error) {
		const errorMessge = getErrMsg(error);
		log({ text: `toggleChecked() ${errorMessge}`, severity: 'error', data: error });
		Swal.fire({
			title: 'Error',
			text: errorMessge,
			icon: 'error',
		});
	}
}

async function deleteTask({ taskId }: { taskId: string }) {
	try {
		await Meteor.callAsync('tasks.remove', { taskId });
	} catch (error) {
		const errorMessge = getErrMsg(error);
		log({ text: `deleteTask() ${errorMessge}`, severity: 'error', data: error });
		Swal.fire({
			title: 'Error',
			text: errorMessge,
			icon: 'error',
		});
	}
}
