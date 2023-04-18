import { Meteor } from 'meteor/meteor'
import { findGroups } from '/imports/api/collections/groups/groups.model'
import { getUser } from '/imports/utils/publication-utils'

// ---

Meteor.publish('groups', async function () {
	const user = await getUser()

	if (!user) {
		return this.ready()
	}

	return findGroups({ _id: user.groupId })
})
