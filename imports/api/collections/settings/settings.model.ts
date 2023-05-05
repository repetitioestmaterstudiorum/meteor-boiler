import { Setting, SettingsCollection } from '/imports/api/collections/settings/settings.collection';
import { findOne, MeteorMongoSelector, FindOptions } from '/imports/api/db/db.generic-methods';
import _ from 'lodash';
import { defaultSettings } from '/imports/api/collections/settings/default-settings';

// ---

export async function getSetting(key: Setting['key']) {
	const dbSetting = await findOneSetting({ key });

	return dbSetting?.value ?? _.get(defaultSettings, key);
}

// CRUD ------------------------------------------------------------------------

async function findOneSetting(selector: MeteorMongoSelector<Setting>, options: FindOptions = {}) {
	return await findOne(SettingsCollection, selector, options);
}
