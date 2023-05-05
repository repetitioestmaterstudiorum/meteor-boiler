import { Mongo } from 'meteor/mongo';
import { WithOptionalMetaFields, WithMetaFields } from '/imports/api/db/db.generic-methods';
import { C } from '/imports/startup/global.constants';

// ---

export const TasksCollection = new Mongo.Collection<TaskMetaOptional, TaskMeta>('tasks');

export type Task = {
	userId: string;
	groupId: string;
	text: string;
	isChecked: boolean;
};
export type TaskMeta = WithMetaFields<Task>;
export type TaskMetaOptional = WithOptionalMetaFields<Task>;

if (C.app.isServer) {
	TasksCollection.createIndexAsync({ userId: 1 });
}
