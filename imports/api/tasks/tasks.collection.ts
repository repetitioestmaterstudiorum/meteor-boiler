import { Mongo } from 'meteor/mongo'

// ---

export const TasksCollection = new Mongo.Collection('tasks')

export type Task = {
	_id: string
	text: string
	isChecked: boolean
	createdAt: Date
}
