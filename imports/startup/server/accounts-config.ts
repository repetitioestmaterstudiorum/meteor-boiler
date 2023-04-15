import { Accounts } from 'meteor/accounts-base'

// ---

// Deny all client-side updates to user documents
Meteor.users.deny({
	update() {
		return true
	},
})

Accounts.config({
	forbidClientAccountCreation: true,
})
