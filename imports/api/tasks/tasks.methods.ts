import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { requireTaskUserOwnership, requireUser } from '/imports/utils/methods.utils'
import { insertTask, removeTask, updateTask } from '/imports/api/tasks/tasks.model'

// ---

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
