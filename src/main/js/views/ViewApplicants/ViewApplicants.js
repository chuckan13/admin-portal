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
		teamThree: ''
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

	displayInfo(userId) {
		axios
			.get('/api/users/' + userId)
			.then(res => {
				this.setState(
					{
						user: res.data,
						viewUser: true,
						teamOne: res.data.teams[0],
						teamTwo: res.data.teams[1],
						teamThree: res.data.teams[2]
					},
					function() {
						console.log(this.state.user);
						console.log(this.state.teamOne);
					}
				);
			})
			.catch(err => console.log(err));
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
			if (user.teams[0]) {
				c1 = user.teams[0].name;
			}
			if (user.teams[1]) {
				c2 = user.teams[1].name;
			}
			if (user.teams[2]) {
				c3 = user.teams[2].name;
			}

			return [
				<TableEntry
					key={user.id}
					firstName={user.firstName}
					lastName={user.lastName}
					c1={c1}
					c2={c2}
					c3={c3}
					onClick={() => this.displayInfo(user.token)}
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
					<p id="information"> Class: {props.user.class}</p>
					<p id="information"> Concentration: {props.user.concentration}</p>
					<p id="information-last"> Gender: {props.user.gender}</p>
				</div>
				<div>
					<p id="header">Short Response Questions</p>
					<ShortResponseSection
						id="response"
						name={props.teamOne.name}
						num="1"
						q1={props.teamOne.questionOne}
						r1={props.user.responseOne}
						q2={props.teamOne.questionTwo}
						r2={props.user.responseTwo}
					/>
					<ShortResponseSection
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
					/>
				</div>
			</div>
			<BackButton onClick={props.onClick} />
		</div>
	);
}

function ShortResponseSection(props) {
	return (
		<div id="choice-section">
			<p id="review-choice">
				{' '}
				Team {props.num}: {props.name}
			</p>
			<p id="question">{props.q1}</p>
			<pre id="response">{props.r1}</pre>
			<p id="question">{props.q2}</p>
			<pre id={props.id}>{props.r2}</pre>
		</div>
	);
}

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
