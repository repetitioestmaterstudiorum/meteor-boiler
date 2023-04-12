import { getCollectionByName } from '/imports/utils/db.utils'

// ---

export const TasksCollection = getCollectionByName('tasks')

export type Task = {
	_id: string
	text: string
	isChecked: boolean
	createdAt: Date
}
