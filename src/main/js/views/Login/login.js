import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';

export default function Login() {
	const [ userName, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	function validateForm() {
		return userName.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		let formData = new FormData();
		formData.append('username', userName);
		formData.append('password', password);
		const data = new URLSearchParams(formData);
		console.log(formData);
		console.log(userName);
		console.log(password);
		debugger;
		fetch('https://application-portal-admin.herokuapp.com/login-process', {
			method: 'POST',
			body: data
		})
			.then(response => {
				console.log('Success');
				console.log(response);
				window.location.replace(response.url);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	return (
		<div className="Login">
			<form onSubmit={handleSubmit}>
				<FormGroup controlId="text" bsSize="large">
					<ControlLabel id="email-label">Username</ControlLabel>
					<FormControl autoFocus type="text" value={userName} onChange={e => setUsername(e.target.value)} />
				</FormGroup>
				<FormGroup controlId="password" bsSize="large">
					<ControlLabel id="email-label">Password</ControlLabel>
					<FormControl value={password} onChange={e => setPassword(e.target.value)} type="password" />
				</FormGroup>
				<Button block bsSize="large" disabled={!validateForm()} type="submit">
					Login
				</Button>
			</form>
		</div>
	);
}
