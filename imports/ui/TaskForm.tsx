import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'

// ---

export function TaskForm() {
	const [text, setText] = useState('')

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!text) return

		try {
			await Meteor.callAsync('tasks.insert', { text })
		} catch (error) {
			alert(error)
		}

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
