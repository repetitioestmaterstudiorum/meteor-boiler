import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { UserMeta } from '/imports/api/collections/users/users.collection';
import { findGroups } from '/imports/api/collections/groups/groups.model';
import { findUsers } from '/imports/api/collections/users/users.model';
import { getIsAdmin } from '/imports/api/collections/roles/roles.model';
import { Loading } from '/imports/ui/components/Loading';
import Swal from 'sweetalert2';

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
		<div className="mx-auto max-w-lg px-4">
			<h1 className="text-2xl font-bold mb-6">Admin Page</h1>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					<h2 className="text-xl font-bold mb-2">Groups:</h2>
					{groups.map(group => (
						<div className="text-lg mb-1" key={group._id}>
							<li className="py-0.5 px-2">{group.name}</li>
						</div>
					))}

					<h2 className="text-xl font-bold mb-2">Users:</h2>
					{users.map(user => (
						<div className="text-lg mb-1" key={user._id}>
							<li className="py-0.5 px-2">
								{user.emails?.[0]?.address || user.username}
							</li>
						</div>
					))}

					<button
						className="btn btn-sm btn-outline mt-4"
						onClick={() =>
							Swal.fire({
								title: 'Magic!',
								text: 'You clicked the button!',
								icon: 'success',
							})
						}
					>
						Magic
					</button>
				</div>
			)}
		</div>
	);
}
