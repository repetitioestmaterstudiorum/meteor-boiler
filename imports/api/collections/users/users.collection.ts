import {
	MeteorMongoCollection,
	WithMetaFields,
	WithOptionalMetaFields,
} from '/imports/api/db/db.generic-methods';
import { C } from '/imports/startup/global.constants';

// ---

export const UsersCollection = Meteor.users as MeteorMongoCollection<User>;

export type User = {
	groupId?: string;

	// default Meteor fields
	username: string;
	emails: {
		address: string;
		verified: boolean;
	}[];
	profile: Record<string, never>;
	services: {
		password: {
			bcrypt: string;
		};
		resume: {
			loginTokens: {
				when: Date;
				hashedToken: string;
			}[];
		};
	};
};
export type UserMeta = WithMetaFields<User>;
export type UserMetaOptional = WithOptionalMetaFields<User>;

if (C.app.isServer) {
	UsersCollection.createIndexAsync({ groupId: 1 });
}
