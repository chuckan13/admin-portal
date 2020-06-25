import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';

function LoginForm() {
	const [ userName, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	// componentDidMount() {
	// 	fetch('https://application-portal-admin.herokuapp.com/api/loginusers/signinstatus')
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log('Success: ', data);
	// 			if (data == true) window.location.replace('https://application-portal-admin.herokuapp.com/admin');
	// 		})
	// 		.catch(error => {
	// 			console.error('Error:', error);
	// 		});
	// }

	function validateForm() {
		return userName.length > 0 && password.length > 0;
	}

	async function handleSubmit(event) {
		let formData = new FormData();
		formData.append('username', userName);
		formData.append('password', password);
		const data = new URLSearchParams(formData);
		console.log(formData);
		console.log(userName);
		console.log(password);
		debugger;
		await fetch('https://application-portal-admin.herokuapp.com/login-process', {
			method: 'POST',
			body: data
		})
			.then(response => {
				console.log('Success');
				console.log(response);
				// window.location.replace(response.url);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	return (
		<div className="Login">
			<form name="f" action="login-process" method="POST" id="loginform">
				<table id="table-line">
					<tbody id="table-line">
						<tr id="table-line">
							<td id="table-line">
								<p>Username</p>
								<input type="text" name="username" size="30" />
							</td>
						</tr>
						<tr id="table-line">
							<td id="table-line">
								<p>Password</p>
								<input type="password" name="password" size="30" />
							</td>
						</tr>
						<tr id="table-line">
							<td id="table-line">
								<input id="submit-button" type="submit" value="Submit" />
							</td>
						</tr>
					</tbody>
				</table>
			</form>
			{/* <form onSubmit={handleSubmit}>
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
			</form> */}
		</div>
	);
}
class Login extends React.Component {
	state = {
		notloggedin: false
	};
	async componentDidMount() {
		await fetch('https://application-portal-admin.herokuapp.com/api/loginusers/signinstatus')
			.then(response => response.json())
			.then(data => {
				console.log('Success: ', data);
				if (data == true) {
					this.setState({ notloggedin: false });
					window.location.replace('https://application-portal-admin.herokuapp.com/admin');
				} else {
					this.setState({ notloggedin: true });
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}
	// constructor(props, context) {
	// 	super(props, context);
	// 	fetch('https://application-portal-admin.herokuapp.com/api/loginusers/signinstatus')
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log('Success: ', data);
	// 			if (data == true) window.location.replace('https://application-portal-admin.herokuapp.com/admin');
	// 		})
	// 		.catch(error => {
	// 			console.error('Error:', error);
	// 		});
	// }

	render() {
		if (this.state.notloggedin) {
			return (
				<div>
					{/* <Col lg={4} md={5} sm={7} className="mx-auto mt-4"> */}
					<LoginForm />
					{/* </Col> */}
				</div>
			);
		} else {
			return <div>Not found</div>;
		}

		// this.state.notloggedin ? (
		// 	return (
		// 	<div>
		// 		{/* <Col lg={4} md={5} sm={7} className="mx-auto mt-4"> */}
		// 		<LoginForm />
		// 		{/* </Col> */}
		// 	</div>
		// 	);
		// ) : (
		// 	// );
		// 	<div>Not found</div>
		// );
	}
}

export default Login;
