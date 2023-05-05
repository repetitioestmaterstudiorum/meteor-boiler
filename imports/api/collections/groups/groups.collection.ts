import { Mongo } from 'meteor/mongo';
import { WithOptionalMetaFields, WithMetaFields } from '/imports/api/db/db.generic-methods';
import { C } from '/imports/startup/global.constants';

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

if (C.app.isServer) {
	GroupsCollection.createIndexAsync({ groupId: 1 });
}
