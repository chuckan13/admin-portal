import axios from 'axios';
import React, { Component } from 'react';
import '../Admin/Admin.css';
import ViewApplicants from '../ViewApplicants/ViewApplicants.js';
import EditApplication from '../EditApplication/EditApplication.js';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
addStyle(Button, 'admin');
addStyle(Button, 'back');

class Admin extends Component {
	state = {
		/* display booleans */
		homePage: true,
		viewApplicants: false,
		editApplication: false,
		presidentView: false
	};

	constructor(props) {
		super(props);
		this.displayApplicantPage = this.displayApplicantPage.bind(this);
		this.displayEditPage = this.displayEditPage.bind(this);
		this.backButton = this.backButton.bind(this);
		this.updateQuestions = this.updateQuestions.bind(this);
	}

	async componentDidMount() {
		await axios
			.get('/api/loginusers')
			.then(res => {
				// console.log('LOGINUSER', res.data);
				if (res.data.role === 'ADMIN') {
					this.setState({ presidentView: true });
				}
			})
			.catch(err => console.log(err));
	}

	displayApplicantPage() {
		this.setState({
			homePage: false,
			viewApplicants: true
		});
		window.scrollTo(0, 0);
	}

	displayEditPage() {
		this.setState({
			homePage: false,
			editApplication: true
		});
	}

	updateQuestions(q1, q2) {
		axios
			.put('/api/teams/2', {
				questionOne: q1,
				questionTwo: q2
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// handles back button on all admin pages
	backButton() {
		this.setState({
			homePage: true,
			editApplication: false,
			viewApplicants: false
		});
	}

	render() {
		let { homePage, viewApplicants, editApplication, presidentView } = this.state;
		let display;

		if (homePage) {
			if (presidentView) {
				display = <PresHomePage displayApplicantPage={this.displayApplicantPage} />;
			} else {
				display = (
					<HomePage displayApplicantPage={this.displayApplicantPage} displayEditPage={this.displayEditPage} />
				);
			}
		} else if (viewApplicants) {
			display = <ViewApplicants backButton={this.backButton} />;
		} else if (editApplication) {
			display = <EditApplication backButton={this.backButton} updateQuestions={this.updateQuestions} />;
		}
		return <div> {display} </div>;
	}
}

function HomePage(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<Col>
					<div>
						<Button bsStyle="admin" bsSize="large" onClick={props.displayApplicantPage}>
							View Applicants
						</Button>
					</div>
					<div>
						<Button bsStyle="admin" bsSize="large" onClick={props.displayEditPage}>
							Edit Application
						</Button>
					</div>
				</Col>
			</Row>
		</div>
	);
}

function PresHomePage(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<Col>
					<div>
						<Button bsStyle="admin" bsSize="large" onClick={props.displayApplicantPage}>
							View Applicants
						</Button>
					</div>
				</Col>
			</Row>
		</div>
	);
}
export default Admin;
