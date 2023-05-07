import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword, sendPwResetEmail } from '/imports/ui/ui-utils/accounts-utils';
import { getErrMsg } from '/imports/utils/error-utils';
import Swal from 'sweetalert2';

// ---

export function ResetPw() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const token = useParams<{ token: string }>().token;

	const navigate = useNavigate();

	const passwordsDoNotMatch = password !== confirmPassword;

	async function submitSendPwResetEmail(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			await sendPwResetEmail(email);
			Swal.fire({
				title: 'Success',
				text: 'E-Mail sent successfully. Check your inbox!',
				icon: 'success',
				confirmButtonText: 'OK',
			}).then(function () {
				navigate('/');
			});
		} catch (error) {
			const errorMessage = getErrMsg(error);
			Swal.fire({
				title: 'Error',
				text: errorMessage,
				icon: 'error',
				confirmButtonText: 'OK',
			}).then(function () {
				navigate('/reset-password');
			});
		}
	}

	async function submitResetPassword(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (passwordsDoNotMatch) {
			Swal.fire({
				title: 'Error',
				text: 'Passwords do not match.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
			return;
		}

		try {
			await resetPassword(token!, password);
			Swal.fire({
				title: 'Success',
				text: 'Password reset successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			}).then(function () {
				navigate('/');
			});
		} catch (error) {
			const errorMessage = getErrMsg(error);
			Swal.fire({
				title: 'Error',
				text: errorMessage,
				icon: 'error',
				confirmButtonText: 'OK',
			}).then(function () {
				navigate('/reset-password');
			});
		}
	}

	return (
		<>
			<h2 className="text-2xl font-bold mt-4 mb-2 text-center">Reset password</h2>
			<p className="text-center">Please write your password down somewhere.</p>

			{token ? (
				<form
					onSubmit={submitResetPassword}
					className="login-form p-6 mx-auto max-w-sm mt-10"
				>
					<label htmlFor="email" className="block font-bold mb-2">
						New password
					</label>
					<input type="hidden" name="token" value={token} />
					<input
						type="password"
						placeholder="New password"
						name="password"
						required
						onChange={event => setPassword(event.target.value)}
						className="input input-bordered w-full max-w-xs"
					/>

					<input
						type="password"
						placeholder="Confirm new password"
						name="password"
						required
						onChange={event => setConfirmPassword(event.target.value)}
						className="input input-bordered w-full max-w-xs mt-2"
					/>

					{passwordsDoNotMatch ? (
						<p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
					) : null}

					<div className="flex items-center justify-start mt-4">
						<button
							type="submit"
							className="btn btn-sm btn-success"
							disabled={passwordsDoNotMatch}
						>
							Reset password
						</button>
					</div>
				</form>
			) : (
				<form
					onSubmit={submitSendPwResetEmail}
					className="login-form p-6 mx-auto max-w-sm mt-10"
				>
					<div>
						<label htmlFor="email" className="block font-bold mb-2">
							E-Mail
						</label>
						<input
							type="text"
							placeholder="Email"
							name="email"
							required
							onChange={event => setEmail(event.target.value)}
							className="input input-bordered w-full max-w-xs"
						/>
					</div>

					<div className="flex items-center justify-start mt-4">
						<button type="submit" className="btn btn-sm btn-success">
							Send reset password email
						</button>
					</div>
				</form>
			)}

			<div className="mt-4 text-center">
				Remember your password?{' '}
				<Link to="/login" className="text-blue-500">
					Log in
				</Link>
			</div>
		</>
	);
}
