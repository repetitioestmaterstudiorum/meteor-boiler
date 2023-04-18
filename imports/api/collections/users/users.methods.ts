import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { requireUser } from '/imports/utils/method-utils'
import { updateUser } from '/imports/api/collections/users/users.model'

// ---

Meteor.methods({
	'users.setEmail': async ({ email }: { email: string }) => {
		check(email, String)
		const user = await requireUser()

		return await updateUser({ _id: user._id }, user._id, { $set: { email } })
	},
})
