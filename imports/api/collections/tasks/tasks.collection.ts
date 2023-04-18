import { Mongo } from 'meteor/mongo'
import { WithOptionalMetaFields, WithMetaFields } from '/imports/api/db/db.generic-methods'

// ---

export const TasksCollection = new Mongo.Collection<TaskMetaOptional, TaskMeta>('tasks')

export type Task = {
	userId: string
	groupId: string
	text: string
	isChecked: boolean
}
export type TaskMeta = WithMetaFields<Task>
export type TaskMetaOptional = WithOptionalMetaFields<Task>

if (Meteor.isServer) {
	TasksCollection.createIndexAsync({ userId: 1 })
}
