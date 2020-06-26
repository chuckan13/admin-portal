import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './EditApplication.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

class editApplication extends Component {
	state = {
		currTeam: '',
		questions: [],
		newQuestion: ''
	};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.handleUpdateClick = this.handleUpdateClick.bind(this);
	}

	async componentDidMount() {
		await axios
			.get('/api/teams')
			.then(res => {
				this.setState({ currTeam: res.data });
			})
			.catch(err => console.log(err));
		await axios
			.get('/api/questions/teams/' + this.state.currTeam.id)
			.then(res => {
				this.setState({ questions: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	}

	updateState(e) {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value
		});
	}

	async handleUpdateClick() {
		var that = this;
		if (newQuestion === '') {
			console.log('nothing entered');
		} else {
			await axios
				.post('/api/questions/new', {
					text: this.state.newQuestion,
					teamId: this.state.currTeam.id
				})
				.then(function(response) {
					console.log('new question');
					console.log(response);
					oldQuest = that.state.questions;
					oldQuest.push(response.data);
					that.setState({
						questions: oldQuest,
						newQuestion: ''
					});
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}

	render() {
		let currQuestTable = this.state.questions.map(question => {
			return [ <CurrQuestion question={question.text} /> ];
		});
		return (
			<div>
				<Row className="center-block text-center">
					<Table>
						<thead>
							<tr id="head">
								<th>Current Questions:</th>
							</tr>
						</thead>
						<tbody>{currQuestTable}</tbody>
					</Table>
					{/* <BackButton onClick={this.props.backButton} /> */}
				</Row>
				<Row className="center-block text-center">
					<Table>
						<thead>
							<tr id="head">
								<th>New Questions:</th>
							</tr>
						</thead>
						<tbody>
							<Question name="newQuestion" onChange={this.updateState} />
						</tbody>
					</Table>
					<Button id="update-button" bsStyle="back" bsSize="large" onClick={this.handleUpdateClick}>
						Update Question
					</Button>
					<BackButton onClick={this.props.backButton} />
				</Row>
			</div>
		);
	}
}

function CurrQuestion(props) {
	return (
		<tr>
			<td>{props.question}</td>
		</tr>
	);
}

function Question(props) {
	return (
		<FormGroup>
			{/* <ControlLabel id="long-form-label">Enter a new question:</ControlLabel> */}
			<FormControl id="long-form-answer" name={props.name} componentClass="textarea" onChange={props.onChange} />
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
