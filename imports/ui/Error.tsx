import React from 'react';
import { useRouteError } from 'react-router-dom';
import { log } from '/imports/utils/logger';

// ---

export function ErrorPage() {
	const error = useRouteError() as Error;

	log({
		text: 'ErrorPage error',
		data: error,
		severity: 'error',
	});

	return (
		<div>
			<h1>Error</h1>
			<p>{[error.statusText, error.message].filter(Boolean).join(' ')}</p>
		</div>
	);
}

type Error = {
	statusText?: string;
	message?: string;
};
