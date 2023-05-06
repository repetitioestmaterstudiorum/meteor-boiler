import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { UserMeta } from '/imports/api/collections/users/users.collection';
import { findGroups } from '/imports/api/collections/groups/groups.model';
import { findUsers } from '/imports/api/collections/users/users.model';
import { getIsAdmin } from '/imports/api/collections/roles/roles.model';
import { Loading } from '/imports/ui/components/Loading';

// ---

export function Admin() {
	const { groups, users, isLoading, isAdmin } = useTracker(() => {
		const user = Meteor.user() as UserMeta | null;

		const noData = {
			groups: [],
			users: [],
			isAdmin: false,
			isLoading: false,
		};
		if (!user) return noData;

		const groupsSubHandler = Meteor.subscribe('groups');
		const usersSubHandler = Meteor.subscribe('users');
		if (!groupsSubHandler.ready() || !usersSubHandler.ready()) {
			return { ...noData, isLoading: true };
		}

		const groups = findGroups({}).fetch();
		const users = findUsers({}).fetch();

		const isAdmin = getIsAdmin(user._id);

		return { groups, users, isAdmin, isLoading: false };
	});

	if (!isLoading && !Meteor.loggingIn() && !isAdmin) window.location.href = '/';

	return (
		<div>
			<h1>Admin Page</h1>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					<h2>Groups:</h2>
					<ul>
						{groups.map(group => (
							<li className="list-item" key={group._id}>
								- {group.name}
							</li>
						))}
					</ul>

					<h2>Users:</h2>
					<ul>
						{users.map(user => (
							<li key={user._id}>- {user.username}</li>
						))}
					</ul>

					<button onClick={() => alert('Magic')}>Magic</button>
				</div>
			)}
		</div>
	);
}
