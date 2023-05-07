import { Meteor } from 'meteor/meteor';
import { log } from '/imports/utils/logger';
import { getErrMsg } from '/imports/utils/error-utils';
import Swal from 'sweetalert2';

// ---

export function login(usernameOrEmail: string, password: string) {
	Meteor.loginWithPassword(usernameOrEmail, password, (error?: Meteor.Error | Error) => {
		if (error) {
			log({ text: 'login() error', severity: 'error', data: error });

			const errorMessage = getErrMsg(error);

			Swal.fire({
				title: 'Error',
				text: errorMessage,
				icon: 'error',
				confirmButtonText: 'OK',
			});

			return;
		}
	});
}

export async function signup(email: string, password: string) {
	try {
		await Meteor.callAsync('users.add', email, password);

		login(email, password);
	} catch (error) {
		const errorMessage = getErrMsg(error);

		log({ text: `signup() ${errorMessage}`, severity: 'error', data: error });

		Swal.fire({
			title: 'Error',
			text: errorMessage,
			icon: 'error',
			confirmButtonText: 'OK',
		});

		return;
	}
}

export async function sendPwResetEmail(email: string) {
	return new Promise((resolve, reject) => {
		Accounts.forgotPassword({ email }, (error?: Meteor.Error | Error) => {
			if (error) {
				const errorMessage = getErrMsg(error);

				log({ text: `sendPwResetEmail() ${errorMessage}`, severity: 'error', data: error });

				reject(errorMessage);
			} else {
				resolve('success');
			}
		});
	});
}

export async function resetPassword(token: string, password: string) {
	return new Promise((resolve, reject) => {
		Accounts.resetPassword(token, password, (error?: Meteor.Error | Error) => {
			if (error) {
				const errorMessage = getErrMsg(error);

				log({ text: `resetPassword() ${errorMessage}`, severity: 'error', data: error });

				reject(errorMessage);
			} else {
				resolve('success');
			}
		});
	});
}