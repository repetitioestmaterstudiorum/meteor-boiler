import { UserMeta } from '/imports/api/collections/users/users.collection'

// ---

export async function getUser() {
	const user = await Meteor.userAsync()

	// @ts-ignore
	return user as UserMeta
}
