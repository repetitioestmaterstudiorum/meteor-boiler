import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { getErrMsg } from '/imports/utils/error-utils';
import { log } from '/imports/utils/logger';
import Swal from 'sweetalert2';

// ---

export function TaskForm() {
	const [text, setText] = useState('');

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!text) {
			Swal.fire({
				title: 'Error',
				text: 'Task text missing!',
				icon: 'error',
			});
		}

		try {
			await Meteor.callAsync('tasks.insert', { text });
		} catch (error) {
			const errorMessage = getErrMsg(error);
			log.error(`handleSubmit() ${errorMessage}`, error);
			Swal.fire({
				title: 'Error',
				text: errorMessage,
				icon: 'error',
			});
		}

		setText('');
	}

	return (
		<form onSubmit={handleSubmit} className="mb-3">
			<div className="form-control">
				<div className="input-group">
					<input
						type="text"
						placeholder="Type to add new tasks"
						onChange={event => setText(event.target.value)}
						className="input input-bordered input-sm w-full max-w-xs"
					/>
					<button
						type="submit"
						className="btn btn-sm btn-info btn-outline"
						disabled={!text}
					>
						Add Task
					</button>
				</div>
			</div>
		</form>
	);
}
