import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

// ---

export const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		Meteor.loginWithPassword(username, password);
	}

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
};
