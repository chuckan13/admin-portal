import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import './ViewApplicants.css';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';

const processString = require('react-process-string');

addStyle(Button, 'view-more');
addStyle(Button, 'first-rank');
addStyle(Button, 'reject-rank');
addStyle(Button, 'maybe-rank');

class viewApplicants extends Component {
	state = {
		applicants: [],
		fullList: [],
		currUserTeam: '',
		users: {},
		userTeams: {},
		presUserTeams: {},
		viewUser: false,
		user: 0,
		currTeam: '',
		currUser: '',
		responses: [],
		presResponses: [],
		questions: [],
		presQuestions: [],
		teamOne: '',
		teamTwo: '',
		teamThree: '',
		teamOneQuestions: [],
		teamTwoQuestions: [],
		teamThreeQuestions: [],
		emptyTeam: ''
	};

	constructor(props) {
		super(props);

		this.displayInfo = this.displayInfo.bind(this);
		this.displayTable = this.displayTable.bind(this);
		this.changeRankFirst = this.changeRankFirst.bind(this);
		this.changeRankReject = this.changeRankReject.bind(this);
		this.changeRankMaybe = this.changeRankMaybe.bind(this);
	}

	async componentDidMount() {
		// request the list of teams
		var users = {};
		var userTeams = {};
		var presUserTeams = {};
		var allApplicants = [];
		var fullList = [];
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
		this.setState({ users: users });

		// //Get all userteams for director
		// await Promise.all(
		// 	fullList.map(obj =>
		// 		axios.get('/api/users/userteams/' + obj.id).then(res => {
		// 			// console.log('in /api/users/teams');
		// 			// console.log(res.data);
		// 			userTeams[obj.id] = res.data;
		// 		})
		// 	)
		// );
		// this.setState({ userTeams: userTeams });

		//Get all userteams for president
		await Promise.all(
			fullList.map(obj =>
				axios.get('/api/users/presuserteams/' + obj.id).then(res => {
					presUserTeams[obj.id] = res.data;
				})
			)
		);
		// console.log('PRES USER TEAMS', presUserTeams);
		this.setState({ presUserTeams: presUserTeams });
	}

