import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { requireTaskUserOwnership, requireUser } from '../../utils/method-utils'
import { insertTask, removeTask, updateTask } from '/imports/api/tasks/tasks.model'

// ---

Meteor.methods({
	'tasks.insert': async ({ text }: { text: string }) => {
		check(text, String)
		const user = await requireUser()

		insertTask({ text, user })
	},

	'tasks.setIsChecked': async ({ taskId, isChecked }: { taskId: string; isChecked: boolean }) => {
		check(taskId, String)
		check(isChecked, Boolean)

		const user = await requireUser()
		await requireTaskUserOwnership({ taskId, userId: user._id })

		updateTask({ taskId, isChecked, userId: user._id })
	},

	'tasks.remove': async ({ taskId }: { taskId: string }) => {
		check(taskId, String)
		const user = await requireUser()
		await requireTaskUserOwnership({ taskId, userId: user._id })

		removeTask({ taskId, userId: user._id })
	},
})
