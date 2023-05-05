import { Meteor } from 'meteor/meteor';
import { findUsers } from '/imports/api/collections/users/users.model';
import { requireUser } from '/imports/utils/method-utils';

// ---

Meteor.publish('users', async function () {
	const user = await requireUser();

	return findUsers({ _id: user._id }, { fields: { username: 1, groupId: 1, createdAt: 1 } });
});
