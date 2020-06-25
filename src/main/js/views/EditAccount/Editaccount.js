import React from 'react';
import axios from 'axios';
// import './BasicInformation.css';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import './EditAccount.css';

// function EditAccount() {

// }
class Edit extends React.Component {
	state = {
		oldPassword: '',
		newPassword: '',
		user: {},
		passwordUpdated: false,
		wrongPassword: false
	};

	constructor(props, context) {
		super(props, context);
		this.handleSubmitClick = this.handleSubmitClick.bind(this);
		this.updateState = this.updateState.bind(this);
		axios
			.get('/api/loginusers')
			.then(res => {
				this.setState({ user: res.data });
			})
			.catch(err => console.log(err));
	}

	updateState(e) {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value
		});
	}
	handleSubmitClick() {
		if (this.state.oldPassword === this.state.user.password) {
			axios
				.put('/api/loginusers', {
					fullName: user.fullName,
					userName: user.userName,
					role: user.role,
					password: this.state.newPassword
				})
				.then(function(response) {
					console.log('Success');
					this.setState({ passwordUpdated: true });
				})
				.catch(function(error) {
					console.log(error);
				});
		} else {
			this.setState({ wrongPassword: true });
		}
	}
	render() {
		let message;
		if (this.state.passwordUpdated) {
			message = 'Password is updated';
		} else if (this.state.wrongPassword) {
			message = 'Old password is incorrect';
		} else {
			message = '';
		}
		return (
			<div>
				<div id="title">
					<p>Edit Account Details</p>
				</div>
				<form>
					<FormEntry
						label="Old password:"
						ph="Old Password"
						name="oldPassword"
						v={this.state.oldPassword}
						onChange={this.updateState}
					/>
					<FormEntry
						label="New password:"
						ph="New Password"
						name="newPassword"
						v={this.state.newPassword}
						onChange={this.updateState}
					/>
				</form>
				<SubmitButton onClick={this.handleSubmitClick} />
				{message}
			</div>
		);
	}
}
function FormEntry(props) {
	return (
		<FormGroup>
			<ControlLabel id="short-form-label">{props.label}</ControlLabel>
			<FormControl
				id="short-form-answer"
				name={props.name}
				type="text"
				placeholder={props.ph}
				value={props.v}
				onChange={props.onChange}
			/>
		</FormGroup>
	);
}

function SubmitButton(props) {
	return (
		<Row className="center-block text-center">
			<Col>
				<Button bsStyle="next" bsSize="large" onClick={props.onClick}>
					next
				</Button>
			</Col>
		</Row>
	);
}
export default Edit;
