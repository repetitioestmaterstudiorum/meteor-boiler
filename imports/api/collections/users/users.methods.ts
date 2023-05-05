import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { requireUser } from '/imports/utils/method-utils';
import { insertUser, updateUser } from '/imports/api/collections/users/users.model';

// ---

Meteor.methods({
	'users.insertUser': async ({ email, password }: { email: string; password: string }) => {
		check(email, String);
		check(password, String);

		return await insertUser(email, password);
	},

	'users.setEmail': async ({ email }: { email: string }) => {
		check(email, String);
		const user = await requireUser();

		return await updateUser({ _id: user._id }, user._id, { $set: { email } });
	},
});
