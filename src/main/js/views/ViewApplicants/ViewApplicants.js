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
		fullList: [],
		users: {},
		viewUser: false,
		user: 0,
		currTeam: '',
		currUser: '',
		responses: [],
		questions: [],
		teamOne: '',
		teamTwo: '',
		teamThree: '',
		teamOneQuestions: [],
		teamTwoQuestions: [],
		teamThreeQuestions: []
	};

	constructor(props) {
		super(props);

		this.displayInfo = this.displayInfo.bind(this);
		this.displayTable = this.displayTable.bind(this);
	}

	async componentDidMount() {
		// request the list of teams
		var users = {};
		var allApplicants = [];
		await axios
			.get('/api/loginusers')
			.then(res => {
				this.setState({
					currUser: res.data
				});
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/users/all')
			.then(res => {
				fullList = res.data;
				this.setState({ fullList: res.data });
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/users')
			.then(res => {
				allApplicants = res.data;
				this.setState({ applicants: res.data });
			})
			.catch(err => console.log(err));
		// console.log('All aplicants', allApplicants);

		await axios
			.get('/api/teams')
			.then(res => {
				// currTeam = res.data;
				this.setState({ currTeam: res.data });
			})
			.catch(err => console.log(err));

		await Promise.all(
			fullList.map(obj =>
				axios.get('/api/users/teams/' + obj.id).then(res => {
					// console.log('in /api/users/teams');
					// console.log(res.data);
					users[obj.id] = res.data;
				})
			)
		);

		// console.log('users dict', users);
		this.setState({ users: users });
	}

	async displayInfo(userId) {
		await axios
			.get('/api/users/' + userId)
			.then(res => {
				console.log('Current User', res.data);
				this.setState(
					{
						user: res.data,
						viewUser: true
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
				// console.log('Teams', res.data);
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
			.get('/api/questions/teams/' + this.state.teamOne.id)
			.then(res => {
				this.setState(
					{
						teamOneQuestions: res.data
					},
					function() {
						console.log('Team One Questions');
						console.log(this.state.teamOneQuestions);
					}
				);
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/questions/teams/' + this.state.teamTwo.id)
			.then(res => {
				this.setState(
					{
						teamTwoQuestions: res.data
					},
					function() {
						console.log('Team Two Questions');
						console.log(this.state.teamTwoQuestions);
					}
				);
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/questions/teams/' + this.state.teamThree.id)
			.then(res => {
				this.setState(
					{
						teamThreeQuestions: res.data
					},
					function() {
						console.log('Team Three Questions');
						console.log(this.state.teamThreeQuestions);
					}
				);
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/users/responses/' + userId)
			.then(res => {
				// console.log('responses: ', res.data);
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
		let questionList = [];
		await Promise.all(
			this.state.responses.map(obj =>
				axios
					.get('/api/responses/question/' + obj.id)
					.then(response => {
						questionList.push(response.data);
					})
					.catch(err => console.log(err))
			)
		);
		this.setState({
			questions: questionList
		});
		console.log('All Questions');
		console.log(questionList);
	}

	displayTable() {
		this.setState({
			viewUser: false
		});
	}

	render() {
		let renderTable = this.state.applicants.map(user => {
			return [
				<TableEntry
					key={user.id}
					firstName={user.firstName}
					lastName={user.lastName}
					onClick={() => this.displayInfo(user.id)}
				/>
			];
		});

		let presView = this.state.fullList.map(user => {
			console.log('pres view');
			let c1 = 'empty',
				c2 = 'empty',
				c3 = 'empty';
			var allTeams = this.state.users[user.id];
			if (allTeams === undefined) {
				console.log('allteams undefined');
			} else {
				console.log('teams defined');
				if (allTeams[0]) {
					c1 = allTeams[0].name;
				}
				if (allTeams[1]) {
					c2 = allTeams[1].name;
				}
				if (allTeams[2]) {
					c3 = allTeams[2].name;
				}
			}
			console.log(c1, c2, c3);
			return [
				<PresTableEntry
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
		let userRole = this.state.currUser.role;

		if (!viewUser) {
			if (userRole === 'USER') {
				display = (
					<div>
						<Row className="center-block text-center">
							<Table id="user-table">
								<thead>
									<tr id="head">
										<th>First Name</th>
										<th>Last Name</th>
										{/* <th>First Choice</th>
									<th>Second Choice</th>
									<th>Third Choice</th> */}
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
								<tbody>{presView}</tbody>
							</Table>
							<BackButton onClick={this.props.backButton} />
						</Row>
					</div>
				);
			}
		} else {
			console.log('Before userprofile');
			console.log(this.state);
			if (userRole === 'USER') {
				display = (
					<UserProfile
						user={this.state.user}
						team={this.state.currTeam}
						// teamOne={this.state.teamOne}
						// teamTwo={this.state.teamTwo}
						// teamThree={this.state.teamThree}
						// teamOneQuestions={this.state.teamOneQuestions}
						// teamTwoQuestions={this.state.teamTwoQuestions}
						// teamThreeQuestions={this.state.teamThreeQuestions}
						responses={this.state.responses}
						questions={this.state.questions}
						onClick={this.displayTable}
					/>
				);
			} else {
				display = (
					<PresUserProfile
						user={this.state.user}
						team={this.state.currTeam}
						teamOne={this.state.teamOne}
						teamTwo={this.state.teamTwo}
						teamThree={this.state.teamThree}
						teamOneQuestions={this.state.teamOneQuestions}
						teamTwoQuestions={this.state.teamTwoQuestions}
						teamThreeQuestions={this.state.teamThreeQuestions}
						responses={this.state.responses}
						questions={this.state.questions}
						onClick={this.displayTable}
					/>
				);
			}
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
					<TeamResponses
						team={props.team.name}
						// num="One"
						questions={props.questions}
						resp={props.responses}
					/>
				</div>
			</div>
			<BackButton onClick={props.onClick} />
		</div>
	);
}

function PresUserProfile(props) {
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
					<TeamResponses
						team={props.teamOne.name}
						num="One"
						questions={props.teamOneQuestions}
						resp={props.responses}
					/>
					{props.teamTwo ? (
						<TeamResponses
							team={props.teamTwo.name}
							num="Two"
							questions={props.teamTwoQuestions}
							resp={props.responses}
						/>
					) : (
						''
					)}
					{props.teamThree ? (
						<TeamResponses
							team={props.teamThree.name}
							num="Three"
							questions={props.teamThreeQuestions}
							resp={props.responses}
						/>
					) : (
						''
					)}
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
function TeamResponses(props) {
	const responses = props.questions.map(question => {
		var currResponse = '';
		for (var i = 0; i < props.resp.length; i++) {
			if (props.resp[i].questionId == question.id) {
				currResponse = props.resp[i].text;
			}
		}
		return (
			<ShortResponseSection
				id="response-last"
				// name={props.team}
				// num={props.num}
				question={question.text}
				// qId={question.id}
				resp={currResponse}
			/>
		);
	});

	return (
		<div id="choice-section">
			<p id="review-choice"> Choice: {props.team} </p>
			<div id="responses">{responses}</div>
		</div>
	);
}

function TableEntry(props) {
	return (
		<tr>
			<td>{props.firstName}</td>
			<td>{props.lastName}</td>
			<td>
				<Button bsStyle="view-more" onClick={props.onClick}>
					view
				</Button>
			</td>
		</tr>
	);
}

function PresTableEntry(props) {
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
