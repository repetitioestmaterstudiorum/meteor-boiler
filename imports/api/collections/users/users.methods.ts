import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { addUserByEmail } from '/imports/api/collections/users/users.model';

// ---

Meteor.methods({
	'users.add': async (email: string, password: string) => {
		check(email, String);
		check(password, String);

		return await addUserByEmail(email, password);
	},
});
