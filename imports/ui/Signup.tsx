import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from './ui-utils/accounts-utils';
import { useTracker } from 'meteor/react-meteor-data';
import { UserMeta } from '/imports/api/collections/users/users.collection';

// ---

export function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		signup(email, password);
	}

	const user = useTracker(() => Meteor.user() as UserMeta | null);

	if (user) window.location.href = '/';

	return (
		<>
			<h2 className="text-2xl font-bold mt-4 mb-2 text-center">Sign up</h2>

			<form onSubmit={submit} className="login-form p-6  mx-auto max-w-sm mt-10">
				<div className="mb-4">
					<label htmlFor="email" className="block font-bold mb-2">
						E-Mail
					</label>
					<input
						type="text"
						placeholder="Email"
						name="email"
						required
						onChange={event => setEmail(event.target.value)}
						className="input input-bordered w-full max-w-xs"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="password" className="block font-bold mb-2">
						Password
					</label>

					<input
						type="password"
						placeholder="Password"
						name="password"
						required
						onChange={event => setPassword(event.target.value)}
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="flex items-center justify-start">
					<button type="submit" className="btn btn-sm btn-success">
						Sign up
					</button>
				</div>
			</form>
			<div className="mt-4 text-center">
				Already have an account?{' '}
				<Link to="/login" className="text-blue-500">
					Log in
				</Link>
			</div>
		</>
	);
}
