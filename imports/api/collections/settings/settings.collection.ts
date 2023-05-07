import { Mongo } from 'meteor/mongo';
import { WithOptionalMetaFields, WithMetaFields } from '../../db/db.generic-functions';
import { defaultSettings } from '/imports/api/collections/settings/default-settings';
import { NestedKeyOf } from '/imports/utils/type-utils';

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
