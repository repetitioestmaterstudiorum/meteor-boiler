import React from 'react'
import type { Task } from '../api/tasks/tasks.collection'
import { WithMetaFields } from '/imports/api/db/db.generic-methods'

// ---

export function Task({ task }: { task: WithMetaFields<Task> }) {
	return (
		<li>
			<input
				type="checkbox"
				checked={!!task.isChecked}
				onClick={() => toggleChecked({ taskId: task._id, isChecked: task.isChecked })}
				readOnly
			/>
			<span>{task.text}</span>
			<button onClick={() => deleteTask({ taskId: task._id })}>Delete</button>
		</li>
	)
}

async function toggleChecked({ taskId, isChecked }: { taskId: string; isChecked: boolean }) {
	try {
		await Meteor.callAsync('tasks.setIsChecked', { taskId, isChecked: !isChecked })
	} catch (error) {
		alert(error)
	}
}

async function deleteTask({ taskId }: { taskId: string }) {
	try {
		await Meteor.callAsync('tasks.remove', { taskId })
	} catch (error) {
		alert(error)
	}
}
