import { Mongo } from 'meteor/mongo'
import { createDefaultIndexes } from '../db/db.default-indexes'
import { WithOptionalMetaFields, WithMetaFields } from '/imports/api/db/db.generic-methods'

// ---

export const TasksCollection = new Mongo.Collection<
	WithOptionalMetaFields<Task>,
	WithMetaFields<Task>
>('tasks')

export type Task = {
	text: string
	userId: string
	isChecked: boolean
}

if (Meteor.isServer) {
	TasksCollection.createIndexAsync({ userId: 1 })

	createDefaultIndexes<Task>(TasksCollection)
}
