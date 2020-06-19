import React from 'react';
import './TeamSelection.css';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';

class TeamSelection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teamOne: 0,
			teamTwo: 0,
			teamThree: 0,
			teams: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		this.setState({
			[name]: event.target.value
		});
	}

	handleSubmit() {
		var t1 = this.state.teamOne;
		var t2 = this.state.teamTwo;
		var t3 = this.state.teamThree;
		this.props.handlePartTwoClick(t1, t2, t3);
		// event.preventDefault();
	}
	renderTeamOption(team) {
		return (
			<option key={team.id} value={team.id}>
				{team.name}
			</option>
		);
	}
	render() {
		const { teams } = this.props.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup id="short-form-slect">
					<ControlLabel id="short-form-label">Team 1:</ControlLabel>
					<FormControl name="teamOne" componentClass="select" onChange={this.handleChange}>
						<option />
						{teams.map(this.renderTeamOption)}
					</FormControl>
				</FormGroup>
				<FormGroup id="short-form-slect">
					<ControlLabel id="short-form-label">Team 2:</ControlLabel>
					<FormControl name="teamTwo" componentClass="select" onChange={this.handleChange}>
						<option />
						{teams.map(this.renderTeamOption)}
					</FormControl>
				</FormGroup>
				<FormGroup id="short-form-slect">
					<ControlLabel id="short-form-label">Team 3:</ControlLabel>
					<FormControl name="teamThree" componentClass="select" onChange={this.handleChange}>
						<option />
						{teams.map(this.renderTeamOption)}
					</FormControl>
				</FormGroup>
				<Row className="center-block text-center">
					<Col>
						<Button bsStyle="next" bsSize="large" onClick={this.handleSubmit}>
							next
						</Button>
					</Col>
				</Row>
			</form>
		);
	}
}
export default TeamSelection;
