import { Accounts } from 'meteor/accounts-base';

// ---

// Deny all client-side updates to user documents
Meteor.users.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	},
});

Accounts.config({
	forbidClientAccountCreation: true,
});
