import { Meteor } from 'meteor/meteor';
import { findUsers } from '/imports/api/collections/users/users.model';
import { getIsAdmin } from '/imports/api/collections/roles/roles.model';

// ---

Meteor.publish('users', async function () {
	if (!this.userId) return this.ready();

	const isAdmin = getIsAdmin(this.userId);
	if (isAdmin) return findUsers({});

	return findUsers(
		{ _id: this.userId },
		{ fields: { username: 1, emails: 1, groupId: 1, createdAt: 1 } }
	);
});
