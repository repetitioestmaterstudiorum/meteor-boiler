import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { TasksCollection } from '/imports/db/TasksCollection'

// ---

export function insertTask({ text, user }: { text: string; user: Meteor.User }) {
	TasksCollection.insert({
		text: text,
		userId: user._id,
		createdAt: new Date(),
	})
}

export function removeTask({ taskId }: { taskId: string }) {
	TasksCollection.remove(taskId)
}

function updateTask({ taskId, isChecked }: { taskId: string; isChecked: boolean }) {
	TasksCollection.update(taskId, {
		$set: {
			isChecked,
		},
	})
}

function requireUser() {
	const user = Meteor.user()
	if (!user) {
		throw new Meteor.Error('Not authorized.')
	}
	return user
}

function requireTaskUserOwnership({ taskId, userId }: { taskId: string; userId: string }) {
	const task = TasksCollection.findOne({ _id: taskId, userId })
	if (!task) {
		throw new Meteor.Error('Access denied.')
	}
}

Meteor.methods({
	'tasks.insert'({ text }: { text: string }) {
		check(text, String)
		const user = requireUser()

		insertTask({ text, user })
	},

	'tasks.remove'({ taskId }: { taskId: string }) {
		check(taskId, String)
		const user = requireUser()
		requireTaskUserOwnership({ taskId, userId: user._id })

		removeTask({ taskId })
	},

	'tasks.setIsChecked'(taskId, isChecked) {
		check(taskId, String)
		check(isChecked, Boolean)

		const user = requireUser()
		requireTaskUserOwnership({ taskId, userId: user._id })

		updateTask({ taskId, isChecked })
	},
})
