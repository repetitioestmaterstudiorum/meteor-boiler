import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { log } from '/imports/utils/logger';

export function ErrorPage() {
	const error = useRouteError() as Error;
	log.error('ErrorPage error', error);

	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
			<h1 className="text-4xl font-bold text-red-500">Error</h1>
			<p className="text-lg text-gray-700 mt-2 mb-5">
				{[error.statusText, error.message].filter(Boolean).join(' ')}
			</p>
			<button className="btn" onClick={() => navigate(-1)}>
				Back
			</button>
		</div>
	);
}

type Error = {
	statusText?: string;
	message?: string;
};
