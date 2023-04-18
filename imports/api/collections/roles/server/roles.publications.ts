import { Meteor } from 'meteor/meteor'

// ---

Meteor.publish(null, function () {
	if (!this.userId) {
		this.ready()
	}

	// @ts-ignore --> not properly typed in @types/meteor or the roles package
	return Meteor.roleAssignment.find({ 'user._id': this.userId })
})
