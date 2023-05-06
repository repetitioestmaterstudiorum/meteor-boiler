import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Outlet } from 'react-router-dom';
import { UserMeta } from '/imports/api/collections/users/users.collection';

// ---

export function Root() {
	const user = useTracker(() => Meteor.user() as UserMeta | null);

	return (
		<div className="app">
			<header>
				<div className="app-bar">
					<div className="app-header">
						<h1 className="text-3xl">📝️ Meteor Boiler Todo List</h1>
					</div>
					{user ? (
						<div className="user" onClick={() => Meteor.logout()}>
							{user.username} 🚪
						</div>
					) : null}
				</div>
			</header>

			<div className="main">{<Outlet />}</div>
		</div>
	);
}
