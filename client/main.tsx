import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from '/imports/ui/Root';
import { Home } from '/imports/ui/Home';
import { Login } from '/imports/ui/Login';
import { Admin } from '/imports/ui/Admin';
import { ErrorPage } from '/imports/ui/Error';
import '/imports/startup/methods';

// ---

Meteor.startup(() => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Root />,
			errorElement: <ErrorPage />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/admin',
					element: <Admin />,
				},
				{
					path: '/login',
					element: <Login />,
				},
			],
		},
	]);

	const root = ReactDOM.createRoot(document.getElementById('react-target') as HTMLElement);
	root.render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
});
