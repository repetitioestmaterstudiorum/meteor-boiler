import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'

// ---

// Ensuring every user has an email address, should be in server-side code
Accounts.validateNewUser((user: Meteor.User) => {
	check(user._id, String)
	check(user.emails, Array)
	for (const email of user.emails) {
		check(email, Object)
		check(email.address, String)
		check(email.verified, Boolean)
	}
	check(user.createdAt, Date)
	check(user.services, Object)

	return true
})

// Deny all client-side updates to user documents
Meteor.users.deny({
	update() {
		return true
	},
})

Accounts.config({
	forbidClientAccountCreation: true,
})
