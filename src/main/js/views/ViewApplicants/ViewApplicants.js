import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import './ViewApplicants.css';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
addStyle(Button, 'view-more');

class viewApplicants extends Component {
	state = {
		applicants: [],
		viewUser: false,
		user: 0,
		teamOne: '',
		teamTwo: '',
		teamThree: '',
		responses: [],
		questions: []
	};

	constructor(props) {
		super(props);
		this.displayInfo = this.displayInfo.bind(this);
		this.displayTable = this.displayTable.bind(this);
	}

	componentDidMount() {
		// request the list of teams
		axios
			.get('/api/users')
			.then(res => {
				this.setState({ applicants: res.data });
			})
			.catch(err => console.log(err));
	}

	async displayInfo(userId) {
		await axios
			.get('/api/users/' + userId)
			.then(res => {
				this.setState(
					{
						user: res.data,
						viewUser: true
						// teamOne: res.data.teams[0],
						// teamTwo: res.data.teams[1],
						// teamThree: res.data.teams[2]
					},
					function() {
						console.log('Get user on display info');
						console.log(this.state.user);
						// console.log(this.state.teamOne);
					}
				);
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/users/teams/' + userId)
			.then(res => {
				this.setState(
					{
						teamOne: res.data[0],
						teamTwo: res.data[1],
						teamThree: res.data[2]
					},
					function() {
						console.log('List teams');
						console.log(this.state.teamOne);
						console.log(this.state.teamTwo);
						console.log(this.state.teamThree);
						// console.log(this.state.teamOne);
					}
				);
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/users/responses/' + userId)
			.then(res => {
				this.setState(
					{
						responses: res.data
					},
					function() {
						console.log('List Responses');
						console.log(this.state.responses);
					}
				);
			})
			.catch(err => console.log(err));

		await Promise.all(
			this.state.responses.map(obj =>
				axios
					.get('/api/responses/question/' + obj.questionId)
					.then(response => {
						var temp = this.state.questions;
						// questions.push(response);
						temp.push(response.questionId);
						this.setState({
							questions: temp
						});
					})
					.catch(err => console.log(err))
			)
		);
		console.log('All Questions');
		console.log(this.state.questions);
	}

	displayTable() {
		this.setState({
			viewUser: false
		});
	}

	render() {
		let renderTable = this.state.applicants.map(user => {
			// catch if user doesn't have 3 teams ranked
			let c1,
				c2,
				c3 = '';
			if (!this.state.teamOne === '') {
				c1 = this.state.teamOne.name;
			}
			if (!this.state.teamTwo === '') {
				c2 = this.state.teamTwo.name;
			}
			if (!this.state.teamThree === '') {
				c3 = this.state.teamThree.name;
			}
			console.log('Team Names');
			console.log(c1);
			console.log(c2);
			console.log(c3);
			return [
				<TableEntry
					key={user.id}
					firstName={user.firstName}
					lastName={user.lastName}
					c1={c1}
					c2={c2}
					c3={c3}
					onClick={() => this.displayInfo(user.id)}
				/>
			];
		});

		let display;
		let viewUser = this.state.viewUser;

		if (!viewUser) {
			display = (
				<div>
					<Row className="center-block text-center">
						<Table id="user-table">
							<thead>
								<tr id="head">
									<th>First Name</th>
									<th>Last Name</th>
									<th>First Choice</th>
									<th>Second Choice</th>
									<th>Third Choice</th>
									<th>More Details</th>
								</tr>
							</thead>
							<tbody>{renderTable}</tbody>
						</Table>
						<BackButton onClick={this.props.backButton} />
					</Row>
				</div>
			);
		} else {
			display = (
				<UserProfile
					user={this.state.user}
					teamOne={this.state.teamOne}
					teamTwo={this.state.teamTwo}
					teamThree={this.state.teamThree}
					responses={this.state.responses}
					questions={this.state.questions}
					onClick={this.displayTable}
				/>
			);
		}

		return <div>{display}</div>;
	}
}

function UserProfile(props) {
	return (
		<div>
			<div id="user-profile">
				<div id="chunk">
					<p id="header">
						{props.user.firstName} {props.user.lastName}
					</p>
					<p id="information"> Email: {props.user.email}</p>
					<p id="information"> Class: {props.user.classYear}</p>
					<p id="information"> Concentration: {props.user.concentration}</p>
				</div>
				<div>
					<p id="header">Short Response Questions</p>
					{/* <ShortResponseSection
						id="response"
						name={props.teamOne.name}
						num={props.num}
						question={question.text}
						qId={question.id}
						resp={currResponse}
					/> */}
					<ShortResponseSection
						id="response"
						name={props.teamOne.name}
						num="1"
						question={props.questions[0].text}
						resp={props.responses[0].text}
					/>
					{/* <ShortResponseSection
						id="response"
						name={props.teamTwo.name}
						num="2"
						q1={props.teamTwo.questionOne}
						r1={props.user.responseThree}
						q2={props.teamTwo.questionTwo}
						r2={props.user.responseFour}
					/>
					<ShortResponseSection
						id="response-last"
						name={props.teamThree.name}
						num="3"
						q1={props.teamThree.questionOne}
						r1={props.user.responseFive}
						q2={props.teamThree.questionTwo}
						r2={props.user.responseSix}
					/> */}
				</div>
			</div>
			<BackButton onClick={props.onClick} />
		</div>
	);
}
function ShortResponseSection(props) {
	return (
		<div id="choice-section">
			<p id="question">{props.question}</p>
			<p id="response">{props.resp}</p>
		</div>
	);
}
// function ShortResponseSection(props) {
// 	return (
// 		<div id="choice-section">
// 			<p id="review-choice">
// 				{' '}
// 				Team {props.num}: {props.name}
// 			</p>
// 			<p id="question">{props.q1}</p>
// 			<pre id="response">{props.r1}</pre>
// 			<p id="question">{props.q2}</p>
// 			<pre id={props.id}>{props.r2}</pre>
// 		</div>
// 	);
// }

function TableEntry(props) {
	return (
		<tr>
			<td>{props.firstName}</td>
			<td>{props.lastName}</td>
			<td>{props.c1}</td>
			<td>{props.c2}</td>
			<td>{props.c3}</td>
			<td>
				<Button bsStyle="view-more" onClick={props.onClick}>
					view
				</Button>
			</td>
		</tr>
	);
}

function BackButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div>
					<Button bsStyle="admin" bsSize="large" onClick={props.onClick}>
						back
					</Button>
				</div>
			</Row>
		</div>
	);
}

export default viewApplicants;
