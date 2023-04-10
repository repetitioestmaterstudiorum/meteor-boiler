import { Random } from 'meteor/random'
import { describe, it, expect } from 'vitest'
import { TasksCollection } from '/imports/api/tasks/tasks.collection'
import { insertTask, updateTask, removeTask } from '/imports/api/tasks/tasks.model'

// ---

describe('Tasks', () => {
	const userId = Random.id()
	const taskId = Random.id()

	beforeEach(() => {
		TasksCollection.remove({})
		TasksCollection.insert({
			_id: taskId,
			text: 'it Task',
			createdAt: new Date(),
			userId,
		})
	})

	it('can insert new tasks', () => {
		const text = 'New Task'
		const insertedId = insertTask({ text, user: { _id: userId } })
		expect(insertedId).toBeDefined()

		const insertedTask = TasksCollection.findOne(insertedId)
		const tasksCount = TasksCollection.find({}).count()
		expect(insertedTask?.text).toBe(text)
		expect(tasksCount).toBe(2)
	})

	it('can change the status of a task', () => {
		const originalTask = TasksCollection.findOne(taskId)
		const updatedCount = updateTask({ taskId, isChecked: !originalTask?.isChecked })
		expect(updatedCount).toBe(1)

		const updatedTask = TasksCollection.findOne(taskId)
		expect(updatedTask?.isChecked).toBe(!originalTask?.isChecked)
	})

	it('can delete a task', () => {
		const removedCount = removeTask({ taskId })
		expect(removedCount).toBe(1)
		expect(TasksCollection.find().count()).toBe(0)
	})
})
