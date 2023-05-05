import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { requireUser } from '/imports/utils/method-utils';
import { findOneSetting, insertSetting } from '/imports/api/collections/settings/settings.model';
import { Setting } from '/imports/api/collections/settings/settings.collection';
import { userIsInRole } from '/imports/api/collections/roles/roles.model';

// ---

Meteor.methods({
	'settings.insert': async ({ key, value }: { key: Setting['key']; value: Setting['value'] }) => {
		check(key, String);

		const user = await requireUser();
		const userIsAdmin = userIsInRole(user._id, ['admin']);
		if (!userIsAdmin) throw new Meteor.Error('not-authorized');

		return await insertSetting(key, value, user._id);
	},

	'settings.get': async ({ key }: { key: Setting['key'] }) => {
		check(key, String);

		return await findOneSetting({ key });
	},
});
