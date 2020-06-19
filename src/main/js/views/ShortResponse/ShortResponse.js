import React from 'react';
import './ShortResponse.css';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import axios from 'axios';

class ShortResponse extends React.Component {
	state = {
		questionNumbers: [],
		userId: 0
	};

	constructor(props, context) {
		super(props, context);
		this.handleSubmitClick = this.handleSubmitClick.bind(this);
		this.updateState = this.updateState.bind(this);
		let { teamOne, teamTwo, teamThree, userId } = this.props.state;
	}

	// componentDidMount() {
	// 	this.render();
	// }

	updateState(e) {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value
		});
	}

	async handleSubmitClick() {
		var allResponseObjects = [];
		for (var i = 0; i < this.state.questionNumbers.length; i++) {
			var currResponseObject = {
				text: this.state['question' + this.state.questionNumbers[i] + 'response'],
				qId: this.state.questionNumbers[i]
			};
			allResponseObjects.push(currResponseObject);
		}
		console.log('all response objects: ', allResponseObjects);
		let responses = [];
		await Promise.all(
			allResponseObjects.map(obj =>
				axios
					.post('/api/responses/new', {
						text: obj.text,
						questionId: parseInt(obj.qId),
						userId: parseInt(this.state.userId)
					})
					.then(response => {
						responses.push(response);
					})
			)
		);
		console.log('responses: ', responses);
		this.setState({
			allResp: allResponseObjects
		});
		this.props.handlePartThreeClick(this.state.questionNumbers, this.state.allResp);
	}

	alreadyInArray(idNum) {
		if (this.state.questionNumbers.includes(idNum)) {
			return true;
		}
		return false;
	}

	clearArrayOfUndefined(arrayVars) {
		var newArray = [];
		for (var i = 0; i < arrayVars.length; i++) {
			if (arrayVars[i]) {
				newArray.push(arrayVars[i]);
			}
		}
		return newArray;
	}

	render() {
		// initially they come in as ids.  we need to get the team out of them
		// added code so it doesn't break if no teams are chosen (?)
		let {
			teamOne,
			teamTwo,
			teamThree,
			userId,
			teamOneQuestions,
			teamTwoQuestions,
			teamThreeQuestions
		} = this.props.state;
		this.state.userId = userId;
		if (teamOne) {
			var teamOneObj = this.props.state.teams.filter(team => team.id === Number(teamOne))[0];
			// console.log('teamonobj', teamOneObj);
			// console.log('Team one');
			// console.log(teamOneQuestions);
			var questionNum = [];
			questionNum = teamOneQuestions.map(question => {
				if (!this.alreadyInArray(question.id)) {
					return question.id;
				}
			});
			// console.log('team one question nums');
			// console.log(questionNum);
			this.state.questionNumbers = this.state.questionNumbers.concat(this.clearArrayOfUndefined(questionNum));
		} else {
			teamOne = '';
		}
		if (teamTwo) {
			var teamTwoObj = this.props.state.teams.filter(team => team.id === Number(teamTwo))[0];
			// console.log('Team Two');
			// console.log(teamTwoQuestions);
			var questionNum = [];
			questionNum = teamTwoQuestions.map(question => {
				if (!this.alreadyInArray(question.id)) {
					return question.id;
				}
			});
			// console.log('team two question nums');
			// console.log(questionNum);
			this.state.questionNumbers = this.state.questionNumbers.concat(this.clearArrayOfUndefined(questionNum));
		} else {
			teamTwo = '';
		}
		if (teamThree) {
			var teamThreeObj = this.props.state.teams.filter(team => team.id === Number(teamThree))[0];
			// console.log('Team Three');
			// console.log(teamThreeQuestions);
			var questionNum = [];
			questionNum = teamThreeQuestions.map(question => {
				if (!this.alreadyInArray(question.id)) {
					return question.id;
				}
			});
			// console.log('team three question nums');
			// console.log(questionNum);
			this.state.questionNumbers = this.state.questionNumbers.concat(this.clearArrayOfUndefined(questionNum));
		} else {
			teamThree = '';
		}
		console.log(this.state);
		return (
			<div>
				<div id="short-response-title">
					<p> Part 3: Short Response </p>
				</div>
				<TeamQuestions
					team={teamOneObj.name}
					num="One"
					questions={teamOneQuestions}
					onChange={this.updateState}
					v={this.state}
				/>
				{teamTwo ? (
					<TeamQuestions
						team={teamTwoObj.name}
						num="Two"
						questions={teamTwoQuestions}
						onChange={this.updateState}
						v={this.state}
					/>
				) : (
					''
				)}
				{teamThree ? (
					<TeamQuestions
						team={teamThreeObj.name}
						num="Three"
						questions={teamThreeQuestions}
						onChange={this.updateState}
						v={this.state}
					/>
				) : (
					''
				)}
				<SubmitButton onClick={this.handleSubmitClick} />
			</div>
		);
	}
}

function Question(props) {
	return (
		<FormGroup>
			<ControlLabel id="long-form-label">{props.question}</ControlLabel>
			<FormControl
				id="long-form-answer"
				name={props.name + 'response'}
				componentClass="textarea"
				value={props.v[props.name + 'response']}
				onChange={props.onChange}
			/>
		</FormGroup>
	);
}

function TeamQuestions(props) {
	const questions = props.questions.map(question => (
		<Question
			name={'question' + question.id}
			question={question.text}
			onChange={props.onChange}
			questionId={question.id}
			v={props.v}
		/>
	));

	return (
		<div>
			<p id="short-response-choice">
				{' '}
				Choice {props.num}: {props.team}{' '}
			</p>
			<div id="questions">{questions}</div>
		</div>
	);
}

function SubmitButton(props) {
	return (
		<Row className="center-block text-center">
			<Col>
				<Button bsStyle="next" bsSize="large" onClick={props.onClick}>
					review for submission
				</Button>
			</Col>
		</Row>
	);
}

export default ShortResponse;
