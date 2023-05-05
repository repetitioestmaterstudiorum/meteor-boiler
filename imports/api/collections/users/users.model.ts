import { User, UserMeta, UsersCollection } from './users.collection';
import {
	update,
	remove,
	find,
	findOne,
	MeteorMongoSelector,
	FindOptions,
	UpdateModifier,
} from '/imports/api/db/db.generic-methods';

// ---

export async function insertUser(username: string, password: string, groupId?: string) {
	Accounts.createUser({
		// This is a special case where the insert generic method is not used because we need to create a Meteor user account, encrypt the password, and then create a document in the UsersCollection
		username,
		password,
		...(groupId ? { profile: { groupId } } : {}),
	});
}

export async function updateUser(
	selector: MeteorMongoSelector<User>,
	userId: UserMeta['_id'],
	modifier: UpdateModifier<User>
) {
	return await update(UsersCollection, selector, modifier, userId);
}

export async function removeUser(selector: MeteorMongoSelector<User>, userId: UserMeta['_id']) {
	return await remove(UsersCollection, selector, userId);
}

export function findUsers(selector: MeteorMongoSelector<User>, options: FindOptions = {}) {
	return find(UsersCollection, selector, options);
}

export async function findOneUser(selector: MeteorMongoSelector<User>, options: FindOptions = {}) {
	return await findOne(UsersCollection, selector, options);
}