	async displayInfo(userId) {
		await axios
			.get('/api/teams/0')
			.then(res => {
				this.setState({ emptyTeam: res.data });
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/users/' + userId)
			.then(res => {
				// console.log('Current User', res.data);
				this.setState(
					{
						user: res.data,
						viewUser: true
					},
					function () {
						// console.log('Get user on display info');
						// console.log(this.state.user);
						// console.log(this.state.teamOne);
					}
				);
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/users/teams/' + userId)
			.then(res => {
				// console.log('Teams', res.data);
				// this.setState(
				// 	{
				// 		teamOne: res.data[0],
				// 		teamTwo: res.data[1],
				// 		teamThree: res.data[2]
				// 	},
				// 	function() {
				// 		console.log('List teams');
				// 		console.log(this.state.teamOne);
				// 		console.log(this.state.teamTwo);
				// 		console.log(this.state.teamThree);
				// 		// console.log(this.state.teamOne);
				// 	}
				// );
				// console.log('RESPONSE DATA');
				// console.log(res.data);
				// console.log(res.data[0]);
				if (res.data[0] == null) {
					console.log('null team one');
					this.setState({ teamOne: this.state.emptyTeam });
				} else {
					this.setState({ teamOne: res.data[0] });
				}
				if (res.data[1] == null) {
					this.setState({ teamTwo: this.state.emptyTeam });
				} else {
					this.setState({ teamTwo: res.data[1] });
				}
				if (res.data[2] == null) {
					this.setState({ teamThree: this.state.emptyTeam });
				} else {
					this.setState({ teamThree: res.data[2] });
				}
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/questions/teams/' + this.state.teamOne.id)
			.then(res => {
				this.setState(
					{
						teamOneQuestions: res.data
					},
					function () {
						// console.log('Team One Questions');
						// console.log(this.state.teamOneQuestions);
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
					function () {
						// console.log('Team Two Questions');
						// console.log(this.state.teamTwoQuestions);
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
					function () {
						// console.log('Team Three Questions');
						// console.log(this.state.teamThreeQuestions);
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
					function () {
						// console.log('List Responses');
						// console.log(this.state.responses);
					}
				);
			})
			.catch(err => console.log(err));

		await axios
			.get('/api/users/presresponses/' + userId)
			.then(res => {
				// console.log('responses: ', res.data);
				this.setState(
					{
						presResponses: res.data
					},
					function () {
						// console.log('List Pres Responses');
						// console.log(this.state.presResponses);
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

		let presQuestionList = [];
		await Promise.all(
			this.state.presResponses.map(obj =>
				axios
					.get('/api/responses/question/' + obj.id)
					.then(response => {
						presQuestionList.push(response.data);
					})
					.catch(err => console.log(err))
			)
		);
		this.setState({
			presQuestions: presQuestionList
		});
		// console.log('All Questions');
		// console.log(questionList);
	}

	displayTable() {
		this.setState({
			viewUser: false
		});
	}

	changeRankFirst() {
		var userTeamList = this.state.presUserTeams[this.state.user.id];
		// console.log('USER TEAM LIST', userTeamList);
		var userTeam = '';
		userTeamList.forEach(element => {
			if (element.teamId === this.state.currTeam.id) {
				userTeam = element;
			}
		});

		var newUserTeam = userTeam;
		newUserTeam.rank = 'Accept';
		axios
			.patch('/api/userteams/' + userTeam.id, newUserTeam)
			.then(res => {
				console.log('update userteam response: ', res.data);
				this.setState({
					viewUser: false
				});
			})
			.catch(err => console.log(err));
	}

	changeRankReject() {
		var userTeamList = this.state.presUserTeams[this.state.user.id];
		// console.log('USER TEAM LIST', userTeamList);
		var userTeam = '';
		userTeamList.forEach(element => {
			if (element.teamId === this.state.currTeam.id) {
				userTeam = element;
			}
		});

		var newUserTeam = userTeam;
		newUserTeam.rank = 'Reject';
		axios
			.patch('/api/userteams/' + userTeam.id, newUserTeam)
			.then(res => {
				// console.log('update userteam response: ', res.data);
				this.setState({
					viewUser: false
				});
			})
			.catch(err => console.log(err));
	}

	changeRankMaybe() {
		var userTeamList = this.state.presUserTeams[this.state.user.id];
		// console.log('USER TEAM LIST', userTeamList);
		var userTeam = '';
		userTeamList.forEach(element => {
			if (element.teamId === this.state.currTeam.id) {
				userTeam = element;
			}
		});

		var newUserTeam = userTeam;
		newUserTeam.rank = 'Maybe';
		axios
			.patch('/api/userteams/' + userTeam.id, newUserTeam)
			.then(res => {
				// console.log('update userteam response: ', res.data);
				this.setState({
					viewUser: false
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		// var currUserTeam = '';
		let renderTable = this.state.applicants.map(user => {
			var userTeamList = this.state.presUserTeams[user.id];
			// console.log('USER TEAM LIST', userTeamList);
			var userTeam = '';
			if (userTeamList == null) {
				userTeam = {
					rank: 'none'
				};
			} else {
				userTeamList.forEach(element => {
					if (element.teamId === this.state.currTeam.id) {
						userTeam = element;
					}
				});
			}
			// currUserTeam = userTeam;
			// for (const [ key, value ] of Object.entries(userTeamList)) {
			// 	console.log(key, value);
			// 	if (value.teamId === currTeam.id) {
			// 		userTeam = value;
			// 	}
			// }
			// console.log('USER TEAM', userTeam);
			return [
				<TableEntry
					key={user.id}
					firstName={user.firstName}
					lastName={user.lastName}
					concentration={user.concentration}
					classYear={user.classYear}
					rank={userTeam.rank}
					onClick={() => this.displayInfo(user.id)}
				/>
			];
		});

		let presView = this.state.fullList.map(user => {
			var userTeamList = this.state.presUserTeams[user.id];
			// console.log(userTeamList);
			// console.log('pres view');
			let c1 = 'empty',
				c2 = 'empty',
				c3 = 'empty',
				rank1 = '',
				rank2 = '',
				rank3 = '';

			if (userTeamList == null) {
				rank1 = 'none';
				rank2 = 'none';
				rank3 = 'none';
			} else {
				if (userTeamList[0] != null) {
					rank1 = userTeamList[0].rank;
				}
				if (userTeamList[1] != null) {
					rank2 = userTeamList[1].rank;
				}
				if (userTeamList[2] != null) {
					rank3 = userTeamList[2].rank;
				}
			}
			var allTeams = this.state.users[user.id];
			if (allTeams === undefined) {
				// console.log('allteams undefined');
			} else {
				// console.log('teams defined');
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
			// console.log(c1, c2, c3);
			return [
				<PresTableEntry
					key={user.id}
					firstName={user.firstName}
					lastName={user.lastName}
					c1={c1}
					c2={c2}
					c3={c3}
					teamOneRank={rank1}
					teamTwoRank={rank2}
					teamThreeRank={rank3}
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
										<th>Concentration</th>
										<th>Class Year</th>
										<th>Rank</th>
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
			// console.log('Before userprofile');
			// console.log(this.state);

			if (userRole === 'USER') {
				// console.log(this.state.user);
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
						onRank={this.changeRankFirst}
						onReject={this.changeRankReject}
						onMaybe={this.changeRankMaybe}
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
						responses={this.state.presResponses}
						questions={this.state.presQuestions}
						onClick={this.displayTable}
					/>
				);
			}
		}

		return <div>{display}</div>;
	}
}

function UserProfile(props) {
	// console.log(props.user);
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
					{/* <p id="information"> Building: {props.user.building}</p>
					<p id="information"> Room Number: {props.user.roomNumber}</p> */}
					<p id="information"> Phone Number: {props.user.phoneNumber}</p>
					<p id="information"> LinkedIn Profile: {props.user.linkedin}</p>
					<p id="information"> Returning Member? {props.user.returningMember}</p>
					<p id="information"> 3 Strong Traits:  {props.user.traits}</p>
					<p id="information"> Why join E-Club?  {props.user.whyJoin}</p>
					<p id="information"> Extracurriculars:  {props.user.extracurr}</p>
					<p id="information"> Crazy idea:  {props.user.idea}</p>
					<p id="information"> Resume link:  {props.user.resume}</p>
					<p id="information"> Portfolio link: {props.user.portfolio}</p>
					<p id="information"> Tigertrek interest: {props.user.tigertrek}</p>
				</div>
				<div>
					<p id="header">Short Response Questions</p>
					<TeamResponses
						key={props.user.id}
						team={props.team.name}
						// num="One"
						questions={props.questions}
						resp={props.responses}
					/>
				</div>
			</div>
			<div align="center">
				<div style={{ display: 'inline-block' }}>
					<FirstRankButton onClick={props.onRank} />
				</div>
				<div style={{ display: 'inline-block' }}>
					<MaybeRankButton onClick={props.onMaybe} />
				</div>
				<div style={{ display: 'inline-block' }}>
					<RejectRankButton onClick={props.onReject} />
				</div>
			</div>

			<BackButton onClick={props.onClick} />
		</div>
	);
}

function PresUserProfile(props) {
	// console.log(props.user);
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
					{/* <p id="information"> Building: {props.user.building}</p>
					<p id="information"> Room Number: {props.user.roomNumber}</p> */}
					<p id="information"> Phone Number: {props.user.phoneNumber}</p>
					<p id="information"> LinkedIn Profile: {props.user.linkedin}</p>
					<p id="information"> Returning Member? {props.user.returningMember}</p>
					<p id="information"> 3 Strong Traits:  {props.user.traits}</p>
					<p id="information"> Why join E-Club?  {props.user.whyJoin}</p>
					<p id="information"> Extracurriculars:  {props.user.extracurr}</p>
					<p id="information"> Crazy idea:  {props.user.idea}</p>
					<p id="information"> Resume link:  {props.user.resume}</p>
					<p id="information"> Portfolio link: {props.user.portfolio}</p>
					<p id="information"> Tigertrek interest: {props.user.tigertrek}</p>
				</div>
				<div>
					<p id="header">Short Response Questions</p>
					<TeamResponses
						key={props.user.id}
						team={props.teamOne.name}
						num="One"
						questions={props.teamOneQuestions}
						resp={props.responses}
					/>
					{props.teamTwo ? (
						<TeamResponses
							key={props.user.id}
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
							key={props.user.id}
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
	let config = [
		{
			regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
			fn: (key, result) => (
				<span key={key}>
					<a target="_blank" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>
						{result[2]}.{result[3]}
						{result[4]}
					</a>
					{result[5]}
				</span>
			)
		},
		{
			regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
			fn: (key, result) => (
				<span key={key}>
					<a target="_blank" href={`http://${result[1]}.${result[2]}${result[3]}`}>
						{result[1]}.{result[2]}
						{result[3]}
					</a>
					{result[4]}
				</span>
			)
		}
	];

	let stringWithLinks = props.resp;
	let processed = processString(config)(stringWithLinks);
	return (
		<div id="choice-section">
			<p id="question">{props.question}</p>
			<p id="response">{processed}</p>
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
				key={currResponse.id}
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
			<td>{props.concentration}</td>
			<td>{props.classYear}</td>
			<td>{props.rank}</td>
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
			<td
				style={{
					'background-color':
						props.teamOneRank === 'Accept'
							? 'lightgreen'
							: props.teamOneRank === 'Reject' ? 'lightcoral' : 'white'
				}}
			>
				{props.c1}
			</td>
			<td
				style={{
					'background-color':
						props.teamTwoRank === 'Accept'
							? 'lightgreen'
							: props.teamTwoRank === 'Reject' ? 'lightcoral' : 'white'
				}}
			>
				{props.c2}
			</td>
			<td
				style={{
					'background-color':
						props.teamThreeRank === 'Accept'
							? 'lightgreen'
							: props.teamThreeRank === 'Reject' ? 'lightcoral' : 'white'
				}}
			>
				{props.c3}
			</td>
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
						Back
					</Button>
				</div>
			</Row>
		</div>
	);
}
function FirstRankButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div>
					<Button bsStyle="first-rank" bsSize="large" onClick={props.onClick}>
						Accept
					</Button>
				</div>
			</Row>
		</div>
	);
}

function RejectRankButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div>
					<Button bsStyle="reject-rank" bsSize="large" onClick={props.onClick}>
						Reject
					</Button>
				</div>
			</Row>
		</div>
	);
}

function MaybeRankButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div>
					<Button bsStyle="maybe-rank" bsSize="large" onClick={props.onClick}>
						Maybe
					</Button>
				</div>
			</Row>
		</div>
	);
}

export default viewApplicants;
