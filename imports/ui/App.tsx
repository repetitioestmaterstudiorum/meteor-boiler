import { Meteor } from 'meteor/meteor'
import React, { useState, Fragment } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/tasks/tasks.collection'
import { Task } from './Task'
import { TaskForm } from './TaskForm'
import { LoginForm } from './LoginForm'

// ---

export function App() {
	const user = useTracker(() => Meteor.user())
	const [hideCompleted, setHideCompleted] = useState(false)

	const userFilter = user ? { userId: user._id } : {}
	const hideCompletedFilter = { isChecked: { $ne: true } }

	const pendingOnlyFilter = { ...userFilter, ...hideCompletedFilter }

	const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
		const noData = { tasks: [], pendingTasksCount: 0 }
		if (!Meteor.user()) {
			return { ...noData, isLoading: false }
		}

		const subscriptionHandler = Meteor.subscribe('tasks')
		if (!subscriptionHandler.ready()) {
			return { ...noData, isLoading: true }
		}

		const tasks = TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, {
			sort: { createdAt: -1 },
		}).fetch()
		const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count()

		return { tasks, pendingTasksCount, isLoading: false }
	})

	const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`

	const logout = () => Meteor.logout()

	return (
		<div className="app">
			<header>
				<div className="app-bar">
					<div className="app-header">
						<h1>
							📝️ To Do List
							{pendingTasksTitle}
						</h1>
					</div>
				</div>
			</header>

			<div className="main">
				{user ? (
					<Fragment>
						<div className="user" onClick={logout}>
							{user.username || user.profile?.name} 🚪
						</div>

						<TaskForm />

						<div className="filter">
							<button onClick={() => setHideCompleted(!hideCompleted)}>
								{hideCompleted ? 'Show All' : 'Hide Completed'}
							</button>
						</div>

						{isLoading && <div className="loading">loading...</div>}

						<ul className="tasks">
							{tasks.map(task => (
								<Task key={task._id} task={task} />
							))}
						</ul>
					</Fragment>
				) : (
					<LoginForm />
				)}
			</div>
		</div>
	)
}
