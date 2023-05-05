import { UserMeta } from '/imports/api/collections/users/users.collection';

// ---

export async function requireUser() {
	const user = await Meteor.userAsync();

	if (!user) {
		throw new Meteor.Error('Not authorized.');
	}

	return user as UserMeta;
}
