import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { getSetting } from '/imports/api/collections/settings/settings.model';
import { Setting } from '/imports/api/collections/settings/settings.collection';

// ---

Meteor.methods({
	'settings.get': async ({ key }: { key: Setting['key'] }) => {
		check(key, String);

		return await getSetting(key);
	},
});
