import { Meteor } from 'meteor/meteor';
import { findUsers } from '/imports/api/collections/users/users.model';

// ---

Meteor.publish('users', async function () {
	if (!this.userId) return this.ready();

	return findUsers({ _id: this.userId }, { fields: { username: 1, groupId: 1, createdAt: 1 } });
});
