import { Accounts } from 'meteor/accounts-base';
import { C } from '/imports/startup/server/server.constants';

// ---

// Deny all client-side updates to user documents
Meteor.users.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	},
});

Accounts.config({
	forbidClientAccountCreation: true,
});

Accounts.emailTemplates.resetPassword = {
	subject() {
		return 'Reset your password';
	},
	text(user, url) {
		const token = extractTokenFromUrl(url);
		const resetUrl = token ? Meteor.absoluteUrl(`reset-password/${token}`) : url;
		if (C.app.env === 'development') console.info(`resetUrl: ${resetUrl}`);

		return `Hello ${user.emails?.[0]?.address || user.username},

You have requested to reset your password. Click on the link below to set a new password:

${resetUrl}

If you didn't request a password reset, please ignore this email.

Best regards,
Your ${C.app.name}} team`;
	},
};

function extractTokenFromUrl(url: string) {
	const regex = /reset-password\/([\w-_]+)/;
	const match = url.match(regex);

	if (match && match[1]) {
		return match[1];
	}

	return null;
}
