import { Meteor } from 'meteor/meteor'
import '/imports/startup/server/publications'
import '/imports/startup/server/accounts-config'
import '/imports/startup/server/fixtures'
import '/imports/startup/methods'

// ---

Meteor.startup(() => {
	console.info('Meteor server started')
})
