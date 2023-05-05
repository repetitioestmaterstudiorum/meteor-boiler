import { Mongo } from 'meteor/mongo';
import { WithOptionalMetaFields, WithMetaFields } from '/imports/api/db/db.generic-methods';
import { C } from '/imports/startup/global.constants';

// ---

export const SettingsCollection = new Mongo.Collection<SettingMetaOptional, SettingMeta>(
	'settings'
);

export type Setting = {
	key: string;
	value: any;
	userId?: string;
};
export type SettingMeta = WithMetaFields<Setting>;
export type SettingMetaOptional = WithOptionalMetaFields<Setting>;

if (C.app.isServer) {
	SettingsCollection.createIndexAsync({ userId: 1 });
}
