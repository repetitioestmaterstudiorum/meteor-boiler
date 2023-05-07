import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from '/imports/ui/components/Task';
import { TaskForm } from '/imports/ui/components/TaskForm';
import { Loading } from '/imports/ui/components/Loading';
import { findTasks } from '/imports/api/collections/tasks/tasks.model';
import { UserMeta } from '/imports/api/collections/users/users.collection';

// ---

export function Home() {
	const [hideCompleted, setHideCompleted] = useState(false);

	const { user, tasks, pendingTasksCount, isLoading } = useTracker(() => {
		const user = Meteor.user() as UserMeta | null;

		const noData = {
			user: null,
			tasks: [],
			pendingTasksCount: 0,
		};
		if (!user) return { ...noData, isLoading: false };

		const tasksSubHandler = Meteor.subscribe('tasks');
		const usersSubHandler = Meteor.subscribe('users');
		if (!tasksSubHandler.ready() || !usersSubHandler.ready()) {
			return { ...noData, isLoading: true };
		}

		const userFilter = user ? { userId: user._id } : {};
		const hideCompletedFilter = { isChecked: { $ne: true } };
		const pendingOnlyFilter = { ...userFilter, ...hideCompletedFilter };
		const tasks = findTasks(hideCompleted ? pendingOnlyFilter : userFilter, {
			sort: { createdAt: -1 },
		}).fetch();
		const pendingTasksCount = findTasks(pendingOnlyFilter).count();

		return { user, tasks, pendingTasksCount, isLoading: false };
	});

	if (!isLoading && !Meteor.loggingIn() && !user) {
		/* The proper way would be a loader, then use redirect, apparently.
		Since we don't need a loader for anything else, the next best thing is the useNavigate hook:
		const navigate = useNavigate();
		navigate('/login');
		This logs an error to the console because the component is still rendering.
		Therefore, the good old window.location.href is used instead. */
		window.location.href = '/login';
	}

	return isLoading ? (
		<Loading />
	) : (
		<div className="p-4">
			<h2 className="text-2xl mb-4">Tasks ({pendingTasksCount})</h2>

			<TaskForm />

			<div className="mb-4">
				<button
					className="btn btn-sm btn-outline btn-info"
					onClick={() => setHideCompleted(!hideCompleted)}
				>
					{hideCompleted ? 'Show All' : 'Hide Completed'}
				</button>
			</div>

			<ul>
				{tasks.map(task => (
					<Task key={task._id} task={task} />
				))}
			</ul>
		</div>
	);
}
