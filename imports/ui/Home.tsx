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
		/* The proper way would be a loader, then use redirect. Since we don't need a loader for anything else, 
		the next best thing is to use the useNavigate hook to redirect as follows:
		const navigate = useNavigate();
		navigate('/login');
		This logs an error to the console because the component is still rendering.
		Therefore, the good old window.location.href is used instead. */
		window.location.href = '/login';
	}

	return isLoading ? (
		<Loading />
	) : (
		<div>
			<h2>Tasks ({pendingTasksCount})</h2>

			<TaskForm />

			<div className="filter">
				<button onClick={() => setHideCompleted(!hideCompleted)}>
					{hideCompleted ? 'Show All' : 'Hide Completed'}
				</button>
			</div>

			<ul className="tasks">
				{tasks.map(task => (
					<Task key={task._id} task={task} />
				))}
			</ul>
		</div>
	);
}
