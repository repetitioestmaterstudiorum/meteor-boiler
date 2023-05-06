import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { UserMeta } from '/imports/api/collections/users/users.collection';
import { useTracker } from 'meteor/react-meteor-data';

// ---

export function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		Meteor.loginWithPassword(username, password);
	}

	const user = useTracker(() => Meteor.user() as UserMeta | null);

	if (user) window.location.href = '/';

	return (
		<form onSubmit={submit} className="login-form">
			<div>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					placeholder="Username"
					name="username"
					required
					onChange={event => setUsername(event.target.value)}
				/>
			</div>

			<div>
				<label htmlFor="password">Password</label>

				<input
					type="password"
					placeholder="Password"
					name="password"
					required
					onChange={event => setPassword(event.target.value)}
				/>
			</div>
			<div>
				<button type="submit">Log In</button>
			</div>
		</form>
	);
}
