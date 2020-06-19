import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './EditApplication.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';

class editApplication extends Component {
	state = {
		questionOne: '',
		questionTwo: '',
		curr1: '',
		curr2: ''
	};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.handleUpdateClick = this.handleUpdateClick.bind(this);
	}

	componentDidMount() {
		// request the list of teams
		axios
			.get('/api/teams/2')
			.then(res => {
				this.setState({
					curr1: res.data.questionOne,
					curr2: res.data.questionTwo
				});
			})
			.catch(err => console.log(err));
	}

	updateState(e) {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value
		});
	}

	handleUpdateClick() {
		let q1, q2;
		if (this.state.questionOne === '') {
			q1 = this.state.curr1;
		} else {
			q1 = this.state.questionOne;
		}

		if (this.state.questionTwo === '') {
			q2 = this.state.curr2;
		} else {
			q2 = this.state.questionTwo;
		}

		this.setState({
			curr1: q1,
			curr2: q2
		});
		this.props.updateQuestions(q1, q2);
	}

	render() {
		return (
			<div>
				<div>
					<p id="header"> Current Questions: </p>
				</div>
				<p id="information">{this.state.curr1}</p>
				<p id="information-last">{this.state.curr2}</p>
				<div>
					<p id="header">New Questions</p>
				</div>
				<div id="questions">
					<Question name="questionOne" num="First" v={this.state.questionOne} onChange={this.updateState} />
					<Question name="questionTwo" num="Second" v={this.state.questionTwo} onChange={this.updateState} />
					<Row className="center-block text-center">
						<Button id="update-button" bsStyle="back" bsSize="large" onClick={this.handleUpdateClick}>
							update
						</Button>
					</Row>
				</div>
				<Row className="center-block text-center">
					<Button bsStyle="back" bsSize="large" onClick={this.props.backButton}>
						back
					</Button>
				</Row>
			</div>
		);
	}
}

function Question(props) {
	return (
		<FormGroup controlId="formControlsTextarea">
			<ControlLabel id="long-form-label">{props.num} Question:</ControlLabel>
			<FormControl
				id="long-form-answer"
				name={props.name}
				componentClass="textarea"
				value={props.v}
				onChange={props.onChange}
			/>
		</FormGroup>
	);
}

function BackButton(props) {
	return (
		<Col>
			<Button bsStyle="back" bsSize="large" onClick={props.onClick}>
				back
			</Button>
		</Col>
	);
}

export default editApplication;
