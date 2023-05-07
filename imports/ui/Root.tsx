import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, Outlet } from 'react-router-dom';
import { UserMeta } from '/imports/api/collections/users/users.collection';

// ---

export function Root() {
	const user = useTracker(() => Meteor.user() as UserMeta | null);

	return (
		<div className="max-w-screen-md mx-auto">
			<header className="navbar bg-base-100">
				{/* Logo */}
				<div className="flex-1">
					<h1 className="text-xl">
						<Link to="/">
							📝️ Meteor Boiler Todo List
							{/* Uncomment to show a logo in public/ */}
							{/* <img
								src="/logo.png"
								alt="Meteor Boiler Todo List"
								className="h-8"
							/> */}
						</Link>
					</h1>
				</div>

				{/* Responsive navigation */}
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-sm btn-outline">
						Menu
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 origin-top-right right-0"
					>
						<li>
							<Link to="/">Tasks</Link>
						</li>
						<li>
							<Link to="/loading-page">Loading Component</Link>
						</li>
						<li>
							<Link to="/404">404</Link>
						</li>
						<li>
							<Link to="/admin">Admin</Link>
						</li>
					</ul>
				</div>

				{/* Login information */}
				<div className="ml-2">
					{user ? (
						<div className="dropdown">
							<label tabIndex={0} className="btn btn-sm btn-ghost btn-info">
								&#128100; {user.emails?.[0]?.address || user.username}
							</label>
							<ul
								tabIndex={0}
								className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 origin-top-right right-0"
							>
								<li onClick={() => Meteor.logout()}>
									<a>Logout</a>
								</li>
							</ul>
						</div>
					) : (
						<button className="btn btn-sm btn-outline btn-success">
							<Link to="/login">Log in</Link>
						</button>
					)}
				</div>
			</header>
			<div className="mx-2 md:mx-0">
				<Outlet />
			</div>
		</div>
	);
}
