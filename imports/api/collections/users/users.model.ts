import { User, UserMeta, UsersCollection } from './users.collection';
import {
	update,
	find,
	findOne,
	MeteorMongoSelector,
	FindOptions,
	UpdateModifier,
} from '/imports/api/db/db.generic-functions';
import { Accounts } from 'meteor/accounts-base';

// ---

export async function addUserByEmail(email: string, password: string, groupId?: string) {
	return await insertUser({ email, password, groupId });
}

export async function getUserByEmail(email: string, options?: FindOptions) {
	// Ready to be async in the future if needed
	return await Accounts.findUserByEmail(email, options);
}

export async function getUserById(userId: UserMeta['_id'], options?: FindOptions) {
	return await findOneUser({ _id: userId }, options);
}

export async function addUserToGroup(userId: UserMeta['_id'], groupId: UserMeta['groupId']) {
	return await updateUser({ _id: userId }, userId, { $set: { groupId } });
}

// CRUD ------------------------------------------------------------------------

async function insertUser({
	email,
	username,
	password,
	groupId,
}: {
	email?: string;
	username?: string;
	password: string;
	groupId?: string;
}) {
	Accounts.createUser({
		// This is a special case where the insert generic method is not used because we need to create a Meteor user account, encrypt the password, and then create a document in the UsersCollection
		...(email ? { email } : {}),
		...(username ? { username } : {}),
		password,
		...(groupId ? { profile: { groupId } } : {}),
	});
}

async function updateUser(
	selector: MeteorMongoSelector<User>,
	userId: UserMeta['_id'],
	modifier: UpdateModifier<User>
) {
	return await update(UsersCollection, selector, modifier, userId);
}

export function findUsers(selector: MeteorMongoSelector<User>, options: FindOptions = {}) {
	return find(UsersCollection, selector, options);
}

async function findOneUser(selector: MeteorMongoSelector<User>, options: FindOptions = {}) {
	return await findOne(UsersCollection, selector, options);
}
