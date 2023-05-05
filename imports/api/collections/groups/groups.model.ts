import { Group, GroupsCollection } from '/imports/api/collections/groups/groups.collection';
import {
	insert,
	findOne,
	MeteorMongoSelector,
	FindOptions,
	update,
	remove,
	find,
	UpdateModifier,
} from '/imports/api/db/db.generic-methods';

// ---

export async function insertGroup(name: string) {
	return await insert(GroupsCollection, { name });
}

export async function updateGroup(
	selector: MeteorMongoSelector<Group>,
	userId: string,
	modifier: UpdateModifier<Group>
) {
	return await update(GroupsCollection, selector, modifier, userId);
}

export async function removeGroup(selector: MeteorMongoSelector<Group>, userId: string) {
	return await remove(GroupsCollection, selector, userId);
}

export async function findGroups(selector: MeteorMongoSelector<Group>, options: FindOptions = {}) {
	return find(GroupsCollection, selector, options);
}

export async function findOneGroup(
	selector: MeteorMongoSelector<Group>,
	options: FindOptions = {}
) {
	return await findOne(GroupsCollection, selector, options);
}
