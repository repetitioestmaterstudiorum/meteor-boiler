import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { UserMeta } from '/imports/api/collections/users/users.collection';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { login } from './ui-utils/accounts-utils';

// ---

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		login(email, password);
	}

	const user = useTracker(() => Meteor.user() as UserMeta | null);
	if (user) window.location.href = '/';

	return (
		<>
			<h2 className="text-2xl font-bold mt-4 text-center">Log in</h2>

			<form
				onSubmit={submit}
				className="login-form bg-gray-100 p-6 border rounded mx-auto max-w-sm mt-10"
			>
				<div className="mb-4">
					<label htmlFor="email" className="block text-gray-700 font-bold mb-2">
						Email (or username)
					</label>
					<input
						type="text"
						placeholder="Email (or username)"
						name="email"
						required
						onChange={event => setEmail(event.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="password" className="block text-gray-700 font-bold mb-2">
						Password
					</label>

					<input
						type="password"
						placeholder="Password"
						name="password"
						required
						onChange={event => setPassword(event.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="flex justify-start space-x-3">
					<button type="submit" className="btn btn-sm btn-success">
						Log In
					</button>
					<button className="btn btn-sm btn-error btn-outline">
						<Link to="/reset-password">Reset password</Link>
					</button>
				</div>
			</form>
			<div className="mt-4 text-center">
				No account yet?{' '}
				<Link to="/signup" className="text-blue-500">
					Sign up
				</Link>
			</div>
		</>
	);
}
