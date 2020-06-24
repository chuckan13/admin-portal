import React, { Component, useState } from 'react';

// import NavBar from './components/navbar.js';
// import Footer from './components/footer.js';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import { Form } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';

import '../../app.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	username: Yup.string().email('Must be a valid email').required('Required'),
	password: Yup.string().required('Required')
});

function LoginForm() {
	const [ loginFailed, setLoginFailed ] = useState(null);

	const {
		handleSubmit,
		handleChange,
		values,
		errors,
		touched,
		handleBlur,
		dirty,
		isValid,
		isSubmitting,
		setSubmitting
	} = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema,
		onSubmit(values) {
			let formData = new FormData();
			formData.append('username', values.username);
			formData.append('password', values.password);
			const data = new URLSearchParams(formData);
			// const data = JSON.stringify({
			// 	fullName: 'Niko Fotopoulos',
			// 	userName: values.username,
			// 	password: values.password,
			// 	role: 'USER',
			// 	loanOption1: '',
			// 	loanOption2: '',
			// 	loanOption3: '',
			// 	stripeCustomerId: '',
			// 	autopay: false,
			// 	selectedLoan: 0
			// });
			// const loginData = JSON.stringify(values);
			// console.log('LOG IN VALUES');
			// console.log(formData);
			// console.log(data);
			// debugger;
			fetch('https://application-portal-admin.herokuapp.com/login-process', {
				method: 'POST',
				body: data
			})
				.then(response => {
					console.log('Success');
					// console.log(response.headers.get('Authorization'));
					if (response.url === 'https://application-portal-admin.herokuapp.com/admin') {
						window.location.replace(response.url);
					} else if (response.url === 'https://application-portal-admin.herokuapp.com/badcredentials') {
						// console.log(response);
						setLoginFailed(
							<div className="invalid-feedback d-block position-static pt-2">
								Your email or password is incorrect.
							</div>
						);
					} else {
						// console.log(response);
						setLoginFailed(
							<div className="invalid-feedback d-block position-static pt-2">
								You are already signed in. If this is not the case, please contact Covered support team.
							</div>
						);
					}
				})
				.then(() => {
					setSubmitting(false);
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	});

	return (
		<form noValidate onSubmit={handleSubmit} className="text-left floating-form mb-5">
			<h2 className="text-center mb-4">
				<b>Login</b>
			</h2>
			<FormGroup className="pb-2">
				<ControlLabel>Email</ControlLabel>
				<FormControl
					type="email"
					name="username"
					value={values.username}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Email"
					isValid={touched.username && !errors.username}
					isInvalid={touched.username && !!errors.username}
				/>
				<FormControl.Feedback type="invalid">{errors.username}</FormControl.Feedback>
			</FormGroup>
			<FormGroup className="pb-0 mb-0">
				<ControlLabel>Password</ControlLabel>
				<FormControl
					type="password"
					name="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Password"
					isValid={touched.password && !errors.password}
					isInvalid={touched.password && !!errors.password}
				/>
				<FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
			</FormGroup>
			<Row className="justify-content-center text-center">
				<Button type="submit" variant="main" disabled={!(isValid && dirty) || isSubmitting} className="mt-5">
					{isSubmitting ? 'Loading...' : 'Submit'}
				</Button>
				{loginFailed}
			</Row>
		</form>
	);
}

class Login extends Component {
	componentDidMount() {
		fetch('https://application-portal-admin.herokuapp.com/api/loginusers/signinstatus')
			.then(response => response.json())
			.then(data => {
				console.log('Success: ', data);
				if (data == true) window.location.replace('https://application-portal-admin.herokuapp.com/admin');
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	render() {
		return (
			// <React.Fragment>
			<div>
				{/* <NavBar /> */}
				{/* lg={4} md={5} sm={7} className="mx-auto mt-4" */}
				<Col>
					<LoginForm />
				</Col>
			</div>

			// </React.Fragment>
		);
	}
}

export default Login;
