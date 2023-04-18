import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { requireTaskUserOwnership, requireUser } from '/imports/utils/method-utils'
import { insertTask, removeTask, updateTask } from '/imports/api/collections/tasks/tasks.model'

// ---

Meteor.methods({
	'tasks.insert': async ({ text }: { text: string }) => {
		check(text, String)
		const user = await requireUser()

		return await insertTask(user._id, text)
	},

	'tasks.setIsChecked': async ({ taskId, isChecked }: { taskId: string; isChecked: boolean }) => {
		check(taskId, String)
		check(isChecked, Boolean)

		const user = await requireUser()
		await requireTaskUserOwnership({ taskId, userId: user._id })

		return await updateTask({ _id: taskId }, user._id, { $set: { isChecked } })
	},

	'tasks.remove': async ({ taskId }: { taskId: string }) => {
		check(taskId, String)
		const user = await requireUser()
		await requireTaskUserOwnership({ taskId, userId: user._id })

		return await removeTask({ _id: taskId }, user._id)
	},
})
