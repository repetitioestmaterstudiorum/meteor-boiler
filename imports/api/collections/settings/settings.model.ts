import {
	Setting,
	SettingMeta,
	SettingsCollection,
} from '/imports/api/collections/settings/settings.collection';
import { findOneUser } from '/imports/api/collections/users/users.model';
import {
	insert,
	update,
	remove,
	find,
	findOne,
	MeteorMongoSelector,
	FindOptions,
	UpdateModifier,
} from '/imports/api/db/db.generic-methods';

// ---

export async function insertSetting(
	key: SettingMeta['key'],
	value: SettingMeta['value'],
	userId: SettingMeta['userId']
) {
	const groupId = (await findOneUser({ _id: userId }, { fields: { groupId: 1 } }))?.groupId;

	return await insert(SettingsCollection, {
		...(groupId ? { groupId } : {}),
		userId,
		key,
		value,
	});
}

export async function updateSetting(
	selector: MeteorMongoSelector<Setting>,
	userId: string,
	modifier: UpdateModifier<Setting>
) {
	return await update(SettingsCollection, selector, modifier, userId);
}

export async function removeSetting(selector: MeteorMongoSelector<Setting>, userId: string) {
	return await remove(SettingsCollection, selector, userId);
}

export function findSettings(selector: MeteorMongoSelector<Setting>, options: FindOptions = {}) {
	return find(SettingsCollection, selector, options);
}

export async function findOneSetting(
	selector: MeteorMongoSelector<Setting>,
	options: FindOptions = {}
) {
	return await findOne(SettingsCollection, selector, options);
}
