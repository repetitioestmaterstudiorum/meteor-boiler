import { Mongo } from 'meteor/mongo';
import { WithOptionalMetaFields, WithMetaFields } from '../../db/db.generic-functions';

// ---

export const GroupsCollection = new Mongo.Collection<
	WithOptionalMetaFields<Group>,
	WithMetaFields<Group>
>('groups');

export type Group = {
	name: string;
};
export type GroupMeta = WithMetaFields<Group>;
export type GroupMetaOptional = WithOptionalMetaFields<Group>;
