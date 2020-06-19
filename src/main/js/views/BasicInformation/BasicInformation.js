import React from 'react';
import './BasicInformation.css';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';

class BasicInformation extends React.Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		classYear: '',
		concentration: ''
	};

	constructor(props, context) {
		super(props, context);
		this.handleSubmitClick = this.handleSubmitClick.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	updateState(e) {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value
		});
	}

	handleSubmitClick() {
		var fn = this.state.firstName;
		var ln = this.state.lastName;
		var e = this.state.email;
		var cl = this.state.classYear;
		var con = this.state.concentration;
		this.props.handlePartOneClick(fn, ln, e, cl, con);
	}

	render() {
		return (
			<div>
				<div id="title">
					<p>Part 1: Basic Information</p>
				</div>
				<form>
					<FormEntry
						label="First Name:"
						ph="First Name"
						name="firstName"
						v={this.state.firstName}
						onChange={this.updateState}
					/>
					<FormEntry
						label="Last Name:"
						ph="Last Name"
						name="lastName"
						v={this.state.lastName}
						onChange={this.updateState}
					/>
					<FormEntry
						label="Email:"
						ph="Email"
						name="email"
						v={this.state.email}
						onChange={this.updateState}
					/>
					<FormEntry
						label="Class Year:"
						ph="Class Year"
						name="classYear"
						v={this.state.classYear}
						onChange={this.updateState}
					/>
					<FormEntry
						label="Concentration:"
						ph="Concentration"
						name="concentration"
						v={this.state.concentration}
						onChange={this.updateState}
					/>
				</form>
				<SubmitButton onClick={this.handleSubmitClick} />
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

export default BasicInformation;
