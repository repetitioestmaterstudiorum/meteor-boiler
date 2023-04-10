import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'

// ---

export function TaskForm() {
	const [text, setText] = useState('')

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!text) return

		Meteor.call('tasks.insert', text)

		setText('')
	}

	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Type to add new tasks"
				value={text}
				onChange={event => setText(event.target.value)}
			/>

			<button type="submit">Add Task</button>
		</form>
	)
}
