import os from 'os';
import _ from 'lodash';

// ---

// All the unchangeable (in runtime) configuration goes here. Everything else -> settings.
const constants = {
	app: {
		name: 'meteor-boiler',
		hostname: os.hostname(),
		env: process.env.NODE_ENV || 'unknown',
		isServer: Meteor.isServer,
		isClient: Meteor.isClient,
		isDev: Meteor.isDevelopment || process.env.NODE_ENV === 'development',
		isTest: Meteor.isTest || process.env.NODE_ENV === 'test',
		isProd: Meteor.isProduction || process.env.NODE_ENV === 'production',
	},
};

export const C = _.cloneDeep(constants);
