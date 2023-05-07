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
import { Loading } from '/imports/ui/components/Loading';
import { Signup } from '/imports/ui/Signup';
import { ResetPw } from '/imports/ui/ResetPw';

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
				{
					path: '/signup',
					element: <Signup />,
				},
				{
					path: '/reset-password',
					element: <ResetPw />,
				},
				{
					path: '/reset-password/:token',
					element: <ResetPw />,
				},
				// Convenient during development...
				{
					path: '/loading-page',
					element: <Loading />,
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
