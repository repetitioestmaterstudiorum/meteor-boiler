import React from 'react'
import type { Task } from '/imports/db/TasksCollection'

// ---

export function Task({
	task,
	onCheckboxClick,
	onDeleteClick,
}: {
	task: Task
	onCheckboxClick: (task: Task) => void
	onDeleteClick: (task: Task) => void
}) {
	return (
		<li>
			<input
				type="checkbox"
				checked={!!task.isChecked}
				onClick={() => onCheckboxClick(task)}
				readOnly
			/>
			<span>{task.text}</span>
			<button onClick={() => onDeleteClick(task)}>&times;</button>
		</li>
	)
}
