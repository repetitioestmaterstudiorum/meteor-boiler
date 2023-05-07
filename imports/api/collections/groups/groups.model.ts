import { Group, GroupsCollection } from '/imports/api/collections/groups/groups.collection';
import {
	insert,
	findOne,
	MeteorMongoSelector,
	FindOptions,
	find,
} from '../../db/db.generic-functions';

// ---

export async function addGroup(name: string) {
	return await insertGroup(name);
}

export async function getGroupByName(name: string, options?: FindOptions) {
	return await findOneGroup({ name }, options);
}

export async function getGroupById(groupId: string, options?: FindOptions) {
	return await findOneGroup({ _id: groupId }, options);
}

// CRUD ------------------------------------------------------------------------

async function insertGroup(name: string) {
	return await insert(GroupsCollection, { name });
}

export function findGroups(selector: MeteorMongoSelector<Group>, options: FindOptions = {}) {
	return find(GroupsCollection, selector, options);
}

async function findOneGroup(selector: MeteorMongoSelector<Group>, options: FindOptions = {}) {
	return await findOne(GroupsCollection, selector, options);
}
