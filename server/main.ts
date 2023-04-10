import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { TasksCollection } from '../imports/api/tasks/tasks.collection'
import { insertTask } from '/imports/api/tasks/tasks.model'
import '/imports/startup/server/publications'
import '/imports/startup/server/accounts-config'
import '/imports/startup/server/fixtures'
import '/imports/startup/methods'

// ---

Meteor.startup(() => {
	console.info('Meteor server started')
})
