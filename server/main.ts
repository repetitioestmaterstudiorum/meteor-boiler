import { Meteor } from 'meteor/meteor';
import '/imports/startup/server/publications';
import '/imports/startup/server/accounts-config';
import '/imports/startup/server/fixtures';
import '/imports/startup/methods';
import { log } from '/imports/utils/logger';

// ---

Meteor.startup(() => {
	log({ text: 'Meteor server started' });
});
