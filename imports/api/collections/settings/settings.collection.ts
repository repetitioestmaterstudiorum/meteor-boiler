import { Mongo } from 'meteor/mongo';
import { WithOptionalMetaFields, WithMetaFields } from '/imports/api/db/db.generic-methods';
import { C } from '/imports/startup/global.constants';
import { defaultSettings } from '/imports/api/collections/settings/default-settings';
import { NestedKeyOf } from '/imports/utils/types.utils';

// ---

export const SettingsCollection = new Mongo.Collection<SettingMetaOptional, SettingMeta>(
	'settings'
);

export type Setting = {
	key: NestedKeyOf<typeof defaultSettings>;
	value: any;
	userId?: string;
};
export type SettingMeta = WithMetaFields<Setting>;
export type SettingMetaOptional = WithOptionalMetaFields<Setting>;
