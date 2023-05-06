import { Meteor } from 'meteor/meteor';
import { findGroups } from '/imports/api/collections/groups/groups.model';
import { getUser } from '/imports/utils/publication-utils';
import { getIsAdmin } from '/imports/api/collections/roles/roles.model';

// ---

Meteor.publish('groups', async function () {
	if (!this.userId) return this.ready();

	const isAdmin = getIsAdmin(this.userId);
	if (isAdmin) return findGroups({});

	const user = await getUser();

	return findGroups({ _id: user!.groupId });
});
